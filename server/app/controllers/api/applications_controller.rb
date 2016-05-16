class Api::ApplicationsController < ApplicationController
  wrap_parameters format: [:json]

  def index
    @applications = Application.all

    render json: @applications
  end
  def show

  end

  def create
    @application = Application.new(application_params)

    if @application.save
      render json: @application, status: :created
    else
      render json: @application.errors, status: :unprocessable_entity
    end
  end

  private

    def application_params
      params.permit(:borrowerGroup, :coborrowerGroup, :loanGroup, :employmentGroup, :assetsGroup, :declarationsGroup, :opportunityGroup)
    end
end
