package com.coremedia.labs.plugins.feedbackhub.wonki;

import com.coremedia.feedbackhub.settings.FeedbackSettingsProvider;

public class WonkAISettingsProvider {

  private final FeedbackSettingsProvider feedbackSettingsProvider;

  private final String factoryId;

  public WonkAISettingsProvider(FeedbackSettingsProvider feedbackSettingsProvider, String factoryId) {
    this.factoryId = factoryId;
    this.feedbackSettingsProvider = feedbackSettingsProvider;
  }

  public WonkiSettings getSettings(String groupId, String siteId) {
    return feedbackSettingsProvider.getSettings(WonkiSettings.class, factoryId, groupId, siteId);
  }

}
