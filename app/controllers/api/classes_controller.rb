require "json"
require "uglifier"
require "base64"
require "net/http"
require "net/https"
require "rest-client"

class Api::ClassesController < ApplicationController

	# path for two cert files
	$caRootFilePath =""
	$inCommonFilePath =""

	def index

		term=params[:term]
		uid=params[:uid]

		# get the environment variables
		# developement, test, production?
		rails_env = ENV["RAILS_ENV"]
		# format: key=KEY,secret=secret
		env_array = ENV[rails_env + "_api_key_secret"].split(',')
		key_array=env_array[0].split('=')
		key=key_array[1]
		secret_array=env_array[1].split('=')
		secret=secret_array[1]
		url_array=env_array[2].split('=')
		url=url_array[1]
		token_url_array=env_array[3].split('=')
		token_url=token_url_array[1]
		caRootFilePath_array=env_array[4].split('=')
		$caRootFilePath=caRootFilePath_array[1]
		inCommonFilePath_array=env_array[5].split('=')
		$inCommonFilePath=inCommonFilePath_array[1]

		#get the current token
		access_token = refresh_token(key, secret, token_url)

		#get course textbook information
		call_url = url + "/StudentRecords/v1/Students/" + uid + "/Terms/" + term + "/Textbooks";

		json_textbooks = api_call(call_url, "Bearer " + access_token, "application/json", "GET", nil)
		render :json => json_textbooks

	end

	## get token
	def refresh_token(key, secret, url)
		encoded_string = Base64.strict_encode64 (key + ":" + secret)
		param_hash={"grant_type"=>"client_credentials","scope"=> "PRODUCTION"}
		json = api_call(url + "/token?grant_type=client_credentials&scope=PRODUCTION", "Basic " + encoded_string, "application/x-www-form-urlencoded", "POST", param_hash)
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

		sock = Net::HTTP.new(url.host, url.port)
		sock.use_ssl=true

		store = OpenSSL::X509::Store.new
		store.add_cert(OpenSSL::X509::Certificate.new(File.read($caRootFilePath)))
		store.add_cert(OpenSSL::X509::Certificate.new(File.read($inCommonFilePath)))
		sock.cert_store = store

		#sock.set_debug_output $stdout #useful to see the raw messages going over the wire
		sock.read_timeout = 10
		sock.open_timeout = 10

		sock.start do |http|
			response = http.request(request)
			return JSON.parse(response.body)
		end
	end
end
