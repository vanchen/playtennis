Template.add.helpers( {
  exampleMapOptions: function(){
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(48.4222,-123.3657),
        zoom: 12,
        disableDefaultUI: true};
    }
  }
});


Template.add.onCreated(function() {
  GoogleMaps.ready('exampleMap',function(map){
      markers = [];
      Courts.find().forEach(function(court) {
      LatLng = new google.maps.LatLng(court.Lat,court.Lng);
      var image = '/img/tennis.png';

      var form_string = '<form role="form">'+
      '<div class="form-group">'+
      '<label for="email">Email address:</label>'+
      '<input type="email" class="form-control" id="email">'+
      '</div>'+
      '</form>';

      var infowindow = new google.maps.InfoWindow({
        content: form_string
      });
      var marker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
          icon: image,
          title: court.Name
        });
      markers.push(marker);
      google.maps.event.addListener(marker,'click', function() {
        infowindow.open(map,marker);
        });
      });
    });
  });
