console.log("JS is working!");

// JS variables
var cityInput;

function searchCity() {
	try {
		var cityStorage = localStorage.getItem("city");
		var registryURL = "https://cors-anywhere.herokuapp.com/https://npiregistry.cms.hhs.gov/api/?version=2.1&address_purpose=primary&city=+ &address_purpose=primary&city=" + cityStorage;
		$.ajax({
			url: registryURL,
			method: "GET"
		}).then(function (responseRegistry) {
			console.log(responseRegistry);
			for (var i = 0; i < 10; i++) {

				//gender check
				if (responseRegistry.results[i].basic.gender === "F") {
					console.log("Name: " + responseRegistry.results[i].basic.last_name + ", " + responseRegistry.results[i].basic.first_name);
					console.log("Gender: " + responseRegistry.results[i].basic.gender);
					console.log("Address: " + responseRegistry.results[i].addresses[0].address_1 + " " + responseRegistry.results[i].addresses[0].address_2 + ", " + responseRegistry.results[i].addresses[0].city + ", " + responseRegistry.results[i].addresses[0].state);
					console.log("Telephone: " + responseRegistry.results[i].addresses[0].telephone_number);
					console.log("Postal Code: " + responseRegistry.results[i].addresses[0].postal_code);
				}
			}
		});
	}
	catch (error) {
		console.log(error);
	}
};

$("#submitBtn").on("click", function (event) {
	event.preventDefault();
	cityInput = $("#city-name").val();
	localStorage.setItem("city", cityInput);
	zipInput = $("#zip-code").val();
	localStorage.setItem("zipCode", zipInput);
	providerInput = $("#provider-type").val();
	localStorage.setItem("providerType", providerInput);
	genderInput = $("#gender-type").val();
	localStorage.setItem("gender", genderInput);
	riskInput = $("#covid-risk").val();
	localStorage.setItem("covidRisk", riskInput);
	if (cityInput === "" || zipInput === "" || providerInput === "" || genderInput === "" || riskInput === "") {
		alert("Please complete all fields and selections.")
		return;
	}
	window.location.replace("./results.html");
});

$(".go-btn").on("click", function (event) {
	event.preventDefault();
	var selectOne = $("#select1").val();
	console.log(selectOne);
	var selectTwo = $("#select2").val();
	console.log(selectTwo);
});

$("#whatsThis").on("click", function () {
	console.log("What's this clicked!");
	window.open("https://www.cdc.gov/coronavirus/2019-ncov/travelers/how-level-is-determined.html");
})


searchCity();
console.log("loaded");


































































//COVID reports
const settingsR = {
	"async": true,
	"crossDomain": true,
	"url": "https://rapidapi.p.rapidapi.com/reports?region_province=Georgia&iso=USA&region_name=US&city_name=gwinnett&date=2020-04-16&q=US%20Georgia",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
		"x-rapidapi-key": "4e7288d871msh4411859255a7ef9p15aabejsn6bf06bbee388"
	}
};

$.ajax(settingsR).done(function (responseR) {
	console.log(responseR);
	console.log("County: " + responseR.data[0].region.cities[0].name);
	console.log("new cases = " + responseR.data[0].region.cities[0].confirmed_diff);
	console.log("County latitude = " + responseR.data[0].region.cities[0].lat);
	console.log("County longitude = " + responseR.data[0].region.cities[0].long);
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

	for (var i = 0; i < 5; i++) {
		var resultsDiv = $(".results-div")
		var cardDiv = $("<div>").addClass("card bg-light mb-3");
		cardDiv.attr("style", "max-width: 18rem");
		var physicianName = $("<h5>").text("Dr. Michael Johnson");
		var physicianAddress = $("<span>").text("555 1st Street");
		var physicianPhoneNumber = $("<span>").text("555-555-5555");
		var physicianDirectionsLink = $("<span>").text("click here for directions").attr("src", "http://maps.google.com");
		var covidRisk = $("<span>").text("COVID Risk: low");
		cardDiv.append(physicianName, physicianAddress, physicianPhoneNumber, physicianDirectionsLink, covidRisk)
		resultsDiv.append(cardDiv);
	}


})

// var cityName = localStorage.getItem("city-name");
