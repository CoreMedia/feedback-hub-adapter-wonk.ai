package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

public class TransformerDetectLanguageResponse {

  @SerializedName("result")
  private DetectedLanguageResult[] results;

  public TransformerDetectLanguageResponse(DetectedLanguageResult[] results) {
    this.results = results;
  }

  public DetectedLanguageResult[] getResults() {
    return results;
  }

  public void setResults(DetectedLanguageResult[] results) {
    this.results = results;
  }

  public class DetectedLanguageResult {
    @SerializedName("lang")
    private String language;

    @SerializedName("prob")
    private double probability;

    public DetectedLanguageResult(String language, double probability) {
      this.language = language;
      this.probability = probability;
    }

    public String getLanguage() {
      return language;
    }

    public void setLanguage(String language) {
      this.language = language;
    }

    public double getProbability() {
      return probability;
    }

    public void setProbability(double probability) {
      this.probability = probability;
    }
  }


}
