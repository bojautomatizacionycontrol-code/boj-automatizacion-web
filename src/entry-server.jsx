import React from "react";
import { renderToString } from "react-dom/server";

import App from "./App.jsx";
import { loadRouteComponent } from "./routes/manifest.jsx";

export async function renderRoute(route, buildYear) {
  const InitialRouteComponent = await loadRouteComponent(route);
  return renderToString(
    <React.StrictMode>
      <App
        initialRoute={route}
        initialRouteComponent={InitialRouteComponent}
        buildYear={buildYear}
      />
    </React.StrictMode>
  );
}
