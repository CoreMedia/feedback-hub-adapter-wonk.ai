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
import WonkiService from "../../util/WonkiService";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import ContentPropertyNames from "@coremedia/studio-client.cap-rest-client/content/ContentPropertyNames";
import Premular from "@coremedia/studio-client.main.editor-components/sdk/premular/Premular";

interface TransformrMetaDescriptionPanelConfig extends Config<Panel>, Partial<Pick<TransformrMetaDescriptionPanel,
        "contentExpression" | "contentProperty" | "premular"
>> {}

class TransformrMetaDescriptionPanel extends Panel {

  declare Config: TransformrMetaDescriptionPanelConfig;

  private metaDescriptionExpression: ValueExpression;

  contentExpression: ValueExpression;

  contentProperty: string;

  premular: Premular;

  constructor(config: Config<TransformrMetaDescriptionPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(TransformrMetaDescriptionPanel, {
      itemId: "metaDescriptionPanel",
      title: "Generate Meta Description",
      items: [

        Config(Container, {
          items: [
            Config(DisplayField, {
              value: "Generate meta description based on the existing text."
            }),
            Config(Button, {
              text: "Generate Meta Description",
              ui: ButtonSkin.MATERIAL_PRIMARY.getSkin(),
              handler: bind(this$, this$.generateMetaDescription)
            }),
          ],
          layout: Config(VBoxLayout, { align: "begin" })
        }),

        Config(TextArea, {
          emptyText: "META Description",
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: this$.#getMetaDescriptionExpression()
            }),
            Config(BindPropertyPlugin, {
              bindTo: this$.#getMetaDescriptionExpression(),
              componentProperty: "visible",
              transformer: (value) => {return value && value !== "";}
            }),
          ]
        }),
        Config(Button, {
          text: "Apply to Html Meta Description field",
          handler: bind(this$, this$.applyToPropertyField),
          ui: ButtonSkin.MATERIAL_PRIMARY.getSkin(),
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: this$.#getMetaDescriptionExpression(),
              componentProperty: "visible",
              transformer: (value) => {return value && value !== "";}
            }),
            Config(BindPropertyPlugin, {
              bindTo: this$.#getMetaDescriptionExpression(),
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

    if (!config.contentProperty) {
      this$.contentProperty = "htmlDescription";
    }

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
    WonkiService.generateMetaDescription(content).then((metaDescription) => {
      this.#getMetaDescriptionExpression().setValue(metaDescription);
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
