import GenericRemoteJob from "@coremedia/studio-client.cap-rest-client-impl/common/impl/GenericRemoteJob";
import JobExecutionError from "@coremedia/studio-client.cap-rest-client/common/JobExecutionError";
import jobService from "@coremedia/studio-client.cap-rest-client/common/jobService";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import MessageBoxUtil from "@coremedia/studio-client.ext.ui-components/messagebox/MessageBoxUtil";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import DisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/DisplayFieldSkin";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import FeedbackItemPanel
  from "@coremedia/studio-client.main.feedback-hub-editor-components/components/itempanels/FeedbackItemPanel";
import Component from "@jangaroo/ext-ts/Component";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import TextField from "@jangaroo/ext-ts/form/field/Text";
import AnchorLayout from "@jangaroo/ext-ts/layout/container/Anchor";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import trace from "@jangaroo/runtime/trace";

interface WonkyGhostwritrItemPanelConfig extends Config<FeedbackItemPanel> {
}

class WonkyGhostwritrItemPanel extends FeedbackItemPanel {
  declare Config: WonkyGhostwritrItemPanelConfig;

  static override readonly xtype: string = "com.coremedia.labs.plugins.feedbackhub.wonky.config.wonkyghostwritritempanel";

  constructor(config: Config<WonkyGhostwritrItemPanel> = null) {
    super((()=> ConfigUtils.apply(Config(WonkyGhostwritrItemPanel, {

      items: [
        Config(Container, {
          items: [
            Config(TextField, {
              flex: 1,
              fieldLabel: "Question",
              allowBlank: false,
              emptyText: "Enter a question for text generation",
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this.getQuestionInputExpression(),
                  bidirectional: true,
                }),
              ],
            }),
            Config(Container, { width: 6 }),
            Config(Button, {
              ui: ButtonSkin.MATERIAL_PRIMARY.getSkin(),
              handler: bind(this, this.applyQuestion),
              text: "Submit",
            }),
          ],
          layout: Config(HBoxLayout, {
            align: "stretch",
            pack: "start",
          }),
        }),
        Config(Container, {
          items: [
            Config(DisplayField, {
              ui: DisplayFieldSkin.BOLD.getSkin(),
              value: "Generated Text",
              scrollable: "y",
            }),
            Config(Container, {
              flex: 1,
              style: "border: 1px solid #c7c7c7; border-radius: 3px; padding: 6px;",
              items: [
                Config(DisplayField, {
                  html: true,
                  itemId: "briefingContent",
                  plugins: [
                    Config(BindPropertyPlugin, {
                      componentProperty: "value",
                      ifUndefined: "Submit question",
                      bindTo: this.getGeneratedTextExpression(),
                    }),
                  ],
                }),
              ],
            }),
          ],
          layout: Config(VBoxLayout, { align: "stretch" }),
        /*  plugins: [
            Config(BindVisibilityPlugin, { bindTo: this.getBriefingInfoExpression() }),
          ],
         */
        }),
        Config(Component, { height: 6 }),
      ],
      defaultType: Component.xtype,
      defaults: Config<Component>({ anchor: "100%" }),
      layout: Config(AnchorLayout),
      plugins: [
        Config(VerticalSpacingPlugin),
      ],
    }), config))());
  }

  #generatedTextExpression: ValueExpression = null;

  #questionInputExpression: ValueExpression = null;

  getQuestionInputExpression(): ValueExpression {
    if (!this.#questionInputExpression) {
      this.#questionInputExpression = ValueExpressionFactory.createFromValue("Hello");
    }
    return this.#questionInputExpression;
  }

  getGeneratedTextExpression(): ValueExpression {
    if (!this.#generatedTextExpression) {
      this.#generatedTextExpression = ValueExpressionFactory.createFromValue("Generated Text");
    }
    return this.#generatedTextExpression;
  }

  applyQuestion(b: Button): void {
    MessageBoxUtil.showConfirmation("title", "msg", "confirmtxt",
      (btn: any): void => {
        if (btn === "ok") {
          const content: Content = this.contentExpression.getValue();
          let siteId = editorContext._.getSitesService().getSiteIdFor(content);
          if (!siteId) {
            siteId = "all";
          }
          const input = this.getQuestionInputExpression().getValue();
          const params: Record<string, any> = {
            question: input,
            contentId: "contentId",
            siteId: siteId,
            groupId: this.feedbackGroup.name,
          };

          const JOB_TYPE = "generateText";
          console.log(`request params: ${params}`);
          jobService._.executeJob(
            new GenericRemoteJob(JOB_TYPE, params),
            //on success
            (details: any): void => {
              this.getGeneratedTextExpression().setValue(details.text);
              console.log(`details: ${details}`);
            },
            //on error
            (error: JobExecutionError): void =>
              trace("[ERROR]", "Error assigning briefing: " + error),
          );
        }
      });
  }
}

export default WonkyGhostwritrItemPanel;
