Future = Npm.require('fibers/future');

Meteor.methods(
  validateEmailAddress: (address)->
    check(address,String)

    validateEmail = new Future()

    HTTP.call("GET", "https://api.kickbox.io/v1/verify",
      params:
        email: address
        apikey: '118c952e39dc780fef8f5a972f686afcc20479120714f6b1ade67e2e7ed946a6'
    ,(error,response)->
      if error
        validateEmail.return(error)
      else
        if response.data.result == "invalid" or response.data.result == "unknown"
          validateEmail.return(
            error: "Sorry, your email was returned as invalid. Please try another address."
          )
        else
          validateEmail.return(true)
    )

    validateEmail.wait()
)
