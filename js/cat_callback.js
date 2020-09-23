// const astrosUrl = 'http://api.open-notify.org/astros.json';
// const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');
const cat = 'https://cat-fact.herokuapp.com/facts';
const section = document.createElement('section');

// ------ CHECK STATUS FUNCTION ---------- //

function checkStatus(url) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

// ------- FETCH FUNCTION WRAPPER -------- //

function fetchWrapper(url) {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json()) // parsing response to json
    .catch(error => console.log('Looks like there was a problem', error)) // only calls if error called
}

// 1. Basic xhr request function
// function getJSON(url, callback) {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', url);
//   xhr.onload = () => {
//     if(xhr.status === 200) {
//       let data = JSON.parse(xhr.responseText); // turn json into useable js object
//       //console.log(data);
//       return callback(data);
//     }
//   };
//   xhr.send();
// }

// /// 2. Promisified xhr
// function getJSON (url, callback) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.onload = () => {
//     if(xhr.status === 200) {
//       let data = JSON.parse(xhr.responseText); // turn json into useable js object
//       console.log(`xhr request returned: ${data}`);
//       resolve(data);
//     } else {
//       reject(Error(xhr.statusText));
//       }
//     }; // end onload
//     xhr.onerror = () => reject( Error('A network error occured') );
//     xhr.send();
//   }); // end Promise
// } // end function

// 3. Using fetch() API, does same as above but with syntactic sugar for ease of reading and construction
async function getJSON(url) {
  fetchWrapper;
}

// // 1. FUNCTION CALL AS EVENT LISTENER -> from @reggie ... this works, but not if there's no cats.user
// btn.addEventListener('click', (event) => { 
//   getJSON(cat, (json) => {
//       const cat1 = json.all.slice(0, 10).map(cats =>
//         `
//         <div id="cats"><p>${cats.user.name.first.toUpperCase()} ${cats.user.name.last.toUpperCase()} writes that ${cats.text}</p></div>
//       `).join(''); // removes commas from mapping
//       document.getElementById('people').appendChild(section);
//       section.innerHTML = cat1;
//     });
//   event.target.remove();});

  // 2. ABOVE, PROMISIFIED!
  btn.addEventListener('click', (event) => { 
    getJSON(cat)
    .then( (json) => {  
      const cat1 = json.all.slice(0, 10).map(cats =>
        `
        <div id="cats"><p>${cats.user.name.first.toUpperCase()} ${cats.user.name.last.toUpperCase()} writes:  ${cats.text}</p></div>
      `).join(''); // removes commas from mapping
      document.getElementById('people').appendChild(section); // adds section
      section.innerHTML = cat1; // fills section with api content
    })
  });

  // 3. ABOVE USING THE FETCH API

