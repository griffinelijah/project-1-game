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
//Classes for each type of choosable character will hold properties unique to that character
// class Character1 {
// 	constructor(name) {
// 		this.name = name,
// 		this.health = 100,
// 		this.attackValue = Math.floor(Math.random() * (12 - 7)) + 7;
// 		//console.log(this.attackValue);
// 		//this.attackSpeed = 1.5,
// 		this.ultimateValue = Math.floor(Math.random() * (35 - 25)) + 25;
// 		//console.log(this.health);	
// 	}

// }


// class Character2 {
// 	constructor(name) {
// 		this.name = name,
// 		this.health = 125,
// 		this.attackValue = Math.floor(Math.random() * (10 - 5)) + 5;
// 		//this.attackSpeed = 1,
// 		this.ultimateValue = Math.floor(Math.random() * (30 - 20)) + 20;

// 	}

// }


// class Character3 {
// 	constructor(name) {
// 		this.name = name,
// 		this.health = 150,
// 		this.attackValue = Math.floor(Math.random() * (18 - 14)) + 14;
// 		this.attackSpeed = .5,
// 		this.ultimateValue = Math.floor(Math.random() * (50 - 40)) + 40;

// 	}

// }
const playerOne = {
    name: "",
    selectedChar: [],
}

const playerTwo = {
    name: "",
    selectedChar: [],
}

// class PlayerOne {
// 	constructor(name){
// 	this.name = name,
// 	this.selectedChar = []

// 	}

// }

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

    //start will take input to name each character
    start1(name) {
        const $playerOne = $('#input-box').val();
        $('#player1Name').append($playerOne)
        //Eventually thhis will be used to implemenet a 'loading screen' to display player names and selected characteer instead of using prompt
    },
    start2(name) {
        const $playerTwo = $('#input-box2').val();
        $('#player2Name').append($playerTwo)
        //   //Eventually thhis will be used to implemenet a 'loading screen' to display player names and selected characteer
    },
    chooseCharacter1() {
        let $value1 = prompt('choose your character')
        playerOne.selectedChar.push(characters[$value1])
        console.log(playerOne.selectedChar);
    },
    chooseCharacter2() {
        let $value2 = prompt('chose your character')
        playerTwo.selectedChar.push(characters[$value2])
        console.log(playerTwo.selectedChar);
    },
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
    basicAttack() {
        //this will be changed to to pull from the selectedChar array to choose character
        playerTwo.selectedChar[0].health -= playerOne.selectedChar[0].attackValue;
        console.log('Char 1 attacked with ', playerOne.selectedChar[0].attackValue + ' damage!');
        console.log('Char 2 has ', playerTwo.selectedChar[0].health + ' health remaining!');
    }, //basic attack for character 2
    basicAttack2() {
        playerOne.selectedChar[0].health -= playerTwo.selectedChar[0].attackValue;
        console.log('Char 2 attacked with ', playerTwo.selectedChar[0].attackValue + ' damage');
        console.log('Char 1 has ', playerOne.selectedChar[0].health + ' health remaining!');
    }, //ultimate ability for character 1
    ultimateAttack1() {
        playerTwo.selectedChar[0].health -= playerOne.selectedChar[0].ultimateValue;
        console.log('Char 1 used his ultimate for ', playerOne.selectedChar[0].ultimateValue + ' damage');
        console.log('Char 2 has ', playerTwo.selectedChar[0].health + ' health remaining!');
    }, //ultimate ability for character 2
    ultimateAttack2() {
        playerOne.selectedChar[0].health -= playerTwo.selectedChar[0].ultimateValue;
        console.log('Char 2 used his ultimate for ', playerTwo.selectedChar[0].health + ' damage');
        console.log('Chat 1 has ', playerOne.selectedChar[0].health + ' health remaining!');
    }, //block function that allows player to take reduced damae from the following attack
    //make it a status that is check before enemy attacks and reduce incoming damage by half?
    // block(){
    // }
    heal1() { //Heals character one by 10 health. Need to fix logic so that character cannot heal past maximum health pool
        if (playerOne.selectedChar[0].health <= 100) {
            playerOne.selectedChar[0].health += 10
        }
        console.log('Char 1 used a heal ', playerOne.selectedChar[0] + ' health remaining!');
    },
    heal2() { //heals character two by 10 health
        if (playerTwo.selectedChar[0] <= 100) {
            playerTwo.selectedChar[0] += 10
        }
        console.log('Char 2 used a heal ', playerTwo.selectedChar[0] + ' health remaining!');
    },
    endRound() { //if timer reaches zero end countdown and display alert statnig round is over
        if (this.time === 0) {
            return true
            clearInterval(interval)
            alert('Round over')
        }
    },
    characterPics(){
        $devoDiv = $('img')
    },
    hideStuff(){
    let $buttons = document.getElementsByClassName('buttons')
    console.log($buttons);
    $($buttons).hide();
}
}

//property to check if player is blocking before every attack stage
//if you isBlocking = true then half damage taken from incoming attack



$('#hideButton').on('click', () => {
    game.hideStuff();
    
})
$('#form1').on('submit', () => {
    event.preventDefault();
    game.start1(name);
    game.chooseCharacter1();

})
$('#form2').on('submit', () => {
    event.preventDefault();
    game.start2(name);
    game.chooseCharacter2();
    game.setTimer();

})
$('#attack').on('click', () => {
    game.basicAttack();

})

$('#attack2').on('click', () => {
    game.basicAttack2();
})

$('#ulti1').on('click', () => {
    game.ultimateAttack1();
})

$('#ulti2').on('click', () => {
    game.ultimateAttack2();
})

$('#heal1').on('click', () => {
    game.heal1();
})

$('#heal2').on('click', () => {
    game.heal2();
})