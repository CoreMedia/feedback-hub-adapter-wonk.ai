import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";

class ContextInformationUtil {

  private static audienceExpression: ValueExpression;
  private static focusKeywordsExpression: ValueExpression;


  static getAudienceExpression(): ValueExpression {
    if (!this.audienceExpression) {
      this.audienceExpression = ValueExpressionFactory.createFromValue("");
    }
    return this.audienceExpression;
  }

  static getFocusKeywordsExpression(): ValueExpression {
    if (!this.focusKeywordsExpression) {
      this.focusKeywordsExpression = ValueExpressionFactory.createFromValue([]);
    }
    return this.focusKeywordsExpression;
  }
}

export default ContextInformationUtil;
