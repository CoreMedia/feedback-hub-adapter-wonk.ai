package com.coremedia.labs.plugins.feedbackhub.wonki.adapter;

import com.coremedia.feedbackhub.adapter.FeedbackHubException;
import com.coremedia.feedbackhub.provider.FeedbackProvider;
import com.coremedia.feedbackhub.provider.FeedbackProviderFactory;
import com.coremedia.labs.plugins.feedbackhub.wonki.GhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonki.GhostwrtrFeedbackHubErrorCode;
import org.apache.commons.lang3.StringUtils;

public class GhostwritrFeedbackProviderFactory implements FeedbackProviderFactory<GhostwritrSettings> {

  public static final String TYPE = "ghostwritr";


  public GhostwritrFeedbackProviderFactory() {
  }

  @Override
  public String getId() {
    return TYPE;
  }

  @Override
  public FeedbackProvider create(GhostwritrSettings settings) {
    String apiKey = settings.getApiKey();
    if (StringUtils.isEmpty(apiKey)) {
      throw new FeedbackHubException("settings must provide an apiKey", GhostwrtrFeedbackHubErrorCode.API_KEY_NOT_SET);
    }

    return new GhostwriterFeedbackProvider();
  }
}
