class LpRouter extends HTMLElement {
    constructor() {
        super();
        this.routes = [];
        this.container = null;
        this.onHashChange = this.onHashChange.bind(this);
        this.onPopState = this.onPopState.bind(this);
    }

    connectedCallback() {
        if (!window.location.hash) {
            window.location.hash = "#/";
        }

        this.collectRoutes();

        if (!this.container) {
            this.container = document.createElement("div");
            this.appendChild(this.container);
        }

        this.renderRoute(this.getCurrentPath());
        
        window.addEventListener("hashchange", this.onHashChange);
        window.addEventListener("popstate", this.onPopState);
    }

    disconnectedCallback() {
        window.removeEventListener("hashchange", this.onHashChange);
        window.removeEventListener("popstate", this.onPopState);
    }

    collectRoutes() {
        if (this.routes.length) return;

        const routeElements = Array.from(this.querySelectorAll("lp-route"));

        this.routes = routeElements.map((route) => ({
            path: this.normalizePath(route.getAttribute("path")),
            component: route.getAttribute("component"),
            template: route.innerHTML.trim(),
        }));

        routeElements.forEach((el) => el.remove());
    }

    normalizePath(path) {
        if (!path) return "/";
        let cleaned = path.trim();
        if (cleaned.startsWith("#")) cleaned = cleaned.slice(1);
        if (!cleaned.startsWith("/")) cleaned = `/${cleaned}`;
        return cleaned || "/";
    }

    getCurrentPath() {
        const hash = window.location.hash || "#/";
        return this.normalizePath(hash);
    }

    onHashChange() {
        this.renderRoute(this.getCurrentPath());
    }

    onPopState() {
        this.renderRoute(this.getCurrentPath());
    }

    renderRoute(path) {
        if (!this.container || !this.routes.length) return;

        const route =
            this.routes.find((r) => r.path === path) || this.routes[0];
        if (!route) return;

        this.container.innerHTML = "";

        const fragment = document.createDocumentFragment();

        if (route.component) {
            const element = document.createElement(route.component);

            if (route.template) {
                const tpl = document.createElement("template");
                tpl.innerHTML = route.template;
                element.appendChild(tpl.content.cloneNode(true));
            }

            fragment.appendChild(element);
        } else if (route.template) {
            const tpl = document.createElement("template");
            tpl.innerHTML = route.template;
            fragment.appendChild(tpl.content.cloneNode(true));
        }

        this.container.appendChild(fragment);
    }
}

window.customElements.define('lp-router', LpRouter);