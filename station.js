const apiKey = 'e13626d03d8e4c03ac07f95541b3091b'; // wmata api key - development only
const corsProxy = 'https://api.allorigins.win/get?url='; // fixing issue with cors - development only
const wmataUrl = 'https://api.wmata.com/Rail.svc/json/';

const station = document.getElementById('station');
const stationCode = localStorage.getItem('stationCode');

async function fetchStationInfo() {
	const response = await fetch(`${corsProxy}${wmataUrl}jStationInfo?StationCode=${stationCode}&api_key=${apiKey}`);
	//const response = await fetch(`${corsProxy}${wmataUrl}jStations?jLineCode=${lineCode}&api_key=${apiKey}`); // not working with test api
	const data = await response.json(); // same thing again
	const dataString = data.contents; // same thing again
	const stationsObject = JSON.parse((dataString)); // same thing again
	// get stations in the current line (could have multiple lines)
	console.log(data)
}

fetchStationInfo();