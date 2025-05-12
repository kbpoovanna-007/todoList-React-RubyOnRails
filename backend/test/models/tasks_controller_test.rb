require 'test_helper'

class TasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create(name: "Task User", email: "task_user@example.com", password: "password123")
    post login_url, params: { email: "task_user@example.com", password: "password123" }, as: :json
    @token = JSON.parse(@response.body)['token']
    
    # Create some tasks for the user
    @task1 = @user.tasks.create(title: "Task 1", completed: false)
    @task2 = @user.tasks.create(title: "Task 2", completed: true)
    
    # Create another user with their own tasks
    @other_user = User.create(name: "Other User", email: "other@example.com", password: "password123")
    @other_task = @other_user.tasks.create(title: "Other Task", completed: false)
  end

  test "should get index of user's tasks only" do
    get tasks_url, headers: { Authorization: "Bearer #{@token}" }, as: :json
    
    assert_response :success
    
    tasks = JSON.parse(@response.body)
    assert_equal 2, tasks.length
    assert_equal @task1.id, tasks[0]['id']
    assert_equal @task2.id, tasks[1]['id']
    
    # Verify we don't see other user's tasks
    task_ids = tasks.map { |t| t['id'] }
    assert_not_includes task_ids, @other_task.id
  end

  test "should create task" do
    assert_difference('Task.count') do
      post tasks_url, 
           params: { task: { title: "New Task" } }, 
           headers: { Authorization: "Bearer #{@token}" }, 
           as: :json
    end

    assert_response :created
    
    task = JSON.parse(@response.body)
    assert_equal "New Task", task['title']
    assert_equal false, task['completed']
    assert_equal @user.id, Task.find(task['id']).user_id
  end
  
  test "should not create task with invalid data" do
    assert_no_difference('Task.count') do
      post tasks_url, 
           params: { task: { title: "" } }, 
           headers: { Authorization: "Bearer #{@token}" }, 
           as: :json
    end

    assert_response :unprocessable_entity
  end

  test "should show task" do
    get task_url(@task1), headers: { Authorization: "Bearer #{@token}" }, as: :json
    
    assert_response :success
    
    task = JSON.parse(@response.body)
    assert_equal @task1.id, task['id']
  end
  
  test "should not show other user's task" do
    get task_url(@other_task), headers: { Authorization: "Bearer #{@token}" }, as: :json
    
    assert_response :not_found
  end

  test "should update task" do
    patch task_url(@task1), 
          params: { task: { title: "Updated Task", completed: true } }, 
          headers: { Authorization: "Bearer #{@token}" }, 
          as: :json
    
    assert_response :success
    
    @task1.reload
    assert_equal "Updated Task", @task1.title
    assert_equal true, @task1.completed
  end
  
  test "should not update task with invalid data" do
    original_title = @task1.title
    
    patch task_url(@task1), 
          params: { task: { title: "" } }, 
          headers: { Authorization: "Bearer #{@token}" }, 
          as: :json
    
    assert_response :unprocessable_entity
    
    @task1.reload
    assert_equal original_title, @task1.title
  end
  
  test "should not update other user's task" do
    patch task_url(@other_task), 
          params: { task: { title: "Should Not Update" } }, 
          headers: { Authorization: "Bearer #{@token}" }, 
          as: :json
    
    assert_response :not_found
    
    @other_task.reload
    assert_equal "Other Task", @other_task.title
  end

  test "should destroy task" do
    assert_difference('Task.count', -1) do
      delete task_url(@task1), headers: { Authorization: "Bearer #{@token}" }, as: :json
    end

    assert_response :no_content
    assert_raises(ActiveRecord::RecordNotFound) { @task1.reload }
  end
  
  test "should not destroy other user's task" do
    assert_no_difference('Task.count') do
      delete task_url(@other_task), headers: { Authorization: "Bearer #{@token}" }, as: :json
    end

    assert_response :not_found
    assert_nothing_raised { @other_task.reload }
  end
  
  test "should require authentication for all actions" do
    # Index
    get tasks_url, as: :json
    assert_response :unauthorized
    
    # Show
    get task_url(@task1), as: :json
    assert_response :unauthorized
    
    # Create
    post tasks_url, params: { task: { title: "Unauthorized Task" } }, as: :json
    assert_response :unauthorized
    
    # Update
    patch task_url(@task1), params: { task: { title: "Unauthorized Update" } }, as: :json
    assert_response :unauthorized
    
    # Destroy
    delete task_url(@task1), as: :json
    assert_response :unauthorized
  end
end