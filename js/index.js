document.addEventListener("DOMContentLoaded", function() {
//all code below here

function getBooks(){
  fetch('http://localhost:3000/books',{
    method: 'GET',
    headers:
    {
      "Content-type" : "application/json"
    }
  })
  .then (response =>{return response.json()})
  .then (function(data){
    listBooks(data)
  })
}

getBooks()
booksArray = []

function listBooks(data){
  let bookList = document.getElementById('list')
  //would I .map instead? why?
  for (let book of data){
    booksArray.push(book)
    let bookId = book.id
    let bookTitle = book.title
   

    let bookIdLi = document.createElement('li')
    let bookTitleLi = document.createElement('li')
    bookTitleLi.textContent = bookTitle
    bookTitleLi.id = bookId
    
    bookTitleLi.addEventListener('click', handleBookClick)
    bookList.append(bookTitleLi)
   
  }
}

function handleBookClick(e){
  let showPanel = document.getElementById("show-panel")
  showPanel.innerHTML = ""
  fetch(`http://localhost:3000/books/${e.target.id}`,{
    method: 'GET',
    headers:
    {
      "Content-type" : "application/json"
    }
  })
  .then (response =>{return response.json()})
  .then (function(data){
    let book = data
    

 
  let bookTitle = book.title
  let bookSubtitle = book.subtitle 
  let bookAuthor = book.author 
  let bookDesc = book.description
  let bookImgUrl = book.img_url
  debugger
  let bookUsers = book.users
  console.log(bookUsers)
  
  let bookTitleH1 = document.createElement('h1')
  bookTitleH1.textContent= bookTitle

  
  let bookSubtitleP = document.createElement('p')
    let bookAuthorP = document.createElement('p')
    let bookDescP = document.createElement('p')
    let bookImgUrlLi = document.createElement('img')
    bookImgUrlLi.style.width = "150px"
    let bookUsersUl = document.createElement('ul')
    let likeButton = document.createElement('button')
    likeButton.addEventListener("click", handleNewLike)
    likeButton.textContent = "Like this book?"
    likeButton.id = book.id

    bookSubtitleP.textContent = bookSubtitle
    bookAuthorP.textContent = bookAuthor
    bookDescP.textContent = bookDesc
    bookImgUrlLi.src = bookImgUrl
  
  showPanel.append(bookTitleH1)
  showPanel.append(bookImgUrlLi)
  showPanel.append(bookAuthorP)
  showPanel.append(bookSubtitleP)
  showPanel.append(likeButton)
  
  showPanel.append(bookDescP)
  showPanel.append(bookUsersUl)
  for (let user of bookUsers){
    let oneUser = document.createElement('li')
    oneUser.className = "user"
    oneUser.textContent = user.username 
    bookUsersUl.append(oneUser)
  }
  
})
}
let usersArray = []
function handleNewLike(e){


function getUsers(){
  
  // let newUser = {"id": 15, "username": "Hutch"}
  // usersArray.push(newUser)
 
  fetch(`http://localhost:3000/books/${e.target.id}`,{
  method: 'GET',
  headers:
  {
    "Content-type" : "application/json"
  }
})
.then (response =>{return response.json()})
.then (function(data){
  
  let dataUsers = data.users
  console.log(dataUsers)
  debugger
  for (let user of dataUsers){
    usersArray.push(user)
  }
})

}
getUsers()
let usersObj = {"users": usersArray}

function newUsers() {
fetch(`http://localhost:3000/books/${e.target.id}`,{
  method: 'PATCH',
  headers:
  {
    "Content-type" : "application/json"
  },
  body:JSON.stringify(usersObj)
})
.then (response =>{return response.json()})
.then (function(data){
  debugger
 console.log(data)
})
}
newUsers()

}






















  //all code above here
});
