const contenedorOpiniones = document.querySelector(".contenedor-opiniones") 
 
 const url = 'https://jsonplaceholder.typicode.com/comments';

  fetch(url)
  .then(res => res.json())
  .then(data => {
        data.forEach(opinion => {
            const div = document.createElement("div");
            div.classList.add("tarjeta-opiniones");
            div.innerHTML = `
            <p>${opinion.body}</p> <br>
            <p> <b> Email: ${opinion.email} </b></p>
                </div>
            `;

            contenedorOpiniones.append(div);
        })
  })

