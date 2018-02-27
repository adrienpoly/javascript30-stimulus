Rails.application.routes.draw do
  root 'pages#home'
  get "examples/css_variable" => "examples#css_variable"
  get "examples/video_player" => "examples#video_player"
  get "examples/drum_kit" => "examples#drum_kit"
  get "examples/local_tapas" => "examples#local_tapas"
  get "examples/type_head" => "examples#type_head"
end
