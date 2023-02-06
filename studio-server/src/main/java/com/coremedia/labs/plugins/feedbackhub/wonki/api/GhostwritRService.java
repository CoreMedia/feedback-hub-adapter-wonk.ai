package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWComposeRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWDisambiguationRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWDisambiguationResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWFAQsRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWFAQsResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWQuestionsResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWResearchRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWResearchResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWTermRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWTextsRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWTextsResponse;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;

import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

public class GhostwritRService extends AbstractWonkiService {

  private static final String SERVICE_BASE_PATH = "/ghostwritr";
  private static final String API_VERSION = "v3";
  public static final String COMPOSE_PATH = SERVICE_BASE_PATH + "/" + API_VERSION + "/compose";
  public static final String DISAMBIGUATE_PATH = SERVICE_BASE_PATH + "/" + API_VERSION + "/disambiguate";
  public static final String FAQS_PATH = SERVICE_BASE_PATH + "/" + API_VERSION + "/faqs";
  public static final String QUESTIONS_PATH = SERVICE_BASE_PATH + "/" + API_VERSION + "/questions";
  public static final String RESEARCH_PATH = SERVICE_BASE_PATH + "/" + API_VERSION + "/research";
  public static final String TEXTS_PATH = SERVICE_BASE_PATH + "/" + API_VERSION + "/texts";

  public GhostwritRService(WonkiApiConnector apiConnector) {
    super(apiConnector);
  }

  /**
   * Compose text based on a given question and text passages.
   *
   * @param question input question
   * @param passages text passages
   * @param apiKey
   *
   * @return
   */
  @Nullable
  public String compose(@NonNull String question, @NonNull List<String> passages, @NonNull String apiKey) {
    GWComposeRequest requestEntity = new GWComposeRequest(question, passages);
    Optional<GWTextsResponse> apiResponse = getApiConnector().postResource(apiKey, COMPOSE_PATH, requestEntity, GWTextsResponse.class);
    return apiResponse.map(r->r.getText()).orElse(null);
  }


  /**
   * Detects if an entered term is ambiguous and outputs the possible readings.
   *
   * @param term input term
   * @param apiKey
   * @return
   */
  @NonNull
  public Optional<GWDisambiguationResponse> disambiguate(@NonNull String term, @NonNull String apiKey) {
    GWDisambiguationRequest requestEntity = new GWDisambiguationRequest(term);
    return getApiConnector().postResource(apiKey, DISAMBIGUATE_PATH, requestEntity, GWDisambiguationResponse.class);
  }

  /**
   * Generates questions and answers for a given input text.
   *
   * @param text input text
   * @param apiKey
   */
  public List<GWFAQsResponse.FAQResult> generateFAQ(@NonNull String text, @NonNull String apiKey) {
    GWFAQsRequest requestEntity = new GWFAQsRequest(text);
    Optional<GWFAQsResponse> apiResponse = getApiConnector().postResource(apiKey, FAQS_PATH, requestEntity, GWFAQsResponse.class);
    return apiResponse.map(r->r.getResults()).orElse(Collections.emptyList());
  }

  /**
   * Generates questions to a given keyword or context.
   *
   * @param term input term
   * @param targetLocale target locale
   * @param apiKey
   *
   * @return
   */
  public List<String> generateQuestions(@NonNull String term, @NonNull Locale targetLocale, @NonNull String apiKey) {
    GWTermRequest requestEntity = new GWTermRequest(term, targetLocale.getLanguage());
    Optional<GWQuestionsResponse> apiResponse = getApiConnector().postResource(apiKey, QUESTIONS_PATH, requestEntity, GWQuestionsResponse.class);
    return apiResponse.map(GWQuestionsResponse::getQuestions).orElse(Collections.emptyList());
  }

  public List<GWResearchResponse.ResearchResult> research(@NonNull String question, @NonNull String apiKey) {
    GWResearchRequest requestEntity = new GWResearchRequest(question);
    Optional<GWResearchResponse> apiResponse = getApiConnector().postResource(apiKey, RESEARCH_PATH, requestEntity, GWResearchResponse.class);
    return apiResponse.map(GWResearchResponse::getSources).orElse(Collections.emptyList());
  }

  /**
   * Generates text content from given questions and keywords, based on web searches and knowledge graphs.
   *
   * @param question input question
   * @param targetLocale target locale
   *
   * @return
   */
  public GWTextsResponse generateText(@NonNull String question, @NonNull Locale targetLocale, @NonNull String apiKey) {
    return generateText(question, targetLocale, true, Collections.emptyList(), Collections.emptyList(), apiKey);
  }

  /**
   * Generates text content from given questions and keywords, based on web searches and knowledge graphs.
   *
   * @param question input question
   * @param targetLocale target locale
   * @param returnSources include sources in the response or not
   * @param excludedSources list of sources to exclude
   * @param includedSources list of sources to include
   *
   * @return
   */
  public GWTextsResponse generateText(@NonNull String question, @NonNull Locale targetLocale, boolean returnSources,
                                      @NonNull List<String> excludedSources, @NonNull List<String> includedSources,
                                      @NonNull String apiKey) {
    GWTextsRequest GWTextsRequest = new GWTextsRequest(question, targetLocale.getLanguage(), true);
    Optional<GWTextsResponse> textsResponse = getApiConnector().postResource(apiKey, TEXTS_PATH, GWTextsRequest, GWTextsResponse.class);
    return textsResponse.orElseThrow();
  }



}
