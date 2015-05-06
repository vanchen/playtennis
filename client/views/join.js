//Defining global varibles
//

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

// Helper functions
//
Template.join.helpers({
  posts: function() {
    return Posts.find();
  },
  courts: function() {
    return Courts.find();
  }
});

Template.join.events({
  "submit form": function(event) {
    event.preventDefault();
    var postProperties = {
      title: $(event.target).find('[id=title]').val(),
      court: $(event.target).find('[id=court]').val()
    }
    Posts.insert(postProperties);
    $('.dropdown.open').removeClass('open');
    $(event.target).find('[id=title]').val('');
  },
  "mouseenter .h": function(event) {
    var court = Posts.findOne($(event.target).attr("id")).court;
    markers.forEach(function(m) {
      if (m['title'] === court) {
        m.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  },
  "click .logout": function(event) {
    event.preventDefault();
    Meteor.logout();
  },  
  "mouseleave .h": function(event) {
    markers.forEach(function(m) {
      if (m.setAnimation != null) {
        m.setAnimation(null);
      }
    });
  }
});

// Executed once the page is succesfully loaded.

Template.join.onCreated(function() {
  GoogleMaps.ready('exampleMap',function(map){
      markers = [];
      Courts.find().forEach(function(court) {
      LatLng = new google.maps.LatLng(court.Lat,court.Lng);
      var image = '/img/tennis.png';
      var marker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
          icon: image,
          title: court.Name,
        });
      markers.push(marker);
      google.maps.event.addListener(marker,'click', function() {
        Router.go('court', data={Name: court.Name});
        });
      });
    });
  });
