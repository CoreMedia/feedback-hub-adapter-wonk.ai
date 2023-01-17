package com.coremedia.labs.plugins.feedbackhub.wonky.custom.items;

import com.coremedia.feedbackhub.items.FeedbackItem;

/**
 *
 */
public class GhostWritrDetailsFeedbackItem implements FeedbackItem {

  private final String collection;


  public GhostWritrDetailsFeedbackItem(String collection) {
    this.collection = collection;
  }

  @Override
  public String getType() {
    return "GhostwritrDetailsFeedbackItem";
  }

  @Override
  public String getCollection() {
    return collection;
  }

  public static GhostWritrDetailsFeedbackItemBuilder builder() {
    return new GhostWritrDetailsFeedbackItemBuilder();
  }


}
