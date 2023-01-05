package com.coremedia.labs.plugins.feedbackhub.wonky.custom.items;

import com.coremedia.feedbackhub.items.FeedbackItem;

/**
 *
 */
public class GenerateTextFeedbackItem implements FeedbackItem {

  private final String collection;


  public GenerateTextFeedbackItem(String collection) {
    this.collection = collection;
  }

  @Override
  public String getType() {
    return "GenerateTextFeedbackItem";
  }

  @Override
  public String getCollection() {
    return collection;
  }


}
