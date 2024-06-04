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
import WonkiService from "../../../util/WonkiService";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import ContentPropertyNames from "@coremedia/studio-client.cap-rest-client/content/ContentPropertyNames";
import Premular from "@coremedia/studio-client.main.editor-components/sdk/premular/Premular";
import CollapsiblePanel from "@coremedia/studio-client.ext.ui-components/components/panel/CollapsiblePanel";
import PanelSkin from "@coremedia/studio-client.ext.ui-components/skins/PanelSkin";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import WonkiLabels from "../../../WonkiStudioPlugin_properties";
import TransformrPanel from "./TransformrPanel";
import WonkService from "../../../util/WonkiService";
import WonkiStudioPlugin_properties from "../../../WonkiStudioPlugin_properties";

interface TransformrMetaDescriptionPanelConfig extends Config<Panel>, Partial<Pick<TransformrMetaDescriptionPanel,
        "contentExpression" |
        "contentProperty" |
        "premular" |
        "activeStateExpression"
>> {}

class TransformrMetaDescriptionPanel extends CollapsiblePanel {

  declare Config: TransformrMetaDescriptionPanelConfig;

  private metaDescriptionExpression: ValueExpression;
  contentExpression: ValueExpression;
  contentProperty: string;
  premular: Premular;
  activeStateExpression: ValueExpression;

  constructor(config: Config<TransformrMetaDescriptionPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(TransformrMetaDescriptionPanel, {
      itemId: "metaDescriptionPanel",
      title: WonkiLabels.transformr_generate_meta_description_title,
      ui: PanelSkin.FRAME_PLAIN_200.getSkin(),
      bodyPadding: "10 10 10",
      items: [

        Config(Container, {
          items: [
            Config(DisplayField, {
              flex: 1,
              value: WonkiLabels.transformr_generate_meta_description_description
            }),
            Config(Button, {
              text: WonkiLabels.wonki_generate_button_label,
              ui: ButtonSkin.PRIMARY_LIGHT.getSkin(),
              handler: bind(this$, this$.generateMetaDescription),
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getMetaDescriptionExpression(),
                  componentProperty: "visible",
                  transformer: (value) => {
                    return !value || value === "";
                  }
                }),]
            }),
          ],
          layout: Config(HBoxLayout, {align: "stretch"})
        }),
        Config(TextArea, {
          margin: "6px 0px 6px 0px",
          emptyText: "META Description",
          grow: true,
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: this$.#getMetaDescriptionExpression()
            }),
            Config(BindPropertyPlugin, {
              bindTo: this$.#getMetaDescriptionExpression(),
              componentProperty: "visible",
              transformer: (value) => {
                return value && value !== "";
              }
            }),
          ]
        }),
        Config(Container, {
          items: [
            Config(Button, {
              margin: "0 6 0 6",
              text: WonkiLabels.wonki_redo_button_label,
              ui: ButtonSkin.SECONDARY_LIGHT.getSkin(),
              handler: bind(this$, this$.generateMetaDescription),
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getMetaDescriptionExpression(),
                  componentProperty: "visible",
                  transformer: (value) => {
                    return value || value !== "";
                  }
                }),
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getMetaDescriptionExpression(),
                  componentProperty: "hidden",
                  transformer: (value) => {
                    return !value || value === "";
                  }
                }),
              ]
            }),
            Config(Button, {
              margin: "0 6 0 0",
              text: WonkiStudioPlugin_properties.wonki_shorten_button_label,
              ui: ButtonSkin.SECONDARY_LIGHT.getSkin(),
              handler: bind(this$, this$.shorten),
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getMetaDescriptionExpression(),
                  componentProperty: "visible",
                  transformer: (value) => {
                    return value || value !== "";
                  }
                }),
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getMetaDescriptionExpression(),
                  componentProperty: "hidden",
                  transformer: (value) => {
                    return !value || value === "";
                  }
                }),
              ]
            }),
            Config(Button, {
              text: WonkiLabels.wonki_apply_button_label,
              ui: ButtonSkin.PRIMARY_LIGHT.getSkin(),
              handler: bind(this$, this$.applyToPropertyField),
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getMetaDescriptionExpression(),
                  componentProperty: "visible",
                  transformer: (value) => {
                    return value || value !== "";
                  }
                }),
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getMetaDescriptionExpression(),
                  componentProperty: "hidden",
                  transformer: (value) => {
                    return !value || value === "";
                  }
                }),
              ]
            }),
          ],
          layout: Config(HBoxLayout, {
            pack: "end",
            align: "stretch"
          })
        }),
      ],
      layout: Config(VBoxLayout, {
        align: "stretch"
      })
    }), config));
    this.activeStateExpression = config.activeStateExpression;

    if (!config.contentProperty) {
      this$.contentProperty = "htmlDescription";
    }
  }

  shorten(): void {
    console.log("Shorten text");
    const content = this.contentExpression.getValue();
    this.activeStateExpression.setValue(TransformrPanel.LOADING_STATE);
    WonkService.shortenText(this.#getMetaDescriptionExpression().getValue(), content)
            .then((shortenedText) => {
              this.#getMetaDescriptionExpression().setValue(shortenedText)
              this.activeStateExpression.setValue(TransformrPanel.SUCCESS_STATE);
            })
            .catch(() => {
              this.activeStateExpression.setValue(TransformrPanel.EMPTY_STATE);
            });
  }

  #getMetaDescriptionExpression(): ValueExpression {
    if (!this.metaDescriptionExpression) {
      this.metaDescriptionExpression = ValueExpressionFactory.createFromValue("");
    }
    return this.metaDescriptionExpression;
  }

  generateMetaDescription(): void {
    console.log("Generate META description");
    const content = this.contentExpression.getValue();
    this.activeStateExpression.setValue(TransformrPanel.LOADING_STATE);
    WonkiService.generateMetaDescription(content)
            .then((metaDescription) => {
              this.#getMetaDescriptionExpression().setValue(metaDescription);
              this.activeStateExpression.setValue(TransformrPanel.SUCCESS_STATE);
            })
            .catch(() => {
              this.activeStateExpression.setValue(TransformrPanel.EMPTY_STATE);
            });
  }

  applyToPropertyField(): void {
    console.log("Apply to property field");
    const value = this.#getMetaDescriptionExpression().getValue();
    if (value && value !== "") {
      this.contentExpression.extendBy(ContentPropertyNames.PROPERTIES, this.contentProperty).setValue(value);
      this.premular.getPremularFocusManager().focusProperty(this.contentExpression.getValue(), ContentPropertyNames.PROPERTIES + "." + this.contentProperty);
    }
  }

}

export default TransformrMetaDescriptionPanel;
