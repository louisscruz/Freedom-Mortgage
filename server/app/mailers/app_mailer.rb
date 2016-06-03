class AppMailer < ApplicationMailer
  default from: "louis@frdmmtg.com"

  def new_application(application)
    mail(to: "louisstephancruz@me.com", subject: 'New Application')
  end
end
