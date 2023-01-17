import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import FeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/FeedbackItemPanel";
import Component from "@jangaroo/ext-ts/Component";
import AnchorLayout from "@jangaroo/ext-ts/layout/container/Anchor";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BindComponentsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindComponentsPlugin";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import SourcesPanel from "./SourcesPanel";
import GhostWritrtSource from "./GhostWritrtSource";
import GhostWritrValueHolder from "./GhostWritrValueHolder";

interface GhostwritrDetailsPanelConfig extends Config<FeedbackItemPanel> {
}

class GhostwritrDetailsPanel extends FeedbackItemPanel {
  declare Config: GhostwritrDetailsPanelConfig;

  static override readonly xtype: string = "com.coremedia.labs.plugins.feedbackhub.wonky.config.wghostwritrdetailspanel";

  constructor(config: Config<GhostwritrDetailsPanel> = null) {
    super((() => ConfigUtils.apply(Config(GhostwritrDetailsPanel, {
      margin: 10,
      items: [
        Config(Panel, {
          itemId: "detailsContainer",
          plugins: [Config(BindComponentsPlugin, {
            configBeanParameterName: "source",
            /* config parameter name of template component */
            valueExpression: GhostWritrValueHolder.getInstance().getSourcesExpression(),
            template: Config(SourcesPanel),
            /* template component */
            getKey: this.getSourceId
          })
          ]
        }),
      ],
      defaultType: Component.xtype,
      defaults: Config<Component>({anchor: "100%"}),
      layout: Config(AnchorLayout),
      plugins: [
        Config(VerticalSpacingPlugin),
      ],
    }), config))());
  }

  getSourceId(source: GhostWritrtSource): string {
    return source.id;
  }

}

export default GhostwritrDetailsPanel;
