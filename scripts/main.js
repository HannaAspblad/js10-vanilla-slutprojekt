
// alla eventlisteners

const navLinks = document.querySelectorAll("nav > a")
const beerInfoPage = document.querySelector(".info")

for (let link of navLinks) {
    link.addEventListener("click", (e) => {
        document.querySelectorAll("main > section").forEach(
            section => section.classList.remove("active")
        )

        if (e.target.innerText == "home") {
            renderBeerInfo()
        }

        const section = document.querySelector("." + link.innerText.toLowerCase())
        section.classList.add("active")
        beerInfoPage.style.display = "none"
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

inputField.addEventListener("keyup", () => {

    const search = inputField.value
    showSuggestions(search)
})

const ul = document.querySelector(".beer-suggestions")
const beerListContainer = document.querySelector(".beer-list")
const listItem = document.querySelector(".beer-suggestions li")

ul.addEventListener("click", function (e) {
    renderBeerInfo(e.target.innerText)
    hideList()
})

const randomizeButton = document.querySelector(".randomize-button")
    randomizeButton.addEventListener("click", function () {

        renderBeerInfo()
        beerInfoPage.style.display = "none"
    })

getData() //kallar på funktinen som hämtar datan

function hideList() { //tar bort li-elementen från ul och gömmer hela list-diven

    ul.innerHTML = ""
    beerListContainer.style.display = "none"
}

function showList() { //visar list-diven

    beerListContainer.style.display = "block"
}

async function getData() { //hämtar datan

    const request = await fetch("https://api.punkapi.com/v2/beers?per_page=80") //tio per sida + variabel för att plussa på
    const data = await request.json()

    return data
}

async function getRandomBeer() {//hämtar datan med random beer

    const request = await fetch("https://api.punkapi.com/v2/beers/random")
    const data = await request.json()

    return data
}

async function renderBeerInfo() { //ska ta en input så man kan skicka in både random och specifik öl
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

function renderImageCard(beer) {//tar en öl som input och renderar ut bilden på den

    const imageElement = document.querySelector("img")

    imageElement.src = `
${beer[0].image_url}`



}

async function showSuggestions(search) {//visar en lista på öl som matchar ens sökning
    const createdItems = ul.getElementsByTagName("li")
    const result = await getData()

    hideList()
    showList()

    for (let i = 0; i < result.length; i++) {

        let suggestion = result[i].name

        if (suggestion.toLowerCase().includes(search.toLowerCase())) {

            const li = document.createElement("li")
            ul.append(li)

            li.innerHTML = suggestion

        }

        if (search.length == 0) {
            hideList()
        }

        if (createdItems.length !== 0) {
            showList()

        } else {
            hideList()
        }

    }

}
