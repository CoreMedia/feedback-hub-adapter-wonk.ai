const { jangarooConfig } = require("@jangaroo/core");

module.exports = {
  type: "code",
  sencha: {
    name: "com.coremedia.labs.plugins__studio-client.feedback-hub-adapter-wonki",
    namespace: "com.coremedia.labs.plugins.feedbackhub.wonki",
    css: [
      {
        path: "resources/css/wonki-ui.css",
        bundle: false,
        includeInBundle: false,
      },
    ],
    studioPlugins: [
      {
        mainClass: "com.coremedia.labs.plugins.feedbackhub.wonki.FeedbackHubWonkiStudioPlugin",
        name: "FeedbackHub Wonki",
      },
    ],
  },
};
