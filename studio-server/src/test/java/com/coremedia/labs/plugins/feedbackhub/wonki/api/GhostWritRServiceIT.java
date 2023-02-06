package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWDisambiguationResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWFAQsResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWResearchResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.GWTextsResponse;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Integration test for {@link GhostwritRService}.
 */
public class GhostWritRServiceIT extends AbstractWonkiServiceIT {

  private GhostwritRService ghostwritRService;

  @Before
  public void setUp() throws Exception {
    super.setUp();

    ghostwritRService = new GhostwritRService(getConnector());
  }

  @Test
  public void testCompose() {
    String generatedText = ghostwritRService.compose("Zebras sind nett?", List.of("Zebras mögen Kartoffeln"), getApiKey());
    assertNotNull(generatedText);
  }

  @Test
  public void testDisambiguate() {
    Optional<GWDisambiguationResponse> result = ghostwritRService.disambiguate("EAM", getApiKey());
    assertTrue(result.isPresent());
    assertTrue(result.get().isAmbiguity());
    assertThat(result.get().getResults()).isNotEmpty();
  }

  @Test
  public void testGenerateFAQ() {
    List<GWFAQsResponse.FAQResult> result = ghostwritRService.generateFAQ("Der Präsident der Nationalen Akademie der Wissenschaften Leopoldina, Gerald Haug, hat deutlich mehr Tempo beim Ausbau der erneuerbaren Energien, aber auch beim Ausstieg aus der Kohle gefordert. Der Direktor am Max-Planck-Institut für Chemie warnt angesichts der Energiekrise vor dem Ende der Grundstoffindustrie, insbesondere der chemischen Industrie in Deutschland.", getApiKey());
    assertThat(result).isNotNull();
  }

  @Test
  public void testGenerateQuestions() {
    List<String> questions = ghostwritRService.generateQuestions("Hund", Locale.GERMAN, getApiKey());
    assertThat(questions).isNotNull();
    assertFalse(questions.isEmpty());
  }

  @Test
  public void testResearch() {
    List<GWResearchResponse.ResearchResult> results = ghostwritRService.research("Wo liegt Bielefeld?", getApiKey());
    assertThat(results).isNotNull();
    assertFalse(results.isEmpty());
  }

  @Test
  public void testGenerateText() {
    GWTextsResponse response = ghostwritRService.generateText("Was ist CoreMedia?", Locale.GERMAN, getApiKey());
    assertThat(response.getText()).isNotEmpty();
  }

}
