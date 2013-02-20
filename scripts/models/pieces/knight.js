define(['piece'], function(Piece) {
	'use strict';

	// Extends Piece

	// Constructor
	function Knight(){

		// Call the parent class constructor
		Piece.call(this);
	
	}

	// Extend the Piece class
	Knight.prototype = Object.create(Piece.prototype);

	// Add new properties
	Knight.prototype.moves = [
		{
			x: '+1',
			y: '+2',
			conditions: ['notFriendlyOccupied'],
			repeating: false
		},
		{
			x: '+1',
			y: '-2',
			conditions: ['notFriendlyOccupied'],
			repeating: false
		},
		{
			x: '+2',
			y: '+1',
			conditions: ['notFriendlyOccupied'],
			repeating: false
		},
		{
			x: '+2',
			y: '-1',
			conditions: ['notFriendlyOccupied'],
			repeating: false
		},
		{
			x: '-1',
			y: '+2',
			conditions: ['notFriendlyOccupied'],
			repeating: false
		},
		{
			x: '-1',
			y: '-2',
			conditions: ['notFriendlyOccupied'],
			repeating: false
		},
		{
			x: '-2',
			y: '+1',
			conditions: ['notFriendlyOccupied'],
			repeating: false
		},
		{
			x: '-2',
			y: '-1',
			conditions: ['notFriendlyOccupied'],
			repeating: false
		}
	];

	return Knight;
});