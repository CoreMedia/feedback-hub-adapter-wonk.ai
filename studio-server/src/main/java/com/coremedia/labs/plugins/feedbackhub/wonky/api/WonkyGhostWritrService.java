package com.coremedia.labs.plugins.feedbackhub.wonky.api;

import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.dto.TextsRequest;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.dto.TextsResponse;
import com.coremedia.labs.plugins.feedbackhub.wonky.data.TextResponsesHolder;

import java.util.Optional;

public class WonkyGhostWritrService {

  public static final String TEXTS_API_PATH = "/texts";
  private final WonkyGhostwritrConnector connector;

  private final TextResponsesHolder textResponsesHolder;

  public WonkyGhostWritrService(WonkyGhostwritrConnector connector, TextResponsesHolder textResponsesHolder) {
    this.connector = connector;
    this.textResponsesHolder = textResponsesHolder;
  }

  public TextsResponse generateTextFrom(String contentId, String question, String targetLanguage, WonkyGhostwritrSettings settings) {
    TextsRequest textsRequest = new TextsRequest(question, targetLanguage, true);

    Optional<TextsResponse> textsResponse = connector.postResource(settings, TEXTS_API_PATH, textsRequest, TextsResponse.class);

    return textsResponse.map(response -> {
      textResponsesHolder.set(contentId, response);
      return response;
    }).orElseThrow();
  }

  public TextsResponse getTextsResponse(String contentId) {
    return textResponsesHolder.get(contentId);
  }
}
