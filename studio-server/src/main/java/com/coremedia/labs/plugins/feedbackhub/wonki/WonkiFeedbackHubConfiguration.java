package com.coremedia.labs.plugins.feedbackhub.wonki;

import com.coremedia.cap.common.CapConnection;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.cms.common.plugins.beans_for_plugins2.CommonBeansForPluginsConfiguration;
import com.coremedia.feedbackhub.beans_for_plugins.FeedbackHubBeansForPluginsConfiguration;
import com.coremedia.feedbackhub.settings.FeedbackSettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.GhostwritRService;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.LoggingRequestInterceptor;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.SummarizRService;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.TransformRService;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.WonkiApiConnector;
import com.coremedia.labs.plugins.feedbackhub.wonki.jobs.ghostwritr.ApplyTextToContentJobFactory;
import com.coremedia.labs.plugins.feedbackhub.wonki.jobs.ghostwritr.GenerateTextJobFactory;
import com.coremedia.labs.plugins.feedbackhub.wonki.jobs.summarizr.SummarizRJobFactory;
import com.coremedia.labs.plugins.feedbackhub.wonki.jobs.transformr.TransformRJobFactory;
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
@Import({CommonBeansForPluginsConfiguration.class, FeedbackHubBeansForPluginsConfiguration.class})
public class WonkiFeedbackHubConfiguration {

  @Bean
  public WonkiFeedbackProviderFactory wonkiFeedbackProviderFactory() {
    return new WonkiFeedbackProviderFactory();
  }

  @Bean
  public WonkAISettingsProvider wonkAISettingsProvider(FeedbackSettingsProvider feedbackSettingsProvider) {
    return new WonkAISettingsProvider(feedbackSettingsProvider, WonkiFeedbackProviderFactory.TYPE);
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
  public TransformRService transformRService(WonkiApiConnector connector) {
    return new TransformRService(connector);
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
                                                       @NonNull WonkAISettingsProvider wonkAISettingsProvider,
                                                       @NonNull SitesService sitesService) {
    return new GenerateTextJobFactory(ghostWritrService, wonkAISettingsProvider, sitesService);
  }

  @Bean
  public ApplyTextToContentJobFactory applyTextToContentJobFactory(@NonNull CapConnection capConnection) {
    return new ApplyTextToContentJobFactory(capConnection);
  }

  @Bean
  public SummarizRJobFactory summarizeJobFactory(@NonNull SitesService sitesService,
                                                 @NonNull WonkAISettingsProvider wonkAISettingsProvider,
                                                 @NonNull SummarizRService summarizRService
  ) {
    return new SummarizRJobFactory(summarizRService, sitesService, wonkAISettingsProvider);
  }

  @Bean
  public TransformRJobFactory transformRJobFactory(@NonNull TransformRService transformRService,
                                                   @NonNull WonkAISettingsProvider wonkAISettingsProvider) {
    return new TransformRJobFactory(transformRService, wonkAISettingsProvider);
  }

}
