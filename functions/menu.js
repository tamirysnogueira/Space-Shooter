const config = document.getElementById('config')
const closeConfig = document.getElementById('close')
const containerGameOver = document.getElementById('gameOver')

function start() {
    const startMenu = document.querySelector('#startMenu')
    const selectShip = document.getElementById('selectShip')

    startMenu.style.display = 'none'
    selectShip.style.display = 'flex'
}


//função para mudar a imagem da nave e ir para a próxima tela
function ship(ship){
    if(ship.id === 'airplaine1'){
        yourShip.src = 'src/imgs/playArea/airplane.png'
    } else {
        yourShip.src = 'src/imgs/playArea/airplane2.png'
    }

    selectShip.style.display = 'none'
    playArea.style.display = 'block'

    playGame()
}

//função da tela de game over

function gameOverScreen(){
    gameOverSound.play()

    containerGameOver.style.display = 'flex'

    backgroundSound.pause()
    backgroundSound.currentTime = 0

    yourShip.style.top = '250px'
}

//função para voltar a tela home

function home() {
    containerGameOver.style.display = 'none'
    playArea.style.display = 'none'
    startMenu.style.display = 'flex'
}

