import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";

/**
 * Interface values for ResourceBundle "FeedbackHubWonkyGhostwritrStudioPlugin".
 */
interface FeedbackHubWonkyGhostwritrStudioPlugin_properties {

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

  ghoestwritr_question_label: string;

  ghostwirtr_question_emptyText: string;

  ghostwritr_question_blank_validation_text: string;

  ghostwritr_question_submit_button_label: string;

  ghostwritr_generated_text_header: string;

  ghostwritr_apply_text_button_label: string;

  ghostwritr_apply_text_popup_message: string;

  ghostwritr_apply_text_popup_submit_button_label: string;


}

/**
 * Singleton for the current user Locale's instance of ResourceBundle "FeedbackHubWonkyGhostwritrStudioPlugin".
 * @see FeedbackHubWonkyGhostwritrStudioPlugin_properties
 */
const FeedbackHubWonkyGhostwritrStudioPlugin_properties: FeedbackHubWonkyGhostwritrStudioPlugin_properties = {
  ghostwritr_iconCls: CoreIcons_properties.pencil,
  ghostwritr_title: "GhostwritR",
  ghostwritr_tooltip: "AI driven text generation",
  ghostwritr_ariaLabel: "GhostwritR",
  ghostwritr_general_tab_title: "General",
  ghostwritr_details_tab_title: "Details",
  ghoestwritr_question_label: "Your Question",
  ghostwirtr_question_emptyText: "Enter a question to a generate text based on AI",
  ghostwritr_question_blank_validation_text: "This field is required",
  ghostwritr_question_submit_button_label: "Generate Text",
  ghostwritr_generated_text_header: "Generated Text",
  ghostwritr_apply_text_button_label: "Apply Text to Content",
  ghostwritr_apply_text_popup_message: "This will override the existing Article Text.",
  ghostwritr_apply_text_popup_submit_button_label: "Confirm",
};

export default FeedbackHubWonkyGhostwritrStudioPlugin_properties;
