const apiKey = '3a8c24a2c6be4190a53a8c7bbc8de0ac'; // wmata api key
const apiKey2 = 'ea075668d040468596c850fe90dc6723'; // wmata api key 2
const corsProxy = 'https://api.allorigins.win/get?url='; // fixing issue with cors
const wmataUrl = 'https://api.wmata.com/Rail.svc/json/';

const button = document.getElementById('back-btn');
const station = document.getElementById('station');
const timetable = document.getElementById('timetable');
const stationCode = localStorage.getItem('stationCode');

async function fetchStationInfo() {
	const response = await fetch(`${wmataUrl}jStationInfo?StationCode=${stationCode}&api_key=${apiKey}`);
	const dataInfo = await response.json();
	const line2 = `<div class="station-lines-code line-${dataInfo.LineCode2?.toLowerCase()}">${dataInfo.LineCode2}</div>`;
	const line3 = `<div class="station-lines-code line-${dataInfo.LineCode3?.toLowerCase()}">${dataInfo.LineCode2}</div>`;
	const line4 = `<div class="station-lines-code line-${dataInfo.LineCode4?.toLowerCase()}">${dataInfo.LineCode2}</div>`;
	station.innerHTML = `<h1>${dataInfo.Code}${dataInfo.Name}</h1>
	<h2>${dataInfo.Address.Street}, ${dataInfo.Address.City}, ${dataInfo.Address.State} ${dataInfo.Address.Zip}</h2>
	<div class="station-lines">
	<div class="station-lines-code line-${dataInfo.LineCode1.toLowerCase()}">${dataInfo.LineCode1}</div>
	${dataInfo.LineCode2 !== null ? line2 : ''}
	${dataInfo.LineCode3 !== null ? line3 : ''}
	${dataInfo.LineCode4 !== null ? line4 : ''}
	</div>`;
	const response2 = await fetch(`${wmataUrl}jStationTimes?StationCode=${stationCode}&api_key=${apiKey}`);
	const dataTimes = await response2.json();
	displayTimeTable(dataTimes.StationTimes[0]);
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function displayTimeTable(times) {
	console.log(times)
	for(let i = 0; i < DAYS.length - 1; i++) {
		let first = ''; let = last = '';
		let length = times[DAYS[i]].FirstTrains.length;
		for(let j = 0; j < length; j++) {
			first += times[DAYS[i]].FirstTrains[j].Time;
			last += times[DAYS[i]].LastTrains[j].Time;
			if(j < length - 1) {
				first += ', ';
				last += ', ';
			}
		}
		timetable.innerHTML += `<tr>
			<th class="timetable-day" rowspan='3'>${DAYS[i]}</th>
			<th>Opening Time</th>
			<td>${times[DAYS[i]].OpeningTime}</td>
		</tr>
		<tr>
			<th>First Trains</th>
			<td>${first}</td>
		</tr>
		<tr>
			<th>Last Trains</th>
			<td>${last}</td>
		</tr>`;
	}
}

button.addEventListener('click', function () {
	window.location.href = `${window.location.origin}`;
})

fetchStationInfo();