package com.coremedia.labs.plugins.feedbackhub.wonki;

import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.List;

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

  List<String> getDenyList();

  List<String> getAllowList();

}
