import Config from "@jangaroo/runtime/Config";
import FeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/FeedbackItemPanel";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import TransformrKeywordsPanel from "./TransformrKeywordsPanel";
import TransformrMetaDescriptionPanel from "./TransformrMetaDescriptionPanel";
import TransformrTitlePanel from "./TransformrTitlePanel";
import EmptyContainer from "@coremedia/studio-client.ext.ui-components/components/EmptyContainer";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import WonkiLabels from "../../../WonkiStudioPlugin_properties";
import Component from "@jangaroo/ext-ts/Component";
import AnchorLayout from "@jangaroo/ext-ts/layout/container/Anchor";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import SwitchingContainer from "@coremedia/studio-client.ext.ui-components/components/SwitchingContainer";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import TransformTeaserTextPanel from "./TransformTeaserTextPanel";
import TransformrContextPanel from "./TransformrContextPanel";

interface TransformrPanelConfig extends Config<FeedbackItemPanel> {

}

class TransformrPanel extends FeedbackItemPanel {

  declare Config: TransformrPanelConfig;

  private model: Bean;
  static readonly ACTIVE_STATE: string = "activeState";

  public static readonly DEFAULT_STATE: string = "default";
  public static readonly EMPTY_STATE: string = "empty";
  public static readonly LOADING_STATE: string = "loading";
  public static readonly SUCCESS_STATE: string = "success";

  static readonly BLOCK_CLASS_NAME: string = "wonki-transformr";

  constructor(config: Config<TransformrPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(TransformrPanel, {
      padding: "10 0 0 0",
      items: [
        // Teaser Text
        Config(TransformTeaserTextPanel, {
          collapsed: true
        }),

        // Keywords
        Config(TransformrKeywordsPanel, {
          activeStateExpression: ValueExpressionFactory.create(TransformrPanel.ACTIVE_STATE, this$.#getModel()),
          collapsed: true,

        }),

        // META title
        Config(TransformrTitlePanel, {
          collapsed: true,
        }),

        // META description
        Config(TransformrMetaDescriptionPanel, {
          collapsed: true
        }),

        Config(SwitchingContainer, {
          activeItemValueExpression: ValueExpressionFactory.create(TransformrPanel.ACTIVE_STATE, this$.#getModel()),
          items: [
            Config(EmptyContainer, {
              itemId: TransformrPanel.DEFAULT_STATE,
              iconElementName: "default-state-icon",
              bemBlockName: TransformrPanel.BLOCK_CLASS_NAME,
              ui: ContainerSkin.GRID_100.getSkin(),
              title: WonkiLabels.transformr_default_state_title,
              text: WonkiLabels.transformr_default_state_text,
            }),

            Config(EmptyContainer, {
              itemId: TransformrPanel.LOADING_STATE,
              iconElementName: "loading-state-icon",
              bemBlockName: TransformrPanel.BLOCK_CLASS_NAME,
              ui: ContainerSkin.GRID_100.getSkin(),
              title: WonkiLabels.transformr_loading_state_title,
              text: WonkiLabels.transformr_loading_state_text,
            }),

            Config(EmptyContainer, {
              itemId: TransformrPanel.EMPTY_STATE,
              iconElementName: "empty-state-icon",
              bemBlockName: TransformrPanel.BLOCK_CLASS_NAME,
              ui: ContainerSkin.GRID_100.getSkin(),
              title: WonkiLabels.transformr_empty_state_title,
              text: WonkiLabels.transformr_empty_state_text,
            }),
          ]
        }),

      ],
      defaultType: Component.xtype,
      defaults: Config({
        anchor: "100%",
        contentExpression: config.contentExpression,
        forceReadOnlyValueExpression: config.forceReadOnlyValueExpression,
        premular: config.premular,
      }),
      layout: Config(AnchorLayout),
      plugins: [
        Config(VerticalSpacingPlugin),
      ]
    }), config));
  }

  #getModel() {
    if (!this.model) {
      this.model = beanFactory._.createLocalBean();
      this.model.set(TransformrPanel.ACTIVE_STATE, TransformrPanel.DEFAULT_STATE)
    }
    return this.model;
  }

}

export default TransformrPanel;
