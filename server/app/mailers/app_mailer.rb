class AppMailer < ApplicationMailer
  default from: "louis@frdmmtg.com"

  def new_application(application)
    @applicant = application.borrower
    attachments.inline["freedom_mortgage.png"] = File.read("#{Rails.root}/app/assets/freedom_mortgage.png")
    attachments["#{@applicant.first_name.downcase}_#{@applicant.last_name.downcase}_application.csv"] = application.to_csv
    mail(to: "louisstephancruz@me.com", subject: "New application from #{@applicant.first_name} #{@applicant.last_name}")
  end
end
