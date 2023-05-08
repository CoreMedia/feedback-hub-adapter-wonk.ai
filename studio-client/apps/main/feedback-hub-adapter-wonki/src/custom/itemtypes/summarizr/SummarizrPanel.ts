import Config from "@jangaroo/runtime/Config";
import FeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/FeedbackItemPanel";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import Container from "@jangaroo/ext-ts/container/Container";
import Button from "@jangaroo/ext-ts/button/Button";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import { bind } from "@jangaroo/runtime";
import TextArea from "@jangaroo/ext-ts/form/field/TextArea";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import NumberField from "@jangaroo/ext-ts/form/field/Number";
import CheckboxField from "@jangaroo/ext-ts/form/field/Checkbox";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import Radio from "@jangaroo/ext-ts/form/field/Radio";
import Component from "@jangaroo/ext-ts/Component";
import AnchorLayout from "@jangaroo/ext-ts/layout/container/Anchor";
import Spacer from "@jangaroo/ext-ts/toolbar/Spacer";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import BoundRadioGroup from "@coremedia/studio-client.ext.ui-components/components/BoundRadioGroup";
import EmptyContainer from "@coremedia/studio-client.ext.ui-components/components/EmptyContainer";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import SwitchingContainer from "@coremedia/studio-client.ext.ui-components/components/SwitchingContainer";
import Labelable from "@jangaroo/ext-ts/form/Labelable";
import WonkiLabels from "../../../WonkiStudioPlugin_properties";
import WonkiService from "../../../util/WonkiService";

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
  static readonly ACTIVE_STATE: string = "activeState";

  private model: Bean;

  static readonly DEFAULT_STATE: string = "default";
  static readonly EMPTY_STATE: string = "empty";
  static readonly LOADING_STATE: string = "loading";
  static readonly SUCCESS_STATE: string = "success";

  static readonly BLOCK_CLASS_NAME: string = "wonki-summarizr";

  constructor(config: Config<SummarizrPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(SummarizrPanel, {
      items: [
        Config(DisplayField, {
          value: WonkiLabels.summarizr_strategy_description
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
              boxLabel: WonkiLabels.summarizr_abstract_strategy_label,
            }),
            Config(Radio, {
              itemId: SummarizrPanel.STRATEGY_EXTRACTIVE,
              boxLabel: WonkiLabels.summarizr_extractive_strategy_label,
            }),
          ],
        }),

        Config(Container, {
          items: [
            Config(DisplayField, { value: WonkiLabels.summarizr_sentences_label, margin: "0 6 0 0" }),
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

        Config(SwitchingContainer, {
          activeItemValueExpression: ValueExpressionFactory.create(SummarizrPanel.ACTIVE_STATE, this$.#getModel()),
          items: [

            Config(EmptyContainer, {
              itemId: SummarizrPanel.DEFAULT_STATE,
              iconElementName: "default-state-icon",
              bemBlockName: SummarizrPanel.BLOCK_CLASS_NAME,
              ui: ContainerSkin.GRID_100.getSkin(),
              title: WonkiLabels.summarizr_default_state_title,
              text: WonkiLabels.summarizr_default_state_text,
            }),

            Config(EmptyContainer, {
              itemId: SummarizrPanel.LOADING_STATE,
              iconElementName: "loading-state-icon",
              bemBlockName: SummarizrPanel.BLOCK_CLASS_NAME,
              ui: ContainerSkin.GRID_100.getSkin(),
              title: WonkiLabels.summarizr_loading_state_title,
              text: WonkiLabels.summarizr_loading_state_text,
            }),

            Config(TextArea, {
              fieldLabel: "Summary",
              itemId: SummarizrPanel.SUCCESS_STATE,
              readOnly: true,
              height: 150,
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
            }),

            Config(EmptyContainer, {
              itemId: SummarizrPanel.EMPTY_STATE,
              iconElementName: "empty-state-icon",
              bemBlockName: SummarizrPanel.BLOCK_CLASS_NAME,
              ui: ContainerSkin.GRID_100.getSkin(),
              title: WonkiLabels.summarizr_empty_state_title,
              text: WonkiLabels.summarizr_empty_state_text,
            }),

          ],
          defaultType: Labelable["xtype"],
          defaults: Config<Labelable>({
            labelSeparator: "",
            labelAlign: "top",
          }),
        }),

        Config(DisplayField, {
          cls: `${SummarizrPanel.BLOCK_CLASS_NAME}__credit_link`,
          value: WonkiLabels.wonki_credit_link,
          htmlEncode: false
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
      this.model.set(SummarizrPanel.ACTIVE_STATE, SummarizrPanel.DEFAULT_STATE);
      this.model.set(SummarizrPanel.SUMMARY, "");
      this.model.set(SummarizrPanel.STRATEGY, SummarizrPanel.STRATEGY_ABSTRACTIVE);
      this.model.set(SummarizrPanel.SENTENCES, 5);
      this.model.set(SummarizrPanel.GREEDY, false);
    }
    return this.model;
  }

  generateSummary(): void {
    console.log("Generate summary");
    this.#setActiveState(SummarizrPanel.LOADING_STATE);
    const content = this.contentExpression.getValue();
    const strategy = this.#getModel().get(SummarizrPanel.STRATEGY);
    const sentences = this.#getModel().get(SummarizrPanel.SENTENCES);
    const greedy = this.#getModel().get(SummarizrPanel.GREEDY);
    WonkiService.generateSummary(content, strategy, sentences, greedy)
            .then((summary) => {
              this.#setActiveState(SummarizrPanel.SUCCESS_STATE);
              summary && this.#getModel().set(SummarizrPanel.SUMMARY, summary);
            })
            .catch(() => {
              this.#setActiveState(SummarizrPanel.EMPTY_STATE);
            });
  }

  #setActiveState(state: string) {
    this.#getModel().set(SummarizrPanel.ACTIVE_STATE, state);
  }

}

export default SummarizrPanel;
