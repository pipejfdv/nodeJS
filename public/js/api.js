function searchCharacter() {
    const searchTerm = $("#search-input").val().trim();  
    if (searchTerm === "") {
        return;  
    }

    $.ajax({
        url: "https://rickandmortyapi.com/api/character/",
        type: "get",
        dataType: "json",
        data: {
            name: searchTerm 
        },
        success: function(result) {
            $("#character-grid").empty();  

            if(result.results && result.results.length > 0) {
                let characters = result.results; 
                $.each(characters, function(i, data) {
                    $("#character-grid").append(
                        `<div class="col-md-3">
                            <div class="card mb-3">
                                <img class="card-img-top" src="${data.image}" alt="Imagen del personaje">
                                <div class="card-body">
                                    <h5 class="card-title">${data.name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">Origen: ${data.origin.name}</h6>
                                    <p class="card-text">Localización: ${data.location.name}</p>
                                    <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#modal" data-id="${data.id}">Ver Detalles</a>
                                </div>
                            </div>
                        </div>`
                    );
                });

                $("#search-input").val("");  
            } else {
                $("#character-grid").html(
                    `<div class="col">
                        <h2 class="text-center">No se encontraron personajes con ese nombre.</h2>
                    </div>`
                );
            }
        },
        error: function() {
            $("#character-grid").html(
                `<div class="col">
                    <h2 class="text-center text-danger">Error en el servicio. Intente nuevamente más tarde.</h2>
                </div>`
            );
        }
    });
}

$("#search-button").on("click", function() {
    searchCharacter();
});

$("#search-input").on("keyup", function(e) {
    if (e.keyCode === 13) { 
        searchCharacter();
    }
});

// Funcionalidad del modal
$(document).on('click', '.see-detail', function() {
    const characterId = $(this).data('id');

    $.ajax({
        url: `https://rickandmortyapi.com/api/character/${characterId}`,
        type: "get",
        dataType: "json",
        success: function(character) {
            $('#modal-name').text(character.name);
            $('#modal-image').attr('src', character.image);
            $('#modal-origin').text(character.origin.name);
            $('#modal-location').text(character.location.name);
        }
    });
});
