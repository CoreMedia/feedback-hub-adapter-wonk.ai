package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.api.dto.TransformerDetectLanguageResponse;
import org.junit.Test;

import java.util.List;
import java.util.Locale;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Integration test for {@link TransformRService}.
 */
public class TransformRServiceIT extends AbstractWonkiServiceIT {

  TransformRService transformRService;

  private static final String inputText = "Lassen Sie uns über diese beeindruckende Tiere sprechen. Die Mammute, wissenschaftlicher Name Mammuthus, bilden eine ausgestorbene Gattung der Elefanten. Sie entstand im Übergang vom Miozän zum Pliozän in Afrika und besiedelte in der darauf folgenden Zeit sowohl Europa als auch Asien und Nordamerika. Die letzten Vertreter der Mammute, die der weitaus bekanntesten Art, dem Wollhaarmammut angehören, starben erst vor rund 4000 Jahren auf der nordsibirischen Wrangelinsel aus.";

  @Override
  public void setUp() throws Exception {
    super.setUp();
    transformRService = new TransformRService(getConnector());
  }

  @Test
  public void testChangeTone() {
    String expectedText = "Der Hund kann kein Fleisch essen, wenn er fliegt.";
    String responseText = transformRService.changeTone("Dein Hund kann kein Fleisch essen, wenn er fliegt.", Locale.GERMAN, TransformRService.FormalityMode.FORMAL, getApiKey());
    assertNotNull(responseText);
    assertEquals(expectedText, responseText);
  }

  @Test
  public void testContinueText() {
    String resultText = transformRService.continueText("Das Mammut mag Pizza.", getApiKey());
    assertNotNull(resultText);
  }

  @Test
  public void testDetectLanguage() {
    TransformerDetectLanguageResponse detectLanguageResponse = transformRService.detectLanguage("Ein Mammut spricht kein Französisch.", getApiKey());
    assertEquals("de", detectLanguageResponse.getResults()[0].getLanguage());
  }

  @Test
  public void testExtendText() {
    String text = "Lassen Sie uns über diese beeindruckende Tiere sprechen. Die Mammute, wissenschaftlicher Name Mammuthus, bilden eine ausgestorbene Gattung der Elefanten. Sie entstand im Übergang vom Miozän zum Pliozän in Afrika und besiedelte in der darauf folgenden Zeit sowohl Europa als auch Asien und Nordamerika. Die letzten Vertreter der Mammute, die der weitaus bekanntesten Art, dem Wollhaarmammut angehören, starben erst vor rund 4000 Jahren auf der nordsibirischen Wrangelinsel aus.";
    String extendedText = transformRService.extendText(text, getApiKey());
    assertNotEquals(text, extendedText);
  }

  @Test
  public void testGenerateKeywords() {
    List<String> keywords = transformRService.generateKeywords(inputText, getApiKey());
    assertTrue("Expected service to return at least one keyword.", keywords.size() > 0);
  }

  @Test
  public void testGenerateMetaDescription() {
    String metaDescription = transformRService.generateMetaDescription(inputText, getApiKey());
    assertNotNull("Expected some kind of text result.", metaDescription);
  }

  @Test
  public void testGenerateSummary() {
    String textSummary = transformRService.generateSummary(inputText, getApiKey());
    assertNotNull("Expected some kind of text result.", textSummary);
  }

  @Test
  public void testGenerateTextStats() {
    Map<String, Object> textStats = transformRService.generateTextStats(inputText, getApiKey());
    assertNotNull(textStats);

    assertTrue(textStats.containsKey("token_length_mean"));
    assertTrue(textStats.containsKey("sentence_length_mean"));
  }

  @Test
  public void testSpinText() {
    String resultText = transformRService.spinText(inputText, getApiKey());
    assertNotNull(resultText);
    assertNotEquals("Expected result text to be different.", inputText, resultText);
  }

  @Test
  public void testGenerateTitle() {
    String textSummary = transformRService.generateTitle(inputText, getApiKey());
    assertNotNull("Expected some kind of text result.", textSummary);
  }

}
