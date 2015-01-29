(function () {
  define(['jquery', 'underscore', 'react'], function ($, _, React) {
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

      render: function () {
        return (
          <div>
            <a href='#' className='list-group-item list-group-item-info clearfix' data-id={this.props.item._id} onClick={this.click}>
              <span className='left'>{this.props.item.username}</span>
              <span className='badge'>0</span>
            </a>
            <div className='message_container'>
              <div className='messages bg-info'></div>
              <div className='input-group message_input'>
                <textarea className='form-control custom-control' row='3'></textarea>
                <span className='btn input-group-addon'>Send</span>
              </div>
            </div>
          </div>
        )
      }
    });

    return UserItem;
  });
})();