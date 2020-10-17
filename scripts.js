console.log("JS is working!");

$(document).ready(function () {



































































































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