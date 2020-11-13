renderRandomBeerInfo() // anropas så man får en random öl direkt när man kommer in på sidan

// globala variabler

let currentPage = 1
let search

// query selectors

const navLinks = document.querySelectorAll("nav > a")
const beerInfoPage = document.querySelector(".info")
const divLinks = document.querySelectorAll("div > a")
const inputField = document.querySelector(".beer-input")
const ul = document.querySelector(".beer-suggestions")
const beerListContainer = document.querySelector(".beer-list")
const listItem = document.querySelector(".beer-suggestions li")
const specificBeerInfoPage = document.querySelector(".chosen-beer-info")
const randomizeButton = document.querySelector(".randomize-button")
const errorMsg = document.querySelector(".error-mess")
const displayedPage = document.querySelector(".current-page")
const leftArrow = document.querySelector(".left-arrow")
const rightArrow = document.querySelector(".right-arrow")

// fething data

async function getData(page, beerNameRequest) { //hämtar datan

    const request = await fetch("https://api.punkapi.com/v2/beers?page=" + page + "&per_page=10&beer_name=" + beerNameRequest)
    const data = await request.json()

    return data
}

async function getRandomBeer() {//hämtar datan med random beer

    const request = await fetch("https://api.punkapi.com/v2/beers/random")
    const data = await request.json()

    return data
}

// eventlisteners

for (let link of navLinks) { // länkarna i nav bar
    link.addEventListener("click", (e) => {
        document.querySelectorAll("main > section").forEach(
            section => section.classList.remove("active")
        )

        if (e.target.innerText == "home") {
            renderRandomBeerInfo()
        }

        const section = document.querySelector("." + link.innerText.toLowerCase())
        section.classList.add("active")
        resetPages()
        hideBeerInfoPage(beerInfoPage)
        hideBeerInfoPage(specificBeerInfoPage)

        hideList()
        clearList()
        clearInput()
    }
    )
}

for (let link of divLinks) { //länkarna i divar
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

inputField.addEventListener("keydown", (event) => { //input-fältet
    if (event.key == "Enter") {
        search = inputField.value
        resetPages()
        getSuggestions(search)

    } else {
        return
    }
})


ul.addEventListener("click", function (e) { // list-objekten

    let pickedBeer = e.target.innerText
    showBeerInfoPage(specificBeerInfoPage)
    renderBeerInfo(pickedBeer)
})


randomizeButton.addEventListener("click", function () { // knappen för att visa random öl

    renderRandomBeerInfo()
    hideBeerInfoPage(beerInfoPage)

})


leftArrow.addEventListener("click", () => { // vänstra pilen i pagineringen

    if (currentPage > 1) {

        displayedPage.innerHTML = currentPage -= 1
        getSuggestions(search)
    }
})


rightArrow.addEventListener("click", () => { // högra pilen i pagineringen

    displayedPage.innerHTML = currentPage += 1
    getSuggestions(search)

})


//en maaassa funktioner

function hideList() { // gömmer diven där listan med föreslagna öl ligger

    beerListContainer.style.display = "none"
}

function clearList() { // tömmer öl-ul på alla li

    ul.innerHTML = ""
}

function showList() { // visar list-diven

    beerListContainer.style.display = "block"
}

function clearInput() { // rensar input field

    inputField.value = ""
}

function invalidBeer() { // visar ett felmeddelande

    errorMsg.innerHTML = "Ölen finns inte"
}

function showErrorMsg() { // visar ett felmeddelande

    errorMsg.innerHTML = "Du måste ha minst tre bokstäver"
}

function hideErrorMsg() { // tar bort felmeddelandet

    errorMsg.innerHTML = ""
}

function resetPages() { // reset currentPage till 1

    currentPage = 1
    displayedPage.innerHTML = currentPage
}

function hideBeerInfoPage(page) { //gömmer vald sida med detaljerad info

    page.style.display = "none"
}

function showBeerInfoPage(page) { // visar vald sida med detaljerad info

    page.style.display = "block"
}

async function renderRandomBeerInfo() { //renderar ut den detaljerade infon om random beer

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

async function renderBeerInfo(inputBeer) { //renderar ut den detaljerade infon om en öl man sökt på

    const beerTitle = document.querySelector(".chosen-beer-info .beer-name")
    const beerDesc = document.querySelector(".chosen-beer-info .description")
    const alcoholVol = document.querySelector(".chosen-beer-info .alcohol-by-volume")
    const beerIngr = document.querySelector(".chosen-beer-info .ingredients")
    const beerHops = document.querySelector(".chosen-beer-info .hops")
    const foodPair = document.querySelector(".chosen-beer-info .food-pairing")
    const brewerTips = document.querySelector(".chosen-beer-info .brewers-tips")
    const beerImg = document.querySelector(".chosen-beer-info .beer-info-img")

    const chosenBeer = await getData(1, inputBeer)

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
            break
        }
    }

}

function renderImageCard(beer) { // tar en öl som input och renderar ut bilden på den

    const imageElement = document.querySelector("img")

    if (beer[0].image_url == null) {

        imageElement.src = "images/ipaglass.png"

    } else {

        imageElement.src = `${beer[0].image_url}`
    }

}

async function getSuggestions(search) { // tar input från sökfältet och hämtar matchande data

    clearList()

    let result

    if (search.length >= 3) {
        result = await getData(currentPage, search)
        showList()
        hideErrorMsg()
    }
    else {
        hideList()
        showErrorMsg()

        return
    }

    createSuggestionsList(result)
    countElements(search)
}

function createSuggestionsList(input) { // tar alla ölnamn som matchade och gör listobjekt av dem

    let currentPageContent = input.map(beer => beer.name)

    currentPageContent.forEach(function (item) {

            const li = document.createElement("li")
            ul.append(li)
            li.innerHTML = item

    })
}

function countElements(search) { // räknar antal objekt i listan och bestämmer när pilarna för pagineringen ska gömmas

    const count = ul.childElementCount;

    if (count < 1 && search.length >= 3) {

        invalidBeer()
        hideList()
    }

    if (currentPage == 1) {
        leftArrow.style.display = "none"

    } else {
        leftArrow.style.display = "block"
    }

    if (count < 10) {
        rightArrow.style.display = "none"

    } else {
        rightArrow.style.display = "block"
    }
}

