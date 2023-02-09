import Config from "@jangaroo/runtime/Config";
import FeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/FeedbackItemPanel";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import Button from "@jangaroo/ext-ts/button/Button";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import FormLayout from "@jangaroo/ext-ts/layout/container/Form";
import { bind } from "@jangaroo/runtime";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import TextArea from "@jangaroo/ext-ts/form/field/TextArea";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import WonkiService from "../../util/WonkiService";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import KeywordsFeedbackItem from "@coremedia/studio-client.feedback-hub-models/KeywordsFeedbackItem";
import TransformrKeywordsPanel from "./TransformrKeywordsPanel";
import AccordionLayout from "@jangaroo/ext-ts/layout/container/Accordion";
import PanelSkin from "@coremedia/studio-client.ext.ui-components/skins/PanelSkin";
import TransformrMetaDescriptionPanel from "./TransformrMetaDescriptionPanel";
import Component from "@jangaroo/ext-ts/Component";
import TransformrTitlePanel from "./TransformrTitlePanel";

interface TransformrPanelConfig extends Config<FeedbackItemPanel> {

}

class TransformrPanel extends FeedbackItemPanel {

  declare Config: TransformrPanelConfig;

  constructor(config: Config<TransformrPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(TransformrPanel, {
      items: [
        // Keywords
        Config(TransformrKeywordsPanel),

        // META title
        Config(TransformrTitlePanel),

        // META description
        Config(TransformrMetaDescriptionPanel)

      ],
      defaults: Config({
        bodyStyle: 'padding: 6px 6px 18px 6px',
        contentExpression: config.contentExpression,
        forceReadOnlyValueExpression: config.forceReadOnlyValueExpression,
        premular: config.premular
      }),
      layout: Config(AccordionLayout),
      ui: PanelSkin.EMBEDDED_TRANSPARENT.getSkin()
    }), config));
  }

}

export default TransformrPanel;
