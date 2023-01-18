package com.coremedia.labs.plugins.feedbackhub.wonky.adapter;

import com.coremedia.feedbackhub.adapter.FeedbackHubException;
import com.coremedia.feedbackhub.provider.FeedbackProvider;
import com.coremedia.feedbackhub.provider.FeedbackProviderFactory;
import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwrtrFeedbackHubErrorCode;
import org.apache.commons.lang3.StringUtils;

public class WonkyGhostwritrFeedbackProviderFactory implements FeedbackProviderFactory<WonkyGhostwritrSettings> {

  public static final String TYPE = "ghostwritr";


  public WonkyGhostwritrFeedbackProviderFactory() {
  }

  @Override
  public String getId() {
    return TYPE;
  }

  @Override
  public FeedbackProvider create(WonkyGhostwritrSettings settings) {
    String apiKey = settings.getApiKey();
    if (StringUtils.isEmpty(apiKey)) {
      throw new FeedbackHubException("settings must provide an apiKey", WonkyGhostwrtrFeedbackHubErrorCode.API_KEY_NOT_SET);
    }

    return new WonkyGhostwriterFeedbackProvider();
  }
}
