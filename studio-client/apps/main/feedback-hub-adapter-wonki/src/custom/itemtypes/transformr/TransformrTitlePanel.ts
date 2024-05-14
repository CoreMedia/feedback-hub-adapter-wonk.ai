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
import Spacer from "@jangaroo/ext-ts/toolbar/Spacer";


interface TransformrMetaTitlePanelConfig extends Config<Panel>, Partial<Pick<TransformrTitlePanel,
        "contentExpression" | "premular"
>> {}

class TransformrTitlePanel extends CollapsiblePanel {

  declare Config: TransformrMetaTitlePanelConfig;

  private titleExpression: ValueExpression;

  contentExpression: ValueExpression;

  premular: Premular;

  constructor(config: Config<TransformrTitlePanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(TransformrTitlePanel, {
      itemId: "titlePanel",
      title: WonkiLabels.transformr_generate_title_title,
      ui: PanelSkin.FRAME_PLAIN_200.getSkin(),
      bodyPadding: "10 10 10",
      items: [

        Config(Container, {
          items: [
            Config(DisplayField, {
              flex: 1,
              value: WonkiLabels.transformr_generate_title_description
            }),
            Config(Button, {
              text: WonkiLabels.wonki_generate_button_label,
              ui: ButtonSkin.PRIMARY_LIGHT.getSkin(),
              handler: bind(this$, this$.generateTitle),
              plugins: [
                Config(BindPropertyPlugin, {
                bindTo: this$.#getTitleExpression(),
                componentProperty: "visible",
                transformer: (value) => {return !value || value === "";}
              }),]
            }),
            Config(Button, {
              margin: "0 6 0 6",
              text: WonkiLabels.wonki_apply_button_label,
              ui: ButtonSkin.PRIMARY_LIGHT.getSkin(),
              handler: bind(this$, this$.applyToPropertyField),
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getTitleExpression(),
                  componentProperty: "visible",
                  transformer: (value) => {return value || value !== "";}
                }),
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getTitleExpression(),
                  componentProperty: "hidden",
                  transformer: (value) => {return !value || value === "";}
                }),
              ]
            }),
            Config(Button, {
              text: WonkiLabels.wonki_redo_button_label,
              ui: ButtonSkin.SECONDARY_LIGHT.getSkin(),
              handler: bind(this$, this$.generateTitle),
              plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getTitleExpression(),
                  componentProperty: "visible",
                  transformer: (value) => {return value || value !== "";}
                }),
                Config(BindPropertyPlugin, {
                  bindTo: this$.#getTitleExpression(),
                  componentProperty: "hidden",
                  transformer: (value) => {return !value || value === "";}
                }),
              ]
            }),
          ],
          layout: Config(HBoxLayout, { align: "stretch" })
        }),
        Config(Container, { height: 6 }),
        Config(TextArea, {
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: this$.#getTitleExpression()
            }),
            Config(BindPropertyPlugin, {
              bindTo: this$.#getTitleExpression(),
              componentProperty: "visible",
              transformer: (value) => {return value && value !== "";}
            }),
          ]
        }),
      ],
      layout: Config(VBoxLayout, {
        align: "stretch"
      })
    }), config));

  }

  #getTitleExpression(): ValueExpression {
    if (!this.titleExpression) {
      this.titleExpression = ValueExpressionFactory.createFromValue("");
    }
    return this.titleExpression;
  }

  generateTitle(): void {
    console.log("Generate title");
    const content = this.contentExpression.getValue();
    WonkiService.generateTitle(content).then((metaDescription) => {
      this.#getTitleExpression().setValue(metaDescription);
    });
  }

  applyToPropertyField(): void {
    console.log("Apply to property field");
    const value = this.#getTitleExpression().getValue();
    if (value && value !== "") {
      this.contentExpression.extendBy(ContentPropertyNames.PROPERTIES, "htmlTitle").setValue(value);
      this.premular.getPremularFocusManager().focusProperty(this.contentExpression.getValue(), ContentPropertyNames.PROPERTIES + "." + "htmlTitle");
    }
  }

}

export default TransformrTitlePanel;
