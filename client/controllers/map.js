//Setting the style for Google Maps

var markers = [];
var styles = [
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 100
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#C6E2FF"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#C5E3BF"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#D1D1B8"
              }
          ]
      }
];


// Events //

Template.map.events({

  // Map Menu Events //
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
  'click .logout' : function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/')
  },

  //Map Sidebar Events//
  'click .profile-list' : function(event) {
    Session.set('sidebar',true)
    Meteor.setTimeout(function (){
        if ($('#sidebar-extension').css('width') === '0px') {
          $('#sidebar-extension').css('width','1200px');
          $('#profile-interface').css('visibility','visible');
        }
        else {
          Session.set('sidebar',false)
          $('#sidebar-extension').css('width','0px')
          $('#profile-interface').css('visibility','hidden');
        }
      },2);
  },
  'click .map-list' : function(event) {
    Session.set('sidebar',false)
    Meteor.setTimeout(function () {
      if ($('#sidebar-extension').css('width') === '0px') {
        $('#sidebar-extension').css('width','500px');
        $('#match-listings').css('visibility','visible')
      }
      else {
        Session.set('sidebar',true)
        $('#sidebar-extension').css('width','0px')
        $('#match-listings').css('visibility','hidden');
      }
    },2);
  },

  // Match Listings Events //
  "click .match-avatar" : function(event) {
    bootbox.dialog({
      title: "User Profile",
      message:
      '<div class="row">'+
      '<div class="col-md-12 col-xs-10">'+
      '<div class="well panel panel-default">'+
      '<div class="panel-body">'+
      '<div class="row">'+
      '<div class="col-xs-12 col-sm-4 text-center">'+
      '<img src="http://api.randomuser.me/portraits/women/21.jpg" alt="" class="center-block img-circle img-thumbnail img-responsive">'+
      '<ul class="list-inline ratings text-center" title="Ratings">'+
      '<li><a href="#"><span class="fa fa-star fa-lg"></span></a></li>'+
      '<li><a href="#"><span class="fa fa-star fa-lg"></span></a></li>'+
      '<li><a href="#"><span class="fa fa-star fa-lg"></span></a></li>'+
      '<li><a href="#"><span class="fa fa-star fa-lg"></span></a></li>'+
      '<li><a href="#"><span class="fa fa-star fa-lg"></span></a></li>'+
      '</ul>'+
      '</div>'+
      '<!--/col--> '+
      '<div class="col-xs-12 col-sm-8">'+
      '<h2>Jane Doe</h2>'+
      '<p class="t"><strong> About: </strong> Web Designer / UI Expert. </p>'+
      '<p><strong>Hobbies: </strong> Read, out with friends, listen to music, draw and learn new things. </p>'+
      '<p><strong>Skills: </strong>'+
      '<span class="label label-info tags">html5</span> '+
      '<span class="label label-info tags">css3</span>'+
      '<span class="label label-info tags">jquery</span>'+
      '<span class="label label-info tags">bootstrap3</span>'+
      '</p>'+
      '</div>'+
      '</div>'+
      '<!--/row-->'+
      '</div>'+
      '<!--/panel-body-->'+
      '</div>'+
      '<!--/panel-->'+
      '</div>'+
      '<!--/col--> '+
      '</div>'+
      '<!--/row--> '+
      '</div>'
    });
  },
  'mouseenter .matches': function(event) {
    var court = Posts.findOne($(event.target).attr("id")).court;
    markers.forEach(function(m) {
      if (m['title'] === court) {
        m.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  },
  "mouseleave .matches": function(event) {
    markers.forEach(function(m) {
      if (m.setAnimation != null) {
        m.setAnimation(null);
      }
    });
  },

  // Profile Events //
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
  },
  posts: function() {
    return Posts.find();
  },
  courts: function() {
    return Courts.find();
  },
  'sideBar' : function() {
    return Session.get('sidebar')
  }
});

Template.map.helpers( {
  exampleMapOptions: function(){
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(Geolocation.latLng().lat,Geolocation.latLng().lng),
        zoom: 12,
        styles: styles,
        disableDefaultUI: true};
    }
  }});

Template.map.onCreated(function() {
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
              time: $(event.target).find('[id=time]').val(),
              author: Meteor.user().username
            }
            Posts.insert(postProperties);
            info.close();
          });
        });

      google.maps.event.addListener(info, "closeclick", function() {

      });

      });
    });
  });
