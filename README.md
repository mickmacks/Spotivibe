# Spotivibe
Project 1 - Our app integrates an internal API and MongoDB to create a website hosted on Heroku, address https://infinite-everglades-53281.herokuapp.com/.

users are presented with cards, each with music playlists, that the user can edit, add or delete.  Each Genre has unique background image, color scheme and song.  

Models create schemas for cards and genres tables in mongoDB. Public/scrips/app.js allow user CRUD power over cards, which app.js appends to website. controllers/cardDataController.js has proper routes for messaging between website and DB.
