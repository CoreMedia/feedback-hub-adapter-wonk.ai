package com.coremedia.labs.plugins.feedbackhub.wonki.api.dto;

import com.google.gson.annotations.SerializedName;

import java.util.List;

import static com.coremedia.labs.plugins.feedbackhub.wonki.provider.WonkiFeedbackProvider.FALLBACK_LOCALE;
import static java.util.Collections.unmodifiableList;

public class OptimizeDefaultRequest {


  @SerializedName("source_text")
  private String sourceText;
  @SerializedName("output_examples")

  private List<String> outputExamples;
  @SerializedName("target_audience_description")

  private String targetAudienceDescription;
  @SerializedName("target_lang")

  private String targetLang;
  @SerializedName("target_tags")

  private List<String> targetTags;
  @SerializedName("use_cache")

  private boolean useCache;

  public OptimizeDefaultRequest(String sourceText, List<String> outputExamples, String targetAudienceDescription, String targetLang, List<String> targetTags, boolean useCache) {
    this.sourceText = sourceText;
    this.outputExamples = unmodifiableList(outputExamples);
    this.targetAudienceDescription = targetAudienceDescription;
    this.targetLang = targetLang;
    this.targetTags = unmodifiableList(targetTags);
    this.useCache = useCache;
  }

  public OptimizeDefaultRequest(String sourceText, String targetLang) {
    this(sourceText, List.of(), "", targetLang, List.of(), true);
  }

  public OptimizeDefaultRequest(String sourceText) {
    this(sourceText, List.of(), "", FALLBACK_LOCALE.getLanguage(), List.of(), true);
  }

  public String getSourceText() {
    return sourceText;
  }

  public void setSourceText(String sourceText) {
    this.sourceText = sourceText;
  }

  public List<String> getOutputExamples() {
    return outputExamples;
  }

  public void setOutputExamples(List<String> outputExamples) {
    this.outputExamples = outputExamples;
  }

  public String getTargetAudienceDescription() {
    return targetAudienceDescription;
  }

  public void setTargetAudienceDescription(String targetAudienceDescription) {
    this.targetAudienceDescription = targetAudienceDescription;
  }

  public String getTargetLang() {
    return targetLang;
  }

  public void setTargetLang(String targetLang) {
    this.targetLang = targetLang;
  }

  public List<String> getTargetTags() {
    return targetTags;
  }

  public void setTargetTags(List<String> targetTags) {
    this.targetTags = targetTags;
  }

  public boolean isUseCache() {
    return useCache;
  }

  public void setUseCache(boolean useCache) {
    this.useCache = useCache;
  }
}
