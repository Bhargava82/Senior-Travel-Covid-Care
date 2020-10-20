
var stateInput;
var stateCode;
var stateList = {
	'Arizona': 'AZ',
	'Alabama': 'AL',
	'Alaska':'AK',
	'Arkansas': 'AR',
	'California': 'CA',
	'Colorado': 'CO',
	'Connecticut': 'CT',
	'Delaware': 'DE',
	'Florida': 'FL',
	'Georgia': 'GA',
	'Hawaii': 'HI',
	'Idaho': 'ID',
	'Illinois': 'IL',
	'Indiana': 'IN',
	'Iowa': 'IA',
	'Kansas': 'KS',
	'Kentucky': 'KY',
	'Louisiana': 'LA',
	'Maine': 'ME',
	'Maryland': 'MD',
	'Massachusetts': 'MA',
	'Michigan': 'MI',
	'Minnesota': 'MN',
	'Mississippi': 'MS',
	'Missouri': 'MO',
	'Montana': 'MT',
	'Nebraska': 'NE',
	'Nevada': 'NV',
	'New Hampshire': 'NH',
	'New Jersey': 'NJ',
	'New Mexico': 'NM',
	'New York': 'NY',
	'North Carolina': 'NC',
	'North Dakota': 'ND',
	'Ohio': 'OH',
	'Oklahoma': 'OK',
	'Oregon': 'OR',
	'Pennsylvania': 'PA',
	'Rhode Island': 'RI',
	'South Carolina': 'SC',
	'South Dakota': 'SD',
	'Tennessee': 'TN',
	'Texas': 'TX',
	'Utah': 'UT',
	'Vermont': 'VT',
	'Virginia': 'VA',
	'Washington': 'WA',
	'West Virginia': 'WV',
	'Wisconsin': 'WI',
	'Wyoming': 'WY'
}


console.log("JS is working!");


var cityInput;
function searchCity() {
	var stateStorage = localStorage.getItem("state");
	console.log(stateStorage);
	stateInput = localStorage.getItem("state");
	console.log(stateInput);
	getStateTwoDigitCode = function (stateInput) {
	 stateCode = this.stateList[stateInput]; 
	return stateCode;
	}
	
	
console.log(stateCode);		
	const settingsR = {
		"async": true,
		"crossDomain": true,
		"url": "https://rapidapi.p.rapidapi.com/reports?region_province=" +stateStorage+ "&iso=USA&region_name=US",
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
			
			var registryURL = "https://cors-anywhere.herokuapp.com/https://npiregistry.cms.hhs.gov/api/?version=2.1&address_purpose=primary&city=+ &address_purpose=primary&city=" + cityStorage;
			$.ajax({
				url: registryURL,
				method: "GET"
			}).then(function (responseRegistry) {
				console.log(responseRegistry);

				for (var i = 0; i < 10; i++) {

					

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
					}
					else {
						var resultsDiv = $(".results-div")
						var cardDiv = $("<div>").addClass("card bg-light mb-3");
						cardDiv.attr("style", "max-width: 18rem");
						var physicianName = $("<h5>").text(responseRegistry.results[i].basic.last_name + ", " + responseRegistry.results[i].basic.first_name);
						var physicianAddress = $("<span>").text(responseRegistry.results[i].addresses[0].address_1 + " " + responseRegistry.results[i].addresses[0].address_2 + ", " + responseRegistry.results[i].addresses[0].city + ", " + responseRegistry.results[i].addresses[0].state);
						var physicianPhoneNumber = $("<span>").text(responseRegistry.results[i].addresses[0].telephone_number);
						var physicianDirectionsLink = $("<span>").text("click here for directions").attr("src", "http://maps.google.com");
						var covidRisk = $("<span>").text("COVID Risk for " +stateStorage + ": " + riskLevel);
						cardDiv.append(physicianName, physicianAddress, physicianPhoneNumber, physicianDirectionsLink, covidRisk)
						resultsDiv.append(cardDiv);

					}

				}
			});
		}
		catch (error) {
			console.log(error);
		}

	})


};

$("#submitBtn").on("click", function (event) {
	event.preventDefault();
	stateInput =$("#state-name").val();
	localStorage.setItem("state", stateInput)
	cityInput = $("#city-name").val();
	localStorage.setItem("city", cityInput);
	console.log(cityInput);
	window.location.replace("./results.html");

});

searchCity();
console.log("loaded");





























































