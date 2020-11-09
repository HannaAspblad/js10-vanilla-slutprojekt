getData()
renderBeerInfo()

async function getData(){

    const request = await fetch("https://api.punkapi.com/v2/beers?per_page=80") //tio per sida + variabel för att plussa på
    const data = await request.json()

    return data
}

async function getRandomBeer(){

    const request = await fetch("https://api.punkapi.com/v2/beers/random")
    const data = await request.json()

    return data
}

async function renderBeerInfo(){ //ta en input så man kan skicka in både random och specifik öl
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

getAnotherBeer()

function getAnotherBeer(){

    const randomizeButton = document.querySelector(".randomize-button")
    randomizeButton.addEventListener("click", function(){
        
    
        renderBeerInfo()
        beerInfoPage.style.display = "none"
    })
}


function renderImageCard(beer){

const imageElement = document.querySelector("img")


imageElement.src = `
${beer[0].image_url}`



}




const navLinks = document.querySelectorAll("nav > a")
const beerInfoPage = document.querySelector(".info")

for(let link of navLinks){
    link.addEventListener("click", (e) =>{
        document.querySelectorAll("main > section").forEach(
            section => section.classList.remove("active")
            )

            if(e.target.innerText == "home"){

                renderBeerInfo()
            }

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

const inputField = document.querySelector(".beer-input")
inputField.addEventListener("keyup", () =>{
   
    const search = inputField.value
    showSuggestions(search)
} )



const ul = document.querySelector(".beer-suggestions")
const beerListContainer = document.querySelector(".beer-list")


async function showSuggestions(search){

    
    const result = await getData()
    clearList()
    showList()
    

    
    for (let i = 0; i < result.length; i++) {
        
        let suggestion = result[i].name
    
       if(suggestion.toLowerCase().includes(search.toLowerCase())){
           
            
            
            const li = document.createElement("li")
            ul.append(li)
            li.innerHTML = suggestion
            
            
        }

        if(search.length == 0){

            
            clearList()
            beerListContainer.style.display = "none"
        }
    
    }

}




const listItem = document.querySelector(".beer-suggestions li")

ul.addEventListener("click", function(e){

    renderBeerInfo(e.target.innerText)
    
})



function clearList(){

    ul.innerHTML = ""
}

function showList(){

    beerListContainer.style.display = "block"
}