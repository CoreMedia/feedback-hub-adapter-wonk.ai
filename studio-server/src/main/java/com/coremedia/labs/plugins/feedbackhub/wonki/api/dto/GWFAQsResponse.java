package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class GWFAQsResponse {

  @SerializedName("result")
  private List<FAQResult> results;

  public GWFAQsResponse(List<FAQResult> results) {
    this.results = results;
  }

  public List<FAQResult> getResults() {
    return results;
  }

  public void setResults(List<FAQResult> results) {
    this.results = results;
  }

  public class FAQResult {

    @SerializedName("question")
    private String question;
    @SerializedName("answer")
    private String answer;

    public FAQResult(String question, String answer) {
      this.question = question;
      this.answer = answer;
    }

    public String getQuestion() {
      return question;
    }

    public void setQuestion(String question) {
      this.question = question;
    }

    public String getAnswer() {
      return answer;
    }

    public void setAnswer(String answer) {
      this.answer = answer;
    }
  }

}
