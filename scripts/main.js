renderRandomBeerInfo()

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

        hideBeerInfoPage(beerInfoPage)
        hideBeerInfoPage(specificBeerInfoPage)

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
        showBeerInfoPage(beerInfoPage)
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



ul.addEventListener("click", function (e) {
    let pickedBeer = e.target.innerText
    showBeerInfoPage(specificBeerInfoPage)
    renderBeerInfo(pickedBeer)

})

const randomizeButton = document.querySelector(".randomize-button")
randomizeButton.addEventListener("click", function () {

    renderRandomBeerInfo()
    hideBeerInfoPage(beerInfoPage)

})


let currentPage = 1
const displayedPage = document.querySelector(".current-page")
displayedPage.innerHTML = currentPage
const leftArrow = document.querySelector(".left-arrow")
const rightArrow = document.querySelector(".right-arrow")

leftArrow.addEventListener("click", () => {

    toPreviousPage()
})

rightArrow.addEventListener("click", () => {

    toNextPage()

})

getData() //kallar på funktionen som hämtar datan



function hideList() { //tar bort li-elementen från ul och gömmer hela list-diven


    beerListContainer.style.display = "none"
}

function clearList() {

    ul.innerHTML = ""
}

function showList() { //visar list-diven

    beerListContainer.style.display = "block"
}

function clearInput() {

    inputField.value = ""

}

function hideBeerInfoPage(page) {

    page.style.display = "none"

}

function showBeerInfoPage(page) {

    page.style.display = "block"
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
    alcoholVol.innerHTML = `${randomBeer[0].volume.value} ${randomBeer[0].volume.unit}`
    beerIngr.innerHTML = `${randomBeer[0].ingredients.malt[0].name} ${randomBeer[0].ingredients.malt[0].amount.value} ${randomBeer[0].ingredients.malt[0].amount.unit}`
    beerHops.innerHTML = `${randomBeer[0].ingredients.hops[0].name} ${randomBeer[0].ingredients.hops[0].amount.value} ${randomBeer[0].ingredients.hops[0].amount.unit}`
    foodPair.innerHTML = `${randomBeer[0].food_pairing}`
    brewerTips.innerHTML = `${randomBeer[0].brewers_tips}`
    beerImg.src = `${randomBeer[0].image_url}`

    if (randomBeer[0].image_url == null) {

        beerImg.src = "images/ipaglass.png"

    } else {

        beerImg.src = `${randomBeer[0].image_url}`
    }

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

    for (i = 0; i < chosenBeer.length; i++) {

        if (chosenBeer[i].name == inputBeer) {

            beerTitle.innerHTML = `${chosenBeer[i].name}`
            beerDesc.innerHTML = `${chosenBeer[i].description}`
            alcoholVol.innerHTML = `${chosenBeer[i].volume.value}  ${chosenBeer[i].volume.unit}`
            beerIngr.innerHTML = `${chosenBeer[i].ingredients.malt[0].name} ${chosenBeer[i].ingredients.malt[0].amount.value} ${chosenBeer[i].ingredients.malt[0].amount.unit}`
            beerHops.innerHTML = `${chosenBeer[i].ingredients.hops[0].name} ${chosenBeer[i].ingredients.hops[0].amount.value} ${chosenBeer[i].ingredients.hops[0].amount.unit}`
            foodPair.innerHTML = `${chosenBeer[i].food_pairing}`
            brewerTips.innerHTML = `${chosenBeer[i].brewers_tips}`
            beerImg.src = `${chosenBeer[i].image_url}`


            if (chosenBeer[i].image_url == null) {

                beerImg.src = "images/ipaglass.png"

            } else {

                beerImg.src = `${chosenBeer[i].image_url}`
            }

        }
    }

}

function renderImageCard(beer) {//tar en öl som input och renderar ut bilden på den

    const imageElement = document.querySelector("img")

    if (beer[0].image_url == null) {

        imageElement.src = "images/ipaglass.png"

    } else {

        imageElement.src = `${beer[0].image_url}`
    }

}

async function showSuggestions(search) {//visar en lista på öl som matchar ens sökning

    let allSuggestions = []

    const result = await getData()

    clearList()
    showList()


    for (let i = 0; i < result.length; i++) {

        let suggestion = result[i].name

        if (suggestion.toLowerCase().includes(search.toLowerCase())) {

            allSuggestions.push(suggestion)

        }


        if (search.length == 0) {
            hideList()
        }

    } divideSuggestions(allSuggestions)

}


function divideSuggestions(input) {

    let currentPageContent = [input[0], input[1], input[2], input[3], input[4],
    input[5], input[6], input[7], input[8], input[9]]

    currentPageContent.forEach(function(item){

    const li = document.createElement("li")
    ul.append(li)
    li.innerHTML = item

})

}


function toNextPage() {
    displayedPage.innerHTML = currentPage += 1
    clearList()


}

function toPreviousPage() {

    if (currentPage > 1) {
        displayedPage.innerHTML = currentPage -= 1
        clearList()

    }
}

