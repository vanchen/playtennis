var markers = [];

Template.home.helpers( {
  exampleMapOptions: function(){
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(48.4222,-123.3657),
        zoom: 13 };
    }
  },
  posts: function() {
    return Posts.find();
  },
  courts: function() {
    return Courts.find();
  }
});

Template.home.events({
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
  "mouseleave .h": function(event) {
    markers.forEach(function(m) {
      if (m.setAnimation != null) {
        m.setAnimation(null);
      }
    });
  }
});

Template.home.onCreated(function() {
  GoogleMaps.ready('exampleMap',function(map){
      markers = [];
      Courts.find().forEach(function(court) {
      LatLng = new google.maps.LatLng(court.Lat,court.Lng);
      var image = '/img/icon_tennis.png';
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
