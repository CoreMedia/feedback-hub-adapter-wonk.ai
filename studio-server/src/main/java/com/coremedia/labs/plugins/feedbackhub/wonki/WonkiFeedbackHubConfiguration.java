package com.coremedia.labs.plugins.feedbackhub.wonki;

import com.coremedia.cap.common.CapConnection;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.cms.common.plugins.beans_for_plugins.CommonBeansForPluginsConfiguration;
import com.coremedia.feedbackhub.FeedbackHubConfigurationProperties;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.GhostwritRService;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.LoggingRequestInterceptor;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.SummarizRService;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.WonkiApiConnector;
import com.coremedia.labs.plugins.feedbackhub.wonki.jobs.ghostwritr.ApplyTextToContentJobFactory;
import com.coremedia.labs.plugins.feedbackhub.wonki.jobs.ghostwritr.GenerateTextJobFactory;
import com.coremedia.labs.plugins.feedbackhub.wonki.jobs.summarizr.SummarizRJobFactory;
import com.coremedia.labs.plugins.feedbackhub.wonki.provider.WonkiFeedbackProviderFactory;
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
public class WonkiFeedbackHubConfiguration {

  @Bean
  public WonkiFeedbackProviderFactory wonkiFeedbackProviderFactory() {
    return new WonkiFeedbackProviderFactory();
  }

  @Bean
  public FeedbackSettingsProvider ghostwritrFeedbackSettingsProvider(@NonNull SitesService sitesService, @NonNull CapConnection capConnection) {
    return new FeedbackSettingsProvider(capConnection,
            sitesService,
            new FeedbackHubConfigurationProperties.Bindings(),
            WonkiSettings.class,
            WonkiFeedbackProviderFactory.TYPE);
  }

  @Bean
  public GhostwritRService ghostWritrService(WonkiApiConnector connector) {
    return new GhostwritRService(connector);
  }

  @Bean
  public SummarizRService summarizrService(WonkiApiConnector connector) {
    return new SummarizRService(connector);
  }

  @Bean
  public WonkiApiConnector wonkiApiConnector(RestTemplate wonkiApiRestTemplate) {
    return new WonkiApiConnector(wonkiApiRestTemplate);
  }

  @Bean
  public RestTemplate wonkiApiRestTemplate() {
    RestTemplate restTemplate = new RestTemplate(new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
    restTemplate.setInterceptors(Collections.singletonList(new LoggingRequestInterceptor()));
    return restTemplate;
  }

  @Bean
  public GenerateTextJobFactory generateTextJobFactory(@NonNull GhostwritRService ghostWritrService,
                                                       @NonNull FeedbackSettingsProvider ghostwritrFeedbackSettingsProvider,
                                                       @NonNull SitesService sitesService) {
    return new GenerateTextJobFactory(ghostWritrService, ghostwritrFeedbackSettingsProvider, sitesService);
  }

  @Bean
  public ApplyTextToContentJobFactory applyTextToContentJobFactory(@NonNull CapConnection capConnection) {
    return new ApplyTextToContentJobFactory(capConnection);
  }

  @Bean
  public SummarizRJobFactory summarizeJobFactory(@NonNull SitesService sitesService,
                                                 @NonNull FeedbackSettingsProvider ghostwritrFeedbackSettingsProvider,
                                                 @NonNull SummarizRService summarizRService
                                                 ) {
    return new SummarizRJobFactory(summarizRService, sitesService, ghostwritrFeedbackSettingsProvider);
  }
}
