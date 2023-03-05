const d = document;
const setVariableCSS = (e, nameVariable, nameVariableCSS) => {
    const value = getComputedStyle(e.target).getPropertyValue(nameVariable);
    d.documentElement.style.setProperty(nameVariableCSS || nameVariable, value);
    localStorage.setItem(nameVariableCSS || nameVariable, value);
}
const getVariableCSS = (nameVariableCSS, defaultValue) => {
    d.documentElement.style.setProperty(
        nameVariableCSS, 
        localStorage.getItem(nameVariableCSS || defaultValue)
    );
}
const config = (btnConfig, navConfig) => {
    getVariableCSS("--secondary-color", "#f46")
    getVariableCSS("--font-color-theme", "#121212")
    getVariableCSS("--primary-color", "#25263d")
    getVariableCSS("--primary-color-light", "#2f304d")
    getVariableCSS("--primary-color-dark", "#1f2033")
    getVariableCSS("--font-color", "#ddd")
    const $btn = d.getElementById(btnConfig);
    const $nav = d.querySelector(navConfig);
    d.addEventListener("click", e => {
        if (e.target === $btn) {
            $nav.classList.remove("display-none");
        }
        else if (e.target.matches(".nav-config-container")) {
            $nav.classList.add("display-none");
        }
        else if(e.target.matches(".option-color")) {
            setVariableCSS(e, "--color", "--secondary-color")
            setVariableCSS(e, "--font-color", "--font-color-theme")
        }
        else if (e.target.matches(".config-theme")) {
            setVariableCSS(e, "--tm-primary-color", "--primary-color");
            setVariableCSS(e, "--tm-primary-color-light", "--primary-color-light");
            setVariableCSS(e, "--tm-primary-color-dark", "--primary-color-dark");
            setVariableCSS(e, "--tm-font-color", "--font-color");
        }
    })
}
export default config;