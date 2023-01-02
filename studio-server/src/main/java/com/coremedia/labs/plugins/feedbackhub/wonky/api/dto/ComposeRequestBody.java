package com.coremedia.labs.plugins.feedbackhub.wonky.api.dto;

import java.util.Collections;
import java.util.List;

import static java.util.Collections.*;

public class ComposeRequestBody {

  private String text;

  private List<String> passages;

  public ComposeRequestBody(String text, List<String> passages) {
    this.text = text;
    this.passages = unmodifiableList(passages);
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public List<String> getPassages() {
    return passages;
  }

  public void setPassages(List<String> passages) {
    this.passages = passages;
  }
}
