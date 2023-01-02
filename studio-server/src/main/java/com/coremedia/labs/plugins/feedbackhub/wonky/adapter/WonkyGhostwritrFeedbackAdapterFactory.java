package com.coremedia.labs.plugins.feedbackhub.wonky.adapter;

import com.coremedia.feedbackhub.adapter.FeedbackHubAdapter;
import com.coremedia.feedbackhub.adapter.FeedbackHubAdapterFactory;
import com.coremedia.feedbackhub.adapter.FeedbackHubException;
import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwrtrFeedbackHubErrorCode;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.WonkyGhostWritrService;
import org.apache.commons.lang3.StringUtils;

public class WonkyGhostwritrFeedbackAdapterFactory implements FeedbackHubAdapterFactory<WonkyGhostwritrSettings> {

  private final WonkyGhostWritrService wonkyGhostWritrService;

  public WonkyGhostwritrFeedbackAdapterFactory(WonkyGhostWritrService wonkyGhostWritrService) {
    this.wonkyGhostWritrService = wonkyGhostWritrService;
  }

  @Override
  public String getId() {
    return "wonkyAdapter";
  }

  @Override
  public FeedbackHubAdapter create(WonkyGhostwritrSettings settings) {
    String apiKey = settings.getApiKey();
    if (StringUtils.isEmpty(apiKey)) {
      throw new FeedbackHubException("settings must provide an apiKey", WonkyGhostwrtrFeedbackHubErrorCode.API_KEY_NOT_SET);
    }

    return new WonkyGhostwriterFeedbackAdapter(settings, wonkyGhostWritrService);
  }
}
