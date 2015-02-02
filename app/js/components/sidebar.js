(function () {
  define(['jquery', 'underscore', 'react', 'jsx!components/buildingList', 'jsx!components/userList', 'model/message'], function ($, _, React, BuildingList, UserList, Message) {
    var Sidebar = React.createClass({
      getInitialState: function () {
        return {
          buildings: null,
          showBuidling: null,
          users: {data:[]}
        };
      },

      componentWillMount: function () {
        this.state.buildings = this.state.showBuidling = this.props.buildings.data;
      },

      componentDidMount: function () {
        this.switchList();
      },

      parseBounds: function (enbounds) {
        var bounds = {
          'latLarge': enbounds.getNorthEast().k,
          'latSmall': enbounds.getSouthWest().k,
          'longLarge': enbounds.getNorthEast().A,
          'longSmall': enbounds.getSouthWest().A
        }
        return bounds;
      },

      switchList: function (e) {
        var value, target;
        if (e)
          value = e.target.value.toLowerCase();
        else
          value = "buildings";
        $(".sidebar_list").addClass("hidden");
        $("." + value.substring(0, value.length - 1) + "_list").removeClass("hidden");
      },

      updateBuildingList: function (map) {
        var newBuilding = this.state.buildings,
            bounds = this.parseBounds(map.getBounds());
        newBuilding = newBuilding.filter(function (building) {
          return building.inViewport(bounds);
        });
        this.setState({showBuidling: newBuilding});
      },

      updateUserList: function (users) {
        this.setState({users: users});
      },

      addMessage: function (data) {
        var user = _.find(this.state.users.data, function (user) { return user.id == data.callee;}),
            message = new Message(data);
        user.messages.data.push(message);
        this.setState({users: this.state.users});
      },

      render: function () {
        return (
          <div className="building_list_container">
            <select onChange={this.switchList}>
              <option>Buildings</option>
              <option>Users</option>
            </select>
            <BuildingList data={this.state.showBuidling}/>  
            <UserList users={this.state.users} user={this.props.user}/>        
          </div>
        )
      }
    });

    return Sidebar;
  });
})();