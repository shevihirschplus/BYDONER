import {
  NotificationService
} from "./chunk-UFM4NYX4.js";
import {
  AuthService,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  bootstrapApplication,
  provideRouter,
  withComponentInputBinding
} from "./chunk-A626HJ2P.js";
import {
  provideHttpClient,
  withInterceptors
} from "./chunk-66BI7DE2.js";
import {
  AsyncPipe,
  CommonModule,
  catchError,
  inject,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IBG4PQOV.js";

// src/app/core/guards/auth.guard.ts
var authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return true;
  }
  router.navigate(["/login"]);
  return false;
};

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "login",
    loadComponent: () => import("./chunk-4GILZM5M.js").then((m) => m.LoginComponent)
  },
  {
    path: "dashboard",
    loadComponent: () => import("./chunk-OFGZ45SP.js").then((m) => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: "donors",
    loadComponent: () => import("./chunk-PDL5WGDE.js").then((m) => m.DonorListComponent),
    canActivate: [authGuard]
  },
  {
    path: "donors/:id",
    loadComponent: () => import("./chunk-YT7OACPR.js").then((m) => m.DonorCardComponent),
    canActivate: [authGuard]
  },
  {
    path: "donations",
    loadComponent: () => import("./chunk-65NC3SD5.js").then((m) => m.DonationListComponent),
    canActivate: [authGuard]
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

// src/app/core/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const authService = inject(AuthService);
  if (req.url.includes("/api/auth/login")) {
    return next(req);
  }
  const token = authService.getToken();
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }
  return next(req);
};

// src/app/core/interceptors/error.interceptor.ts
var errorInterceptor = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const authService = inject(AuthService);
  return next(req).pipe(catchError((error) => {
    switch (error.status) {
      case 401:
        authService.logout();
        router.navigate(["/login"]);
        notificationService.error("Session expired. Please log in again.");
        break;
      case 403:
        notificationService.error("Access denied. You do not have permission to perform this action.");
        break;
      case 500:
        notificationService.error("Something went wrong. Please try again later.");
        break;
    }
    return throwError(() => error);
  }));
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))
  ]
};

// src/app/shared/components/notification/notification.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NotificationComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "span", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 5);
    \u0275\u0275listener("click", function NotificationComponent_For_2_Template_button_click_5_listener() {
      const notification_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dismiss(notification_r2.id));
    });
    \u0275\u0275text(6, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const notification_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r2.getNotificationStyle(notification_r2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getIcon(notification_r2.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(notification_r2.message);
  }
}
var NotificationComponent = class _NotificationComponent {
  constructor() {
    this.notificationService = inject(NotificationService);
    this.notifications$ = this.notificationService.notifications;
  }
  getNotificationStyle(notification) {
    switch (notification.type) {
      case "success":
        return "background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.35);color:#34d399";
      case "error":
        return "background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.35);color:#f87171";
      case "info":
        return "background:rgba(34,211,238,0.12);border:1px solid rgba(34,211,238,0.3);color:#22d3ee";
      default:
        return "background:rgba(30,41,59,0.8);border:1px solid #334155;color:#94a3b8";
    }
  }
  getIcon(type) {
    switch (type) {
      case "success":
        return "\u2713";
      case "error":
        return "\u2715";
      case "info":
        return "\u2139";
      default:
        return "";
    }
  }
  dismiss(id) {
    this.notificationService.dismiss(id);
  }
  static {
    this.\u0275fac = function NotificationComponent_Factory(t) {
      return new (t || _NotificationComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationComponent, selectors: [["app-notification"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 2, consts: [["aria-live", "polite", "aria-atomic", "true", 2, "position", "fixed", "top", "1rem", "right", "1rem", "z-index", "9999", "display", "flex", "flex-direction", "column", "gap", "0.5rem", "max-width", "22rem"], ["role", "alert", 1, "toast-enter", 2, "border-radius", "0.75rem", "padding", "0.875rem 1rem", "display", "flex", "align-items", "center", "gap", "0.75rem", "box-shadow", "0 8px 32px rgba(0,0,0,0.4)", 3, "style"], ["role", "alert", 1, "toast-enter", 2, "border-radius", "0.75rem", "padding", "0.875rem 1rem", "display", "flex", "align-items", "center", "gap", "0.75rem", "box-shadow", "0 8px 32px rgba(0,0,0,0.4)"], [2, "font-size", "1.125rem", "flex-shrink", "0"], [2, "flex", "1", "font-size", "0.875rem", "font-weight", "500", "margin", "0", "line-height", "1.4"], ["aria-label", "Dismiss notification", 2, "background", "none", "border", "none", "cursor", "pointer", "opacity", "0.6", "font-size", "1.125rem", "line-height", "1", "padding", "0", "color", "inherit", "flex-shrink", "0", 3, "click"]], template: function NotificationComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275repeaterCreate(1, NotificationComponent_For_2_Template, 7, 4, "div", 1, _forTrack0);
        \u0275\u0275pipe(3, "async");
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275repeater(\u0275\u0275pipeBind1(3, 0, ctx.notifications$));
      }
    }, dependencies: [CommonModule, AsyncPipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationComponent, { className: "NotificationComponent", filePath: "src\\app\\shared\\components\\notification\\notification.component.ts", lineNumber: 31 });
})();

// src/app/app.component.ts
function AppComponent_Conditional_1_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 22);
  }
}
function AppComponent_Conditional_1_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 24);
  }
}
function AppComponent_Conditional_1_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 23)(1, "div", 25)(2, "a", 26);
    \u0275\u0275listener("click", function AppComponent_Conditional_1_Conditional_27_Template_a_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeMobileMenu());
    });
    \u0275\u0275text(3, " Dashboard ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 27);
    \u0275\u0275listener("click", function AppComponent_Conditional_1_Conditional_27_Template_a_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeMobileMenu());
    });
    \u0275\u0275text(5, " Donors ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 28)(7, "span", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 30);
    \u0275\u0275listener("click", function AppComponent_Conditional_1_Conditional_27_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275text(10, "Logout");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.authService.getRole());
  }
}
function AppComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 1)(1, "div", 4)(2, "div", 5)(3, "div", 6);
    \u0275\u0275element(4, "img", 7);
    \u0275\u0275elementStart(5, "span", 8);
    \u0275\u0275text(6, " \u05DE\u05E2\u05E8\u05DB\u05EA \u05DC\u05E0\u05D9\u05D4\u05D5\u05DC \u05EA\u05D5\u05E8\u05DE\u05D9\u05DD ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "nav", 9)(8, "a", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 11);
    \u0275\u0275element(10, "path", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Dashboard ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(12, "a", 13);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 11);
    \u0275\u0275element(14, "path", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " Donors ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "div", 15)(17, "span", 16);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 17);
    \u0275\u0275listener("click", function AppComponent_Conditional_1_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(20, "svg", 18);
    \u0275\u0275element(21, "path", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275text(22, " Logout ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(23, "button", 20);
    \u0275\u0275listener("click", function AppComponent_Conditional_1_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleMobileMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(24, "svg", 21);
    \u0275\u0275template(25, AppComponent_Conditional_1_Conditional_25_Template, 1, 0, ":svg:path", 22)(26, AppComponent_Conditional_1_Conditional_26_Template, 1, 0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(27, AppComponent_Conditional_1_Conditional_27_Template, 11, 1, "nav", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(18);
    \u0275\u0275textInterpolate1(" ", ctx_r1.authService.getRole(), " ");
    \u0275\u0275advance(5);
    \u0275\u0275attribute("aria-expanded", ctx_r1.mobileMenuOpen);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(25, !ctx_r1.mobileMenuOpen ? 25 : 26);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(27, ctx_r1.mobileMenuOpen ? 27 : -1);
  }
}
var AppComponent = class _AppComponent {
  constructor() {
    this.title = "Donor Management";
    this.mobileMenuOpen = false;
    this.authService = inject(AuthService);
  }
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
  logout() {
    this.authService.logout();
    this.mobileMenuOpen = false;
    window.location.href = "/login";
  }
  static {
    this.\u0275fac = function AppComponent_Factory(t) {
      return new (t || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 1, consts: [[1, "min-h-screen", "flex", "flex-col", 2, "background", "#0f172a"], [2, "background", "rgba(15,23,42,0.85)", "backdrop-filter", "blur(16px)", "border-bottom", "1px solid rgba(100,116,139,0.15)", "position", "sticky", "top", "0", "z-index", "40"], [2, "flex", "1", "padding", "1.5rem 1.25rem"], [2, "max-width", "88rem", "margin", "0 auto"], [2, "max-width", "88rem", "margin", "0 auto", "padding", "0 1.25rem"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "height", "64px"], [2, "display", "flex", "align-items", "center", "gap", "0.75rem", "flex-shrink", "0"], ["src", "assets/logo.jpg", "alt", "Logo", 2, "height", "42px", "width", "42px", "border-radius", "50%", "object-fit", "cover", "border", "2px solid rgba(34,211,238,0.3)", "box-shadow", "0 0 12px rgba(34,211,238,0.2)"], [1, "gradient-text", 2, "font-size", "1.125rem", "font-weight", "800", "white-space", "nowrap", "letter-spacing", "-0.02em"], ["aria-label", "Main navigation", 1, "hidden", "md:flex", 2, "align-items", "center", "gap", "0.25rem"], ["routerLink", "/dashboard", "routerLinkActive", "active", 1, "nav-link"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1rem", "height", "1rem", "display", "inline", "margin-right", "0.375rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"], ["routerLink", "/donors", "routerLinkActive", "active", 1, "nav-link"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"], [1, "hidden", "md:flex", 2, "align-items", "center", "gap", "0.75rem"], [1, "badge", "badge-slate", 2, "font-size", "0.7rem"], [1, "btn-secondary", 2, "padding", "0.375rem 0.875rem", "font-size", "0.8rem", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "0.875rem", "height", "0.875rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"], ["aria-controls", "mobile-menu", "aria-label", "Toggle navigation menu", 1, "md:hidden", 2, "display", "flex", "align-items", "center", "justify-content", "center", "width", "40px", "height", "40px", "border-radius", "0.5rem", "border", "1px solid #334155", "background", "transparent", "color", "#94a3b8", "cursor", "pointer", "transition", "all 0.15s", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 2, "width", "1.25rem", "height", "1.25rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6h16M4 12h16M4 18h16"], ["id", "mobile-menu", "aria-label", "Mobile navigation", 2, "border-top", "1px solid rgba(100,116,139,0.15)", "padding", "0.75rem 1.25rem 1rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [2, "display", "flex", "flex-direction", "column", "gap", "0.25rem", "margin-bottom", "0.75rem"], ["routerLink", "/dashboard", "routerLinkActive", "active", 1, "nav-link", 2, "display", "block", 3, "click"], ["routerLink", "/donors", "routerLinkActive", "active", 1, "nav-link", 2, "display", "block", 3, "click"], [2, "border-top", "1px solid #1e293b", "padding-top", "0.75rem", "display", "flex", "align-items", "center", "justify-content", "space-between"], [1, "badge", "badge-slate"], [1, "btn-secondary", 2, "padding", "0.35rem 0.75rem", "font-size", "0.8rem", 3, "click"]], template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, AppComponent_Conditional_1_Template, 28, 4, "header", 1);
        \u0275\u0275elementStart(2, "main", 2)(3, "div", 3);
        \u0275\u0275element(4, "router-outlet");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(5, "app-notification");
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(1, ctx.authService.isAuthenticated() ? 1 : -1);
      }
    }, dependencies: [CommonModule, RouterModule, RouterOutlet, RouterLink, RouterLinkActive, NotificationComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 125 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
