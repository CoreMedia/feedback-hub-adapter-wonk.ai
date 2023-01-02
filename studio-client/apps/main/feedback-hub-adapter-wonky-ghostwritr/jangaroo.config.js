const { jangarooConfig } = require("@jangaroo/core");

module.exports = {
  type: "code",
  sencha: {
    name: "com.coremedia.labs.plugins__studio-client.feedback-hub-adapter-wonky-ghostwritr",
    namespace: "com.coremedia.labs.plugins.feedbackhub.wonky",
    studioPlugins: [
      {
        mainClass: "com.coremedia.labs.plugins.feedbackhub.wonky.FeedbackHubWonkyGhostwritrStudioPlugin",
        name: "FeedbackHub Wonky GhostwritR",
      },
    ],
  },
};
