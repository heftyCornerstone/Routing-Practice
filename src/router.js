function createRouter() {
    const routes = [];

    const router = {
        navigate(fragment, replace = false) {
            if (replace) {
                const href = window.location.href.replace(window.location.hash, "#" + fragment);
                window.location.replace(href);
            } else {
                window.location.hash = fragment;
            }
        },
        addRoute(fragment, component) {
            routes.push({ fragment, component });
            return this;
        },
        start() {
            const checkRoutes = () => {
                const currentRoute = routes.find(route => route.fragment === window.location.hash);
                currentRoute.component();
            }

            window.addEventListener('hashchange', checkRoutes);
            checkRoutes();
        }
    }

    return router;
}

export default createRouter;