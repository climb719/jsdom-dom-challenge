//1. timer increment every second once page loads
//when page loads- script is at bottom, so done
//set a timer - setInterval - runc code every second
//change number on timer
const timer = document.getElementById("counter")
const buttonContainer = document.getElementById("button-container")
const likesUl = document.querySelector("ul.likes")
const commentForm = document.getElementById("comment-form")
const commentList = document.getElementById("list")

let  currentNum = 0
let counterIncrementing = true
let likedNumbers = {}

setInterval(() => {
    if (counterIncrementing) {
    changeCounter(1)
    }
    //currentNum = currentNum + 1
    //two arguments, callback function we want to reun adn how often we want it to run 
   //timer.innerText = currentNum
}, 1000)

//2. user can manually increment and decrement
//add event listeners so that: 
//when + clicked, update counter/cuurentNum by + 1 and update DOM
//when - clicked, update currentNum by -1/ update DOM

buttonContainer.addEventListener("click", event => {
    console.log(event.target)
   // debugger
    if (event.target.id === "plus") {
        changeCounter(1)
    }
    else if (event.target.id === "minus") {
        changeCounter(-1)
    }
    else if (event.target.id === "pause") {
      togglePause()
    }
    else if (event.target.id === "heart") {
      updateLikes()
    }

})

//4. pause the counter, disable buttons, change the text to resume
// when pause button clicked - add else if to above event delegation 
// pause counter- stop interval
function togglePause() {
  // debugger 
   counterIncrementing = !counterIncrementing
    document.querySelectorAll("button").forEach(button => {
       if (button.id !== "pause") {
          button.disabled = !counterIncrementing
       } else {
         if (counterIncrementing) {
          button.innerHTML = "pause"
         } else {
           button.innerText = "resume"
         }
       }
    })
}

function changeCounter(amount) {
    currentNum = currentNum + amount
    timer.innerText = currentNum
}

//5. add into event listeners, so if like button is clicked and 
// if number hasesn't been liked- add new li to the ul.likes
//if number has been liked - find li for that number and 
//update text to say number n has been liked x times 

function updateLikes() {
  if (likedNumbers[currentNum]) {
    const li = document.querySelector(`[data-number="${currentNum}"]`)
    likedNumbers[currentNum] += 1
    li.innerText = `The number ${currentNum} has been liked ${likedNumbers[currentNum]} times`
  } else {
    likedNumbers[currentNum] = 1
    console.log(currentNum)
    const li = document.createElement("li")
    li.dataset.number = currentNum
    li.innerText = `The number ${currentNum} has been liked 1 time`
    //debugger
    likesUl.append(li)
  }


  //6. add event listener for when form is submited
  // take value of form input
  //add it to dom
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const p = document.createElement("p")
    const input = document.getElementById("comment-input")
    p.textContent = input.value
    commentList.append(p)
    event.target.reset()
  })

}

