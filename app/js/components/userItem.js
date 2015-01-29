(function () {
  define(['jquery', 'underscore', 'react'], function ($, _, React) {
    var UserItem = React.createClass({
      render: function () {
        return (
          <a href='#' className='list-group-item list-group-item-info clearfix' data-id={this.props.item._id}>
            <span className='left'>{this.props.item.username}</span>
            <span className='badge'>0</span>
          </a>
        )
      }
    });

    return UserItem;
  });
})();