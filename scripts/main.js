const links = document.querySelectorAll("a")

for(let link of links){
    link.addEventListener("click", () =>{
        document.querySelectorAll("main > section").forEach(
            section => section.classList.remove("active")
            )

            console.log(link)

        let bar = link.innerText.toLowerCase()
        const section = document.querySelector("." + link.innerText.toLowerCase())
        section.classList.add("active")
    }
    )
}