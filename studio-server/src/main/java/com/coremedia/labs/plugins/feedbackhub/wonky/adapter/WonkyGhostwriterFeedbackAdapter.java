package com.coremedia.labs.plugins.feedbackhub.wonky.adapter;

import com.coremedia.feedbackhub.adapter.FeedbackContext;
import com.coremedia.feedbackhub.adapter.text.TextFeedbackHubAdapter;
import com.coremedia.feedbackhub.items.FeedbackItem;
import com.coremedia.feedbackhub.items.FeedbackItemFactory;
import com.coremedia.feedbackhub.items.FeedbackLinkFeedbackItem;
import com.coremedia.feedbackhub.items.LabelFeedbackItem;
import com.coremedia.feedbackhub.items.PercentageBarFeedbackItem;
import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostWritrFeedbackCollections;
import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.WonkyGhostWritrService;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.dto.TextsResponse;
import edu.umd.cs.findbugs.annotations.DefaultAnnotation;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

import static com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostWritrFeedbackCollections.*;

/**
 *
 */
@DefaultAnnotation(NonNull.class)
public class WonkyGhostwriterFeedbackAdapter implements TextFeedbackHubAdapter {
  public static final String FALLBACK_LANGUAGE = "en";
  private final WonkyGhostwritrSettings settings;

  private final WonkyGhostWritrService wonkyGhostWritrService;

  WonkyGhostwriterFeedbackAdapter(WonkyGhostwritrSettings settings, WonkyGhostWritrService wonkyGhostWritrService) {
    this.settings = settings;
    this.wonkyGhostWritrService = wonkyGhostWritrService;
  }

  @Override
  public CompletionStage<Collection<FeedbackItem>> analyzeText(FeedbackContext context, Map<String, String> textProperties, @Nullable Locale locale) {
    List<FeedbackItem> items = new ArrayList<>();

    String plainText = String.join(" ", textProperties.values());

    FeedbackLinkFeedbackItem wonkyLink = FeedbackItemFactory.createFeedbackLink("https://wonki-api-gateway.developer.azure-api.net/");
    items.add(wonkyLink);

    LabelFeedbackItem questionLabel = LabelFeedbackItem.builder()
            .withLabel("Question")
            .withBold()
            .withCollection(SIMPLE)
            .build();
    items.add(questionLabel);

    LabelFeedbackItem question = LabelFeedbackItem.builder()
            .withLabel(plainText)
            .withCollection(SIMPLE)
            .build();
    items.add(question);
    items.add(FeedbackItemFactory.createEmptyItem(null));

    String language = locale != null ? locale.getLanguage() : FALLBACK_LANGUAGE;
    TextsResponse textsResponse = wonkyGhostWritrService.generateTextFrom(plainText, language, settings);
    LabelFeedbackItem generatedText = LabelFeedbackItem.builder()
            .withLabel(textsResponse.getText())
            .withCollection(SIMPLE)
            .build();
    items.add(generatedText);

    PercentageBarFeedbackItem confidence = PercentageBarFeedbackItem.builder()
            .withValue(textsResponse.getConfidence() * 100)
            .withLabel("Confidence")
            .withCollection(SIMPLE)
            .build();
    items.add(confidence);

    return CompletableFuture.completedFuture(items);
  }
}
