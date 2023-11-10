import { Button } from "discourse/views/post-menu";

export default {
  name: "hide-posts",

  initialize: function (container) {
    var PostMenuView = container.lookupFactory("view:post-menu");

    PostMenuView.reopen({
      rerenderTriggers: ["post.temporarily_hidden"],

      buttonForHide: function (post, buffer) {
        // Check if the current user is an admin
        if (this.get("currentUser.isAdmin")) {
          var direction = !!post.getWithDefault("temporarily_hidden", false) ? "down" : "up";
          return new Button("hide", direction, "chevron-" + direction);
        } else {
          return null; // Return null if the user is not an admin
        }
      },

      clickHide: function () {
        // Check if the current user is an admin
        if (this.get("currentUser.isAdmin")) {
          // Toggle the visibility of the post content
          $("#post_" + this.get("post.post_number") + " .cooked").toggle();
          
          // Toggle the 'temporarily_hidden' property of the post
          this.toggleProperty("post.temporarily_hidden");
        } else {
          // If the user is not an admin, you can display a message or perform other actions.
          console.log("Only admins can hide or show posts.");
        }
      }
    });
  }
};
