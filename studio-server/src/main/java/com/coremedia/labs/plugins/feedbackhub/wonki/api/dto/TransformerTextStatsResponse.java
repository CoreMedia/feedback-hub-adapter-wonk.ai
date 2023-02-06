package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

import java.util.Map;

public class TransformerTextStatsResponse {

  @SerializedName("result")
  private Map<String, Object> results;

  public TransformerTextStatsResponse(Map<String, Object> results) {
    this.results = results;
  }

  public Map<String, Object> getResults() {
    return results;
  }

  public void setResults(Map<String, Object> results) {
    this.results = results;
  }
}
