package com.coremedia.labs.plugins.feedbackhub.wonki.jobs.summarizr;

import com.coremedia.cap.multisite.SitesService;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkAISettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.OptimizeService;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobFactory;
import edu.umd.cs.findbugs.annotations.NonNull;

public class SummarizRJobFactory implements JobFactory {

  private final OptimizeService service;

  private final SitesService sitesService;

  private final WonkAISettingsProvider wonkAISettingsProvider;

  public SummarizRJobFactory(OptimizeService service, SitesService sitesService, WonkAISettingsProvider wonkAISettingsProvider) {
    this.service = service;
    this.sitesService = sitesService;
    this.wonkAISettingsProvider = wonkAISettingsProvider;
  }

  @Override
  public boolean accepts(@NonNull String jobType) {
    return "wonkiGenerateSummary".equals(jobType);
  }

  @NonNull
  @Override
  public Job createJob() {
    return new SummarizRJob(service, sitesService, wonkAISettingsProvider);
  }
}
