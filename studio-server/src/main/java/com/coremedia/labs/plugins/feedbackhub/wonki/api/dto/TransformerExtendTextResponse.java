package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

public class TransformerExtendTextResponse {

  @SerializedName("result")
  private String result;

  @SerializedName("new_parts")
  private String[] newParts;

  public TransformerExtendTextResponse(String result, String[] newParts) {
    this.result = result;
    this.newParts = newParts;
  }

  public String getResult() {
    return result;
  }

  public void setResult(String result) {
    this.result = result;
  }

  public String[] getNewParts() {
    return newParts;
  }

  public void setNewParts(String[] newParts) {
    this.newParts = newParts;
  }

}
