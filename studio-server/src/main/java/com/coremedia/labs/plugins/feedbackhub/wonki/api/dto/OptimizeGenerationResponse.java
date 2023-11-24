package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import java.util.List;

import static java.util.Collections.unmodifiableList;

public class OptimizeGenerationResponse {

  private String result;

  private List<String> candidates;

  public OptimizeGenerationResponse(String result) {
    this.result = result;
  }

  public String getResult() {
    return result;
  }

  public void setResult(String result) {
    this.result = result;
  }

  public List<String> getCandidates() {
    return candidates;
  }

  public void setCandidates(List<String> candidates) {
    this.candidates = candidates;
  }
}
