(function () {
  define(['jquery', 'underscore', 'react', 'jsx!components/buildingItem'], function ($, _, React, BuildingItem) {

    var BuildingList = React.createClass({
    
      render: function () {
        return (
          <div>
            {
              this.props.data.map(function (item) {
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