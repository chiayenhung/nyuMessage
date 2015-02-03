(function () {
  define(['jquery', 'underscore', 'react', 'jsx!components/messageList', 'model/message'], function ($, _, React, MessageList, Message) {
    var UserItem = React.createClass({
      loaded: false,

      click: function (e) {
        e.preventDefault();
        var copy = this,
            $btn = $(e.target);
        if ($btn.hasClass("active")) {
          $btn.removeClass("active");
          $btn.siblings(".message_container").slideUp();
        } 
        else {
          if (!this.loaded)
            this.props.item.messages.load({caller: this.props.user, callee: $btn.data("id")}, function (err) {
              copy.loaded = true;
              copy.forceUpdate();
            });
          $btn.addClass("active");
          $btn.siblings(".message_container").slideDown();
        }

      },

      submitData: function (val) {
        var formData = {
            'message': val,
            'caller': this.props.user,
            'callee': $(this.getDOMNode()).find("a.list-group-item").data("id"),
            'created': new Date()
            },
            copy = this;
        $.ajax({
          url: 'sendMessage',
          method: 'post',
          dataType: 'json',
          data: formData,
          success: function (response) {
            var message = new Message(response);
            copy.props.item.messages.data.push(message);
            copy.forceUpdate();
          },
          error: function (err) {
            console.error(err);
          },
          complete: function () {
            $(copy.getDOMNode()).find("textarea").val("");
          }
        });
      },

      keyup: function (e) {
        var val;
        if (!e.shiftKey && e.keyCode == 13) {
          val = e.target.value;
          if (val.length > 0)
            this.submitData(val);
        }
      },

      send: function (e) {
        var $btn = $(e.target),
            $container = $btn.parents(".user_container"),
            val = $container.find("textarea").val(),
            copy = this,
            formData;
        if (val.trim().length != 0) {
          copy.submitData(val);
          // formData = {
          //   'message': val,
          //   'caller': this.props.user,
          //   'callee': $container.find("a.list-group-item").data("id"),
          //   'created': new Date()
          // }
          // $.ajax({
          //   url: 'sendMessage',
          //   method: 'post',
          //   dataType: 'json',
          //   data: formData,
          //   success: function (response) {
          //     var message = new Message(response);
          //     copy.props.item.messages.data.push(message);
          //     copy.forceUpdate();
          //   },
          //   error: function (err) {
          //     console.error(err);
          //   },
          //   complete: function () {
          //     $container.find("textarea").val("");
          //   }
          // });
        }
      },

      render: function () {
        return (
          <div className='user_container'>
            <a href='#' className='list-group-item list-group-item-info clearfix' data-id={this.props.item.id} onClick={this.click}>
              <span className='left'>{this.props.item.username}</span>
              <span className='badge'>0</span>
            </a>
            <div className='message_container'>
              <MessageList messages={this.props.item.messages} user={this.props.user}/>
              <div className='input-group message_input'>
                <textarea className='form-control custom-control' row='3' onKeyUp={this.keyup}></textarea>
                <span className='btn input-group-addon' onClick={this.send}>Send</span>
              </div>
            </div>
          </div>
        )
      }
    });

    return UserItem;
  });
})();