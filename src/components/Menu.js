import { Component } from "./component"

export class  Menu extends Component{
    constructor(target){
        super(target)
        
        this.renderComponent
        // this.btn = target.querySelector('.menu__button')
        this.btn = document.querySelector('.menu__button')
       
        this.wasClicked = false
        this.start ="START"
        this.pause = "CONTINUE"
        this.restart = "RESTART"
        this.init()
        this.bindEvents()


    }
    init(){
        if(!this.wasClicked){
            document.querySelector('.menu__button').innerHTML = this.start
        } else {
            document.querySelector('.menu__button').innerHTML= this.pause
            this.addButton(this.restart)
        }
    }

    bindEvents(){
        // this.btn.addEventListener('click',this.clickEvent.bind(this))
        document.querySelector('.menu__button').addEventListener('click',this.clickEvent.bind(this))
        document.querySelector(this.class).addEventListener('click',this.targetEvent.bind(this))

    }

    clickEvent(){
        console.log('------------------------------MenuButton')
        this.hide()
       
    }

    targetEvent(e){
        if (e.target.innerText === this.restart){
            this.renderComponent.restartGame()
            this.hide()
        }

    }


    registerComponent(component){
        this.renderComponent = component
    }

    startGame(){
        if(this.renderComponent){
            this.renderComponent.restartGame()
            this.wasClicked = true
        }
    }

    continueGame(){
        if(this.renderComponent){
            this.renderComponent.continueGame()
            
        }
    }
    addButton(name){
        const elem = document.querySelector(this.class)
        if(elem.children.length < 2){
            elem.innerHTML +=`<button class="menu__button">${name}</button>`
        }
        
    }

    hide(){
        console.log('hide')
        document.querySelector(this.class).classList.remove('show')
        if(!this.wasClicked){
            this.startGame()
        } else {
            this.continueGame()
        }
        

    }

    show(){
        console.log('Show component' + this.wasClicked)
        this.init()
        // console.log(this.target.classList)
        document.querySelector(this.class).classList.add('show')
        this.bindEvents()
       
        
    }

}