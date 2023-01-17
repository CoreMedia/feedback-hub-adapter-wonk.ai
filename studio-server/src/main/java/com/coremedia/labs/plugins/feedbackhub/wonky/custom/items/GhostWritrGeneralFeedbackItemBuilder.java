package com.coremedia.labs.plugins.feedbackhub.wonky.custom.items;

import com.coremedia.feedbackhub.items.FeedbackItemBuilder;

public class GhostWritrGeneralFeedbackItemBuilder extends FeedbackItemBuilder<GhostWritrGeneralFeedbackItemBuilder> {

  public GhostWritrGeneralFeedbackItem build() {
    return new GhostWritrGeneralFeedbackItem(this.collection);
  }
}
