require.config({
  baseUrl: 'scripts',
  paths: {
  	inheritance: 'vendor/SimpleClassInheritance',
	boardview: 'views/board',
	boardSetup: 'models/boardSetup',
	tile: 'models/tile',
	piece: 'models/piece',
	pawn: 'models/pieces/pawn',
	king: 'models/pieces/king',
	queen: 'models/pieces/queen',
	knight: 'models/pieces/knight',
	bishop: 'models/pieces/bishop',
	rook: 'models/pieces/rook',
	hasNotMoved: 'conditions/hasNotMoved',
	tileNotOccupied: 'conditions/tileNotOccupied',
	colorIsWhite: 'conditions/colorIsWhite',
	colorIsBlack: 'conditions/colorIsBlack',
	enemyOccupied: 'conditions/enemyOccupied',
	notFriendlyOccupied: 'conditions/notFriendlyOccupied',
	notAttackable: 'conditions/notAttackable'
  }
});
 
require(['game', 'boardview', 'boardSetup', 'piece'], function(Game, BoardView, BoardSetup){
	
	Game.addBoardView(BoardView);
	Game.addBoardSetup(BoardSetup);
	
});