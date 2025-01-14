// WANIKANI

// fetch a single page from the WaniKani API
const fetchPage = async (apiToken, page) => {				
	const requestHeaders = new Headers({Authorization: `Bearer ${apiToken}`});
	let apiEndpoint = new Request(page, {
		method: 'GET',
		headers: requestHeaders
	});

	return await fetch(apiEndpoint)
		.then(response => response.json())
		.then(responseBody => {
			const result = responseBody;
			return result;
		})
		.catch(errorHandling);
}

// recursive function to fetch all pages that come after a given page (given page included)
const fetchAllPages = async (apiToken, page) => {
	if (!page) return [];

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

	return fetch(endpoint)
		.then(response => {
			const result = response.status !== 304;
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