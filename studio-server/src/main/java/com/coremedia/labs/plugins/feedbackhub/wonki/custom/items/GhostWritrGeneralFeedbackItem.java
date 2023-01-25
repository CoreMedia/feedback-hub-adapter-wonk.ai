package com.coremedia.labs.plugins.feedbackhub.wonki.custom.items;

import com.coremedia.feedbackhub.items.FeedbackItem;


public class GhostWritrGeneralFeedbackItem implements FeedbackItem {

  private final String collection;


  public GhostWritrGeneralFeedbackItem(String collection) {
    this.collection = collection;
  }

  @Override
  public String getType() {
    return "GhostWritrGeneralFeedbackItem";
  }

  @Override
  public String getCollection() {
    return collection;
  }

  public static GhostWritrGeneralFeedbackItemBuilder builder() {
    return new GhostWritrGeneralFeedbackItemBuilder();
  }


}
