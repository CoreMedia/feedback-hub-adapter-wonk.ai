package com.coremedia.labs.plugins.feedbackhub.wonki.jobs.ghostwritr;

import com.coremedia.cap.multisite.SitesService;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkAISettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.GhostwritRService;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobFactory;
import edu.umd.cs.findbugs.annotations.NonNull;

public class GenerateTextJobFactory implements JobFactory {

  private final GhostwritRService service;
  private final WonkAISettingsProvider wonkAISettingsProvider;

  private final SitesService sitesService;


  public GenerateTextJobFactory(GhostwritRService service, WonkAISettingsProvider wonkAISettingsProvider, SitesService sitesService) {
    this.service = service;
    this.wonkAISettingsProvider = wonkAISettingsProvider;
    this.sitesService = sitesService;
  }

  @Override
  public boolean accepts(@NonNull String jobType) {
    return "wonkiGenerateText".equals(jobType);
  }

  @NonNull
  @Override
  public Job createJob() {
    return new GenerateTextJob(service, sitesService, wonkAISettingsProvider);
  }
}
