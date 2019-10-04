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
        const $char2Name = $('#input-box2').val();
        this.char = new Character2($char2Name);
        const $name2 = $('#charName');
        $('#charName').html($('#input-box2').val());
        $name2.text(`Name: ${this.char.name}`)

	},
	//the set stats function will control the damage ranges and ultimate ability timing of each characteer
	setTimer(){
		$timer = $('h2')
		const interval = setInterval(() => {
			this.time --
			$timer.text(`Timer: ${this.time}`);
		}, 1000)
	}
}

























$('form').on('submit', () => {
	event.preventDefault();
	$('#tomName').html();
	game.start(name)
	game.setTimer()
	
})

