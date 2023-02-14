package com.coremedia.labs.plugins.feedbackhub.wonki.jobs.transformr;

import com.coremedia.cap.content.Content;
import com.coremedia.labs.plugins.feedbackhub.wonki.FeedbackSettingsProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkiSettings;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.TransformRService;
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

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

public class TransformRJob implements Job {
  private static final Logger LOG = LoggerFactory.getLogger(TransformRJob.class);
  public static final String DETAIL_TEXT_PROPERTY = "detailText";
  public static final String DATA = "data";
  private String transformType;
  private Content content;
  private String groupId;
  private String siteId;
  private final TransformRService service;
  private final FeedbackSettingsProvider feedbackSettingsProvider;

  public TransformRJob(TransformRService service, FeedbackSettingsProvider feedbackSettingsProvider) {
    this.service = service;
    this.feedbackSettingsProvider = feedbackSettingsProvider;
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

  @SerializedName("siteId")
  public void setSiteId(String siteId) {
    this.siteId = siteId;
  }

  @Nullable
  @Override
  public Object call(@NonNull JobContext jobContext) throws JobExecutionException {
    try {
      Markup detailTextMarkup = content.getMarkup(DETAIL_TEXT_PROPERTY);
      String detailText = MarkupUtil.asPlainText(detailTextMarkup);

      switch (transformType) {
        case "keywords":
          return generateKeywords(detailText);
        case "title":
          return generateTitle(detailText);
        case "metaDescription":
          return generateMetaDescription(detailText);
        default:
          throw new NotImplementedException();
      }

    } catch (Exception e) {
      LOG.error("Failed to generate keywords for content {}: {}", content.getId(), e.getMessage());
      throw new JobExecutionException(GenericJobErrorCode.FAILED);
    }
  }

  private Map<String, List<String>> generateKeywords(String text) {
    List<String> keywordsResponse = service.generateKeywords(text, getSettings().getApiKey());
    List<String> trimmedKeywords = keywordsResponse.stream()
            .map(String::trim)
            .collect(toList());
    return Map.of(DATA, trimmedKeywords);
  }

  private Map<String, String> generateTitle(String text) {
    String titleResponse = service.generateTitle(text, getSettings().getApiKey());
    return Map.of(DATA, titleResponse);
  }

  private Map<String, String> generateMetaDescription(String text) {
    String metaDescriptionResponse = service.generateMetaDescription(text, getSettings().getApiKey());
    return Map.of(DATA, metaDescriptionResponse);
  }

  private WonkiSettings getSettings() {
    return feedbackSettingsProvider.getSettings(groupId, siteId);
  }

}
