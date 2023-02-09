import Config from "@jangaroo/runtime/Config";
import FeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/FeedbackItemPanel";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import Container from "@jangaroo/ext-ts/container/Container";
import Button from "@jangaroo/ext-ts/button/Button";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import { bind } from "@jangaroo/runtime";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import TextArea from "@jangaroo/ext-ts/form/field/TextArea";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import NumberField from "@jangaroo/ext-ts/form/field/Number";
import CheckboxField from "@jangaroo/ext-ts/form/field/Checkbox";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import RadioGroup from "@jangaroo/ext-ts/form/RadioGroup";
import Radio from "@jangaroo/ext-ts/form/field/Radio";
import Component from "@jangaroo/ext-ts/Component";
import AnchorLayout from "@jangaroo/ext-ts/layout/container/Anchor";
import Spacer from "@jangaroo/ext-ts/toolbar/Spacer";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import WonkiService from "../../util/WonkiService";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import BoundRadioGroup from "@coremedia/studio-client.ext.ui-components/components/BoundRadioGroup";

interface SummarizrPanelConfig extends Config<FeedbackItemPanel> {

}

class SummarizrPanel extends FeedbackItemPanel {

  declare Config: SummarizrPanelConfig;

  static readonly SUMMARY: string = "summary";
  static readonly STRATEGY: string = "strategy";
  static readonly STRATEGY_ABSTRACTIVE: string = "abstractive";
  static readonly STRATEGY_EXTRACTIVE: string = "extractive";
  static readonly SENTENCES: string = "sentences";
  static readonly GREEDY: string = "greedy";

  private model: Bean;

  constructor(config: Config<SummarizrPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(SummarizrPanel, {
      items: [
        Config(DisplayField, {
          value: "The wonki SummarizR is able to summarize texts using various strategies."
        }),

        Config(BoundRadioGroup, {
          itemId: SummarizrPanel.STRATEGY,
          hideLabel: true,
          width: "auto",
          columns: 1,
          bindTo: ValueExpressionFactory.create(SummarizrPanel.STRATEGY, this$.#getModel()),
          items: [
            Config(Radio, {
              itemId: SummarizrPanel.STRATEGY_ABSTRACTIVE,
              boxLabel: "<i>Abstract summaries</i> are rewritten texts that can differ significantly from the original",
            }),
            Config(Radio, {
              itemId: SummarizrPanel.STRATEGY_EXTRACTIVE,
              boxLabel: "<i>Extracted summaries</i> keep the original sentences and remove less relevant content",
            }),
          ],
        }),

        Config(Container, {
          items: [
            Config(DisplayField, { value: "Sentences:", margin: "0 6 0 0" }),
            Config(NumberField, {
              minValue: 1,
              width: 40,
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: ValueExpressionFactory.create(SummarizrPanel.SENTENCES, this$.#getModel()),
                  bidirectional: true
                })
              ]
            }),
            Config(Spacer, { flex: 1 }),

            Config(CheckboxField, {
              boxLabel: "Greedy Mode",
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: ValueExpressionFactory.create(SummarizrPanel.GREEDY, this$.#getModel()),
                  bidirectional: true
                })
              ]
            }),
            Config(Spacer, { flex: 1 }),

            Config(Button, {
              text: "Generate Summary",
              ui: ButtonSkin.MATERIAL_PRIMARY.getSkin(),
              handler: bind(this$, this$.generateSummary)
            }),
          ],
          layout: Config(HBoxLayout, { align: "stretch" })
        }),

        Config(TextArea, {
          readOnly: true,
          height: 200,
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: ValueExpressionFactory.create(SummarizrPanel.SUMMARY, this$.#getModel())
            }),
            Config(BindPropertyPlugin, {
              bindTo: ValueExpressionFactory.create(SummarizrPanel.SUMMARY, this$.#getModel()),
              componentProperty: "visible",
              transformer: (value) => {return value && value !== "";}
            })
          ]
        })
      ],
      defaultType: Component.xtype,
      defaults: Config<Component>({ anchor: "100%" }),
      layout: Config(AnchorLayout),
      plugins: [
        Config(VerticalSpacingPlugin),
      ],
    }), config));
  }

  #getModel() {
    if (!this.model) {
      this.model = beanFactory._.createLocalBean();
      this.model.set(SummarizrPanel.SUMMARY, "");
      this.model.set(SummarizrPanel.STRATEGY, SummarizrPanel.STRATEGY_ABSTRACTIVE);
      this.model.set(SummarizrPanel.SENTENCES, 5);
      this.model.set(SummarizrPanel.GREEDY, false);
    }
    return this.model;
  }

  generateSummary(): void {
    console.log("Generate summary");
    const content = this.contentExpression.getValue();
    const strategy = this.#getModel().get(SummarizrPanel.STRATEGY);
    const sentences = this.#getModel().get(SummarizrPanel.SENTENCES);
    const greedy = this.#getModel().get(SummarizrPanel.GREEDY);
    WonkiService.generateSummary(content, strategy, sentences, greedy).then((summary) => {
      summary && this.#getModel().set(SummarizrPanel.SUMMARY, summary);
    });
  }

}

export default SummarizrPanel;
