import {
  DonorFormComponent,
  DonorService
} from "./chunk-DTUZFA5M.js";
import {
  NotificationService
} from "./chunk-UFM4NYX4.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-QH27FNRJ.js";
import {
  ActivatedRoute,
  AuthService,
  Router
} from "./chunk-A626HJ2P.js";
import {
  HttpClient
} from "./chunk-66BI7DE2.js";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  EventEmitter,
  NgForOf,
  NgIf,
  inject,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IBG4PQOV.js";

// src/app/core/services/donation.service.ts
var DonationService = class _DonationService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = "/api";
  }
  getByDonorId(donorId) {
    return this.http.get(`${this.baseUrl}/donors/${donorId}/donations`);
  }
  create(donorId, request) {
    return this.http.post(`${this.baseUrl}/donors/${donorId}/donations`, request);
  }
  update(id, request) {
    return this.http.put(`${this.baseUrl}/donations/${id}`, request);
  }
  delete(id) {
    return this.http.delete(`${this.baseUrl}/donations/${id}`);
  }
  static {
    this.\u0275fac = function DonationService_Factory(t) {
      return new (t || _DonationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DonationService, factory: _DonationService.\u0275fac, providedIn: "root" });
  }
};

// src/app/core/services/event.service.ts
var EventService = class _EventService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = "/api";
  }
  getByDonorId(donorId) {
    return this.http.get(`${this.baseUrl}/donors/${donorId}/events`);
  }
  create(donorId, request) {
    return this.http.post(`${this.baseUrl}/donors/${donorId}/events`, request);
  }
  update(id, request) {
    return this.http.put(`${this.baseUrl}/events/${id}`, request);
  }
  delete(id) {
    return this.http.delete(`${this.baseUrl}/events/${id}`);
  }
  static {
    this.\u0275fac = function EventService_Factory(t) {
      return new (t || _EventService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EventService, factory: _EventService.\u0275fac, providedIn: "root" });
  }
};

// src/app/core/services/receipt.service.ts
var ReceiptService = class _ReceiptService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = "/api";
  }
  downloadPdf(donationId) {
    return this.http.get(`${this.baseUrl}/donations/${donationId}/receipt/pdf`, {
      responseType: "blob"
    });
  }
  downloadDocx(donationId) {
    return this.http.get(`${this.baseUrl}/donations/${donationId}/receipt/docx`, {
      responseType: "blob"
    });
  }
  static {
    this.\u0275fac = function ReceiptService_Factory(t) {
      return new (t || _ReceiptService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReceiptService, factory: _ReceiptService.\u0275fac, providedIn: "root" });
  }
};

// src/app/models/event.model.ts
var EventType;
(function(EventType2) {
  EventType2["Birthday"] = "Birthday";
  EventType2["Yahrzeit"] = "Yahrzeit";
  EventType2["Wedding"] = "Wedding";
  EventType2["BarMitzva"] = "BarMitzva";
  EventType2["Dinner"] = "Dinner";
  EventType2["Visit"] = "Visit";
  EventType2["FollowUp"] = "FollowUp";
})(EventType || (EventType = {}));
var EVENT_TYPE_LABELS = {
  [EventType.Birthday]: "Birthday",
  [EventType.Yahrzeit]: "\u05D9\u05D5\u05E8\u05E6\u05D0\u05D9\u05D8",
  [EventType.Wedding]: "Wedding",
  [EventType.BarMitzva]: "Bar Mitzva",
  [EventType.Dinner]: "Dinner",
  [EventType.Visit]: "\u05D1\u05D9\u05E7\u05D5\u05E8 \u05D4\u05EA\u05E8\u05DE\u05D4",
  [EventType.FollowUp]: "Follow Up"
};

// src/app/shared/components/confirm-dialog/confirm-dialog.component.ts
function ConfirmDialogComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function ConfirmDialogComponent_Conditional_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCancel());
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function ConfirmDialogComponent_Conditional_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 3)(3, "div", 4);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 5);
    \u0275\u0275element(5, "path", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "h2", 7);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 9)(11, "button", 10);
    \u0275\u0275listener("click", function ConfirmDialogComponent_Conditional_0_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCancel());
    });
    \u0275\u0275text(12, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 11);
    \u0275\u0275listener("click", function ConfirmDialogComponent_Conditional_0_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onConfirm());
    });
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.message);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.confirmText);
  }
}
var ConfirmDialogComponent = class _ConfirmDialogComponent {
  constructor() {
    this.visible = false;
    this.title = "Confirm Action";
    this.message = "Are you sure you want to proceed?";
    this.confirmText = "Confirm";
    this.confirmed = new EventEmitter();
    this.cancelled = new EventEmitter();
  }
  onConfirm() {
    this.confirmed.emit();
  }
  onCancel() {
    this.cancelled.emit();
  }
  static {
    this.\u0275fac = function ConfirmDialogComponent_Factory(t) {
      return new (t || _ConfirmDialogComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmDialogComponent, selectors: [["app-confirm-dialog"]], inputs: { visible: "visible", title: "title", message: "message", confirmText: "confirmText" }, outputs: { confirmed: "confirmed", cancelled: "cancelled" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["role", "dialog", "aria-modal", "true", "aria-labelledby", "confirm-dialog-title", 1, "modal-overlay"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "confirm-dialog-title", 1, "modal-overlay", 3, "click"], [2, "background", "#0f172a", "border", "1px solid rgba(100,116,139,0.25)", "border-radius", "0.875rem", "padding", "1.75rem", "max-width", "420px", "width", "100%", "margin", "1rem", "box-shadow", "0 25px 50px rgba(0,0,0,0.6)", 3, "click"], [2, "display", "flex", "align-items", "center", "gap", "0.875rem", "margin-bottom", "1rem"], [2, "width", "44px", "height", "44px", "border-radius", "50%", "background", "rgba(239,68,68,0.12)", "border", "1px solid rgba(239,68,68,0.25)", "display", "flex", "align-items", "center", "justify-content", "center", "flex-shrink", "0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.25rem", "height", "1.25rem", "color", "#f87171"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"], ["id", "confirm-dialog-title", 2, "font-size", "1.0625rem", "font-weight", "700", "color", "#f1f5f9", "margin", "0"], [2, "color", "#94a3b8", "font-size", "0.875rem", "line-height", "1.6", "margin", "0 0 1.5rem"], [2, "display", "flex", "justify-content", "flex-end", "gap", "0.75rem"], ["type", "button", 1, "btn-secondary", 3, "click"], ["type", "button", 1, "btn-danger", 3, "click"]], template: function ConfirmDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ConfirmDialogComponent_Conditional_0_Template, 15, 3, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(0, ctx.visible ? 0 : -1);
      }
    }, dependencies: [CommonModule], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmDialogComponent, { className: "ConfirmDialogComponent", filePath: "src\\app\\shared\\components\\confirm-dialog\\confirm-dialog.component.ts", lineNumber: 32 });
})();

// src/app/models/donation.model.ts
var PaymentMethod;
(function(PaymentMethod2) {
  PaymentMethod2["Cash"] = "Cash";
  PaymentMethod2["CreditCard"] = "CreditCard";
  PaymentMethod2["BankTransfer"] = "BankTransfer";
  PaymentMethod2["Check"] = "Check";
  PaymentMethod2["NedarimPlus"] = "NedarimPlus";
  PaymentMethod2["Achisamach"] = "Achisamach";
  PaymentMethod2["Other"] = "Other";
})(PaymentMethod || (PaymentMethod = {}));
var DonationType;
(function(DonationType2) {
  DonationType2["OneTime"] = "OneTime";
  DonationType2["Annual"] = "Annual";
})(DonationType || (DonationType = {}));

// src/app/features/donations/donation-form/donation-form.component.ts
function DonationFormComponent_div_0_p_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1, "Amount is required.");
    \u0275\u0275elementEnd();
  }
}
function DonationFormComponent_div_0_p_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1, "Must be greater than zero.");
    \u0275\u0275elementEnd();
  }
}
function DonationFormComponent_div_0_p_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1, "Date is required.");
    \u0275\u0275elementEnd();
  }
}
function DonationFormComponent_div_0_option_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const method_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", method_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatPaymentMethod(method_r3));
  }
}
function DonationFormComponent_div_0_p_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1, "Payment method is required.");
    \u0275\u0275elementEnd();
  }
}
function DonationFormComponent_div_0_span_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275element(1, "span", 42);
    \u0275\u0275text(2, " Saving... ");
    \u0275\u0275elementEnd();
  }
}
function DonationFormComponent_div_0_span_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.donation ? "Update" : "Create");
  }
}
function DonationFormComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275listener("click", function DonationFormComponent_div_0_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "div", 6);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 7);
    \u0275\u0275element(7, "path", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "h2", 9);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 10);
    \u0275\u0275listener("click", function DonationFormComponent_div_0_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 11);
    \u0275\u0275element(12, "path", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "form", 13);
    \u0275\u0275listener("ngSubmit", function DonationFormComponent_div_0_Template_form_ngSubmit_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(14, "div")(15, "label", 14);
    \u0275\u0275text(16, "Donation Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 15)(18, "button", 16);
    \u0275\u0275listener("click", function DonationFormComponent_div_0_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setDonationType("OneTime"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 17);
    \u0275\u0275element(20, "path", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " One Time ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "button", 16);
    \u0275\u0275listener("click", function DonationFormComponent_div_0_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setDonationType("Annual"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(23, "svg", 17);
    \u0275\u0275element(24, "path", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " Annual ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(26, "div", 20)(27, "div")(28, "label", 21);
    \u0275\u0275text(29, " Amount ");
    \u0275\u0275elementStart(30, "span", 22);
    \u0275\u0275text(31, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(32, "input", 23);
    \u0275\u0275template(33, DonationFormComponent_div_0_p_33_Template, 2, 0, "p", 24)(34, DonationFormComponent_div_0_p_34_Template, 2, 0, "p", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div")(36, "label", 21);
    \u0275\u0275text(37, "Currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "select", 25)(39, "option", 26);
    \u0275\u0275text(40, "$ USD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option", 27);
    \u0275\u0275text(42, "\u20AA NIS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 28);
    \u0275\u0275text(44, "\xA3 GBP");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(45, "div")(46, "label", 21);
    \u0275\u0275text(47, " Donation Date ");
    \u0275\u0275elementStart(48, "span", 22);
    \u0275\u0275text(49, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(50, "input", 29);
    \u0275\u0275template(51, DonationFormComponent_div_0_p_51_Template, 2, 0, "p", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div")(53, "label", 21);
    \u0275\u0275text(54, " Payment Method ");
    \u0275\u0275elementStart(55, "span", 22);
    \u0275\u0275text(56, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "select", 30)(58, "option", 31);
    \u0275\u0275text(59, "Select method");
    \u0275\u0275elementEnd();
    \u0275\u0275template(60, DonationFormComponent_div_0_option_60_Template, 2, 2, "option", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275template(61, DonationFormComponent_div_0_p_61_Template, 2, 0, "p", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div")(63, "label", 21);
    \u0275\u0275text(64, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275element(65, "textarea", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 34)(67, "button", 35);
    \u0275\u0275listener("click", function DonationFormComponent_div_0_Template_button_click_67_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275text(68, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "button", 36);
    \u0275\u0275template(70, DonationFormComponent_div_0_span_70_Template, 3, 0, "span", 37)(71, DonationFormComponent_div_0_span_71_Template, 2, 1, "span", 38);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_11_0;
    let tmp_12_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r1.donation ? "Edit Donation" : "Create Donation");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.donation ? "Edit Donation" : "New Donation");
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(5);
    \u0275\u0275styleProp("background", ((tmp_4_0 = ctx_r1.form.get("donationType")) == null ? null : tmp_4_0.value) === "OneTime" ? "linear-gradient(135deg,#06b6d4,#6366f1)" : "transparent")("color", ((tmp_5_0 = ctx_r1.form.get("donationType")) == null ? null : tmp_5_0.value) === "OneTime" ? "white" : "#64748b")("box-shadow", ((tmp_6_0 = ctx_r1.form.get("donationType")) == null ? null : tmp_6_0.value) === "OneTime" ? "0 4px 12px rgba(6,182,212,0.3)" : "none");
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("background", ((tmp_7_0 = ctx_r1.form.get("donationType")) == null ? null : tmp_7_0.value) === "Annual" ? "linear-gradient(135deg,#8b5cf6,#06b6d4)" : "transparent")("color", ((tmp_8_0 = ctx_r1.form.get("donationType")) == null ? null : tmp_8_0.value) === "Annual" ? "white" : "#64748b")("box-shadow", ((tmp_9_0 = ctx_r1.form.get("donationType")) == null ? null : tmp_9_0.value) === "Annual" ? "0 4px 12px rgba(139,92,246,0.3)" : "none");
    \u0275\u0275advance(10);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("amount"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("amount") && ((tmp_11_0 = ctx_r1.form.get("amount")) == null ? null : tmp_11_0.errors == null ? null : tmp_11_0.errors["required"]));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("amount") && ((tmp_12_0 = ctx_r1.form.get("amount")) == null ? null : tmp_12_0.errors == null ? null : tmp_12_0.errors["min"]));
    \u0275\u0275advance(16);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("donationDate"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("donationDate"));
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("paymentMethod"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.paymentMethods);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("paymentMethod"));
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.form.invalid || ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.submitting);
  }
}
var DonationFormComponent = class _DonationFormComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.donationService = inject(DonationService);
    this.notificationService = inject(NotificationService);
    this.visible = false;
    this.donorId = "";
    this.donation = null;
    this.saved = new EventEmitter();
    this.closed = new EventEmitter();
    this.submitting = false;
    this.paymentMethods = Object.values(PaymentMethod);
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      currency: ["USD", [Validators.required]],
      donationDate: ["", [Validators.required]],
      paymentMethod: ["", [Validators.required]],
      donationType: [DonationType.OneTime, [Validators.required]],
      notes: [null]
    });
  }
  setDonationType(type) {
    this.form.patchValue({ donationType: type });
  }
  ngOnChanges(changes) {
    if (changes["visible"] && this.visible) {
      this.resetForm();
    }
  }
  isFieldInvalid(fieldName) {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  formatPaymentMethod(method) {
    switch (method) {
      case PaymentMethod.Cash:
        return "Cash";
      case PaymentMethod.CreditCard:
        return "Credit Card";
      case PaymentMethod.BankTransfer:
        return "Bank Transfer";
      case PaymentMethod.Check:
        return "Check";
      case PaymentMethod.NedarimPlus:
        return "Nedarim Plus";
      case PaymentMethod.Achisamach:
        return "Achisamach";
      case PaymentMethod.Other:
        return "Other";
      default:
        return method;
    }
  }
  onClose() {
    this.closed.emit();
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const formValue = this.form.getRawValue();
    const request = {
      amount: formValue.amount,
      currency: formValue.currency,
      donationDate: formValue.donationDate,
      notes: formValue.notes || null,
      paymentMethod: formValue.paymentMethod,
      donationType: formValue.donationType
    };
    const operation$ = this.donation ? this.donationService.update(this.donation.id, request) : this.donationService.create(this.donorId, request);
    operation$.subscribe({
      next: () => {
        this.submitting = false;
        this.notificationService.success(this.donation ? "Donation updated successfully." : "Donation created successfully.");
        this.saved.emit();
        this.closed.emit();
      },
      error: () => {
        this.submitting = false;
        this.notificationService.error("Failed to save donation. Please try again.");
      }
    });
  }
  resetForm() {
    if (this.donation) {
      this.form.patchValue({
        amount: this.donation.amount,
        currency: this.donation.currency || "USD",
        donationDate: this.donation.donationDate,
        paymentMethod: this.donation.paymentMethod,
        donationType: this.donation.donationType || DonationType.OneTime,
        notes: this.donation.notes
      });
    } else {
      this.form.reset({ paymentMethod: "", currency: "USD", donationType: DonationType.OneTime });
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.submitting = false;
  }
  static {
    this.\u0275fac = function DonationFormComponent_Factory(t) {
      return new (t || _DonationFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DonationFormComponent, selectors: [["app-donation-form"]], inputs: { visible: "visible", donorId: "donorId", donation: "donation" }, outputs: { saved: "saved", closed: "closed" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["style", "position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center", "role", "dialog", "aria-modal", "true", 4, "ngIf"], ["role", "dialog", "aria-modal", "true", 2, "position", "fixed", "inset", "0", "z-index", "50", "display", "flex", "align-items", "center", "justify-content", "center"], [2, "position", "absolute", "inset", "0", "background", "rgba(0,0,0,0.7)", "backdrop-filter", "blur(4px)", 3, "click"], [2, "position", "relative", "width", "100%", "max-width", "520px", "margin", "1rem", "max-height", "90vh", "overflow-y", "auto", "background", "#0f172a", "border", "1px solid rgba(100,116,139,0.25)", "border-radius", "1rem", "box-shadow", "0 25px 60px rgba(0,0,0,0.6)"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "padding", "1.25rem 1.5rem", "border-bottom", "1px solid rgba(100,116,139,0.15)", "position", "sticky", "top", "0", "background", "#0f172a", "z-index", "1"], [2, "display", "flex", "align-items", "center", "gap", "0.75rem"], [2, "width", "36px", "height", "36px", "border-radius", "0.5rem", "background", "linear-gradient(135deg,rgba(52,211,153,0.2),rgba(6,182,212,0.2))", "border", "1px solid rgba(52,211,153,0.25)", "display", "flex", "align-items", "center", "justify-content", "center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.125rem", "height", "1.125rem", "color", "#34d399"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [2, "font-size", "1.0625rem", "font-weight", "700", "color", "#f1f5f9", "margin", "0"], ["aria-label", "Close", 2, "background", "none", "border", "none", "cursor", "pointer", "color", "#64748b", "padding", "0.25rem", "border-radius", "0.375rem", "display", "flex", "align-items", "center", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.25rem", "height", "1.25rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [2, "padding", "1.5rem", "display", "flex", "flex-direction", "column", "gap", "1.25rem", 3, "ngSubmit", "formGroup"], [2, "display", "block", "font-size", "0.75rem", "font-weight", "600", "color", "#64748b", "margin-bottom", "0.625rem", "letter-spacing", "0.05em", "text-transform", "uppercase"], [2, "display", "flex", "background", "#1e293b", "border", "1px solid #334155", "border-radius", "0.625rem", "padding", "0.25rem", "gap", "0.25rem"], ["type", "button", 2, "flex", "1", "padding", "0.5rem 1rem", "border-radius", "0.375rem", "border", "none", "font-size", "0.875rem", "font-weight", "600", "cursor", "pointer", "transition", "all 0.2s", "display", "flex", "align-items", "center", "justify-content", "center", "gap", "0.375rem", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "0.875rem", "height", "0.875rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"], [2, "display", "grid", "grid-template-columns", "1fr auto", "gap", "0.75rem", "align-items", "start"], [2, "display", "block", "font-size", "0.75rem", "font-weight", "600", "color", "#64748b", "margin-bottom", "0.375rem", "letter-spacing", "0.05em", "text-transform", "uppercase"], [2, "color", "#f87171"], ["type", "number", "step", "0.01", "formControlName", "amount", "placeholder", "0.00", 1, "dark-input"], ["style", "margin-top:0.3rem;font-size:0.75rem;color:#f87171", 4, "ngIf"], ["formControlName", "currency", 1, "dark-input", 2, "cursor", "pointer", "width", "110px"], ["value", "USD", 2, "background", "#1e293b"], ["value", "NIS", 2, "background", "#1e293b"], ["value", "GBP", 2, "background", "#1e293b"], ["type", "date", "formControlName", "donationDate", 1, "dark-input"], ["formControlName", "paymentMethod", 1, "dark-input", 2, "cursor", "pointer"], ["value", "", "disabled", "", 2, "background", "#1e293b"], ["style", "background:#1e293b", 3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "notes", "rows", "3", "placeholder", "Optional notes\u2026", 1, "dark-input", 2, "resize", "vertical", "font-family", "inherit", "line-height", "1.5"], [2, "display", "flex", "justify-content", "flex-end", "gap", "0.75rem", "padding-top", "0.5rem", "border-top", "1px solid rgba(100,116,139,0.15)"], ["type", "button", 1, "btn-secondary", 3, "click"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["style", "display:flex;align-items:center;gap:0.375rem", 4, "ngIf"], [4, "ngIf"], [2, "margin-top", "0.3rem", "font-size", "0.75rem", "color", "#f87171"], [2, "background", "#1e293b", 3, "value"], [2, "display", "flex", "align-items", "center", "gap", "0.375rem"], [2, "width", "0.875rem", "height", "0.875rem", "border", "2px solid rgba(255,255,255,0.3)", "border-top-color", "white", "border-radius", "50%", "animation", "spin 0.7s linear infinite", "display", "inline-block"]], template: function DonationFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, DonationFormComponent_div_0_Template, 72, 29, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.visible);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DonationFormComponent, { className: "DonationFormComponent", filePath: "src\\app\\features\\donations\\donation-form\\donation-form.component.ts", lineNumber: 146 });
})();

// src/app/features/events/event-form/event-form.component.ts
function EventFormComponent_div_0_option_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", type_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getLabel(type_r3));
  }
}
function EventFormComponent_div_0_p_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "Event type is required.");
    \u0275\u0275elementEnd();
  }
}
function EventFormComponent_div_0_p_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "Date is required.");
    \u0275\u0275elementEnd();
  }
}
function EventFormComponent_div_0_span_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275element(1, "span", 30);
    \u0275\u0275text(2, " Saving... ");
    \u0275\u0275elementEnd();
  }
}
function EventFormComponent_div_0_span_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.event ? "Update" : "Add");
  }
}
function EventFormComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275listener("click", function EventFormComponent_div_0_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "div", 6);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 7);
    \u0275\u0275element(7, "path", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "h2", 9);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 10);
    \u0275\u0275listener("click", function EventFormComponent_div_0_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 11);
    \u0275\u0275element(12, "path", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "form", 13);
    \u0275\u0275listener("ngSubmit", function EventFormComponent_div_0_Template_form_ngSubmit_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(14, "div")(15, "label", 14);
    \u0275\u0275text(16, " Event Type ");
    \u0275\u0275elementStart(17, "span", 15);
    \u0275\u0275text(18, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "select", 16)(20, "option", 17);
    \u0275\u0275text(21, "Select event type");
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, EventFormComponent_div_0_option_22_Template, 2, 2, "option", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, EventFormComponent_div_0_p_23_Template, 2, 0, "p", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "label", 14);
    \u0275\u0275text(26, " Date ");
    \u0275\u0275elementStart(27, "span", 15);
    \u0275\u0275text(28, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(29, "input", 20);
    \u0275\u0275template(30, EventFormComponent_div_0_p_30_Template, 2, 0, "p", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div")(32, "label", 14);
    \u0275\u0275text(33, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275element(34, "textarea", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 22)(36, "button", 23);
    \u0275\u0275listener("click", function EventFormComponent_div_0_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275text(37, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 24);
    \u0275\u0275template(39, EventFormComponent_div_0_span_39_Template, 3, 0, "span", 25)(40, EventFormComponent_div_0_span_40_Template, 2, 1, "span", 26);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r1.event ? "Edit Event" : "Add Event");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.event ? "Edit Event" : "Add Event");
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("eventType"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.eventTypes);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("eventType"));
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("eventDate"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("eventDate"));
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.form.invalid || ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.submitting);
  }
}
var EventFormComponent = class _EventFormComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.eventService = inject(EventService);
    this.notificationService = inject(NotificationService);
    this.visible = false;
    this.donorId = "";
    this.event = null;
    this.saved = new EventEmitter();
    this.closed = new EventEmitter();
    this.submitting = false;
    this.eventTypes = Object.values(EventType);
    this.form = this.fb.group({
      eventType: ["", Validators.required],
      eventDate: ["", Validators.required],
      notes: [null]
    });
  }
  ngOnChanges(changes) {
    if (changes["visible"] && this.visible) {
      this.resetForm();
    }
  }
  isFieldInvalid(field) {
    const f = this.form.get(field);
    return !!(f && f.invalid && (f.dirty || f.touched));
  }
  getLabel(type) {
    return EVENT_TYPE_LABELS[type];
  }
  onClose() {
    this.closed.emit();
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const { eventType, eventDate, notes } = this.form.getRawValue();
    const request = {
      eventType,
      eventDate: eventDate || null,
      notes: notes || null
    };
    const op$ = this.event ? this.eventService.update(this.event.id, request) : this.eventService.create(this.donorId, request);
    op$.subscribe({
      next: () => {
        this.submitting = false;
        this.notificationService.success(this.event ? "Event updated." : "Event added.");
        this.saved.emit();
        this.closed.emit();
      },
      error: (err) => {
        this.submitting = false;
        const detail = err?.error?.errors ? JSON.stringify(err.error.errors) : err?.error?.message || err?.message || `Status ${err.status}`;
        this.notificationService.error(`Failed to save event: ${detail}`);
      }
    });
  }
  resetForm() {
    if (this.event) {
      this.form.patchValue({
        eventType: this.event.eventType,
        eventDate: this.event.eventDate,
        notes: this.event.notes
      });
    } else {
      this.form.reset({ eventType: "" });
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.submitting = false;
  }
  static {
    this.\u0275fac = function EventFormComponent_Factory(t) {
      return new (t || _EventFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventFormComponent, selectors: [["app-event-form"]], inputs: { visible: "visible", donorId: "donorId", event: "event" }, outputs: { saved: "saved", closed: "closed" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["style", "position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center", "role", "dialog", "aria-modal", "true", 4, "ngIf"], ["role", "dialog", "aria-modal", "true", 2, "position", "fixed", "inset", "0", "z-index", "50", "display", "flex", "align-items", "center", "justify-content", "center"], [2, "position", "absolute", "inset", "0", "background", "rgba(0,0,0,0.7)", "backdrop-filter", "blur(4px)", 3, "click"], [2, "position", "relative", "width", "100%", "max-width", "460px", "margin", "1rem", "background", "#0f172a", "border", "1px solid rgba(100,116,139,0.25)", "border-radius", "1rem", "box-shadow", "0 25px 60px rgba(0,0,0,0.6)"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "padding", "1.25rem 1.5rem", "border-bottom", "1px solid rgba(100,116,139,0.15)"], [2, "display", "flex", "align-items", "center", "gap", "0.75rem"], [2, "width", "36px", "height", "36px", "border-radius", "0.5rem", "background", "linear-gradient(135deg,rgba(139,92,246,0.2),rgba(34,211,238,0.2))", "border", "1px solid rgba(139,92,246,0.25)", "display", "flex", "align-items", "center", "justify-content", "center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.125rem", "height", "1.125rem", "color", "#a78bfa"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"], [2, "font-size", "1.0625rem", "font-weight", "700", "color", "#f1f5f9", "margin", "0"], ["aria-label", "Close", 2, "background", "none", "border", "none", "cursor", "pointer", "color", "#64748b", "padding", "0.25rem", "border-radius", "0.375rem", "display", "flex", "align-items", "center", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.25rem", "height", "1.25rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [2, "padding", "1.5rem", "display", "flex", "flex-direction", "column", "gap", "1.25rem", 3, "ngSubmit", "formGroup"], [2, "display", "block", "font-size", "0.75rem", "font-weight", "600", "color", "#64748b", "margin-bottom", "0.375rem", "letter-spacing", "0.05em", "text-transform", "uppercase"], [2, "color", "#f87171"], ["formControlName", "eventType", 1, "dark-input", 2, "cursor", "pointer"], ["value", "", "disabled", "", 2, "background", "#1e293b", "color", "#64748b"], ["style", "background:#1e293b;color:#e2e8f0", 3, "value", 4, "ngFor", "ngForOf"], ["style", "margin-top:0.3rem;font-size:0.75rem;color:#f87171", 4, "ngIf"], ["type", "date", "formControlName", "eventDate", 1, "dark-input"], ["formControlName", "notes", "rows", "3", "placeholder", "Optional notes\u2026", 1, "dark-input", 2, "resize", "vertical", "font-family", "inherit", "line-height", "1.5"], [2, "display", "flex", "justify-content", "flex-end", "gap", "0.75rem", "padding-top", "0.5rem", "border-top", "1px solid rgba(100,116,139,0.15)"], ["type", "button", 1, "btn-secondary", 3, "click"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["style", "display:flex;align-items:center;gap:0.375rem", 4, "ngIf"], [4, "ngIf"], [2, "background", "#1e293b", "color", "#e2e8f0", 3, "value"], [2, "margin-top", "0.3rem", "font-size", "0.75rem", "color", "#f87171"], [2, "display", "flex", "align-items", "center", "gap", "0.375rem"], [2, "width", "0.875rem", "height", "0.875rem", "border", "2px solid rgba(255,255,255,0.3)", "border-top-color", "white", "border-radius", "50%", "animation", "spin 0.7s linear infinite", "display", "inline-block"]], template: function EventFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, EventFormComponent_div_0_Template, 41, 13, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.visible);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventFormComponent, { className: "EventFormComponent", filePath: "src\\app\\features\\events\\event-form\\event-form.component.ts", lineNumber: 92 });
})();

// src/app/features/donors/donor-card/donor-card.component.ts
function DonorCardComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "div", 11);
    \u0275\u0275elementEnd();
  }
}
function DonorCardComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13);
    \u0275\u0275element(2, "path", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "h3", 15);
    \u0275\u0275text(4, "Donor not found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 16);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 17);
    \u0275\u0275listener("click", function DonorCardComponent_div_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(8, " Back to Donors ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function DonorCardComponent_div_3_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "button", 43);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_div_6_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showEditForm());
    });
    \u0275\u0275text(2, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 44);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_div_6_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showDeleteDialog());
    });
    \u0275\u0275text(4, "Delete");
    \u0275\u0275elementEnd()();
  }
}
function DonorCardComponent_div_3_span_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.donor.familyStatus === "Single" ? "badge-emerald" : ctx_r1.donor.familyStatus === "Married" ? "badge-cyan" : ctx_r1.donor.familyStatus === "Divorced" ? "badge-amber" : "badge-slate");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.donor.familyStatus, " ");
  }
}
function DonorCardComponent_div_3_span_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, "N/A");
    \u0275\u0275elementEnd();
  }
}
function DonorCardComponent_div_3_div_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 27);
    \u0275\u0275text(2, "General Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.donor.generalNotes);
  }
}
function DonorCardComponent_div_3_button_84_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 47);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_button_84_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showAddEventForm());
    });
    \u0275\u0275text(1, " + Add Event ");
    \u0275\u0275elementEnd();
  }
}
function DonorCardComponent_div_3_div_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 49);
    \u0275\u0275element(2, "path", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 51);
    \u0275\u0275text(4, "No events recorded yet.");
    \u0275\u0275elementEnd()();
  }
}
function DonorCardComponent_div_3_div_86_div_1_div_10_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 65)(1, "button", 66);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_div_86_div_1_div_10_div_18_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const event_r9 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.showEditEventForm(event_r9));
    });
    \u0275\u0275text(2, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 67);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_div_86_div_1_div_10_div_18_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r8);
      const event_r9 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.showDeleteEventDialog(event_r9));
    });
    \u0275\u0275text(4, "Delete");
    \u0275\u0275elementEnd()();
  }
}
function DonorCardComponent_div_3_div_86_div_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 63)(2, "div")(3, "span", 27);
    \u0275\u0275text(4, "Event Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "span", 27);
    \u0275\u0275text(9, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 28);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 29)(14, "span", 27);
    \u0275\u0275text(15, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 28);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, DonorCardComponent_div_3_div_86_div_1_div_10_div_18_Template, 5, 0, "div", 64);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.getEventTypeLabel(event_r9.eventType));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 4, event_r9.eventDate, "mediumDate"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(event_r9.notes || "No notes");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
  }
}
function DonorCardComponent_div_3_div_86_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "button", 55);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_div_86_div_1_Template_button_click_1_listener() {
      const i_r7 = \u0275\u0275restoreView(_r6).index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleEvent(i_r7));
    });
    \u0275\u0275elementStart(2, "div", 56)(3, "span", 57);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 58);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 59);
    \u0275\u0275element(9, "path", 60);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, DonorCardComponent_div_3_div_86_div_1_div_10_Template, 19, 7, "div", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r9 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r1.expandedEvents.has(i_r7));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getEventTypeLabel(event_r9.eventType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 6, event_r9.eventDate, "mediumDate"));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("transform", ctx_r1.expandedEvents.has(i_r7) ? "rotate(180deg)" : "rotate(0)");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.expandedEvents.has(i_r7));
  }
}
function DonorCardComponent_div_3_div_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275template(1, DonorCardComponent_div_3_div_86_div_1_Template, 11, 9, "div", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.donor.events);
  }
}
function DonorCardComponent_div_3_div_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 49);
    \u0275\u0275element(2, "path", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 51);
    \u0275\u0275text(4, "No donations recorded yet.");
    \u0275\u0275elementEnd()();
  }
}
function DonorCardComponent_div_3_div_96_div_1_div_15_button_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_div_96_div_1_div_15_button_39_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const donation_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.showEditDonation(donation_r13));
    });
    \u0275\u0275text(1, "Edit");
    \u0275\u0275elementEnd();
  }
}
function DonorCardComponent_div_3_div_96_div_1_div_15_button_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 67);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_div_96_div_1_div_15_button_40_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const donation_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.showDeleteDonationDialog(donation_r13));
    });
    \u0275\u0275text(1, "Delete");
    \u0275\u0275elementEnd();
  }
}
function DonorCardComponent_div_3_div_96_div_1_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "div", 63)(2, "div")(3, "span", 27);
    \u0275\u0275text(4, "Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 28);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "span", 27);
    \u0275\u0275text(10, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 28);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div")(15, "span", 27);
    \u0275\u0275text(16, "Payment Method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 28);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div")(20, "span", 27);
    \u0275\u0275text(21, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 45);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div")(25, "span", 27);
    \u0275\u0275text(26, "Receipt Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 28);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 29)(30, "span", 27);
    \u0275\u0275text(31, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 28);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 75)(35, "button", 76);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_div_96_div_1_div_15_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r12);
      const donation_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.downloadPdf(donation_r13));
    });
    \u0275\u0275text(36, "PDF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 77);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_div_96_div_1_div_15_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r12);
      const donation_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.downloadDocx(donation_r13));
    });
    \u0275\u0275text(38, "Word");
    \u0275\u0275elementEnd();
    \u0275\u0275template(39, DonorCardComponent_div_3_div_96_div_1_div_15_button_39_Template, 2, 0, "button", 78)(40, DonorCardComponent_div_3_div_96_div_1_div_15_button_40_Template, 2, 0, "button", 79);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r15 = \u0275\u0275nextContext();
    const donation_r13 = ctx_r15.$implicit;
    const i_r11 = ctx_r15.index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("id", "donation-panel-" + i_r11);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 11, donation_r13.amount));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 13, donation_r13.donationDate, "mediumDate"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(donation_r13.paymentMethod);
    \u0275\u0275advance(4);
    \u0275\u0275classMap(donation_r13.donationType === "Annual" ? "badge-violet" : "badge-cyan");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", donation_r13.donationType === "Annual" ? "Annual" : "One Time", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(donation_r13.receiptNumber || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(donation_r13.notes || "No notes");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
  }
}
function DonorCardComponent_div_3_div_96_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "button", 55);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_div_96_div_1_Template_button_click_1_listener() {
      const i_r11 = \u0275\u0275restoreView(_r10).index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleDonation(i_r11));
    });
    \u0275\u0275elementStart(2, "div", 69)(3, "span", 70);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 58);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 71);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 72);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 59);
    \u0275\u0275element(14, "path", 60);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, DonorCardComponent_div_3_div_96_div_1_div_15_Template, 41, 16, "div", 73);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const donation_r13 = ctx.$implicit;
    const i_r11 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r1.expandedDonations.has(i_r11))("aria-controls", "donation-panel-" + i_r11);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 11, donation_r13.amount));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 13, donation_r13.donationDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(donation_r13.paymentMethod);
    \u0275\u0275advance();
    \u0275\u0275classMap(donation_r13.donationType === "Annual" ? "badge-violet" : "badge-cyan");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", donation_r13.donationType === "Annual" ? "Annual" : "One Time", " ");
    \u0275\u0275advance();
    \u0275\u0275styleProp("transform", ctx_r1.expandedDonations.has(i_r11) ? "rotate(180deg)" : "rotate(0)");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.expandedDonations.has(i_r11));
  }
}
function DonorCardComponent_div_3_div_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275template(1, DonorCardComponent_div_3_div_96_div_1_Template, 16, 16, "div", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.donor.donations);
  }
}
function DonorCardComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "button", 20);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 21);
    \u0275\u0275element(4, "path", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Back to Donors ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, DonorCardComponent_div_3_div_6_Template, 5, 0, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 24)(8, "h2", 25);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 26)(11, "div")(12, "span", 27);
    \u0275\u0275text(13, "First Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 28);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "span", 27);
    \u0275\u0275text(18, "Last Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 28);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div")(22, "span", 27);
    \u0275\u0275text(23, "Spouse / Partner");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 28);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div")(27, "span", 27);
    \u0275\u0275text(28, "Birthdate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 28);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div")(33, "span", 27);
    \u0275\u0275text(34, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 28);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div")(38, "span", 27);
    \u0275\u0275text(39, "Cell Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span", 28);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div")(43, "span", 27);
    \u0275\u0275text(44, "Home Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 28);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div")(48, "span", 27);
    \u0275\u0275text(49, "Work Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span", 28);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div")(53, "span", 27);
    \u0275\u0275text(54, "Country / City");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "span", 28);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 29)(58, "span", 27);
    \u0275\u0275text(59, "Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "span", 28);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div")(63, "span", 27);
    \u0275\u0275text(64, "Zip Code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "span", 28);
    \u0275\u0275text(66);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div")(68, "span", 27);
    \u0275\u0275text(69, "Family Status");
    \u0275\u0275elementEnd();
    \u0275\u0275template(70, DonorCardComponent_div_3_span_70_Template, 2, 3, "span", 30)(71, DonorCardComponent_div_3_span_71_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "div")(73, "span", 27);
    \u0275\u0275text(74, "Number of Kids");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "span", 28);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(77, DonorCardComponent_div_3_div_77_Template, 5, 1, "div", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 33)(79, "div", 34)(80, "h3", 35);
    \u0275\u0275text(81, " Events ");
    \u0275\u0275elementStart(82, "span", 36);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(84, DonorCardComponent_div_3_button_84_Template, 2, 0, "button", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275template(85, DonorCardComponent_div_3_div_85_Template, 5, 0, "div", 38)(86, DonorCardComponent_div_3_div_86_Template, 2, 1, "div", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "div", 40)(88, "div", 34)(89, "h3", 35);
    \u0275\u0275text(90, " Donation History ");
    \u0275\u0275elementStart(91, "span", 36);
    \u0275\u0275text(92);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(93, "button", 41);
    \u0275\u0275listener("click", function DonorCardComponent_div_3_Template_button_click_93_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAddDonationForm());
    });
    \u0275\u0275text(94, " + Add Donation ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(95, DonorCardComponent_div_3_div_95_Template, 5, 0, "div", 38)(96, DonorCardComponent_div_3_div_96_Template, 2, 1, "div", 39);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.donor.fullName);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.donor.firstName || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.donor.lastName || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.donor.spouseName || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.donor.birthdate ? \u0275\u0275pipeBind2(31, 24, ctx_r1.donor.birthdate, "mediumDate") : "N/A");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.donor.email);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.donor.phoneNumber);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.donor.homePhone || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.donor.workPhone || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getLocation());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.donor.fullAddress || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.donor.zipCode || "N/A");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.donor.familyStatus);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.donor.familyStatus);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.donor.numberOfKids);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.donor.generalNotes);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("(", (ctx_r1.donor.events == null ? null : ctx_r1.donor.events.length) || 0, ")");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.donor.events || ctx_r1.donor.events.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.donor.events && ctx_r1.donor.events.length > 0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("(", ctx_r1.donor.donations.length, ")");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r1.donor.donations || ctx_r1.donor.donations.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.donor.donations && ctx_r1.donor.donations.length > 0);
  }
}
var DonorCardComponent = class _DonorCardComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.donorService = inject(DonorService);
    this.donationService = inject(DonationService);
    this.eventService = inject(EventService);
    this.receiptService = inject(ReceiptService);
    this.authService = inject(AuthService);
    this.notificationService = inject(NotificationService);
    this.donor = null;
    this.loading = true;
    this.error = null;
    this.isAdmin = false;
    this.expandedDonations = /* @__PURE__ */ new Set();
    this.expandedEvents = /* @__PURE__ */ new Set();
    this.showDeleteConfirm = false;
    this.showEditFormModal = false;
    this.showDonationDeleteConfirm = false;
    this.donationToDelete = null;
    this.showDonationEditForm = false;
    this.donationToEdit = null;
    this.showEventDeleteConfirm = false;
    this.eventToDelete = null;
    this.showEventEditForm = false;
    this.eventToEdit = null;
  }
  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.loadDonor(id);
    } else {
      this.error = "No donor ID provided.";
      this.loading = false;
    }
  }
  goBack() {
    this.router.navigate(["/donors"]);
  }
  getLocation() {
    const parts = [this.donor?.city, this.donor?.country].filter(Boolean);
    return parts.length ? parts.join(", ") : "N/A";
  }
  getEventTypeLabel(type) {
    return EVENT_TYPE_LABELS[type] ?? type;
  }
  // --- Donor ---
  showDeleteDialog() {
    this.showDeleteConfirm = true;
  }
  onDeleteCancelled() {
    this.showDeleteConfirm = false;
  }
  onDeleteConfirmed() {
    if (!this.donor)
      return;
    this.donorService.delete(this.donor.id).subscribe({
      next: () => {
        this.showDeleteConfirm = false;
        this.notificationService.success("Donor deleted.");
        this.router.navigate(["/donors"]);
      },
      error: () => {
        this.showDeleteConfirm = false;
        this.notificationService.error("Failed to delete donor.");
      }
    });
  }
  showEditForm() {
    this.showEditFormModal = true;
  }
  onEditFormClosed() {
    this.showEditFormModal = false;
  }
  onDonorSaved() {
    this.showEditFormModal = false;
    if (this.donor)
      this.loadDonor(this.donor.id);
  }
  // --- Donations ---
  toggleDonation(i) {
    this.expandedDonations.has(i) ? this.expandedDonations.delete(i) : this.expandedDonations.add(i);
  }
  showAddDonationForm() {
    this.donationToEdit = null;
    this.showDonationEditForm = true;
  }
  showEditDonation(d) {
    this.donationToEdit = d;
    this.showDonationEditForm = true;
  }
  onDonationEditClosed() {
    this.showDonationEditForm = false;
    this.donationToEdit = null;
  }
  onDonationSaved() {
    this.showDonationEditForm = false;
    this.donationToEdit = null;
    if (this.donor)
      this.loadDonor(this.donor.id);
  }
  showDeleteDonationDialog(d) {
    this.donationToDelete = d;
    this.showDonationDeleteConfirm = true;
  }
  onDonationDeleteCancelled() {
    this.showDonationDeleteConfirm = false;
    this.donationToDelete = null;
  }
  onDonationDeleteConfirmed() {
    if (!this.donationToDelete)
      return;
    this.donationService.delete(this.donationToDelete.id).subscribe({
      next: () => {
        this.showDonationDeleteConfirm = false;
        this.donationToDelete = null;
        this.notificationService.success("Donation deleted.");
        if (this.donor)
          this.loadDonor(this.donor.id);
      },
      error: () => {
        this.showDonationDeleteConfirm = false;
        this.donationToDelete = null;
        this.notificationService.error("Failed to delete donation.");
      }
    });
  }
  // --- Events ---
  toggleEvent(i) {
    this.expandedEvents.has(i) ? this.expandedEvents.delete(i) : this.expandedEvents.add(i);
  }
  showAddEventForm() {
    this.eventToEdit = null;
    this.showEventEditForm = true;
  }
  showEditEventForm(e) {
    this.eventToEdit = e;
    this.showEventEditForm = true;
  }
  onEventEditClosed() {
    this.showEventEditForm = false;
    this.eventToEdit = null;
  }
  onEventSaved() {
    this.showEventEditForm = false;
    this.eventToEdit = null;
    if (this.donor)
      this.loadDonor(this.donor.id);
  }
  showDeleteEventDialog(e) {
    this.eventToDelete = e;
    this.showEventDeleteConfirm = true;
  }
  onEventDeleteCancelled() {
    this.showEventDeleteConfirm = false;
    this.eventToDelete = null;
  }
  onEventDeleteConfirmed() {
    if (!this.eventToDelete)
      return;
    this.eventService.delete(this.eventToDelete.id).subscribe({
      next: () => {
        this.showEventDeleteConfirm = false;
        this.eventToDelete = null;
        this.notificationService.success("Event deleted.");
        if (this.donor)
          this.loadDonor(this.donor.id);
      },
      error: () => {
        this.showEventDeleteConfirm = false;
        this.eventToDelete = null;
        this.notificationService.error("Failed to delete event.");
      }
    });
  }
  // --- Receipts ---
  downloadPdf(donation) {
    this.receiptService.downloadPdf(donation.id).subscribe({
      next: (blob) => {
        this.triggerDownload(blob, `receipt-${donation.receiptNumber || donation.id}.pdf`);
        this.notificationService.success("PDF downloaded.");
      },
      error: () => {
        this.notificationService.error("Failed to generate PDF.");
      }
    });
  }
  downloadDocx(donation) {
    this.receiptService.downloadDocx(donation.id).subscribe({
      next: (blob) => {
        this.triggerDownload(blob, `receipt-${donation.receiptNumber || donation.id}.docx`);
        this.notificationService.success("Word receipt downloaded.");
      },
      error: () => {
        this.notificationService.error("Failed to generate Word receipt.");
      }
    });
  }
  triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  loadDonor(id) {
    this.loading = true;
    this.donorService.getById(id).subscribe({
      next: (donor) => {
        this.donor = donor;
        this.loading = false;
      },
      error: () => {
        this.error = "Could not load donor details.";
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function DonorCardComponent_Factory(t) {
      return new (t || _DonorCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DonorCardComponent, selectors: [["app-donor-card"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 14, consts: [[2, "max-width", "56rem", "margin", "0 auto"], ["style", "display:flex;justify-content:center;align-items:center;padding:4rem 0", 4, "ngIf"], ["style", "text-align:center;padding:4rem 0", 4, "ngIf"], ["style", "display:flex;flex-direction:column", 4, "ngIf"], ["title", "Delete Donor", "message", "Are you sure you want to delete this donor? This will also remove all associated records. This action cannot be undone.", "confirmText", "Delete", 3, "confirmed", "cancelled", "visible"], [3, "saved", "closed", "visible", "donor"], ["title", "Delete Donation", "message", "Are you sure you want to delete this donation? This action cannot be undone.", "confirmText", "Delete", 3, "confirmed", "cancelled", "visible"], [3, "saved", "closed", "visible", "donorId", "donation"], ["title", "Delete Event", "message", "Are you sure you want to delete this event? This action cannot be undone.", "confirmText", "Delete", 3, "confirmed", "cancelled", "visible"], [3, "saved", "closed", "visible", "donorId", "event"], [2, "display", "flex", "justify-content", "center", "align-items", "center", "padding", "4rem 0"], [1, "spinner"], [2, "text-align", "center", "padding", "4rem 0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "3rem", "height", "3rem", "color", "#f87171", "margin", "0 auto 0.75rem", "display", "block"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"], [2, "font-size", "1rem", "font-weight", "600", "color", "#e2e8f0", "margin", "0 0 0.375rem"], [2, "font-size", "0.875rem", "color", "#64748b", "margin", "0 0 1rem"], [2, "color", "#22d3ee", "font-weight", "600", "font-size", "0.875rem", "background", "none", "border", "none", "cursor", "pointer", 3, "click"], [2, "display", "flex", "flex-direction", "column"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "margin-bottom", "1.5rem"], [2, "display", "inline-flex", "align-items", "center", "gap", "0.5rem", "font-size", "0.875rem", "font-weight", "500", "color", "#94a3b8", "background", "none", "border", "none", "cursor", "pointer", "transition", "color 0.15s", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.25rem", "height", "1.25rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], ["style", "display:flex;gap:0.5rem", 4, "ngIf"], [1, "glass-card", 2, "padding", "1.5rem", "margin-bottom", "1.25rem"], [2, "font-size", "1.375rem", "font-weight", "800", "color", "#f1f5f9", "margin", "0 0 1.25rem"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "1.25rem"], [2, "display", "block", "font-size", "0.7rem", "font-weight", "600", "color", "#64748b", "letter-spacing", "0.05em", "text-transform", "uppercase"], [2, "display", "block", "margin-top", "0.25rem", "font-size", "0.875rem", "color", "#e2e8f0"], [2, "grid-column", "1/-1"], ["class", "badge", "style", "margin-top:0.25rem", 3, "class", 4, "ngIf"], ["style", "display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0", 4, "ngIf"], ["style", "grid-column:1/-1", 4, "ngIf"], [1, "glass-card", 2, "padding", "1.5rem", "order", "2"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "margin-bottom", "1rem"], [2, "font-size", "1.0625rem", "font-weight", "700", "color", "#f1f5f9", "margin", "0"], [2, "font-size", "0.875rem", "font-weight", "400", "color", "#64748b", "margin-left", "0.5rem"], ["style", "display:inline-flex;align-items:center;gap:0.375rem;padding:0.4rem 0.875rem;font-size:0.8125rem;font-weight:600;color:white;background:linear-gradient(135deg,#8b5cf6,#6366f1);border:none;border-radius:0.5rem;cursor:pointer;box-shadow:0 4px 12px rgba(139,92,246,0.3)", 3, "click", 4, "ngIf"], ["style", "text-align:center;padding:2rem 0", 4, "ngIf"], ["style", "display:flex;flex-direction:column;gap:0.5rem", 4, "ngIf"], [1, "glass-card", 2, "padding", "1.5rem", "margin-bottom", "1.25rem", "order", "1"], [2, "display", "inline-flex", "align-items", "center", "gap", "0.375rem", "padding", "0.4rem 0.875rem", "font-size", "0.8125rem", "font-weight", "600", "color", "white", "background", "linear-gradient(135deg,#10b981,#06b6d4)", "border", "none", "border-radius", "0.5rem", "cursor", "pointer", "box-shadow", "0 4px 12px rgba(16,185,129,0.3)", 3, "click"], [2, "display", "flex", "gap", "0.5rem"], [1, "btn-secondary", 3, "click"], [1, "btn-danger", 3, "click"], [1, "badge", 2, "margin-top", "0.25rem"], [2, "display", "block", "margin-top", "0.25rem", "font-size", "0.875rem", "color", "#e2e8f0", "white-space", "pre-wrap"], [2, "display", "inline-flex", "align-items", "center", "gap", "0.375rem", "padding", "0.4rem 0.875rem", "font-size", "0.8125rem", "font-weight", "600", "color", "white", "background", "linear-gradient(135deg,#8b5cf6,#6366f1)", "border", "none", "border-radius", "0.5rem", "cursor", "pointer", "box-shadow", "0 4px 12px rgba(139,92,246,0.3)", 3, "click"], [2, "text-align", "center", "padding", "2rem 0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "2.5rem", "height", "2.5rem", "color", "#334155", "margin", "0 auto 0.75rem", "display", "block"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"], [2, "font-size", "0.875rem", "color", "#475569", "margin", "0"], [2, "display", "flex", "flex-direction", "column", "gap", "0.5rem"], ["style", "border:1px solid rgba(100,116,139,0.2);border-radius:0.625rem;overflow:hidden", 4, "ngFor", "ngForOf"], [2, "border", "1px solid rgba(100,116,139,0.2)", "border-radius", "0.625rem", "overflow", "hidden"], [1, "accordion-header", 2, "width", "100%", "text-align", "left", "background", "none", "border", "none", 3, "click"], [2, "display", "flex", "align-items", "center", "gap", "1rem", "min-width", "0"], [1, "badge", "badge-violet"], [2, "font-size", "0.875rem", "color", "#94a3b8"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.25rem", "height", "1.25rem", "color", "#64748b", "flex-shrink", "0", "transition", "transform 0.2s"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 9l-7 7-7-7"], ["class", "accordion-body", 4, "ngIf"], [1, "accordion-body"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "0.75rem", "padding-top", "0.75rem"], ["style", "grid-column:1/-1;display:flex;gap:0.5rem;padding-top:0.5rem", 4, "ngIf"], [2, "grid-column", "1/-1", "display", "flex", "gap", "0.5rem", "padding-top", "0.5rem"], [1, "btn-ghost", 3, "click"], [1, "btn-ghost", 2, "color", "#f87171", "border-color", "rgba(239,68,68,0.3)", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [2, "display", "flex", "align-items", "center", "gap", "0.75rem", "min-width", "0"], [2, "font-weight", "700", "color", "#34d399", "white-space", "nowrap"], [1, "badge", "badge-slate"], [1, "badge"], ["class", "accordion-body", 3, "id", 4, "ngIf"], [1, "accordion-body", 3, "id"], [2, "grid-column", "1/-1", "display", "flex", "flex-wrap", "wrap", "gap", "0.5rem", "padding-top", "0.5rem"], [1, "btn-ghost", 2, "color", "#22d3ee", "border-color", "rgba(34,211,238,0.3)", 3, "click"], [1, "btn-ghost", 2, "color", "#34d399", "border-color", "rgba(52,211,153,0.3)", 3, "click"], ["class", "btn-ghost", 3, "click", 4, "ngIf"], ["class", "btn-ghost", "style", "color:#f87171;border-color:rgba(239,68,68,0.3)", 3, "click", 4, "ngIf"]], template: function DonorCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, DonorCardComponent_div_1_Template, 2, 0, "div", 1)(2, DonorCardComponent_div_2_Template, 9, 1, "div", 2)(3, DonorCardComponent_div_3_Template, 97, 27, "div", 3);
        \u0275\u0275elementStart(4, "app-confirm-dialog", 4);
        \u0275\u0275listener("confirmed", function DonorCardComponent_Template_app_confirm_dialog_confirmed_4_listener() {
          return ctx.onDeleteConfirmed();
        })("cancelled", function DonorCardComponent_Template_app_confirm_dialog_cancelled_4_listener() {
          return ctx.onDeleteCancelled();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "app-donor-form", 5);
        \u0275\u0275listener("saved", function DonorCardComponent_Template_app_donor_form_saved_5_listener() {
          return ctx.onDonorSaved();
        })("closed", function DonorCardComponent_Template_app_donor_form_closed_5_listener() {
          return ctx.onEditFormClosed();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "app-confirm-dialog", 6);
        \u0275\u0275listener("confirmed", function DonorCardComponent_Template_app_confirm_dialog_confirmed_6_listener() {
          return ctx.onDonationDeleteConfirmed();
        })("cancelled", function DonorCardComponent_Template_app_confirm_dialog_cancelled_6_listener() {
          return ctx.onDonationDeleteCancelled();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "app-donation-form", 7);
        \u0275\u0275listener("saved", function DonorCardComponent_Template_app_donation_form_saved_7_listener() {
          return ctx.onDonationSaved();
        })("closed", function DonorCardComponent_Template_app_donation_form_closed_7_listener() {
          return ctx.onDonationEditClosed();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "app-confirm-dialog", 8);
        \u0275\u0275listener("confirmed", function DonorCardComponent_Template_app_confirm_dialog_confirmed_8_listener() {
          return ctx.onEventDeleteConfirmed();
        })("cancelled", function DonorCardComponent_Template_app_confirm_dialog_cancelled_8_listener() {
          return ctx.onEventDeleteCancelled();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "app-event-form", 9);
        \u0275\u0275listener("saved", function DonorCardComponent_Template_app_event_form_saved_9_listener() {
          return ctx.onEventSaved();
        })("closed", function DonorCardComponent_Template_app_event_form_closed_9_listener() {
          return ctx.onEventEditClosed();
        });
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.donor && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("visible", ctx.showDeleteConfirm);
        \u0275\u0275advance();
        \u0275\u0275property("visible", ctx.showEditFormModal)("donor", ctx.donor);
        \u0275\u0275advance();
        \u0275\u0275property("visible", ctx.showDonationDeleteConfirm);
        \u0275\u0275advance();
        \u0275\u0275property("visible", ctx.showDonationEditForm)("donorId", (ctx.donor == null ? null : ctx.donor.id) || "")("donation", ctx.donationToEdit);
        \u0275\u0275advance();
        \u0275\u0275property("visible", ctx.showEventDeleteConfirm);
        \u0275\u0275advance();
        \u0275\u0275property("visible", ctx.showEventEditForm)("donorId", (ctx.donor == null ? null : ctx.donor.id) || "")("event", ctx.eventToEdit);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, CurrencyPipe, DatePipe, ConfirmDialogComponent, DonorFormComponent, DonationFormComponent, EventFormComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DonorCardComponent, { className: "DonorCardComponent", filePath: "src\\app\\features\\donors\\donor-card\\donor-card.component.ts", lineNumber: 334 });
})();
export {
  DonorCardComponent
};
//# sourceMappingURL=chunk-YT7OACPR.js.map
