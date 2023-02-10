import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";

class GhostwritrValueHolder {
  private static instance: GhostwritrValueHolder;

  #sourcesExpression: ValueExpression = null;

  constructor() {
    if (GhostwritrValueHolder.instance) {
      throw new Error("Error - use GhostWritrValueHolder.getInstance()");
    }
  }

  static getInstance(): GhostwritrValueHolder {
    GhostwritrValueHolder.instance = GhostwritrValueHolder.instance || new GhostwritrValueHolder();
    return GhostwritrValueHolder.instance;
  }

  getSourcesExpression(): ValueExpression {
    if (!this.#sourcesExpression) {
      this.#sourcesExpression = ValueExpressionFactory.createFromValue([]);
    }
    return this.#sourcesExpression;
  }
}

export default GhostwritrValueHolder

