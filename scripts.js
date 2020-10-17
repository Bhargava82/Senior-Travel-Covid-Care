console.log("JS is working!");







































































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
	} else if (newCases >=251 && newCases <=500) {
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
