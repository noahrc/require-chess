define([], function() {
	'use strict';

	// Parent class for all pieces

	// Constructor
	function Piece(){}

	Piece.prototype = {
		moves: [],
		xPos: null,
		yPos: null,
		selected: false,
		hasNotMoved: true
	};

	return Piece;
});