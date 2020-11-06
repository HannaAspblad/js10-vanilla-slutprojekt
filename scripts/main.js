getData()
renderRandomBeer()

async function getData(){

    const request = await fetch("https://api.punkapi.com/v2/beers/")
    const data = await request.json()

    return data
}

async function getRandomBeer(){

    const request = await fetch("https://api.punkapi.com/v2/beers/random")
    const data = await request.json()

    return data
}

async function renderRandomBeer(){
    const beerUL = document.querySelector(".info-list")
    const randomBeerItem = document.createElement("p")
    beerUL.append(randomBeerItem)

    const randomBeer = await getRandomBeer()

    randomBeerItem.innerText = `
    Description: ${randomBeer[0].description}
    ${randomBeer[0].volume.value}
    ${randomBeer[0].volume.unit}
    
    `
    
    renderImageCard(randomBeer)

}
// Description
// Image
// Alcohol by volume
// Volume
// Ingredients
// Hops
// Food pairing
// Brewers tips

function renderImageCard(beer){
const beerCardDiv = document.querySelector(".beer-card")
const imageElement = document.createElement("img")
beerCardDiv.append(imageElement)
console.log(beer[0].image_url)

imageElement.src = `
${beer[0].image_url}`



}




const navLinks = document.querySelectorAll("nav > a")
const beerInfoPage = document.querySelector(".info")

for(let link of navLinks){
    link.addEventListener("click", () =>{
        document.querySelectorAll("main > section").forEach(
            section => section.classList.remove("active")
            )
            

        const section = document.querySelector("." + link.innerText.toLowerCase())
        section.classList.add("active")
        beerInfoPage.style.display = "none"
        
    }
    )
}

const divLinks = document.querySelectorAll("div > a")

for(let link of divLinks){
    link.addEventListener("click", () =>{
        document.querySelectorAll("main > .info").forEach(
            section => section.classList.remove("active")
            )

        const section = document.querySelector("." + link.innerText.toLowerCase())
        section.classList.add("active")
        beerInfoPage.style.display = "block"
    }
    )
}