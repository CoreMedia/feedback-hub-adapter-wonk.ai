import Config from "@jangaroo/runtime/Config";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import Button from "@jangaroo/ext-ts/button/Button";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import {bind} from "@jangaroo/runtime";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import TextArea from "@jangaroo/ext-ts/form/field/TextArea";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import WonkService from "../../../util/WonkiService";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import ContentPropertyNames from "@coremedia/studio-client.cap-rest-client/content/ContentPropertyNames";
import Premular from "@coremedia/studio-client.main.editor-components/sdk/premular/Premular";
import CollapsiblePanel from "@coremedia/studio-client.ext.ui-components/components/panel/CollapsiblePanel";
import PanelSkin from "@coremedia/studio-client.ext.ui-components/skins/PanelSkin";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import WonkiLabels from "../../../WonkiStudioPlugin_properties";
import TagField from "./TagField";
import TextField from "@jangaroo/ext-ts/form/field/Text";
import jobService from "@coremedia/studio-client.cap-rest-client/common/jobService";
import GenericRemoteJob from "@coremedia/studio-client.cap-rest-client-impl/common/impl/GenericRemoteJob";
import JobExecutionError from "@coremedia/studio-client.cap-rest-client/common/JobExecutionError";
import trace from "@jangaroo/runtime/trace";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";


interface TransformTeaserTextPanelConfig extends Config<Panel>, Partial<Pick<TransformTeaserTextPanel,
        "contentExpression" | "premular" | "contentProperty"
>> {
}

class TransformTeaserTextPanel extends CollapsiblePanel {

  declare Config: TransformTeaserTextPanelConfig;

  private teserTextExpression: ValueExpression;

  private audienceExpression: ValueExpression;

  private focusKeywordsExpression: ValueExpression;

  contentExpression: ValueExpression;

  contentProperty: string;

  premular: Premular;

  constructor(config: Config<TransformTeaserTextPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(TransformTeaserTextPanel, {
      itemId: "teaserTextPanel",
      title: WonkiLabels.transformr_generate_teaser_text_title,
      ui: PanelSkin.FRAME_PLAIN_200.getSkin(),
      bodyPadding: "10 10 10",
      items: [

        Config(Container, {
          items: [
            Config(DisplayField, {
              flex: 1,
              value: WonkiLabels.transformr_generate_teaser_text_description
            }),
            Config(TextField, {
              flex: 1,
              fieldLabel: "Audience",
              allowBlank: true,
              emptyText: "Describe your audience",
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getAudienceExpression(),
                  bidirectional: true,
                }),
              ],
            }),
            Config(TagField, {
              width: '50%',
              fieldLabel: "Focus Keywords",
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getFocusKeywordsExpression(),
                  bidirectional: true,
                }),
              ],
            }),
          ],
          layout: Config(VBoxLayout, {
            align: "stretch",
          })

        }),
        Config(Container, {
          items: [
            Config(Button, {
              text: WonkiLabels.wonki_generate_button_label,
              ui: ButtonSkin.PRIMARY_LIGHT.getSkin(),
              handler: bind(this$, this$.generateTeaserText),
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getTeaserTextExpression(),
                  componentProperty: "visible",
                  transformer: (value) => {
                    return !value || value === "";
                  }
                }),]
            }),
            Config(Button, {
              margin: "0 6 0 6",
              text: WonkiLabels.wonki_apply_button_label,
              ui: ButtonSkin.PRIMARY_LIGHT.getSkin(),
              handler: bind(this$, this$.applyToPropertyField),
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getTeaserTextExpression(),
                  componentProperty: "visible",
                  transformer: (value) => {
                    return value || value !== "";
                  }
                }),
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getTeaserTextExpression(),
                  componentProperty: "hidden",
                  transformer: (value) => {
                    return !value || value === "";
                  }
                }),
              ]
            }),
            Config(Button, {
              text: WonkiLabels.wonki_redo_button_label,
              ui: ButtonSkin.SECONDARY_LIGHT.getSkin(),
              handler: bind(this$, this$.generateTeaserText),
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getTeaserTextExpression(),
                  componentProperty: "visible",
                  transformer: (value) => {
                    return value || value !== "";
                  }
                }),
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getTeaserTextExpression(),
                  componentProperty: "hidden",
                  transformer: (value) => {
                    return !value || value === "";
                  }
                }),
              ]
            }),
          ],
          layout: Config(HBoxLayout, {align: "stretch"})
        }),
        Config(Container, {height: 6}),
        Config(TextArea, {
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: this$.#getTeaserTextExpression()
            }),
            Config(BindPropertyPlugin, {
              bindTo: this$.#getTeaserTextExpression(),
              componentProperty: "visible",
              transformer: (value) => {
                return value && value !== "";
              }
            }),
          ]
        }),
      ],
      layout: Config(VBoxLayout, {
        align: "stretch"
      })
    }), config));

    if (!config.contentProperty) {
      this$.contentProperty = "teaserText";
    }

  }


  #getTeaserTextExpression(): ValueExpression {
    if (!this.teserTextExpression) {
      this.teserTextExpression = ValueExpressionFactory.createFromValue("");
    }
    return this.teserTextExpression;
  }

  #getAudienceExpression(): ValueExpression {
    if (!this.audienceExpression) {
      this.audienceExpression = ValueExpressionFactory.createFromValue("");
    }
    return this.audienceExpression;
  }

  #getFocusKeywordsExpression(): ValueExpression {
    if (!this.focusKeywordsExpression) {
      this.focusKeywordsExpression = ValueExpressionFactory.createFromValue([]);
    }
    return this.focusKeywordsExpression;
  }

  generateTeaserText(): void {
    console.log("Generate teaser text");
    const content = this.contentExpression.getValue();
    let audience = this.#getAudienceExpression().getValue();
    let focusKeywords = this.#getFocusKeywordsExpression().getValue();

    WonkService.generateTeaserText(content,audience,focusKeywords).then((teaserText) => {
      this.#getTeaserTextExpression().setValue(teaserText);
    });
  }

  applyToPropertyField(): void {
    console.log("Apply to property field");
    const content: Content = this.contentExpression.getValue();
    const text = this.#getTeaserTextExpression().getValue();
    const params: Record<string, any> = {
      text: text,
      property: this.contentProperty,
      contentId: content.getId(),
    };

    const JOB_TYPE = "wonkiApplyTextToContent";
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
    this.premular.getPremularFocusManager().focusProperty(this.contentExpression.getValue(), ContentPropertyNames.PROPERTIES + "." + this.contentProperty);
  }

}

export default TransformTeaserTextPanel;
