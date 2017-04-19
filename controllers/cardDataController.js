/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/cards
function index(req, res) {
  // send back all albums as JSON
  db.Card.find({}, function(err, allCards) {
    res.json(allACards);
  });

}

// export public methods here
module.exports = {
  index: index
//   create: create,
//   show: show,
//   destroy: destroy,
//   update: update
};