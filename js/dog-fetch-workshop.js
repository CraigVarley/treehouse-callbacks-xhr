const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');
const dogPics = 'https://dog.ceo/api/breeds/image/random';
const breedList = 'https://dog.ceo/api/breeds/list/all';



// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
// there are numerous fetch methods at mdn

// wrapper function around fetch to prevent repetition
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json()) // parsing response to json
        .catch(error => console.log('Looks like there was a problem', error)) // only calls if error called

    }

// accepts any iterable as arg, both MUST BE RESOLVED BEFORE CONTINUING, 
// v useful for cooordinate respoonses, if retrieve user, then user info, then user, etc.
Promise.all([ // returns ONE PROMISE in an indexed array
    fetchData(breedList),
    fetchData(dogPics)
])
    .then(data => { // now assign the indexed elements to variables
        const listOfBreeds = data[0].message;
        const randomImage = data[1].message;

        generateOptions(listOfBreeds);
        generateImage(randomImage);
    })

        // THESE FUNCTIONS ARE REPLACED BY THE ABOVE PROMISE.ALL
// // get the breed list 
// fetchData(breedList)
//     .then(data => generateOptions(data.message))

// // get the dog pics
// fetchData(dogPics) // returns promise object, data we want is in the body of the response
//     .then(data => generateImage(data.message)) // passes to function below, which is in message field (url as string)

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

//status check on HTTP response for fetch function
function checkStatus(response) {
    if(response.ok) { // read-only property of Responsive (boolean)
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}


// this MAPS the individual data.message items into html tags
function generateOptions(data) {                                                        // join below removes the commas
    const options = Object.keys(data).map(item => `<option value='${item}'>${item}</option>`).join(''); // NOTE: data is an object, this turns it into an array for mapping!
    select.innerHTML = options; /// adds all the <option>s into select dropdown
}

function generateImage(data) {
    const html = // generates html from passed data using id breeds (see var above)
        `
        <img src='${data}' alt>            
        <p>Click to view images of ${select.value}s}</p>
        `;
    card.innerHTML = html;              // fills the card
}

function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    // this retrieves selected breed and replaces image and text
    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            img.src = data.message;
            img.alt = breed;
            p.textContent = `Click to view more ${breed}s`;
        })
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

// calls above function on breed select or picture click
// if picture click, breed var is same so just
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage); // <-- no parens after func as callback
form.addEventListener('submit', postData);

// ------------------------------------------
//  POST DATA
// ------------------------------------------

// uses api placeholder site
function postData(e) {
    e.preventDefault(); // CHECK WHY THIS NEEDS TO BE HERE.
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    // config variable for 2nd arg below, easier to read
    const config = {
        method:'POST',
        headers:{ // another object for the headers
            'Content-Type': 'application/json'
        },
        // ANOTHER OBJECT FOR THE BODY
        body: JSON.stringify({name:name, comment:comment}) // ES2015  WHEN KEY/VALUE SAME CAN USE KEY ONLY AS HERE
    };

    // FETCH REQUEST: BELOW 2nd param is an object containing req values for POST
    fetch('https://jsonplaceholder.typicode.com/comments', config) 
        .then(checkStatus)
        .then(res => res.json())
        .then(data => console.log(data))
}