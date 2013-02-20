define([], function() {
	'use strict';

	var xlinkNS = 'http://www.w3.org/1999/xlink',
		svgNS = 'http://www.w3.org/2000/svg';

	// Constructor
	function PieceView(element){
		this.element = element;
		this.init();
	}

	PieceView.prototype = {
		init: function(){
			this.renderTiles();
		},
		
		renderPiece: function(piece) {
			var svgimg = document.createElementNS(svgNS, 'image');
			svgimg.setAttributeNS(xlinkNS,'xlink:href', 'images/' + piece.color + piece.type + '.png');
			svgimg.setAttribute('width', tileSize);
			svgimg.setAttribute('height', tileSize);
			svgimg.setAttribute('x', tileSize * piece.xPos);
			svgimg.setAttribute('y', tileSize * piece.yPos);
			this.element.appendChild(svgimg);
			svgimg.addEventListener('click', this.pieceClicked);
		},

		pieceClicked: function(e) {
			var el = e.srcElement;
			el.setAttribute('opacity', .2);
		},

	};

	return PieceView;
});