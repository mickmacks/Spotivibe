/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/cards
function index(req, res) {
  // send back all albums as JSON
  db.Card.find({}, function(err, allCards) {
    res.json(allCards);
  });

}

// CREATE /api/cards
function create(req, res) {

	console.log('body is:', req.body);

	// Create a new database entry
	db.Card.create(req.body, function(err, card) {
		if (err) { console.log('error', err); }
		console.log(card);
		res.json(card);
	});

}

// export public methods here
module.exports = {
  index: index,
  create: create
//   show: show,
//   destroy: destroy,
//   update: update
};