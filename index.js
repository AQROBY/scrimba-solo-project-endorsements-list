import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-c9a02-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const endorsementsEl = document.getElementById("endorsements")
const publishButton = document.getElementById("btn")
const textArea = document.getElementById("text-area")

publishButton.addEventListener("click", function() {
    let inputValue = textArea.value
    
    push(endorsementsInDB, inputValue)
    
    clearTextArea()
})

onValue(endorsementsInDB, function(snapshot){
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        
        clearEndorsementsEl()
        
        for (let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            appendItemToEndoresementsEl(currentItem)
        }
    }
    else{
        endorsementsEl.innerHTML = "No items here...yet"
    }
})

function clearEndorsementsEl() {
    endorsementsEl.innerHTML = ""
}

function appendItemToEndoresementsEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    
    endorsementsEl.append(newEl)
}

function clearTextArea(){
    textArea.value = ""
}
