var express = require('express');
var fs = require('fs');
var request = require ('request');
var cheerio = require ('cheerio');
var app = express();

var resultat = [];
var i=1;
while (i<36)
{
	var page = i.toString();
	url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-';
	var result = url.concat(i);
	request(result, function (error, response, html) {
		if (!error) {
			var $ = cheerio.load(html);
			
			var title;
			
			$('.poi_card-display-title').filter(function () {
				var titre = $(this);
				title = titre.text().trim();
				var json = {title: ""};
				json.title = title;
				resultat.push(json);
			})
		}
		fs.writeFile('output.json', JSON.stringify(resultat, null, 4), function(err){
			})
	})
	i++;
}
console.log('File successfully written! - Check your projet directory for the output !');


