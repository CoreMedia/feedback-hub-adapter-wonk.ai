package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.annotations.SerializedName;

public class TransformerChangeToneResponse {

  @JsonProperty("result")
  private ChangeToneResult result;

  public TransformerChangeToneResponse(ChangeToneResult result) {
    this.result = result;
  }

  public ChangeToneResult getResult() {
    return result;
  }

  public void setResult(ChangeToneResult result) {
    this.result = result;
  }

  public class ChangeToneResult {

    @SerializedName("text")
    private String text;

    @SerializedName("error")
    private boolean error;

    @SerializedName("error_description")
    private String errorDescription;

    public ChangeToneResult(String text, boolean error, String errorDescription) {
      this.text = text;
      this.error = error;
      this.errorDescription = errorDescription;
    }

    public String getText() {
      return text;
    }

    public void setText(String text) {
      this.text = text;
    }

    public boolean isError() {
      return error;
    }

    public void setError(boolean error) {
      this.error = error;
    }

    public String getErrorDescription() {
      return errorDescription;
    }

    public void setErrorDescription(String errorDescription) {
      this.errorDescription = errorDescription;
    }
  }

}
