const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?size=10';

localStorage.setItem('pagination','0')

const getData = async api => {
  try{
    const response = await fetch(api)
   const products = await response.json();
    if(products.length > 0){
    let output = products.map(product => {
      document.createElement('div')
      return (`
        <div class="product">
          <article class="Card">
            <img src="${product.category.image}" alt="${product.title}">
            <h2>${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
          </div>
      `)
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output;
    newItem.innerHTML = output.join("");
    $app.appendChild(newItem);
  }
  else
  {
    let noMoreProducts = document.createElement("h1")
    noMoreProducts.classList.add('message')
    noMoreProducts.innerText = "No hay más productos por mostrar"
    $app.appendChild(noMoreProducts)
    intersectionObserver.unobserve($observe)
  }
  }
catch(error){
  console.log(error)
  }
}

const loadData =async () => {
  const page= localStorage.getItem('pagination')
    const offset = page * 10;
    const limit = 10;
    const api = `${API}&offset=${offset}&limit=${limit}`;
    await getData(api);
  }

  



const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      loadData();
      localStorage.setItem('pagination',parseInt(localStorage.getItem('pagination'))+1)
    }
});
}, {
  
  rootMargin: '0px 0px 100% 0px',
});


intersectionObserver.observe($observe);


