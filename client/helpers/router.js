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

Router.route('host', function () {
  this.render('add');
}, {name: 'host'});

Router.route("join", function(){
  this.render('join');
}, {name : 'join'});
