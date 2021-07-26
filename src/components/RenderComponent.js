import { Component } from "./component";

export class Render extends Component{
    constructor(target){
        super(target)
        
        this.counterInit = 0;
        this.counterLose = 0;
        this.gameStart = false;
        // this.state = true
        // this.timer
        this.width = 300;
        
    }
    
    start(){

        console.log('Starting')
       
        

        let spawnTimer = setInterval(()=>{
            window.requestAnimationFrame(this.initDraw.bind(this))
            // console.log(spawnTimer)

            // if(!this.gameStart){
            //     console.log("Stop Spawn Lemons gameStrat is: " + this.gameStart )
            //     clearInterval(spawnTimer) 
            // }

        }, 1200)

        let initTimer = setInterval(()=>{
            window.requestAnimationFrame(this.updateCoordinate.bind(this))
            
            if(!this.gameStart){
                console.log("Stop Update Coordinate gameStrat is: " + this.gameStart )
                clearInterval(initTimer)
                clearInterval(spawnTimer) 
                
            }

        }, 20)

    }

    cleanScreen(){
        document.querySelector('.game_body__main').innerHTML =''
        console.log('Clean Screen')
   
    }

    bodyStyle(state){
        if(state){
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        
    }



    updateCoordinate(){
        
        document.querySelectorAll('.lemon').forEach(item =>{
            let curentTop = item.style.top
            let curentX = +item.style.left.slice(0,-2)
            let curentRotate = +item.style.transform.slice(7,-4)
            // console.log(curentRotate)

            let curentY = +curentTop.slice(0,-2)
            curentY+= 1
            curentRotate +=1
            item.style.top = `${curentY}px`
            item.style.transform = `rotate(${curentRotate}deg)`

            
            // console.log(curentY)
            
            if(curentY>260){
                let basket = document.querySelector('.basket')
                let curentPosBasket = +basket.style.left.slice(0,-2)
                if(curentX >= curentPosBasket && curentX <= curentPosBasket+60) {
                    this.counterInit++
                    this.counterUpdate(this.counterInit)
                    document.querySelector('.game_body__main').removeChild(item)

                }// -Проверка с позицией корзины


                if(curentY>300){
                    document.querySelector('.game_body__main').removeChild(item)
                    this.counterLose++
                    console.log("Loose "+ this.counterLose)
                }
                
                
            } //Проверка по координате Y 
            
        })

        // let b = new Date().getTime()
        // console.log(b + "ms")

    }

    counterUpdate(count){
        document.querySelector('.game_body__counter').innerHTML=`Lemons: ${count}`
    }

    

    initDraw(){
        
        // this.counterInit++ //общее количество сгенерированных лемонов
        let randomLeft = Math.floor(Math.random()*(250-1)+1)
        let randomRotate = Math.floor(Math.random()*(360-1)+1)
        document.querySelector('.game_body__main').innerHTML += `<div class="lemon" data="${this.counterInit}" style="left:${randomLeft}px; top: 0px; transform: rotate(${randomRotate}deg)"></div>`
        console.log("Spawn Lemon")
       
        // const allLemons = document.querySelectorAll('.lemon')
        // if(allLemons.length > 5){
        //     document.querySelector('.game_body__main').removeChild(allLemons[0])
        // } //-Проверка по количеству блоков
        
    }

    initBasket(){
        document.querySelector('.game_body__middle').innerHTML += `<div class="basket" data="basket" style="left:100px; bottom: 40px"></div>`
        this.basketBindEvents()
        this.basketBindTouchEvents()
    }

    deleteBasket(){
     
        let basket = document.querySelector('.basket')
        if(basket){
            document.querySelector('.game_body__middle').removeChild(basket)
        }
       
    }
    basketBindEvents(){
        let basketTouch = false
        let dataMouse = {
            startX: 0,
            startOffsetX: 0,
            curentPosX: 0
        }
        
        let basket = document.querySelector('.basket')
        
        basket.addEventListener('mousedown', (e)=>{
            basketTouch = true
            dataMouse.startX = e.clientX
            dataMouse.startOffsetX = e.layerX
            dataMouse.curentPosX  = +basket.style.left.slice(0,-2)
            // this.basketMove(basketTouch)
            this.bodyStyle(true)
        })
        basket.addEventListener('mouseup', ()=>{
            basketTouch = false
            // this.basketMove(basketTouch)
            this.bodyStyle(false)
        })

        // basket.addEventListener('mouseover', ()=>{
        //     basketTouch = false
        //     // this.basketMove(basketTouch)
        // })

        basket.addEventListener('mousemove',(e)=>{
            if(basketTouch){
                this.basketMove(false,dataMouse,e)
            }
            

        })


    }

    basketBindTouchEvents(){
        let basketTouch = false
        let dataTouch = {
            startX: 0,
            startOffsetX: 0,
            curentPosX: 0
        }
        
        let basket = document.querySelector('.basket')
        
        basket.addEventListener('touchstart', (e)=>{
            
            basketTouch = true
            dataTouch.startX = Math.floor(e.touches[0].clientX)
            console.log(dataTouch.startX)
            dataTouch.startOffsetX = 10
            dataTouch.curentPosX  = +basket.style.left.slice(0,-2)
            this.bodyStyle(true)
        })
        basket.addEventListener('touchend', ()=>{
            basketTouch = false 
            this.bodyStyle(false)
        })


        basket.addEventListener('touchmove',(e)=>{
            if(basketTouch){
                this.basketMove(true,dataTouch,e)
                
            }
            

        })


    }

    basketMove(touch,startPos,ev){
        
        let basket = document.querySelector('.basket')

        let touchCurentPos 

        if(touch){
           touchCurentPos  = Math.floor(ev.touches[0].clientX)
        //    console.log('Touchhh')
        } 
        
        if(!touch){
            touchCurentPos = ev.clientX
            // console.log('Mouse')

        }
     
        
        let calcBasketPosition = startPos.curentPosX + touchCurentPos-startPos.startX

        if(calcBasketPosition < 0){
            calcBasketPosition = 0
        } else if (calcBasketPosition > 240){
            calcBasketPosition = 240
        }


        // console.log(startPos.curentPosX + ev.clientX-startPos.startX )
        basket.style.left = `${calcBasketPosition}px`
        
       

    }


    continueGame(){
        this.gameStart = true
        this.counterUpdate(this.counterInit)
       
        this.start()
        console.log('Continue Game ' + this.gameStart)
        

    }

    pauseGame(){
        console.log('Pause ' + this.gameStart)
        this.gameStart = false
        
        console.log('Pause ' + this.gameStart)
        // console.log('Mean ' + mean)
        
        
        // setInterval(this.repeatI, 100)
        // this.repeatI()  
        
    }

    restartGame(){
        this.deleteBasket()
        this.cleanScreen()
        this.gameStart = true
        this.counterInit = 0
        this.counterUpdate(this.counterInit)
        this.initDraw()
        this.initBasket()
        this.start()
        console.log('Restart Game')
    }

    


}

function repeat(){

    console.log("Hoope")


}