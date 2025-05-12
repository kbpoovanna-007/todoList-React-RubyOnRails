require 'test_helper'

class AuthControllerTest < ActionDispatch::IntegrationTest
  test "should signup a new user" do
    assert_difference('User.count') do
      post signup_url, params: { 
        name: "New User", 
        email: "new@example.com", 
        password: "password123",
        password_confirmation: "password123" 
      }, as: :json
    end
    
    assert_response :created
    
    response_body = JSON.parse(@response.body)
    assert_not_nil response_body['token']
    assert_equal "New User", response_body['user']['name']
    assert_equal "new@example.com", response_body['user']['email']
  end

  test "should not signup with invalid data" do
    post signup_url, params: { 
      name: "Test User", 
      email: "invalid-email", 
      password: "password123",
      password_confirmation: "password123" 
    }, as: :json
    
    assert_response :unprocessable_entity
    assert_includes JSON.parse(@response.body)['errors'], "Email is invalid"
  end
  
  test "should not signup with password mismatch" do
    post signup_url, params: { 
      name: "Test User", 
      email: "valid@example.com", 
      password: "password123",
      password_confirmation: "different123" 
    }, as: :json
    
    assert_response :unprocessable_entity
    assert_includes JSON.parse(@response.body)['errors'], "Password confirmation doesn't match Password"
  end

  test "should login with valid credentials" do
    user = User.create(name: "Existing User", email: "existing@example.com", password: "password123")
    
    post login_url, params: { email: "existing@example.com", password: "password123" }, as: :json
    
    assert_response :success
    
    response_body = JSON.parse(@response.body)
    assert_not_nil response_body['token']
    assert_equal user.id, response_body['user']['id']
    assert_equal "Existing User", response_body['user']['name']
  end

  test "should not login with invalid credentials" do
    user = User.create(name: "Existing User", email: "existing@example.com", password: "password123")
    
    post login_url, params: { email: "existing@example.com", password: "wrong_password" }, as: :json
    
    assert_response :unauthorized
    assert_equal "Invalid credentials", JSON.parse(@response.body)['error']
  end
  
  test "should not login with non-existent user" do
    post login_url, params: { email: "nonexistent@example.com", password: "password123" }, as: :json
    
    assert_response :unauthorized
    assert_equal "Invalid credentials", JSON.parse(@response.body)['error']
  end

  test "should get current user info" do
    # First create and login a user
    user = User.create(name: "Current User", email: "current@example.com", password: "password123")
    post login_url, params: { email: "current@example.com", password: "password123" }, as: :json
    token = JSON.parse(@response.body)['token']
    
    # Then access the current user endpoint
    get me_url, headers: { Authorization: "Bearer #{token}" }, as: :json
    
    assert_response :success
    response_body = JSON.parse(@response.body)
    assert_equal user.id, response_body['id']
    assert_equal "Current User", response_body['name']
    assert_equal "current@example.com", response_body['email']
  end

  test "should not get user info without authentication" do
    get me_url, as: :json
    
    assert_response :unauthorized
    assert_equal "Please log in", JSON.parse(@response.body)['message']
  end
end