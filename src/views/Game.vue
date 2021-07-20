<template>
<v-container fluid >
    <v-layout column>
        <v-flex xs12 text-center class="title">
            <h1> 같은 그림 찾기 🎨 </h1>
            <p> 미니게임을 통해 머니를 획득할 수 있어요! </p>
        </v-flex>

        <v-flex xs12 text-center class="title2">
            <v-btn block @click="gameStart">GameStart</v-btn>
            <h1> score : <span id='score'>0</span></h1>
            <p id='info'> 게임시작 버튼을 눌러주세요.<br> </p>
        </v-flex>

        <v-flex xs12 text-center id="gameDiv"> 
            <div id='countDown'>READY</div>
            <table id="cardTable"></table>
        </v-flex>
    </v-layout>
</v-container>
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
                axios.post("", score, this.config)
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
    font-family: KakaoBig,Apple SD Gothic Neo,Malgun Gothic,맑은 고딕,sans-serif;
    font-size: 46px;
    line-height: 60px;
    color: var(--baseForeground);
    letter-spacing: -1px;
    background-size: 72px 72px;
}


</style>