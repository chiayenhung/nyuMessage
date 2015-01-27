(function () {

  define(['jquery', 'underscore', 'react', 'map', 'jsx!components/buildingList', 'model/user'], function ($, _, React, GMap, BuildingList, User) {

    function App (buildings) {
      this.buildings = buildings;
      this.user = new User();
      this.user.getDataFromDom($("[data-user]").data("user"));
      this.map = new GMap({
        buildings: this.buildings,
        user: this.user
      });
      this.map.initialize();
    }

    App.prototype.render = function () {
      this.map.generateBuildings();
      React.renderComponent(<BuildingList data={this.buildings.data}/>, document.getElementsByClassName("building_list")[0]);
    };

    return App;

  });

})();