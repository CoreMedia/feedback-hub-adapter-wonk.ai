import Config from "@jangaroo/runtime/Config";
import Tag from "@jangaroo/ext-ts/form/field/Tag";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import Ext from "@jangaroo/ext-ts";

interface TagFieldConfig extends Config<Tag> {

}

class TagField extends Tag {
  declare Config: TagFieldConfig;

  constructor(config: Config<TagField> = null) {

    let store = Ext.create('Ext.data.Store', {
      fields: ['name'],
      data: []
    });
    // @ts-expect-error Ext JS semantics
    const this$ = this;
    super(ConfigUtils.apply(Config(TagField, {
      store: store,
      queryMode: 'local',
      forceSelection: false,
      createNewOnEnter: true,
      hideTrigger: true,
      displayField: 'name',
      valueField: 'name',
      createNewOnBlur: true,
      triggerOnClick: false,
      emptyText: "provide some focus keywords"
    }), config))


  }

}

export default TagField
