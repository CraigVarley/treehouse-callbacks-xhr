const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');
const section = document.createElement('section');



// Make an AJAX request
function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText); // turn json into useable js object
      console.log(data);
      return callback(data);
    }
  };
  xhr.send();
}

// btn.addEventListener('click', (event) => { 
//   getJSON(cat, (json) => {
//       const cat1 = json.all.map(cats => `<p>${cats.text}</p>`); // WORKS:maps cat text from json object into new array
//       // if (cats.user) {
        
//       // }
//       // console.log(cat1);
//       document.getElementById('people').appendChild(section);
//       section.innerHTML = cat1;
//       // generateHTML();
//     });
//   event.target.remove();
// });

// from @reggie ... this works, but not if there's no cats.user
btn.addEventListener('click', (event) => { 
  getJSON(wikiUrl, (json) => {
    //   const cat1 = json.all.slice(0, 10).map(cats =>
    //     `
    //     <div id="cats"><p>${cats.user.name.first.toUpperCase()} ${cats.user.name.last.toUpperCase()} writes that ${cats.text}</p></div>
    //   `).join(''); // removes commas from mapping

      document.getElementById('people').appendChild(section);
      section.innerHTML = cat1;
    });
//   event.target.remove();
});