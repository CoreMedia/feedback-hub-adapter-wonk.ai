package com.coremedia.labs.plugins.feedbackhub.wonky.api;

import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.dto.TextsRequest;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.dto.TextsResponse;

import java.util.Optional;

public class WonkyGhostWritrService {

  public static final String TEXTS_API_PATH = "/texts";
  private final WonkyGhostwritrConnector connector;


  public WonkyGhostWritrService(WonkyGhostwritrConnector connector) {
    this.connector = connector;
  }

  public TextsResponse generateTextFrom(String question, String targetLanguage, WonkyGhostwritrSettings settings) {
    TextsRequest textsRequest = new TextsRequest(question, targetLanguage, true);

    Optional<TextsResponse> textsResponse = connector.postResource(settings, TEXTS_API_PATH, textsRequest, TextsResponse.class);

    return textsResponse.orElseThrow();
  }

}
