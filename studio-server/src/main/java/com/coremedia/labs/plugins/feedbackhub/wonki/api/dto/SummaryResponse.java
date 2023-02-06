package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

public class SummaryResponse {

  private String summary;
  private String text;
  private int length;
  private String[] sentences;

  public SummaryResponse(String summary, String text, int length, String[] sentences) {
    this.summary = summary;
    this.text = text;
    this.length = length;
    this.sentences = sentences;
  }

  public String getSummary() {
    return summary;
  }

  public void setSummary(String summary) {
    this.summary = summary;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public int getLength() {
    return length;
  }

  public void setLength(int length) {
    this.length = length;
  }

  public String[] getSentences() {
    return sentences;
  }

  public void setSentences(String[] sentences) {
    this.sentences = sentences;
  }
}
