(function () {
  define(['react', 'utils/util_date'], function (React, Util) {
    var MessageItem = React.createClass({

      render: function () {
        var self = this.props.message.caller == this.props.user,
            messageClass = self ? 'right' : '',
            createdClass = self ? 'hidden': 'right created';
        return (
          <li className='clearfix'>
            <span className={messageClass}>{this.props.message.message}</span>
            <span className={createdClass}>{Util.timeString(this.props.message.created)}</span>
          </li>
        )
      }
    });

    return MessageItem;
  });
})();
