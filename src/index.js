import {Component} from './components/component'
import { Render } from './components/RenderComponent'
import { Menu } from './components/Menu'
import './styles/style.css'

console.log('Hello')
const menu = new Menu('.menu')
const render = new Render('.game_body__middle')

menu.registerComponent(render)
render.registerComponent(menu)

// a.hide()

// bb.start()
// setTimeout(bb.repeatI.bind(bb,true), 3000)
// setTimeout(bb.repeatI.bind(bb,false), 6000)

// bb.pauseGame()
// bb.repeatI()
// bb.pauseGame()
// bb.startGame()

// bb.restartGame()

// setTimeout(bb.continueGame.bind(bb), 2000)

// setTimeout(bb.pauseGame.bind(bb), 5000)
// setTimeout(bb.continueGame.bind(bb), 8000)
// setTimeout(bb.pauseGame.bind(bb), 10000)


// setTimeout(bb.restartGame.bind(bb), 13000)
