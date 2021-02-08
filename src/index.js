import $ from "jquery";
import "./style/bootstrap.min.css";

$.ajax({
    url: "http://www.omdbapi.com/?apikey=63bd0828&s=avengers",
    success: results => {
        const movies = results.Search;
        let cards = "";
        movies.forEach(m => {
            cards += showCards(m);
        });
        $(".movie-container").html(cards);

        //ketika tombol detail di klik
        $(".modal-detail-button").on("click ", function () {
            $.ajax({
                url: "http://www.omdbapi.com/?apikey=63bd0828&i=" +
                    $(this).data("imdbid"),
                success: m => {
                    const movieDetail = showMovieDetail(m);
                    $(".modal-body").html(movieDetail);
                },
                error: e => {
                    console.log(e.responseText);
                }
            });
        });
    },

    error: e => {
        console.log(e.responseText);
    }
});

function showCards(m) {
    return `<div class="col-md-4 my-3">
            <div class="card">
            <image-figure src="${m.Poster}" class="card-img-top"></image-figure>
            <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                <a href="#" type="button" class="btn btn-primary" data-toggle="modal "data-target="#movieDetailModal" data-imdbID="${m.imdbID}">Detail</a>
            </div>
            </div>
            </div>`;
}




class ImageFigure extends HTMLElement {
    connectedCallback() {
        this.src = this.getAttribute("src") || null;
        this.alt = this.getAttribute("alt") || null;
        this.caption = this.getAttribute("caption") || null;

        this.innerHTML = `
                        <figure>
                            <img src="${this.src}"
                                alt="${this.alt}">
                        </figure>
                        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.render();
    }
}

customElements.define("image-figure", ImageFigure);