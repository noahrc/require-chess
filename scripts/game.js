define(['tile', 'piece', 'king'], function(Tile, Piece, King) {
	'use strict';

	var G = null; // Game instance, available after init()

	var players, playerTurn, selectedPiece, activeTiles;

	players = ['white', 'black'];
	playerTurn = 0; // index of the current player
	activeTiles = [];

	// Constructor
	function Game(){
		this.init();
	}

	Game.prototype = {
		init: function(){
			this.pieces = [];
			this.tiles = [];
		},

		addBoardView: function(BoardView){
			var stage = document.querySelector('#game-board');
			G.boardView = new BoardView(stage);
		},

		addBoardSetup: function(BoardSetup){
			G.boardView.renderPieces(BoardSetup.pieces);
			G.updatePlayerTurn();
			setTimeout(G.findMovablePieces, 1000); // this should be done differently
		},

		registerTile: function(element, xPos, yPos, color){
			var tile = new Tile();

			// Create a 2D array of tiles
			if(!G.tiles[xPos]) { G.tiles[xPos] = []; }
			G.tiles[xPos][yPos] = element;
			element.model = tile;
			tile.color = color;
			tile.xPos = xPos;
			tile.yPos = yPos;
		},

		tileClicked: function(e){
			
			// If a piece is not selected, do nothing
			if(!selectedPiece) { return; }
			
			var tileElement = e.srcElement;
			var tileModel = tileElement.model;
			
			// If this tile can't be moved to, do nothing
			if(!tileModel.canMoveTo) { return; }

			G.movePiece(selectedPiece, tileElement);
		},

		registerPiece: function(piece, data){
			
			// Load the model of the new piece element
			require([data.type], function(PieceModel){
				var pieceModel = new PieceModel();
				piece.model = pieceModel;
				G.pieces.push(piece);
				
				// Add piece model properties from data
				for (var datum in data) {
					piece.model[datum] = data[datum];
				}

				// set the tile to occupied
				var x = piece.model.xPos;
				var y = piece.model.yPos;
				var tile = G.tiles[x][y];
				tile.model.occupied = piece;
				piece.model.tile = tile;
			});

		},

		pieceClicked: function(e){
			
			var piece = e.srcElement;
			
			// Option 1. A piece is currently selected to move
			if(selectedPiece) {

				// If this piece can't be attacked, do nothing
				if(!piece.model.tile.model.canMoveTo) { return; }

				// Otherwise, move the piece
				G.movePiece(selectedPiece, piece.model.tile);
				return;
			}

			// Option 2. A piece is not selected to move

			// If this piece isn't the current player's, do nothing
			if(piece.model.color !== players[playerTurn]) { return; }
			
			// If this piece is pinned, do nothing
			if(piece.model.tile.model.pinned) {return;}

			// If this piece can move, select this piece
			// Once selected, the player must move that piece
			if(piece.model.canMove) {
				selectedPiece = piece;
				G.boardView.selectPiece(selectedPiece);
				G.calculatePossibleMoves(piece, 'activate');
			}
		},

		calculatePossibleMoves: function(piece, action){
			
			for (var i = 0; i < piece.model.moves.length; i++) {
				var move = piece.model.moves[i];
				var newXPos = eval(piece.model.xPos + move.x);
				var newYPos = eval(piece.model.yPos + move.y);
				var newTile = G.tiles[newXPos] ? G.tiles[newXPos][newYPos] : null;
				
				// If this move is to a tile on the game board, evaluate the move conditions
				if(newTile) {
					G.evaluateMoveConditions(move, piece, newTile, action);
				}
			}
		},

		// Check if a piece can move to a tile based on its move conditions
		// Also used to check for pins
		evaluateMoveConditions: function(move, piece, tile, action, blockerTile){
			
			require(move.conditions, function() {

				var valid = true;

				// Evaluate all conditions for the move
				for (var i = 0; i < arguments.length; i++) {
					var condition = arguments[i];
					var obj; // a piece or tile to move to

					switch(condition.obj) {
						case 'self':
							obj = piece;
							break;

						case 'tile':
							obj = tile;
							break;

						case 'piece':
							obj = tile.model.occupied;
							break;
					}

					// Check that the target object's properties meet the move conditions
					if(obj) {
						
						var prop = condition.property;
						if(condition.mustBe) {
							if(obj.model[prop] !== condition.mustBe) {
								valid = false;
							}
						}

						if(condition.compareSelf){
							switch(condition.compareSelf) {
								case 'mustBeSame':
									if(obj.model[prop] !== piece.model[prop]) {
										valid = false;
									}
									break;
							
								case 'mustBeDifferent':
									
									if(obj.model[prop] === piece.model[prop]) {
										valid = false;
									}
									break;
							}
						}
					} else{
						if(!condition.canBeEmpty) {
							valid = false;
						}
					}
					
				}

				// If this is a valid move, perform the action
				if(valid) {
					switch(action) {

						// highlight a tile to show it can be moved to
						case  'activate' :
							G.activateTile(tile);
							break;
						
						// Flag that this tile can be attacked
						case 'markAttackable' :
							tile.model.attackable = true;
							break;

						// Flag that this piece can move
						case 'pieceCanMove' :
							piece.model.canMove = true;
							break;

						// If there is a king behind a blocking piece, flag the blocking piece as pinned
						case 'checkForPin' :
							if (tile.model.occupied.model instanceof King) {
								blockerTile.model.pinned = true;
							}
							break;
					}

					// Check for check
					if(action !== 'checkForPin' && tile.model.occupied.model instanceof King) {
						alert('Check');
					}

					// Check the next tile if this is a repeating (ray) move
					if(move.repeating){

						// Continue if the tile isn't occupied or if it is, but action is not 'activate' or 'pieceCanMove'
						if( !tile.model.occupied || (tile.model.occupied && action !== 'activate' && action !== 'pieceCanMove') ) {
							
							// If tile is occupied, mark it as blocked and check behind for the King
							if(tile.model.occupied) {
								blockerTile = tile;
								action = 'checkForPin';
							}

							var newXPos = eval(tile.model.xPos + move.x);
							var newYPos = eval(tile.model.yPos + move.y);
							var newTile = G.tiles[newXPos] ? G.tiles[newXPos][newYPos] : null;
							if(newTile) {
								G.evaluateMoveConditions(move, piece, newTile, action, blockerTile);
							}
						}
					}
				}
			});
		},

		activateTile: function(tile){
			G.boardView.highlightTile(tile);
			activeTiles.push(tile);
			tile.model.canMoveTo = true;
		},

		// Iterate through all pieces and perfrom an action if their color equals or doesn't equal a given value
		checkAllPieces: function(color, equals, action ){
			for (var i = 0; i < G.pieces.length; i++) {
				var piece = G.pieces[i];
				if( ( equals && piece.model.color === color ) || (!equals && piece.model.color !== color)) {
						G.calculatePossibleMoves(piece, action);
				}
			}
		},

		// Find the tiles that can be attacked by the opponent
		findAttackableTiles: function(){
			G.checkAllPieces(players[playerTurn], false, 'markAttackable');
		},

		// Find and flag the pieces that can move
		findMovablePieces: function(){
			G.checkAllPieces(players[playerTurn], true, 'pieceCanMove');
		},

		clearFlags: function(){
			for (var i = 0; i < G.tiles.length; i++) {
				for (var a = 0; a < G.tiles[i].length; a++) {
					var tile = G.tiles[i][a];
					tile.model.attackable = false;
					tile.model.pinned = false;
					if( tile.model.occupied ) tile.model.occupied.model.canMove = null;
				}
			}
		},

		// Move a piece to a tile
		movePiece: function(piece, tile) {
			
			// Update models
			piece.model.xPos = tile.model.xPos;
			piece.model.yPos = tile.model.yPos;
			piece.model.tile.model.occupied = false;
			piece.model.tile.canMoveTo = false;
			piece.model.hasNotMoved = false;

			selectedPiece = false;

			// Render
			G.boardView.renderPiece(piece);
			G.boardView.deselectPiece(piece);
			G.boardView.deHighlightTiles(activeTiles);
			G.switchPlayerTurn();

			// If there is an occupying piece, remove it
			if(tile.model.occupied) {
				G.boardView.removePiece(tile.model.occupied);
			}

			tile.model.occupied = piece;
			piece.model.tile = tile;
			
		},

		updatePlayerTurn: function() {
			var p =document.getElementById('player-turn');

			p.innerHTML = players[playerTurn];
		},

		switchPlayerTurn: function() {
			players[playerTurn+1] ? playerTurn++ : playerTurn = 0;
			G.clearFlags();
			G.findAttackableTiles();
			G.findMovablePieces();
			G.updatePlayerTurn();
		}

	};

	// Game returns an instance of itself (Singleton)
	Game.getInstance = function(){
        if(G === null){
            G = new Game();
        }
        return G;
    };

	return Game.getInstance();
});