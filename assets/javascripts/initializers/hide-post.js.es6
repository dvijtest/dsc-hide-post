import { Button } from "discourse/views/post-menu";

export default {
  name: "hide-posts",

  initialize: function (container) {
    var PostMenuView = container.lookupFactory("view:post-menu");

    PostMenuView.reopen({
      shouldRerenderHideButton: Discourse.View.renderIfChanged("post.hidden"),

      buttonForHide: function (post, buffer) {
        var direction = !!post.getWithDefault("hidden", false) ? "down" : "up";
        return new Button("hide", direction, "chevron-" + direction);
      },

      clickHide: function () {
        $("#post_" + this.get("post.post_number") + " .cooked").toggle();
        this.toggleProperty("post.hidden");
      }
    });

  }
};