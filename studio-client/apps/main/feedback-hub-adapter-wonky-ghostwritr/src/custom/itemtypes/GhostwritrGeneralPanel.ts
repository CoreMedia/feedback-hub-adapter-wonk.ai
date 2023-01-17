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
import LoadMaskSkin from "@coremedia/studio-client.ext.ui-components/skins/LoadMaskSkin";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import FeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/FeedbackItemPanel";
import Ext from "@jangaroo/ext-ts";
import Component from "@jangaroo/ext-ts/Component";
import LoadMask from "@jangaroo/ext-ts/LoadMask";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import FormPanel from "@jangaroo/ext-ts/form/Panel";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import TextField from "@jangaroo/ext-ts/form/field/Text";
import AnchorLayout from "@jangaroo/ext-ts/layout/container/Anchor";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import {bind} from "@jangaroo/runtime";
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

interface GhostwritrGeneralPanelConfig extends Config<FeedbackItemPanel> {
}

class GhostwritrGeneralPanel extends FeedbackItemPanel {
  declare Config: GhostwritrGeneralPanelConfig;

  #generatedTextExpression: ValueExpression = null;

  #questionInputExpression: ValueExpression = null;

  #confidenceExpression: ValueExpression = null;

  #loadMask: LoadMask = null;

  //dirty
  static override readonly xtype: string = "com.coremedia.labs.plugins.feedbackhub.wonky.config.wonkyghostwritritempanel";


  constructor(config: Config<GhostwritrGeneralPanel> = null) {
    super((() => ConfigUtils.apply(Config(GhostwritrGeneralPanel, {
      items: [
        Config(FormPanel, {
          items: [
            Config(TextField, {
              flex: 1,
              fieldLabel: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghoestwritr_question_label,
              allowBlank: false,
              blankText: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_question_blank_validation_text,
              emptyText: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwirtr_question_emptyText,
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this.getQuestionInputExpression(),
                  bidirectional: true,
                }),
              ],
            }),
            Config(Container, {width: 6}),
            Config(Button, {
              formBind: true,
              ui: ButtonSkin.MATERIAL_PRIMARY.getSkin(),
              handler: bind(this, this.applyQuestion),
              text: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_question_submit_button_label,
            }),
          ],
          layout: Config(HBoxLayout, {
            align: "stretch",
            pack: "start",
          }),
        }),
        Config(Container, {
          id: "response_container",
          hidden: true,
          items: [
            //TODO without explicitly setting the feedbackItem this doesnt work. But like this the changed value wont be rendered
            Config(PercentageBarFeedbackItemPanel, {
              feedbackItem: this.getConfidenceExpression().getValue(),
              plugins: [
                Config(BindPropertyPlugin, {
                  componentProperty: "feedbackItem",
                  bindTo: this.getConfidenceExpression(),
                  bidirectional: true,

                }),
              ],
            }),
            Config(DisplayField, {
              ui: DisplayFieldSkin.BOLD.getSkin(),
              value: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_generated_text_header,
            }),
            Config(Container, {
              scrollable: "y",
              autoScroll: true,
              flex: 1,
              style: "border: 1px solid #c7c7c7; border-radius: 3px; padding: 6px;",
              items: [
                Config(DisplayField, {
                  scrollable: "y",
                  autoScroll: true,
                  flex: 1,
                  html: true,
                  itemId: "briefingContent",
                  plugins: [
                    Config(BindPropertyPlugin, {
                      componentProperty: "value",
                      bindTo: this.getGeneratedTextExpression(),
                    }),
                  ],
                }),
              ],
            }),
            Config(Container, {width: 6}),
            Config(Button, {
              formBind: true,
              ui: ButtonSkin.VIVID.getSkin(),
              handler: bind(this, this.applyTextToContent),
              text: FeedbackHubWonkyGhostwritrStudioPlugin_properties.ghostwritr_apply_text_button_label,
            }),
          ],
          layout: Config(VBoxLayout, {align: "stretch"}),
          /*  plugins: [
              Config(BindVisibilityPlugin, { bindTo: this.getBriefingInfoExpression() }),
            ],
           */
        }),
        Config(Component, {height: 6}),
      ],
      defaultType: Component.xtype,
      defaults: Config<Component>({anchor: "100%"}),
      layout: Config(AnchorLayout),
      plugins: [
        Config(VerticalSpacingPlugin),
      ],
    }), config))());
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

  getConfidenceExpression(): ValueExpression {
    if (!this.#confidenceExpression) {
      //TODO creat with initial value of -1
      this.#confidenceExpression = ValueExpressionFactory.createFromValue(this.createPercentageBarFeedbackItem(95));
    }
    return this.#confidenceExpression;
  }

  createSource(text: string, url: string): GhostWritrtSource {
    return new GhostWritrtSource(Ext.id(null, "GhostWritrSource"), text, url);
  }

  getSourceId(source: GhostWritrtSource): string {
    return source.id;
  }

  createPercentageBarFeedbackItem(value: number): FeedbackItem {
    let feedbackItem: FeedbackItem = new FeedbackItem("foo", "bar", "Test", "");
    feedbackItem["label"] = "Test";
    feedbackItem["value"] = value;
    feedbackItem["maxValue"] = 100;
    feedbackItem["targetValue"] = 75;
    feedbackItem["reverseColors"] = false;
    feedbackItem["decimalPlaces"] = 2;
    feedbackItem["color"] = "green";
    return feedbackItem;
  };

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
              }})
  }

  applyQuestion(b: Button): void {
    const responseContainer = Ext.getCmp("response_container");
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
    jobService._.executeJob(
            new GenericRemoteJob(JOB_TYPE, params),
            //on success
            (details: any): void => {
              if (this.#loadMask && !this.#loadMask.destroyed) {
                this.#loadMask.destroy();
              }
              this.getGeneratedTextExpression().setValue(details.text);
              this.getConfidenceExpression().setValue(this.createPercentageBarFeedbackItem(details.confidence))
              responseContainer.show();

              let sources = details.sources.map(source => {
                return this.createSource(source.text, source.source)
              });
              GhostWritrValueHolder.getInstance().getSourcesExpression().setValue(sources);
            },
            //on error
            (error: JobExecutionError): void => {
              if (this.#loadMask && !this.#loadMask.destroyed) {
                this.#loadMask.destroy();
              }
              trace("[ERROR]", "Error assigning briefing: " + error);
            },
    );

    if (!this.#loadMask || this.#loadMask.destroyed) {
      const loadMaskConfig = Config(LoadMask);
      loadMaskConfig.ui = LoadMaskSkin.DARK.getSkin();
      loadMaskConfig.msg = "Please wait...";
      loadMaskConfig.target = this;
      this.#loadMask = new LoadMask(loadMaskConfig);
    }

    this.#loadMask.show();
  }
}

export default GhostwritrGeneralPanel;
