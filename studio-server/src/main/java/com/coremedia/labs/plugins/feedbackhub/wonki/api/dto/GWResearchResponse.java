package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class GWResearchResponse {

  @SerializedName("sources")
  private List<ResearchResult> sources;

  public GWResearchResponse(List<ResearchResult> sources) {
    this.sources = sources;
  }

  public List<ResearchResult> getSources() {
    return sources;
  }

  public void setSources(List<ResearchResult> sources) {
    this.sources = sources;
  }

  public class ResearchResult {
    @SerializedName("text")
    private String text;
    @SerializedName("source")
    private String source;

    public ResearchResult(String text, String source) {
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
