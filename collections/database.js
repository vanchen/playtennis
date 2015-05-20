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

// Vancouver Courts

  Courts.insert({
    Name: "Almond Park",
    Lat: 49.261298,
    Lng: -123.184866,
    Courts: 2,
    Rating: 5,
    Type: "Outdoor “quick-dry” surface courts"
  });
  Courts.insert({
    Name: "Andy Livingstone Park",
    Lat: 49.278710,
    Lng: -123.103944,
    Courts: 2,
    Type: "Outdoor courts without lights & painted or has tennis surfacing",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "Arbutus Park",
    Lat: 49.217267,
    Lng: -123.155006,
    Courts: 2,
    Type: "Outdoor without lights & has no tennis surfacing",
    Bathrooms: false,
    Rating: 5
  });
  Courts.insert({
    Name: "Brewers Park",
    Lat: 49.247867,
    Lng:  -123.065436,
    Courts: 2,
    Type: "Outdoor without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 2
  });
  Courts.insert({
    Name: "Burrard View Park",
    Lat: 49.291419,
    Lng:  -123.050694,
    Courts: 2,
    Type: "Outdoor “quick-dry” surface courts",
    Bathrooms: false,
    Rating: 5
  });
  Courts.insert({
    Name: "Captain Cook Park",
    Lat: 49.219950,
    Lng:  -123.036016,
    Courts: 2,
    Type: "Outdoor without lights & has no tennis surfacing",
    Bathrooms: false,
    Rating: 4
  });
  Courts.insert({
    Name: "Champlain Heights Park",
    Lat: 49.215615,
    Lng:   -123.031791,
    Courts: 4,
    Type: "Outdoor without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 4
  });
  Courts.insert({
    Name: "Charleson Park",
    Lat: 49.266659,
    Lng:   -123.119296,
    Courts: 5,
    Type: "Outdoor courts without lights & painted or has tennis surfacing",
    Bathrooms: false,
    Rating: 5
  });
  Courts.insert({
    Name: "Clark Park",
    Lat: 49.257599,
    Lng:   -123.074022,
    Courts: 2,
    Type: "Outdoor without lights & has no tennis surfacing",
    Bathrooms: false,
    Rating: 3
  });
  Courts.insert({
    Name: "David Lam Park",
    Lat: 49.272463,
    Lng: -123.124829,
    Courts: 2,
    Type: "Outdoor courts without lights & painted or has tennis surfacing",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "Eburne Park",
    Lat:49.206544,
    Lng:  -123.129357,
    Courts: 4,
    Type:  "Outdoor “quick-dry” surface courts",
    Bathrooms: false,
    Rating: 4
  });
  Courts.insert({
    Name: "Elm Park",
    Lat:49.233288,
    Lng: -123.163468,
    Courts: 2,
    Type:  "Outdoor “quick-dry” surface courts",
    Bathrooms: true,
    Rating: 4
  });
  Courts.insert({
    Name: "Garden Park",
    Lat:49.268308,
    Lng: -123.058486,
    Courts: 2,
    Type: "Outdoor courts without lights & painted or has tennis surfacing",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "Granville Loop Park",
    Lat:49.267009,
    Lng: -123.137877,
    Courts: 2,
    Type: "Outdoor courts without lights & painted or has tennis surfacing",
    Bathrooms: false,
    Rating: 4
  });
  Courts.insert({
    Name: "Granville Park",
    Lat:49.258633,
    Lng: -123.141699,
    Courts: 4,
    Type:"Outdoor without lights & has no tennis surfacing",
    Bathrooms: false,
    Rating: 4
  });
  Courts.insert({
    Name: "Grays Park",
    Lat:49.240855,
    Lng: -123.085661 ,
    Courts: 2,
    Type:"Outdoor without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 3
  });
  Courts.insert({
    Name: "Guelph Park",
    Lat:49.263978,
    Lng: -123.096333 ,
    Courts: 2,
    Type:"Outdoor without lights & has no tennis surfacing",
    Bathrooms: false,
    Rating: 5
  });
  Courts.insert({
    Name: "Hastings Community South Park",
    Lat:49.280575,
    Lng: -123.041386 ,
    Courts: 2,
    Type:"Outdoor without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 4
  });
  Courts.insert({
    Name: "Heather Park",
    Lat:49.254941,
    Lng:  -123.121714,
    Courts: 4,
    Type: "Outdoor “quick-dry” surface courts",
    Bathrooms: false,
    Rating: 5
  });
  Courts.insert({
    Name: "Humm Park",
    Lat:49.218796,
    Lng:  -123.063648,
    Courts: 4,
    Type: "Outdoor without lights & has no tennis surfacing",
    Bathrooms: false,
    Rating: 3
  });
  Courts.insert({
    Name: "Jericho Beach Park",
    Lat:49.271570,
    Lng:  -123.191372,
    Courts: 4,
    Type: "Outdoor courts without lights & painted or has tennis surfacing",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "Trout Lake Park",
    Lat:49.256716,
    Lng: -123.065623,
    Courts: 3,
    Type: "Outdoor courts without lights & painted or has tennis surfacing",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "Kaslo Park",
    Lat:49.264081,
    Lng: -123.046303,
    Courts: 2,
    Type: "Outdoor courts without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 4
  });
  Courts.insert({
    Name: "Kitsilano Park",
    Lat:49.273876,
    Lng:  -123.154532,
    Courts: 10,
    Type: "Outdoor courts without lights & painted or has tennis surfacing",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "Langara Park",
    Lat:49.220401,
    Lng:  -123.106647,
    Courts: 4,
    Type: "Outdoor courts without lights & painted or has tennis surfacing",
    Bathrooms: false,
    Rating: 5
  });
  Courts.insert({
    Name: "MacDonald Park",
    Lat:49.229889,
    Lng:  -123.099007,
    Courts: 3,
    Type: "Outdoor courts without lights & has no tennis surfacing",
    Bathrooms: false,
    Rating: 3
  });
  Courts.insert({
    Name: "McBride Park",
    Lat:49.268327,
    Lng:  -123.179530,
    Courts: 4,
    Type: "Outdoor courts without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "McSpadden Park",
    Lat:49.266196,
    Lng:  -123.066503,
    Courts: 2,
    Type: "Outdoor courts without lights & painted or has tennis surfacing",
    Bathrooms: false,
    Rating: 5
  });
  Courts.insert({
    Name: "Melbourne Park",
    Lat:49.237329,
    Lng:  -123.030072,
    Courts: 2,
    Type: "Outdoor courts without lights & painted or has tennis surfacing",
    Bathrooms: false,
    Rating: 4
  });
  Courts.insert({
    Name: "Memorial South Park",
    Lat:49.230828,
    Lng: -123.086074,
    Courts: 4,
    Type:  "Outdoor “quick-dry” surface courts",
    Bathrooms: true,
    Rating: 4
  });
  Courts.insert({
    Name: "Memorial West Park",
    Lat:49.243622,
    Lng: -123.188009,
    Courts: 6,
    Type:  "Outdoor “quick-dry” surface courts",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "Moberly Park",
    Lat:49.215491,
    Lng:  -123.086527,
    Courts: 4,
    Type: "Outdoor courts without lights & has no tennis surfacing",
    Bathrooms: false,
    Rating: 3
  });
  Courts.insert({
    Name: "New Brighton Park",
    Lat:49.280393,
    Lng:  -123.036497,
    Courts: 4,
    Type: "Outdoor courts without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 3
  });
  Courts.insert({
    Name: "Oak Park",
    Lat:49.215886,
    Lng:  -123.128621,
    Courts: 2,
    Type: "Outdoor “quick-dry” surface courts",
    Bathrooms: true,
    Rating: 4
  });
  Courts.insert({
    Name: "Pandora Park",
    Lat:49.282489,
    Lng: -123.058237,
    Courts: 4,
    Type:"Outdoor courts without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 4
  });
  Courts.insert({
    Name: "Queen Elizabeth Park",
    Lat:49.241926,
    Lng: -123.113120,
    Courts: 17,
    Type:"Outdoor courts without lights & has tennis surfacing",
    Bathrooms: true,
    Rating: 4
  });
  Courts.insert({
    Name: "Riverfront Park",
    Lat:49.205860,
    Lng: -123.050141,
    Courts: 2,
    Type:"Outdoor courts without lights & has tennis surfacing",
    Bathrooms: true,
    Rating: 4
  });
  Courts.insert({
    Name: "Robson Park",
    Lat:49.258134,
    Lng: -123.092030,
    Courts: 3,
    Type:"Outdoor courts without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 4
  });
  Courts.insert({
    Name: "Rupert Park",
    Lat:49.270830,
    Lng: -123.032899,
    Courts: 4,
    Type:"Outdoor courts without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "Slocan Park",
    Lat:49.243997,
    Lng:  -123.048368,
    Courts: 4,
    Type:"Outdoor courts without lights & has tennis surfacing",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "Stanley Park",
    Lat:49.292305,
    Lng: -123.145185,
    Courts: 17,
    Type:"Outdoor courts without lights & has tennis surfacing",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "Strathcona Park",
    Lat:49.275114,
    Lng: -123.084947,
    Courts: 4,
    Type:"Outdoor courts without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 2
  });
  Courts.insert({
    Name: "Sutcliffe Park",
    Lat:49.269323,
    Lng:  -123.134828,
    Courts: 2,
    Type:"Outdoor courts with lights & has tennis surfacing",
    Bathrooms: true,
    Rating: 5
  });
  Courts.insert({
    Name: "Tatlow Park",
    Lat:49.270386,
    Lng:  -123.169684,
    Courts: 3,
    Type:"Outdoor courts without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 3
  });
  Courts.insert({
    Name: "West Point Grey Park",
    Lat:49.266142,
    Lng: -123.205354,
    Courts: 4,
    Type:"Outdoor courts without lights & has no tennis surfacing",
    Bathrooms: true,
    Rating: 3
  });

// Victoria Courts

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
