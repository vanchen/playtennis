//////////////
// Helpers //
/////////////

Template.matches.helpers({
  'matchOn' : function() {
    return Session.get('matchOn');
  },
  'user' : function() {
    var id = Session.get('match-id');
    return Meteor.users.findOne({'username' : Posts.findOne(id).author});
  },
  'post' : function() {
    return Posts.find({'court' : Session.get('courtName')});
  },
  'postName' : function() {
    return Posts.findOne({'court' : Session.get('courtName')})
  },
  'courtTrue' : function() {
    return Session.get('courtTrue');
  },
  posts: function() {
    var courts = [];
    var pos = Geolocation.latLng();
    var R = 6371000;
    // Use Trig to find the distance from user's position.
    Posts.find().forEach(function(post) {
      court = Courts.findOne({'Name' : post.court});
      var x = (pos.lng-court.Lng) * Math.cos((pos.lat+court.Lat)/2);
      var y = (pos.lat-court.Lat);
      var d = Math.sqrt(x*x + y*y) * R;
      courts.push({
        'id' : post._id,
        'Distance' : d
      });
    });
    // Sort the array by smallest value of d.
    do {
      var counter = 0;
      for (var i=0; i < (courts.length -1) ; i++) {
        if (courts[i]['Distance'] > courts[i+1]['Distance']) {
          var swap = courts[i];
          courts[i] = courts[i+1];
          courts[i+1] = swap;
          counter += 1;
        }
      }
    } while(counter > 0);
    var posts = [];
    for (var i = 0; i < courts.length; i++) {
      posts[i] = Posts.findOne(courts[i]['id']);
      posts[i].distance = (courts[i]['Distance']/1000);
    }
    return posts;
  }
});
