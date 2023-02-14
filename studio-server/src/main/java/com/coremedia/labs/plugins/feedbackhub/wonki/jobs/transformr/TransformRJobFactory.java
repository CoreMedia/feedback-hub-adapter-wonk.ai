package com.coremedia.labs.plugins.feedbackhub.wonki.jobs.transformr;

import com.coremedia.labs.plugins.feedbackhub.wonki.FeedbackSettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.TransformRService;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobFactory;
import edu.umd.cs.findbugs.annotations.NonNull;

public class TransformRJobFactory implements JobFactory {

  private final TransformRService transformRService;

  private final FeedbackSettingsProvider feedbackSettingsProvider;

  public TransformRJobFactory(TransformRService transformRService, FeedbackSettingsProvider feedbackSettingsProvider) {
    this.transformRService = transformRService;
    this.feedbackSettingsProvider = feedbackSettingsProvider;
  }

  @Override
  public boolean accepts(@NonNull String jobType) {
    return "wonkiTransform".equals(jobType);
  }

  @NonNull
  @Override
  public Job createJob() {
    return new TransformRJob(transformRService, feedbackSettingsProvider);
  }
}
