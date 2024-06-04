import ResourceBundleUtil from "@jangaroo/runtime/l10n/ResourceBundleUtil";
import WonkiStudioPlugin_properties from "./WonkiStudioPlugin_properties";

/**
 * Overrides of ResourceBundle "WonkiStudioPlugin" for Locale "de".
 */
ResourceBundleUtil.override(WonkiStudioPlugin_properties, {
  wonki_tooltip: "KI basierte Text-Generierung",
  wonki_credit_link: "service bereitgestellt von <a href=\"https://wonk.ai/\" target=\"_blank\">wonk.ai</a>.",
  wonki_generate_button_label: "Generieren",
  wonki_redo_button_label: "Generieren",
  wonki_apply_button_label: "Übernehmen",


  ghostwritr_default_state_text: "Erstelle Inhalte schnell und einfach mit dem KI-Assistenten. Beginne mit einer Idee oder Frage und wir erledigen den Rest.",
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
  transformr_generate_teaser_text_title: "Teasertext",
  transformr_generate_teaser_text_context_title: "Kontextinformationen für die KI.",
  transformr_generate_teaser_text_description: "Erzeuge einen Teasertext auf der Grundlage des vorhandenen Textes.",

});
