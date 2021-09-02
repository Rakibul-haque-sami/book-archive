const searchInput = document.getElementById('searchText');
const cardContainer = document.getElementById("card-container")
const resultDisplay = document.getElementById('result')
const noResult = document.getElementById("no-result")
const errorText = document.getElementById('error')
const loadBookData = () => {
  const searchText = searchInput.value;

  /* ------------- clearing  --------- */
  searchInput.value = ''
  resultDisplay.textContent = ''
  noResult.textContent = ''
  cardContainer.textContent = ''

  /* ------------  Error handling  ------------ */
  if (searchText === '') {
    const h1 = document.createElement('h1')
    h1.innerText = 'Please Write something to display...'
    noResult.appendChild(h1);
  }
  else {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then(res => res.json())
      .then(data => displayBookDetails(data))

  }
}

/* --------------display book details  --------- */
const displayBookDetails = (number) => {



  const div = document.createElement('div');
  div.innerHTML = `<h4>Search result found: ${number.numFound}</h4>`
  resultDisplay.appendChild(div)

  const bookList = number.docs
  bookList.forEach(product => {

    const div = document.createElement('div')
    div.classList.add('col-4');
    div.innerHTML = `
              <div  class="round border p-2 text-center h-100 ">
              
              <img src="https://covers.openlibrary.org/b/id/${product.cover_i}-M.jpg" alt="">
              
              <h4>Book Name: ${product.title}</h4>

              <h6>Author Name: ${product.author_name}</h6>
              <h6>Publisher: ${product.publisher.slice(0, 5)}</h6>
              <h6>Publish Date: '${product.publish_year[0]}'</h6>
              </div>  
                `
    cardContainer.appendChild(div);

  });
}