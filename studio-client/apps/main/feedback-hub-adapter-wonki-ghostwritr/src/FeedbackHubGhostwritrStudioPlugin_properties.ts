import SvgIconUtil from "@coremedia/studio-client.base-models/util/SvgIconUtil";
import icon from "./icons/ghost-icon.svg";

/**
 * Interface values for ResourceBundle "FeedbackHubGhostwritrStudioPlugin".
 */
interface FeedbackHubGhostwritrStudioPlugin_properties {

/**
 * General
 *#######################################################################################################################
 */
  ghostwritr_iconCls: string;
  ghostwritr_title: string;
  ghostwritr_tooltip: string;
  ghostwritr_ariaLabel: string;
  ghostwritr_general_tab_title: string;
  ghostwritr_details_tab_title: string;

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

  ghostwritr_credit_link: string;


}

/**
 * Singleton for the current user Locale's instance of ResourceBundle "FeedbackHubGhostwritrStudioPlugin".
 * @see FeedbackHubGhostwritrStudioPlugin_properties
 */
const FeedbackHubGhostwritrStudioPlugin_properties: FeedbackHubGhostwritrStudioPlugin_properties = {
  ghostwritr_iconCls: SvgIconUtil.getIconStyleClassForSvgIcon(icon),
  ghostwritr_title: "GhostwritR",
  ghostwritr_tooltip: "AI driven text generation",
  ghostwritr_ariaLabel: "GhostwritR",
  ghostwritr_general_tab_title: "General",
  ghostwritr_details_tab_title: "Details",
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
  ghostwritr_credit_link: "service provided by <a href=\"https://wonki.tech/\" target=\"_blank\">wonki</a>."
};

export default FeedbackHubGhostwritrStudioPlugin_properties;
