// fething data

async function getData() { //hämtar datan

    const request = await fetch("https://api.punkapi.com/v2/beers?per_page=80")
    // const request1 = await fetch("https://api.punkapi.com/v2/beers?page=1&per_page=80")
    // const request2 = await fetch("https://api.punkapi.com/v2/beers?page=2&per_page=80")

    const data = await request.json()

    return data
}

async function getRandomBeer() {//hämtar datan med random beer

    const request = await fetch("https://api.punkapi.com/v2/beers/random")
    const data = await request.json()

    return data
}


// alla eventlisteners

const navLinks = document.querySelectorAll("nav > a")
const beerInfoPage = document.querySelector(".info")

for (let link of navLinks) {
    link.addEventListener("click", (e) => {
        document.querySelectorAll("main > section").forEach(
            section => section.classList.remove("active")
        )

        if (e.target.innerText == "home") {
            renderRandomBeerInfo()
        }

        const section = document.querySelector("." + link.innerText.toLowerCase())
        section.classList.add("active")
        beerInfoPage.style.display = "none"
        specificBeerInfoPage.style.display = "none"
        hideList()
        clearList()
        clearInput()
    }
    )
}

const divLinks = document.querySelectorAll("div > a")

for (let link of divLinks) {
    link.addEventListener("click", () => {
        document.querySelectorAll("main > .info").forEach(
            section => section.classList.remove("active")
        )

        const section = document.querySelector("." + link.innerText.toLowerCase())
        section.classList.add("active")
        beerInfoPage.style.display = "block"
    }
    )
}

const inputField = document.querySelector(".beer-input")

inputField.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        const search = inputField.value
        showSuggestions(search)
    } else {
        return
    }
})

    

const ul = document.querySelector(".beer-suggestions")
const beerListContainer = document.querySelector(".beer-list")
const listItem = document.querySelector(".beer-suggestions li")
const specificBeerInfoPage = document.querySelector(".chosen-beer-info")
let numberOfItems = ul.getElementsByTagName(".beer-suggestions > li")



ul.addEventListener("click", function (e) {
    let pickedBeer = e.target.innerText
    specificBeerInfoPage.style.display = "block"
    renderBeerInfo(pickedBeer)

})

const randomizeButton = document.querySelector(".randomize-button")
randomizeButton.addEventListener("click", function () {

    renderRandomBeerInfo()
    beerInfoPage.style.display = "none"
})


let currentPage = 1
const displayedPage = document.querySelector(".current-page")
displayedPage.innerHTML = currentPage
const leftArrow = document.querySelector(".left-arrow")
const rightArrow  = document.querySelector(".right-arrow")

leftArrow.addEventListener("click", () =>{

    toPreviousPage()
})

rightArrow.addEventListener("click", () =>{

    toNextPage()
})

getData() //kallar på funktionen som hämtar datan

function hideList() { //tar bort li-elementen från ul och gömmer hela list-diven

    
    beerListContainer.style.display = "none"
}

function clearList(){

    ul.innerHTML = ""
}

function showList() { //visar list-diven

    beerListContainer.style.display = "block"
}

function clearInput(){

    inputField.value = ""

}


async function renderRandomBeerInfo() { //renderar ut random beer
    const beerTitle = document.querySelector(".beer-name")
    const beerDesc = document.querySelector(".description")
    const alcoholVol = document.querySelector(".alcohol-by-volume")
    const beerIngr = document.querySelector(".ingredients")
    const beerHops = document.querySelector(".hops")
    const foodPair = document.querySelector(".food-pairing")
    const brewerTips = document.querySelector(".brewers-tips")
    const beerImg = document.querySelector(".beer-info-img")

    const randomBeer = await getRandomBeer()

    beerTitle.innerHTML = `${randomBeer[0].name}`
    beerDesc.innerHTML = `${randomBeer[0].description}`
    alcoholVol.innerHTML = `${randomBeer[0].volume.value}  ${randomBeer[0].volume.unit}`
    beerIngr.innerHTML = `${randomBeer[0].ingredients.malt[name]}`
    beerHops.innerHTML = `${randomBeer[0].ingredients}`
    foodPair.innerHTML = `${randomBeer[0].food_pairing}`
    brewerTips.innerHTML = `${randomBeer[0].brewers_tips}`
    beerImg.src = `${randomBeer[0].image_url}`

    renderImageCard(randomBeer)

}

async function renderBeerInfo(inputBeer) { //renderar ut vald öl / //blir det inte en infinite loop?

    const beerTitle = document.querySelector(".chosen-beer-info .beer-name")
    const beerDesc = document.querySelector(".chosen-beer-info .description")
    const alcoholVol = document.querySelector(".chosen-beer-info .alcohol-by-volume")
    const beerIngr = document.querySelector(".chosen-beer-info .ingredients")
    const beerHops = document.querySelector(".chosen-beer-info .hops")
    const foodPair = document.querySelector(".chosen-beer-info .food-pairing")
    const brewerTips = document.querySelector(".chosen-beer-info .brewers-tips")
    const beerImg = document.querySelector(".chosen-beer-info .beer-info-img")

    const chosenBeer = await getData()

    for (i=0; i < chosenBeer.length; i++){

        if (chosenBeer[i].name == inputBeer) {

            beerTitle.innerHTML = `${chosenBeer[i].name}`
            beerDesc.innerHTML = `${chosenBeer[i].description}`
            alcoholVol.innerHTML = `${chosenBeer[i].volume.value}  ${chosenBeer[i].volume.unit}`
            beerIngr.innerHTML = `${chosenBeer[i].ingredients.malt[name]}`
            beerHops.innerHTML = `${chosenBeer[i].ingredients}`
            foodPair.innerHTML = `${chosenBeer[i].food_pairing}`
            brewerTips.innerHTML = `${chosenBeer[i].brewers_tips}`
            beerImg.src = `${chosenBeer[i].image_url}`
        } 
    }

}

function renderImageCard(beer) {//tar en öl som input och renderar ut bilden på den

    const imageElement = document.querySelector("img")

    imageElement.src = `
${beer[0].image_url}`

}

async function showSuggestions(search) {//visar en lista på öl som matchar ens sökning
    
    const result = await getData()
    
    clearList()
    showList()

    
    
    for (let i = 0; i < result.length; i++) {

        let suggestion = result[i].name
        

        if (suggestion.toLowerCase().includes(search.toLowerCase())) {

            
            const li = document.createElement("li")
            ul.append(li)

            li.innerHTML = suggestion
            console.log(numberOfItems.length)

//                 if(numberOfItems.length >4){

// console.log("hejhej")
//                 }
        }

        if (search.length == 0) {
            hideList()
        }

    }

}



function toNextPage(){
displayedPage.innerHTML= currentPage +=1
clearList()
}

function toPreviousPage(){

    if(currentPage >1){
    displayedPage.innerHTML= currentPage -=1
    clearList()

}
}





//showOnlyTen()
//function showOnlyTen(){



// for(current of numberOfItems){

//     console.log(current)

    // if (current < 10){

    //     // const li = document.createElement("li")
    //     //         ul.append(li)
    
    //     //         li.innerHTML = suggestion

        
    // }

// }


//}