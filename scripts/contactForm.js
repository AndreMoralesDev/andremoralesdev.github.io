const d = document;
const patternText = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/i;
const patternEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
const contactForm = (form, inputs, loader, response) => {
    const $form = d.querySelector(form);
    const $inputs = d.querySelectorAll(inputs);
    $inputs.forEach(input => input.addEventListener("keyup",e => {
        const span = d.createElement("span");
        span.classList.add("error-span");
        let res = null;
        if (input.name === "name") res = patternText.test(input.value);
        else if (input.name === "email") res = patternEmail.test(input.value);
        else if (input.name === "message" || input.name === "about") 
            res = input.value.trim() !== "";
        if (res != null) {
            const $contenedor = input.parentElement
            span.textContent = input.title
            if (res === false  && input.value != "") {
                if ($contenedor.querySelector("span") === null) 
                    $contenedor.appendChild(span)
            } else if (res === true || input.value === "") {
                if ($contenedor.querySelector("span") != null )
                    $contenedor.removeChild($contenedor.querySelector("span"))
            }
        }
    }))
    $form.addEventListener("submit", e => {
        e.preventDefault();
        const $inputsToSubmit = d.querySelectorAll(inputs);
        if ($inputsToSubmit.length != $inputs.length) location.reload();
        const errores = [...$inputs].some(e => 
            e.parentElement.querySelector(".error-span"));
        if (!errores) {
            const $loader = d.querySelector(loader);
            const message = d.querySelector(response);
            $loader.style.display = "flex";
            fetch("https://formsubmit.co/ajax/matias.plin@gmail.com", {
                method: "POST",
                body: new FormData(e.target)
            })
                .then(res => res.ok ? res.json : Promise.reject(res))
                .then(json => {
                    message.style.display = "flex";
                    message.textContent = "¡Los datos han sido enviados!"
                })
                .catch(err => {
                    const messageErr = err.statusText || "Ocurrió un error en el envío, inténtalo nuevamente";
                    message.style.display = "flex";
                    message.textContent =  `Error ${err.status}: ${messageErr}`;
                })
                .finally(() => {
                    $form.reset();
                    $loader.style.display = "none";
                    setTimeout(() => message.style.display = "none", 2500)
                });
        }
    })
}

export default contactForm;