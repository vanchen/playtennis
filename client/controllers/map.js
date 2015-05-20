/////////////
// Globals //
/////////////

maps = [];
markers = [];
new_markers = [];
styles = [
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

///////////////
// Functions //
///////////////



////////////
// Events //
////////////

Template.map.events({

  // Map Menu Events //
  'click .gps' : function(event) {
    var pos = Geolocation.latLng();
    var google_pos = new google.maps.LatLng(pos.lat,pos.lng);
    maps[0].instance.setCenter(google_pos);
  },
  'click .host' : function(event) {
    Session.set('toggle',true);
    for (var i =0; i < new_markers.length ; i++) {
      new_markers[i].setMap(null)

    }
    for (var i=0; i < markers.length ; i++) {
      markers[i].setMap(maps[0].instance)

    }
  },
  'click .join' : function(event) {
    Session.set('toggle',false);
    for (var i=0; i < markers.length ; i++) {
      Posts.find().forEach(function(post) {

        if (post.court === markers[i].title) {
          new_markers.push(markers[i])
        }
        else {
          markers[i].setMap(null)
        }
      });
    }
    for (var i=0; i < new_markers.length; i++) {
      new_markers[i].setMap(maps[0].instance)
    }
  },

//Map Sidebar Events//

  'click .profile-list' : function(event) {
    Session.set('sidebar',true)
    Session.set('courtTrue',false)
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
    Session.set('courtTrue',false);
    Meteor.setTimeout(function () {
      if ($('#sidebar-extension').css('width') === '0px') {
        $('#sidebar-extension').css('width','550px');
        $('#match-listings').css('visibility','visible')
      }
      else {
        Session.set('sidebar',true)
        maps[0].instance.setCenter(new google.maps.LatLng(Geolocation.latLng().lat,Geolocation.latLng().lng))
        maps[0].instance.setZoom(12);
        $('#sidebar-extension').css('width','0px')
        $('#match-listings').css('visibility','hidden');
      }
    },2);
  },
  'click .logout' : function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/')
  },

// Match Listings Events //

  'mouseenter .matches': function(event) {
    var id = $(event.target).attr("id");
    Session.set('match-id',id);
    //Session.set('mapOn',true);
  },
  'click .match-enlarge': function(event) {
    var pos = new google.maps.LatLng(Geolocation.latLng().lat,Geolocation.latLng().lng);
    var id = Session.get('match-id');
    //var id2 = $(event.target.parentNode).attr("id");
    //Session.set('match-id',id2)
    Session.set('matchOn',true)
    if ($('#sidebar-extensions-map').css('visibility') === 'hidden') {
      $('.hide-menu').css('visibility','hidden');
      $('#sidebar-extensions-map').animate({opacity:1},'fast',function(){
        $('#sidebar-extensions-map').css('visibility','visible');
      })
      $('#sidebar-extension-matches').css('width','95%');
      $('#sidebar-extension-matches').css('visibility','visible');
      var court = Courts.findOne({Name: Posts.findOne(id).court});
      var LatLng = new google.maps.LatLng(court.Lat,court.Lng);
      markers2[0].setPosition(LatLng);
      markers2[0].setTitle(court.Name);
      markers2[0].setMap(maps2[0].instance)
      maps2[0].instance.setCenter(LatLng);
      var request = {
        origin: pos,
        destination : LatLng,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          directionsDisplay.setPanel(document.getElementById('googledirections'));
     }
   });

    }
    else {
      $('#sidebar-extension-matches').css('width','0px');
      $('#sidebar-extension-matches').css('visibility','hidden');
      $('#sidebar-extensions-map').animate({opacity:0},'fast',function(){
        $('#sidebar-extensions-map').css('visibility','hidden');
      })
      $('.hide-menu').css('visibility','visible');
      Session.set('matchOn',false)

    }
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
},

});

///////////
//Helpers//
///////////

Template.map.helpers( {
  exampleMapOptions: function(){
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(Geolocation.latLng().lat,Geolocation.latLng().lng),
        zoom: 13,
        styles: styles,
        disableDefaultUI: true};
    }
  },
  'user' : function() {
    return Meteor.user();
  },
  courts: function() {
    return Courts.find();
  },
  'sideBar' : function() {
    return Session.get('sidebar')
  },
  'match' : function() {
    return Posts.findOne(Session.get('match-id'));
  },
  'matchOn' : function() {
    return Session.get('matchOn');
  },
});


Template.registerHelper('exampleMapOptions2',function(){
    var match_id = Session.get('match-id');
    court = Courts.findOne({Name: Posts.findOne(match_id).court});
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(court.Lat,court.Lng),
        zoom: 15,
        styles: styles,
        disableDefaultUI: true};
    }
  });


///////////////////
// Map Functions //
///////////////////

Template.map_details.onCreated(function() {
    GoogleMaps.ready('exampleMap2',function(map2){
      markers2 = [];
      //directionDisplay;
      maps2 = [map2];
      directionsDisplay = new google.maps.DirectionsRenderer();
      directionsService = new google.maps.DirectionsService();
      var match_id = Session.get('match-id');
      var court = Courts.findOne({Name: Posts.findOne(match_id).court});
      var center = new google.maps.LatLng(court.Lat,court.Lng)
      var LatLng = new google.maps.LatLng(court.Lat,court.Lng);
      var image = '/img/tennis.png';
      var marker = new google.maps.Marker({
          position: LatLng,
          map: map2.instance,
          icon: image,
          title: court.Name,
        });
        markers2.push(marker);

        directionsDisplay.setMap(map2.instance);

      })
    });

Template.map.onRendered(function() {
  Session.set('toggle',true)
  GoogleMaps.ready('exampleMap',function(map){
      markers = [];
      var pos = Geolocation.latLng();
      var google_pos = new google.maps.LatLng(pos.lat,pos.lng);

      var marker = new google.maps.Marker({
          position: google_pos,
          map: map.instance,
          animation: google.maps.Animation.DROP,
          icon: '/img/blue_dot.png',
        });
      maps[0]=map;
      //bootbox.alert("Choose a court to host your match.");
      Courts.find().forEach(function(court) {
      var LatLng = new google.maps.LatLng(court.Lat,court.Lng);
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
        if (Session.get('toggle')) {
          info.setContent(form_string);
          info.open(map.instance,marker);
        }
        else {
            Session.set('sidebar',false)
            Meteor.setTimeout(function () {
              if ($('#sidebar-extension').css('width') === '0px') {
                map.instance.setCenter(LatLng)
                map.instance.panBy(-40, 0)
                map.instance.setZoom(15);
                Session.set('courtName',marker.title)
                Session.set('courtTrue',true);
                $('#sidebar-extension').css('width','550px');
                $('#match-listings').css('visibility','visible')
              }
              else {
                Session.set('sidebar',true)
                map.instance.setCenter(new google.maps.LatLng(Geolocation.latLng().lat,Geolocation.latLng().lng))
                map.instance.setZoom(12);
                Session.set('courtTrue',false);
                $('#sidebar-extension').css('width','0px')
                $('#match-listings').css('visibility','hidden');
              }
            },2);
          }
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
