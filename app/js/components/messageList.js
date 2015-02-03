(function () {
  define(['react', 'jsx!components/messageItem'], function (React, MessageItem) {
    var MessageList = React.createClass({
      loading: false,

      componentDidUpdate: function () {
        var dom = this.getDOMNode();
        $(dom).scrollTop(dom.scrollHeight);
      },

      scrolling: function (e) {
        // var copy = this,
        //     $ul;
        // $ul = $(e.target).parents(".message_container").siblings("a");
        // console.log(this.children)
        // if ($(e.target).scrollTop() == 0 && !copy.loading) {
        //   copy.loading = true;
        //   copy.props.messages.load({caller: copy.props.user, callee: $ul.data("id")}, function (err) {
        //     copy.loading = false;
        //     copy.forceUpdate();
        //   });
        // }
      },

      render: function () {
        var copy = this;
        return (
          <ul className='messages bg-info' onWheel={this.scrolling}>
            {
              this.props.messages.data.map(function (message) {
                return <MessageItem message={message} user={copy.props.user}/>
              })
            }
          </ul>
        )
      }
    });

    return MessageList;
  });
})();