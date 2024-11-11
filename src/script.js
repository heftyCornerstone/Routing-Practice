import createRouter from "./router.js";

const container = document.querySelector('main');

const pages = {
    home: () => container.innerText = 'home page',
    beef: () => container.innerText = 'beef',
    dish: () => container.innerText = 'stew',
}

const router = createRouter();

window.addEventListener("click", event => {
    if (event.target.matches("[data-navigate]")) {
        router.navigate(event.target.dataset.navigate, true);
    }
});

router.addRoute('#/', pages.home)
    .addRoute('#/beef', pages.beef)
    .addRoute('#/stew', pages.dish)
    .start();