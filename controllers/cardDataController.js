/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/cards
function index(req, res) {
  // send back all albums as JSON
  db.Card.find({}, function(err, allCards) {
    console.log("all cards", allCards);
    res.json(allCards);
  });
} //    db.Card.find

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

// DESTROY /api/cards
function destroy(req, res) {  // delete is a reserved word !!!
  // find one card by id, delete it, and send it back as JSON
  console.log("cardEditController.js recieved message from delete button")
  db.Card.findOneAndRemove({ _id: req.params.cardId }, function(err, foundCard){
    console.log("you just destroyed " + foundCard + " !!!");
    // note you could send just send 204, but we're sending 200 and the deleted entity
    res.json(foundCard);
});  //   db.Card.findOneAndRemove
}

// export public methods here
module.exports = {
  index: index,
  create: create,
  // show: show,
  destroy: destroy
//   update: update
};