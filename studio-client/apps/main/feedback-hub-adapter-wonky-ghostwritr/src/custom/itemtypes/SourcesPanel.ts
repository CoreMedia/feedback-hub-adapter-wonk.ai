import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import DisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/DisplayFieldSkin";
import Component from "@jangaroo/ext-ts/Component";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import AnchorLayout from "@jangaroo/ext-ts/layout/container/Anchor";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import GhostWritrSource from "./GhostWritrtSource";

interface SourcesPanelConfig extends Config<Container>, Partial<Pick<SourcesPanel,
        "source"
>> {
}


class SourcesPanel extends Container {
  declare Config: SourcesPanelConfig;

  source: GhostWritrSource;
  //dirty
  static override readonly xtype: string = "com.coremedia.labs.plugins.feedbackhub.wonky.config.sourcspanel";


  constructor(config: Config<SourcesPanel> = null) {
    super((() => ConfigUtils.apply(Config(SourcesPanel, {
      items: [
        Config(Container, {
          itemId: "SourceContainer",
          items: [
            Config(DisplayField, {
              scrollable: "y",
              autoScroll: true,
              flex: 1,
              itemId: "sourceText",
              value: config.source.text,
            }),
            Config(DisplayField, {
              ui: DisplayFieldSkin.BOLD.getSkin(),
              value: config.source.url,
            }),
          ],
          layout: Config(VBoxLayout, {align: "stretch"}),
        }),
      ],
      defaultType: Component.xtype,
      defaults: Config<Component>({anchor: "100%"}),
      layout: Config(AnchorLayout),
      plugins: [
        Config(VerticalSpacingPlugin),
      ],
    }), config))());
  }

}

export default SourcesPanel;
