import { Button } from "discourse/views/post-menu";
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  api.modifyClass("view:post-menu", {
    rerenderTriggers: ["post.temporarily_hidden"],

    buttonForHide: function (post, buffer) {
      var direction = !!post.getWithDefault("temporarily_hidden", false)
        ? "down"
        : "up";
      return new Button("hide", direction, "chevron-" + direction);
    },

    clickHide: function () {
      $("#post_" + this.get("post.post_number") + " .cooked").toggle();
      this.toggleProperty("post.temporarily_hidden");
    },

    // add a new method to check the user's role
    isAdmin: function () {
      // get the current user object from the API
      const currentUser = api.getCurrentUser();
      // check if the user is an admin
      return currentUser && currentUser.admin;
    },

    // override the default method to render the buttons
    render: function (buffer) {
      // call the original render method
      this._super(buffer);
      // get the post object
      const post = this.get("post");
      // check if the user is an admin and the post is not deleted
      if (this.isAdmin() && !post.deleted) {
        // render the hide button
        this.attach("buttonForHide", buffer, post);
      }
    },
  });
});
