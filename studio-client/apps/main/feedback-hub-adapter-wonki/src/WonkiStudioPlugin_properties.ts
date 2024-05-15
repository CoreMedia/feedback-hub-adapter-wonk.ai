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
  wonki_generate_button_label:string;
  wonki_redo_button_label: string;
  wonki_apply_button_label:string;

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
  transformr_generate_keywords_title: string;
  transformr_generate_keywords_description: string;
  transformr_generate_title_title:string;
  transformr_generate_title_description:string;
  transformr_generate_meta_description_title:string;
  transformr_generate_meta_description_description:string;
  transformr_generate_teaser_text_title:string;
  transformr_generate_teaser_text_description:string;

}

/**
 * Singleton for the current user Locale's instance of ResourceBundle "WonkiStudioPlugin".
 * @see WonkiStudioPlugin_properties
 */
const WonkiStudioPlugin_properties: WonkiStudioPlugin_properties = {
  wonki_iconCls: SvgIconUtil.getIconStyleClassForSvgIcon(icon),
  wonki_title: "wonk.ai",
  wonki_tooltip: "AI driven text generation",
  wonki_ariaLabel: "wonk.ai",
  wonki_credit_link: "service provided by <a href=\"https://wonk.ai/\" target=\"_blank\">wonk.ai</a>.",
  wonki_ghostwritr_tab_title: "Write",
  wonki_transformr_tab_title: "Optimize",
  wonki_generate_button_label: "Generate",
  wonki_redo_button_label: "Redo",
  wonki_apply_button_label: "Apply",


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
  transformr_generate_keywords_title: "Keywords",
  transformr_generate_keywords_description: "Generate keywords based on the existing text.",
  transformr_generate_title_title: "HTML Title",
  transformr_generate_title_description: "Generate title based on the existing text.",
  transformr_generate_meta_description_title: "HTML Meta Description",
  transformr_generate_meta_description_description: "Generate meta description based on the existing text.",
  transformr_generate_teaser_text_title: "Teaser Text",
  transformr_generate_teaser_text_description: "Generate a teaser text based on the existing text.",
};

export default WonkiStudioPlugin_properties;
