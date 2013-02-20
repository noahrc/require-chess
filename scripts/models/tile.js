define([], function() {
	'use strict';

	// Constructor
	function Tile(){
		this.occupied = false;
		this.canMoveTo = false;
	}

	return Tile;
});