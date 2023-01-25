package com.coremedia.labs.plugins.feedbackhub.wonki;

import com.coremedia.cap.common.CapConnection;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.cms.common.plugins.beans_for_plugins.CommonBeansForPluginsConfiguration;
import com.coremedia.feedbackhub.FeedbackHubConfigurationProperties;
import com.coremedia.labs.plugins.feedbackhub.wonki.adapter.GhostwritrFeedbackProviderFactory;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.LoggingRequestInterceptor;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.GhostWritrService;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.GhostwritrConnector;
import com.coremedia.labs.plugins.feedbackhub.wonki.jobs.ApplyTextToContentJobFactory;
import com.coremedia.labs.plugins.feedbackhub.wonki.jobs.GenerateTextJobFactory;
import edu.umd.cs.findbugs.annotations.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Configuration
@Import({CommonBeansForPluginsConfiguration.class})
public class GhostwritrConfiguration {

  @Bean
  public GhostwritrFeedbackProviderFactory ghostwritrFeedbackProviderFactory() {
    return new GhostwritrFeedbackProviderFactory();
  }

  @Bean
  public FeedbackSettingsProvider ghostwritrFeedbackSettingsProvider(@NonNull SitesService sitesService, @NonNull CapConnection capConnection) {
    return new FeedbackSettingsProvider(capConnection,
            sitesService,
            new FeedbackHubConfigurationProperties.Bindings(),
            GhostwritrSettings.class,
            GhostwritrFeedbackProviderFactory.TYPE);
  }

  @Bean
  public GhostWritrService ghostWritrService(GhostwritrConnector connector) {
    return new GhostWritrService(connector);
  }

  @Bean
  public GhostwritrConnector ghostwritrConnector(RestTemplate ghostwritrRestTemplate) {
    return new GhostwritrConnector(ghostwritrRestTemplate);
  }

  @Bean
  public RestTemplate ghostwritrRestTemplate() {
    RestTemplate restTemplate = new RestTemplate(new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
    restTemplate.setInterceptors(Collections.singletonList(new LoggingRequestInterceptor()));
    return restTemplate;
  }

  @Bean
  public GenerateTextJobFactory generateTextJobFactory(@NonNull GhostWritrService ghostWritrService,
                                                       @NonNull FeedbackSettingsProvider ghostwritrFeedbackSettingsProvider,
                                                       @NonNull SitesService sitesService) {
    return new GenerateTextJobFactory(ghostWritrService, ghostwritrFeedbackSettingsProvider, sitesService);
  }

  @Bean
  public ApplyTextToContentJobFactory applyTextToContentJobFactory(@NonNull CapConnection capConnection) {
    return new ApplyTextToContentJobFactory(capConnection);
  }
}
