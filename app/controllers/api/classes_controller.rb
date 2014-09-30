require "json"
require "uglifier"
class Api::ThingsController < ApplicationController
  def index
    @things = %w(stuff other foo)
    file = File.join(Rails.root, 'app', 'controllers', 'api', 'classes.json')
    json_data = File.read(file)
	render :json => json_data
  end
end
