require "json"
require "uglifier"
class Api::ClassesController < ApplicationController
  def index
    file = File.join(Rails.root, 'app', 'controllers', 'api', 'classes.json')
    json_data = File.read(file)
	render :json => json_data
  end
end
