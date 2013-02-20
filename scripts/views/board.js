define(['game'], function(Game) {
	'use strict';

	var boardWidth, boardHeight, tileSize, tileColors, tileColorIndex, moveTileColor, xlinkNS, svgNS;
		
	// Namespaces for svgs
	xlinkNS = 'http://www.w3.org/1999/xlink',
	svgNS = 'http://www.w3.org/2000/svg';

	// Default settings
	boardWidth = 8;
	boardHeight = 8;
	tileSize = 60;
	tileColors = ['white', 'gray'];
	moveTileColor = 'cyan';
	tileColorIndex = 0; // Represents the color of the tile starting from the top left

	// Constructor
	function BoardView(element){
		this.element = element;
		this.init();
	}

	BoardView.prototype = {
		
		init: function(){
			this.renderTiles();
		},

		renderTiles: function(){
			for (var i = 0; i < boardWidth; i++){
				for(var a = 0; a < boardHeight; a++){
					this.addTile(tileColorIndex++ % tileColors.length, i, a);
				}
				tileColorIndex++;
			}
		},

		addTile: function(colorIndex, xPos, yPos){
			var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			rect.setAttribute('fill',  tileColors[colorIndex]);
			rect.setAttribute('width', tileSize);
			rect.setAttribute('height', tileSize);
			rect.setAttribute('x', tileSize * xPos);
			rect.setAttribute('y', tileSize * yPos);
			this.element.appendChild(rect);
			Game.registerTile(rect, xPos, yPos, tileColors[colorIndex]);
			rect.addEventListener('click', Game.tileClicked);
		},

		highlightTile: function(tileElement) {
			tileElement.setAttribute('fill', moveTileColor);
		},

		deHighlightTiles: function(tiles) {
			for(var i = 0; i<tiles.length; i++) {
				tiles[i].setAttribute('fill', tiles[i].model.color);
			}
		},

		renderPieces: function(pieces){
			for (var i=0; i < pieces.length; i++) {
				this.addPiece(pieces[i]);
			}
		},

		addPiece: function(piece) {
			var svgimg = document.createElementNS(svgNS, 'image');
			svgimg.setAttributeNS(xlinkNS,'xlink:href', 'images/' + piece.color + piece.type + '.png');
			svgimg.setAttribute('width', tileSize);
			svgimg.setAttribute('height', tileSize);
			svgimg.setAttribute('x', tileSize * piece.xPos);
			svgimg.setAttribute('y', tileSize * piece.yPos);
			this.element.appendChild(svgimg);
			Game.registerPiece(svgimg, piece);
			svgimg.addEventListener('click', Game.pieceClicked);
		},

		renderPiece: function(piece) {
			piece.setAttribute('x', piece.model.xPos * tileSize);
			piece.setAttribute('y', piece.model.yPos * tileSize);
		},

		selectPiece: function(pieceElement) {
			pieceElement.setAttribute('opacity', '.2');
		},

		deselectPiece: function(pieceElement) {
			pieceElement.setAttribute('opacity', '1');
		},

		removePiece: function(piece) {
			piece.remove();
			console.log('remove');
		}

	};

	return BoardView;
});