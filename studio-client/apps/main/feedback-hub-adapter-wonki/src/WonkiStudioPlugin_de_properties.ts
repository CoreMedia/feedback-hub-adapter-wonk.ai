import ResourceBundleUtil from "@jangaroo/runtime/l10n/ResourceBundleUtil";
import WonkiStudioPlugin_properties from "./WonkiStudioPlugin_properties";

/**
 * Overrides of ResourceBundle "WonkiStudioPlugin" for Locale "de".
 */
ResourceBundleUtil.override(WonkiStudioPlugin_properties, {
  wonki_tooltip: "AI basierte Text-Generierung",
  wonki_credit_link: "service bereitgestellt von <a href=\"https://wonk.ai/\" target=\"_blank\">wonk.ai</a>.",
  wonki_generate_button_label: "Generieren",
  wonki_redo_button_label: "Generieren",
  wonki_apply_button_label: "Übernehmen",


  ghostwritr_default_state_text: "Erstelle Inhalte schnell und einfach mit dem GhostwriteR-AI-Assistenten. Beginne mit einer Idee oder Frage und wir erledigen den Rest.",
  ghostwritr_question_label: "Deine Frage",
  ghostwritr_question_emptyText: "Gebe eine Frage ein",
  ghostwritr_question_blank_validation_text: "Dies ist ein Pflichtfeld",
  ghostwritr_question_submit_button_label: "Text Generieren",
  ghostwritr_generated_text_header: "Generierter Text",
  ghostwritr_apply_text_button_label: "Text übernehmen",
  ghostwritr_apply_text_popup_message: "Der bestehende Artikeltext wird überschrieben",
  ghostwritr_apply_text_popup_submit_button_label: "Bestätigen",

  transformr_generate_keywords_title: "Schlagworte",
  transformr_generate_keywords_description: "Generiere Schlagworte basierend auf dem vorhandenen Text.",
  transformr_generate_title_title: "HTML Titel",
  transformr_generate_title_description: "Titel basierend auf dem vorhandenen Text generieren.",
  transformr_generate_meta_description_title: "HTML Meta-Beschreibung",
  transformr_generate_meta_description_description: "Generiere eine Meta-Beschreibung basierend auf dem vorhandenen Text.",

  summarizr_strategy_description: "Der wonk.ai SummarizR ist in der Lage, Texte mit verschiedenen Strategien zusammenzufassen.",
  summarizr_abstract_strategy_label: "<i>Abstract Zusammenfassungen</i> sind umgeschriebene Texte, die erheblich vom Original abweichen können",
  summarizr_extractive_strategy_label: "<i>Extrahierte Zusammenfassungen</i> behalten die ursprünglichen Sätze bei und entfernen weniger relevante Inhalte",
  summarizr_sentences_label: "Sätze",
  summarizr_generate_button_label: "Zusammenfassung generieren",
  summarizr_default_state_text: "Fasse Texte mit dem AI-Assistenten SummarizR zusammen.",

});
