define(['piece'], function(Piece) {
	'use strict';

	// Extends Piece

	// Constructor
	function Rook(){

		// Call the parent class constructor
		Piece.call(this);
	
	}

	// Extend the Piece class
	Rook.prototype = Object.create(Piece.prototype);

	// Add new properties
	Rook.prototype.moves = [
		{
			x: '',
			y: '+1',
			conditions: ['notFriendlyOccupied'],
			repeating: true
		},
		
		{
			x: '',
			y: '-1',
			conditions: ['notFriendlyOccupied'],
			repeating: true
		},
		{
			x: '-1',
			y: '',
			conditions: ['notFriendlyOccupied'],
			repeating: true
		},
		{
			x: '+1',
			y: '',
			conditions: ['notFriendlyOccupied'],
			repeating: true
		}
	];

	return Rook;
});