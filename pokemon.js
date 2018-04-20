$(document).ready(function () {

    var pokemon = [
        "charmander", "squirtle", "bulbasaur", "pikachu", "raichu",
        "snorlax", "evee", "vaporeon", "flareon", "jolteon",
        "meowth", "mewtwo", "mew", "dragonite"
    ];
    function populateButtons(pokemonArray, pokemonAdd, addLocation) {
        $(addLocation).empty();
        for (var i = 0; i < pokemonArray.length; i++) {
            var a = $("<button>");
            a.addClass(pokemonAdd);
            a.attr("data-type", pokemonArray[i]);
            a.text(pokemonArray[i]);
            $(addLocation).append(a);
        }
    }

    $(document).on("click", ".pokemon-button", function () {
        $("#pokemon").empty();
        $(".pokemon-button").removeClass("active");
        $(this).addClass("active");
        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var pokemonDiv = $("<div class=\"pokemon-item\">");
                    var rating = results[i].rating;
                    var b = $("<p>").text("Rating: " + rating);
                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;
                    var pokemonImage = $("<img>");
                    pokemonImage.attr("src", still);
                    pokemonImage.attr("data-still", still);
                    pokemonImage.attr("data-animate", animated);
                    pokemonImage.attr("data-state", "still");
                    pokemonImage.addClass("pokemon-image");
                    pokemonDiv.append(b);
                    pokemonDiv.append(pokemonImage);
                    $("#pokemon").append(pokemonDiv);
                }
            });
    });

    $(document).on("click", ".pokemon-image", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-pokemon").on("click", function (event) {
        event.preventDefault();
        var newpokemon = $("input").eq(0).val();
        if (newpokemon.length > 2) {
            pokemon.push(newpokemon);
        }
        populateButtons(pokemon, "pokemon-button", "#pokemon-buttons");

    });

    populateButtons(pokemon, "pokemon-button", "#pokemon-buttons");
});
