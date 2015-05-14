Template.landing.events({
  'click .login' : function() {
    Session.set('createOrSignIn','signin')
  },
  'click .register': function() {
    Session.set('createOrSignIn','create')
  },
  'submit form' : function(event) {
    event.preventDefault()
    var createOrSignIn = Session.get('createOrSignIn')
    user = {
      email: $('[id="emailAddress"]').val(),
      password: $('[id="pass"]').val(),
      profile: {}
    }

    if (createOrSignIn == "create") {
      Meteor.call('validateEmailAddress',user.email,function(error,response) {
        if (error) {
          bootbox.alert(error.reason)
        }
        else {
          if (response.error) {
            bootbox.alert(response.error)
          }
          else {
            Accounts.createUser(user,function(error){
              if (error) {
                bootbox.alert(error.reason)
              }
              else {
                  Router.go('host')
                  location.reload();
              }
            });
          }
        }
      });
    }
    else {
      Meteor.loginWithPassword(user.email,user.password,function(error) {
        if (error) {
          bootbox.alert(error.reason)
        }
        else {
            Router.go('host')
            location.reload();

        }
      });
    }
  }
});
