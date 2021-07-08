require "functions_framework"
require "json"

# This function receives an HTTP request of type Rack::Request
# and interprets the body as JSON. It prints the contents of
# the "message" field, or "Hello World!" if there isn't one.
FunctionsFramework.http "create_selfie" do |request|
  input = JSON.parse request.body.read rescue {}
  msg = input["message"].to_s
  msg.empty? ? "Hello World!" : msg
end
