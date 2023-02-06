package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.SummaryResponse;
import org.junit.Test;

import java.util.Locale;
import java.util.Optional;

import static org.junit.Assert.assertTrue;

/**
 * Integration test for {@link SummarizRService}.
 */
public class SummarizRServiceIT extends AbstractWonkiServiceIT {

  private SummarizRService summarizRService;

  private static final String inputText = "Mehr als 70 Schriftsteller, Wissenschaftler und Ex-Politiker sprechen sich in einem offenen Brief dafür aus, die Ukraine deutlich stärker als bislang zu unterstützen: »mit Spenden, humanitärer und technischer Hilfe und mit den Waffen, mit denen die russischen Truppen zurückgedrängt werden können«. Der Appell richte sich an Bürger, Verbände, Unternehmen und die Bundesregierung. Die Unterstützung des ukrainischen Widerstands sei nicht nur eine moralische Pflicht, sondern liege in unserem ureigenen Interesse.  Zu den Initiatoren gehören Ralf Fücks vom Zentrum Liberale Moderne und Ulrich Schreiber vom Internationalen Literaturfestival Berlin. Wolf Biermann, Daniel Kehlmann, Eva Menasse und Herta Müller sind unter den Erstunterzeichnern.";

  @Override
  public void setUp() throws Exception {
    super.setUp();

    summarizRService = new SummarizRService(getConnector());
  }

  @Test
  public void testAbstractiveSummary() {
    Optional<SummaryResponse> abstractiveSummary = summarizRService.getAbstractiveSummary(inputText, Locale.GERMAN, false, 5, getApiKey());
    assertTrue(abstractiveSummary.isPresent());
  }

  @Test
  public void testExtractiveSummary() {
    Optional<SummaryResponse> extractiveSummary = summarizRService.getExtractiveSummary(inputText, Locale.GERMAN, false, 5, getApiKey());
    assertTrue(extractiveSummary.isPresent());
  }

}
