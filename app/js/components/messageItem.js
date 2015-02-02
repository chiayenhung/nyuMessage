(function () {
  define(['react', 'utils/util_date'], function (React, Util) {
    var MessageItem = React.createClass({

      render: function () {
        return (
          <li>
            <span>{this.props.message.message}</span>
            <span className='right'>{Util.timeString(this.props.message.created)}</span>
          </li>
        )
      }
    });

    return MessageItem;
  });
})();
