const apiKey = '3a8c24a2c6be4190a53a8c7bbc8de0ac'; // wmata api key
const apiKey2 = 'ea075668d040468596c850fe90dc6723'; // wmata api key 2
const corsProxy = 'https://api.allorigins.win/get?url='; // fixing issue with cors
const wmataUrl = 'https://api.wmata.com/Rail.svc/json/';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const button = document.getElementById('back-btn');
const station = document.getElementById('station');
const timetable = document.getElementById('timetable');
const stationCode = localStorage.getItem('stationCode');

async function fetchStationInfo() {
	const response = await fetch(`${wmataUrl}jStationInfo?StationCode=${stationCode}&api_key=${apiKey}`);
	const dataInfo = await response.json();
	const line1 = `<div class="station-lines-code line-${dataInfo.LineCode1.toLowerCase()}">${dataInfo.LineCode1}</div>`;
	const line2 = `<div class="station-lines-code line-${dataInfo.LineCode2?.toLowerCase()}">${dataInfo.LineCode2}</div>`;
	const line3 = `<div class="station-lines-code line-${dataInfo.LineCode3?.toLowerCase()}">${dataInfo.LineCode3}</div>`;
	const line4 = `<div class="station-lines-code line-${dataInfo.LineCode4?.toLowerCase()}">${dataInfo.LineCode4}</div>`;
	station.innerHTML = `<div class="station-title">
			<div class="station-code">${dataInfo.Code}</div>
			<div class="station-name">${dataInfo.Name}</div>
		</div>
		<div class="station-address">${dataInfo.Address.Street}, ${dataInfo.Address.City}, ${dataInfo.Address.State} ${dataInfo.Address.Zip}</div>
		<div class="station-lines">
			${line1}
			${dataInfo.LineCode2 !== null ? line2 : ''}
			${dataInfo.LineCode3 !== null ? line3 : ''}
			${dataInfo.LineCode4 !== null ? line4 : ''}
		</div>`;
	const response2 = await fetch(`${wmataUrl}jStationTimes?StationCode=${stationCode}&api_key=${apiKey}`);
	const dataTimes = await response2.json();
	displayTimeTable(dataTimes.StationTimes[0]);
}

function displayTimeTable(times) {
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
	const path = window.location.pathname.split('/');
	window.location.href = `${window.location.origin}/${path[1]}`;
});

fetchStationInfo();