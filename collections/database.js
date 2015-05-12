Posts = new Meteor.Collection("posts");
Courts = new Meteor.Collection('courts');

Meteor.users.allow({
  insert : function(userId,doc) {
    return (userId && doc.owner === userId);
  },
  update: function(userId,doc,fields,modifier) {
    return doc.owner === userId
  }
});


if (Courts.find().count() === 0) {
  Courts.insert({
    Name: "Beacon Hill Courts",
    Lat: 48.411771,
    Lng: -123.359032
  });

  Courts.insert({
    Name: "Craigflower Road Courts",
    Lat: 48.436879,
    Lng: -123.387617
  });

  Courts.insert({
    Name: "Barnard Park Courts",
    Lat: 48.430223,
    Lng: -123.393581
  });

  Courts.insert({
    Name: "Quadra Street Courts",
    Lat: 48.432588,
    Lng: -123.357678
  });

  Courts.insert({
    Name: "Hollywood Park Courts",
    Lat: 48.413534,
    Lng: -123.334400
  });

  Courts.insert({
    Name: "Stadacona Courts",
    Lat: 48.426967,
    Lng: -123.339015
  });

  Courts.insert({
    Name: "Todd Park Courts",
    Lat: 48.417815,
    Lng: -123.383270
  });

  Courts.insert({
    Name: "Topaz Park Courts",
    Lat: 48.443226,
    Lng: -123.363014
  });
};
