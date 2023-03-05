import carouselMovement from "./carousel.js";
import config from "./config.js";
import contactForm from "./contactForm.js";
import nav from "./nav.js";
const d = document;
d.addEventListener("DOMContentLoaded", e => {
    nav(".dot", "nav-btn", ".nav .options");
    config("btn-config", ".nav-config-container");
    contactForm(".form", ".form-input input, .form-textarea", 
                            ".loader-container", ".form-response");
    carouselMovement();
})
