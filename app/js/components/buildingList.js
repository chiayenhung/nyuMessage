(function () {
  define(['jquery', 'underscore', 'react', 'jsx!components/buildingItem'], function ($, _, React, BuildingItem) {

    var BuildingList = React.createClass({
      
      getInitialState: function () {
        return {building: null};
      },

      componentWillMount: function () {
        this.state.building = this.props.data;
      },

      updateBuildingList: function (map) {
        console.log(map);
      },

      render: function () {
        return (
          <div>
            {
              this.state.building.map(function (item) {
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