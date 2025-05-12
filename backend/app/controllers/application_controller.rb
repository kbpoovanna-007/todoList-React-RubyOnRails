class ApplicationController < ActionController::API
    before_action :authenticate_user
  
    def encode_token(payload)
      secret = Rails.application.credentials.secret_key_base || 'my_test_secret'
      JWT.encode(payload, secret)
    end
  
    def decode_token
      auth_header = request.headers['Authorization']
      if auth_header
        token = auth_header.split(' ')[1]
        begin
          secret = Rails.application.credentials.secret_key_base || 'my_test_secret'
          JWT.decode(token, secret, true, algorithm: 'HS256')
        rescue JWT::DecodeError
          nil
        end
      end
    end
  
    def current_user
      if decode_token
        user_id = decode_token[0]['user_id']
        @current_user = User.find_by(id: user_id)
      end
    end
  
    def logged_in?
      !!current_user
    end
  
    def authenticate_user
      render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end
  end