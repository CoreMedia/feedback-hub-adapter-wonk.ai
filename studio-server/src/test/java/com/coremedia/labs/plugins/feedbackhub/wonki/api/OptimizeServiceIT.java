package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.OptimizeDetectLanguageResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.OptimizeGenerationResponse;
import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.OptimizeLengthResponse;
import org.junit.Test;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

import static org.junit.Assert.*;

/**
 * Integration test for {@link OptimizeService}.
 */
public class OptimizeServiceIT extends AbstractWonkiServiceIT {

  OptimizeService optimizeService;

  private static final String inputText = "Lassen Sie uns über diese beeindruckende Tiere sprechen. Die Mammute, wissenschaftlicher Name Mammuthus, bilden eine ausgestorbene Gattung der Elefanten. Sie entstand im Übergang vom Miozän zum Pliozän in Afrika und besiedelte in der darauf folgenden Zeit sowohl Europa als auch Asien und Nordamerika. Die letzten Vertreter der Mammute, die der weitaus bekanntesten Art, dem Wollhaarmammut angehören, starben erst vor rund 4000 Jahren auf der nordsibirischen Wrangelinsel aus.";

  @Override
  public void setUp() throws Exception {
    super.setUp();
    optimizeService = new OptimizeService(getConnector());
  }

  @Test
  public void testDetectLanguage() {
    OptimizeDetectLanguageResponse detectLanguageResponse = optimizeService.detectLanguage("Ein Mammut spricht kein Französisch.", getApiKey());
    assertEquals("de", detectLanguageResponse.getResult());
    assertTrue(detectLanguageResponse.getCandidates().length > 0);
    assertEquals("de", detectLanguageResponse.getCandidates()[0].getLanguage());
  }

  @Test
  public void testGenerateEnglishKeywords() {
    List<String> keywords = optimizeService.generateKeywords(inputText, Locale.ENGLISH, getApiKey());
    assertFalse("Expected service to return at least one keyword.", keywords.isEmpty());
  }

  @Test
  public void testGenerateGermanKeywords() {
    List<String> keywords = optimizeService.generateKeywords(inputText, Locale.GERMANY, getApiKey());
    assertFalse("Expected service to return at least one keyword.", keywords.isEmpty());
  }

  @Test
  public void testGenerateEnglishMetaDescription() {
    Optional<OptimizeGenerationResponse> response = optimizeService.generateMetaDescription(inputText, Locale.ENGLISH, getApiKey());
    assertTrue(response.isPresent());
    String result = response.map(OptimizeGenerationResponse::getResult).orElse(null);
    assertNotNull("Expected some kind of text result.", result);
  }

  @Test
  public void testGenerateGermanMetaDescription() {
    Optional<OptimizeGenerationResponse> response = optimizeService.generateMetaDescription(inputText, Locale.GERMANY, getApiKey());
    assertTrue(response.isPresent());
    String result = response.map(OptimizeGenerationResponse::getResult).orElse(null);
    assertNotNull("Expected some kind of text result.", result);
  }

  @Test
  public void testOptimizeLength() {
    OptimizeLengthResponse response = optimizeService.optimizeLength(inputText, Locale.ENGLISH, getApiKey());
    assertNotNull("Expected some kind of text result.", response);
  }

  @Test
  public void testGenerateEnglishTitle() {
    Optional<OptimizeGenerationResponse> response = optimizeService.generateTitle(inputText, Locale.ENGLISH, getApiKey());
    assertTrue(response.isPresent());

    String result = response.map(OptimizeGenerationResponse::getResult).orElse(null);
    assertNotNull("Expected some kind of text result.", result);
  }

  @Test
  public void testGenerateGermanTitle() {
    Optional<OptimizeGenerationResponse> response = optimizeService.generateTitle(inputText, Locale.GERMANY, getApiKey());
    assertTrue(response.isPresent());
    String result = response.map(OptimizeGenerationResponse::getResult).orElse(null);
    assertNotNull("Expected some kind of text result.", result);
  }

}
