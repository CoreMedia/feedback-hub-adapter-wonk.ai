import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import FeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/FeedbackItemPanel";
import Ext from "@jangaroo/ext-ts";
import Component from "@jangaroo/ext-ts/Component";
import LoadMask from "@jangaroo/ext-ts/LoadMask";
import AnchorLayout from "@jangaroo/ext-ts/layout/container/Anchor";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BindComponentsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindComponentsPlugin";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import SourcesPanel from "./SourcesPanel";
import GhostWritrtSource from "./GhostWritrtSource";
import PercentageBarFeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/PercentageBarFeedbackItemPanel";
import FeedbackItem from "@coremedia/studio-client.feedback-hub-models/FeedbackItem";
import GhostWritrValueHolder from "./GhostWritrValueHolder";

interface GhostwritrDetailsPanelConfig extends Config<FeedbackItemPanel> {
}

class GhostwritrDetailsPanel extends FeedbackItemPanel {
  declare Config: GhostwritrDetailsPanelConfig;

  #sourcesExpression: ValueExpression = null;

  static override readonly xtype: string = "com.coremedia.labs.plugins.feedbackhub.wonky.config.wghostwritrdetailspanel";

  constructor(config: Config<GhostwritrDetailsPanel> = null) {
    super((() => ConfigUtils.apply(Config(GhostwritrDetailsPanel, {
      margin: 10,
      items: [
        Config(Panel, {
          itemId: "detailsContainer",
          title: "Details",
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

  getSourcesExpression(): ValueExpression {
    if (!this.#sourcesExpression) {
      this.#sourcesExpression = ValueExpressionFactory.createFromValue([]);
    }
    return this.#sourcesExpression;
  }

  createSource(text: string, url: string): GhostWritrtSource {
    return new GhostWritrtSource(Ext.id(null, "GhostWritrSource"), text, url);
  }

  getSourceId(source: GhostWritrtSource): string {
    return source.id;
  }

  createFeedbackItem(): FeedbackItem {
    let feedbackItem: FeedbackItem = new FeedbackItem("foo", "bar", "Test", "test");
    feedbackItem["label"] = "Test";
    feedbackItem["value"] = 42;
    feedbackItem["maxValue"] = 100;
    feedbackItem["targetValue"] = 75;
    feedbackItem["reverseColors"] = false;
    feedbackItem["decimalPlaces"] = 2;
    feedbackItem["color"] = "green";
    return feedbackItem;
  };
}

export default GhostwritrDetailsPanel;
