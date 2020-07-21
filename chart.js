window.onload = getGenres();

function getGenres() {
	// Select dropdown menun with 'genre' id
	var genreSelector = document.getElementById('genre');
	// Create new request option and fetch genres JSON object
	var request = new XMLHttpRequest();
	request.open('GET', 'genres.json');
	request.send();

	request.onload = function() {
		var response = JSON.parse(request.response);
		genres = request.response;
		// Loop through each entry in genres JSON object and append to dropdown menu
		for (var i = 0; i < response.length; i++) {
			var option = document.createElement('option');
			option.setAttribute('value', response[i]['genre']);
			option.innerHTML = response[i]['name'];
			genreSelector.appendChild(option);
		}
		retrieveData();
	}
}

function retrieveData() {
	clearTable();
	var url = buildURL();
	var request = new XMLHttpRequest();
	var parser = new DOMParser;
	request.open('GET', url);
	request.send();

	request.onload = function() {
		var xml = parser.parseFromString(request.response, "text/xml");
		images = getImages(xml);
		appendData(xml);
	}
}

function buildURL() {
	var menu = document.querySelector('.chartSelector');
	var selectChartType = document.getElementById('sel1').value;
	var selectGenre = document.getElementById('genre').value;
	var url;
	if (selectGenre === 'all') {
		url = 'https://itunes.apple.com/gb/rss/' + selectChartType + '/limit=50/explicit=true/xml';
	}
	else {
		url = 'https://itunes.apple.com/gb/rss/' + selectChartType + '/limit=50/genre=' + selectGenre + '/explicit=true/xml';
	}
	return url;
}

function clearTable() {
	var table = document.getElementById('chartTable');
	// Check if the table has any contents, clear if it does
	if (table.tBodies.length > 0) {
		table.removeChild(table.getElementsByTagName('tbody')[0]);
	}
}

// Filters out the highest quality images (height is 170px)
function getImages(xml) {
	var images = [];
	var imageList;
	if (xml.getElementsByTagName('image').length > 0) {
		imageList = xml.getElementsByTagName('image');
	}
	else {
		imageList = xml.getElementsByTagName('im:image');
	}
	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i].getAttribute('height') === '170') {
			images.push(imageList[i]);
		}
	}
	return images;
}

// Append all XML data to DOM
function appendData(data) {
	// Get entries from XML data and select table
	var xmlEntries = data.getElementsByTagName('entry');
	var table = document.getElementById("chartTable");

	for (var i = 0; i < xmlEntries.length; i++) {
		var row = table.insertRow(-1),
		    cell1 = row.insertCell(-1),
		    cell2 = row.insertCell(-1),
		    cell3 = row.insertCell(-1),
		    img = document.createElement('img'); img.setAttribute('src', images[i].innerHTML);
		    cell1.setAttribute('class', 'chartNumber');
		    cell3.setAttribute('class', 'chartText');

		// Song is in format <name> " - " <artist>, this splits them
		var song = xmlEntries[i].getElementsByTagName('title')[0].innerHTML.split(" - ")[0];
		var artist = xmlEntries[i].getElementsByTagName('title')[0].innerHTML.split(" - ")[1];
		var h2 = document.createElement('h2');
		var h3 = document.createElement('h3');

		h2.innerHTML = song;
		h3.innerHTML = artist;
		// This adds the chart position number to the table
		cell1.innerHTML = i + 1;
		// Append cells to table
		cell2.appendChild(img);
		cell3.appendChild(h2);
		cell3.appendChild(h3);

	}
}
