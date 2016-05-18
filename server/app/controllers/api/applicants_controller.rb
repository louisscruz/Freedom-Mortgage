class Api::ApplicantController < ApplicationController

  def index
    @applicants = Application.all

    render json: @applicants
  end
  def show

  end

  def create
    @applicant = Application.new(application_params)

    if @applicant.save
      render json: @applicant, status: :created
    else
      p @applicant.errors
      render json: @applicant.errors, status: :unprocessable_entity
    end
  end

  private

  def applicant_params
    params.require(:applicant).permit(:first_name, :middle_name, :last_name, :birthdate, :phone, :email, :ssn, :marital_status, address_attributes: [:street_address, :city, :state, :zip])
  end
end
