class Api::ApplicantController < ApplicationController

  def index
    @addresses = Addresses.all

    render json: @addresses
  end
  def show

  end

  def create
    @address = Addresses.new(application_params)

    if @address.save
      render json: @address, status: :created
    else
      p @address.errors
      render json: @address.errors, status: :unprocessable_entity
    end
  end

  private

  def applicant_params
    params.require(:addresses).permit(:street_address, :city, :state, :zip)
  end
end
