import CopyResourceBundleProperties from "@coremedia/studio-client.main.editor-components/configuration/CopyResourceBundleProperties";
import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";
import FeedbackHub_properties from "@coremedia/studio-client.main.feedback-hub-editor-components/FeedbackHub_properties";
import feedbackService from "@coremedia/studio-client.main.feedback-hub-editor-components/feedbackService";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
import CursiveTextFeedbackItem from "./CursiveTextFeedbackItem";
import FeedbackHubWonkyGhostwritrStudioPlugin_properties from "./FeedbackHubWonkyGhostwritrStudioPlugin_properties";

interface FeedbackHubWonkyGhostwritrStudioPluginConfig extends Config<StudioPlugin> {
}

class FeedbackHubWonkyGhostwritrStudioPlugin extends StudioPlugin {
  declare Config: FeedbackHubWonkyGhostwritrStudioPluginConfig;

  constructor(config: Config<FeedbackHubWonkyGhostwritrStudioPlugin> = null) {
    super((()=>{
      this.#__initialize__(config);
      return ConfigUtils.apply(Config(FeedbackHubWonkyGhostwritrStudioPlugin, {

        rules: [
        ],

        configuration: [
          new CopyResourceBundleProperties({
            destination: resourceManager.getResourceBundle(null, FeedbackHub_properties),
            source: resourceManager.getResourceBundle(null, FeedbackHubWonkyGhostwritrStudioPlugin_properties),
          }),
        ],

      }), config);
    })());
  }

  #__initialize__(config: Config<FeedbackHubWonkyGhostwritrStudioPlugin>): void {
    feedbackService._.registerFeedbackItemPanel("cursiveText", Config(CursiveTextFeedbackItem));
  }
}

export default FeedbackHubWonkyGhostwritrStudioPlugin;
