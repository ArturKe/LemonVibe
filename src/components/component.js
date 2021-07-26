export class Component{
    constructor(target){
        this.target = document.querySelector(target)

    }

    show(){
        console.log('Show')
        this.target.classList.add('show')
    }
    hide(){
        console.log('hide')
        this.target.classList.remove('show')

    }
}