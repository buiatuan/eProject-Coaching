
let itemLinks = document.querySelector('.nav-menu');

itemLinks.addEventListener("click", (e) =>{
    console.log(e);
    let target = e.target;
    console.log(target)
    if (target.classList.contains("nav-menu__item")){
        target.classList.add("nav-menu__item-active");
        itemLinks.querySelector(".nav-menu__item-active").classList.remove("nav-menu__item-active");
    }
})