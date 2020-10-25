var cityInput;
var stateInput;
var stateCode;
const TO_NAME = 1;
const TO_ABBREVIATED = 2;
var selectOne;
var defaultSearch = 5;
function searchCity() {
	var stateStorage = localStorage.getItem("state");
	console.log(stateStorage);
	stateInput = localStorage.getItem("state");
	console.log(stateInput);
	selectOne = localStorage.getItem("limit")
	function convertRegion(input, to) {
		var states = [
			['Alabama', 'AL'],
			['Alaska', 'AK'],
			['American Samoa', 'AS'],
			['Arizona', 'AZ'],
			['Arkansas', 'AR'],
			['Armed Forces Americas', 'AA'],
			['Armed Forces Europe', 'AE'],
			['Armed Forces Pacific', 'AP'],
			['California', 'CA'],
			['Colorado', 'CO'],
			['Connecticut', 'CT'],
			['Delaware', 'DE'],
			['District Of Columbia', 'DC'],
			['Florida', 'FL'],
			['Georgia', 'GA'],
			['Guam', 'GU'],
			['Hawaii', 'HI'],
			['Idaho', 'ID'],
			['Illinois', 'IL'],
			['Indiana', 'IN'],
			['Iowa', 'IA'],
			['Kansas', 'KS'],
			['Kentucky', 'KY'],
			['Louisiana', 'LA'],
			['Maine', 'ME'],
			['Marshall Islands', 'MH'],
			['Maryland', 'MD'],
			['Massachusetts', 'MA'],
			['Michigan', 'MI'],
			['Minnesota', 'MN'],
			['Mississippi', 'MS'],
			['Missouri', 'MO'],
			['Montana', 'MT'],
			['Nebraska', 'NE'],
			['Nevada', 'NV'],
			['New Hampshire', 'NH'],
			['New Jersey', 'NJ'],
			['New Mexico', 'NM'],
			['New York', 'NY'],
			['North Carolina', 'NC'],
			['North Dakota', 'ND'],
			['Northern Mariana Islands', 'NP'],
			['Ohio', 'OH'],
			['Oklahoma', 'OK'],
			['Oregon', 'OR'],
			['Pennsylvania', 'PA'],
			['Puerto Rico', 'PR'],
			['Rhode Island', 'RI'],
			['South Carolina', 'SC'],
			['South Dakota', 'SD'],
			['Tennessee', 'TN'],
			['Texas', 'TX'],
			['US Virgin Islands', 'VI'],
			['Utah', 'UT'],
			['Vermont', 'VT'],
			['Virginia', 'VA'],
			['Washington', 'WA'],
			['West Virginia', 'WV'],
			['Wisconsin', 'WI'],
			['Wyoming', 'WY'],
		];



		var regions = states;

		if (to == TO_ABBREVIATED) {
			input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
			for (region of regions) {
				if (region[0] == input) {
					return (region[1]);
				}
			}
		} else if (to == TO_NAME) {
			input = input.toUpperCase();
			for (region of regions) {
				if (region[1] == input) {
					return (region[0]);
				}
			}

		}
	}
	// if (stateInput.toLocaleUpperCase() == states[1]){
	// 	stateCode = stateInput;
	// 	return stateCode;
	// }
	// else{
	stateCode = convertRegion(stateInput, TO_ABBREVIATED);
	console.log("JS is working!");
	console.log(stateCode);

	// }

	console.log(stateCode);
	const settingsR = {
		"async": true,
		"crossDomain": true,
		"url": "https://rapidapi.p.rapidapi.com/reports?region_province=" + stateStorage + "&iso=USA&region_name=US",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
			"x-rapidapi-key": "4e7288d871msh4411859255a7ef9p15aabejsn6bf06bbee388"
		}
	};

	$.ajax(settingsR).done(function (responseR) {
		console.log(responseR);

		var newCases = responseR.data[0].region.cities[0].confirmed_diff;
		var riskLevel = "high"

		//COVID RISK LEVEL DETERMINATION
		// For new case count at a location: < 250 = level 1 (low), 251 to 500 = level 2 (moderate), >501 = level 3 (high) > lat: "33.94243204" long: "-84.5761255"
		if (newCases < 250) {
			var riskLevel = "low";
		} else if (newCases >= 251 && newCases <= 500) {
			var riskLevel = "moderate";
		}

		console.log("Covid risk level for county: " + riskLevel);
		try {
			var cityStorage = localStorage.getItem("city");
			cityStorage = cityStorage.split(" ").join("+");

			var registryURL = "https://cors-anywhere.herokuapp.com/https://npiregistry.cms.hhs.gov/api/?version=2.1&address_purpose=primary&city=+ &address_purpose=primary&city=" + cityStorage + "&state=" + stateCode;
			$.ajax({
				url: registryURL,
				method: "GET"
			}).then(function (responseRegistry) {
				console.log(responseRegistry);
				if (typeof selectOne == 'undefined') {
					for (var i = 0; i < defaultSearch; i++) {



						if (responseRegistry.result_count == 0) {
							var resultsDiv = $(".results-div")
							var cardDiv = $("<div>").addClass("card bg-light mb-3");
							cardDiv.attr("style", "max-width: 18rem");
							var physicianName = $("<h5>").text("No results found, try again");
							cardDiv.append(physicianName)
							resultsDiv.append(cardDiv);
							i = 10;
						}
						else if (typeof responseRegistry.results[i].basic.last_name == 'undefined') {
							console.log("undefined")
							defaultSearch++;
						}
						else {
							var resultsDiv = $(".results-div")
							var cardDiv = $("<div>").addClass("card bg-light mb-3");
							cardDiv.attr("style", "max-width: 18rem");
							var physicianName = $("<h5>").text(responseRegistry.results[i].basic.last_name + ", " + responseRegistry.results[i].basic.first_name);
							var physicianAddress = $("<span>").text(responseRegistry.results[i].addresses[0].address_1 + " " + responseRegistry.results[i].addresses[0].address_2 + ", " + responseRegistry.results[i].addresses[0].city + ", " + responseRegistry.results[i].addresses[0].state);
							var physicianPhoneNumber = $("<span>").text(responseRegistry.results[i].addresses[0].telephone_number);

							var covidRisk = $("<span>").text("COVID Risk for " + stateStorage + ": " + riskLevel);
							cardDiv.append(physicianName, physicianAddress, physicianPhoneNumber, covidRisk)
							resultsDiv.append(cardDiv);

						}

					}
				}
				else {
					for (var i = 0; i < selectOne; i++) {



						if (responseRegistry.result_count == 0) {
							var resultsDiv = $(".results-div")
							var cardDiv = $("<div>").addClass("card bg-light mb-3");
							cardDiv.attr("style", "max-width: 18rem");
							var physicianName = $("<h5>").text("No results found, try again");
							cardDiv.append(physicianName)
							resultsDiv.append(cardDiv);
							i = 10;
						}
						else if (typeof responseRegistry.results[i].basic.last_name == 'undefined') {
							console.log("undefined")
							selectOne++;
						}
						else {
							var resultsDiv = $(".results-div")
							var cardDiv = $("<div>").addClass("card bg-light mb-3");
							cardDiv.attr("style", "max-width: 18rem");
							var physicianName = $("<h5>").text(responseRegistry.results[i].basic.last_name + ", " + responseRegistry.results[i].basic.first_name);
							var physicianAddress = $("<span>").text(responseRegistry.results[i].addresses[0].address_1 + " " + responseRegistry.results[i].addresses[0].address_2 + ", " + responseRegistry.results[i].addresses[0].city + ", " + responseRegistry.results[i].addresses[0].state);
							var physicianPhoneNumber = $("<span>").text(responseRegistry.results[i].addresses[0].telephone_number);
							var address = responseRegistry.results[i].addresses[0].address_1 + " " + responseRegistry.results[i].addresses[0].address_2 + ", " + responseRegistry.results[i].addresses[0].city + ", " + responseRegistry.results[i].addresses[0].state;
							localStorage.setItem("button" + i, address);

							var covidRisk = $("<span>").text("COVID Risk for " + stateStorage + ": " + riskLevel);
							cardDiv.append(physicianName, physicianAddress, physicianPhoneNumber, covidRisk)
							resultsDiv.append(cardDiv);

							var mapEl = $("<button>");
							mapEl.attr("class", "saveBtn");

							mapEl.text("Show Map");
							mapEl.attr("id", "button" + [i]);
							cardDiv.append(mapEl);


						}

					}
					$("#button0").on("click", function () {
						var link0 = localStorage.getItem("button0");
						console.log("click");
						console.log(link0);
						window.open("https://www.google.com/maps/place/" + link0);
					});

					$("#button1").on("click", function () {
						var link1 = localStorage.getItem("button1");
						console.log("click");
						console.log(link1);
						window.open("https://www.google.com/maps/place/" + link1);
					});

					$("#button2").on("click", function () {
						var link2 = localStorage.getItem("button2");
						console.log("click");
						console.log(link2);
						window.open("https://www.google.com/maps/place/" + link2);
					});

					$("#button3").on("click", function () {
						var link3 = localStorage.getItem("button3");
						console.log("click");
						console.log(link3);
						window.open("https://www.google.com/maps/place/" + link3);
					});

					$("#button4").on("click", function () {
						var link4 = localStorage.getItem("button4");
						console.log("click");
						console.log(link4);
						window.open("https://www.google.com/maps/place/" + link4);
					});

					$("#button5").on("click", function () {
						var link5 = localStorage.getItem("button4");
						console.log("click");
						console.log(link5);
						window.open("https://www.google.com/maps/place/" + link5);
					});
				}
			});

		}
		catch (error) {
			console.log(error);
		}

	})
}


$("#submitBtn").on("click", function (event) {
	event.preventDefault();

	stateInput = $("#state-name").val();
	localStorage.setItem("state", stateInput)
	cityInput = $("#city-name").val();
	localStorage.setItem("city", cityInput);
	console.log(cityInput);
	window.location.replace("./results.html");
	cityInput = $("#city-name").val();
	localStorage.setItem("city", cityInput);
	stateInput = $("#state-name").val();
	localStorage.setItem("state", stateInput);
	providerInput = $("#provider-type").val();
	localStorage.setItem("providerType", providerInput);
	genderInput = $("#gender-type").val();
	localStorage.setItem("gender", genderInput);
	riskInput = $("#covid-risk").val();
	localStorage.setItem("covidRisk", riskInput);
	if (cityInput === "" || stateInput === "" || providerInput === "" || genderInput === "" || riskInput === "") {
		alert("Please complete all fields and selections.")
		return;
	}
	window.location.replace("./results.html");
});

//event listeners
$(".go-btn").on("click", function (event) {
	event.preventDefault();
	selectOne = $("#select1").val();
	localStorage.setItem("limit", selectOne);
	console.log(selectOne);
	// var selectTwo = $("#select2").val();
	// console.log(selectTwo);
	window.location.replace("./results.html");
});

$("#navbar-brand").on("click", function (event) {
	event.preventDefault();
	selectOne = "";
	cityInput = "";
	stateInput = "";
	stateCode = "";
	window.location.replace("./index.html");
});

$("#whatsThis").on("click", function () {
	console.log("What's this clicked!");
	window.open("https://www.cdc.gov/coronavirus/2019-ncov/travelers/how-level-is-determined.html");
});

searchCity();
