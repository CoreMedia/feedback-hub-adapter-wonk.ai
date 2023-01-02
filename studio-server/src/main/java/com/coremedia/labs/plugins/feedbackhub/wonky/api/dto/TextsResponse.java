package com.coremedia.labs.plugins.feedbackhub.wonky.api.dto;

import java.util.List;

public class TextsResponse {

  private String text;

  private float confidence;
  private List<Source> sources;

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public float getConfidence() {
    return confidence;
  }

  public void setConfidence(float confidence) {
    this.confidence = confidence;
  }

  public List<Source> getSources() {
    return sources;
  }

  public void setSources(List<Source> sources) {
    this.sources = sources;
  }

  class Source {

    private String text;

    private String source;

    public String getText() {
      return text;
    }

    public void setText(String text) {
      this.text = text;
    }

    public String getSource() {
      return source;
    }

    public void setSource(String source) {
      this.source = source;
    }
  }
}
