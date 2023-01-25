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
import Button from "@jangaroo/ext-ts/button/Button";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import ExtEvent from "@jangaroo/ext-ts/event/Event";
import MenuSeparator from "@jangaroo/ext-ts/menu/Separator";

interface SourcesPanelConfig extends Config<Container>, Partial<Pick<SourcesPanel,
        "source"
>> {
}


class SourcesPanel extends Container {
  declare Config: SourcesPanelConfig;

  static readonly BLOCK_CLASS_NAME: string = "ghostwritr-source-container";

  source: GhostWritrSource;

  static override readonly xtype: string = "com.coremedia.labs.plugins.feedbackhub.wonki.config.sourcspanel";

  constructor(config: Config<SourcesPanel> = null) {
    super((() => ConfigUtils.apply(Config(SourcesPanel, {
      cls: SourcesPanel.BLOCK_CLASS_NAME,
      items: [
        Config(Container, {
          itemId: "SourceContainer",
          items: [
            Config(DisplayField, {
              margin: '10 0 0 9',
              ui: DisplayFieldSkin.BOLD.getSkin(),
              value: this.extractDomain(config.source.url),
            }),
            Config(DisplayField, {
              margin: '0 0 0 9',
              scrollable: "y",
              autoScroll: true,
              flex: 1,
              itemId: "sourceText",
              value: config.source.text,
              cls: `${SourcesPanel.BLOCK_CLASS_NAME}__quote`
            }),
            Config(Button, {
              text: config.source.url,
              textAlign: 'left',
              margin: '0 0 10 0',
              ui: ButtonSkin.SIMPLE_PRIMARY.getSkin(),
              handler: (btn: Button, e: ExtEvent) => {
                window.open(config.source.url, "_blank")
              },
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

  extractDomain(url: string) {
    let splittedUrl = url.split('/');
    return splittedUrl[2].replace("www.", "");
  }
}

export default SourcesPanel;
