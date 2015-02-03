(function () {
  define(['react', 'jsx!components/messageItem'], function (React, MessageItem) {
    var MessageList = React.createClass({
      loading: false,

      componentDidUpdate: function () {
        var dom = this.getDOMNode();
        $(dom).scrollTop(dom.scrollHeight);
      },

      scrolling: function (e) {
        var copy = this,
            $ul;
        $link = $(this.getDOMNode().parentNode.previousSibling);
        if (!copy.loading && $(e.target).scrollTop() == 0) {
          copy.load(true);
          copy.props.messages.load({caller: copy.props.user, callee: $link.data("id")}, function (err) {
            copy.load(false);
            if (!err)
              copy.forceUpdate();
          });
        }
      },

      load: function (loading) {
        this.loading = !!loading;
        if (this.loading)
          $(this.getDOMNode()).find('img').removeClass('hidden');
        else {
          $(this.getDOMNode()).find('img').addClass('hidden');
        }
      },

      render: function () {
        var copy = this;
        return (
          <ul className='messages bg-info' onScroll={this.scrolling}>
            <li className='loader'>
              <img className='hidden' src='images/ajax-loader.gif'/>
            </li>
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