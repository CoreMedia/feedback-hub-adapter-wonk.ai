package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

public class OptimizeDetectLanguageResponse {

  @SerializedName("result")
  private String result;
  @SerializedName("candidates")
  private Candidates[] candidates;

  public OptimizeDetectLanguageResponse(Candidates[] results) {
    this.candidates = candidates;
  }

  public String getResult() {
    return result;
  }

  public void setResult(String result) {
    this.result = result;
  }

  public Candidates[] getCandidates() {
    return candidates;
  }

  public void setCandidates(Candidates[] results) {
    this.candidates = candidates;
  }

  public static class Candidates {
    @SerializedName("lang")
    private String language;

    @SerializedName("prob")
    private double probability;

    public Candidates(String language, double probability) {
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
