package com.coremedia.labs.plugins.feedbackhub.wonki.jobs.summarizr;

import com.coremedia.cap.common.CapConnection;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.labs.plugins.feedbackhub.wonki.FeedbackSettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.SummarizRService;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobFactory;
import edu.umd.cs.findbugs.annotations.NonNull;

public class SummarizRJobFactory implements JobFactory {

  private final SummarizRService summarizRService;

  private final SitesService sitesService;

  private final FeedbackSettingsProvider feedbackSettingsProvider;

  public SummarizRJobFactory( SummarizRService summarizRService, SitesService sitesService, FeedbackSettingsProvider feedbackSettingsProvider) {
    this.summarizRService = summarizRService;
    this.sitesService = sitesService;
    this.feedbackSettingsProvider = feedbackSettingsProvider;
  }

  @Override
  public boolean accepts(@NonNull String jobType) {
    return "wonkiGenerateSummary".equals(jobType);
  }

  @NonNull
  @Override
  public Job createJob() {
    return new SummarizRJob(summarizRService, sitesService, feedbackSettingsProvider);
  }
}
