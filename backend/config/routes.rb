# config/routes.rb
Rails.application.routes.draw do
  # Task routes
  resources :tasks
  
  # Auth routes
  post '/signup', to: 'auth#signup'
  post '/login', to: 'auth#login'
  get '/me', to: 'auth#me'
end