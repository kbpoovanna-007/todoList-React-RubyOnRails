require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  setup do
    @user = User.create(name: "Task Owner", email: "owner@example.com", password: "password123")
  end

  test "should save valid task" do
    task = @user.tasks.new(title: "Valid Task")
    assert task.save, "Could not save a valid task"
  end
  
  test "should not save task without title" do
    task = @user.tasks.new(completed: false)
    assert_not task.save, "Saved the task without a title"
  end
  
  test "should not save task without user" do
    task = Task.new(title: "Orphan Task", completed: false)
    assert_not task.save, "Saved the task without a user"
  end
  
  test "should belong to user" do
    task = Task.reflect_on_association(:user)
    assert_equal :belongs_to, task.macro
  end
  
  test "should set completed to false by default" do
    task = @user.tasks.create(title: "Default Task")
    assert_equal false, task.completed, "Task completed not defaulting to false"
  end
end
