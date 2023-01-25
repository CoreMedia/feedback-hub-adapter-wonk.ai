package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

import java.util.List;

import static java.util.Collections.unmodifiableList;

public class TextsRequest {

  private String question;
  @SerializedName(value = "target_lang")
  private String targetLanguage;
  private boolean sources;
  private List<String> allowList;
  private List<String> denyList;

  public TextsRequest(String question, String targetLanguage, boolean sources) {
    this.question = question;
    this.targetLanguage = targetLanguage;
    this.sources = sources;
  }

  public String getQuestion() {
    return question;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public String getTargetLanguage() {
    return targetLanguage;
  }

  public void setTargetLanguage(String targetLanguage) {
    this.targetLanguage = targetLanguage;
  }

  public boolean isSources() {
    return sources;
  }

  public void setSources(boolean sources) {
    this.sources = sources;
  }

  public List<String> getAllowList() {
    return unmodifiableList(allowList);
  }

  public void setAllowList(List<String> allowList) {
    this.allowList = unmodifiableList(allowList);
  }

  public List<String> getDenyList() {
    return unmodifiableList(denyList);
  }

  public void setDenyList(List<String> denyList) {
    this.denyList = unmodifiableList(denyList);
  }
}
