package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.SummaryRequest;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.SummaryResponse;
import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.Locale;
import java.util.Optional;

/**
 * The wonki SummarizR is able to summarize texts using various strategies.
 * - Abstract summaries are rewritten texts that can differ significantly from the original.
 * - Extracted summaries keep the original sentences and remove less relevant content.
 */
public class SummarizRService extends AbstractWonkiService {

  private static final String SERVICE_BASE_PATH = "/summarizr";

  private static final String ABSTRACTIVE_SUMMARY_PATH = SERVICE_BASE_PATH + "/abstractive";
  private static final String EXTRACTIVE_SUMMARY_PATH = SERVICE_BASE_PATH + "/extractive";


  public SummarizRService(WonkiApiConnector apiConnector) {
    super(apiConnector);
  }


  /**
   * Summarize the given text using the abstract summary strategy.
   * Abstract summaries are rewritten texts that can differ significantly from the original.
   *
   * @param text input text
   * @param targetLocale target locale
   * @param greedy greedy mode flag
   * @param sentenceCount number of sentences to return
   *
   * @return
   */
  public Optional<SummaryResponse> getAbstractiveSummary(@NonNull String text, @NonNull Locale targetLocale, boolean greedy, int sentenceCount, @NonNull String apiKey) {
    SummaryRequest requestEntity = new SummaryRequest(text, targetLocale.getLanguage(), greedy, sentenceCount);
    return getApiConnector().postResource(apiKey, ABSTRACTIVE_SUMMARY_PATH, requestEntity, SummaryResponse.class);
  }

  /**
   * Summarize the given text using the extractive summary strategy.
   * Extracted summaries keep the original sentences and remove less relevant content.
   *
   * @param text input text
   * @param targetLocale target locale
   * @param greedy greedy mode flag
   * @param sentenceCount number of sentences to return
   *
   * @return
   */
  public Optional<SummaryResponse> getExtractiveSummary(@NonNull String text, @NonNull Locale targetLocale, boolean greedy, int sentenceCount, @NonNull String apiKey) {
    SummaryRequest requestEntity = new SummaryRequest(text, targetLocale.getLanguage(), greedy, sentenceCount);
    return getApiConnector().postResource(apiKey, EXTRACTIVE_SUMMARY_PATH, requestEntity, SummaryResponse.class);
  }


}
