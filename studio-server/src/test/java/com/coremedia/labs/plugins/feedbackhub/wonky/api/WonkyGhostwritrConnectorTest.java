package com.coremedia.labs.plugins.feedbackhub.wonky.api;

import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwritrConfiguration;
import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.dto.TextsRequest;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.dto.TextsResponse;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

/**
 *
 */
public class WonkyGhostwritrConnectorTest {
  private static final Logger LOG = LoggerFactory.getLogger(WonkyGhostwritrConnectorTest.class);

  @Test
  public void testWonkyGhostWritR() {

    String apiKey = System.getenv("WONKY_API_KEY");
    if (apiKey == null) {
      LOG.warn("Test ignored, pass env properties.");
      return;
    }

    WonkyGhostwritrConfiguration config = new WonkyGhostwritrConfiguration();
    RestTemplate restTemplate = config.wonkyGhostwritrRestTemplate();
    WonkyGhostwritrSettings settings = () -> apiKey;

    WonkyGhostwritrConnector connector = new WonkyGhostwritrConnector(restTemplate);

    TextsRequest textsRequest = new TextsRequest("Was ist CoreMedia", "de", true);

    Optional<TextsResponse> result = connector.postResource(settings, WonkyGhostWritrService.TEXTS_API_PATH, textsRequest, TextsResponse.class);
    assertThat(result).isPresent();

    assertThat(result.get().getText()).isNotEmpty();
  }
}
