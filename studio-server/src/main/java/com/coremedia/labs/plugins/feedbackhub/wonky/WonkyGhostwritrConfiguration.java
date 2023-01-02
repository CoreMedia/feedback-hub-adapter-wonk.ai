package com.coremedia.labs.plugins.feedbackhub.wonky;

import com.coremedia.labs.plugins.feedbackhub.wonky.adapter.WonkyGhostwritrFeedbackAdapterFactory;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.LoggingRequestInterceptor;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.WonkyGhostWritrService;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.WonkyGhostwritrConnector;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Configuration
public class WonkyGhostwritrConfiguration {

  @Bean
  public WonkyGhostwritrFeedbackAdapterFactory wonkyGhostwritrFeedbackAdapterFactory(WonkyGhostWritrService wonkyGhostWritrService) {
    return new WonkyGhostwritrFeedbackAdapterFactory(wonkyGhostWritrService);
  }

  @Bean
  public WonkyGhostWritrService wonkyGhostWritrService(WonkyGhostwritrConnector connector) {
    return new WonkyGhostWritrService(connector);
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
}
