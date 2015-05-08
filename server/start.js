Meteor.startup(function(){
  process.env.MAIL_URL = 'smtp://postmaster@sandbox33188ed73b224793961f575a43af8701.mailgun.org:f9abebd8d6c0db75c004fcc7db398828@smtp.mailgun.org:587';
  BrowserPolicy.content.allowOriginForAll('fonts.gstatic.com');
  BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
  BrowserPolicy.content.allowOriginForAll('maps.gstatic.com');
  BrowserPolicy.content.allowEval('https://ajax.googleapis.com');
});
