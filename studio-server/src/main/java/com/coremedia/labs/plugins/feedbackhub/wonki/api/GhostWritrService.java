package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.GhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TextsRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TextsResponse;

import java.util.Optional;

public class GhostWritrService {

  public static final String TEXTS_API_PATH = "/texts";
  private final GhostwritrConnector connector;


  public GhostWritrService(GhostwritrConnector connector) {
    this.connector = connector;
  }

  public TextsResponse generateTextFrom(String question, String targetLanguage, GhostwritrSettings settings) {
    TextsRequest textsRequest = new TextsRequest(question, targetLanguage, true);

    Optional<TextsResponse> textsResponse = connector.postResource(settings, TEXTS_API_PATH, textsRequest, TextsResponse.class);

    return textsResponse.orElseThrow();
  }

}
