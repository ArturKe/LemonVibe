export class Component{
    constructor(target){
        this.target = document.querySelector(target)
        this.class = target

    }

    // show(){
    //     console.log('Show component')
    //     // console.log(this.target.classList)
    //     document.querySelector(this.class).classList.add('show')
        
    // }
    // hide(){
    //     console.log('hide')
    //     this.target.classList.remove('show')

    // }
}