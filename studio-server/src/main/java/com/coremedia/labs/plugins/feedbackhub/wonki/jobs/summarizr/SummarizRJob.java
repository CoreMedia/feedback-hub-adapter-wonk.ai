package com.coremedia.labs.plugins.feedbackhub.wonki.jobs.summarizr;

import com.coremedia.cap.common.CapConnection;
import com.coremedia.cap.content.Content;
import com.coremedia.cap.content.ContentRepository;
import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.labs.plugins.feedbackhub.wonki.FeedbackSettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkiSettings;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.SummarizRService;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.SummaryResponse;
import com.coremedia.rest.cap.jobs.GenericJobErrorCode;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobContext;
import com.coremedia.rest.cap.jobs.JobExecutionException;
import com.coremedia.xml.Markup;
import com.coremedia.xml.MarkupUtil;
import com.google.gson.annotations.SerializedName;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Locale;
import java.util.Map;
import java.util.Objects;

import static com.coremedia.labs.plugins.feedbackhub.wonki.provider.WonkiFeedbackProvider.FALLBACK_LOCALE;

public class SummarizRJob implements Job {
  private static final Logger LOG = LoggerFactory.getLogger(SummarizRJob.class);
  public static final String DETAIL_TEXT_PROPERTY = "detailText";

  private String contentId;
  private String strategy;
  private boolean greedy;
  private Integer sentenceCount;
  private String groupId;
  private String siteId;


  private final ContentRepository contentRepository;
  private final SummarizRService service;

  private final SitesService sitesService;
  private final FeedbackSettingsProvider feedbackSettingsProvider;


  public SummarizRJob(CapConnection capConnection, SummarizRService service, SitesService sitesService, FeedbackSettingsProvider feedbackSettingsProvider) {
    this.contentRepository = capConnection.getContentRepository();
    this.service = service;
    this.sitesService = sitesService;
    this.feedbackSettingsProvider = feedbackSettingsProvider;
  }

  @SerializedName("contentId")
  public void setContentId(String contentId) {
    this.contentId = contentId;
  }

  @SerializedName("strategy")
  public void setStrategy(String strategy) {
    this.strategy = strategy;
  }

  @SerializedName("greedy")
  public void setGreedy(boolean greedy) {
    this.greedy = greedy;
  }

  @SerializedName("sentences")
  public void setSentenceCount(Integer sentenceCount) {
    this.sentenceCount = sentenceCount;
  }

  @SerializedName("groupId")
  public void setGroupId(String groupId) {
    this.groupId = groupId;
  }

  @SerializedName("siteId")
  public void setSiteId(String siteId) {
    this.siteId = siteId;
  }

  @Nullable
  @Override
  public Object call(@NonNull JobContext jobContext) throws JobExecutionException {
    try {

      Content content = contentRepository.getContent(contentId);

      WonkiSettings settings = getSettings();
      Locale siteLocale = sitesService.findSite(siteId)
              .map(Site::getLocale)
              .orElse(FALLBACK_LOCALE);

      Markup detailTextMarkup = content.getMarkup(DETAIL_TEXT_PROPERTY);
      String detailText = MarkupUtil.asPlainText(detailTextMarkup);

      SummaryResponse summaryResponse;
      if (Objects.equals(strategy, "abstractive")) {
        summaryResponse = service.getAbstractiveSummary(detailText, siteLocale, greedy, sentenceCount, settings.getApiKey()).orElseThrow();
      } else {
        summaryResponse = service.getExtractiveSummary(detailText, siteLocale, greedy, sentenceCount, settings.getApiKey()).orElseThrow();
      }
      return Map.of("data", summaryResponse.getSummary());

    } catch (Exception e) {
      LOG.error("Failed summarize text for content {}: {}", contentId, e.getMessage());
      throw new JobExecutionException(GenericJobErrorCode.FAILED);
    }
  }

  private WonkiSettings getSettings() {
    return feedbackSettingsProvider.getSettings(groupId, siteId);
  }

}
