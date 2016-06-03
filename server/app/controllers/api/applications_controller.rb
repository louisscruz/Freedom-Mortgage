class Api::ApplicationsController < ApplicationController

  def index
    @applications = Application.all

    render json: @applications
  end

  def show

  end

  def create
    @application = Application.new(application_params)

    if @application.save
      AppMailer.completed_application(@application).deliver_now
      render json: @application, status: :created
    else
      AppMailer.completed_application(@application).deliver_now
      render json: @application.errors, status: :unprocessable_entity
    end
  end

  private

  def application_params
    params.require(:application).permit(:loan_type, :loan_amount, borrower_attributes: [:first_name, :middle_name, :last_name, :birthdate, :phone, :email, :ssn, :marital_status, address_attributes: [:street_address, :city, :state, :zip]])
  end
end
