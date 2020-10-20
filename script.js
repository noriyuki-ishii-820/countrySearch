const userInput = "";

searchCountry = () => {
  let userInput = $("#userInput").val().trim();
  console.log(userInput);

  const queryURL = "https://restcountries.eu/rest/v2/name/" + userInput;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    .fail(function () {
      alert("the input is invalid, please try again.");
      location.reload();
    })

    .then(function (response) {
      $("#countryName").text(response[0].name);

      // overview

      $("#capital").text("Capital : " + response[0].capital);
      $("#language").text("Language : " + response[0].languages[0].name);
      $("#population").text(
        "Population : " +
          response[0].population.toLocaleString("en") +
          " people"
      );

      $("#area").text(
        "Area : " + response[0].area.toLocaleString("en") + " km2"
      );

      $("#domain").text("Domain : " + response[0].topLevelDomain);
      $("#intlphone").text("Calling Code : " + "+" + response[0].callingCodes);
      $("#timezone").text("Timezone : " + response[0].timezones[0]);

      $("#flag").empty();
      const flagURL = response[0].flag;
      const img = $("<img>");
      img.addClass("flagImg");
      img.attr("src", flagURL);
      $("#flag").append(img);

      // geography

      $("#region").text("Region : " + response[0].region);
      $("#subregion").text("Subregion : " + response[0].subregion);
      $("#borders").text(
        "Bordering With : " + response[0].borders.length + " countries."
      );

      const countryLat = response[0].latlng[0];
      const countryLng = response[0].latlng[1];

      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: countryLat, lng: countryLng },
        zoom: 3,
      });
    });
  $(".mainbox").removeClass("hide");
  $("#userInput").val("");
};

$("#search").on("click", function (event) {
  event.preventDefault();
  searchCountry();
});

$("#random").on("click", function (event) {
  event.preventDefault();

  const randomName =
    countryList[Math.floor(Math.random() * countryList.length)];

  $("#userInput").val(randomName);

  searchCountry();

  $("#userInput").val("");
});
