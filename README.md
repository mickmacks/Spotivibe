# Project 1 - Spotivibe

Our app integrates an internal API and MongoDB to create a website hosted on Heroku, address https://infinite-everglades-53281.herokuapp.com/.

Users are presented with cards, each with music playlists, that the user can create, edit or delete. Each Genre has unique background image and song.  

## Getting Started

Fork and Clone directly from the master branch. All the resources are available, minus the npm installs listed below (and as noted in the package.json file).

### Prerequisites

```
    body-parser: ^1.17.1,
    express: ^4.15.2,
    mongoose: ^4.9.5

```

### Installing

Enter terminal in the root npm/git initialized project folder and run 

```
npm install --save mongoose express body-parser

```

## Built With

* [Heroku](http://www.dropwizard.io/1.0.2/docs/) - The web hosting service used
* [Materialize](http://materializecss.com/) - CSS Framework

## Contributing

Please let us know if you have any questions or ideas for updates. You can reach us at example@site.com

## Bugs

1. Playing a new playlist doesn't pause the currently playing one.
2. Pausing the current playlist doesn't work.
3. Adding a new activity doesn't link image or audio file
4. When opening a form for the second time, the input title and input values overlap.
5. Pausing scrolls to top of page
6. Responsive materialize grid system: cards break easily and don't stack properly. (container, row, col classes)

## Future Goals

1. Figure out image animations or switch to video loops.
2. Connect spotify to activity cards.
3. Add search/sort/filter functionality to cards.
4. Use icons or color to separate genres.
5. Make edit and delete buttons more clear.
6. More instructional copy for how the site works, and what you get out of it.
7. Consider legibility of fonts, font sizes, font colors

## Authors

* **Mahmoud Bachir** - *Front End* - [mickmacks](https://github.com/mickmacks)
* **Michael Laird** - *Back End* - [mj-sfo](https://github.com/mj-sfo)

## License

This project is licensed under the MIT License.

## Acknowledgments

* Naoya - Scroll Down Demo: https://codepen.io/nxworld/pen/OyRrGy
* Samuel Thornton - Material Drop Shadows: https://codepen.io/sdthornton/pen/wBZdXq
