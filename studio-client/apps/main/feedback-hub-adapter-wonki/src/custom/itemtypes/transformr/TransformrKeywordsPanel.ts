import Config from "@jangaroo/runtime/Config";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import Button from "@jangaroo/ext-ts/button/Button";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import { bind } from "@jangaroo/runtime";
import KeywordsPropertyFeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/KeywordsPropertyFeedbackItemPanel";
import FeedbackGroup from "@coremedia/studio-client.feedback-hub-models/FeedbackGroup";
import FeedbackHubPropertyNames
  from "@coremedia/studio-client.main.feedback-hub-editor-components/util/FeedbackHubPropertyNames";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import Premular from "@coremedia/studio-client.main.editor-components/sdk/premular/Premular";
import KeywordsFeedbackItem from "@coremedia/studio-client.feedback-hub-models/KeywordsFeedbackItem";
import Keyword from "@coremedia/studio-client.feedback-hub-models/Keyword";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import WonkiLabels from "../../../WonkiStudioPlugin_properties";
import WonkiService from "../../../util/WonkiService";
import CollapsiblePanel from "@coremedia/studio-client.ext.ui-components/components/panel/CollapsiblePanel";
import PanelSkin from "@coremedia/studio-client.ext.ui-components/skins/PanelSkin";
import TransformrPanel from "./TransformrPanel";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";

interface TransformrKeywordsPanelConfig extends Config<Panel>, Partial<Pick<TransformrKeywordsPanel,
        "contentExpression" |
        "forceReadOnlyValueExpression" |
        "premular" |
        "activeStateExpression"
>> {}

class TransformrKeywordsPanel extends CollapsiblePanel {

  declare Config: TransformrKeywordsPanelConfig;

  static readonly KEYWORDS_PROPERTY_ITEM_ID: string = "keywordsProperty";

  contentExpression: ValueExpression;
  forceReadOnlyValueExpression: ValueExpression;
  premular: Premular;
  activeStateExpression: ValueExpression;

  private keywordsExpression: ValueExpression;

  constructor(config: Config<TransformrKeywordsPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(TransformrKeywordsPanel, {
      itemId: "keywordsPanel",
      title: WonkiLabels.transformr_generate_keywords_title,
      ui: PanelSkin.FRAME_PLAIN_200.getSkin(),
      cls: "wonki-transformr__keywords-panel",
      bodyPadding: "10 10 10 10",
      items: [

        Config(Container, {
          items: [
            Config(DisplayField, {
              flex: 1,
              value: WonkiLabels.transformr_generate_keywords_description
            }),
            Config(Button, {
              text: WonkiLabels.wonki_generate_button_label,
              ui: ButtonSkin.PRIMARY_LIGHT.getSkin(),
              handler: bind(this$, this$.generateKeywords),
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getKeywordsExpression(),
                  componentProperty: "visible",
                  transformer: (value) => {return value || value.length === 0;}
                }),
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getKeywordsExpression(),
                  componentProperty: "disabled",
                  transformer: (value) => {return !value || value.length > 0;}
                }),
              ]
            }),
          ],
          layout: Config(HBoxLayout, { align: "stretch" })
        }),

        // Keyword selection editor will be added dynamically here

      ],
      layout: Config(VBoxLayout, {
        align: "stretch"
      })
    }), config));

    this.activeStateExpression = config.activeStateExpression;
  }

  #getKeywordsExpression() {
    if (!this.keywordsExpression) {
      this.keywordsExpression = ValueExpressionFactory.createFromValue([]);
    }
    return this.keywordsExpression;
  }

  refresh() {
    const keywordsProperty = Config(KeywordsPropertyFeedbackItemPanel, {
      ui: ButtonSkin.PRIMARY_LIGHT.getSkin(),
      itemId: TransformrKeywordsPanel.KEYWORDS_PROPERTY_ITEM_ID,
      cls: "wonki-transformr__keywords-property",
      feedbackGroup: new FeedbackGroup("keywords", FeedbackHubPropertyNames.RELOAD_MODE_NONE, []),
      feedbackItem: this.createKeywordsFeedbackItem(),
      contentExpression: this.contentExpression,
      premular: this.premular,
      forceReadOnlyValueExpression: this.forceReadOnlyValueExpression
    });

    this.add(keywordsProperty);
  }

  generateKeywords(): void {
    const content = this.contentExpression.getValue();
    this.activeStateExpression.setValue(TransformrPanel.LOADING_STATE);
    WonkiService.generateKeywords(content)
            .then((keywords) => {
              this.#getKeywordsExpression().setValue(keywords);
              this.refresh();
              this.activeStateExpression.setValue(TransformrPanel.SUCCESS_STATE);
            })
            .catch(() => {
              this.activeStateExpression.setValue(TransformrPanel.EMPTY_STATE);
            });
  }

  createKeywordsFeedbackItem(): KeywordsFeedbackItem {
    const keywords = this.#getKeywordsExpression().getValue().map((term) => {
      return new Keyword(term, null);
    });
    let feedbackItem = new KeywordsFeedbackItem("keywords", "keywords", keywords, "keywords");
    return feedbackItem;
  }

}

export default TransformrKeywordsPanel;
