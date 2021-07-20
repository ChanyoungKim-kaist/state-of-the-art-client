<template>
<v-app fill height>
<v-main class="pa-16 bg">
    <v-row>
        <v-col>
        <v-flex xs12 text-start class="title mt-10">
            <p aria-label="CodePen">
            <span data-text="M">M</span>
            <span data-text="E">E</span>
            <span data-text="M">M</span>
            <span data-text="O">O</span>
            <span data-text="R">R</span>
            <span data-text="Y">Y</span>
            </p>
            <p aria-label="CodePen">
            <span data-text="G">G</span>
            <span data-text="A">A</span>
            <span data-text="M">M</span>
            <span data-text="E">E</span>
            </p>
        </v-flex>
        <v-flex text-center>
            <v-hover v-slot="{hover}">
                <v-btn class="mt-10 startbtn blue yellow--text" rounded v-if="hover" @click="gameStart">Game Start</v-btn>
                <v-btn class="mt-10 startbtn yellow red--text" rounded v-else @click="gameStart">Game Start</v-btn>
                
            </v-hover>
        </v-flex>
        <v-flex text-center>
            <v-hover v-slot="{hover}">
                <v-text v-if="hover"
                    class="gametext white--text">
                    score : <span id='score'>0</span>
                </v-text>
                <v-text v-else
                    class="gametext">
                    score : <span id='score'>0</span>
                </v-text>
            </v-hover>
            
        </v-flex>
        </v-col>
        <v-col justify="center" align="center">
        <v-flex xs12 text-center id="gameDiv"> 
            <div id='countDown' class="gametext">READY</div>
            <table id="cardTable" class="gametext"></table>
        </v-flex>
        </v-col>
    </v-row>
</v-main>
</v-app>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
// 게임 상태
var gameState = ''

// 열린카드 src
var openCardId1 = ''
var openCardId2 = ''

// 난수 생성 함수
function generateRandom (min, max) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min
        return ranNum
}

var cards   // 카드 목록
var score = 0   // 점수
var openedCtn = 0    // 맞춘 카드 갯수

// 카드 배치
function setTable() {
    cards = [
        require('../assets/find_same_picture/bull.png'), require('../assets/find_same_picture/bull.png'),
        require('../assets/find_same_picture/chick.png'), require('../assets/find_same_picture/chick.png'),
        require('../assets/find_same_picture/crab.png'), require('../assets/find_same_picture/crab.png'),
        require('../assets/find_same_picture/fox.png'), require('../assets/find_same_picture/fox.png'),
        require('../assets/find_same_picture/hedgehog.png'), require('../assets/find_same_picture/hedgehog.png'),
        require('../assets/find_same_picture/hippopotamus.png'), require('../assets/find_same_picture/hippopotamus.png'),
        require('../assets/find_same_picture/koala.png'), require('../assets/find_same_picture/koala.png'),
        require('../assets/find_same_picture/lemur.png'), require('../assets/find_same_picture/lemur.png')
    ]
    var cardTableCode = '<tr>'
    for(var i=0; i<16; i++){
        if(i>0 && (i%4 == 0)){
            cardTableCode += '</tr><tr>'
        }
        var idx = generateRandom(0, 15-i)
        var img = cards.splice(idx,1)

        cardTableCode += '<td id="card' + i + '" style="border:solid #9DCEFF; width: 110px; height: 110px;"><img src="'+img+'" style="width: 100px;"><span >?</span></td>'
    }
    cardTableCode += '</tr>'
    $('#cardTable').html(cardTableCode)
}

//카드전체 가리기
function hiddenCards(){
    $('#cardTable td img').hide()
    $('#cardTable td span').show()
}

// 게임 시작
function startGame() {
    var sec = 5

    $('#info').hide()   // 안내 문구 가리기
    scoreInit()    // 점수 초기화
    setTable()  //카드 배치
    $('#cardTable td span').hide()

    // 카운트 다운
    function setText(){
        $('#countDown').text(--sec)
    }
    // 카운트 다운
    var intervalID = setInterval(setText, 1000)
    setTimeout(function(){
        clearInterval(intervalID)
        $('#countDown').text('start')
        hiddenCards()
        gameState = ''
    }, 5000)
}

// 카드 선택시
$(document).on('click','#cardTable td' ,function(){
    if(gameState != '') return // 게임 카운트 다운시 누를경우 return
    if(openCardId2 != '') return   //2개 열려있는데 누른경우 return
    if($(this).hasClass('opened'))  return //열려있는 카드를 또 누른경우 return
    $(this).addClass('opened')  //열려있다는것을 구분하기 위한 class추가
    if(openCardId1 == ''){
        $(this).find('img').show()
        $(this).find('span').hide()
        openCardId1 = this.id
    }else {
        if(openCardId1 == openCardId2)  return // 같은 카드 누른경우 return

        $(this).find('img').show()
        $(this).find('span').hide()

        var openCardSrc1 = $('#'+openCardId1).find('img').attr('src')
        var openCardSrc2 = $(this).find('img').attr('src')
        openCardId2 = this.id

        if(openCardSrc1 == openCardSrc2) {  //일치
            openCardId1 = ''
            openCardId2 = ''
            scorePlus()
            if(++openedCtn == 8){
                alert('성공! \n'+score+'점 입니다!')
                this.token = localStorage.getItem("access_token")
                this.config = {
                        headers: {
                            "token": this.token
                        }}
                axios.post("http://192.249.18.172:80/game", score, this.config)
                    .then( res => {
                        if (!res.data.ok) {
                            alert ('점수 등록에 실패했습니다.')
                        }
                    })
                    .catch( () => {
                        alert('통신 실패')
                    })

            }
        }else { //불일치
            setTimeout(back, 1000)
            scoreMinus()
        }
    }
})

// 두개의 카드 다시 뒤집기
function back() {
    $('#'+openCardId1).find('img').hide()
    $('#'+openCardId1).find('span').show()
    $('#'+openCardId2).find('img').hide()
    $('#'+openCardId2).find('span').show()
    $('#'+openCardId1).removeClass('opened')
    $('#'+openCardId2).removeClass('opened')
    openCardId1 = ''
    openCardId2 = ''
}

// 점수 초기화
function scoreInit(){
    score = 0
    openedCtn = 0
    $('#score').text(score)
}

// 점수 증가
function scorePlus(){
    score += 10
    $('#score').text(score)
}

// 점수 감소
function scoreMinus(){
    score -= 5
    $('#score').text(score)
}

export default {
    data() {
        return {
            token: null,
            config: null,
        }
    },
    methods: {
        gameStart: function () {
        console.log('게임시작')
        if (gameState === '') {
            startGame()
            gameState = 'alreadyStart'
        }
        }
    }
}
</script>

<style scoped>
/* * {
   cursor: url(../assets/c1.png), grab;

} */


.startbtn{
    font-family: game;
    font-size: 30px;
    text-transform: uppercase;
    letter-spacing: -1px;
    cursor: grab;
}

.gametext{
    font-family: game;
    font-size: 30px;
}

@font-face {
    font-family: "game";
    src: local("game"), url(../assets/fonts/game.ttf) format("truetype");
}

@font-face {
    font-family: "loveyou";
    src: local("loveyou"), url(../assets/fonts/loveyou.otf) format("opentype");
}
@font-face {
    font-family: "new_facebok";
    src: local("new_facebok"), url(../assets/fonts/new_facebok.ttf) format("truetype");
}
@font-face {
    font-family: "square";
    src: local("square"), url(../assets/fonts/square.ttf) format("truetype");
}
@font-face {
    font-family: "Computerfont";
    src: local("Computerfont"), url(../assets/fonts/Computerfont.ttf) format("truetype");
}
    .bg{
        background-color:#757575;
    }
#same_game{
    display: inline-block;
    width: 80%;
    height: auto;
    margin-top: 25px;
}
#infoDiv{
    margin-top: 15px;
    margin-bottom: 15px;
}
button {
    padding: 10px 20px;
    margin-right: 40px;
    margin-bottom: 10px;
}
#countDown {
    width: 474px;
    margin: auto;
    padding: 10px 0;
    font-size: 20px;
    font-weight: bold;
}
#cardTable {
    width: 474px;
    height: 474px;
    margin: auto;
    margin-bottom: 40px;
    border-collapse: collapse;
}
#cardTable td{
    border: solid #9DCEFF;
}

.title {
    padding-top: 30px;
    font-family: KakaoBig,Apple SD Gothic Neo,Malgun Got hic,맑은 고딕,sans-serif;
    font-size: 46px;
    line-height: 60px;
    color: var(--baseForeground);
    letter-spacing: -1px;
    background-size: 72px 72px;
}


p {
  color: rgb(0, 255, 42);
  font-family: Computerfont, serif;
  font-size: 1rem;
  font-weight: 400;
}
p span {
  display: inline-block;
  position: relative;
  transform-style: preserve-3d;
  perspective: 500;
  -webkit-font-smoothing: antialiased;
}
p span::before,
p span::after {
  display: none;
  position: absolute;
  top: 0;
  left: -1px;
  transform-origin: left top;
  transition: all ease-out 0.3s;
  content: attr(data-text);
}
p span::before {
  z-index: 1;
  color: rgba(0, 0, 0, 0.2);
  transform: scale(1.1, 1) skew(0deg, 15deg);
}
p span::after {
  z-index: 2;
  color: rgb(0, 0, 194);
  /* text-shadow: -1px 0 5px #237c0d, 1px 0 1px rgba(16, 126, 53, 0.8); */
  transform: rotateY(-40deg);
}
p span:hover::before {
  transform: scale(1.1, 1) skew(0deg, 5deg);
}
p span:hover::after {
  transform: rotateY(-10deg);
}
p span + span {
  margin-left: 0.1rem;
}
@media (min-width: 20rem) {
  p {
    font-size: 2rem;
  }
  p span::before,
  p span::after {
    display: block;
  }
}
@media (min-width: 30rem) {
  p {
    font-size: 3rem;
  }
}
@media (min-width: 40rem) {
  p {
    font-size: 5rem;
  }
}
@media (min-width: 60rem) {
  p {
    font-size: 7rem;
  }
}





</style>