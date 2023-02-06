package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

public class TransformerDefaultRequest {

  private String text;

  public TransformerDefaultRequest(String text) {
    this.text = text;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

}
