(function () {
  define(['jquery', 'underscore', 'react', 'jsx!components/messageList', 'model/message'], function ($, _, React, MessageList, Message) {
    var UserItem = React.createClass({

      click: function (e) {
        e.preventDefault();
        var $btn = $(e.target);
        if ($btn.hasClass("active")) {
          $btn.removeClass("active");
          $btn.siblings(".message_container").slideUp();
        } 
        else {
          $btn.addClass("active");
          $btn.siblings(".message_container").slideDown();
        }

      },

      send: function (e) {
        var $btn = $(e.target),
            $container = $btn.parents(".user_container"),
            val = $container.find("textarea").val(),
            copy = this,
            formData;
        if (val.trim().length != 0) {
          formData = {
            'message': val,
            'caller': this.props.user,
            'callee': $container.find("a.list-group-item").data("id"),
            'created': new Date()
          }
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
              $container.find("textarea").val("");
            }
          });
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
              <MessageList messages={this.props.item.messages} />
              <div className='input-group message_input'>
                <textarea className='form-control custom-control' row='3'></textarea>
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