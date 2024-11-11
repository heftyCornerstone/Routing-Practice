const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_REGEXP = '([^\\/]+)';

function createRouter() {
    const routes = [];

    const router = {
        navigate(fragment) {
            window.location.hash = fragment;
        },
        addRoute(fragment, component) {
            const params = [];
            const parsedFragment = fragment.replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
                params.push(paramName); 
                return URL_REGEXP;
            }).replace(/\//g, "\\/");

            routes.push({
                fragmentRegExp: new RegExp(`^${parsedFragment}$`),
                component,
                params, });
            return this;
        },
        start() {
            const getUrlParams = (route, hash) => {
                const params = {};
                const matches = hash.match(route.fragmentRegExp);

                matches.shift();
                matches.forEach((paramValue, i)=>{
                    const paramName = route.params[i];
                    params[paramName] = paramValue;
                });

                return params;
            }

            const checkRoutes = () => {
                const currentRoute = routes.find(route => route.fragmentRegExp.test(window.location.hash));

                if(currentRoute.params.length) {
                    const urlParams = getUrlParams(currentRoute, window.location.hash);
                    currentRoute.component(urlParams);
                } else {
                    currentRoute.component();
                }
            }

            window.addEventListener('hashchange', checkRoutes);
            checkRoutes();
        }
    }

    return router;
}

export default createRouter;