const apiKey = 'e13626d03d8e4c03ac07f95541b3091b'; // wmata api key - development only
const corsProxy = 'https://api.allorigins.win/get?url='; // fixing issue with cors - development only
const wmataUrl = 'https://api.wmata.com/Rail.svc/json/';
const defaultLine = 'BL';

const select = document.getElementById('select-lines');
const flowchart = document.getElementById('flow-chart');

async function fetchLines() {
	/*
	// cors problem, use then and catch to see problem
	let headers = {};
	fetch(wmataUrl, { method:'GET', mode:'cors', headers:headers })
	.then((resp) => {
		if(!resp.ok) { throw new Error(resp.err); }
		return resp.json();
	}).then(data => console.log(data))
	.catch(function error() {
		console.log('error');
	});*/
	try {
		// working now so use await instead
		//const headers = { 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS' };
		const response = await fetch(`${corsProxy}${wmataUrl}jLines?api_key=${apiKey}`);
		const data = await response.json(); // seems to have returned an object with a string and object
		const dataString = data.contents; // need to get the string portion of the data
		const linesObject = JSON.parse((dataString)); // convert the string to an object
		const lines = linesObject.Lines; // get each line in the object to an array
		displaySelectLines(lines);
	} catch (err) {
		console.error('Error fetching data.', err);
	}
}

async function fetchStations(lineCode) {
	const response = await fetch(`${corsProxy}${wmataUrl}jStations?api_key=${apiKey}`);
	//const response = await fetch(`${corsProxy}${wmataUrl}jStations?jLineCode=${lineCode}&api_key=${apiKey}`); // not working with test api
	const data = await response.json(); // same thing again
	const dataString = data.contents; // same thing again
	const stationsObject = JSON.parse((dataString)); // same thing again
	// get stations in the current line (could have multiple lines)
	const stations = stationsObject.Stations.filter(f => (lineCode === f.LineCode1 || lineCode === f.LineCode2 || lineCode === f.LineCode3 || lineCode === f.LineCode4));
	return stations;
}

function displaySelectLines(lines) {
	lines.forEach(line => {
		// might be better to just create the element and append it to the dom
		const option = document.createElement('option');
		option.value = line.LineCode;
		option.textContent = line.DisplayName;
		select.appendChild(option);
	});
}

//function displayStations(line, station, index, length) {
function displayStations(line, stations) {
	// onclick doesn't work when scripted
	// that is WHY I always use addEventListeners
	/*let html = `<div class='flow-col'>
		<div class='flow-card' onclick="goToStationPage(${station.Code})">
			<div class='flow-card-header'>
				<div class='flow-card-code line-${line.toLowerCase()}'>${station.Code}</div>
				<div class='flow-card-name'>${station.Name}</div>
			</div>
			<div class='flow-card-stop'>Stop <em>${index + 1}</em> / <b>${length}</b></div>
		</div>
	</div>`;
	if (index !== length - 1) {
		html += `<div class='flow-arrow'><img src='./assets/arrow.svg'/></div>`;
	}
	return html;*/
	flowchart.innerHTML = '';
	stations.forEach((station, index) => {
		const card = document.createElement('div');
		card.className = 'flow-card';
		card.innerHTML = `<div class='flow-card-header'>
		<div class='flow-card-code line-${line.toLowerCase()}'>${station.Code}</div>
		<div class='flow-card-name'>${station.Name}</div>
	</div><div class='flow-card-stop'>Stop <em>${index + 1}</em> / <b>${stations.length}</b></div>`;
		if (index !== length - 1) {
			card.innerHTML += `<div class='flow-arrow'><img src='./assets/arrow.svg'/></div>`;
		}
		card.addEventListener('click', () => {
			localStorage.setItem('stationCode', station.Code);
			window.location.href = `${window.location.origin}/station.html`;
		});
		flowchart.appendChild(card);
	});
}

select.addEventListener('change', async function () {
	const lineCode = this.value;
	if (lineCode) {
		const stations = await fetchStations(lineCode);
		displayStations(lineCode, stations);
		// not working with script
		//flowchart.innerHTML = stations.map((station, index) => displayStations(lineCode, station, index, stations.length)).join('');
	}
})

fetchLines();