console.log("JS is working!");

$(document).ready(function () {







































































    for (var i = 0; i < 5; i++) {
        var resultsDiv = $("<div>").addClass("card bg-light mb-3");
        resultsDiv.attr("style", "max-width: 18rem")
        var physicianName = $("h5>");
        var physicianAddress = $("<span>");
        var physicianPhoneNumber = $("<span>");
        var physicianDirectionsLink = $("<span>");
        var covidRisk = $("<span>");
        resultsDiv = append(physicianName, physicianAddress, physicianPhoneNumber, physicianDirectionsLink, covidRisk)

    }
}