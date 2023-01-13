package com.coremedia.labs.plugins.feedbackhub.wonky;

import com.coremedia.cap.common.CapConnection;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.cms.common.plugins.beans_for_plugins.CommonBeansForPluginsConfiguration;
import com.coremedia.feedbackhub.FeedbackHubConfigurationProperties;
import com.coremedia.labs.plugins.feedbackhub.wonky.adapter.WonkyGhostwritrFeedbackAdapterFactory;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.LoggingRequestInterceptor;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.WonkyGhostWritrService;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.WonkyGhostwritrConnector;
import com.coremedia.labs.plugins.feedbackhub.wonky.data.TextResponsesHolder;
import com.coremedia.labs.plugins.feedbackhub.wonky.jobs.ApplyTextToContentJobFactory;
import com.coremedia.labs.plugins.feedbackhub.wonky.jobs.GenerateTextJobFactory;
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
public class WonkyGhostwritrConfiguration {

  @Bean
  public WonkyGhostwritrFeedbackAdapterFactory wonkyGhostwritrFeedbackAdapterFactory(WonkyGhostWritrService wonkyGhostWritrService) {
    return new WonkyGhostwritrFeedbackAdapterFactory(wonkyGhostWritrService);
  }

  @Bean
  public WonkyGhostWritrService wonkyGhostWritrService(WonkyGhostwritrConnector connector, TextResponsesHolder textResponsesHolder) {
    return new WonkyGhostWritrService(connector, textResponsesHolder);
  }

  @Bean
  public WonkyGhostwritrConnector wonkyGhostwritrConnector(RestTemplate wonkyGhostwritrRestTemplate) {
    return new WonkyGhostwritrConnector(wonkyGhostwritrRestTemplate);
  }

  @Bean
  public RestTemplate wonkyGhostwritrRestTemplate() {
    RestTemplate restTemplate = new RestTemplate(new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
    restTemplate.setInterceptors(Collections.singletonList(new LoggingRequestInterceptor()));
    return restTemplate;
  }

  @Bean
  public FeedbackSettingsProvider wonkyGhostwritrFeedbackSettingsProvider(@NonNull SitesService sitesService, @NonNull CapConnection capConnection) {
    return new FeedbackSettingsProvider(capConnection,
            sitesService,
            new FeedbackHubConfigurationProperties.Bindings(),
            WonkyGhostwritrSettings.class,
            WonkyGhostwritrFeedbackAdapterFactory.TYPE);
  }

  @Bean
  public GenerateTextJobFactory generateTextJobFactory(@NonNull WonkyGhostWritrService wonkyGhostWritrService,
                                                       @NonNull FeedbackSettingsProvider wonkyGhostwritrFeedbackSettingsProvider,
                                                       @NonNull SitesService sitesService) {
    return new GenerateTextJobFactory(wonkyGhostWritrService, wonkyGhostwritrFeedbackSettingsProvider, sitesService);
  }

  @Bean
  public ApplyTextToContentJobFactory applyTextToContentJobFactory(@NonNull CapConnection capConnection) {
    return new ApplyTextToContentJobFactory(capConnection);
  }

  @Bean
  public TextResponsesHolder textResponsesHolder() {
    return new TextResponsesHolder();
  }
}
