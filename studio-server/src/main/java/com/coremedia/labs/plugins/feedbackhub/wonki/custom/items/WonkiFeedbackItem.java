package com.coremedia.labs.plugins.feedbackhub.wonki.custom.items;

import com.coremedia.feedbackhub.items.FeedbackItem;


public class WonkiFeedbackItem implements FeedbackItem {

  private final String collection;

  private final String itemType;

  public WonkiFeedbackItem(String collection, String itemType) {
    this.collection = collection;
    this.itemType = itemType;
  }

  @Override
  public String getType() {
    return itemType;
  }

  @Override
  public String getCollection() {
    return collection;
  }

}
