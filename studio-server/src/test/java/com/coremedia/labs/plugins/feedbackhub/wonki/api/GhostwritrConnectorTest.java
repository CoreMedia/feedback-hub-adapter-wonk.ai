package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.GhostwritrConfiguration;
import com.coremedia.labs.plugins.feedbackhub.wonki.GhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TextsRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TextsResponse;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

/**
 *
 */
public class GhostwritrConnectorTest {
  private static final Logger LOG = LoggerFactory.getLogger(GhostwritrConnectorTest.class);

  @Test
  public void testGhostWritR() {

    String apiKey = System.getenv("GHOSTWRITR_API_KEY");
    if (apiKey == null) {
      LOG.warn("Test ignored, pass env properties.");
      return;
    }

    GhostwritrConfiguration config = new GhostwritrConfiguration();
    RestTemplate restTemplate = config.ghostwritrRestTemplate();
    GhostwritrSettings settings = () -> apiKey;

    GhostwritrConnector connector = new GhostwritrConnector(restTemplate);

    TextsRequest textsRequest = new TextsRequest("Was ist CoreMedia", "de", true);

    Optional<TextsResponse> result = connector.postResource(settings, GhostWritrService.TEXTS_API_PATH, textsRequest, TextsResponse.class);
    assertThat(result).isPresent();

    assertThat(result.get().getText()).isNotEmpty();
  }
}
