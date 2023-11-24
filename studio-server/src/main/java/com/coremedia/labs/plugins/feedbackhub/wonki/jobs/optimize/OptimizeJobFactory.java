package com.coremedia.labs.plugins.feedbackhub.wonki.jobs.optimize;

import com.coremedia.cap.multisite.SitesService;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkAISettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.OptimizeService;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobFactory;
import edu.umd.cs.findbugs.annotations.NonNull;

public class OptimizeJobFactory implements JobFactory {

  private final OptimizeService optimizeService;

  private final WonkAISettingsProvider wonkAISettingsProvider;

  private final SitesService sitesService;


  public OptimizeJobFactory(OptimizeService optimizeService, WonkAISettingsProvider wonkAISettingsProvider, SitesService sitesService) {
    this.optimizeService = optimizeService;
    this.wonkAISettingsProvider = wonkAISettingsProvider;
    this.sitesService = sitesService;
  }

  @Override
  public boolean accepts(@NonNull String jobType) {
    return "wonkiTransform".equals(jobType);
  }

  @NonNull
  @Override
  public Job createJob() {
    return new OptimizeJob(sitesService, optimizeService, wonkAISettingsProvider);
  }
}
