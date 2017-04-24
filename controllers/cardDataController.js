/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/cards
function index(req, res) {
  // send back all albums as JSON
  db.Card.find({}, function(err, allCards) {
    // console.log("all cards", allCards);   // now trying to print all genres instead
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

// SHOW /api/cards/:_id
function show(req, res) {

  // find one card by id and send it back as JSON
  db.Card.findById(req.params.cardId, function(err, card) {
    if(err) { console.log('error', err); }
    console.log('responding with (cardDataController)', card);
    res.json(card);
  });
}

// UPDATE /api/cards/:_id
function update(req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
  console.log('updating with data', req.body);
  db.Card.findById(req.params.cardId, function(err, foundCard) {
    if(err) { console.log('error', err); }

    foundCard.playlistName = req.body.playlistName;
    foundCard.genre = req.body.genre;
    foundCard.playlistLink = req.body.playlistLink;
    foundCard.artistNames = req.body.artistNames;
    foundCard.owner = req.body.owner;

    foundCard.save(function(err, savedCard) {
      if(err) { console.log('saving altered card failed'); }
      res.json(savedCard);
    });
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
  show: show,
  destroy: destroy,
  update: update
};
