(function () {
  define(['react', 'jsx!components/messageItem'], function (React, MessageItem) {
    var MessageList = React.createClass({
      render: function () {
        return (
          <ul>
            {
              this.props.messages.data.map(function (message) {
                return <MessageItem message={message} />
              })
            }
          </ul>
        )
      }
    });

    return MessageList;
  });
})();