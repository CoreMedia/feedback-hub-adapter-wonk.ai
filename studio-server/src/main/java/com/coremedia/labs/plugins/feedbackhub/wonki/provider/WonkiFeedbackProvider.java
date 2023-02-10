package com.coremedia.labs.plugins.feedbackhub.wonki.provider;

import com.coremedia.feedbackhub.adapter.FeedbackContext;
import com.coremedia.feedbackhub.items.FeedbackItem;
import com.coremedia.feedbackhub.items.FeedbackItemFactory;
import com.coremedia.feedbackhub.items.FeedbackLinkFeedbackItem;
import com.coremedia.feedbackhub.provider.FeedbackProvider;
import com.coremedia.labs.plugins.feedbackhub.wonki.WonkiSettings;
import com.coremedia.labs.plugins.feedbackhub.wonki.custom.items.WonkiFeedbackItem;
import edu.umd.cs.findbugs.annotations.DefaultAnnotation;
import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

import static com.coremedia.labs.plugins.feedbackhub.wonki.WonkiFeedbackCollections.GHOSTWRITR;
import static com.coremedia.labs.plugins.feedbackhub.wonki.WonkiFeedbackCollections.SUMMARIZR;
import static com.coremedia.labs.plugins.feedbackhub.wonki.WonkiFeedbackCollections.TRANSFORMR;

/**
 *
 */
@DefaultAnnotation(NonNull.class)
public class WonkiFeedbackProvider implements FeedbackProvider {

  public static Locale FALLBACK_LOCALE = Locale.ENGLISH;

  private final WonkiSettings settings;

  public WonkiFeedbackProvider(WonkiSettings settings) {
    this.settings = settings;
  }

  @Override
  public CompletionStage<Collection<FeedbackItem>> provideFeedback(FeedbackContext context) {
    List<FeedbackItem> items = new ArrayList<>();

    FeedbackLinkFeedbackItem githubLink = FeedbackItemFactory.createFeedbackLink("https://github.com/CoreMedia/feedback-hub-adapter-wonki");
    items.add(githubLink);

    // GhostwritR
    items.add(new WonkiFeedbackItem(GHOSTWRITR, "GhostwritrFeedbackItem"));

    // SummarizR
    items.add(new WonkiFeedbackItem(SUMMARIZR, "SummarizrFeedbackItem"));

    // TransformR
    items.add(new WonkiFeedbackItem(TRANSFORMR, "TransformrFeedbackItem"));

    return CompletableFuture.completedFuture(items);
  }
}
