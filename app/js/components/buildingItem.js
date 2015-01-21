(function () {
  define(['jquery', 'underscore', 'react'], function ($, _, React) {

    var BuildingItem = React.createClass({

      render: function () {
        return (
          <a href='#' className='list-group-item list-group-item-info clearfix' data-id="{this.props.item._id}">
            <span class='left'>{this.props.item.building_name}</span>
            <span class='badge'>{this.props.item.posts.length}</span>
          </a>
        )
      }
    });
    return BuildingItem;
  });

})();