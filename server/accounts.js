Accounts.onCreateUser(function(options,user) {
    userData = {
      'email' : user.emails[0].address,
      'name' : (options.profile) ? options.profile.name : ""
    }
    if (userData.email != null) {
      Meteor.call('sendWelcomeEmail',userData,function(error) {
        if (error) {
          console.log(error);
        }
      });
    }
    user.owner = user._id;
    if (options.profile) {
      user.profile = options.profile
    }
  return user;
});

Meteor.methods({
  'sendWelcomeEmail': function(userData) {
    check(userData,{email:String,name:String})

    SSR.compileTemplate('welcomeEmail',Assets.getText('welcome-email.html'));

    emailTemplate = SSR.render('welcomeEmail',{
      'email' : userData.email,
      'name': (userData.name !== "") ? userData.name : null,
      'url' : 'http://localhost:3000'
    });

    Email.send({
      'to' : userData.email,
      'from' : "Play Tennis Now - Demo <demo@playtennis.com>",
      'subject' : "Time to play now.",
      'html' : emailTemplate
    })
  }
});
