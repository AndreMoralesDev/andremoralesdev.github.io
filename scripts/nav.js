const  d = document;
const nav = (dots, button, navOptions) => {
    const $dots = d.querySelectorAll(dots);
    const $sections = d.querySelectorAll(".section-container")
    const $btn = d.getElementById(button);
    const $navOptions = d.querySelector(navOptions);
    d.addEventListener("click", e => {
        if (e.target === $btn) {
            $navOptions.classList.toggle("active");
            $btn.firstElementChild.classList.toggle("display-none");
            $btn.lastElementChild.classList.toggle("display-none");
        }
    })
    const cb = entries => {
        entries.forEach(entry => {
            const id = parseInt(entry.target.getAttribute("data-index"));
            if (entry.isIntersecting) $dots[id].classList.add("active");
            else $dots[id].classList.remove("active");
        })
    }
    const observer = new IntersectionObserver(cb, {threshold: 0.50001});
    $sections.forEach(section => observer.observe(section));
}

export default nav;