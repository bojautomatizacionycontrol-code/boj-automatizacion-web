import { Component, lazy, Suspense, useEffect } from "react";
import { getRouteFamily } from "./route-families.js";

export { getRouteFamily } from "./route-families.js";

const routeFamilyLoaders = Object.freeze({
  home: () => import("./home.jsx"),
  services: () => import("./services.jsx"),
  coursesIndex: () => import("./courses-index.jsx"),
  courseS7: () => import("./course-s7.jsx"),
  courseTia: () => import("./course-tia.jsx"),
  app: () => import("./app.jsx"),
  resources: () => import("./resources.jsx"),
  compliance: () => import("./compliance.jsx"),
});

const modulePromises = new Map();

function loadFamilyModule(family) {
  if (!modulePromises.has(family)) modulePromises.set(family, routeFamilyLoaders[family]());
  return modulePromises.get(family);
}

const lazyFamilies = Object.fromEntries(
  Object.keys(routeFamilyLoaders).map((family) => [family, lazy(() => loadFamilyModule(family))])
);

export function preloadRouteFamily(route) {
  return loadFamilyModule(getRouteFamily(route));
}

export async function loadRouteComponent(route) {
  const routeModule = await preloadRouteFamily(route);
  return routeModule.default;
}

function RouteCommit({ RouteComponent, route, onRouteReady }) {
  useEffect(() => {
    onRouteReady?.(route);
  }, [onRouteReady, route]);
  return <RouteComponent route={route} />;
}

class RouteChunkBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false, route: props.route };
  }

  static getDerivedStateFromProps(props, state) {
    return props.route === state.route ? null : { failed: false, route: props.route };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const language = this.props.route.startsWith("/en") ? "en" : this.props.route.startsWith("/pt") ? "pt" : "es";
    const copy = language === "en"
      ? { title: "We couldn't load this page", action: "Try again" }
      : language === "pt"
        ? { title: "Não foi possível carregar esta página", action: "Tentar novamente" }
        : { title: "No pudimos cargar esta página", action: "Reintentar" };
    return (
      <section className="route-load-error" role="alert">
        <h1>{copy.title}</h1>
        <button type="button" onClick={() => window.location.reload()}>{copy.action}</button>
      </section>
    );
  }
}

export function RouteOutlet({ route, initialRoute, initialRouteComponent, onRouteReady }) {
  const family = getRouteFamily(route);
  const loadingLabel = route.startsWith("/en")
    ? "Loading content"
    : route.startsWith("/pt")
      ? "Carregando conteúdo"
      : "Cargando contenido";
  const RouteComponent = route === initialRoute && initialRouteComponent
    ? initialRouteComponent
    : lazyFamilies[family];

  return (
    <RouteChunkBoundary route={route}>
      <Suspense fallback={<div className="route-loading" role="status" aria-live="polite" aria-label={loadingLabel} />}>
        <RouteCommit RouteComponent={RouteComponent} route={route} onRouteReady={onRouteReady} />
      </Suspense>
    </RouteChunkBoundary>
  );
}
