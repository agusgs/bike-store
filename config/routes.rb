Rails.application.routes.draw do
  root 'home#index'
  get 'checkout', to: 'home#index'

  resources :products, only: [:index, :create]
  resources :orders, only: [:create]

  resources :customizable_areas, only: [:index, :create]
  resources :customizations, only: [:create]
  resources :available_customizations, only: [:create]
end
