const apiKey = '3a8c24a2c6be4190a53a8c7bbc8de0ac'; // wmata api key
const apiKey2 = 'ea075668d040468596c850fe90dc6723'; // wmata api key 2
const corsProxy = 'https://api.allorigins.win/get?url='; // fixing issue with cors
const wmataUrl = 'https://api.wmata.com/Rail.svc/json/';
const defaultLine = 'BL';

const select = document.getElementById('select-lines');
const flowchart = document.getElementById('flow-chart');

async function fetchLines() {
	try {
		//const response = await fetch(`${corsProxy}${wmataUrl}jLines?api_key=${apiKey}`);
		const response = await fetch(`${wmataUrl}jLines?api_key=${apiKey}`);
		const data = await response.json();
		const lines = data.Lines; // get each line in the object to an array
		displaySelectLines(lines);
	} catch (err) {
		console.error('Error fetching data.', err);
	}
}

async function fetchStations(lineCode) {
	const response = await fetch(`${wmataUrl}jStations?LineCode=${lineCode}&api_key=${apiKey}`);
	const data = await response.json();
	const stationsRaw = data.Stations;
	// get stations in the current line (could have multiple lines)
	const stations = stationsRaw.filter(f => (lineCode === f.LineCode1 || lineCode === f.LineCode2 || lineCode === f.LineCode3 || lineCode === f.LineCode4));
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

function displayStations(line, stations) {
	flowchart.innerHTML = '';
	stations.forEach((station, index) => {
		const card = document.createElement('div');
		card.className = 'flow-card';
		card.innerHTML = `<div class='flow-card-header'>
			<div class='flow-card-code line-${line.toLowerCase()}'>${station.Code}</div>
			<div class='flow-card-name'>${station.Name}</div>
		</div>
		<div class='flow-card-stop'>Stop <em>${index + 1}</em> / <b>${stations.length}</b></div>`;
		flowchart.appendChild(card);
		if (index !== stations.length - 1) {
			const arrow = document.createElement('div');
			arrow.className = 'flow-arrow';
			arrow.innerHTML = `<img src='./assets/arrow.svg'/>`;
			flowchart.appendChild(arrow);
		}
		card.addEventListener('click', () => {
			localStorage.setItem('stationCode', station.Code);
			window.location.href = `${window.location.origin}/station.html`;
		});
	});
}

select.addEventListener('change', async function () {
	const lineCode = this.value;
	if (lineCode) {
		const stations = await fetchStations(lineCode);
		displayStations(lineCode, stations);
	}
});

window.addEventListener('load', async function () {
	fetchLines();
	const stations = await fetchStations(defaultLine);
	displayStations(defaultLine, stations);
});