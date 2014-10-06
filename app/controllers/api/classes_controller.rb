require "json"
require "uglifier"
require "base64"
require "net/http"
require "net/https"
require "rest-client"

class Api::ClassesController < ApplicationController

	def index
		term=params[:term]
		school=params[:school]
		subject=params[:subject]
		catalogNbr=params[:catalogNbr]
		section=params[:section]
		#get the current token
		access_token = refresh_token()

		#get textbook information
		render :json => api_call("https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + term + "/Schools/" + school + "/Subjects/" + subject + "/CatalogNbrs/" + catalogNbr + "/Sections/" + section + "/Textbooks", "Bearer " + access_token, "application/json", "GET", nil)

	end

	## get token
	def refresh_token
		# developement, test, production?
		rails_env = ENV["RAILS_ENV"]
		# format: key=KEY,secret=secret
		key_secret_array = ENV[rails_env + "_api_key_secret"].split(',')
		key_array=key_secret_array[0].split(':')
		key=key_array[1]
		secret_array=key_secret_array[1].split(':')
		secret=secret_array[1]

		encoded_string = Base64.strict_encode64 (key + ":" + secret)
		param_hash={"grant_type"=>"client_credentials","scope"=> "PRODUCTION"}
		json = api_call("https://api-km.it.umich.edu/token?grant_type=client_credentials&scope=PRODUCTION", "Basic " + encoded_string, "application/x-www-form-urlencoded", "POST", param_hash)
		return json["access_token"]
	end

	def api_call(url, authorization_string, content_type, request_type, param_hash)

		url = URI.parse(url)
		case request_type
			when "POST"
				request = Net::HTTP::Post.new(url.path)
			when "GET"
				request = Net::HTTP::Get.new(url.path)
			else
				puts "wrong request type" + request_type
		end

		request.add_field("Authorization", authorization_string)
		request.add_field("Content-Type", content_type)
		request.add_field("Accept", "application/json")


		if (!param_hash.nil?)
			# if parameter hashtable is not null, attach them to form
			request.set_form_data(param_hash)
		end

		sock = Net::HTTP.new(url.host, 443)
		sock.use_ssl=true

		store = OpenSSL::X509::Store.new
		store.add_cert(OpenSSL::X509::Certificate.new(File.read("/System/Library/OpenSSL/certs/AddTrustExternalCARoot.txt")))
		store.add_cert(OpenSSL::X509::Certificate.new(File.read("/System/Library/OpenSSL/certs/InCommonServerCA.txt")))
		sock.cert_store = store

		#sock.set_debug_output $stdout #useful to see the raw messages going over the wire
		sock.read_timeout = 10
		sock.open_timeout = 10

		sock.start do |http|
			response = http.request(request)
			return JSON.parse(response.body)
		end
	end

	def readFile(path)
		data = ""
		File.open(path, 'r') do |file|
			while line = file.gets
				# only read the first line, which is the token value
				data=line.strip
				break
			end
		end
		return data
	end
end
