package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.OptimizeDefaultRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.OptimizeDetectLanguageResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.OptimizeGenerationResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.OptimizeLengthResponse;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * The TransformR service is able to convert existing content into new formats, change the tone or generate statistics.
 */
public class OptimizeService extends AbstractWonkiService {

  private static final Logger LOG = LoggerFactory.getLogger(OptimizeService.class);

  private static final String OPTIMIZE_PATH = "optimize";


  //GENERATE
  private static final String GENERATION_PATH = "/generation";
  private static final String GENERATE_KEYWORDS_PATH = OPTIMIZE_PATH + GENERATION_PATH + "/keywords";
  private static final String GENERATE_META_DESCRIPTION_PATH = OPTIMIZE_PATH + GENERATION_PATH + "/metadescription";
  private static final String GENERATE_TITLE_PATH = OPTIMIZE_PATH + GENERATION_PATH + "/title";
  private static final String GENERATE_TEASER_PATH = OPTIMIZE_PATH + GENERATION_PATH + "/teaser";

  //IDENTIFY
  private static final String IDENTIFICATION_PATH = "/identification";

  private static final String DETECT_LANGUAGE_PATH = OPTIMIZE_PATH + IDENTIFICATION_PATH + "/language";

  //OPTIMIZE
  private static final String OPTIMIZATION_PATH = "/optimization";
  private static final String OPTIMIZE_LENGTH_PATH = OPTIMIZE_PATH + OPTIMIZATION_PATH + "/length";


  public OptimizeService(WonkiApiConnector apiConnector) {
    super(apiConnector);
  }


  /**
   * Detects the language of a given text.
   *
   * @param text   input text
   * @param apiKey
   * @return
   */
  public OptimizeDetectLanguageResponse detectLanguage(@NonNull String text, @NonNull String apiKey) {
    OptimizeDefaultRequest requestEntity = new OptimizeDefaultRequest(text);
    Optional<OptimizeDetectLanguageResponse> apiResponse = getApiConnector().postResource(apiKey, DETECT_LANGUAGE_PATH, requestEntity, OptimizeDetectLanguageResponse.class);
    return apiResponse.orElse(null);
  }


  /**
   * This service creates keywords based on an existing text, which helps to better tag texts and maintain metadata.
   *
   * @param text         input text
   * @param targetLocale
   * @return
   */
  @NonNull
  public List<String> generateKeywords(@NonNull String text, Locale targetLocale, @NonNull String apiKey) {
    return fetchTransformResponse(GENERATE_KEYWORDS_PATH, text, null, null, targetLocale, apiKey)
            .map(OptimizeGenerationResponse::getCandidates)
            .orElse(Collections.emptyList());
  }


  /**
   * This service creates Webpage Meta Descriptions.
   *
   * @param text         input text
   * @param targetLocale
   * @return
   */
  public Optional<OptimizeGenerationResponse> generateMetaDescription(@NonNull String text, Locale targetLocale, @NonNull String apiKey) {
    return fetchTransformResponse(GENERATE_META_DESCRIPTION_PATH, text, null, null, targetLocale, apiKey);
  }

  /**
   * This service creates teaser text based on the given text.
   *
   * @param text         input text
   * @param targetLocale
   * @return
   */
  public Optional<OptimizeGenerationResponse> generateTeaserText(@NonNull String text, String targetAudienceDescription, List<String> focusKeywords, Locale targetLocale, @NonNull String apiKey) {
    return fetchTransformResponse(GENERATE_TEASER_PATH, text, targetAudienceDescription, focusKeywords, targetLocale, apiKey);
  }

  /**
   * This service optimizes the length of given texts.
   *
   * @param text         input text
   * @param targetLocale
   * @param apiKey
   * @return
   */
  @Nullable
  public OptimizeLengthResponse optimizeLength(@NonNull String text, Locale targetLocale, @NonNull String apiKey) {
    OptimizeDefaultRequest requestEntity = new OptimizeDefaultRequest(text, targetLocale.getLanguage());
    Optional<OptimizeLengthResponse> apiResponse = getApiConnector().postResource(apiKey, OPTIMIZE_LENGTH_PATH, requestEntity, OptimizeLengthResponse.class);
    return apiResponse.orElse(null);
  }

  /**
   * Generates a title, headline or subheadline for a given text.
   *
   * @param text         input text
   * @param targetLocale
   * @param apiKey
   * @return
   */
  public Optional<OptimizeGenerationResponse> generateTitle(@NonNull String text, Locale targetLocale, @NonNull String apiKey) {
    return fetchTransformResponse(GENERATE_TITLE_PATH, text, null, null, targetLocale, apiKey);
  }

  private Optional<OptimizeGenerationResponse> fetchTransformResponse(@NonNull String apiPath,
                                                                      @NonNull String text,
                                                                      String targetAudienceDescription,
                                                                      List<String> focusKeywords,
                                                                      Locale targetLocale,
                                                                      @NonNull String apiKey) {
    OptimizeDefaultRequest requestEntity = new OptimizeDefaultRequest(text, targetAudienceDescription, focusKeywords, targetLocale.getLanguage());
    Optional<OptimizeGenerationResponse> apiResponse = getApiConnector().postResource(apiKey, apiPath, requestEntity, OptimizeGenerationResponse.class);
    return apiResponse;
  }

}
