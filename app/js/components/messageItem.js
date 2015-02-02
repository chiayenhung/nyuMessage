(function () {
  define(['react'], function (React) {
    var MessageItem = React.createClass({
      render: function () {console.log(this.props)
        return (
          <li>
            <span>{this.props.message.message}</span>
            <span className='right'>{this.props.message.created}</span>
          </li>
        )
      }
    });

    return MessageItem;
  });
})();
