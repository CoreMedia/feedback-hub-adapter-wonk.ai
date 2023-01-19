import GenericRemoteJob from "@coremedia/studio-client.cap-rest-client-impl/common/impl/GenericRemoteJob";
import JobExecutionError from "@coremedia/studio-client.cap-rest-client/common/JobExecutionError";
import jobService from "@coremedia/studio-client.cap-rest-client/common/jobService";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import DisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/DisplayFieldSkin";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import FeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/FeedbackItemPanel";
import Ext from "@jangaroo/ext-ts";
import Component from "@jangaroo/ext-ts/Component";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import FormPanel from "@jangaroo/ext-ts/form/Panel";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import TextField from "@jangaroo/ext-ts/form/field/Text";
import AnchorLayout from "@jangaroo/ext-ts/layout/container/Anchor";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import { as, bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import trace from "@jangaroo/runtime/trace";
import FeedbackHubWonkyGhostwritrStudioPlugin_properties from "../../FeedbackHubWonkyGhostwritrStudioPlugin_properties";
import GhostWritrtSource from "./GhostWritrtSource";
import FeedbackItem from "@coremedia/studio-client.feedback-hub-models/FeedbackItem";
import GhostWritrValueHolder from "./GhostWritrValueHolder";
import PercentageBarFeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/PercentageBarFeedbackItemPanel";
import MessageBoxUtil from "@coremedia/studio-client.ext.ui-components/messagebox/MessageBoxUtil";
import BaseField from "@jangaroo/ext-ts/form/field/Base";
import ExtEvent from "@jangaroo/ext-ts/event/Event";
import EmptyContainer from "@coremedia/studio-client.ext.ui-components/components/EmptyContainer";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import SwitchingContainer from "@coremedia/studio-client.ext.ui-components/components/SwitchingContainer";
import TextArea from "@jangaroo/ext-ts/form/field/TextArea";
import TabPanel from "@jangaroo/ext-ts/tab/Panel";

interface GhostwritrGeneralPanelConfig extends Config<FeedbackItemPanel> {
}

class GhostwritrGeneralPanel extends FeedbackItemPanel {
  declare Config: GhostwritrGeneralPanelConfig;

  static readonly CONFIDENCE_BAR_ITEM_ID: string = "confidenceBar";
  static readonly RESPONSE_CONTAINER_ITEM_ID: string = "responseContainer";

  #generatedTextExpression: ValueExpression = null;

  #questionInputExpression: ValueExpression = null;

  #activeStateExpression: ValueExpression = null;

  static readonly DEFAULT_STATE: string = "default";
  static readonly EMPTY_STATE: string = "empty";
  static readonly LOADING_STATE: string = "loading";
  static readonly SUCCESS_STATE: string = "success";

  static readonly BLOCK_CLASS_NAME: string = "ghostwritr-general-panel";

  //dirty
  static override readonly xtype: string = "com.coremedia.labs.plugins.feedbackhub.wonky.config.wonkyghostwritritempanel";

  constructor(config: Config<GhostwritrGeneralPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(GhostwritrGeneralPanel, {
      cls: GhostwritrGeneralPanel.BLOCK_CLASS_NAME,
      items: [
        // Input fields
        Config(FormPanel, {
          items: [
            Config(TextField, {
              flex: 1,
              fieldLabel: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_question_label,
              allowBlank: false,
              blankText: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_question_blank_validation_text,
              emptyText: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_question_emptyText,
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.getQuestionInputExpression(),
                  bidirectional: true,
                }),
              ],
              listeners: {
                "specialkey": (field: BaseField, e: ExtEvent) => {
                  if (e.getKey() === ExtEvent.ENTER) {
                    this.applyQuestion();
                  }
                }
              },
            }),
            Config(Container, { width: 6 }),
            Config(Button, {
              formBind: true,
              ui: ButtonSkin.MATERIAL_PRIMARY.getSkin(),
              handler: bind(this$, this$.applyQuestion),
              text: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_question_submit_button_label,
            }),
          ],
          layout: Config(HBoxLayout, {
            align: "stretch",
            pack: "start",
          }),
        }),

        // Confidence bar will be added dynamically here

        // Results
        Config(SwitchingContainer, {
          itemId: GhostwritrGeneralPanel.RESPONSE_CONTAINER_ITEM_ID,
          activeItemValueExpression: this$.getActiveStateExpression(),
          minHeight: 100,
          items: [
            Config(EmptyContainer, {
              itemId: GhostwritrGeneralPanel.DEFAULT_STATE,
              iconElementName: "default-state-icon",
              bemBlockName: GhostwritrGeneralPanel.BLOCK_CLASS_NAME,
              ui: ContainerSkin.GRID_100.getSkin(),
              title: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_default_state_title,
              text: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_default_state_text,
            }),
            Config(EmptyContainer, {
              itemId: GhostwritrGeneralPanel.EMPTY_STATE,
              iconElementName: "empty-state-icon",
              bemBlockName: GhostwritrGeneralPanel.BLOCK_CLASS_NAME,
              ui: ContainerSkin.GRID_100.getSkin(),
              title: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_empty_state_title,
              text: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_empty_state_text,
            }),
            Config(EmptyContainer, {
              itemId: GhostwritrGeneralPanel.LOADING_STATE,
              iconElementName: "loading-state-icon",
              bemBlockName: GhostwritrGeneralPanel.BLOCK_CLASS_NAME,
              ui: ContainerSkin.GRID_100.getSkin(),
              title: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_loading_state_title,
              text: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_loading_state_text,
            }),
            Config(Container, {
              itemId: GhostwritrGeneralPanel.SUCCESS_STATE,
              items: [
                Config(DisplayField, {
                  ui: DisplayFieldSkin.BOLD.getSkin(),
                  value: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_generated_text_header,
                }),
                Config(TextArea, {
                  autoScroll: true,
                  readOnly: true,
                  flex: 1,
                  minHeight: 300,
                  plugins: [
                    Config(BindPropertyPlugin, {
                      bindTo: this$.getGeneratedTextExpression(),
                    }),
                  ],
                }),
                Config(Container, { height: 6 }),
                Config(Button, {
                  formBind: true,
                  ui: ButtonSkin.VIVID.getSkin(),
                  handler: bind(this$, this$.applyTextToContent),
                  text: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_apply_text_button_label,
                }),
              ],
              layout: Config(VBoxLayout, { align: "stretch" }),
            }),
          ]
        }),
        Config(DisplayField, {
          cls: `${GhostwritrGeneralPanel.BLOCK_CLASS_NAME}__credit_link`,
          value: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_credit_link,
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

  protected override afterRender(): any {
    this.hideDetailsTab();
    return super.afterRender();
  }

  getQuestionInputExpression(): ValueExpression {
    if (!this.#questionInputExpression) {
      this.#questionInputExpression = ValueExpressionFactory.createFromValue("");
    }
    return this.#questionInputExpression;
  }

  getGeneratedTextExpression(): ValueExpression {
    if (!this.#generatedTextExpression) {
      this.#generatedTextExpression = ValueExpressionFactory.createFromValue("");
    }
    return this.#generatedTextExpression;
  }

  getActiveStateExpression(): ValueExpression {
    if (!this.#activeStateExpression) {
      this.#activeStateExpression = ValueExpressionFactory.createFromValue(GhostwritrGeneralPanel.DEFAULT_STATE);
    }
    return this.#activeStateExpression;
  }

  createSource(text: string, url: string): GhostWritrtSource {
    let id = Ext.id(null, "GhostWritrSource");
    return new GhostWritrtSource(id, text, url);
  }

  applyTextToContent(b: Button): void {
    let title = FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_apply_text_button_label;
    let msg = FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_apply_text_popup_message;
    let buttonLabel = FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_apply_text_popup_submit_button_label;
    MessageBoxUtil.showConfirmation(title, msg, buttonLabel,
            (btn: any): void => {
              if (btn === "ok") {
                const content: Content = this.contentExpression.getValue();
                const text = this.getGeneratedTextExpression().getValue();
                const params: Record<string, any> = {
                  text: text,
                  contentId: content.getId(),
                };

                const JOB_TYPE = "ApplyTextToContent";
                console.log(`request params: ${params}`);
                jobService._.executeJob(
                        new GenericRemoteJob(JOB_TYPE, params),
                        //on success
                        (details: any): void => {
                        },
                        //on error
                        (error: JobExecutionError): void => {
                          trace("[ERROR]", "Error applying text to content: " + error);
                        },
                );
              }
            });
  }

  applyQuestion(): void {
    const content: Content = this.contentExpression.getValue();
    let siteId = editorContext._.getSitesService().getSiteIdFor(content);
    if (!siteId) {
      siteId = "all";
    }
    const input = this.getQuestionInputExpression().getValue();
    const params: Record<string, any> = {
      question: input,
      contentId: content.getId(),
      siteId: siteId,
      groupId: this.feedbackGroup.name,
    };

    const JOB_TYPE = "generateText";
    console.log(`request params: ${params}`);

    this.hideDetailsTab();
    this.removeConfidenceBar();

    jobService._.executeJob(
            new GenericRemoteJob(JOB_TYPE, params),
            //on success
            (details: any): void => {
              if (details.text === "Unfortunately I have no answer.") {
                this.getActiveStateExpression().setValue(GhostwritrGeneralPanel.EMPTY_STATE);
                GhostWritrValueHolder.getInstance().getSourcesExpression().setValue([]);
                this.removeConfidenceBar();

              } else {
                this.getActiveStateExpression().setValue(GhostwritrGeneralPanel.SUCCESS_STATE);
                this.getGeneratedTextExpression().setValue(details.text);

                // add confidence bar
                this.addConfidenceBar(details.confidence);

                let sources = details.sources.map(source => {
                  return this.createSource(source.text, source.source);
                });
                GhostWritrValueHolder.getInstance().getSourcesExpression().setValue(sources);

                if (sources && sources.length > 0) {
                  this.showDetailsTab();
                }
              }

            },
            //on error
            (error: JobExecutionError): void => {
              this.getActiveStateExpression().setValue(GhostwritrGeneralPanel.EMPTY_STATE);
              trace("[ERROR]", "Error assigning briefing: " + error);
            },
    );

    this.getActiveStateExpression().setValue(GhostwritrGeneralPanel.LOADING_STATE);
  }

  removeConfidenceBar() {
    this.remove(GhostwritrGeneralPanel.CONFIDENCE_BAR_ITEM_ID);
  }

  addConfidenceBar(confidence: number) {
    this.removeConfidenceBar();

    const confidencePercent = Math.round(confidence * 100);
    console.log(`Confidence: ${confidence} -> ${confidencePercent}%`);
    const targetConfidence = 75;

    const confidenceFeedback: FeedbackItem = new FeedbackItem("confidenceFeedback", "bar", FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_confidence_bar_label, null);
    confidenceFeedback["label"] = FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_confidence_bar_label;
    confidenceFeedback["value"] = confidencePercent;
    confidenceFeedback["maxValue"] = 100;
    confidenceFeedback["targetValue"] = targetConfidence;
    confidenceFeedback["reverseColors"] = false;
    confidenceFeedback["decimalPlaces"] = 1;
    confidenceFeedback["color"] = confidencePercent >= targetConfidence ? "green" : "orange";

    this.insert(1, Config(PercentageBarFeedbackItemPanel, {
      itemId: GhostwritrGeneralPanel.CONFIDENCE_BAR_ITEM_ID,
      feedbackItem: confidenceFeedback,
    }));
  }

  hideDetailsTab() {
    try {
      let tabPanel: TabPanel = as(this.findParentByType(TabPanel.xtype), TabPanel);
      if (tabPanel) {
        // Hide "Details" tab
        tabPanel.getTabBar().items.getAt(1).hide();
      }
    } catch (e) {
      console.log(e);
    }
  }

  showDetailsTab() {
    try {
      let tabPanel: TabPanel = as(this.findParentByType(TabPanel.xtype), TabPanel);
      if (tabPanel) {
        // Show "Details" tab
        tabPanel.getTabBar().items.getAt(1).show();
      }
    } catch (e) {
      console.log(e);
    }
  }

}

export default GhostwritrGeneralPanel;
