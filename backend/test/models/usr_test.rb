require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "should save valid user" do
    user = User.new(name: "Valid User", email: "valid@example.com", password: "password123")
    assert user.save, "Could not save a valid user"
  end
  
  test "should not save user without email" do
    user = User.new(name: "Test User", password: "password123")
    assert_not user.save, "Saved the user without an email"
  end

  test "should not save user with invalid email format" do
    user = User.new(name: "Test User", email: "invalid-email", password: "password123")
    assert_not user.save, "Saved the user with invalid email format"
  end

  test "should not save user with duplicate email" do
    User.create(name: "First User", email: "test@example.com", password: "password123")
    user = User.new(name: "Second User", email: "test@example.com", password: "password123")
    assert_not user.save, "Saved the user with duplicate email"
  end

  test "should not save user with short password" do
    user = User.new(name: "Test User", email: "test@example.com", password: "short")
    assert_not user.save, "Saved the user with a password shorter than 6 characters"
  end
  
  test "should have many tasks" do
    user = User.reflect_on_association(:tasks)
    assert_equal :has_many, user.macro
  end
end