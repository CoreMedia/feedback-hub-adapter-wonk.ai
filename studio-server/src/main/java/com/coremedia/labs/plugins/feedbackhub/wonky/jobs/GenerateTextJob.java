package com.coremedia.labs.plugins.feedbackhub.wonky.jobs;

import com.coremedia.cap.common.IdHelper;
import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.WonkyGhostWritrService;
import com.coremedia.labs.plugins.feedbackhub.wonky.FeedbackSettingsProvider;
import com.coremedia.rest.cap.jobs.GenericJobErrorCode;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobContext;
import com.coremedia.rest.cap.jobs.JobExecutionException;
import com.google.gson.annotations.SerializedName;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Locale;

public class GenerateTextJob implements Job {
  private static final Logger LOG = LoggerFactory.getLogger(GenerateTextJob.class);
  public static final String FALLBACK_LANGUAGE = "en";

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
      String language = sitesService.findSite(siteId)
              .map(Site::getLocale)
              .map(Locale::getLanguage)
              .orElse(FALLBACK_LANGUAGE);

      return service.generateTextFrom(question, language, settings);
    } catch (Exception e) {
      LOG.error("Failed to generate text for given question: {} on content {}: {}", question, contentId, e.getMessage());
      throw new JobExecutionException(GenericJobErrorCode.FAILED, e.getMessage());
    }
  }

  private WonkyGhostwritrSettings getSettings() {
    return feedbackSettingsProvider.getSettings(groupId, siteId);
  }
}
