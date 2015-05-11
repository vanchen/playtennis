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
