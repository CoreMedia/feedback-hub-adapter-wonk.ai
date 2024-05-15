package com.coremedia.labs.plugins.feedbackhub.wonki.jobs.optimize;

import com.coremedia.cap.content.Content;
import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkAISettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkiSettings;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.OptimizeService;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.OptimizeGenerationResponse;
import com.coremedia.rest.cap.jobs.GenericJobErrorCode;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobContext;
import com.coremedia.rest.cap.jobs.JobExecutionException;
import com.coremedia.xml.Markup;
import com.coremedia.xml.MarkupUtil;
import com.google.gson.annotations.SerializedName;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.apache.commons.lang3.NotImplementedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import static com.coremedia.labs.plugins.feedbackhub.wonki.provider.WonkiFeedbackProvider.FALLBACK_LOCALE;
import static java.util.stream.Collectors.toList;

public class OptimizeJob implements Job {
  private static final Logger LOG = LoggerFactory.getLogger(OptimizeJob.class);
  public static final String DETAIL_TEXT_PROPERTY = "detailText";
  public static final String DATA = "data";
  private String transformType;
  private String targetAudienceDescription;
  private List<String> focusKeywords;
  private Content content;
  private String groupId;
  private String siteId;
  private final SitesService sitesService;
  private final OptimizeService service;
  private final WonkAISettingsProvider wonkAISettingsProvider;

  public OptimizeJob(SitesService sitesService, OptimizeService service, WonkAISettingsProvider wonkAISettingsProvider) {
    this.sitesService = sitesService;
    this.service = service;
    this.wonkAISettingsProvider = wonkAISettingsProvider;
  }

  @SerializedName("tranformType")
  public void setTransformType(String transformType) {
    this.transformType = transformType;
  }

  @SerializedName("content")
  public void setContent(Content content) {
    this.content = content;
  }

  @SerializedName("groupId")
  public void setGroupId(String groupId) {
    this.groupId = groupId;
  }

  @SerializedName("focusKeywords")
  public void setFocusKeywords(List<String> focusKeywords) {
    this.focusKeywords = Collections.unmodifiableList(focusKeywords);
  }

  @SerializedName("siteId")
  public void setSiteId(String siteId) {
    this.siteId = siteId;
  }

  @SerializedName("targetAudienceDescription")
  public void setTargetAudienceDescription(String targetAudienceDescription) {this.targetAudienceDescription = targetAudienceDescription;}

  @Nullable
  @Override
  public Object call(@NonNull JobContext jobContext) throws JobExecutionException {
    try {
      Markup detailTextMarkup = content.getMarkup(DETAIL_TEXT_PROPERTY);
      String detailText = MarkupUtil.asPlainText(detailTextMarkup);
      Locale siteLocale = sitesService.findSite(siteId)
              .map(Site::getLocale)
              .orElse(FALLBACK_LOCALE);

      switch (transformType) {
        case "keywords":
          return generateKeywords(detailText, siteLocale);
        case "title":
          return generateTitle(detailText, siteLocale);
        case "metaDescription":
          return generateMetaDescription(detailText, siteLocale);
        case "teaserText":
          return generateTeaserText(detailText, siteLocale);
        default:
          throw new NotImplementedException();
      }

    } catch (Exception e) {
      LOG.error("Failed to generate keywords for content {}: {}", content.getId(), e.getMessage());
      throw new JobExecutionException(GenericJobErrorCode.FAILED);
    }
  }

  private Map<String, List<String>> generateKeywords(String text, Locale targetLocale) {
    List<String> keywordsResponse = service.generateKeywords(text, targetLocale, getSettings().getApiKey());
    List<String> trimmedKeywords = keywordsResponse.stream()
            .map(String::trim)
            .collect(toList());
    return Map.of(DATA, trimmedKeywords);
  }

  private Map<String, String> generateTitle(String text, Locale siteLocale) {
    Optional<OptimizeGenerationResponse> response = service.generateTitle(text, siteLocale, getSettings().getApiKey());
    String title = response.map(OptimizeGenerationResponse::getResult).orElse(null);
    return Map.of(DATA, title);
  }

  private Map<String, String> generateMetaDescription(String text, Locale siteLocale) {
    Optional<OptimizeGenerationResponse> response = service.generateMetaDescription(text, siteLocale, getSettings().getApiKey());
    String metaDescription = response.map(OptimizeGenerationResponse::getResult).orElse(null);

    return Map.of(DATA, metaDescription);
  }

  private Map<String, String> generateTeaserText(String text, Locale siteLocale) {
    Optional<OptimizeGenerationResponse> response = service.generateTeaserText(text, targetAudienceDescription, focusKeywords, siteLocale, getSettings().getApiKey());
    String teaserText = response.map(OptimizeGenerationResponse::getResult).orElse(null);

    return Map.of(DATA, teaserText);
  }

  private WonkiSettings getSettings() {
    return wonkAISettingsProvider.getSettings(groupId, siteId);
  }

}
