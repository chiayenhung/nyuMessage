(function () {
  define(['jquery', 'underscore', 'react', 'components/buildingItem'], function ($, _, React, BuildingItem) {

    var BuildingList = React.createClass({
      
      getInitialState: function () {
        return {building: null};
      },

      render: function () {
        return (
          <ui>
            {
              this.props.data.map(function (item) {
                return <BuildingItem item=item>
              })
            }
          <ui>
        )
      }
    })

    return BuildingList;
  });
})();