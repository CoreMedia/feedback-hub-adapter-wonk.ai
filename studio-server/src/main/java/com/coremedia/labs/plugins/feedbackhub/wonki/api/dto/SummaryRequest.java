package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

public class SummaryRequest {

  @SerializedName("text")
  private String text;
  @SerializedName("target_lang")
  private String targetLanguage;

  @SerializedName("greedy_mode")
  private boolean greedyMode;

  @SerializedName("sentence_count")
  private int sentenceCount;

  public SummaryRequest(String text, String targetLanguage, boolean greedyMode, int sentenceCount) {
    this.text = text;
    this.targetLanguage = targetLanguage;
    this.greedyMode = greedyMode;
    this.sentenceCount = sentenceCount;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public String getTargetLanguage() {
    return targetLanguage;
  }

  public void setTargetLanguage(String targetLanguage) {
    this.targetLanguage = targetLanguage;
  }

  public boolean isGreedyMode() {
    return greedyMode;
  }

  public void setGreedyMode(boolean greedyMode) {
    this.greedyMode = greedyMode;
  }

  public int getSentenceCount() {
    return sentenceCount;
  }

  public void setSentenceCount(int sentenceCount) {
    this.sentenceCount = sentenceCount;
  }
}
