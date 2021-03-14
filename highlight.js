chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.functionDelay && request.values && request.unwantedTags && request.highlightingClass) {
		const textChildNodes = obj => Array.from(obj.childNodes)
			.filter(node => node.nodeName === "#text");

		// replace a matching regex in a text node with a document element, preserving everything else, even other 
		// none text node siblings from that text node (the parent node must have atleast one text node as a childNode)
		const replaceWithElem = (parentNode, regex, elem) => {
			for (const node of textChildNodes(parentNode)) {
				const fragment = document.createDocumentFragment();
				const split = node.textContent.split(regex);
				split.forEach((content, i) => {
					fragment.appendChild(document.createTextNode(content));
					if (i !== split.length-1)
						fragment.appendChild(elem.cloneNode(true));
				});
				node.parentElement.replaceChild(fragment, node);
			}
		}

		const hasDirectChildHighlighted = (node, className) => {
			for (const child of node.childNodes) {
				if (child.classList && Array.from(child.classList).includes(className))
					return true;
			}
			return false;
		}

		const highlighter = (delay, values, className, unwantedTags) => {
			setTimeout(() => {
				// filter all tag elements of the document that:
				//		- haven't yet been highlighted;
				//		- have child nodes that are text nodes;
				//		- aren't any of the unwanted tags (html, head, etc...)
				let filteredNodes = Array.from(document.getElementsByTagName("*"))
					.filter(object => !(hasDirectChildHighlighted(object, className) || Array.from(object.classList).includes(className))
						&& textChildNodes(object).length > 0
						&& !unwantedTags.includes(object.localName));
				for (const value of values) {
					const span = document.createElement("span");
					span.className = className;
					span.appendChild(document.createTextNode(value));
					// filter the tag elements again for those that have text content equal to the preset regex value;
					// iterate the filtered tag elements and call replaceWithElem each time
					filteredNodes
						.filter(object => new RegExp(value).test(object.textContent))
						.forEach(node => replaceWithElem(node, new RegExp(value, "g"), span));
				}
			},delay);
		}

		highlighter(request.functionDelay, request.values, request.highlightingClass, request.unwantedTags);

		let lastNmrElements = 0;
		let nmrElements;
		// continuously check for the number of elements in the page
		// if that number updates, then run highlighter again
		const highlightUpdate = setInterval(() => {
			nmrElements = document.getElementsByTagName("*").length;
			if (nmrElements !== lastNmrElements) {
				lastNmrElements = nmrElements;
				highlighter(20, request.values, request.highlightingClass, request.unwantedTags);
			}
		}, 3000);

		chrome.runtime.sendMessage({intervalFunction: highlightUpdate});
	}

	// if a key was pressed, then stop the highlight update
	if (request.key === "down") {
		console.log("Key pressed. Highlight update stopped! Waiting for next page update to start again...");
		clearInterval(request.intervalFunction);
	}
});

// message to the background saying a key was pressed
document.addEventListener("keydown", e => {
	// if the key is not a modifier
	if (!e.getModifierState(e.key))
		chrome.runtime.sendMessage({key: "down"});
});

document.addEventListener("mouseover", e => {
	const createPopup = () => {
		const div = document.createElement("div");
		div.className = "wkhighlighter_rightOverFlowPopup wkhighlighter_detailsPopup";
		document.body.appendChild(div);
		setTimeout(() => document.getElementsByClassName("wkhighlighter_detailsPopup")[0].classList.remove("wkhighlighter_rightOverFlowPopup"), 20);
	}
	
	const node = e.target;

	if (node.classList.contains("wkhighlighter_highlighted")) {
		if (document.getElementsByClassName("wkhighlighter_detailsPopup").length < 1) {
			createPopup();
		}
	}

	if (node.classList.contains("wkhighlighter_detailsPopup")) {
		node.classList.add("wkhighlighter_focusPopup");
	}
});

document.addEventListener("mouseout", e => {
	const node = e.target;

	if (node.classList.contains("wkhighlighter_detailsPopup")) {
		node.classList.remove("wkhighlighter_focusPopup");
	}
});

document.addEventListener("click", e => {
	const node = e.target;
	
	if (document.getElementsByClassName("wkhighlighter_detailsPopup").length > 0 && !node.classList.contains("wkhighlighter_detailsPopup")) {
		const popup = document.getElementsByClassName("wkhighlighter_detailsPopup")[0];
		popup.classList.add("wkhighlighter_rightOverFlowPopup");
		setTimeout(() => document.body.removeChild(popup), 200);
	}
});