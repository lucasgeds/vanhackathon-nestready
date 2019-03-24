class MortgagesController < ApplicationController
  before_action :set_mortgage, only: [:show]

  # GET /mortgages/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mortgage
      @mortgage = Mortgage.find(params[:id])
    end
end
