(function () {
  define(['jquery', 'underscore', 'react', 'jsx!components/buildingList'], function ($, _, React, BuildingList) {
    var Sidebar = React.createClass({
      getInitialState: function () {
        return {
          buildings: null,
          showBuidling: null
        };
      },

      componentWillMount: function () {//console.log(this.props.buildings.data)
        this.state.buildings = this.state.showBuidling = this.props.buildings.data;
      },

      parseBounds: function (enbounds) {
        var bounds = {
          'latLarge': enbounds.getNorthEast().k,
          'latSmall': enbounds.getSouthWest().k,
          'longLarge': enbounds.getNorthEast().A,
          'longSmall': enbounds.getSouthWest().A
        }
        return bounds;
      },

      updateBuildingList: function (map) {
        var newBuilding = this.state.buildings,
            bounds = this.parseBounds(map.getBounds());
        newBuilding = newBuilding.filter(function (building) {
          return building.inViewport(bounds);
        });
        this.setState({showBuidling: newBuilding});
      },

      render: function () {
        return (
          <div>
            <select>
              <option>Buildings</option>
              <option>Users</option>
            </select>
            <BuildingList data={this.state.showBuidling}/>          
          </div>
        )
      }
    });

    return Sidebar;
  });
})();