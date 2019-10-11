const characters = [{
        name: 'pyromancer',
        health: 100,
        attackValue: Math.floor(Math.random() * (12 - 7)) + 7,
        ultimateValue: Math.floor(Math.random() * (35 - 25)) + 25,
        image: 'project-1-pics/pyro.png',
        // attackAnimation: 'project-1-pics/pyrobasicattack.png',
        // ultimateAnimation: 'project-1-pics/pyroulti.gif'
    },
    {
        name: 'fayde',
        health: 125,
        attackValue: Math.floor(Math.random() * (10 - 5)) + 5,
        ultimateValue: Math.floor(Math.random() * (30 - 20)) + 20,
        image: 'project-1-pics/fayde.png',
        // attackAnimation: 'project-1-pics/faydeweap.png',
        // ultimateAnimation: 'project-1-pics/faydeulti2.gif'
    },
    {
        name: 'devourer',
        health: 150,
        attackValue: Math.floor(Math.random() * (15 - 8)) + 8,
        ultimateValue: Math.floor(Math.random() * (30 - 12)) + 12,
        image: 'project-1-pics/devo.png',
        // attackAnimation: 'project-1-pics/devo weap.png',
        // ultimateAnimation: 
    },
    {
        name: 'glacius',
        health: 100,
        attackValue: Math.floor(Math.random() * (10 - 8)) + 8,
        ultimateValue: Math.floor(Math.random() * (40 - 30)) + 30,
        image: 'project-1-pics/glac.png',
        // attackAnimation: 'project-1-pics/glacattack.png',
        // ultimateAnimation: 'project-1-pics/glaculti.gif'
    },
    {
        name: 'swiftblade',
        health: 100,
        attackValue: Math.floor(Math.random() * (18 - 12) + 12),
        ultimateValue: Math.floor(Math.random() * (40 - 30) + 30),
        image: 'project-1-pics/swifty.png',
        // attackAnimation: 'project-1-pics/swiftyanimation.gif',
        // ultimateAnimation: 'project-1-pics/swiftyulti.gif'
    },
    {
        name: 'soulstealer',
        health: 100,
        attackValue: Math.floor(Math.random() * (20 - 18) + 18),
        ultimateValue: Math.floor(Math.random() * (40 - 20) + 20),
        image: 'project-1-pics/soulstealer.png',
        // attackAnimation: 'project-1-pics/soulattack.png',
        // ultimateAnimation: 
    }
]

class Player {
    constructor(humanName, char) {
        this.humanName = humanName;
        this.name = characters[char].name;
        this.health = characters[char].health;
        this.attackValue = characters[char].attackValue;
        this.ultimateValue = characters[char].ultimateValue;
        this.image = characters[char].image
        this.attackAnimation = characters[char].attackAnimation
        this.ultimateAnimation = characters[char].ultimateAnimation
    }
    attack(player) {

    }
}


//game object will hold all functions for operation the game
const game = {
    time: 15,
    char: null,
    players: [null, null],
    activePlayerIndex: 0, // 0 or 1
    isGameOver: false,


    //this function holds all elements that will be hidden upon loading the game
    hiddenElements() {
        const $timerHide = $('h2')
        $($timerHide).hide();
        const $playerNames = $('.playerNames')
        $($playerNames).hide();
        const $attackButtons = $('.attack-buttons')
        $($attackButtons).hide();
        const $p1health = $('#p1health')
        $($p1health).hide();
        const $p2health = $('#p2health')
        $($p2health).hide();
    },
    //start will take input to name each character and  assign them to the empty players array
    start(player1, player2) {
        player1 = this.players[0]
        player2 = this.players[1]
    },
    //tells game to automatically change which player is active and able to do functions based on active player index starting at player one
    switchPlayer() {
        if (this.activePlayerIndex === 0) {
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
            if (this.isGameOver === true) {
                clearInterval(interval)
            } else if(this.time === 0){
                this.time = 15
            }

        }, 1000)
    }, 
    //basic attack for characteer 1, also serves to decrement health bars in correlation to attack values
    basicAttack(attackingPlayerIndex) {
        const attackingPlayer = this.players[attackingPlayerIndex]
        const defendingPlayer = this.players[attackingPlayerIndex === 0 ? 1 : 0]
        if (attackingPlayerIndex === 0) {
            const $healthValue = defendingPlayer.health -= attackingPlayer.attackValue;
            $progressValue = $('#p2health').attr('value', $healthValue)
            // const $attackAnimationOne = $(`<img class="attackAni" src=${this.players[0].attackAnimation}></img>`).appendTo('#attackAnimation').fadeOut(2000)
        } else if (attackingPlayerIndex === 1) {
            const $healthValue = defendingPlayer.health -= attackingPlayer.attackValue;
            $progressValue = $('#p1health').attr('value', $healthValue)
            // const $attackAnimationTwo = $(`<img class="attackAni" src=${this.players[1].attackAnimation}></img>`).appendTo('#attackAnimation').fadeOut(2000)
        }
        const $attacking = $('<div id="attack"> ' + attackingPlayer.name + '  attacked for  ' + attackingPlayer.attackValue + '   damage!</div>').css('color', 'red')
        $('h3').append($attacking)
        $("h3").empty().show().html($attacking).delay(1000).fadeOut(500)
        game.switchPlayer();
        this.gameOver();
    },//same idea as basic attack but higher value
    ultimateAttack(attackingPlayerIndex) {
        const attackingPlayer = this.players[attackingPlayerIndex]
        const defendingPlayer = this.players[attackingPlayerIndex === 0 ? 1 : 0]
        if (attackingPlayerIndex === 0) {
            const $healthValue = defendingPlayer.health -= attackingPlayer.ultimateValue;
            $progressValue = $('#p2health').attr('value', $healthValue)
        } else if (attackingPlayerIndex === 1) {
            const $healthValue = defendingPlayer.health -= attackingPlayer.ultimateValue;
            $progressValue = $('#p1health').attr('value', $healthValue)
        }
        const $ultiAttacking = $('<div id="ultiAttacking"> ' + attackingPlayer.name + ' used an ultimate for ' + attackingPlayer.ultimateValue + ' damage!</div>').css('color', 'red')
        $('h3').append($ultiAttacking)
        $("h3").empty().show().html($ultiAttacking).delay(1000).fadeOut(500)
        game.switchPlayer();
        this.gameOver();
    },  
    heal(healingPlayerIndex) { //Heals character one by 10 health. healingPlayerIndex is passed throug when calling function to correspond with active player in players array
        const healingPlayer = this.players[healingPlayerIndex]
        if (healingPlayerIndex === 0) {
            const $healthValue = healingPlayer.health += 10
            $progressValue = $('#p1health').attr('value', $healthValue)
        } else if (healingPlayerIndex === 1) {
            const $healthValue = healingPlayer.health += 10
            $progressValue = $('#p2health').attr('value', $healthValue)
        }
        const $healingPlayer = $('<div id="healingPlayer"> ' + healingPlayer.name + ' healed for 10 health!</div>').css('color', 'green')
        $('h3').append($healingPlayer)
        $("h3").empty().show().html($healingPlayer).delay(1000).fadeOut(500)
        game.switchPlayer();
    },
    endRound() { //if timer reaches zero end countdown and switch players
        if (this.time < 0) {
            return true;
            //game.resetTimer();
            game.switchPlayer();
        } else {
            return false
        }
    },
    chooseCharacter(playerName, playerSelection) {
        //instantiate player class wit given player index to create to new players eaech timee function is called
        this.players[this.activePlayerIndex] = new Player(playerName, playerSelection);
        game.switchPlayer();
    },//this will start timer only if both players have seleceted characters and are pushed into players array
    //will show and hide corresponding elements to move from selection screen to battlfiend
    showBattlefield() {
        if (this.players[1] != null) {
            this.setTimer();
            this.gameOver();
            const $playerOnePic = $(`<img class="playOnePic" src=${this.players[0].image}></img>`).appendTo('#playOneChar')
            game.switchPlayer();
            const $playerTwoPic = $(`<img class="playTwoPic" src=${this.players[1].image}></img>`).appendTo('#playTwoChar')
            const $charNames = $('.charNames')
            const $charPics = $('.charPics')
            const $selectors = $('.buttons')
            const $forms = $('.forms')
            const $chooseH1 = $('h1')
            const $timerHide = $('h2')
            const $playerNames = $('.playerNames')
            const $attackButtons = $('.attack-buttons')
            const $p1health = $('#p1health')
            const $p2health = $('#p2health')
            $($timerHide).show();
            $($playerNames).show();
            $($attackButtons).show();
            $($p1health).show();
            $($p2health).show();
            $($charNames).hide();
            $($charPics).hide();
            $($selectors).hide();
            $($forms).hide();
            $chooseH1.hide();

        }
    }, 
    gameOver() {
        //game ends if either players health bar gets below zero and text is displayed corresponding to playre that wins
        if (this.players[0].health <= 0) {
            this.isGameOver = true
            const $gameOver = $('<div class="gameOver">Player Two Wins!</div>').css('color', 'red')
            $('h4').append($gameOver);
           
        } else if (this.players[1].health <= 0) {
            this.isGameOver = true
            const $gameOver2 = $('<div class="gameOver">Player One Wins!</div>').css('color', 'red')
            $('h4').append($gameOver2)
            //flashingColors();
        }
    }

}

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
    $('#input-box').val('');
    const playerSelection = event.target.id
    game.chooseCharacter($playerName, playerSelection);
    game.showBattlefield();

})

