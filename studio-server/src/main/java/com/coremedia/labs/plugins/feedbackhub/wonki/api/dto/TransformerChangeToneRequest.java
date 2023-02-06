package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

public class TransformerChangeToneRequest {

  @SerializedName("text")
  private String text;
  @SerializedName("language")
  private String language;
  @SerializedName("formality_mode")
  private String formalityMode;

  public TransformerChangeToneRequest(String text, String language, String formalityMode) {
    this.text = text;
    this.language = language;
    this.formalityMode = formalityMode;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public String getLanguage() {
    return language;
  }

  public void setLanguage(String language) {
    this.language = language;
  }

  public String getFormalityMode() {
    return formalityMode;
  }

  public void setFormalityMode(String formalityMode) {
    this.formalityMode = formalityMode;
  }
}
