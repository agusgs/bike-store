Rails.application.routes.draw do
  root 'home#index'
  get 'checkout', to: 'home#index'
  get 'admin', to: 'admin#index'
  get 'admin/orders/:id', to: 'admin#index'
  get 'admin/products', to: 'admin#index'
  get 'admin/products/create', to: 'admin#index'
  get 'admin/products/update/:id', to: 'admin#index'

  resources :products, only: [:index, :create, :show, :update]
  resources :orders, only: [:create, :index, :show, :update]

  resources :customizable_areas, only: [:index, :create]
  resources :customizations, only: [:create, :update]
  resources :available_customizations, only: [:create]
end
