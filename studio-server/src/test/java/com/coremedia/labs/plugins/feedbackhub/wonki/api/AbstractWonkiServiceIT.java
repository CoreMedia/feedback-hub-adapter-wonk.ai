package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.WonkiFeedbackHubConfiguration;
import org.junit.Before;
import org.springframework.web.client.RestTemplate;

public abstract class AbstractWonkiServiceIT {

  protected WonkiApiConnector connector;

  @Before
  public void setUp() throws Exception {
    if (getApiKey() == null) {
      throw new IllegalArgumentException("No WONKI_API_KEY provided.");
    }

    WonkiFeedbackHubConfiguration config = new WonkiFeedbackHubConfiguration();
    RestTemplate restTemplate = config.wonkiApiRestTemplate();
    connector = new WonkiApiConnector(restTemplate);
  }

  WonkiApiConnector getConnector() {
    return connector;
  }

  String getApiKey() {
    return System.getenv("WONKI_API_KEY");
  }



}
