

// our elemnts
let containerCard = document.getElementById("containerCard"),
    addBtn = document.getElementById('addBtn'),
    addForm = document.getElementById("addForm"),
    main = document.querySelector('main'),
    add = document.querySelector('.true'),
    cansle = document.querySelector('.false'),
    title = document.getElementById('newTitle'),
    content = document.getElementById('content');


// fetch data from a server
// make an HTTP request to an API and parse the JSON response received from the API
const getData = (link) => {
    // link parameter, which represents the URL from where the data will be fetched. 
    return new Promise((resolve, reject) => {
        let myRequest = new XMLHttpRequest();
        myRequest.onload = () => {
            if (myRequest.readyState === 4 && myRequest.status == 200) {
                resolve(JSON.parse(myRequest.responseText))
                // resolve function is used to fulfill the promise with the obtained data.

                //  JSON.parse() method is a built-in JavaScript function that takes a JSON-formatted string as input and converts it into a JavaScript object. 
            } else reject(Error("No Data Found"))
        }
        myRequest.open("GET", link)
        myRequest.send();
    })
}
getData("https://jsonplaceholder.typicode.com/posts")
    .then(json => json.forEach(el => addItem(el.title, el.body)))
    .catch(rej => console.log(rej))
// If the promise returned by getData is resolved (the request is successful and data is retrieved), the .then() block is executed.


//dom code event 
addBtn.addEventListener("click", () => {
    addForm.style.display = "block"
    addBtn.parentElement.style.display = "none"
    // use parent element to hide spftbkg
    window.scrollTo(0, document.body.scrollHeight - 300);
})
// ows a form when a button ("addBtn") is clicked and hides the button itself



cansle.addEventListener("click", () => {
    addForm.style.display = "none"
    addBtn.parentElement.style.display = "block"

})

// add to list when click true

add.addEventListener("click", () => {
    if (title.value.trim() !== "" && content.value.trim() !== "") {
        addForm.style.display = "none";
        addBtn.parentElement.style.display = "block";
        addItem(title.value, content.value)
        // post requst
        postItemFetch(title.value, content.value)
        title.value = "";
        content.value = "";
    } else alert("enter the title & containt")
})





// my dom code functions دووم 

const addItem = (title, body) => {
    let
        divCard = document.createElement('div'),
        container = document.createElement('div'),
        heading2 = document.createElement('h2'),
        Paraghraph = document.createElement('p'),
        mySpans = document.createElement('div'),
        divSpan1 = document.createElement('div'),
        divSpan2 = document.createElement('div'),
        Span1 = document.createElement('span'),
        Span2 = document.createElement('span'),
        myTitle = document.createTextNode(title),
        mybody = document.createTextNode(body),
        span1txt = document.createTextNode("P1"),
        span2txt = document.createTextNode("health");
    divCard.className = "card"
    mySpans.className = "spans"
    heading2.appendChild(myTitle)
    Paraghraph.appendChild(mybody)
    Span1.appendChild(span1txt)
    Span2.appendChild(span2txt)
    divSpan1.appendChild(Span1)
    divSpan2.appendChild(Span2)
    mySpans.appendChild(divSpan1)
    mySpans.appendChild(divSpan2)
    container.appendChild(heading2)
    container.appendChild(Paraghraph)
    container.appendChild(mySpans)
    divCard.appendChild(container)
    containerCard.appendChild(divCard)

}
//post Item with Fetch 
const postItemFetch = (title, body) => {
    fetch('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "userId": 1,
                    "id": 1,
                    "title": title,
                    "body": body
                }
            ),
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(console.error("Error:something is wrong"))
}