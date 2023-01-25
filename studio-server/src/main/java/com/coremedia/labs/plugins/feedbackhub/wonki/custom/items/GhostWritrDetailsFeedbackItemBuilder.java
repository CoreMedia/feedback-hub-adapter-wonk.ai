package com.coremedia.labs.plugins.feedbackhub.wonki.custom.items;

import com.coremedia.feedbackhub.items.FeedbackItemBuilder;

public class GhostWritrDetailsFeedbackItemBuilder extends FeedbackItemBuilder<GhostWritrDetailsFeedbackItemBuilder> {

  public GhostWritrDetailsFeedbackItem build() {
    return new GhostWritrDetailsFeedbackItem(this.collection);
  }
}
