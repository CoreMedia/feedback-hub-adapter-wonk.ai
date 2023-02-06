package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class GWQuestionsResponse {

  @SerializedName("term")
  private String term;

  @SerializedName("questions")
  private List<String> questions;

  @SerializedName("count")
  private int count;

  public GWQuestionsResponse(String term, List<String> questions, int count) {
    this.term = term;
    this.questions = questions;
    this.count = count;
  }

  public String getTerm() {
    return term;
  }

  public void setTerm(String term) {
    this.term = term;
  }

  public List<String> getQuestions() {
    return questions;
  }

  public void setQuestions(List<String> questions) {
    this.questions = questions;
  }

  public int getCount() {
    return count;
  }

  public void setCount(int count) {
    this.count = count;
  }

}
