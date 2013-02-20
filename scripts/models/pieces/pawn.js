define(['piece'], function(Piece) {
	'use strict';

	// Extends Piece

	// Constructor
	function Pawn(){

		// Call the parent class constructor
		Piece.call(this);
	
	}

	// Extend the Piece class
	Pawn.prototype = Object.create(Piece.prototype);

	// Add new properties
	Pawn.prototype.moves = [
		{
			name: 'diagonal attack one',
			x: '+1',
			y: '-1',
			conditions: ['colorIsWhite', 'enemyOccupied'],
			repeating: false
		},
		{
			name: 'diagonal attack two',
			x: '-1',
			y: '-1',
			conditions: ['colorIsWhite', 'enemyOccupied'],
			repeating: false
		},
		{
			name: 'forward move one',
			x: '',
			y: '-1',
			conditions: ['tileNotOccupied', 'colorIsWhite'],
			repeating: false
		},
		{
			name: 'forward move two',
			x: '',
			y: '-2',
			conditions: ['hasNotMoved', 'tileNotOccupied', 'colorIsWhite'],
			repeating: false
		},

		{
			name: 'diagonal attack one',
			x: '+1',
			y: '+1',
			conditions: ['colorIsBlack', 'enemyOccupied'],
			repeating: false
		},
		{
			name: 'diagonal attack two',
			x: '-1',
			y: '+1',
			conditions: ['colorIsBlack', 'enemyOccupied'],
			repeating: false
		},
		{
			name: 'forward move one',
			x: '',
			y: '+1',
			conditions: ['tileNotOccupied', 'colorIsBlack'],
			repeating: false
		},
		{
			name: 'forward move two',
			x: '',
			y: '+2',
			conditions: ['hasNotMoved', 'tileNotOccupied', 'colorIsBlack'],
			repeating: false
		}
	];

	return Pawn;
});