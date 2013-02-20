define(['piece'], function(Piece) {
	'use strict';

	// Extends Piece

	// Constructor
	function Bishop(){

		// Call the parent class constructor
		Piece.call(this);
	
	}

	// Extend the Piece class
	Bishop.prototype = Object.create(Piece.prototype);

	// Add new properties
	Bishop.prototype.moves = [
		{
			x: '+1',
			y: '+1',
			conditions: ['notFriendlyOccupied'],
			repeating: true
		},
		
		{
			x: '-1',
			y: '-1',
			conditions: ['notFriendlyOccupied'],
			repeating: true
		},
		{
			x: '+1',
			y: '-1',
			conditions: ['notFriendlyOccupied'],
			repeating: true
		},
		{
			x: '-1',
			y: '+1',
			conditions: ['notFriendlyOccupied'],
			repeating: true
		}
	];

	return Bishop;
});