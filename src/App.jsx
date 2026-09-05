import { startTransition, useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  focusHashTarget,
  createFocusLayer,
  handleEscapeKey,
  lockPageScroll,
  prefersReducedMotion,
  restoreFocusFromLayer,
  setElementsInert,
  trapTabKey,
} from "./accessibility.js";
import {
  ChevronDown,
  Globe,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { contact, navItems } from "./content.js";
import { englishNavItems, portugueseNavItems } from "./i18n.js";
import {
  getLocalizedPath,
  getRouteLanguage,
  getRouteMetadata,
} from "./route-metadata.js";
import bojLogo from "./assets/boj-logo-real-cropped.png";
import { M2Picture, track, whatsappUrl } from "./app/shared-eager.jsx";
import { serializeJsonLd } from "./json-ld.js";
import { preloadRouteFamily, RouteOutlet } from "./routes/manifest.jsx";

const ANALYTICS = {
  ga4Id: "", // p.ej. "G-XXXXXXXXXX"
  metaPixelId: "", // p.ej. "1234567890123456"
};

let analyticsBootstrapped = false;

function initAnalytics() {
  if (analyticsBootstrapped || typeof document === "undefined") return;
  analyticsBootstrapped = true;

  if (ANALYTICS.ga4Id) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4Id}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ANALYTICS.ga4Id);
  }

  if (ANALYTICS.metaPixelId) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", ANALYTICS.metaPixelId);
    window.fbq("track", "PageView");
    /* eslint-enable */
  }
}

function getRoute() {
  let path = window.location.pathname || "/";
  if (path.length > 1 && path.endsWith("/")) path = path.replace(/\/+$/, ""); // sin slash final salvo raíz
  return path;
}

function setLanguagePreference(language) {
  try {
    window.localStorage.setItem("boj-site-language", language);
  } catch {
    // El selector funciona aunque el navegador bloquee almacenamiento local.
  }
}

function preloadRouteSafely(route) {
  void preloadRouteFamily(route).catch(() => {
    // La navegación conserva su fallback y permite reintentar mediante recarga.
  });
}

function App({ initialRoute = "/", initialRouteComponent = null, buildYear = new Date().getFullYear() }) {
  const [route, setRoute] = useState(initialRoute);
  const [readyRoute, setReadyRoute] = useState(initialRouteComponent ? initialRoute : null);
  const language = getRouteLanguage(route);

  useEffect(() => {
    const browserRoute = getRoute();
    if (initialRoute === "/__boj_not_found__" && browserRoute !== initialRoute) {
      setRoute(browserRoute);
    }
  }, [initialRoute]);

  useEffect(() => {
    if (route !== "/" && route !== "/inicio") return;
    let savedLanguage = null;
    try {
      savedLanguage = window.localStorage.getItem("boj-site-language");
    } catch {
      return;
    }
    if (savedLanguage === "en" || savedLanguage === "pt") {
      const savedHome = `/${savedLanguage}`;
      window.history.replaceState(null, "", savedHome);
      setRoute(savedHome);
    }
  }, []);

  useEffect(() => {
    const onPopState = () => startTransition(() => setRoute(getRoute()));
    window.addEventListener("popstate", onPopState);

    const navigate = (to) => {
      const current = window.location.pathname + window.location.search + window.location.hash;
      if (to !== current) window.history.pushState(null, "", to);
      startTransition(() => setRoute(getRoute()));
    };

    // Interceptor de clics: convierte enlaces internos same-origin en navegación
    // SPA (History API). Deja pasar sin interceptar: clics ya prevenidos, botón no
    // izquierdo o con Ctrl/Meta/Shift/Alt, target distinto de _self, descargas,
    // href de ancla intra-página (#...), protocolos no http(s) (mailto/tel/…) y
    // enlaces de otro origin (app.bojautomatizacion.com, WhatsApp, Siemens, etc.).
    const onClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      const anchor = target && target.closest ? target.closest("a") : null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#")) {
        event.preventDefault();
        focusHashTarget(href, { updateHistory: true });
        return;
      }
      let url;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // externos
      if (url.protocol !== "http:" && url.protocol !== "https:") return; // mailto/tel/javascript
      event.preventDefault();
      preloadRouteSafely(url.pathname);
      navigate(url.pathname + url.search + url.hash);
    };

    const onNavigationIntent = (event) => {
      const anchor = event.target?.closest?.("a[href]");
      if (!anchor) return;
      try {
        const url = new URL(anchor.href);
        if (url.origin === window.location.origin) preloadRouteSafely(url.pathname);
      } catch {
        // El enlace puede ser mailto/tel u otro esquema no navegable por la SPA.
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", onNavigationIntent);
    document.addEventListener("focusin", onNavigationIntent);

    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", onNavigationIntent);
      document.removeEventListener("focusin", onNavigationIntent);
    };
  }, []);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (route === "/__boj_not_found__") return;
    track("page_view", { page_path: route });
  }, [route]);

  useEffect(() => {
    if (readyRoute !== route) return undefined;
    const animationFrame = window.requestAnimationFrame(() => {
      if (!focusHashTarget(window.location.hash)) {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
    });
    return () => window.cancelAnimationFrame(animationFrame);
  }, [readyRoute, route]);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
  }, [language]);

  useEffect(() => {
    const meta = getRouteMetadata(route);
    document.title = meta.title;

    const upsertMeta = (selector, attributes) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([attribute, content]) => {
        element.setAttribute(attribute, content);
      });
      return element;
    };

    upsertMeta('meta[name="description"]', { name: "description", content: meta.description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: meta.robots });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: meta.ogType });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: meta.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: meta.description });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: meta.image });
    upsertMeta('meta[property="og:image:type"]', { property: "og:image:type", content: meta.imageType });
    upsertMeta('meta[property="og:image:width"]', { property: "og:image:width", content: String(meta.imageWidth) });
    upsertMeta('meta[property="og:image:height"]', { property: "og:image:height", content: String(meta.imageHeight) });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: meta.imageAlt });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: meta.locale });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: meta.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: meta.image });
    upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: meta.imageAlt });

    let canonical = document.querySelector('link[rel="canonical"]');
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (meta.canonical) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", meta.canonical);
      ogUrl = upsertMeta('meta[property="og:url"]', { property: "og:url", content: meta.canonical });
    } else {
      canonical?.remove();
      ogUrl?.remove();
    }

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((alternate) => alternate.remove());
    meta.alternates.forEach(({ hreflang, href }) => {
      const alternate = document.createElement("link");
      alternate.setAttribute("rel", "alternate");
      alternate.setAttribute("hreflang", hreflang);
      alternate.setAttribute("href", href);
      alternate.setAttribute("data-boj-route-alternate", "");
      document.head.appendChild(alternate);
    });

    let structuredData = document.getElementById("boj-route-jsonld");
    if (meta.jsonLd) {
      if (!structuredData) {
        structuredData = document.createElement("script");
        structuredData.id = "boj-route-jsonld";
        structuredData.type = "application/ld+json";
        document.head.appendChild(structuredData);
      }
      structuredData.textContent = serializeJsonLd(meta.jsonLd);
    } else {
      structuredData?.remove();
    }
  }, [language, route]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {language === "en" ? "Skip to main content" : language === "pt" ? "Ir para o conteúdo principal" : "Saltar al contenido principal"}
      </a>
      <Header route={route} language={language} />
      <main id="main-content" tabIndex={-1}>
        <RouteOutlet route={route} initialRoute={initialRoute} initialRouteComponent={initialRouteComponent} onRouteReady={setReadyRoute} />
      </main>
      <Footer language={language} buildYear={buildYear} />
      <FloatingContact language={language} />
      <LanguageSuggestion route={route} language={language} />
      <Analytics />
    </>
  );
}

function Header({ route, language }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const closeMenu = () => setOpen(false);
  const headerCopy = {
    es: {
      homePath: "/",
      homeLabel: "Ir a inicio",
      navLabel: "Navegación principal",
      menuLabel: "Abrir menú",
      closeMenuLabel: "Cerrar menú",
      diagnosticLabel: "Solicitar diagnóstico",
      diagnosticMessage: "Hola, escribo desde la web de BOJ Automatización y Control para solicitar un diagnóstico industrial.",
      plansLabel: "Ver planes PRO",
      plansAnchor: "#planes-pro",
      courseLabel: "Ver curso y precio",
      courseAnchor: "#curso-s7-compra",
      contactLabel: "Completar consulta",
      contactAnchor: "#consulta-tecnica",
    },
    en: {
      homePath: "/en",
      homeLabel: "Go to home",
      navLabel: "Main navigation",
      menuLabel: "Open menu",
      closeMenuLabel: "Close menu",
      diagnosticLabel: "Request diagnostics",
      diagnosticMessage: "Hello, I am contacting BOJ to request support with an industrial diagnostics case.",
      plansLabel: "View PRO plans",
      plansAnchor: "#en-pro-plans",
      courseLabel: "View course and price",
      courseAnchor: "#en-course-purchase",
      contactLabel: "Send an inquiry",
      contactAnchor: "#en-contact-form",
    },
    pt: {
      homePath: "/pt",
      homeLabel: "Ir para o início",
      navLabel: "Navegação principal",
      menuLabel: "Abrir menu",
      closeMenuLabel: "Fechar menu",
      diagnosticLabel: "Solicitar diagnóstico",
      diagnosticMessage: "Olá, estou entrando em contato com a BOJ para solicitar suporte em um caso de diagnóstico industrial.",
      plansLabel: "Ver planos PRO",
      plansAnchor: "#pt-planos-pro",
      courseLabel: "Ver curso e preço",
      courseAnchor: "#pt-compra-curso",
      contactLabel: "Enviar uma consulta",
      contactAnchor: "#pt-formulario-contato",
    },
  }[language];
  const items = language === "en" ? englishNavItems : language === "pt" ? portugueseNavItems : navItems;
  const defaultAction = {
    label: headerCopy.diagnosticLabel,
    href: whatsappUrl(headerCopy.diagnosticMessage),
  };
  const routeAction =
    ["/app", "/en/app", "/pt/app"].includes(route)
      ? { label: headerCopy.plansLabel, href: headerCopy.plansAnchor }
      : ["/cursos/s7-300-400", "/en/courses/s7-300-400", "/pt/cursos/s7-300-400"].includes(route)
        ? { label: headerCopy.courseLabel, href: headerCopy.courseAnchor }
        : ["/contacto", "/en/contact", "/pt/contato"].includes(route)
          ? { label: headerCopy.contactLabel, href: headerCopy.contactAnchor }
          : defaultAction;

  useEffect(() => {
    setOpen(false);
  }, [language, route]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1101px)");
    const handleViewportChange = (event) => {
      if (event.matches) setOpen(false);
    };
    desktopQuery.addEventListener("change", handleViewportChange);
    return () => desktopQuery.removeEventListener("change", handleViewportChange);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const focusLayer = createFocusLayer();
    const restoreScroll = lockPageScroll();
    const background = Array.from(document.querySelectorAll("#root > *:not(.site-header)"));
    const restoreBackground = setElementsInert(background);
    const animationFrame = window.requestAnimationFrame(() => {
      (navRef.current?.querySelector("a[href]") || toggleRef.current)?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event) => {
      if (handleEscapeKey(event, () => setOpen(false))) return;
      trapTabKey(event, headerRef.current, toggleRef.current);
    };

    const containFocus = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        (navRef.current?.querySelector("a[href]") || toggleRef.current)?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", containFocus);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", containFocus);
      restoreBackground();
      restoreScroll();
      const visibleReturnTarget = toggleRef.current?.getClientRects().length
        ? toggleRef.current
        : navRef.current?.querySelector("a[href]") || headerRef.current?.querySelector(".brand");
      restoreFocusFromLayer(focusLayer, visibleReturnTarget, { requireVisible: true });
    };
  }, [open]);

  const handleRouteAction = (event) => {
    if (!open || !routeAction.href.startsWith("#")) {
      closeMenu();
      return;
    }
    event.preventDefault();
    setOpen(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => focusHashTarget(routeAction.href, { updateHistory: true }));
    });
  };

  return (
    <header className="site-header" data-menu-open={open ? "true" : "false"} ref={headerRef}>
      <a className="brand" href={headerCopy.homePath} onClick={closeMenu} aria-label={headerCopy.homeLabel}>
        <BrandLogo />
      </a>

      <nav
        className={`main-nav ${open ? "is-open" : ""}`}
        id="site-primary-navigation"
        ref={navRef}
        aria-label={headerCopy.navLabel}
      >
        {items.map((item) => {
          const active =
            route === item.path ||
            (item.children && route.startsWith(`${item.path}/`)) ||
            (item.path === "/recursos-tecnicos" && route.startsWith("/recursos-tecnicos"));
          return (
            <div className="nav-item" key={item.path}>
              <a
                className={active ? "active" : ""}
                href={item.path}
                onClick={closeMenu}
              >
                {item.label}
                {item.children ? <ChevronDown size={14} /> : null}
              </a>
              {item.children ? (
                <div className="submenu">
                  {item.children.map((child) => (
                    <a
                      key={child.path}
                      className={route === child.path ? "active" : ""}
                      href={child.path}
                      onClick={closeMenu}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        <div className="mobile-nav-actions">
          <a
            className="header-action solid"
            href={routeAction.href}
            onClick={handleRouteAction}
          >
            {routeAction.label}
          </a>
        </div>
      </nav>

      <div className="header-actions">
        <a
          className="header-action solid"
          href={routeAction.href}
          onClick={handleRouteAction}
        >
          {routeAction.label}
        </a>
        <LanguageSwitcher route={route} language={language} onSelect={closeMenu} />
      </div>

      <div className="mobile-header-controls">
        <LanguageSwitcher route={route} language={language} onSelect={closeMenu} />
        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? headerCopy.closeMenuLabel : headerCopy.menuLabel}
          aria-expanded={open}
          aria-controls="site-primary-navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function LanguageSwitcher({ route, language, onSelect }) {
  const spanishPath = getLocalizedPath(route, "es");
  const englishPath = getLocalizedPath(route, "en");
  const portuguesePath = getLocalizedPath(route, "pt");

  const chooseLanguage = (nextLanguage) => {
    setLanguagePreference(nextLanguage);
    onSelect?.();
  };

  return (
    <nav className="language-switcher" aria-label={language === "en" ? "Choose language" : language === "pt" ? "Escolher idioma" : "Elegir idioma"}>
      <Globe size={15} aria-hidden="true" />
      <a
        className={language === "es" ? "active" : ""}
        href={spanishPath}
        hrefLang="es"
        lang="es"
        aria-current={language === "es" ? "page" : undefined}
        aria-label="ES · Ver sitio en español"
        onClick={() => chooseLanguage("es")}
      >
        ES
      </a>
      <span aria-hidden="true">/</span>
      <a
        className={language === "en" ? "active" : ""}
        href={englishPath}
        hrefLang="en"
        lang="en"
        aria-current={language === "en" ? "page" : undefined}
        aria-label="EN · View site in English"
        onClick={() => chooseLanguage("en")}
      >
        EN
      </a>
      <span aria-hidden="true">/</span>
      <a
        className={language === "pt" ? "active" : ""}
        href={portuguesePath}
        hrefLang="pt-BR"
        lang="pt-BR"
        aria-current={language === "pt" ? "page" : undefined}
        aria-label="PT · Ver site em português"
        onClick={() => chooseLanguage("pt")}
      >
        PT
      </a>
    </nav>
  );
}

function LanguageSuggestion({ route, language }) {
  const [visible, setVisible] = useState(false);
  const [suggestedLanguage, setSuggestedLanguage] = useState("en");

  useEffect(() => {
    if (language !== "es") {
      setLanguagePreference(language);
      setVisible(false);
      return;
    }

    let savedLanguage = null;
    try {
      savedLanguage = window.localStorage.getItem("boj-site-language");
    } catch {
      // La detección sigue siendo opcional cuando no hay almacenamiento local.
    }
    if (savedLanguage) return;

    const browserLanguage = window.navigator.languages?.[0] || window.navigator.language || "es";
    const normalizedLanguage = browserLanguage.toLowerCase();
    if (normalizedLanguage.startsWith("pt")) {
      setSuggestedLanguage("pt");
      setVisible(true);
    } else if (!normalizedLanguage.startsWith("es")) {
      setSuggestedLanguage("en");
      setVisible(true);
    }
  }, [language]);

  if (!visible || language !== "es") return null;

  const suggestion = suggestedLanguage === "pt"
    ? {
        title: "Versão em português disponível",
        text: "Prefere acessar a BOJ em português?",
        action: "Ver em português",
        continue: "Continuar em espanhol",
        ariaLabel: "Sugestão de idioma português",
        dismissLabel: "Fechar sugestão de idioma",
      }
    : {
        title: "English version available",
        text: "Would you prefer to view BOJ in English?",
        action: "View in English",
        continue: "Continue in Spanish",
        ariaLabel: "Language suggestion",
        dismissLabel: "Dismiss language suggestion",
      };

  const continueInSpanish = () => {
    setLanguagePreference("es");
    setVisible(false);
  };

  return (
    <aside className="language-suggestion" role="status" aria-label={suggestion.ariaLabel}>
      <div className="language-suggestion-icon" aria-hidden="true">
        <Globe size={20} />
      </div>
      <div>
        <strong>{suggestion.title}</strong>
        <p>{suggestion.text}</p>
      </div>
      <div className="language-suggestion-actions">
        <a href={getLocalizedPath(route, suggestedLanguage)} onClick={() => setLanguagePreference(suggestedLanguage)}>
          {suggestion.action}
        </a>
        <button type="button" onClick={continueInSpanish}>{suggestion.continue}</button>
      </div>
      <button className="language-suggestion-close" type="button" onClick={continueInSpanish} aria-label={suggestion.dismissLabel}>
        <X size={17} />
      </button>
    </aside>
  );
}

function BrandLogo({ compact = false }) {
  return (
    <span className={`brand-logo ${compact ? "compact" : ""}`}>
      <M2Picture
        src={bojLogo}
        alt="BOJ Automatización y Control"
        loading="eager"
        sizes={compact ? "232px" : "(max-width: 900px) 176px, 196px"}
      />
    </span>
  );
}

function Footer({ language, buildYear }) {
  return <MainFooter language={language} buildYear={buildYear} />;
}

function MainFooter({ language, buildYear }) {
  const english = language === "en";
  const portuguese = language === "pt";
  const footerLinks = english
    ? [
        { label: "Home", path: "/en" },
        { label: "Services", path: "/en/services" },
        { label: "Training", path: "/en/courses" },
        { label: "App", path: "/en/app" },
        { label: "Projects", path: "/en/projects" },
        { label: "Contact", path: "/en/contact" },
      ]
    : portuguese
      ? [
          { label: "Início", path: "/pt" },
          { label: "Serviços", path: "/pt/servicos" },
          { label: "Cursos", path: "/pt/cursos" },
          { label: "App", path: "/pt/app" },
          { label: "Projetos", path: "/pt/projetos" },
          { label: "Contato", path: "/pt/contato" },
        ]
      : [
        { label: "Inicio", path: "/" },
        { label: "Servicios", path: "/servicios" },
        { label: "Cursos", path: "/cursos" },
        { label: "Recursos", path: "/recursos-tecnicos" },
        { label: "App", path: "/app" },
        { label: "Obras", path: "/obras" },
        { label: "Contacto", path: "/contacto" },
        ];
  const footerCopy = english
    ? {
        description: "Industrial diagnostics, automation and technical training.",
        contact: "Contact",
        contactAria: "Contact details",
        coverage: "Service across Argentina, on site and remote",
        addressLabel: "Registered address:",
        navigation: "Navigation",
        navigationAria: "Footer navigation",
        legalAria: "Legal information in Spanish",
        legal: ["Privacy policy (ES)", "Terms (ES)", "Licenses (ES)", "Refunds (ES)"],
        follow: "Follow BOJ",
        copyright: `© ${buildYear} BOJ Automation and Control. All rights reserved. BOJ is independent and is not affiliated with Siemens.`,
      }
    : portuguese
      ? {
          description: "Diagnóstico industrial, automação e formação técnica.",
          contact: "Contato",
          contactAria: "Dados de contato",
          coverage: "Atendimento em toda a Argentina, em planta e à distância",
          addressLabel: "Endereço comercial:",
          navigation: "Navegação",
          navigationAria: "Navegação do rodapé",
          legalAria: "Informações legais em espanhol",
          legal: ["Privacidade (ES)", "Termos (ES)", "Licenças (ES)", "Reembolsos (ES)"],
          follow: "Siga a BOJ",
          copyright: `© ${buildYear} BOJ Automação e Controle. Todos os direitos reservados. A BOJ é independente e não é afiliada à Siemens.`,
        }
      : {
          description: "Soluciones para diagnóstico y eficiencia en automatización.",
          contact: "Contacto",
          contactAria: "Datos de contacto",
          coverage: "Atención en toda Argentina, en planta y a distancia",
          addressLabel: "Domicilio comercial:",
          navigation: "Navegación",
          navigationAria: "Navegación del footer",
          legalAria: "Información legal",
          legal: ["Privacidad", "Términos", "Licencias", "Reembolsos"],
          follow: "Síguenos",
          copyright: `© ${buildYear} BOJ Automatización y Control. Todos los derechos reservados. BOJ es independiente y no está afiliada a Siemens.`,
        };

  return (
    <footer className="site-footer mock-footer">
      <div className="mock-home-container mock-footer-inner">
        <div className="mock-footer-brand">
          <BrandLogo compact />
          <p>{footerCopy.description}</p>
        </div>
        <div className="mock-footer-contact" aria-label={footerCopy.contactAria}>
          <h2>{footerCopy.contact}</h2>
          <a href={`mailto:${contact.email}`}>
            {contact.email.split("@")[0]}@<wbr />
            {contact.email.split("@")[1]}
          </a>
          <a href="https://www.bojautomatizacion.com" target="_blank" rel="noreferrer">
            www.bojautomatizacion.com
          </a>
          <span>{footerCopy.coverage}</span>
          <span>{footerCopy.addressLabel} {contact.location}</span>
        </div>
        <nav className="mock-footer-nav" aria-label={footerCopy.navigationAria}>
          <h2>{footerCopy.navigation}</h2>
          {footerLinks.map((item) => (
            <a key={item.path} href={item.path}>
              {item.label}
            </a>
          ))}
        </nav>
        <nav className="mock-footer-nav mock-footer-legal" aria-label={footerCopy.legalAria}>
          <h2>Legal</h2>
          <a href="/privacidad">{footerCopy.legal[0]}</a>
          <a href="/terminos">{footerCopy.legal[1]}</a>
          <a href="/licencias">{footerCopy.legal[2]}</a>
          <a href="/reembolsos">{footerCopy.legal[3]}</a>
        </nav>
        <div className="mock-footer-social">
          <h2>{footerCopy.follow}</h2>
          <div>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              <span aria-hidden="true">in</span>
              <span className="visually-hidden">LinkedIn</span>
            </a>
            <a href={contact.linktree} target="_blank" rel="noreferrer">
              <span aria-hidden="true">lt</span>
              <span className="visually-hidden">Linktree</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mock-footer-bottom">
        <span>{footerCopy.copyright}</span>
      </div>
    </footer>
  );
}

function FloatingContact({ language }) {
  const english = language === "en";
  const portuguese = language === "pt";
  const quickCopy = english
    ? { aria: "Quick contact options", message: "Hello, I am contacting BOJ from the English website.", whatsapp: "Contact BOJ on WhatsApp", email: "Send email" }
    : portuguese
      ? { aria: "Opções de contato rápido", message: "Olá, estou entrando em contato com a BOJ pelo site em português.", whatsapp: "Falar com a BOJ pelo WhatsApp", email: "Enviar e-mail" }
      : { aria: "Contactos rápidos", message: "Hola, escribo desde la web de BOJ para realizar una consulta técnica.", whatsapp: "Consultar por WhatsApp", email: "Enviar correo electrónico" };
  return (
    <div className="floating-contact" aria-label={quickCopy.aria}>
      <a href={whatsappUrl(quickCopy.message)} aria-label={quickCopy.whatsapp}>
        <Phone size={20} />
      </a>
      <a href={`mailto:${contact.email}`} aria-label={quickCopy.email}>
        <Mail size={20} />
      </a>
    </div>
  );
}

export default App;
