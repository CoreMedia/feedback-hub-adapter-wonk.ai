import Config from "@jangaroo/runtime/Config";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import Premular from "@coremedia/studio-client.main.editor-components/sdk/premular/Premular";
import PanelSkin from "@coremedia/studio-client.ext.ui-components/skins/PanelSkin";
import DisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/DisplayFieldSkin";
import TextField from "@jangaroo/ext-ts/form/field/Text";
import TagField from "./TagField";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import ContextInformationUtil from "../../../util/ContextInformationUtil";


interface TransformrContextPanelConfig extends Config<Panel>, Partial<Pick<TransformrContextPanel,
        "contentExpression" | "premular"
>> {
}

class TransformrContextPanel extends Panel {

  declare Config: TransformrContextPanelConfig;

  private audienceExpression: ValueExpression;

  private focusKeywordsExpression: ValueExpression;

  contentExpression: ValueExpression;

  premular: Premular;

  constructor(config: Config<TransformrContextPanel> = null) {
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(TransformrContextPanel, {
      margin: "10 0 10 0",
      ui: PanelSkin.FORM_LIGHT.getSkin(),
      items: [
        Config(DisplayField, {
          ui: DisplayFieldSkin.INFO_REGULAR.getSkin(),
          flex: 1,
          value: "Provide some context information for the AI. With a short description of the content audience and some additional focus keywords you can further tailor and improve the results."
        }),
        Config(TextField, {
          flex: 1,
          fieldLabel: "Audience",
          allowBlank: true,
          emptyText: "Describe your audience",
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: ContextInformationUtil.getAudienceExpression(),
              bidirectional: true,
            }),
          ],
        }),
        Config(TagField, {
          fieldLabel: "Focus Keywords",
          plugins: [
                Config(BindPropertyPlugin, {
                  bindTo: ContextInformationUtil.getFocusKeywordsExpression(),
                   bidirectional: true,
                 }),
          ],
        }),
      ],
      layout: Config(VBoxLayout, {
        align: "stretch"
      }),
      plugins: [
        Config(VerticalSpacingPlugin),
      ]
    }), config));
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
}

export default TransformrContextPanel;
