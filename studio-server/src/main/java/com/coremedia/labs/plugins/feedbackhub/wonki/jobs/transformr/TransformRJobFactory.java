package com.coremedia.labs.plugins.feedbackhub.wonki.jobs.transformr;

import com.coremedia.labs.plugins.feedbackhub.wonki.WonkAISettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.TransformRService;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobFactory;
import edu.umd.cs.findbugs.annotations.NonNull;

public class TransformRJobFactory implements JobFactory {

  private final TransformRService transformRService;

  private final WonkAISettingsProvider wonkAISettingsProvider;

  public TransformRJobFactory(TransformRService transformRService, WonkAISettingsProvider wonkAISettingsProvider) {
    this.transformRService = transformRService;
    this.wonkAISettingsProvider = wonkAISettingsProvider;
  }

  @Override
  public boolean accepts(@NonNull String jobType) {
    return "wonkiTransform".equals(jobType);
  }

  @NonNull
  @Override
  public Job createJob() {
    return new TransformRJob(transformRService, wonkAISettingsProvider);
  }
}
