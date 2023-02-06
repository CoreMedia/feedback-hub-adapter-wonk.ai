package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class GWComposeRequest {

  @SerializedName("question")
  private String question;

  @SerializedName("passages")
  private List<String> passages;

  public GWComposeRequest(String question, List<String> passages) {
    this.question = question;
    this.passages = passages;
  }

  public String getQuestion() {
    return question;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public List<String> getPassages() {
    return passages;
  }

  public void setPassages(List<String> passages) {
    this.passages = passages;
  }
}
