Rails.application.routes.draw do
  root 'home#index'
  get 'checkout', to: 'home#index'
  get 'products/index'
  get 'customizable_areas/index'
  post 'orders/create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
