import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-QH27FNRJ.js";
import {
  AuthService,
  Router
} from "./chunk-A626HJ2P.js";
import "./chunk-66BI7DE2.js";
import {
  CommonModule,
  NgIf,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-IBG4PQOV.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, " Username is required ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent__svg_svg_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 23);
    \u0275\u0275element(1, "path", 24)(2, "path", 25);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent__svg_svg_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 23);
    \u0275\u0275element(1, "path", 26);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_p_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, " Password is required ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 28);
    \u0275\u0275element(2, "path", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function LoginComponent__svg_svg_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 31);
    \u0275\u0275element(1, "path", 32);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275element(1, "span", 34);
    \u0275\u0275text(2, " Signing in... ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Sign In");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.authService = inject(AuthService);
    this.router = inject(Router);
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.loading = false;
    this.errorMessage = "";
    this.showPassword = false;
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/dashboard"]);
    }
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.errorMessage = "";
    const request = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.authService.login(request).subscribe({
      next: () => {
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.errorMessage = "Invalid username or password";
        } else {
          this.errorMessage = "An unexpected error occurred. Please try again.";
        }
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 30, vars: 16, consts: [[2, "min-height", "100vh", "display", "flex", "align-items", "center", "justify-content", "center", "padding", "1.5rem", "background", "#0f172a", "position", "relative", "overflow", "hidden"], [2, "position", "absolute", "top", "-15%", "left", "-10%", "width", "50vw", "height", "50vw", "background", "radial-gradient(circle,rgba(34,211,238,0.08),transparent 70%)", "pointer-events", "none"], [2, "position", "absolute", "bottom", "-15%", "right", "-10%", "width", "45vw", "height", "45vw", "background", "radial-gradient(circle,rgba(139,92,246,0.08),transparent 70%)", "pointer-events", "none"], [2, "width", "100%", "max-width", "420px", "background", "rgba(15,23,42,0.9)", "border", "1px solid rgba(100,116,139,0.2)", "border-radius", "1rem", "padding", "2.5rem", "backdrop-filter", "blur(20px)", "box-shadow", "0 25px 50px rgba(0,0,0,0.5)", "position", "relative", "z-index", "1"], [2, "text-align", "center", "margin-bottom", "2rem"], ["src", "assets/logo.jpg", "alt", "Logo", 2, "width", "72px", "height", "72px", "border-radius", "50%", "object-fit", "cover", "margin", "0 auto 1rem", "display", "block", "border", "2px solid rgba(34,211,238,0.4)", "box-shadow", "0 0 24px rgba(34,211,238,0.2)"], [1, "gradient-text", 2, "font-size", "1.5rem", "font-weight", "800", "letter-spacing", "-0.02em", "margin", "0 0 0.25rem"], [2, "color", "#64748b", "font-size", "0.875rem", "margin", "0"], [2, "display", "flex", "flex-direction", "column", "gap", "1.25rem", 3, "ngSubmit", "formGroup"], ["for", "username", 2, "display", "block", "font-size", "0.8rem", "font-weight", "600", "color", "#94a3b8", "margin-bottom", "0.375rem", "letter-spacing", "0.05em", "text-transform", "uppercase"], ["id", "username", "type", "text", "formControlName", "username", "placeholder", "Enter your username", 1, "dark-input"], ["style", "margin-top:0.375rem;font-size:0.8rem;color:#f87171", 4, "ngIf"], ["for", "password", 2, "display", "block", "font-size", "0.8rem", "font-weight", "600", "color", "#94a3b8", "margin-bottom", "0.375rem", "letter-spacing", "0.05em", "text-transform", "uppercase"], [2, "position", "relative"], ["id", "password", "formControlName", "password", "placeholder", "Enter your password", 1, "dark-input", 2, "padding-right", "2.75rem", 3, "type"], ["type", "button", 2, "position", "absolute", "right", "0.75rem", "top", "50%", "transform", "translateY(-50%)", "background", "none", "border", "none", "cursor", "pointer", "color", "#64748b", "padding", "0", "display", "flex", "align-items", "center", 3, "click"], ["style", "width:1.125rem;height:1.125rem", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], ["style", "padding:0.75rem 1rem;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:0.5rem;display:flex;align-items:center;gap:0.5rem", 4, "ngIf"], ["type", "submit", 1, "btn-primary", 2, "width", "100%", "justify-content", "center", "padding", "0.75rem", "font-size", "0.9375rem", "margin-top", "0.25rem", 3, "disabled"], ["style", "width:1rem;height:1rem", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], ["style", "display:flex;align-items:center;gap:0.5rem", 4, "ngIf"], [4, "ngIf"], [2, "margin-top", "0.375rem", "font-size", "0.8rem", "color", "#f87171"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.125rem", "height", "1.125rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"], [2, "padding", "0.75rem 1rem", "background", "rgba(239,68,68,0.1)", "border", "1px solid rgba(239,68,68,0.3)", "border-radius", "0.5rem", "display", "flex", "align-items", "center", "gap", "0.5rem"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1rem", "height", "1rem", "color", "#f87171", "flex-shrink", "0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [2, "font-size", "0.875rem", "color", "#f87171", "margin", "0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1rem", "height", "1rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"], [2, "display", "flex", "align-items", "center", "gap", "0.5rem"], [2, "width", "1rem", "height", "1rem", "border", "2px solid rgba(255,255,255,0.3)", "border-top-color", "white", "border-radius", "50%", "animation", "spin 0.7s linear infinite", "display", "inline-block"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "div", 1)(2, "div", 2);
        \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
        \u0275\u0275element(5, "img", 5);
        \u0275\u0275elementStart(6, "h1", 6);
        \u0275\u0275text(7, " Donor Management ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 7);
        \u0275\u0275text(9, "Sign in to continue");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "form", 8);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_10_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(11, "div")(12, "label", 9);
        \u0275\u0275text(13, " Username ");
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "input", 10);
        \u0275\u0275template(15, LoginComponent_p_15_Template, 2, 0, "p", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div")(17, "label", 12);
        \u0275\u0275text(18, " Password ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 13);
        \u0275\u0275element(20, "input", 14);
        \u0275\u0275elementStart(21, "button", 15);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_21_listener() {
          return ctx.togglePassword();
        });
        \u0275\u0275template(22, LoginComponent__svg_svg_22_Template, 3, 0, "svg", 16)(23, LoginComponent__svg_svg_23_Template, 2, 0, "svg", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(24, LoginComponent_p_24_Template, 2, 0, "p", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275template(25, LoginComponent_div_25_Template, 5, 1, "div", 17);
        \u0275\u0275elementStart(26, "button", 18);
        \u0275\u0275template(27, LoginComponent__svg_svg_27_Template, 2, 0, "svg", 19)(28, LoginComponent_span_28_Template, 3, 0, "span", 20)(29, LoginComponent_span_29_Template, 2, 0, "span", 21);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        let tmp_3_0;
        let tmp_8_0;
        \u0275\u0275advance(10);
        \u0275\u0275property("formGroup", ctx.loginForm);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("error", ((tmp_1_0 = ctx.loginForm.get("username")) == null ? null : tmp_1_0.touched) && ((tmp_1_0 = ctx.loginForm.get("username")) == null ? null : tmp_1_0.hasError("required")));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.loginForm.get("username")) == null ? null : tmp_2_0.touched) && ((tmp_2_0 = ctx.loginForm.get("username")) == null ? null : tmp_2_0.hasError("required")));
        \u0275\u0275advance(5);
        \u0275\u0275classProp("error", ((tmp_3_0 = ctx.loginForm.get("password")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx.loginForm.get("password")) == null ? null : tmp_3_0.hasError("required")));
        \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
        \u0275\u0275advance();
        \u0275\u0275attribute("aria-label", ctx.showPassword ? "Hide password" : "Show password");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ((tmp_8_0 = ctx.loginForm.get("password")) == null ? null : tmp_8_0.touched) && ((tmp_8_0 = ctx.loginForm.get("password")) == null ? null : tmp_8_0.hasError("required")));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errorMessage);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loginForm.invalid || ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\features\\auth\\login\\login.component.ts", lineNumber: 110 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-4GILZM5M.js.map
