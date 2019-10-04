console.log('start');

//Classes for each type of choosable character will hold properties unique to that character
class Character1 {
	constructor(name) {
		this.name = name,
		this.health = 100,
		this.attackValue = Math.floor(Math.random() * (10 - 5)) + 5;
		console.log(this.attackValue);
		this.attackSpeed = 1.5,
		this.ultimateValue = Math.floor(Math.random() * (30 - 20)) + 20;
		console.log(this.health);	
	}

}


class Character2 {
	constructor(name) {
		this.name = name,
		this.health = 125,
		this.attackValue = Math.floor(Math.random() * (12 - 7)) + 7;
		this.attackSpeed = 1,
		this.ultimateValue = Math.floor(Math.random() * (35 - 25)) + 25

	}

}


// class Character3 {
// 	constructor(name) {
// 		this.name = name,
// 		this.health = 150,
// 		this.attackValue = Math.floor(Math.random() * (18 - 14)) + 14;
// 		this.attackSpeed = .5,
// 		this.ultimateValue = Math.floor(Math.random() * (50 - 40)) + 40;

// 	}

// }

//game object will hold all functions for operation the game
const game  = {
	time : 30,
	char: null,
	//start will take input to name each character
	start(name){
		const $charName = $('#input-box').val();
        this.char = new Character1($charName);
        const $name = $('#charName');
        $('#charName').html($('#input-box').val());
        $name.text(`Name: ${this.char.name}`)
        console.log(this.char);
      	//instantiate char2  
        const $char2Name = $('#input-box2').val();
        this.char2 = new Character2($char2Name);
        const $name2 = $('#charName');
        $('#charName').html($('#input-box2').val());
        $name2.text(`Name: ${this.char.name}`)
        console.log(this.char2);
	},
	//the set stats function will control the damage ranges and ultimate ability timing of each characteer
	setTimer(){
		$timer = $('h2')
		const interval = setInterval(() => {
			this.time -=1
			$timer.text(`Timer: ${this.time}`);
			if(this.time === 0){
				clearInterval(interval)
			}
		}, 1000)
	},
	basicAttack(){
		this.char2.health -= this.char.attackValue;
		console.log('Char 1 attacked with ', this.char.attackValue + ' damage!');
		console.log('Char 2 has ', this.char2.health + ' health remaining!');
	},
	basicAttack2(){
		this.char.health -= this.char2.attackValue;
		console.log('Char 2 attacked with ', this.char2.attackValue + ' damage');
		console.log('Char 1 has ', this.char.health + ' health remaining!');
	},
	ultimateAttack1(){
		this.char2.health -= this.char.ultimateValue;
		console.log('Char 1 used his ultimate for ', this.char.ultimateValue + ' damage');
		console.log('Char 2 has ', this.char2.health + ' health remaining!');
	},
	ultimateAttack2(){
		this.char.health -= this.char2.ultimateValue;
		console.log('Char 2 used his ultimate for ', this.char2.ultimateValue + ' damage');
		console.log('Chat 1 has ', this.char.health + ' health remaining!');
	}
	// endGame(){
	// 	if(this.char.health <= 0) {
	// 		alert('Game over player one lost')
	// 	}	else if(this.char2.health <= 0){
	// 		alert('Game over player two lost')
	// 	}
	// }
}

























$('form').on('submit', () => {
	event.preventDefault();
	$('#tomName').html();
	game.start(name)
	game.setTimer()
	
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
