package com.coremedia.labs.plugins.feedbackhub.wonki.jobs.summarizr;

import com.coremedia.cap.content.Content;
import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkAISettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkiSettings;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.OptimizeService;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.OptimizeLengthResponse;
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

import static com.coremedia.labs.plugins.feedbackhub.wonki.provider.WonkiFeedbackProvider.FALLBACK_LOCALE;

public class SummarizRJob implements Job {
  private static final Logger LOG = LoggerFactory.getLogger(SummarizRJob.class);
  public static final String DETAIL_TEXT_PROPERTY = "detailText";

  private Content content;
  private String strategy;
  private boolean greedy;
  private Integer sentences;
  private String groupId;
  private String siteId;
  private final OptimizeService service;
  private final SitesService sitesService;
  private final WonkAISettingsProvider wonkAISettingsProvider;


  public SummarizRJob(OptimizeService service, SitesService sitesService, WonkAISettingsProvider wonkAISettingsProvider) {
    this.service = service;
    this.sitesService = sitesService;
    this.wonkAISettingsProvider = wonkAISettingsProvider;
  }

  @SerializedName("content")
  public void setContent(Content content) {
    this.content = content;
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
  public void setSentences(Integer sentences) {
    this.sentences = sentences;
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
      WonkiSettings settings = getSettings();
      Locale siteLocale = sitesService.findSite(siteId)
              .map(Site::getLocale)
              .orElse(FALLBACK_LOCALE);

      Markup detailTextMarkup = content.getMarkup(DETAIL_TEXT_PROPERTY);
      String detailText = MarkupUtil.asPlainText(detailTextMarkup);

      OptimizeLengthResponse response = service.optimizeLength(detailText, siteLocale, settings.getApiKey());

      return Map.of("data", response.getResult());

    } catch (Exception e) {
      LOG.error("Failed summarize text for content {}: {}", content.getId(), e.getMessage());
      throw new JobExecutionException(GenericJobErrorCode.FAILED);
    }
  }

  private WonkiSettings getSettings() {
    return wonkAISettingsProvider.getSettings(groupId, siteId);
  }

}
