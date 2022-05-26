const yourShip = document.querySelector('.player-shooter')
const playArea = document.querySelector('#main-play-area')
const monsterImg = ['src/imgs/playArea/monsterAirplane.png', 'src/imgs/playArea/monsterAirplane2.png']
const instructionsText = document.querySelector('.game-instructions')
const startButton = document.querySelector('.start')
const scoreText = document.getElementById('score')
const selectShip = document.getElementById('selectShip')

const laserSound = document.getElementById('laserSound')
const explosionSound = document.getElementById('explosionSound')
const backgroundSound = document.getElementById('backgroundSound')
const gameOverSound = document.getElementById('gameOverSound')

let score = 0
let monsterInterval;
let moveMonsterInterval;
let choseShip = ''

//Movimento e tiro da nave
function flyShip(event){
    if(event.key === 'ArrowUp') {
        event.preventDefault()
        moveUp()
    } else if (event.key === 'ArrowDown'){
        event.preventDefault()
        moveDown()
    } else if(event.key === ' '){
        event.preventDefault()
        fireLaser()
    }
}

//função de subir
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top') //traz o valor do css como string
    
    if(topPosition === '70px'){
        return
    } else {
        let position = parseInt(topPosition)
        position -= 20
        yourShip.style.top = `${position}px`
    } 
    
}

// função de ir para baixo
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top') //traz o valor do css como string
    if(topPosition === '530px'){
        return
    } else {
        let position = parseInt(topPosition)
        position += 20
        yourShip.style.top = `${position}px`
    } 
    
}


//funcionalidade de tiro 
function fireLaser(){
    laserSound.play()
    let laser = createLaserElement()
    playArea.appendChild(laser)
    moveLaser(laser)
    
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'))
    
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'))
    let newLaser = document.createElement('img')
    newLaser.src = 'src/imgs/playArea/laser.png'
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition}px`
    newLaser.style.top = `${yPosition - 45}px`
    return newLaser
}

function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left)
        let monsters = document.querySelectorAll('.monster')
       
        monsters.forEach((monster) => { //comparando se cada alien foi atingido, se sim, troca o src da img
            if(checkLaserCollision(laser, monster)){
                laser.remove()
                explosionSound.play()

                if(monster.getAttribute('src') === 'src/imgs/playArea/monsterAirplane.png'){
                    score += 15
                } else {
                    score += 25
                }


                monster.src = 'src/imgs/playArea/explosion.png'
                monster.classList.remove('monster')
                monster.classList.add('dead-monster')

                
                scoreText.innerHTML = `${score}`
            }
        });
        
        if(xPosition === 660) {
            laser.remove()
        } else {
            laser.style.left = `${xPosition + 8}px`
        }

    }, 10)
}

//função para criar inimigos aleatórios
function createMonsters() {
    let newMonster = document.createElement('img')
    let monsterSprite = monsterImg[Math.floor(Math.random() * monsterImg.length)];
    newMonster.src = monsterSprite
    newMonster.classList.add('monster')
    newMonster.classList.add('monster-transition')
    newMonster.style.left = '825px'
    newMonster.style.top = `${Math.floor(Math.random() * (530 - 170)) + 170}px`
    
    playArea.appendChild(newMonster)
    moveMonster(newMonster)
}

//função para movimentar inimigos 
function moveMonster(monster){
    moveMonsterInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'))
        if(xPosition <= 101) {
            if(Array.from(monster.classList).includes('dead-monster')) {
                monster.remove()
            } else {
                gameOver()
            }
        } else {
            monster.style.left = `${xPosition - 4}px`
        }
    }, 30);
}

//função para colisão 
function checkLaserCollision(laser, monster){
    let laserTop = parseInt(laser.style.top)
    let laserLeft = parseInt(laser.style.left)

    let monsterTop = parseInt(monster.style.top)
    let monsterLeft = parseInt(monster.style.left)
    //o laser tem que acertar dentro do tamanho do monstro, que é de 190px

    let monsterBottom = monsterTop - 190 

    //o laser não pode ultrapassar o limite de 660 e se o laser ultrapassou o monstro
    if(laserLeft != 660 && laserLeft >= monsterLeft) {
        if(laserTop <= monsterTop && laserTop >= monsterBottom) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

function playGame() {
    containerGameOver.style.display = 'none'
    backgroundSound.play()
    window.addEventListener('keydown', flyShip)
    monsterInterval = setInterval(() => {
        createMonsters()
    }, 2000)
}

//função de game over
function gameOver() {
    window.removeEventListener('keydown', flyShip)
    
    score = 0
    scoreText.innerHTML = `${score}`

    clearInterval(monsterInterval)

    let monsters = document.querySelectorAll('.monster')
    monsters.forEach((monster) => monster.remove())
    let lasers = document.querySelectorAll('.laser')
    lasers.forEach((laser) => laser.remove())

    gameOverScreen()
}
