package com.coremedia.labs.plugins.feedbackhub.wonky.adapter;

import com.coremedia.cap.content.Content;
import com.coremedia.feedbackhub.adapter.FeedbackContext;
import com.coremedia.feedbackhub.adapter.text.TextFeedbackHubAdapter;
import com.coremedia.feedbackhub.items.FeedbackItem;
import com.coremedia.feedbackhub.items.FeedbackItemFactory;
import com.coremedia.feedbackhub.items.FeedbackLinkFeedbackItem;
import com.coremedia.feedbackhub.items.LabelFeedbackItem;
import com.coremedia.feedbackhub.items.PercentageBarFeedbackItem;
import com.coremedia.labs.plugins.feedbackhub.wonky.WonkyGhostwritrSettings;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.WonkyGhostWritrService;
import com.coremedia.labs.plugins.feedbackhub.wonky.api.dto.TextsResponse;
import com.coremedia.labs.plugins.feedbackhub.wonky.custom.items.GhostWritrFeedbackItem;
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

/**
 *
 */
@DefaultAnnotation(NonNull.class)
public class WonkyGhostwriterFeedbackAdapter implements TextFeedbackHubAdapter {
  private final WonkyGhostwritrSettings settings;

  private final WonkyGhostWritrService wonkyGhostWritrService;

  WonkyGhostwriterFeedbackAdapter(WonkyGhostwritrSettings settings, WonkyGhostWritrService wonkyGhostWritrService) {
    this.settings = settings;
    this.wonkyGhostWritrService = wonkyGhostWritrService;
  }

  @Override
  public CompletionStage<Collection<FeedbackItem>> analyzeText(FeedbackContext context, Map<String, String> textProperties, @Nullable Locale locale) {
    List<FeedbackItem> items = new ArrayList<>();


    FeedbackLinkFeedbackItem wonkyLink = FeedbackItemFactory.createFeedbackLink("https://wonki-api-gateway.developer.azure-api.net/");
    items.add(wonkyLink);

    GhostWritrFeedbackItem ghostWritrFeedbackItem = GhostWritrFeedbackItem.builder()
            .withCollection("general")
            .build();
    items.add(ghostWritrFeedbackItem);

    Content content = (Content) context.getEntity();
    String contentId = content.getId();
    TextsResponse textsResponse = wonkyGhostWritrService.getTextsResponse(contentId);

    if (textsResponse != null) {
      PercentageBarFeedbackItem confidence = PercentageBarFeedbackItem.builder()
              .withCollection("sources")
              .withValue(textsResponse.getConfidence() * 100)
              .withLabel("Confidence")
              .build();
      items.add(confidence);

      List<TextsResponse.Source> sources = textsResponse.getSources();
      for (TextsResponse.Source source: sources) {
        LabelFeedbackItem sourcesLabel = LabelFeedbackItem.builder()
                .withCollection("sources")
                .withLabel(source.getSource())
                .build();
        items.add(sourcesLabel);
      }
    } else {
      items.add(FeedbackItemFactory.createEmptyItem("sources"));
    }


    return CompletableFuture.completedFuture(items);
  }
}
