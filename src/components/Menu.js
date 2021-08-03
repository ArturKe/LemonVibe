export class  Menu {
    constructor(target){ 
        this.class = target
        this.renderComponent
        this.btn = document.querySelector('.menu__button')
        this.wasClicked = false
        this.start ="START"
        this.pause = "CONTINUE"
        this.restart = "RESTART"

        this.show("start")

    }

    init(btns){ // Отрисовка кнопок из переданного массива
        document.querySelector(this.class).innerHTML =''
        btns.forEach(item => {
            this.addButton(item)   
        });
        
    }

    addButton(name){
        document.querySelector(this.class).innerHTML +=`<button class="menu__button">${name}</button>`

    }

    bindEvents(){
        document.querySelector(this.class).addEventListener('click',this.targetEvent.bind(this))

    }

    targetEvent(e){
        if (e.target.innerText === this.restart){
            this.renderComponent.restartGame()
            this.hide()
        } else
        if (e.target.innerText === this.start){
            this.hide()
        } else
        if (e.target.innerText === this.pause){
            this.hide()
            this.renderComponent.continueGame()
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
    

    hide(){
        // console.log('hide')
        document.querySelector(this.class).classList.remove('show')
        if(!this.wasClicked){
            this.startGame()
        } else {
            this.continueGame()
        }
        

    }

    show(state){ // В зависимости от стейта отрисовывает меню с разным количеством кнопок
        switch(state){
            case 'start' : this.init([this.start]);
            break;
     
            case 'pause' : this.init([this.pause, this.restart]);
            break;
    
            case 'stop' : this.init([this.restart]);
            break;
        }   
        
        console.log('Show component' + this.wasClicked)
        
        // console.log(this.target.classList)
        document.querySelector(this.class).classList.add('show')
        this.bindEvents()
    }
    

}