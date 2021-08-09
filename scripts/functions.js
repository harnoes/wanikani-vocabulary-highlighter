/*
	GENERAL
*/

// GENERAL
const errorHandling = error => console.log(error);

// fetch a single page from the WaniKani API
const fetchPage = async (apiToken, page) => {				
	const requestHeaders = new Headers({Authorization: `Bearer ${apiToken}`});
	let apiEndpoint = new Request(page, {
		method: 'GET',
		headers: requestHeaders
	});

	return await fetch(apiEndpoint)
		.then(response => response.json())
		.then(responseBody => responseBody)
		.catch(errorHandling);
}

// recursive function to fetch all pages that come after a given page (given page included)
const fetchAllPages = async (apiToken, page) => {
	if (!page)
		return [];

	const result = await fetchPage(apiToken, page);
	return [result].concat(await fetchAllPages(apiToken, result.pages.next_url));
}

// millisecond to readable format
// stole from: https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript/32180863#32180863
function msToTime(ms) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24) return hours + " Hrs";
  else return days + " Days"
}

// format date into <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
const formatDate = date => {
	const split = date.toString().split(" ");
	return `${split[0]}, ${split[2]} ${split[1]} ${split[3]} ${split[4]} GMT`;
}

const simpleFormatDate = (date, format) => {
	// make sure it is a Date object
	date = new Date(date);
	let dd = date.getDate();
	let mm = date.getMonth()+1;
	const yyyy = date.getFullYear();
	dd = dd < 10 ? '0'+dd : dd;
	mm = mm < 10 ? '0'+mm : mm;
	let value;
	switch(format) {
		case "mdy":
			value = `${mm}-${dd}-${yyyy}`
			break;
		case "dmy":
			value = `${dd}-${mm}-${yyyy}`
			break;
		case "ymd":
			value = `${yyyy}-${mm}-${dd}`; 
			break;
	}
	return value;
}

const nextExactHour = (date, hours) => {
	return new Date(new Date(new Date(new Date().setHours(date.getHours()+hours)).setMinutes(0)).setSeconds(0));
}

const changeDay = (date, days) => {
	return new Date(new Date().setDate((date.getDate())+days));
}

// check if the data in the endpoints has been modified since the given date
const modifiedSince = async (apiKey, date, url) => {
	var requestHeaders = new Headers();
	requestHeaders.append('Authorization', `Bearer ${apiKey}`);
	requestHeaders.append('Wanikani-Revision', '20170710');
	requestHeaders.append('If-Modified-Since', date);
	var requestInit = { method: 'GET', headers: requestHeaders };
	var endpoint = new Request(url, requestInit);

	return await fetch(endpoint)
		.then(response => {
			const result = response.status !== 304;
			console.log(response);
			console.log("MODIFIED: "+result);
			return result;
		
		})
		.catch(errorHandling);
}

// clears cache of this extension from chrome storage
const clearCache = () => {
	chrome.storage.local.get(null, data => {
		let keysToRemove = [];
		Object.keys(data).forEach(key => {
			if (/^wkhighlight_.*/g.test(key)) {
				keysToRemove.push(key);
			}
		});
		window.location.reload();
		chrome.storage.local.remove(keysToRemove, () => alert("Local data cleared! This didn't affect your WaniKani account!"));
	});
}

const reposVersions = async (user, repos) => {
	return await fetch(`https://api.github.com/repos/${user}/${repos}/tags`).then(response => response.json()).then(body => body);
}

const reposFirstVersion = async (user, repos) => {
	return await reposVersions(user, repos).then(result => result[0].name);
}

const reposLastVersion = async (user, repos) => {
	return await reposVersions(user, repos).then(result => result[result.length-1].name);
}

const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min) ) + min;
}