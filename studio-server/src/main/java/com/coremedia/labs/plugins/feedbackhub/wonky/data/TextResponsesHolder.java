package com.coremedia.labs.plugins.feedbackhub.wonky.data;

import com.coremedia.labs.plugins.feedbackhub.wonky.api.dto.TextsResponse;

import java.util.HashMap;
import java.util.Map;

public class TextResponsesHolder {

  private final Map<String, TextsResponse> contentId2TextsResponse = new HashMap<>();

  public void set(String contentId, TextsResponse response) {
    contentId2TextsResponse.put(contentId, response);
  }

  public TextsResponse get(String id) {
    return contentId2TextsResponse.get(id);
  }
}
