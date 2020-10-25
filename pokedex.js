$(document).ready(function () {
    getPokemon("https://pokeapi.co/api/v2/pokemon/")


    $("#more_pokemons").click(function(){
        getPokemon(this.dataset.next)
    });

    $('#pokedex').click(function(e){
        if(e.target.dataset.pokemon){
            var pokemon_name = e.target.dataset.pokemon
            var pokemon_url = e.target.dataset.pokemonurl
            $("#pokemonmodalLabel").html(pokemon_name)
            getDataPokemon(pokemon_url)
        }
    })
   
});
function getDataPokemon(pokemon_url){
    $.ajax(pokemon_url).done(function(data_result){
        $("#pokemon-types").html("")
        $("#pokemon-abilities").html("")
        $("#pokemon-moves").html("")

        data_result.types.forEach(function(result){
            $("#pokemon-types").append("<li>"+result.type.name+"</li>")
        });
        data_result.abilities.forEach(function(result){
            $("#pokemon-abilities").append("<li>"+result.ability.name+"</li>")
        });
        data_result.moves.slice(-5).forEach(function(result){
            $("#pokemon-moves").append("<li>"+result.move.name+"</li>")
        });    
    });

};

function getPokemon(url){
    $.ajax(url)
    .done(function(data){
        i = 1
        data.results.forEach(function(pokemon, index){
            index = i++;
            addPokemon(pokemon, index)
        });
        $("#more_pokemons").attr('data-next', data.next);
    })
};

function addPokemon(pokemon, index){
    $("#pokedex").append(
        '<div class="col-3 my-2">'+
            '<div class="card ">'+
                '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'+index+'.svg" class="card-img-top p-3" style="height: 200px;" alt="'+pokemon.name+'">'+
                '<div class="card-body">'+
                    '<h5 class="card-title">'+pokemon.name+'</h5>'+
                    '<a href="#" class="btn btn-primary btn-modal-pokemomn" data-toggle="modal" data-target="#pokemonmodal"  data-pokemonurl="'+pokemon.url+'" data-pokemon="'+(pokemon.name)+'" >Más información</a>'+
                '</div>'+
            '</div>'+
        '</div>'
    )
}