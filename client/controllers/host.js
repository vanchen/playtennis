if (Meteor.isClient) {
  Session.setDefault('username', 'Username');
  Session.setDefault('firstname', 'First Name');
  Session.setDefault('lastname', 'Last Name');
}

// Editable Profile Helpers

Template.add.rendered = function(){
  $.fn.editable.defaults.mode = 'inline';
  $('#textUser.editable').editable({
    placement: "auto top",
      success: function(response, newValue) {
        console.log('set new value to ' + newValue);
        Session.set('username', newValue);
    }});
  $('#textLast.editable').editable({
    placement: "auto top",
        success: function(response, newValue) {
          console.log('set new value to ' + newValue);
          Session.set('lastname', newValue);
        }});
  $('#textFirst.editable').editable({
    placement: "auto top",
      success: function(response, newValue) {
        console.log('set new value to ' + newValue);
        Session.set('firstname', newValue);
      }});

  $('#gender.editable').editable({
    value:1,
    source: [
      {value:1, text: 'Male'},
      {value:2,text:'Female'}
    ]
  });

  $('#skill.editable').editable({
    value:1,
    source: [
      {value:1, text: '2.0'},
      {value:2,text:'2.5'},
      {value:3,text:'3.0'},
      {value:4,text:'3.5'},
      {value:5,text:'4.0'},
      {value:6,text:'4.5'}
    ]
  });
}


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
      $('#sidebar-extension').css('width','400px');
      $('#profile-interface').css('visibility','visible');
    }
    else {
      $('#sidebar-extension').css('width','0px')
      $('#profile-interface').css('visibility','hidden');
    }
  },
});

// Helper Functions

Template.add.helpers( {
  exampleMapOptions: function(){
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(Geolocation.latLng().lat,Geolocation.latLng().lng),
        zoom: 12,
        disableDefaultUI: true};
    }
  },
  'username': function () {
    return Session.get('username');
  },
  'firstname' : function() {
    return Session.get('firstname');
  },
  'lastname' : function() {
    return Session.get('lastname');
  }
});

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
