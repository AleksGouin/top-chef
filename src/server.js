var express = require('express');
var fs = require('fs');
var request = require ('request');
var cheerio = require ('cheerio');
var app = express();
var Promise = require('promise');
var https = require('https');


var restos = [];

function scrapping(){
	return new Promise (function(resolve, reject) {
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
					
					$('.poi_card-display-title').each(function () {
						var titre = $(this);
						title = titre.text();
						var json = {title: ""};
						json.title = title;
						resultat.push(json);
						restos.push(title)
						
					})
					setTimeout(function() {return resolve();}, 0)
				}
				fs.writeFile('output.json', JSON.stringify(resultat, null, 4), function(err){
					})
			})
			i++;
		}
	})
}

function listRestos(){
	console.log(restos[0])
}

scrapping().then(listRestos)

 
request.get('https://m.lafourchette.com/api/restaurant-prediction?name=quinsou', (err, res, body) => {
  let json = JSON.parse(body);
  console.log(json[0].id)
});








