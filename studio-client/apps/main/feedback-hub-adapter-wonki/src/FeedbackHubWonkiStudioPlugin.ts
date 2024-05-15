import CopyResourceBundleProperties
  from "@coremedia/studio-client.main.editor-components/configuration/CopyResourceBundleProperties";
import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";
import FeedbackHub_properties
  from "@coremedia/studio-client.main.feedback-hub-editor-components/FeedbackHub_properties";
import feedbackService from "@coremedia/studio-client.main.feedback-hub-editor-components/feedbackService";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
import FeedbackHubGhostwritrStudioPlugin_properties from "./WonkiStudioPlugin_properties";
import GhostwritrPanel from "./custom/itemtypes/ghostwritr/GhostwritrPanel";
import TransformrPanel from "./custom/itemtypes/transformr/TransformrPanel";

interface FeedbackHubWonkiStudioPluginConfig extends Config<StudioPlugin> {
}

class FeedbackHubWonkiStudioPlugin extends StudioPlugin {
  declare Config: FeedbackHubWonkiStudioPluginConfig;

  constructor(config: Config<FeedbackHubWonkiStudioPlugin> = null) {
    super((() => {
      this.#__initialize__(config);
      return ConfigUtils.apply(Config(FeedbackHubWonkiStudioPlugin, {

        rules: [],

        configuration: [
          new CopyResourceBundleProperties({
            destination: resourceManager.getResourceBundle(null, FeedbackHub_properties),
            source: resourceManager.getResourceBundle(null, FeedbackHubGhostwritrStudioPlugin_properties),
          }),
        ],

      }), config);
    })());
  }

  #__initialize__(config: Config<FeedbackHubWonkiStudioPlugin>): void {
    feedbackService._.registerFeedbackItemPanel("GhostwritrFeedbackItem", Config(GhostwritrPanel));
    feedbackService._.registerFeedbackItemPanel("TransformrFeedbackItem", Config(TransformrPanel));
  }
}

export default FeedbackHubWonkiStudioPlugin;
