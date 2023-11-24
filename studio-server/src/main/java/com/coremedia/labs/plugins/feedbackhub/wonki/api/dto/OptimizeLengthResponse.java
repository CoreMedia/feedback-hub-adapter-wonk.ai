package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

import java.util.List;

import static java.util.Collections.unmodifiableList;

public class OptimizeLengthResponse {

  private String result;

  private List<Candidates> candidates;


  public OptimizeLengthResponse(String result) {
    this.result = result;
  }

  public String getResult() {
    return result;
  }

  public void setResult(String result) {
    this.result = result;
  }

  public List<Candidates> getCandidates() {
    return unmodifiableList(candidates);
  }

  public void setCandidates(List<Candidates> candidates) {
    this.candidates = unmodifiableList(candidates);
  }

  public static class Candidates {
    private String text;

    private float similarity;
    private int length;
    @SerializedName("length_diff")
    private int lengthDiff;

    public String getText() {
      return text;
    }

    public void setText(String text) {
      this.text = text;
    }

    public float getSimilarity() {
      return similarity;
    }

    public void setSimilarity(float similarity) {
      this.similarity = similarity;
    }

    public int getLength() {
      return length;
    }

    public void setLength(int length) {
      this.length = length;
    }

    public int getLengthDiff() {
      return lengthDiff;
    }

    public void setLengthDiff(int lengthDiff) {
      this.lengthDiff = lengthDiff;
    }
  }

}
