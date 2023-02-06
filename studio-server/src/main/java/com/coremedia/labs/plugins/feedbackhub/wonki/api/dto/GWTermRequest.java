package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

public class GWTermRequest {

  @SerializedName("term")
  private String term;
  @SerializedName("target_lang")
  private String targetLanguage;

  public GWTermRequest(String term, String targetLanguage) {
    this.term = term;
    this.targetLanguage = targetLanguage;
  }

  public String getTerm() {
    return term;
  }

  public void setTerm(String term) {
    this.term = term;
  }

  public String getTargetLanguage() {
    return targetLanguage;
  }

  public void setTargetLanguage(String targetLanguage) {
    this.targetLanguage = targetLanguage;
  }
}
