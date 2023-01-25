import CopyResourceBundleProperties
  from "@coremedia/studio-client.main.editor-components/configuration/CopyResourceBundleProperties";
import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";
import FeedbackHub_properties
  from "@coremedia/studio-client.main.feedback-hub-editor-components/FeedbackHub_properties";
import feedbackService from "@coremedia/studio-client.main.feedback-hub-editor-components/feedbackService";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
import FeedbackHubGhostwritrStudioPlugin_properties from "./FeedbackHubGhostwritrStudioPlugin_properties";
import GhostwritrGeneralPanel from "./custom/itemtypes/GhostwritrGeneralPanel";
import GhostwritrDetailsPanel from "./custom/itemtypes/GhostwritrDetailsPanel";

interface FeedbackHubGhostwritrStudioPluginConfig extends Config<StudioPlugin> {
}

class FeedbackHubGhostwritrStudioPlugin extends StudioPlugin {
  declare Config: FeedbackHubGhostwritrStudioPluginConfig;

  constructor(config: Config<FeedbackHubGhostwritrStudioPlugin> = null) {
    super((()=>{
      this.#__initialize__(config);
      return ConfigUtils.apply(Config(FeedbackHubGhostwritrStudioPlugin, {

        rules: [
        ],

        configuration: [
          new CopyResourceBundleProperties({
            destination: resourceManager.getResourceBundle(null, FeedbackHub_properties),
            source: resourceManager.getResourceBundle(null, FeedbackHubGhostwritrStudioPlugin_properties),
          }),
        ],

      }), config);
    })());
  }

  #__initialize__(config: Config<FeedbackHubGhostwritrStudioPlugin>): void {
    feedbackService._.registerFeedbackItemPanel("GhostWritrGeneralFeedbackItem", Config(GhostwritrGeneralPanel));
    feedbackService._.registerFeedbackItemPanel("GhostwritrDetailsFeedbackItem", Config(GhostwritrDetailsPanel));
  }
}

export default FeedbackHubGhostwritrStudioPlugin;
