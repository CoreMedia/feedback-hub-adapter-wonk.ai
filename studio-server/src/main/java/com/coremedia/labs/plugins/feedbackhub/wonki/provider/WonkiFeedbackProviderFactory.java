package com.coremedia.labs.plugins.feedbackhub.wonki.provider;

import com.coremedia.feedbackhub.adapter.FeedbackHubException;
import com.coremedia.feedbackhub.provider.FeedbackProvider;
import com.coremedia.feedbackhub.provider.FeedbackProviderFactory;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkiSettings;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkiFeedbackHubErrorCode;
import org.apache.commons.lang3.StringUtils;

public class WonkiFeedbackProviderFactory implements FeedbackProviderFactory<WonkiSettings> {

  public static final String TYPE = "wonki";

  public WonkiFeedbackProviderFactory() {
  }

  @Override
  public String getId() {
    return TYPE;
  }

  @Override
  public FeedbackProvider create(WonkiSettings settings) {
    String apiKey = settings.getApiKey();
    if (StringUtils.isEmpty(apiKey)) {
      throw new FeedbackHubException("Settings must provide an apiKey.", WonkiFeedbackHubErrorCode.API_KEY_NOT_SET);
    }
    return new WonkiFeedbackProvider(settings);
  }

}
