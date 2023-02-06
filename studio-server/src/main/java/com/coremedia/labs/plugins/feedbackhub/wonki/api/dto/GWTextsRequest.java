package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

import java.util.Collections;
import java.util.List;

import static java.util.Collections.unmodifiableList;

public class GWTextsRequest {

  @SerializedName("question")
  private String question;
  @SerializedName("target_lang")
  private String targetLanguage;
  @SerializedName("sources")
  private boolean sources;
  @SerializedName("whitelist")
  private List<String> allowList;
  @SerializedName("blacklist")
  private List<String> denyList;

  public GWTextsRequest(String question, String targetLanguage, boolean sources) {
    this(question, targetLanguage, sources, Collections.emptyList(), Collections.emptyList());
  }

  public GWTextsRequest(String question, String targetLanguage, boolean sources, List<String> allowList, List<String> denyList) {
    this.question = question;
    this.targetLanguage = targetLanguage;
    this.sources = sources;
    this.allowList = allowList;
    this.denyList = denyList;
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
