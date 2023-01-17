import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";

class GhostWritrValueHolder {
  private static instance: GhostWritrValueHolder;

  #sourcesExpression: ValueExpression = null;

  constructor() {
    if (GhostWritrValueHolder.instance) {
      throw new Error("Error - use Singleton.getInstance()");
    }
  }

  static getInstance(): GhostWritrValueHolder {
    GhostWritrValueHolder.instance = GhostWritrValueHolder.instance || new GhostWritrValueHolder();
    return GhostWritrValueHolder.instance;
  }

  getSourcesExpression(): ValueExpression {
    if (!this.#sourcesExpression) {
      this.#sourcesExpression = ValueExpressionFactory.createFromValue([]);
    }
    return this.#sourcesExpression;
  }
}

export default GhostWritrValueHolder

