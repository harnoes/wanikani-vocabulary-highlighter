(function () {
	// construtctor
	const SubjectDisplay = function(radicals, kanji, vocabulary, width, wrapper) {
		this.allRadicals = radicals;
		this.allKanji = kanji;
		this.allVocab = vocabulary;
		this.width = width;
		this.fixed = false;
		this.locked = false;
		this.expanded = false;
		this.editing = false;
		this.openedSubjects = [];
		this.wrapper = wrapper;

		document.addEventListener("mouseover", e => {
			const node = e.target;

			// if hovering over the details popup or any of it's children (expand small popup)
			if (!this.expanded && this.detailsPopup && (node === this.detailsPopup || this.detailsPopup.contains(node)))
				this.expand();

			// if hovering over a kanji card
			if (node.classList.contains("sd-detailsPopup_vocab_row") || node.classList.contains("sd-detailsPopup_kanji_row") || (node.classList.contains("sd-detailsPopup_cards") && (node.parentElement.parentElement.classList.contains("sd-detailsPopup_kanji_row") || node.parentElement.parentElement.classList.contains("sd-detailsPopup_vocab_row")))) {
				document.querySelectorAll(".sd-itemLevelCard").forEach(levelCard => levelCard.style.setProperty("display", "inline", "important"));
				document.querySelectorAll(".sd-detailsPopup_cardRow").forEach(card => card.style.setProperty("filter", "brightness(0.5)", "important"));
				document.querySelectorAll(".sd-detailsPopup_cardSideBar").forEach(node => node.remove());
				const target = node.classList.contains("sd-detailsPopup_cards") ? node.parentElement.parentElement : node;
				target.style.setProperty("filter", "unset", "important")
				const type = target.classList.contains("sd-detailsPopup_vocab_row") ? "vocabulary" : "kanji";
				let id = "";
				target.childNodes.forEach(child => {
					if (child.tagName == "A")
						id = child.childNodes[0].getAttribute("data-item-id");
		
					if (child.classList.contains("sd-itemLevelCard"))
						child.style.setProperty("display", "none", "important")
				});
		
				if (target.childNodes.length == 4) {
					const sideBar = document.createElement("div");
					target.appendChild(sideBar);
					sideBar.classList.add("sd-detailsPopup_cardSideBar");
					const ul = document.createElement("ul");
					sideBar.appendChild(ul);
					const classes = ["sd-detailsPopup_cardSideBarAudio", "sd-detailsPopup_cardSideBarInfo"];
					const icons = ["https://i.imgur.com/ETwuWqJ.png", "https://i.imgur.com/z5eKtlN.png"];
					if (type == "kanji") {
						classes.shift();
						icons.shift();
					}
					for (const [i, src] of icons.entries()) {
						const li = document.createElement("li");
						ul.appendChild(li);
						li.classList.add("clickable" ,classes[i]);
						const img = document.createElement("img");
						li.appendChild(img);
						li.title = "Subject "+classes[i].split("sd-detailsPopup_cardSideBar")[1];
						img.classList.add("sd-detailsPopup_cardSideBar_icon");
						img.src = src;
					}
					const li = document.createElement("li");
					ul.appendChild(li);
					li.style.setProperty("font-weight", "900", "important")
					li.title = "Subject Level";
					const list = type == "kanji" ? this.allKanji[id] : this.allVocab[id];
					if (list)
						li.appendChild(document.createTextNode(list["level"]));
				}
			}
			
			// if hovering outside kanji card wrapper
			if (node && !(node.classList.contains("sd-detailsPopup_cardRow") || (node.parentElement && node.parentElement.classList.contains("sd-detailsPopup_cardRow")) || node.classList.contains("sd-detailsPopup_cards") || (node.parentElement && node.parentElement.classList.contains("sd-detailsPopup_cardSideBar")) || (node. parentElement && node.parentElement.parentElement && node.parentElement.parentElement.classList.contains("sd-detailsPopup_cardSideBar")) || (node.parentElement && node.parentElement.parentElement && node.parentElement.parentElement.parentElement && node.parentElement.parentElement.parentElement.classList.contains("sd-detailsPopup_cardSideBar")))) {
				document.querySelectorAll(".sd-itemLevelCard").forEach(levelCard => levelCard.style.removeProperty("display"));
				document.querySelectorAll(".sd-detailsPopup_cardRow").forEach(card => card.style.removeProperty("filter"));
				document.querySelectorAll(".sd-detailsPopup_cardSideBar").forEach(node => node.remove());
			}
		});

		document.addEventListener("click", e => {
			const node = e.target;

			// if clicked on close button
			if (node.id == "sd-detailsPopupCloseX")
				this.close(200);

			const getItemIdFromSideBar = (node) => {
				const target = node.childNodes;
				if (target && target.length > 0) {
					for (const n of target) {
						for (const child of n.childNodes) {
							if (child.getAttribute)
								return child.getAttribute("data-item-id");
						}
					}
				}
				return null;
			}
			
			// clicked on sidebar audio
			if (node.classList.contains("sd-detailsPopup_cardSideBarAudio")) {
				const id = getItemIdFromSideBar(node.parentElement.parentElement.parentElement);
				if (id) {
					const audio = new Audio();
					const audioList = this.allVocab[id]["pronunciation_audios"];
					audio.src = audioList[Math.floor(Math.random() * audioList.length)].url;
					audio.play();
				}
			}
	
			// clicked on sidebar info
			if (node.classList.contains("sd-detailsPopup_cardSideBarInfo")) {
				const target = node.parentElement.parentElement.parentElement;
				const id = getItemIdFromSideBar(target);
				if (id)
					this.update(id, true);
			}

			// clicked a button in kanji container
			if (node.classList.contains("sd-detailsPopupButton")) {
				// don't switchClass in the nodes inside the array
				if (!["sd-detailsPopupCloseX", "sd-detailsPopupGoBack", "sd-detailsPopupGoUp"].includes(node.id)) {
					if (node.classList.contains("faded"))
						node.classList.remove("faded");
					else
						node.classList.add("faded");
				}

				if (node.id == "sd-detailsPopupFix")
					this.fixed = !this.fixed;
				
				if (node.id == "sd-detailsPopupSubjectLock")
					this.locked = !this.locked;

				if (node.id == "sd-detailsPopupEdit") {
					let values = null;
					let type = "kanji";
					if (this.detailsPopup) {
						values = {
							characters: this.detailsPopup.getElementsByClassName("sd-detailsPopup_kanji")[0].innerText,
							meanings: this.detailsPopup.getElementsByClassName("sd-popupDetails_kanjiTitle")[0].children[0].innerText,
							meaning_mnemonic: this.detailsPopup.getElementsByClassName("sd-detailsPopup_sectionContainer")[0].getElementsByClassName("sd-popupDetails_p")[0].innerText,
							reading_mnemonic: this.detailsPopup.getElementsByClassName("sd-detailsPopup_sectionContainer")[1].getElementsByClassName("sd-popupDetails_p")[0].innerText,
						}

						// setup readings
						const readingsWrapper = this.detailsPopup.getElementsByClassName("sd-popupDetails_readings_row"); 
						if (readingsWrapper.length === 1) {
							type = "vocabulary";
							values["readings"] = readingsWrapper.innerText;
						}
						else {
							type = "kanji";
							values["readings"] = {
								on: readingsWrapper[0].getElementsByTagName("span")[0].innerText,
								kun: readingsWrapper[1].getElementsByTagName("span")[0].innerText
							};
						}

						// get cards
						Array.from(["radicals", "kanji", "vocab"]).forEach(type => {
							const rows = this.detailsPopup.getElementsByClassName(`sd-detailsPopup_${type}_row`);
							if (rows) {
								values[type] = [];
								Array.from(rows).forEach(row => {
									values[type].push({
										characters: row.getElementsByClassName("sd-detailsPopup_cards")[0].innerText,
										rows: Array.from(row.getElementsByTagName("DIV"))
											.filter(child => child.className === "")
											.map(child => child.innerText)
									});
								});
							}
						});						
					}

					this.edit(type, values);
				}

				if (node.id == "sd-detailsPopupGoUp") {
					if (this.detailsPopup) {
						this.detailsPopup.scrollTo(0, 0);
					}
				}

				if (node.id == "sd-detailsPopupGoBack") {
					if (this.openedSubjects.length > 0)
						this.openedSubjects.pop();

					const kanji = this.openedSubjects[this.openedSubjects.length-1];
					if (kanji) {
						this.update(kanji["id"], false);
					}
				}
					
			}
		});
	}

	SubjectDisplay.prototype = {

		// create popup
		create: function() {
			this.detailsPopup = document.createElement("div");
			this.detailsPopup.className = "sd-rightOverFlowPopup sd-detailsPopup";
			this.wrapper.appendChild(this.detailsPopup);
			setTimeout(() => this.detailsPopup.classList.remove("sd-rightOverFlowPopup"), 20);
		},

		// update popup
		update: function (id, save) {
			if (id) {
				const type = this.allKanji[id] ? "kanji" : "vocabulary";
				const item = type === "kanji" ? this.allKanji[id] : this.allVocab[id];

				if (!this.detailsPopup) this.create();

				if (this.detailsPopup.firstChild)
					this.detailsPopup.firstChild.remove();
				this.detailsPopup.appendChild(this.charContainer(item["characters"], id, save));

				
				const detailedInfoWrapper = this.detailsPopup.getElementsByClassName("sd-popupDetails_detailedInfoWrapper");
				if (detailedInfoWrapper)
					Array.from(detailedInfoWrapper).forEach(wrapper => wrapper.remove());
				
				if (this.expanded) {
					this.detailsPopup.appendChild(type === "kanji" ? this.kanjiDetailedInfo(item) : this.vocabDetailedInfo(item));

					// show kanji container buttons
					const buttons = Array.from(this.detailsPopup.getElementsByClassName("sd-detailsPopupButton"));
					if (buttons)
						buttons.forEach(button => button.classList.remove("hidden"));
				}
			}
		},

		// update popup
		edit: function (type, values) {
			// force values
			this.locked = true;
			this.editing = true;

			if (!this.detailsPopup) this.create();

			if (!this.expanded) this.expand();

			if (this.detailsPopup.firstChild)
				this.detailsPopup.firstChild.remove();
			this.detailsPopup.appendChild(this.charContainerEdit(type, values));
			
			const detailedInfoWrapper = this.detailsPopup.getElementsByClassName("sd-popupDetails_detailedInfoWrapper");
			if (detailedInfoWrapper)
				Array.from(detailedInfoWrapper).forEach(wrapper => wrapper.remove());
		
			this.detailsPopup.appendChild(this.subjectDetailedInfoEdit(type, values));

			// bottom buttons
			const actionButtons = document.createElement("div");
			this.detailsPopup.appendChild(actionButtons);
			actionButtons.classList.add("action-buttons");
			const buttonsUl = document.createElement("ul");
			actionButtons.appendChild(buttonsUl);
			["Create", "Save", "Delete"].forEach(button => {
				const buttonsLi = document.createElement("li");
				buttonsUl.appendChild(buttonsLi);
				buttonsLi.classList.add("clickable");
				buttonsLi.appendChild(document.createTextNode(button));
			});
		},

		// expand popup
		expand : function () {
			this.detailsPopup.classList.add("sd-focusPopup");
			this.detailsPopup.style.setProperty("height", window.innerHeight+"px", "important")
			
			this.expanded = true;

			// remove temp kanji info from small details popup
			const tempKanjiTitle = this.detailsPopup.getElementsByClassName("sd-smallDetailsPopupKanjiTitle")[0];
			if (tempKanjiTitle)
				tempKanjiTitle.remove();

			// remove ... from readings
			const readingsRow = Array.from(this.detailsPopup.getElementsByClassName("sd-popupDetails_readings_row"));
			readingsRow.forEach(row => {
				const ellipsis = row.childNodes[row.childNodes.length-1];
				if (ellipsis && ellipsis.innerText == "...")
					ellipsis.remove();
			});

			const itemWrapper = this.detailsPopup.firstChild;
			setTimeout(() => {
				if (itemWrapper) {
					itemWrapper.classList.add("sd-focusPopup_kanji");
					itemWrapper.style.setProperty("width", this.width+"px", "important")
				}
				this.detailsPopup.style.setProperty("overflow", "auto", "important")
				this.detailsPopup.style.setProperty("max-height", window.innerHeight+"px", "important")
			}, 200);

			if (itemWrapper) {
				const type = itemWrapper.getElementsByClassName("sd-detailsPopup_kanji")[0].getAttribute('data-item-type');
				const id = itemWrapper.getElementsByClassName("sd-detailsPopup_kanji")[0].getAttribute('data-item-id');
				this.detailsPopup.appendChild(type == "kanji" ? this.kanjiDetailedInfo(this.allKanji[id]) : this.vocabDetailedInfo(this.allVocab[id]));
			
				// show kanji container buttons
				const buttons = Array.from(document.getElementsByClassName("sd-detailsPopupButton"));
				if (buttons)
					buttons.forEach(button => button.classList.remove("hidden"));
			}
		},

		// close popup
		close: function (delay) {
			if (this.editing && !confirm("Editing Subject, exit and discard all changes?"))
				return false;

			if (!this.fixed) {
				this.editing = false;
				this.locked = false;
				this.detailsPopup.classList.add("sd-rightOverFlowPopup");

				setTimeout(() => {
					this.expanded = false;
					this.detailsPopup.remove();
					this.detailsPopup = null;
				}, delay);
			}
		},

		// kanji detailed info container
		kanjiDetailedInfo: function (kanjiInfo) {
			// detailed info section
			const detailedInfoWrapper = document.createElement("div");
			detailedInfoWrapper.classList.add("sd-popupDetails_detailedInfoWrapper");
			const kanjiWrapper = document.getElementsByClassName("sd-focusPopup_kanji")[0];
			if (kanjiWrapper)
				detailedInfoWrapper.style.setProperty("margin-top", kanjiWrapper.clientHeight+"px", "important");

			// details container
			const details = document.createElement("div");
			details.style.setProperty("padding", "15px", "important")
			detailedInfoWrapper.appendChild(details);
		
			// level container
			const level = document.createElement("div");
			const levelTitle = document.createElement("strong");
			levelTitle.appendChild(document.createTextNode(`Level ${kanjiInfo["level"]} kanji`));
			level.appendChild(levelTitle);
			details.appendChild(level);
		
			// meaning container
			const meaning = document.createElement("div");
			meaning.classList.add("sd-popupDetails_kanjiTitle");
			const meaningTitle = document.createElement("strong");
			meaningTitle.appendChild(document.createTextNode(kanjiInfo["meanings"].join(", ")));
			meaning.appendChild(meaningTitle);
			details.appendChild(meaning);
			
			// meaning mnemonic container
			details.appendChild(infoTable("Meaning Mnemonic", [parseTags(kanjiInfo["meaning_mnemonic"]), parseTags(kanjiInfo["meaning_hint"])]));
		
			// reading mnemonic container
			details.appendChild(infoTable("Reading Mnemonic", [parseTags(kanjiInfo["reading_mnemonic"]), parseTags(kanjiInfo["reading_hint"])]));
			
			// used radicals cards
			details.appendChild(itemCardsSection(kanjiInfo, "component_subject_ids", "Used Radicals", "sd-detailsPopup_radicals_row", this.allRadicals));
		
			// similar kanji cards
			details.appendChild(itemCardsSection(kanjiInfo, "visually_similar_subject_ids", "Similar Kanji", "sd-detailsPopup_kanji_row", this.allKanji));
		
			// vocab with that kanji
			details.appendChild(itemCardsSection(kanjiInfo, "amalgamation_subject_ids", "Vocabulary", "sd-detailsPopup_vocab_row", this.allVocab));
		
			this.detailsPopup.scrollTo(0, 0);
			return detailedInfoWrapper;
		},

		vocabDetailedInfo: function (vocabInfo) {
			// detailed info section
			const detailedInfoWrapper = document.createElement("div");
			detailedInfoWrapper.classList.add("sd-popupDetails_detailedInfoWrapper");
			let kanjiWrapper = document.getElementsByClassName("sd-focusPopup_kanji")[0];
			if (kanjiWrapper)
				detailedInfoWrapper.style.setProperty("margin-top", kanjiWrapper.clientHeight+"px", "important");
			else {
				// guarantee that the kanjiWrapper exists and is full setup to get its correct size
				const heightUpdaterInterval = setInterval(() => {
					kanjiWrapper = document.getElementsByClassName("sd-focusPopup_kanji")[0];
					if (kanjiWrapper && kanjiWrapper.childElementCount > 1) {
						// wait for the elements to be all setup
						setTimeout(() => {
							detailedInfoWrapper.style.setProperty("margin-top", kanjiWrapper.clientHeight+"px", "important");
							clearInterval(heightUpdaterInterval);
						}, 200);
					}
				}, 100);
			}

			// details container
			const details = document.createElement("div");
			details.style.setProperty("padding", "15px", "important")
			detailedInfoWrapper.appendChild(details);

			// level container
			const level = document.createElement("div");
			const levelTitle = document.createElement("strong");
			levelTitle.appendChild(document.createTextNode(`Level ${vocabInfo["level"]} vocabulary`));
			level.appendChild(levelTitle);
			details.appendChild(level);

			// meaning container
			const meaning = document.createElement("div");
			meaning.classList.add("sd-popupDetails_kanjiTitle");
			const meaningTitle = document.createElement("strong");
			meaningTitle.appendChild(document.createTextNode(vocabInfo["meanings"].join(", ")));
			meaning.appendChild(meaningTitle);
			details.appendChild(meaning);

			// meaning mnemonic container
			details.appendChild(infoTable("Meaning Mnemonic:", [parseTags(vocabInfo["meaning_mnemonic"])]));

			// reading mnemonic container
			details.appendChild(infoTable("Reading Mnemonic:", [parseTags(vocabInfo["reading_mnemonic"])]));

			// used kanji
			details.appendChild(itemCardsSection(vocabInfo, "component_subject_ids", "Used Kanji", "sd-detailsPopup_kanji_row", this.allKanji));

			// sentences
			const sentencesTable = infoTable("Example Sentences:", []); 
			details.appendChild(sentencesTable);
			vocabInfo["context_sentences"].forEach(sentence => {
				const wrapper = document.createElement("ul");
				sentencesTable.appendChild(wrapper);
				wrapper.classList.add("sd-detailsPopup_sentencesWrapper");

				const en = document.createElement("li");
				wrapper.appendChild(en);
				en.classList.add("sd-popupDetails_p");
				en.style.setProperty("background-color", "var(--vocab-tag-color)", "important");
				en.style.setProperty("padding", "0px 5px", "important");
				en.appendChild(document.createTextNode(sentence["en"]));

				const ja = document.createElement("li");
				wrapper.appendChild(ja);
				ja.style.setProperty("padding", "0px 5px", "important");
				ja.appendChild(document.createTextNode(sentence["ja"]));

			});

			this.detailsPopup.scrollTo(0, 0);
			return detailedInfoWrapper;
		},

		charContainer: function (characters, id, save) {
			const type = this.allKanji[id] ? "kanji" : "vocabulary";
			const item = type === "kanji" ? this.allKanji[id] : this.allVocab[id];

			const itemWrapper = document.createElement("div");
			if (this.expanded) {
				itemWrapper.classList.add("sd-focusPopup_kanji");
				itemWrapper.style.setProperty("width", this.width+"px", "important");
			}
			else {
				// add kanji first meaning to small details popup
				const kanjiTitle = document.createElement("p");
				itemWrapper.appendChild(kanjiTitle);
				kanjiTitle.style.setProperty("color", "black", "important");
				kanjiTitle.style.setProperty("font-size", "19px", "important");
				kanjiTitle.style.setProperty("background-color", "white", "important");
				kanjiTitle.style.setProperty("margin-bottom", "8px", "important");
				kanjiTitle.style.setProperty("text-align", "center", "important");
				kanjiTitle.appendChild(document.createTextNode(item["meanings"][0]));
				kanjiTitle.classList.add("sd-smallDetailsPopupKanjiTitle");

				if (characters.length >= 3)
					this.detailsPopup.style.setProperty("width", this.width+"px", "important");
			}
			
			// kanji container buttons
			const buttons = [
				{id:"sd-detailsPopupCloseX", alt: "Close", active:true, src:"https://i.imgur.com/KUjkFI9.png"},
				{id:"sd-detailsPopupGoBack", alt: "Go back", active:true, src:"https://i.imgur.com/e6j4jSV.png"},
				{id:"sd-detailsPopupGoUp", alt: "Go up", active:true, src:"https://i.imgur.com/fszQn7s.png"},
				{id:"sd-detailsPopupSubjectLock", alt: "Subject lock", active:this.locked, src:"https://i.imgur.com/gaKRPen.png"},
				{id:"sd-detailsPopupFix", alt: "Subject fix", active:this.fixed, src:"https://i.imgur.com/vZqwGZr.png"},
				// {id:"sd-detailsPopupEdit", alt: "Subject Edit", active:true, src:"https://i.imgur.com/0k9pNho.png"}
			];
			for (let i in buttons) {
				const button = buttons[i];

				// don't add go back button if there are no kanji to go back to
				if (button["id"] == "sd-detailsPopupGoBack" && this.openedSubjects.length == 1)
					continue;

				const wrapper = document.createElement("div");
				itemWrapper.appendChild(wrapper);
				wrapper.id = button["id"];
				wrapper.classList.add("sd-detailsPopupButton", "clickable", "hidden");
				// add class faded to those buttons only
				if (!button["active"])
					wrapper.classList.add("faded");
				const img = document.createElement("img");
				img.src = button["src"];
				img.alt = button["alt"];
				wrapper.title = img.alt;
				wrapper.appendChild(img);
			}

			const infoToSave = {"id":id, "char":characters, "type":type};
			// only save if the last save wasn't this kanji already
			if (save && !(this.openedSubjects.length > 0 && this.openedSubjects[this.openedSubjects.length-1]["id"] == infoToSave["id"]))
				this.openedSubjects.push(infoToSave);
			
			const kanjiContainerWrapper = document.createElement("div");
			itemWrapper.appendChild(kanjiContainerWrapper);
			kanjiContainerWrapper.style.setProperty("margin", `${characters.length >= 4 ? 30 : 0}px 0`, "important");
			kanjiContainerWrapper.style.setProperty("text-align", "center", "important");
	
			const link = document.createElement("a");
			link.target = "_blank";
			kanjiContainerWrapper.appendChild(link);
		
			const charsWrapper = document.createElement("p");
			link.appendChild(charsWrapper);
			charsWrapper.appendChild(document.createTextNode(characters));
			charsWrapper.setAttribute('data-item-type', type);
			charsWrapper.setAttribute('data-item-id', id);
			charsWrapper.title = characters+" in WaniKani";
			if (characters.length > 4) 
				charsWrapper.style.setProperty("font-size", (48-6*(characters.length - 5))+"px", "important");
		
			charsWrapper.classList.add("sd-detailsPopup_kanji");
		
			link.href = item["document_url"];
		
			const ul = document.createElement("ul");
			ul.classList.add("sd-popupDetails_readings");
					
			const readings = item["readings"];
			if (type == "kanji") {
				([["ON", "onyomi"], ["KUN", "kunyomi"]]).forEach(type => {
					const li = document.createElement("li");
					li.innerHTML = `<strong>${type[0]}: </strong>`;
					li.classList.add("sd-popupDetails_readings_row");
					const span = document.createElement("span");
					const readingsString = readings.filter(reading => reading.type===type[1]).map(reading => reading.reading).join(", ");
					span.appendChild(document.createTextNode(readingsString));
					if (readingsString === '') li.classList.add("faded");
					li.appendChild(span);
					if (readingsString.length > 8) {
						const overflowSpan = document.createElement("span");
						overflowSpan.appendChild(document.createTextNode("..."));
						li.appendChild(overflowSpan);
					}
					ul.appendChild(li);
				});
			}
			else {
				const li = document.createElement("li");
				li.classList.add("sd-popupDetails_readings_row");
				li.appendChild(document.createTextNode(readings.join(", ")));
				ul.appendChild(li);
			}
			kanjiContainerWrapper.appendChild(ul);
		
			return itemWrapper;
		},

		subjectDetailedInfoEdit: function (type, values) {
			// detailed info section
			const detailedInfoWrapper = document.createElement("div");
			detailedInfoWrapper.classList.add("sd-popupDetails_detailedInfoWrapper");
			const kanjiWrapper = document.getElementsByClassName("sd-focusPopup_kanji")[0];
			if (kanjiWrapper)
				detailedInfoWrapper.style.setProperty("margin-top", kanjiWrapper.clientHeight+"px", "important");

			// details container
			const details = document.createElement("div");
			details.style.setProperty("padding", "15px", "important")
			detailedInfoWrapper.appendChild(details);

			const typeSelectorWrapper = document.createElement("div");
			details.appendChild(typeSelectorWrapper);
			typeSelectorWrapper.style.setProperty("margin-bottom", "10px", "important")
			const selector = document.createElement("select");
			typeSelectorWrapper.appendChild(selector);
			selector.title = "Subject type";
			selector.addEventListener("input", () => {
				this.edit(selector.value.toLowerCase(), values);
			});
			["Kanji", "Vocabulary"].forEach(value => {
				const option = document.createElement("option");
				selector.appendChild(option);
				option.appendChild(document.createTextNode(value));
				if (value.toLowerCase() === type)
					option.selected = true;
			});

			const meaning = document.createElement("div");
			details.appendChild(meaning);
			const meaningInput = document.createElement("input");
			meaning.appendChild(meaningInput);
			meaningInput.placeholder = "Meanings";
			meaning.spellcheck = false;
			meaning.style.setProperty("width", "100%", "important")
			meaning.style.setProperty("font-size", "20px", "important")
			if (values && values["meanings"]) meaningInput.value = values["meanings"];

			if (values && values["meaning_mnemonic"] && values["reading_mnemonic"]) ["Meaning", "Reading"].forEach(type => details.appendChild(infoTableCreator(type+" Mnemonic", "Your mnemonic for the "+type.toLowerCase()+"s...", values[type.toLowerCase()+"_mnemonic"])));
			else ["Meaning", "Reading"].forEach(type => details.appendChild(infoTableCreator(type+" Mnemonic", "Your mnemonic for the "+type.toLowerCase()+"s...")));

			if (type === "kanji") {
				if (values && values["radicals"]) details.appendChild(itemCardsCreator("Used Radicals", "Radical", "sd-detailsPopup_radicals_row", values["radicals"]));
				else details.appendChild(itemCardsCreator("Used Radicals", "Radical", "sd-detailsPopup_radicals_row"));	
			}

			if (values && values["kanji"]) details.appendChild(itemCardsCreator(type === "kanji" ? "Similar Kanji" : "Used Kanji", "Kanji", "sd-detailsPopup_kanji_row", values["kanji"]));
			else details.appendChild(itemCardsCreator("Similar Kanji", "Kanji", "sd-detailsPopup_kanji_row"));

			if (type === "kanji") {
				if (values && values["vocab"]) details.appendChild(itemCardsCreator("Vocabulary", "Vocabulary", "sd-detailsPopup_vocab_row", values["vocab"]));
				else details.appendChild(itemCardsCreator("Vocabulary", "Vocabulary", "sd-detailsPopup_vocab_row"));
			}

			this.detailsPopup.scrollTo(0, 0);
			return detailedInfoWrapper;
		},

		charContainerEdit: function (type, values) {
			const itemWrapper = document.createElement("div");
			itemWrapper.classList.add("sd-focusPopup_kanji");
			itemWrapper.style.setProperty("width", this.width+"px", "important");
			
			// kanji container buttons
			const buttons = [
				{id:"sd-detailsPopupCloseX", alt: "Close", active:true, src:"https://i.imgur.com/KUjkFI9.png"},
				{id:"sd-detailsPopupGoUp", alt: "Go up", active:true, src:"https://i.imgur.com/fszQn7s.png"}
			];
			for (let i in buttons) {
				const button = buttons[i];

				const wrapper = document.createElement("div");
				itemWrapper.appendChild(wrapper);
				wrapper.id = button["id"];
				wrapper.classList.add("sd-detailsPopupButton", "clickable");
				// add class faded to those buttons only
				if (!button["active"])
					wrapper.classList.add("faded");
				const img = document.createElement("img");
				img.src = button["src"];
				img.alt = button["alt"];
				wrapper.title = img.alt;
				wrapper.appendChild(img);
			}
			
			const container = document.createElement("div");
			itemWrapper.appendChild(container);
			container.style.setProperty("margin", "0px", "important");

			const charsWrapper = document.createElement("div");
			container.appendChild(charsWrapper);
			const charsInput = document.createElement("input");
			charsWrapper.appendChild(charsInput);
			charsInput.spellcheck = false;
			if (values && values["characters"]) charsInput.value = values["characters"];
			charsInput.style.setProperty("font-size", "50px", "important");
			charsInput.style.setProperty("width", "170px", "important");
			charsInput.style.setProperty("text-align", "center", "important");
			charsInput.style.setProperty("margin-bottom", "12px", "important");
			charsInput.placeholder = "漢字";
			charsInput.title ="Subject characters";
		
			const ul = document.createElement("ul");
			container.appendChild(ul);
			ul.classList.add("sd-popupDetails_readings");
			
			if (type === "kanji") {
				([["Onyomi", "on"], ["Kunyomi", "kun"]]).forEach(readingType => {
					const li = document.createElement("li");
					ul.appendChild(li);
					li.classList.add("sd-popupDetails_readings_row");
					const input = document.createElement("input");
					li.appendChild(input);
					input.addEventListener("input", e => e.target.value = convertToKana(e.target.value));
					input.spellcheck = false;
					input.placeholder = readingType[0];
					if (values && values["readings"] && values["readings"][readingType[1]]) input.value = values["readings"][readingType[1]];
					input.style.setProperty("text-align", "center", "important");
				});
			}
			else {
				const li = document.createElement("li");
				ul.appendChild(li);
				li.classList.add("sd-popupDetails_readings_row");
				const input = document.createElement("input");
				li.appendChild(input);
				input.addEventListener("input", e => e.target.value = convertToKana(e.target.value));
				input.spellcheck = false;
				input.placeholder = "Readings";
				if (values && values["readings"] && values["readings"].length === 0) input.value = values["readings"];
				input.style.setProperty("text-align", "center", "important");
			}

			return itemWrapper;
		}
	}

	// Auxiliar methods

	// parse tags specific to wanikani
	const parseTags = string => {
		let finalString = "";
		if (string) {
			const tags = ["radical", "kanji", "vocabulary", "reading", "ja"];
			const filter = string.split(/[<>\/]+/g);
			let tagOpen = false;
			filter.forEach(substring => {
				if (!tags.includes(substring)) {
					if (tagOpen)
						finalString += `<span class="sd-${tagOpen}Tag">${substring}</span>`;
					else
						finalString += substring;
				}
				else
					tagOpen = !tagOpen ? substring : false;
			});
		}
	
		return finalString;
	}

	const itemCardsSection = (kanjiInfo, idsTag, title, itemCardsclass, list) => {
		const ids = kanjiInfo[idsTag];
		const nmrItems = ids.length;
		const table = infoTable(`${title} (${nmrItems})`, []);
		table.classList.add("sd-detailsPopup_sectionContainer");
		if (nmrItems > 0)
			table.appendChild(itemCards(ids, list, itemCardsclass, title !== "Used Kanji"));
		else {
			const nonefound = document.createElement("p");
			table.appendChild(nonefound);
			nonefound.appendChild(document.createTextNode("(None found)"));
			nonefound.style.setProperty("font-weight", "900", "important");
			nonefound.style.setProperty("padding", "5px", "important");
		}
		return table;
	}

	const itemCards = (ids, data, className, sorted) => {
		const wrapper = document.createElement("ul");
		wrapper.style.setProperty("padding", "0px", "important");
		if (ids && data) {
			let info = ids.map(id => data[id]);
			if (sorted && info)
				info = info.sort((a,b) => a.level - b.level)
			info.forEach(thisData => {
				const rows = [];
				if (thisData["meanings"]) rows.push(thisData["meanings"][0]);
				if (thisData["readings"]) rows.push(thisData["subject_type"] == "kanji" ? thisData["readings"].filter(reading => reading["primary"])[0]["reading"] : thisData["readings"][0]);
				const card = itemCard(thisData["characters"], rows, thisData["level"]);
				wrapper.appendChild(card);
				card.classList.add("sd-detailsPopup_cardRow", className);
				card.title = thisData["characters"]+" in WaniKani";

				card.getElementsByTagName("A")[0].href = thisData["document_url"];

				const p = card.getElementsByTagName("p")[0];
				if (!thisData["characters"]) {
					const img = document.createElement("img");
					const svgs = thisData["character_images"].filter(img => img["content_type"] === "image/png" && img["metadata"]["dimensions"] === "64x64");
					img.src = svgs[0].url;
					img.style.setProperty("width", "40px", "important");
					p.appendChild(img);
				}

				p.classList.add("sd-detailsPopup_cards");
				p.setAttribute('data-item-id', thisData.id);
			});
		}

		return ids.length > 0 ? wrapper : document.createDocumentFragment();
	}

	const itemCardsCreator = (sectionTitle, type, className, cards) => {
		const table = infoTable(`${sectionTitle} (${cards ? cards.length : 0})`, []);
		table.classList.add("sd-detailsPopup_sectionContainer");
		const wrapper = document.createElement("ul");
		table.appendChild(wrapper);
		const rows = [type];
		if (type !== "Radical")
			rows.push("かな");
		const card = itemCard("+", rows);
		wrapper.appendChild(card);
		card.classList.add("sd-detailsPopup_cardRow", className);
		card.title = `Add ${type}`;
		card.getElementsByTagName("p")[0].classList.add("sd-detailsPopup_cards");
		card.style.setProperty("background-color", "white", "important");
		if (type !== "Vocabulary")
			card.style.setProperty("width", "60px", "important");
		card.getElementsByTagName("A")[0].style.setProperty("font-size", "40px", "important");
		if (cards) {
			cards.forEach(cardValues => {
				const existingCard = itemCard(cardValues["characters"], cardValues["rows"]);
				existingCard.classList.add("sd-detailsPopup_cardRow", className);
				existingCard.getElementsByTagName("p")[0].classList.add("sd-detailsPopup_cards");
				wrapper.appendChild(existingCard);
			});
		}
		return table;
	}

	const itemCard = (characters, textRows, level) => {
		const li = document.createElement("li");

		const a = document.createElement("a");
		li.appendChild(a);
		a.target = "_blank";

		const p = document.createElement("p");
		a.appendChild(p);

		if (characters) {
			p.appendChild(document.createTextNode(characters));
			if (characters.length > 4)
				p.style.setProperty("font-size",(170/characters.length)+"px", "important");
		}

		if (textRows) {
			textRows.forEach(row => {
				if (row) {
					const rowDiv = document.createElement("div");
					li.appendChild(rowDiv);
					rowDiv.appendChild(document.createTextNode(row));
					rowDiv.style.setProperty("text-align", "center", "important");
				}
			});
	
		}

		if (level) {
			const levelDiv = document.createElement("div");
			li.appendChild(levelDiv);
			levelDiv.appendChild(document.createTextNode(level));
			levelDiv.classList.add("sd-itemLevelCard");
		}

		return li;
	}

	const infoTable = (titleText, paragraphs) => {
		const wrapper = document.createElement("div");
		wrapper.classList.add("sd-detailsPopup_sectionContainer");
		
		if (titleText) {
			const title = document.createElement("strong");
			title.classList.add("sd-popupDetails_title");
			title.appendChild(document.createTextNode(titleText));
			wrapper.appendChild(title);
		}
	
		paragraphs.forEach(pText => {
			const p = document.createElement("p");
			p.classList.add("sd-popupDetails_p");
			p.innerHTML = pText;
			wrapper.appendChild(p);
		});
	
		return wrapper;
	}

	const infoTableCreator = (titleText, placeholder, value) => {
		const wrapper = document.createElement("div");
		wrapper.classList.add("sd-detailsPopup_sectionContainer");
		
		if (titleText) {
			const title = document.createElement("strong");
			title.classList.add("sd-popupDetails_title");
			title.appendChild(document.createTextNode(titleText));
			wrapper.appendChild(title);
		}
	
		const textArea = document.createElement("textarea");
		wrapper.appendChild(textArea);
		textArea.spellcheck = false;
		textArea.style.setProperty("margin-top", "5px", "important");
		textArea.rows = "7";
		if (placeholder)
			textArea.placeholder = placeholder;
		
		if (value)
			textArea.value = value;
		
		return wrapper;
	}

	window.SubjectDisplay = SubjectDisplay;
}());