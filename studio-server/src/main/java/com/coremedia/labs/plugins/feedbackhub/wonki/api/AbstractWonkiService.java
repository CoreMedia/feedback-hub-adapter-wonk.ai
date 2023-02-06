package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.api.WonkiApiConnector;

public abstract class AbstractWonkiService {

  private WonkiApiConnector apiConnector;

  public AbstractWonkiService(WonkiApiConnector apiConnector) {
    this.apiConnector = apiConnector;
  }

  public WonkiApiConnector getApiConnector() {
    return apiConnector;
  }

}
