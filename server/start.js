Meteor.startup(function(){

  BrowserPolicy.content.allowOriginForAll('fonts.gstatic.com');
  BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
  BrowserPolicy.content.allowOriginForAll('maps.gstatic.com');
  BrowserPolicy.content.allowEval('https://ajax.googleapis.com'); 
});
