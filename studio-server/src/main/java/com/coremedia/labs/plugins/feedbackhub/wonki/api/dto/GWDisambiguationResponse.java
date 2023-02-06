package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

public class GWDisambiguationResponse {

  @SerializedName("ambiguity")
  private boolean ambiguity;

  @SerializedName("result")
  private String[] results;

  public GWDisambiguationResponse(boolean ambiguity, String[] results) {
    this.ambiguity = ambiguity;
    this.results = results;
  }

  public boolean isAmbiguity() {
    return ambiguity;
  }

  public void setAmbiguity(boolean ambiguity) {
    this.ambiguity = ambiguity;
  }

  public String[] getResults() {
    return results;
  }

  public void setResults(String[] results) {
    this.results = results;
  }

}
