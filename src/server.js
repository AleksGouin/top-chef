var express = require('express');
var fs = require('fs');
var request = require ('request');
var cheerio = require ('cheerio');
var app = express();
var Promise = require('promise');
var https = require('https');


var restos = []; // On définit les variables globales qui vont nous être uties
var ids = [];
var promos = [];

function scrapping(){ //On scrappe le site michelin
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

function listRestos(){ //on affiche les restaurants que l'on a scrappé
	
	var val;
	for (var i in restos) { // je ne comprends pas pourquoi des fois ça marche et des fois non
		val = restos[i];
		console.log(val);
	} 
}

function recupId(restaurants) { //on récupère les id des restaurants que l'on a scrappé
	
	for(var i in restaurants) {
		
		var url = 'https://m.lafourchette.com/api/restaurant-prediction?name='; //on utilise l'api de la fourchette afin de trouver l'id du restaurant
		var rechercher = url.concat(restaurants[i])
		request.get(rechercher, (err, res, body) => {
			if (!err) {
			let json = JSON.parse(body); //le document que l'on récupère est un Json
			ids.push(json[0].id);	
			}
		})
	}
}

function recupPromo(listId, restaurants){
	for (var i in restaurants) {
		var promoResto = [];
		
		var url = 'https://www.lafourchette.com/restaurant/'
		var ad1 = url.concat(restaurants[i]) //on peut entrer le nom du restaurant avec les espaces dans la barre de recherches
		var adfinale = ad1.concat(listId[i]) // ainsi on a l'adresse totale
		
		request(result, function (error, response, html) {
				if (!error) {
					var $ = cheerio.load(html);
					
					var promo;
					
					$('.saleType-title').each(function () { //pour chaque resto on regarde toutes les promos possibles
						var promo = $(this);
						promo = promo.text();
						promoResto.push(promo); // on ajoute la promo a la liste des promos de l'établissement
						
						
					})
					setTimeout(function() {return resolve();}, 0)
				}
				fs.writeFile('output.json', JSON.stringify(resultat, null, 4), function(err){
					})
			})
		
	}
	
}

scrapping().then(listRestos)











