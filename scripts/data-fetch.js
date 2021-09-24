// WANIKANI

const canCallApi = (nmrFetches, firstFetch) => {
	if (nmrFetches < 60) {
		chrome.storage.local.set({"wkhighlight_apiFetches":++nmrFetches});
		return true;
	}

	// check if a minute has passed
	const now = new Date();
	if ((now - firstFetch)/(1000*60)%60 > 1) {
		chrome.storage.local.set({"wkhighlight_apiFetches":0, "wkhighlight_apiFetches_time":formatDate(now)});
		return true;
	}
	
	return false;
}

// fetch a single page from the WaniKani API
const fetchPage = async (apiToken, page) => {				
	const requestHeaders = new Headers({Authorization: `Bearer ${apiToken}`});
	let apiEndpoint = new Request(page, {
		method: 'GET',
		headers: requestHeaders
	});

	// chrome.storage.local.get(["wkhighlight_apiFetches", "wkhighlight_apiFetches_time"], result => {
	// 	const nmrFetches = result["wkhighlight_apiFetches"] ? result["wkhighlight_apiFetches"] : 0;
	// 	const firstFetch = result["wkhighlight_apiFetches_time"] ? new Date(result["wkhighlight_apiFetches_time"]) : new Date();

	// 	if (canCallApi(nmrFetches, firstFetch)) {
			return await fetch(apiEndpoint)
				.then(response => response.json())
				.then(responseBody => responseBody)
				.catch(errorHandling);
		// }
	// });
}

// recursive function to fetch all pages that come after a given page (given page included)
const fetchAllPages = async (apiToken, page) => {
	if (!page)
		return [];

	const result = await fetchPage(apiToken, page);
	return [result].concat(await fetchAllPages(apiToken, result.pages.next_url));
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


// GITHUB
const reposVersions = async (user, repos) => {
	return await fetch(`https://api.github.com/repos/${user}/${repos}/tags`).then(response => response.json()).then(body => body);
}

const reposFirstVersion = async (user, repos) => {
	return await reposVersions(user, repos).then(result => result[0].name);
}

const reposLastVersion = async (user, repos) => {
	return await reposVersions(user, repos).then(result => result[result.length-1].name);
}