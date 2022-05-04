
const activePage = window.location.pathname;
// console.log(activePage);

const navLinks = document.querySelectorAll(".nav-menu .nav-menu__item").forEach(link =>{
    // console.log(link.href);
        if(link.href === `http://localhost:2909${activePage}`) {
            link.classList.add('nav-menu__item-active');
        }
})

function searchCourse (){
    var searchValue = document.getElementById('search');
    var linkSearch = document.getElementById('search-course');
    if (searchValue.value === ""){
        linkSearch.href = `${window.location.pathname}`;
    }else {
        linkSearch.href = `/online-class?category=${searchValue.value}`
    }
}

