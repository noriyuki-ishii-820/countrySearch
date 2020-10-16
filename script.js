const userInput = "";

searchCountry = () => {
  let userInput = $("#userInput").val().trim();
  // console.log(userInput);

  const queryURL = "https://restcountries.eu/rest/v2/name/" + userInput;
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    const countryName = response[0].name;
    $("#countryName").text(countryName);

    const countryLat = response[0].latlng[0];
    const countryLng = response[0].latlng[1];
    console.log(countryLat);
    console.log(countryLng);

    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: countryLat, lng: countryLng },
      zoom: 3,
    });
  });
};

$("#search").on("click", function (event) {
  event.preventDefault();
  searchCountry();
});
