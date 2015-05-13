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


Template.map.events({
'click .match-enlarge': function(event) {
  var id = Session.get('match-id');
  var rendered = Blaze.render(Template.details,$('#bring')[0]);
  Session.set('matchOn',true)
  if ($('#sidebar-extensions-map').css('width') === '0px') {
    $('.hide-menu').css('visibility','hidden');
    $('#sidebar-extensions-map').css('width','60.5%');
    $('#sidebar-extension-matches').css('width','95%');
    $('#sidebar-extension-matches').css('visibility','visible');
  }
  else {
    $('#sidebar-extension-matches').css('width','0px');
    $('#sidebar-extension-matches').css('visibility','hidden');
    $('#sidebar-extensions-map').css('width','0px')
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


  Template.details.helpers( {
    exampleMapOptions2: function(){
      var match_id = Session.get('match-id');
      court = Courts.findOne({Name: Posts.findOne(match_id).court});
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(court.Lat,court.Lng),
          zoom: 12,
          styles: styles,
          disableDefaultUI: true};
      }
    }
  });


  Template.details.onRendered(function() {
    GoogleMaps.ready('exampleMap2',function(map){
        markers = [];
        maps = [map];
        //bootbox.alert("Choose a court to host your match.");

        var match_id = Session.get('match-id');
        court = Courts.findOne({Name: Posts.findOne(match_id).court});
        console.log(court)
        center = new google.maps.LatLng(court.Lat,court.Lng)
        LatLng = new google.maps.LatLng(court.Lat,court.Lng);
        var image = '/img/tennis.png';
        var marker = new google.maps.Marker({
            position: LatLng,
            map: map.instance,
            icon: image,
            title: court.Name,
          });

          google.maps.event.addListenerOnce(map.instance, 'idle', function() {
            Meteor.setTimeout(function() {
              google.maps.event.trigger(map.instance, 'resize');
              map.instance.setCenter(center);
            },500)
          });
        })
      });
