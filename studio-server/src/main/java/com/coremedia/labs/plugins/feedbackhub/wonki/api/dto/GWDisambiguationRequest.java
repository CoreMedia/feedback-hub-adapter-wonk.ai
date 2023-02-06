package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

public class GWDisambiguationRequest {

  @SerializedName("input")
  private String input;

  public GWDisambiguationRequest(String input) {
    this.input = input;
  }

  public String getInput() {
    return input;
  }

  public void setInput(String input) {
    this.input = input;
  }

}
