import Config from "@jangaroo/runtime/Config";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ArrayUtils from "@coremedia/studio-client.client-core/util/ArrayUtils";
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
import WonkiService from "../../util/WonkiService";
import Premular from "@coremedia/studio-client.main.editor-components/sdk/premular/Premular";
import KeywordsFeedbackItem from "@coremedia/studio-client.feedback-hub-models/KeywordsFeedbackItem";
import Keyword from "@coremedia/studio-client.feedback-hub-models/Keyword";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import Container from "@jangaroo/ext-ts/container/Container";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";

interface TransformrKeywordsPanelConfig extends Config<Panel>, Partial<Pick<TransformrKeywordsPanel,
        "contentExpression" | "forceReadOnlyValueExpression" | "premular"
>> {}

class TransformrKeywordsPanel extends Panel {

  declare Config: TransformrKeywordsPanelConfig;

  static readonly KEYWORDS_PROPERTY_ITEM_ID: string = "keywordsProperty";

  contentExpression: ValueExpression;
  forceReadOnlyValueExpression: ValueExpression;
  premular: Premular;
  private keywordsExpression: ValueExpression;

  constructor(config: Config<TransformrKeywordsPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(TransformrKeywordsPanel, {
      itemId: "keywordsPanel",
      title: "Generate Keywords",
      items: [

        Config(Container, {
          items: [
            Config(DisplayField, {
              value: "Generate keywords based on the existing text."
            }),
            Config(Button, {
              text: "Generate Keywords",
              ui: ButtonSkin.MATERIAL_PRIMARY.getSkin(),
              handler: bind(this$, this$.generateKeywords)
            }),
          ],
          layout: Config(VBoxLayout, { align: "begin" })
        }),

        // Keyword selection editor will be added dynamically here

      ],
      layout: Config(VBoxLayout, {
        align: "stretch"
      })
    }), config));
  }

  #getKeywordsExpression() {
    if (!this.keywordsExpression) {
      this.keywordsExpression = ValueExpressionFactory.createFromValue([]);
    }
    return this.keywordsExpression;
  }

  refresh() {
    const keywordsProperty = Config(KeywordsPropertyFeedbackItemPanel, {
      itemId: TransformrKeywordsPanel.KEYWORDS_PROPERTY_ITEM_ID,
      feedbackGroup: new FeedbackGroup("keywords", FeedbackHubPropertyNames.RELOAD_MODE_NONE, []),
      feedbackItem: this.createKeywordsFeedbackItem(),
      contentExpression: this.contentExpression,
      premular: this.premular,
      forceReadOnlyValueExpression: this.forceReadOnlyValueExpression
    });

    this.add(keywordsProperty);
  }

  generateKeywords(): void {
    console.log("Generate keywords");
    WonkiService.generateKeywords().then((keywords) => {
      this.#getKeywordsExpression().setValue(keywords);
      this.refresh();
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
