package com.coremedia.labs.plugins.feedbackhub.wonki;

import edu.umd.cs.findbugs.annotations.NonNull;

/**
 * Settings for Wonki Feedback Hub adapter.
 */
public interface WonkiSettings {

  /**
   * Returns the API key used for API calls.
   *
   * @return the api key
   */
  @NonNull
  String getApiKey();

}
