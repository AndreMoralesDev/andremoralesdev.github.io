const  d = document;
const nav = (dots, button, navOptions) => {
    const $dots = d.querySelectorAll(dots);
    const $sections = d.querySelectorAll(".section-container");
    const $btn = d.getElementById(button);
    const $navOptions = d.querySelector(navOptions);
    const $header = d.querySelector("header.nav-container");

    d.addEventListener("scroll", () => {
        $sections.forEach(section => {
            const marginTop = $header.getBoundingClientRect().height;
            const top = window.scrollY;
            const height = section.offsetHeight;
            const offset = section.offsetTop - marginTop * 1.5;
            const id = parseInt(section.getAttribute("data-index"));
    
            if (top >= offset && top < offset + height) {
                $dots.forEach((dot, index) => {
                    if (index === id) dot.classList.add("active");
                    else dot.classList.remove("active");
                })
            }
        })
    })

    d.addEventListener("click", e => {
        if (e.target === $btn) {
            $navOptions.classList.toggle("active");
            $btn.firstElementChild.classList.toggle("display-none");
            $btn.lastElementChild.classList.toggle("display-none");
        }
    })
}

export default nav;