import Config from "@jangaroo/runtime/Config";
import FeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/FeedbackItemPanel";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import Container from "@jangaroo/ext-ts/container/Container";
import Button from "@jangaroo/ext-ts/button/Button";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import { bind } from "@jangaroo/runtime";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
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

interface SummarizrPanelConfig extends Config<FeedbackItemPanel> {

}

class SummarizrPanel extends FeedbackItemPanel {

  declare Config: SummarizrPanelConfig;

  private summaryExpression: ValueExpression;

  constructor(config: Config<SummarizrPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(SummarizrPanel, {
      items: [
        Config(DisplayField, {
          value: "<p>The wonki SummarizR is able to summarize texts using various strategies.</p>" +
                  "<p>" +
                  "<ul><i>Extracted summaries</i> keep the original sentences and remove less relevant content.</ul>" +
                  "<ul><i>Abstract summaries</i> are rewritten texts that can differ significantly from the original.</ul>" +
                  "</p>",
          htmlEncode: false
        }),

        Config(Container, {
          items: [
            Config(DisplayField, { value: "Strategy:", margin: "0 6 0 0"}),
            Config(RadioGroup, {
              name: "summary-strategy",
              flex: 1,
              items: [
                Config(Radio, { boxLabel: "Extracted", checked: true }),
                Config(Radio, { boxLabel: "Abstract" })
              ]
            }),
            Config(Spacer, { flex: 1 }),

            Config(DisplayField, { value: "Sentences:", margin: "0 6 0 0"}),
            Config(NumberField, { value: 5, minValue: 1, width: 40 }),
            Config(Spacer, { flex: 1 }),

            Config(CheckboxField, { boxLabel: "Greedy Mode" }),
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
              bindTo: this$.#getSummaryExpression()
            }),
            Config(BindPropertyPlugin, {
              bindTo: this$.#getSummaryExpression(),
              componentProperty: "visible",
              transformer: (value) => {return value && value !== ""}
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

  #getSummaryExpression(): ValueExpression {
    if (!this.summaryExpression) {
      this.summaryExpression = ValueExpressionFactory.createFromValue("");
    }
    return this.summaryExpression;
  }

  generateSummary(): void {
    console.log("Generate summary");
    WonkiService.generateSummary().then((summary) => {
      summary && this.#getSummaryExpression().setValue(summary);
    })
  }

}

export default SummarizrPanel;
