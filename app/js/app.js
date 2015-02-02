(function () {

  define(['jquery', 'underscore', 'react', 'map', 'chat', 'jsx!components/sidebar', 'model/user'], function ($, _, React, GMap, Chat, Sidebar, User) {

    function App (buildings) {
      this.buildings = buildings;
      this.user = new User();
      this.user.getDataFromDom($("[data-user]").data("user"));
      this.map = new GMap({
        buildings: this.buildings,
        user: this.user
      });
      this.map.initialize();

      this.chat = new Chat({
        user: this.user
      });
      this.chat.initialize();
    }

    App.prototype.render = function () {
      this.map.generateBuildings();
      this.sidebar = React.renderComponent(<Sidebar buildings={this.buildings} users={[]} user={this.user}/>, document.getElementsByClassName("sidebar")[0]);
      this.setHandlers();
    };

    App.prototype.setHandlers = function () {
      var copy = this;
      copy.map.on("updateBuildingList", function (map) {
        copy.sidebar.updateBuildingList(map);
      });

      copy.chat.on("updateUserList", function (users) {
        copy.sidebar.updateUserList(users);
      }).on("chatting", function (data) {
        console.log(data);
        copy.sidebar.addMessage(data);
      });
    };

    return App;

  });

})();