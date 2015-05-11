Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
});

Router.route('court/:Name', function() {
  this.render('court');
  var Name = this.params.Name;
  Session.set('currentName',Name);
}, {name: 'court'});


Router.route("/", function(){
  this.render('landing');
}, {name : 'landing'});

Router.route('map', function () {
  this.render('map');
}, {name: 'host'});
