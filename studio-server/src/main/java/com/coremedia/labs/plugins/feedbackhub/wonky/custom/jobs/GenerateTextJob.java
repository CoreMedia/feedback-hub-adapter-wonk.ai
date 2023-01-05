package com.coremedia.labs.plugins.feedbackhub.wonky.custom.jobs;

import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.WonkyGhostWritrService;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.dto.TextsResponse;
import com.coremedia.labs.plugins.feedbackhub.wonky.custom.FeedbackSettingsProvider;
import com.coremedia.rest.cap.jobs.GenericJobErrorCode;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobContext;
import com.coremedia.rest.cap.jobs.JobExecutionException;
import com.google.gson.annotations.SerializedName;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GenerateTextJob implements Job {
  private static final Logger LOG = LoggerFactory.getLogger(GenerateTextJob.class);

  private final WonkyGhostWritrService service;
  private final FeedbackSettingsProvider feedbackSettingsProvider;

  private String siteId;
  private String question;
  private String contentId;
  private String groupId;

  private final SitesService sitesService;


  public GenerateTextJob(WonkyGhostWritrService service, SitesService sitesService, FeedbackSettingsProvider feedbackSettingsProvider) {
    this.service = service;
    this.feedbackSettingsProvider = feedbackSettingsProvider;
    this.sitesService = sitesService;
  }

  @SerializedName("siteId")
  public void setSiteId(String siteId) {
    this.siteId = siteId;
  }

  @SerializedName("groupId")
  public void setGroupId(String groupId) {
    this.groupId = groupId;
  }

  @SerializedName("question")
  public void setQuestion(String question) {
    this.question = question;
  }

  @SerializedName("contentId")
  public void setContentId(String contentId) {
    this.contentId = contentId;
  }

  @Nullable
  @Override
  public Object call(@NonNull JobContext jobContext) throws JobExecutionException {
    try {

      WonkyGhostwritrSettings settings = getSettings();
      Site site = sitesService.getSite(siteId);
      TextsResponse textsResponse = service.generateTextFrom(question, site.getLocale().getLanguage(), settings);
      return textsResponse;
    } catch (Exception e) {
      LOG.error("Failed to generate text for given question: {} on content {}: {}", question, contentId, e.getMessage());
      throw new JobExecutionException(GenericJobErrorCode.FAILED);
    }
  }

  private WonkyGhostwritrSettings getSettings() {
    return feedbackSettingsProvider.getSettings(groupId, siteId);
  }
}
