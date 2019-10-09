console.log('start');


const characters = [{
        name: 'pyromancer',
        health: 100,
        attackValue: Math.floor(Math.random() * (12 - 7)) + 7,
        ultimateValue: Math.floor(Math.random() * (35 - 25)) + 25,
        image: 'project-1-pics/pyro.png'
    },
    {
        name: 'fayde',
        health: 125,
        attackValue: Math.floor(Math.random() * (10 - 5)) + 5,
        ultimateValue: Math.floor(Math.random() * (30 - 20)) + 20,
        image: 'project-1-pics/fayde.png'
    },
    {
        name: 'devourer',
        health: 150,
        attackValue: Math.floor(Math.random() * (15 - 8)) + 8,
        ultimateValue: Math.floor(Math.random() * (30 - 12)) + 12,
        image: 'project-1-pics/devo.png'
    },
    {
        name: 'glacius',
        health: 100,
        attackValue: Math.floor(Math.random() * (10 - 8)) + 8,
        ultimateValue: Math.floor(Math.random() * (40 - 30)) + 30,
        image: 'project-1-pics/glac.png'
    },
    {
        name: 'swiftblade',
        health: 100,
        attackValue: Math.floor(Math.random() * (18 - 12) + 12),
        ultimateValue: Math.floor(Math.random() * (40 - 30) + 30),
        image: 'project-1-pics/swifty.png'
    },
    {
        name: 'soulstealer',
        health: 100,
        attackValue: Math.floor(Math.random() * (20 - 18) + 18),
        ultimateValue: Math.floor(Math.random() * (40 - 20) + 20),
        image: 'project-1-pics/soulstealer.png'
    }
]


console.log(characters[0]);
class Player {
	constructor(humanName, char){
    	this.humanName = humanName;
        //this.char = characters[char]
        this.name = characters[char].name;
        this.health = characters[char].health;
        this.attackValue = characters[char].attackValue;
        this.ultimateValue = characters[char].ultimateValue;
        this.image = characters[char].image
	}
}


//game object will hold all functions for operation the game
const game = {
    time: 30,
    char: null,
    players: [null, null],
    activePlayerIndex: 0,  // 0 or 1

    
    //this function holds all elements that will be hidden upon loading the game
    hiddenElements(){
        const $timerHide = $('h2')
        $($timerHide).hide();
        const $playerNames = $('.playerNames')
        $($playerNames).hide();
        const $attackButtons = $('.attack-buttons')
        $($attackButtons).hide();
    },

    //start will take input to name each character
    start(player1, player2) {
        player1 = this.players[0]
        //console.log(player1);
        player2 = this.players[1]
        // console.log(player2);
        //Eventually thhis will be used to implemenet a 'loading screen' to display player names and selected characteer instead of using prompt
    },

    switchPlayer() {
        if(this.activePlayerIndex === 0){
            this.activePlayerIndex = 1
        } else {
            this.activePlayerIndex = 0
        }
    },
    setTimer() {
        $timer = $('h2')
        const interval = setInterval(() => {
            $timer.text(`Timer: ${this.time}`);
            this.time--;
            if(game.endRound()){
                clearInterval(interval)
            }
          
        
        }, 1000)
    }, //basic attack for characteer 1
    basicAttack(attackingPlayerIndex) {
        const attackingPlayer = this.players[attackingPlayerIndex]
        const defendingPlayer = this.players[attackingPlayerIndex === 0 ? 1 : 0]
        //this will be changed to to pull from the selectedChar array to choose character
        defendingPlayer.health -= attackingPlayer.attackValue;
        game.switchPlayer();
        console.log(attackingPlayer.name, ' attacked for' + attackingPlayer.attackValue + ' damage!');
        console.log(defendingPlayer.name, ' has ' + defendingPlayer.health + ' health remaining!');
    }, 
    ultimateAttack(attackingPlayerIndex) {
        const attackingPlayer = this.players[attackingPlayerIndex]
        const defendingPlayer = this.players[attackingPlayerIndex === 0 ? 1 : 0]
        defendingPlayer.health -=  attackingPlayer.ultimateValue
        game.switchPlayer();
        console.log(attackingPlayer.name, ' used his ultimate for ', attackingPlayer.ultimateValue + ' damage');
        console.log(defendingPlayer.name, ' has ' +  defendingPlayer.health + ' health remaining!');
    }, 
    // }, //block function that allows player to take reduced damae from the following attack
    //make it a status that is check before enemy attacks and reduce incoming damage by half?
    // block(){
    // }
    heal(healingPlayerIndex) { //Heals character one by 10 health. Need to fix logic so that character cannot heal past `maximum health pool
        const healingPlayer = this.players[healingPlayerIndex]
        healingPlayer.health += 10
        console.log(healingPlayer + healingPlayer.health + ' health remaining!');
    },
    endRound() { //if timer reaches zero end countdown and display alert statnig round is over
        if (this.time < 1) {
            return true;
            alert('Round Over switch players')
        }   else{
            return false
        }
    },
    chooseCharacter(playerName, playerSelection){

        //this needs to be updated to implement seletion for both players

        //instantiate player here to hold vbalues pulled from character selectiono
        //on chharacter selection the character names, pictures, select buttons and the header will be hidden and transition into the battle screen
        //The timer, input player names and attack buttons will be shown so that the players can begin battling

        this.players[this.activePlayerIndex] = new Player(playerName, playerSelection);
        game.switchPlayer();

        // if(this.players[1] != null){
        //     return true
        //     game.showBattlefield();

        

    },
    showBattlefield(){
        if(this.players[1] != null){
            // return false
            
            const $playerOnePic = $('<img class="playOnePic" src="'+this.players[0].image+'"></img>').appendTo('#playOneChar')
            game.switchPlayer();
            const $playerTwoPic = $('<img class="playTwoPic" src="'+this.players[1].image+'"></img>').appendTo('#playTwoChar')
            const $charNames = $('.charNames')
            const $charPics = $('.charPics')
            const $selectors = $('.buttons')
            const $forms  = $('.forms')
            const $chooseH1 = $('h1')
            const $timerHide = $('h2')
            const $playerNames = $('.playerNames')
            const $attackButtons = $('.attack-buttons')
            $($timerHide).show();
            $($playerNames).show();
            $($attackButtons).show();
            $($charNames).hide();
            $($charPics).hide();
            $($selectors).hide();
            $($forms).hide();
            $chooseH1.hide();
        }
    }

    //this temporarily serves as a way for me to hide certain elements while i layout my UI

}
//property to check if player is blocking before every attack stage
//if you isBlocking = true then half damage taken from incoming attack

 game.hiddenElements();

$('#form1').on('submit', () => {
    event.preventDefault();


})
$('#attack').on('click', () => {
    game.basicAttack(0);

})

$('#attack2').on('click', () => {
    game.basicAttack(1);
})

$('#ulti1').on('click', () => {
    game.ultimateAttack(0);
})

$('#ulti2').on('click', () => {
    game.ultimateAttack(1);
})

$('#heal1').on('click', () => {
    game.heal(0);
})

$('#heal2').on('click', () => {
    game.heal(1);
})
$('.buttons').on('click', (event) => {
    const $playerOneName = $('#input-box').val();
    const playerOneSelection = event.target.id
    game.chooseCharacter($playerOneName, playerOneSelection);
    game.switchPlayer();
    const $playerTwoName = $('#input-box2').val();
    const playerTwoSelection = event.target.id
    game.chooseCharacter($playerTwoName, playerTwoSelection);
    game.showBattlefield();
    game.setTimer();
    // this.player2 = new Player($playerTwoName, playerTwoSelection)
    // game.chooseCharacter(1)
    // console.log('This is player two selection', playerTwo.selectedChar);

})  

