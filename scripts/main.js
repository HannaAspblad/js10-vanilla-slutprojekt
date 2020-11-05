const links = document.querySelectorAll("nav > a")

for(let link of links){
    link.addEventListener("click", () =>{
        document.querySelectorAll("main > section").forEach(
            section => section.classList.remove("active")
        )
        
        const section = document.querySelector(link.innertext.toLowerCase())
        section.classList.add("active")
    }
    )
}