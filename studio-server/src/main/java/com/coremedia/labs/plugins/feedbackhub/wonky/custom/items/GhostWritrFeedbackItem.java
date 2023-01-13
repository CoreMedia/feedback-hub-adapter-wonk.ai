package com.coremedia.labs.plugins.feedbackhub.wonky.custom.items;

import com.coremedia.feedbackhub.items.FeedbackItem;

/**
 *
 */
public class GhostWritrFeedbackItem implements FeedbackItem {

  private final String collection;


  public GhostWritrFeedbackItem(String collection) {
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

  public static GhostWritrFeedbackItemBuilder builder() {
    return new GhostWritrFeedbackItemBuilder();
  }


}
