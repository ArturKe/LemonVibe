import { Render } from './components/RenderComponent'
import { Menu } from './components/Menu'
import './styles/style.css'

console.log('Hello')
const menu = new Menu('.menu')
const render = new Render('.game_body__middle')

menu.registerComponent(render)
render.registerComponent(menu)


