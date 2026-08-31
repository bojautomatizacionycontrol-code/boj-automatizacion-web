export const routeFamilies = Object.freeze({
  home: Object.freeze(["/", "/inicio", "/en", "/pt"]),
  services: Object.freeze([
    "/servicios",
    "/obras",
    "/en/services",
    "/en/projects",
    "/pt/servicos",
    "/pt/projetos",
  ]),
  coursesIndex: Object.freeze(["/cursos", "/en/courses", "/pt/cursos"]),
  courseS7: Object.freeze([
    "/cursos/s7-300-400",
    "/en/courses/s7-300-400",
    "/pt/cursos/s7-300-400",
  ]),
  courseTia: Object.freeze([
    "/cursos/tia-portal",
    "/en/courses/tia-portal",
    "/pt/cursos/tia-portal",
  ]),
  app: Object.freeze(["/app", "/en/app", "/pt/app"]),
  resources: Object.freeze([
    "/recursos-tecnicos",
    "/recursos-tecnicos/simatic-manager",
    "/recursos-tecnicos/tia-portal",
    "/recursos-tecnicos/microwin",
    "/recursos-tecnicos/logo-soft-comfort",
    "/recursos-tecnicos/wincc",
  ]),
  compliance: Object.freeze([
    "/contacto",
    "/privacidad",
    "/terminos",
    "/licencias",
    "/reembolsos",
    "/gracias",
    "/en/contact",
    "/pt/contato",
  ]),
});

export const routeFamilyByPath = Object.freeze(
  Object.fromEntries(
    Object.entries(routeFamilies).flatMap(([family, routes]) =>
      routes.map((route) => [route, family])
    )
  )
);

export function getRouteFamily(route) {
  return routeFamilyByPath[route] || "compliance";
}
