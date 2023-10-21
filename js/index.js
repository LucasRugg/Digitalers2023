let productos = JSON.parse(localStorage.getItem("productos"));
const cardContainer = document.getElementById("cardContainer");

productos.forEach(prod => {
    cardContainer.innerHTML += `<article class="product-card">
    <div class="card-header">
      <figure>
        <img  class="img-producto" src="${prod.imagen}" alt="${prod.titulo}} " />
      </figure>
      <div class="card-img-info">
        <h2>${prod.nombreJugador}  </h2>
      </div>
    </div>
    <div class="card-main">
      <h2>${prod.titulo} </h2>
      <div class="card-description">
        <p>
          ${prod.descripcion} 
        </p>
      </div>
      <div class="card-prices">

        <div class="card-price"> $ ${prod.precio}</div>
        
      </div>
    </div>
    <div class="card-footer">
      <button class="card-details">Ver detalles</button>
      <button class="card-buy">Comprar</button>
    </div>
  </article>` 
    
});