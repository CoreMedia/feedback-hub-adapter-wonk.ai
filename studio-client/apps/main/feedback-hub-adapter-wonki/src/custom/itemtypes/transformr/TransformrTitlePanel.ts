import Config from "@jangaroo/runtime/Config";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import Button from "@jangaroo/ext-ts/button/Button";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import { bind } from "@jangaroo/runtime";
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
      title: "Generate Title",
      ui: PanelSkin.ACCORDION.getSkin(),
      bodyPadding: "6 0",
      items: [

        Config(Container, {
          items: [
            Config(DisplayField, {
              flex: 1,
              value: "Generate title based on the existing text."
            }),
            Config(Button, {
              text: "Generate Title",
              ui: ButtonSkin.MATERIAL_PRIMARY.getSkin(),
              handler: bind(this$, this$.generateTitle)
            }),
          ],
          layout: Config(HBoxLayout, { align: "stretch" })
        }),

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
        Config(Button, {
          text: "Apply to Html Title field",
          handler: bind(this$, this$.applyToPropertyField),
          ui: ButtonSkin.MATERIAL_PRIMARY.getSkin(),
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: this$.#getTitleExpression(),
              componentProperty: "visible",
              transformer: (value) => {return value && value !== "";}
            }),
            Config(BindPropertyPlugin, {
              bindTo: this$.#getTitleExpression(),
              componentProperty: "disabled",
              transformer: (value) => {return !value || value === "";}
            }),
          ]
        })
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
