define(['piece'], function(Piece) {
	'use strict';

	// Extends Piece

	// Constructor
	function King(){

		// Call the parent class constructor
		Piece.call(this);
	
	}

	// Extend the Piece class
	King.prototype = Object.create(Piece.prototype);

	// Add new properties
	King.prototype.moves = [
		{
			x: '+1',
			y: '+1',
			conditions: ['notFriendlyOccupied', 'notAttackable'],
			repeating: false
		},
		{
			x: '+1',
			y: '',
			conditions: ['notFriendlyOccupied', 'notAttackable'],
			repeating: false
		},
		{
			x: '+1',
			y: '-1',
			conditions: ['notFriendlyOccupied', 'notAttackable'],
			repeating: false
		},
		{
			x: '',
			y: '+1',
			conditions: ['notFriendlyOccupied', 'notAttackable'],
			repeating: false
		},
		{
			x: '',
			y: '-1',
			conditions: ['notFriendlyOccupied', 'notAttackable'],
			repeating: false
		},
		{
			x: '-1',
			y: '',
			conditions: ['notFriendlyOccupied', 'notAttackable'],
			repeating: false
		},
		{
			x: '-1',
			y: '+1',
			conditions: ['notFriendlyOccupied', 'notAttackable'],
			repeating: false
		},
		{
			x: '-1',
			y: '-1',
			conditions: ['notFriendlyOccupied', 'notAttackable'],
			repeating: false
		}
	];

	return King;
});