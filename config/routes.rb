Rails.application.routes.draw do
  root 'home#index'
  get 'checkout', to: 'home#index'

  get 'customizable_areas/index'
  post 'orders/create'

  resources :products, only: [:index, :create]
end
