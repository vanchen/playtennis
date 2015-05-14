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



Template.map.events({
'click .match-enlarge': function(event) {
  var pos = new google.maps.LatLng(Geolocation.latLng().lat,Geolocation.latLng().lng);
  var id = Session.get('match-id');
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
    markers[0].setPosition(LatLng);
    markers[0].setTitle(court.Name);
    markers[0].setMap(maps2[0].instance)
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
}
});

Template.matches.helpers({
  'matchOn' : function() {
    return Session.get('matchOn');
  },
  'user' : function() {
    var id = Session.get('match-id');
    return Meteor.users.findOne({'username' : Posts.findOne(id).author});

  }
});


  Template.details.onCreated(function() {
      GoogleMaps.ready('exampleMap2',function(map2){
        markers = [];
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
          markers.push(marker);

          directionsDisplay.setMap(map2.instance);

        })
      });
