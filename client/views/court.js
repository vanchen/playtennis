Template.court.helpers({
  name: function(){
    return Session.get('currentName');
    }
});

Template.court.helpers({
  exampleMapOptions: function(){
    var court = Courts.findOne({Name:Session.get('currentName')});
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(court.Lat,court.Lng),
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };
    }
  }
});
