(function () {

  define(['jquery', 'underscore', 'react', 'map', 'jsx!components/buildingList'], function ($, _, React, GMap, BuildingList) {

    function App (buildings) {
      this.buildings = buildings;
      this.map = new GMap(buildings);
      this.map.initialize();
      // console.log(this.buildings);
    }

    App.prototype.render = function () {
      React.renderComponent(<BuildingList data={this.buildings.data}/>, document.getElementsByClassName("building_list")[0]);
    };

    return App;

  });

})();