console.log('start');


const characters = [{
        name: 'pyromancer',
        health: 100,
        attackValue: Math.floor(Math.random() * (12 - 7)) + 7,
        ultimateValue: Math.floor(Math.random() * (35 - 25)) + 25
    },
    {
        name: 'fayde',
        health: 125,
        attackValue: Math.floor(Math.random() * (10 - 5)) + 5,
        ultimateValue: Math.floor(Math.random() * (30 - 20)) + 20
    },
    {
        name: 'devourer',
        health: 150,
        attackValue: Math.floor(Math.random() * (15 - 8)) + 8,
        ultimateValue: Math.floor(Math.random() * (30 - 12)) + 12
    },
    {
        name: 'glacius',
        health: 100,
        attackValue: Math.floor(Math.random() * (10 - 8)) + 8,
        ultimateValue: Math.floor(Math.random() * (40 - 30)) + 30
    },
    {
        name: 'swiftblade',
        health: 100,
        attackValue: Math.floor(Math.random() * (18 - 12) + 12),
        ultimateValue: Math.floor(Math.random() * (40 - 30) + 30)
    },
    {
        name: 'soulstealer',
        health: 100,
        attackValue: Math.floor(Math.random() * (20 - 18) + 18),
        ultimateValue: Math.floor(Math.random() * (40 - 20) + 20)
    }
]
console.log(characters[0].attackValue);

// }
// const playerOne = {
//     name: "",
//     selectedChar: [],
// }

// const playerTwo = {
//     name: "",
//     selectedChar: [],
// }

class Player {
	constructor(humanName, char){
    	this.humanName = humanName,
        this.char = characters.name,
        this.health = characters.health,
        this.attackValue = characters.attackValue,
        this.ultimateValue = characters.ultimateValue
	}
}

// class PlayerTwo {
// 	constructor(name){
// 	this.name = name
// 	//selectedChar = []

// 	}

// }

//game object will hold all functions for operation the game
const game = {
    time: 30,
    char: null,
    players: [{
        name: 'tom',
        health: 100,
        attackValue: 10,
        ultimateValue: 29,
    }, {
        name: 'greg',
        health: 100,
        attackValue: 15,
        ultimateValue: 20
    }],
    activePlayerIndex: 0,

    
    //this function holds all elements that will be hidden upon loading the game
    // hiddenElements(){
    //     const $timerHide = $('h2')
    //     $($timerHide).hide();
    //     const $playerNames = $('.playerNames')
    //     $($playerNames).hide();
    //     const $attackButtons = $('.attack-buttons')
    //     $($attackButtons).hide();
    // },

    //start will take input to name each character
    start(player1, player2) {
        console.log(player1);
        this.players[0] = player1
        console.log(player2);
        this.players[1] = player2
        //Eventually thhis will be used to implemenet a 'loading screen' to display player names and selected characteer instead of using prompt
    },
    // start2(name) {
    //     const $playerTwo = $('#input-box2').val();
    //     $('#player2Name').append($playerTwo)
    //     //   //Eventually thhis will be used to implemenet a 'loading screen' to display player names and selected characteer
    //},
    //the set stats function will control the damage ranges and ultimate ability timing of each characteer
    setTimer() {
        $timer = $('h2')
        const interval = setInterval(() => {
            this.time -= 1
            $timer.text(`Timer: ${this.time}`);
            if (game.endRound()) {
                clearInterval(interval)
            }
        }, 1000)
    }, //basic attack for characteer 1
    basicAttack(attackingPlayerIndex) {
        const attackingPlayer = this.players[attackingPlayerIndex]
        console.log(attackingPlayer);
        const defendingPlayer = this.players[attackingPlayerIndex === 0 ? 1 : 0]
        console.log(defendingPlayer);
        //this will be changed to to pull from the selectedChar array to choose character
        defendingPlayer.health -= attackingPlayer.attackValue;
        console.log(attackingPlayer.name, ' attacked for' + attackingPlayer.attackValue + ' damage!');
        console.log(defendingPlayer.name, ' has ' + defendingPlayer.health + ' health remaining!');
    }, //basic attack for character 2
    // basicAttack2() {
    //     playerOne.selectedChar[0].health -= playerTwo.selectedChar[0].attackValue;
    //     console.log('Char 2 attacked with ', playerTwo.selectedChar[0].attackValue + ' damage');
    //     console.log('Char 1 has ', playerOne.selectedChar[0].health + ' health remaining!');
    // }, //ultimate ability for character 1
    ultimateAttack1(attackingPlayerIndex) {
        const attackingPlayer = this.players[attackingPlayerIndex]
        const defendingPlayer = this.players[attackingPlayerIndex === 0 ? 1 : 0]
        defendingPlayer.health -=  attackingPlayer.ultimateValue
        console.log(attackingPlayer.name, ' used his ultimate for ', attackingPlayer.ultimateValue + ' damage');
        console.log(defendingPlayer.name, ' has ' +  defendingPlayer.health + ' health remaining!');
    }, //ultimate ability for character 2
    // ultimateAttack2() {
    //     playerOne.selectedChar[0].health -= playerTwo.selectedChar[0].ultimateValue;
    //     console.log('Char 2 used his ultimate for ', playerTwo.selectedChar[0].health + ' damage');
    //     console.log('Chat 1 has ', playerOne.selectedChar[0].health + ' health remaining!');
    // }, //block function that allows player to take reduced damae from the following attack
    //make it a status that is check before enemy attacks and reduce incoming damage by half?
    // block(){
    // }
    heal1(playerIndex) { //Heals character one by 10 health. Need to fix logic so that character cannot heal past maximum health pool
        // const firstPlayer = this.players[playerIndex]
        // const secondPlayer = this.players[playerIndex === 0 ? 1 : 0]
        // firstPlayer.health += 10;
        // secondPlayer.healyth += 10;
        // console.log(playerIndex + playerIndex.health + ' health remaining!');
    },
    // heal2() { //heals character two by 10 health
    //     if (playerTwo.selectedChar[0] <= 100) {
    //         playerTwo.selectedChar[0] += 10
    //     }
    //     console.log('Char 2 used a heal ', playerTwo.selectedChar[0] + ' health remaining!');
    // },
    endRound() { //if timer reaches zero end countdown and display alert statnig round is over
        if (this.time === 0) {
            return true
            clearInterval(interval);
        }
    },
    chooseCharacter(event){
        // pass a player, not an event
        // this.players[0]
        // call this method again at some point for this.players[1]
        console.log("hey, here's event in chooseCharacter1");
        console.log(event.target.id);
        //add selected character to players selected character array
        //this needs to be updated to implement seletion for both players
        if(event.target.id === 'pyroSelect'){
            playerOne.selectedChar.push(characters[0])
        }   else if(event.target.id === 'faydeSelect'){
            playerOne.selectedChar.push(characters[1])
        }   else if(event.target.id === 'devoSelect'){
            playerOne.selectedChar.push(characters[2])
        }   else if(event.target.id === 'glacSelect'){
            playerOne.selectedChar.push(characters[3])
        }   else if(event.target.id === 'swiftSelect'){
            playerOne.selectedChar.push(characters[4])
        }   else if(event.target.id === 'soulSelect')
            playerOne.selectedChar.push(characters[5])
            //on chharacter selection the character names, pictures, select buttons and the header will be hidden and transition into the battle screen
            const $charNames = $('.charNames')
            $($charNames).hide();
            const $charPics = $('.charPics')
            $($charPics).hide();
            const $selectors = $('.buttons')
            $($selectors).hide();
            const $forms  = $('.forms')
            $($forms).hide();
            const $chooseH1 = $('h1')
            $chooseH1.hide();
            //The timer, input player names and attack buttons will be shown so that the players can begin battling
            const $timerHide = $('h2')
            const $playerNames = $('.playerNames')
            const $attackButtons = $('.attack-buttons')
            $($timerHide).show();
            $($playerNames).show();
            $($attackButtons).show();
    },

    
    // assignCharacter2(){
    //         if(event.target.id === 'pyroSelect'){
    //         playerTwo.selectedChar.push(characters[0])
    //     }   else if(event.target.id === 'faydeSelect'){
    //         playerTwo.selectedChar.push(characters[1])
    //     }   else if(event.target.id === 'devoSelect'){
    //         playerTwo.selectedChar.push(characters[2])
    //     }   else if(event.target.id === 'glacSelect'){
    //         playerTwo.selectedChar.push(characters[3])
    //     }   else if(event.target.id === 'swiftSelect'){
    //         playerTwo.selectedChar.push(characters[4])
    //     }   else if(event.target.id === 'soulSelect')
    //         playerTwo.selectedChar.push(characters[5])
    // },
    //this temporarily serves as a way for me to hide certain elements while i layout my UI

}
//property to check if player is blocking before every attack stage
//if you isBlocking = true then half damage taken from incoming attack




//game.hiddenElements();
$('#form1').on('submit', () => {
    event.preventDefault();
    const $playerOneName = $('#input-box').val();
    const player1 = new Player($playerOneName,)
    const $playerTwoName = $('#input-box2').val();
    const player2 = new Player($playerTwoName)
    //game.chooseCharacter1();
    // get the value from input-box (aka player1 name)
    // get the value from input-box2 (aka player2 name)
    game.start(player1, player2)
})
$('#form2').on('submit', () => {
    event.preventDefault();
    game.start(name);
    game.setTimer();

})
$('#attack').on('click', () => {
    game.basicAttack(0);

})

$('#attack2').on('click', () => {
    game.basicAttack(1);
})

$('#ulti1').on('click', () => {
    game.ultimateAttack1(0);
})

$('#ulti2').on('click', () => {
    game.ultimateAttack1(1);
})

$('#heal1').on('click', () => {
    game.heal1(0);
})

$('#heal2').on('click', () => {
    game.heal1(1);
})
$('.buttons').on('click', (event) => {
    game.chooseCharacter(event);
    // game.assignCharacter2();
    // console.log('This is player two selection', playerTwo.selectedChar);

})  

