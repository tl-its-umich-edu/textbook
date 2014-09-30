# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)

use Rack::Static,
    urls: ["/views", "/images", "/scripts", "/styles", "/bower_components"],
    index: 'index.html',
    root: "public"

run Rails.application
