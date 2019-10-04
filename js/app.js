console.log('start');


const characters = [
{
	name: 'pyro',
	health: 100,
	attackValue: Math.floor(Math.random() * (12 - 7)) + 7,
	ultimateValue: Math.floor(Math.random() * (35 -25)) + 25
},
{
	name: 'fayde',
	health: 125,
	attackValue: Math.floor(Math.random() * (10 - 5)) + 5,
	ultimateValue: Math.floor(Math.random() * (30-20)) + 20
},
{
	name: 'devo',
	health: 125,
	attackValue: Math.floor(Math.random() * (15 - 8)) + 8,
	ultimateValue: Math.floor(Math.random() * (30 - 12)) + 12
}
]
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

class Player {
	constructor(name){
	this.name = name
	}

}

//game object will hold all functions for operation the game
const game  = {
	time : 30,
	char: null,
	//start will take input to name each character
	start1(name){
		let $value1 = prompt('Choose your character')
		//Take value of prompt to identify index withni character array to choose character
		const $player1Name = $('#input-box').val();
        this.playerOne = new Player($player1Name);
        const $name = $('#charName');
        // //Eventually thhis will be used to implemenet a 'loading screen' to display player names and selected characteer
        // $('#charName').html($('#input-box').val());
        // $name.text(`Player one is ${this.player.name} he chose character ${$value1}`)
        // console.log(this.char);
	},
	start2(name){
		//instantiate char2
		let $value2 = prompt('Choose your character')  
		//Take value of prompt to identify index withni character array to choose character
        const $player2Name = $('#input-box2').val();
        this.playerOne = new Player($player2Name);
        const $name2 = $('#char2Name');
        //   //Eventually thhis will be used to implemenet a 'loading screen' to display player names and selected characteer
        // $('#char2Name').html($('#input-box2').val());
        // $name2.text(`Player two is ${this.char2.name} he chose character ${$value2}`)
        // console.log(this.char2);
	},
	//the set stats function will control the damage ranges and ultimate ability timing of each characteer
	setTimer(){
		$timer = $('h2')
		const interval = setInterval(() => {
			this.time -=1
			$timer.text(`Timer: ${this.time}`);
			if(game.endRound()){
				clearInterval(interval)
			}
		}, 1000)
	},//basic attack for characteer 1
	basicAttack(){
		this.char2.health -= this.char.attackValue;
		console.log('Char 1 attacked with ', this.char.attackValue + ' damage!');
		console.log('Char 2 has ', this.char2.health + ' health remaining!');
	},//basic attack for character 2
	basicAttack2(){
		this.char.health -= this.char2.attackValue;
		console.log('Char 2 attacked with ', this.char2.attackValue + ' damage');
		console.log('Char 1 has ', this.char.health + ' health remaining!');
	},//ultimate ability for character 1
	ultimateAttack1(){
		this.char2.health -= this.char.ultimateValue;
		console.log('Char 1 used his ultimate for ', this.char.ultimateValue + ' damage');
		console.log('Char 2 has ', this.char2.health + ' health remaining!');
	},//ultimate ability for character 2
	ultimateAttack2(){
		this.char.health -= this.char2.ultimateValue;
		console.log('Char 2 used his ultimate for ', this.char2.ultimateValue + ' damage');
		console.log('Chat 1 has ', this.char.health + ' health remaining!');
	},//block function that allows player to take reduced damae from the following attack
	// block(){
	// 	this.char.health -= Math.floor(Math.random() * (10-20)) + 20;
	// }
	heal1(){//Heals character one by 10 health
		this.char.health += 10
		console.log('Char 1 used a heal ', this.char.health + ' health remaining!');
	},
	heal2(){//heals character two by 10 health
		this.char2.health += 10
		console.log('Char 2 used a heal ', this.char2.health + ' health remaining!');
	},
	endRound(){//if timer reaches zero end countdown and display alert statnig round is over
		if(this.time === 0){
				return true
				clearInterval(interval)
				alert('Round over')
			}
	}
}

//property to check if player is blocking before every attack stage
//if you isBlocking = true then half damage taken from incoming attack
























$('#form1').on('submit', () => {
	event.preventDefault();
	game.start1(name);
	
})
$('#form2').on('submit', () => {
	event.preventDefault();
	game.start2(name);
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