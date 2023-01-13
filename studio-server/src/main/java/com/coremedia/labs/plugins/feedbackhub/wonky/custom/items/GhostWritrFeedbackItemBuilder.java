package com.coremedia.labs.plugins.feedbackhub.wonky.custom.items;

import com.coremedia.feedbackhub.items.FeedbackItemBuilder;

public class GhostWritrFeedbackItemBuilder extends FeedbackItemBuilder<GhostWritrFeedbackItemBuilder> {

  public GhostWritrFeedbackItem build() {
    return new GhostWritrFeedbackItem(this.collection);
  }
}
