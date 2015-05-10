
// Events

Template.add.events({
  'click .gps' : function(event) {
    var pos = Geolocation.latLng();
    var google_pos = new google.maps.LatLng(pos.lat,pos.lng);

    var marker = new google.maps.Marker({
        position: google_pos,
        map: maps[0].instance,
        icon: '/img/blue_dot.png',
      });
      maps[0].instance.setCenter(google_pos);
  },
  'click .map-list' : function(event) {
    if ($('#sidebar-extension').css('width') === '0px') {
      $('#sidebar-extension').css('width','1200px');
      $('#profile-interface').css('visibility','visible');
    }
    else {
      $('#sidebar-extension').css('width','0px')
      $('#profile-interface').css('visibility','hidden');
    }
  },
  'click .logout' : function(event) {
    event.preventDefault();
    Meteor.logout();
  }
});


Template.navbar.events( {
'click .profile-submit' : function(event) {
  event.preventDefault();
  Meteor.users.update({_id:Meteor.user()._id},{$set : {'profile.firstName' : $('#firstName').val()}})
  Meteor.users.update({_id:Meteor.user()._id},{$set : {'username' : $('#username').val() }})
  Meteor.users.update({_id:Meteor.user()._id},{$set : {'profile.lastName' :$('#lastName').val() }})
  Meteor.users.update({_id:Meteor.user()._id},{$set : {'profile.gender' : $('#user_gender').val() }})
  Meteor.users.update({_id:Meteor.user()._id},{$set : {'profile.skill' : $('#user_skill').val() }})
  $('#profile-interface').css('visibility','hidden');
  $('#sidebar-extension').css('width','0px')

},

'click .profile-cancel' : function() {
  $('#sidebar-extension').css('width','0px')
  $('#profile-interface').css('visibility','hidden');
  }
});

//Helpers

Template.navbar.helpers( {
  'user' : function() {
    return Meteor.user();
  }
})

Template.add.helpers( {
  exampleMapOptions: function(){
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(Geolocation.latLng().lat,Geolocation.latLng().lng),
        zoom: 12,
        disableDefaultUI: true};
    }
  }});

Template.add.onCreated(function() {
  GoogleMaps.ready('exampleMap',function(map){
      markers = [];
      maps = [map];
      //bootbox.alert("Choose a court to host your match.");
      Courts.find().forEach(function(court) {
      LatLng = new google.maps.LatLng(court.Lat,court.Lng);
      var image = '/img/tennis.png';
      var form_string = '<h5>' + court.Name + '</h5>'+
      '<p> Fill out the details below to host a match. </p>' +
      '<form role="form">'+
      '<div class="form-group">'+
      '<label  for="title">Title:</label>'+
      '<input type="text" class="form-control" id="title" placeholder="Enter a title">'+
      '</div>'+
      '<label  for="type">Match Details:</label>'+
      '<div class="form-group">'+
      '<input class="form-control" value="" id="court" type="text" placeholder="" disabled></div>'+
      '<div class="form-group">'+
      '<select class="form-control" id="type" placeholder="Choose match type">'+
      '<option>2.0</option>'+
      '<option>2.5</option>'+
      '<option>3.0</option>'+
      '<option>3.5</option>'+
      '<option>4.0</option>'+
      '</select>'+
      '</div>'+
      '<div class="input-group clockpicker form-group" data-autoclose="true">'+
      '<input type="text" class="form-control" id="time" value="Choose time">'+
      '<span class="input-group-addon">'+
      '<span class="glyphicon glyphicon-time"></span></span>'+
      '</div>'+
      '<div class="form-group">'+
      '<button type="submit" class="btn btn-primary"> Submit </button>'+
      '</form>';

      var info = new google.maps.InfoWindow(),
        marker,form_string;
      var marker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
          icon: image,
          title: court.Name,
          infowindow: info
        });
      markers.push(marker);

      //Add info window to markers

      google.maps.event.addListener(marker,'click', function() {
          info.setContent(form_string);
          info.open(map.instance,marker);
        });

      // Add jquery to info windom DOM

      google.maps.event.addListener(info,'domready',function() {
          $('.clockpicker').clockpicker();
          $('#court').attr('placeholder',court.Name)
          $('#court').attr('value',court.Name)
          $(document).one("submit",function(event) {
            event.preventDefault();
            var postProperties = {
              title: $(event.target).find('[id=title]').val(),
              type: $(event.target).find('[id=type]').val(),
              court: $(event.target).find('[id=court]').val(),
              time: $(event.target).find('[id=time]').val()
            }
            Posts.insert(postProperties);
          });
        });

      });
    });
  });
