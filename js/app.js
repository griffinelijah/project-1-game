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
    attack(player) {

    }
}


//game object will hold all functions for operation the game
const game = {
    time: 30,
    char: null,
    players: [null, null],
    activePlayerIndex: 0,  // 0 or 1
    isGameOver: false,

    
    //this function holds all elements that will be hidden upon loading the game
    hiddenElements(){
        const $timerHide = $('h2')
        $($timerHide).hide();
        const $playerNames = $('.playerNames')
        $($playerNames).hide();
        const $attackButtons = $('.attack-buttons')
        $($attackButtons).hide();
        const $hpBar1 = $('.health-bar1')
        $($hpBar1).hide();
        const $hpBar2 = $('.health-bar2')
        $($hpBar2).hide();
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

        //const $progressValue = $('#p1health').attr('value')
        const $healthValue = defendingPlayer.health -= attackingPlayer.attackValue;
        $progressValue = $('#p1health').attr('value', $healthValue)
        console.log($progressValue);
        //console.log($healthValue);
        // defendingPlayer.health -= attackingPlayer.attackValue;
        


        const $attacking = $('<div id="attack"> '+attackingPlayer.name+'  attacked for  '+attackingPlayer.attackValue+'   damage!</div>')
        // let health  = $('#health')
        $('h3').append($attacking)
        $("h3").empty().show().html($attacking).delay(1000).fadeOut(500)
        
        game.switchPlayer();
        this.gameOver();
        //this.hideDialog();
    }, 
    ultimateAttack(attackingPlayerIndex) {
        const attackingPlayer = this.players[attackingPlayerIndex]
        const defendingPlayer = this.players[attackingPlayerIndex === 0 ? 1 : 0]
        defendingPlayer.health -=  attackingPlayer.ultimateValue
        game.switchPlayer();
        const $ultiAttacking = $('<div id="ultiAttacking"> '+attackingPlayer.name+' used an ultimate for '+attackingPlayer.ultimateValue+' damage!</div>')
        $('h3').append($ultiAttacking)
        $("h3").empty().show().html($ultiAttacking).delay(1000).fadeOut(500)
        this.gameOver();
        //this.hideDialog();
    }, 
    // }, //block function that allows player to take reduced damae from the following attack
    //make it a status that is check before enemy attacks and reduce incoming damage by half?
    // block(){
    // }
    heal(healingPlayerIndex) { //Heals character one by 10 health. Need to fix logic so that character cannot heal past `maximum health pool
        const healingPlayer = this.players[healingPlayerIndex]
        if(healingPlayer.health < this.players[healingPlayerIndex].health){
        healingPlayer.health += 10
        const $maxHealth = $('<div id="maxHp"> '+healingPlayer.name+' is at maximum health')
    } else{
        console.log('you are at max health');
    }
        const $healingPlayer = $('<div id="healingPlayer"> '+healingPlayer.name+' healed for 10 health, they have '+healingPlayer.health+' remaining!</div>')
        $('h3').append($healingPlayer)
        $("h3").empty().show().html($healingPlayer).delay(1000).fadeOut(500)
        //this.hideDialog();
    },
    endRound() { //if timer reaches zero end countdown and display alert statnig round is over
        if (this.time < 1) {
            return true;
            game.switchPlayer();
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
            this.setTimer();

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
            const $hpBar1 = $('.health-bar1')
            const $hpBar2 = $('.health-bar2')
            $($timerHide).show();
            $($playerNames).show();
            $($attackButtons).show();
            $($hpBar1).show();
            $($hpBar2).show();
            $($charNames).hide();
            $($charPics).hide();
            $($selectors).hide();
            $($forms).hide();
            $chooseH1.hide();

        }
    },//this function will be ran to hide dialog messages after five seeconds so pag is not cluttered during battle
    // hideDialog() { 
    //             $("h3").empty().show().html().delay(1000).fadeOut(500)
                
    //             // $('#GFG_DOWN').text("Div hides after 1 second.");      
    //         }, 

    //  flashingColors(){
    //     let text = $('#gameOver').css('color', black)
    //     let colorChange = setInterval(flash, 1000)
    // },


    gameOver() {
        //console.log(this.players)
        if(this.players[0].health <= 0) {
            this.isGameOver = true
            const $gameOver = $('<div id="gameOver">Player Two Wins!</div>')
            $('h3').append($gameOver);
            $gameOver.text
            //alert('game over, player two wins');
        } else if(this.players[1].health <= 0){
            this.isGameOver = true
            const $gameOver2 = $('<div id="gameOver2">Player One Wins!</div>')
            $('h3').append($gameOver2)
            //flashingColors();
        }
    }



    // gameOver(){
    //     if(this.players[0].health <= 0) { 
    //         alert('game over, player two wins');
    //     } else(this.players[1].health <= 0) {
    //         alert('game over, player on wins');

        
    // // }

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
    const $playerName = $('#input-box').val();
    // empty out input box
    const playerSelection = event.target.id
    game.chooseCharacter($playerName, playerSelection);
    game.showBattlefield();
    
    

})  

