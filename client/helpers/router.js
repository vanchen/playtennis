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
  this.render('home');
}, {name : 'home'});