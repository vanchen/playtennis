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

  }
});
