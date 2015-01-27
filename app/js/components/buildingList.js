(function () {
  define(['jquery', 'underscore', 'react', 'jsx!components/buildingItem'], function ($, _, React, BuildingItem) {

    var BuildingList = React.createClass({
      
      getInitialState: function () {
        return {
          building: null,
          showBuidling: null
        };
      },

      componentWillMount: function () {
        this.state.building = this.state.showBuidling = this.props.data;
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
        var newBuilding = this.state.building,
            bounds = this.parseBounds(map.getBounds());
        newBuilding = newBuilding.filter(function (building) {
          return building.inViewport(bounds);
        });
        this.setState({showBuidling: newBuilding});
      },

      render: function () {
        return (
          <div>
            {
              this.state.showBuidling.map(function (item) {
                return <BuildingItem item={item}/>
              })
            }
          </div>
        )
      }
    })

    return BuildingList;
  });
})();