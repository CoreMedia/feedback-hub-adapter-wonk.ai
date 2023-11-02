package com.coremedia.labs.plugins.feedbackhub.wonki.jobs.ghostwritr;

import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.labs.plugins.feedbackhub.wonki.FeedbackSettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkiSettings;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.GhostwritRService;
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

import static com.coremedia.labs.plugins.feedbackhub.wonki.provider.WonkiFeedbackProvider.FALLBACK_LOCALE;

public class GenerateTextJob implements Job {
  private static final Logger LOG = LoggerFactory.getLogger(GenerateTextJob.class);
  private final GhostwritRService service;
  private final SitesService sitesService;
  private final FeedbackSettingsProvider feedbackSettingsProvider;

  private String siteId;
  private String question;
  private String contentId;
  private String groupId;

  public GenerateTextJob(GhostwritRService service, SitesService sitesService, FeedbackSettingsProvider feedbackSettingsProvider) {
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
      WonkiSettings settings = feedbackSettingsProvider.getSettings(groupId, siteId);
      Locale siteLocale = sitesService.findSite(siteId)
              .map(Site::getLocale)
              .orElse(FALLBACK_LOCALE);

      return service.generateText(question, settings.getApiKey(), settings.getDenyList(), settings.getAllowList(), siteLocale);
    } catch (Exception e) {
      LOG.error("Failed to generate text for given question: {} on content {}: {}", question, contentId, e.getMessage());
      throw new JobExecutionException(GenericJobErrorCode.FAILED, e.getMessage());
    }
  }

}
