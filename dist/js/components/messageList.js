(function () {
  define(['react', 'jsx!components/messageItem'], function (React, MessageItem) {
    var MessageList = React.createClass({
      componentDidUpdate: function () {
        var dom = this.getDOMNode();
        $(dom).scrollTop(dom.scrollHeight);
      },

      render: function () {
        return (
          <ul className='messages bg-info'>
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