# app/controllers/auth_controller.rb
class AuthController < ApplicationController
    skip_before_action :authenticate_user, only: [:login, :signup]
  
    # POST /signup
    def signup
      user = User.new(user_params)
      
      if user.save
        token = encode_token({ user_id: user.id })
        render json: { token: token, user: { id: user.id, name: user.name, email: user.email } }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # POST /login
    def login
      user = User.find_by(email: params[:email])
      
      if user && user.authenticate(params[:password])
        token = encode_token({ user_id: user.id })
        render json: { token: token, user: { id: user.id, name: user.name, email: user.email } }
      else
        render json: { error: 'Invalid credentials' }, status: :unauthorized
      end
    end
  
    # GET /me - Returns current user info
    def me
      render json: @current_user
    end
  
    private
  
    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
  end