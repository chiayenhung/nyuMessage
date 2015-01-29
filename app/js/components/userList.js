(function () {
  define(['jquery', 'underscore', 'react', 'jsx!components/userItem'], function ($, _, React, UserItem) {
    var UserList = React.createClass({
      render: function () {
        var copy = this;
        return (
          <div className="sidebar_list user_list list-group">
            {
              this.props.data.map(function (item) {
                if (item.id != copy.props.user.id)
                  return <UserItem item={item}/>
              })
            }
          </div>
        )
      }
    });

    return UserList;
  });
})();