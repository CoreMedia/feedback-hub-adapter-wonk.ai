package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TransformerChangeToneRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TransformerChangeToneResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TransformerDefaultRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TransformerDefaultResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TransformerDetectLanguageResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TransformerExtendTextResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TransformerTextStatsResponse;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

/**
 * The TransformR service is able to convert existing content into new formats, change the tone or generate statistics.
 */
public class TransformRService extends AbstractWonkiService {

  private static final Logger LOG = LoggerFactory.getLogger(TransformRService.class);

  private static final String TRANSFORMR_PATH = "transformr";
  private static final String CHANGE_FORMALITY_PATH = TRANSFORMR_PATH + "/changeformality";
  private static final String CONTINUE_TEXT_PATH = TRANSFORMR_PATH + "/continuetext";
  private static final String DETECT_LANGUAGE_PATH = TRANSFORMR_PATH + "/detectlanguage";
  private static final String EXTEND_TEXT_PATH = TRANSFORMR_PATH + "/extendtext";
  private static final String GENERATE_KEYWORDS_PATH = TRANSFORMR_PATH + "/generatekeywords";
  private static final String GENERATE_META_DESCRIPTION_PATH = TRANSFORMR_PATH + "/generatemetadescription";
  private static final String GENERATE_SUMMARY_PATH = TRANSFORMR_PATH + "/generatesummary";
  private static final String GENERATE_TEXT_STATS_PATH = TRANSFORMR_PATH + "/generatetextstats";
  private static final String GENERATE_TITLE_PATH = TRANSFORMR_PATH + "/generatetitle";
  private static final String SPIN_TEXT_V1_PATH = TRANSFORMR_PATH + "/spintext";
  private static final String SPIN_TEXT_V2_PATH = TRANSFORMR_PATH + "/spintext/v2";

  public TransformRService(WonkiApiConnector apiConnector) {
    super(apiConnector);
  }

  /**
   * Change the formality of the given text to the provided formality mode.
   *
   * @param text input text
   * @param targetLocale target locale
   * @param formalityMode target formality
   * @param apiKey api key
   *
   * @return
   */
  @Nullable
  public String changeTone(@NonNull String text, @NonNull Locale targetLocale, @NonNull FormalityMode formalityMode, @NonNull String apiKey) {
    TransformerChangeToneRequest requestEntity = new TransformerChangeToneRequest(text, targetLocale.getLanguage(), formalityMode.toString());
    Optional<TransformerChangeToneResponse> apiResponse = getApiConnector().postResource(apiKey, CHANGE_FORMALITY_PATH, requestEntity, TransformerChangeToneResponse.class);
    if (apiResponse.isPresent()) {
      TransformerChangeToneResponse changeToneResponse = apiResponse.get();
      if (changeToneResponse.getResult().isError()) {
        LOG.warn("Could not change tone. {}", changeToneResponse.getResult().getErrorDescription());
      } else {
        return changeToneResponse.getResult().getText();
      }
    }
    return null;
  }

  /**
   * This service adds text to existing text based on the given context.
   *
   * @param text input text
   * @param apiKey
   * @return
   */
  public String continueText(@NonNull String text, @NonNull String apiKey) {
    TransformerDefaultRequest requestEntity = new TransformerDefaultRequest(text);
    Optional<TransformerDefaultResponse> apiResponse = getApiConnector().postResource(apiKey, CONTINUE_TEXT_PATH, requestEntity, TransformerDefaultResponse.class);
    return apiResponse.map(TransformerDefaultResponse::getResult).orElse(null);
  }

  /**
   * Detects the language of a given text.
   *
   * @param text input text
   * @param apiKey
   * @return
   */
  public TransformerDetectLanguageResponse detectLanguage(@NonNull String text, @NonNull String apiKey) {
    TransformerDefaultRequest requestEntity = new TransformerDefaultRequest(text);
    Optional<Map> response = getApiConnector().postResource(apiKey, DETECT_LANGUAGE_PATH, requestEntity, Map.class);
    Optional<TransformerDetectLanguageResponse> apiResponse = getApiConnector().postResource(apiKey, DETECT_LANGUAGE_PATH, requestEntity, TransformerDetectLanguageResponse.class);
    return apiResponse.orElse(null);
  }


  /**
   * Inserts text to existing text based on the given context.
   * The text will be inserted somewhere in the existing text.
   *
   * @param text input text
   * @param apiKey api key
   *
   * @return
   */
  @NonNull
  public String extendText(@NonNull String text, @NonNull String apiKey) {
    TransformerDefaultRequest requestEntity = new TransformerDefaultRequest(text);
    Optional<TransformerExtendTextResponse> apiResponse = getApiConnector().postResource(apiKey, EXTEND_TEXT_PATH, requestEntity, TransformerExtendTextResponse.class);
    return apiResponse.map(TransformerExtendTextResponse::getResult).orElse(text);
  }

  /**
   * This service creates keywords based on an existing text, which helps to better tag texts and maintain metadata.
   *
   * @param text input text
   *
   * @return
   */
  @NonNull
  public List<String> generateKeywords(@NonNull String text, @NonNull String apiKey) {
    return Optional.ofNullable(fetchTransformResponse(GENERATE_KEYWORDS_PATH, text, apiKey))
            .map(r -> Arrays.asList(r.split(",")))
            .orElse(Collections.emptyList());
  }


  /**
   * This service creates Webpage Meta Descriptions.
   *
   * @param text input text
   *
   * @return
   */
  @Nullable
  public String generateMetaDescription(@NonNull String text, @NonNull String apiKey) {
    return fetchTransformResponse(GENERATE_META_DESCRIPTION_PATH, text, apiKey);
  }

  /**
   * This service generates summaries for given texts.
   *
   * @param text input text
   * @param apiKey
   * @return
   */
  @Nullable
  public String generateSummary(@NonNull String text, @NonNull String apiKey) {
    return fetchTransformResponse(GENERATE_SUMMARY_PATH, text, apiKey);
  }

  /**
   * Generates stats for a given text, e.g. number of unique tokens, token count, POS stats, readability and more.
   *
   * @param text input text
   * @param apiKey
   *
   * @return
   */
  @Nullable
  public Map<String, Object> generateTextStats(@NonNull String text, @NonNull String apiKey) {
    TransformerDefaultRequest requestEntity = new TransformerDefaultRequest(text);
    Optional<TransformerTextStatsResponse> apiResponse = getApiConnector().postResource(apiKey, GENERATE_TEXT_STATS_PATH, requestEntity, TransformerTextStatsResponse.class);
    return apiResponse.map(TransformerTextStatsResponse::getResults).orElse(null);
  }

  /**
   * Generates a title, headline or subheadline for a given text.
   *
   * @param text input text
   * @param apiKey
   * @return
   */
  @Nullable
  public String generateTitle(@NonNull String text, @NonNull String apiKey) {
    return fetchTransformResponse(GENERATE_TITLE_PATH, text, apiKey);
  }

  /**
   * Make texts appear in new brilliance through a new choice of words and grammatical changes.
   * The second version supports new AI methods, but it is a bit slower.
   *
   * @param text input text
   * @param apiKey api key
   * @param useV2 use version 2 or not
   *
   * @return
   */
  public String spinText(@NonNull String text, @NonNull String apiKey, boolean useV2) {
    return fetchTransformResponse(useV2 ? SPIN_TEXT_V2_PATH : SPIN_TEXT_V1_PATH, text, apiKey);
  }

  /**
   * Make texts appear in new brilliance through a new choice of words and grammatical changes.
   * This method uses new AI methods, but it is a bit slower.
   *
   * @param text input text
   * @param apiKey
   * @return
   */
  public String spinText(@NonNull String text, @NonNull String apiKey) {
    return spinText(text, apiKey, true);
  }

  @Nullable
  private String fetchTransformResponse(@NonNull String apiPath, @NonNull String text, @NonNull String apiKey) {
    TransformerDefaultRequest requestEntity = new TransformerDefaultRequest(text);
    Optional<TransformerDefaultResponse> apiResponse = getApiConnector().postResource(apiKey, apiPath, requestEntity, TransformerDefaultResponse.class);
    return apiResponse.map(TransformerDefaultResponse::getResult).orElse(null);
  }

  public enum FormalityMode {
    FORMAL, INFORMAL;

    @Override
    public String toString() {
      return name().toLowerCase();
    }
  }

}
