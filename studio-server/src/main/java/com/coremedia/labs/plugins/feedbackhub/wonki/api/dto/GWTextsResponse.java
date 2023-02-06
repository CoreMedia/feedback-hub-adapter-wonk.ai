package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

import java.util.List;

import static java.util.Collections.unmodifiableList;

public class GWTextsResponse {

  @SerializedName("text")
  private String text;

  @SerializedName("confidence")
  private float confidence;

  @SerializedName("sources")
  private List<Source> sources;

  public GWTextsResponse(String text, float confidence, List<Source> sources) {
    this.text = text;
    this.confidence = confidence;
    this.sources = sources;
  }

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
    return unmodifiableList(sources);
  }

  public void setSources(List<Source> sources) {
    this.sources = unmodifiableList(sources);
  }

  public static class Source {

    @SerializedName("text")
    private String text;

    @SerializedName("source")
    private String source;

    public Source(String text, String source) {
      this.text = text;
      this.source = source;
    }

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
