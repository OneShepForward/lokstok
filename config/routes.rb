Rails.application.routes.draw do
  get 'sessions/create'
  get 'sessions/destroy'
  resources :jobs
  resources :items
  resources :clients
  resources :employees
  resources :parts
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get "/signup", to: "employees#create"
  get "/me", to: "employees#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/create_items_jobs", to: "items#create_items_jobs"

  get "*path",
    to: "fallback#index",
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
