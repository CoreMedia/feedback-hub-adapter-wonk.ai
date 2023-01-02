package com.coremedia.labs.plugins.feedbackhub.wonky.api.dto;

import java.util.List;

public class TextsRequest {

  private String question;
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
    return allowList;
  }

  public void setAllowList(List<String> allowList) {
    this.allowList = allowList;
  }

  public List<String> getDenyList() {
    return denyList;
  }

  public void setDenyList(List<String> denyList) {
    this.denyList = denyList;
  }
}
