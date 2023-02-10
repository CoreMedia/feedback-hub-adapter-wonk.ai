import SvgIconUtil from "@coremedia/studio-client.base-models/util/SvgIconUtil";
import icon from "./icons/ghost-icon.svg";

/**
 * Interface values for ResourceBundle "WonkiStudioPlugin".
 */
interface WonkiStudioPlugin_properties {

/**
 * General
 *#######################################################################################################################
 */
  wonki_iconCls: string;
  wonki_title: string;
  wonki_tooltip: string;
  wonki_ariaLabel: string;
  wonki_credit_link: string;
  wonki_ghostwritr_tab_title: string;
  wonki_transformr_tab_title: string;
  wonki_summarizr_tab_title: string;

  /**
   * Custom UI
   *#######################################################################################################################
   */

  ghostwritr_question_label: string;
  ghostwritr_question_emptyText: string;
  ghostwritr_question_blank_validation_text: string;
  ghostwritr_question_submit_button_label: string;
  ghostwritr_generated_text_header: string;
  ghostwritr_apply_text_button_label: string;
  ghostwritr_apply_text_popup_message: string;
  ghostwritr_apply_text_popup_submit_button_label: string;
  ghostwritr_confidence_bar_label: string;
  ghostwritr_default_state_title: string;
  ghostwritr_default_state_text: string;
  ghostwritr_empty_state_title: string;
  ghostwritr_empty_state_text: string;
  ghostwritr_loading_state_title: string;
  ghostwritr_loading_state_text: string;
  ghostwritr_sources_title: string;

  transformr_default_state_title: string;
  transformr_default_state_text: string;
  transformr_loading_state_title: string;
  transformr_loading_state_text: string;
  transformr_empty_state_title: string;
  transformr_empty_state_text: string;

  summarizr_default_state_title:string;
  summarizr_default_state_text: string;
  summarizr_loading_state_title:string;
  summarizr_loading_state_text:string;
  summarizr_empty_state_title:string;
  summarizr_empty_state_text:string;
}

/**
 * Singleton for the current user Locale's instance of ResourceBundle "WonkiStudioPlugin".
 * @see WonkiStudioPlugin_properties
 */
const WonkiStudioPlugin_properties: WonkiStudioPlugin_properties = {
  wonki_iconCls: SvgIconUtil.getIconStyleClassForSvgIcon(icon),
  wonki_title: "Wonki",
  wonki_tooltip: "AI driven text generation",
  wonki_ariaLabel: "Wonki",
  wonki_credit_link: "service provided by <a href=\"https://wonki.tech/\" target=\"_blank\">wonki</a>.",
  wonki_ghostwritr_tab_title: "GhostwritR",
  wonki_transformr_tab_title: "TransformR",
  wonki_summarizr_tab_title: "SummarizR",
  ghostwritr_question_label: "Question/Idea",
  ghostwritr_question_emptyText: "Enter a question or idea to generate text based on AI",
  ghostwritr_question_blank_validation_text: "This field is required",
  ghostwritr_question_submit_button_label: "Generate Text",
  ghostwritr_generated_text_header: "Generated Text",
  ghostwritr_apply_text_button_label: "Apply Text to Content",
  ghostwritr_apply_text_popup_message: "This will override the existing Article Text.",
  ghostwritr_apply_text_popup_submit_button_label: "Confirm",
  ghostwritr_confidence_bar_label: "Confidence",
  ghostwritr_default_state_title: "GhostwritR",
  ghostwritr_default_state_text: "Create content quickly and easily with the GhostwritR AI assistant. Start with an idea or question and we do the rest.",
  ghostwritr_empty_state_title: "No result",
  ghostwritr_empty_state_text: "GhostwritR was not able to generate a result. Please rephrase your question and try again.",
  ghostwritr_loading_state_title: "Writing ...",
  ghostwritr_loading_state_text: "Please have some patience while GhostwritR generates the text.",
  ghostwritr_sources_title: "Sources",
  transformr_default_state_title: "TransformR",
  transformr_default_state_text: "Transferring content to new formats or expanding it has never been easier! A bursting toolbox of computational linguistics.",
  transformr_empty_state_title: "No result",
  transformr_empty_state_text: "TransformR was not able to generate a result. Please try again later.",
  transformr_loading_state_title: "Transforming ...",
  transformr_loading_state_text: "Please have some patience while TransformR is processing your request.",
  summarizr_default_state_title: "SummarizR",
  summarizr_default_state_text: "Summarize texts with the SummarizR AI assistant.",
  summarizr_empty_state_title: "No result",
  summarizr_empty_state_text: "SummarizR was not able to generate a result. Please try again later.",
  summarizr_loading_state_title: "Summarizing ...",
  summarizr_loading_state_text: "Please have some patience while SummarizR creates a summary.",
};

export default WonkiStudioPlugin_properties;
