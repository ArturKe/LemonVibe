export class Render {
    constructor(target,width = 300, height = 300){
        this.class = target
        this.counterInit = 0;
        this.counterLose = 0;
        this.gameStart = false;
        this.width = width;
        this.heigt = height;
        this.menuComponent;
        this.heartsCount = 5;
        this.menuActive = false;
        this.middleElem;
        this.func;
        this.spawnInterval = 1200;
        this.updateCoordinateinteval = 20;
        this.spawnTimer;
        this.updateTimer;

        this.start();
        
        
    }

    bindMenuEvents(){
        // console.log('Biiiiiind')
        this.middleElem = document.querySelector('.game_body__pause')
        this.func = this.menuEvent.bind(this)
        this.middleElem.addEventListener('click', this.func)
    }

    menuEvent(e){ // Нажатие на кнопку меню
       
            if(!e.target.classList.contains('basket')){
                if(!this.menuActive){
                    this.menuActive = true
                    this.pauseGame()
                    this.menuComponent.show("pause")
                    // this.middleElem.removeEventListener('click', this.func)
                    // console.log('Mennuuu Calll')

                }

           }

    }
    
    start(){ // Инициализация счетчиков генерации лемоново и смещения их координат

        console.log('Starting')
        let funcSpawn = this.initDraw.bind(this)
        let funcUpdate = this.updateCoordinate.bind(this)


        this.spawnTimer = setInterval(()=>{
            if(this.gameStart){
                window.requestAnimationFrame(funcSpawn)
            }
            
        }, this.spawnInterval)

        this.updateTimer = setInterval(()=>{
            if(this.gameStart){
                window.requestAnimationFrame(funcUpdate)  
                
            }

        }, this.updateCoordinateinteval)

    }

    cleanScreen(){
        document.querySelector('.game_body__main').innerHTML =''
        console.log('Clean Screen')
   
    } // Очистка главного экрана

    bodyStyle(state){
        if(state){
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        
    }



    updateCoordinate(){ // Обновление координат всех лимонов
        
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
            
            if(curentY > this.heigt-40){
                let basket = document.querySelector('.basket')
                let curentPosBasket = +basket.style.left.slice(0,-2)
                if(curentX >= curentPosBasket-20 && curentX <= curentPosBasket+50) {
                    this.counterInit++
                    this.counterUpdate(this.counterInit)
                    this.basketChangeColor()
                    document.querySelector('.game_body__main').removeChild(item)

                }// -Проверка с позицией корзины


                if(curentY > this.heigt){
                    document.querySelector('.game_body__main').removeChild(item)
                    this.counterLose++
                    this.heartsCount--
                    this.updateHearts()

                    if(this.heartsCount === 0){
                        this.stopGame()
                    }
                    
                    // console.log("Loose "+ this.counterLose)
                }
                
            } //Проверка по координате Y 
            
        })

    }

    counterUpdate(count){
        document.querySelector('.game_body__counter').innerHTML=`Lemons: ${count}`
    } // Обновление значения счетчика пойманных лемонов

    

    initDraw(){ // Добавляет один лемон 
        
        // this.counterInit++ //общее количество сгенерированных лемонов
        let randomLeft = Math.floor(Math.random()*(250-1)+1)
        let randomRotate = Math.floor(Math.random()*(360-1)+1)
        document.querySelector('.game_body__main').innerHTML += `<div class="lemon" data="${this.counterInit}" style="left:${randomLeft}px; top: 0px; transform: rotate(${randomRotate}deg)"></div>`
        // console.log("Spawn Lemon")
       
        // const allLemons = document.querySelectorAll('.lemon')
        // if(allLemons.length > 5){
        //     document.querySelector('.game_body__main').removeChild(allLemons[0])
        // } //-Проверка по количеству блоков
        
    }

    drawHeart(){
        document.querySelector('.game_body__hearts').innerHTML += `<div class="heart" data="heart"></div>`
    }

    initDrawHearts(){
        document.querySelector('.game_body__hearts').innerHTML =''
        for(let i=0; i < this.heartsCount; i++){
            this.drawHeart()
        }
    }

    updateHearts(){
        const allHearts = document.querySelectorAll('.heart')
        if(allHearts.length > this.heartsCount) {
            document.querySelector('.game_body__hearts').removeChild(allHearts[0])
        }

    }


    initBasket(){
        document.querySelector('.game_body__middle').innerHTML += `<div class="basket black" data="basket" style="left:120px; bottom: 40px"></div>`
        this.basketBindEvents()
        this.basketBindTouchEvents()
        this.basketChangeColor()
    }
    basketChangeColor(){
        document.querySelector('.basket').classList.remove('black')
        document.querySelector('.basket').classList.add('red')
        setTimeout(()=>{
            document.querySelector('.basket').classList.remove('red')
            document.querySelector('.basket').classList.add('black')
        }, 150)

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
            this.bodyStyle(true)
        })
        basket.addEventListener('mouseup', ()=>{
            basketTouch = false
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

    basketBindTouchEvents(){ // Привязка событий Touch
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
                e.preventDefault()
                this.basketMove(true,dataTouch,e)
                
            }
            

        })


    }

    basketMove(touch,startPos,ev){
        
        let basket = document.querySelector('.basket')

        let touchCurentPos 

        if(touch){
           touchCurentPos  = Math.floor(ev.touches[0].clientX)
        } 
        
        if(!touch){
            touchCurentPos = ev.clientX
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

    stopGame(){
        this.gameStart = false
        this.deleteBasket()
        this.cleanScreen()
        this.menuActive = true
        this.menuComponent.show("stop")
    }


    continueGame(){
        this.gameStart = true
        this.menuActive = false
                   
        this.counterUpdate(this.counterInit)
       
        // this.start()
        console.log('Continue Game ' + this.gameStart)
        setTimeout(this.bindMenuEvents.bind(this), 0.5)
        

    }

    pauseGame(){
        console.log('Pause ' + this.gameStart)
        this.gameStart = false
       
        console.log('Pause ' + this.gameStart)
    }

    restartGame(){
        
        this.deleteBasket()
        this.cleanScreen()
        this.menuActive = false
        this.gameStart = true
        this.counterInit = 0
        this.heartsCount = 5
        this.counterUpdate(this.counterInit)
        this.initDrawHearts()
        this.initDraw()
        this.initBasket()
        // this.start()
        console.log('Restart Game')
        setTimeout(this.bindMenuEvents.bind(this), 0.5)
        // this.bindMenuEvents()
    }

    registerComponent(component){
        this.menuComponent = component
    }

    


}
