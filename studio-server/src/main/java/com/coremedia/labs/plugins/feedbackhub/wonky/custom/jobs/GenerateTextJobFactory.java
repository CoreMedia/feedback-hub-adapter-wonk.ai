package com.coremedia.labs.plugins.feedbackhub.wonky.custom.jobs;

import com.coremedia.cap.multisite.SitesService;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.WonkyGhostWritrService;
import com.coremedia.labs.plugins.feedbackhub.wonky.custom.FeedbackSettingsProvider;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobFactory;
import edu.umd.cs.findbugs.annotations.NonNull;

public class GenerateTextJobFactory implements JobFactory {

  private final WonkyGhostWritrService service;
  private final FeedbackSettingsProvider feedbackSettingsProvider;

  private final SitesService sitesService;


  public GenerateTextJobFactory(WonkyGhostWritrService service, FeedbackSettingsProvider feedbackSettingsProvider, SitesService sitesService) {
    this.service = service;
    this.feedbackSettingsProvider = feedbackSettingsProvider;
    this.sitesService = sitesService;
  }

  @Override
  public boolean accepts(@NonNull String jobType) {
    return "generateText".equals(jobType);
  }

  @NonNull
  @Override
  public Job createJob() {
    return new GenerateTextJob(service, sitesService, feedbackSettingsProvider);
  }
}
