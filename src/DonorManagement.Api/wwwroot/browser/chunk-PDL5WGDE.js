import {
  DonorFormComponent,
  DonorService,
  FamilyStatus
} from "./chunk-DTUZFA5M.js";
import {
  NotificationService
} from "./chunk-UFM4NYX4.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-QH27FNRJ.js";
import {
  AuthService,
  Router
} from "./chunk-A626HJ2P.js";
import "./chunk-66BI7DE2.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  Subject,
  __spreadProps,
  __spreadValues,
  debounceTime,
  distinctUntilChanged,
  inject,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-IBG4PQOV.js";

// src/app/features/donors/donor-list/donor-list.component.ts
function DonorListComponent_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r0.totalCount, " total");
  }
}
function DonorListComponent_div_6_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 45);
  }
}
function DonorListComponent_div_6__svg_svg_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 43);
    \u0275\u0275element(1, "path", 46);
    \u0275\u0275elementEnd();
  }
}
function DonorListComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "input", 38, 0);
    \u0275\u0275listener("change", function DonorListComponent_div_6_Template_input_change_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onExcelSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 39);
    \u0275\u0275listener("click", function DonorListComponent_div_6_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const excelInput_r3 = \u0275\u0275reference(2);
      return \u0275\u0275resetView(excelInput_r3.click());
    });
    \u0275\u0275template(4, DonorListComponent_div_6_span_4_Template, 1, 0, "span", 40)(5, DonorListComponent_div_6__svg_svg_5_Template, 2, 0, "svg", 41);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 42);
    \u0275\u0275listener("click", function DonorListComponent_div_6_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showAddDonorForm());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 43);
    \u0275\u0275element(9, "path", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Add Donor ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.uploading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.uploading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.uploading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.uploading ? "Uploading\u2026" : "Upload Excel", " ");
  }
}
function DonorListComponent_option_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r4 = ctx.$implicit;
    \u0275\u0275property("ngValue", status_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(status_r4);
  }
}
function DonorListComponent_div_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275element(1, "div", 48);
    \u0275\u0275elementEnd();
  }
}
function DonorListComponent_div_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 51);
    \u0275\u0275element(3, "path", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h3", 53);
    \u0275\u0275text(5, "No donors found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 54);
    \u0275\u0275text(7, "Try adjusting your search or filters.");
    \u0275\u0275elementEnd()();
  }
}
function DonorListComponent_div_50_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275listener("click", function DonorListComponent_div_50_div_1_Template_div_click_0_listener() {
      const donor_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onDonorClick(donor_r6));
    })("keydown.enter", function DonorListComponent_div_50_div_1_Template_div_keydown_enter_0_listener() {
      const donor_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onDonorClick(donor_r6));
    });
    \u0275\u0275elementStart(1, "div", 58)(2, "div", 59)(3, "span", 60);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "h3", 61);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 62);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 63);
    \u0275\u0275element(9, "path", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "span", 65);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 66);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 63);
    \u0275\u0275element(14, "path", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "span", 68);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "span", 69);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const donor_r6 = ctx.$implicit;
    \u0275\u0275attribute("aria-label", "View donor " + donor_r6.fullName);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(donor_r6.fullName.charAt(0).toUpperCase());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(donor_r6.fullName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(donor_r6.email);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(donor_r6.phoneNumber);
    \u0275\u0275advance();
    \u0275\u0275classMap(donor_r6.familyStatus === "Single" ? "badge-emerald" : donor_r6.familyStatus === "Married" ? "badge-cyan" : donor_r6.familyStatus === "Divorced" ? "badge-amber" : "badge-slate");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", donor_r6.familyStatus, " ");
  }
}
function DonorListComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275template(1, DonorListComponent_div_50_div_1_Template, 19, 8, "div", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.donors);
  }
}
function DonorListComponent_div_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "p", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 24)(4, "button", 71);
    \u0275\u0275listener("click", function DonorListComponent_div_51_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.previousPage());
    });
    \u0275\u0275text(5, " \u2190 Prev ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 72);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 71);
    \u0275\u0275listener("click", function DonorListComponent_div_51_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.nextPage());
    });
    \u0275\u0275text(9, " Next \u2192 ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Showing ", ctx_r0.startItem, "\u2013", ctx_r0.endItem, " of ", ctx_r0.totalCount, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.currentPage <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r0.currentPage, " / ", ctx_r0.totalPages, " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.currentPage >= ctx_r0.totalPages);
  }
}
var DonorListComponent = class _DonorListComponent {
  constructor() {
    this.donorService = inject(DonorService);
    this.authService = inject(AuthService);
    this.notificationService = inject(NotificationService);
    this.router = inject(Router);
    this.destroy$ = new Subject();
    this.searchSubject$ = new Subject();
    this.donors = [];
    this.loading = false;
    this.searchQuery = "";
    this.filtersOpen = false;
    this.showDonorForm = false;
    this.isAdmin = false;
    this.uploading = false;
    this.currentPage = 1;
    this.pageSize = 20;
    this.totalCount = 0;
    this.filter = {};
    this.familyStatuses = Object.values(FamilyStatus);
  }
  get totalPages() {
    return Math.ceil(this.totalCount / this.pageSize);
  }
  get startItem() {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  get endItem() {
    return Math.min(this.currentPage * this.pageSize, this.totalCount);
  }
  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.searchSubject$.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((query) => {
      this.filter.query = query || void 0;
      this.currentPage = 1;
      this.loadDonors();
    });
    this.loadDonors();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSearchChange(query) {
    this.searchSubject$.next(query);
  }
  onFilterChange() {
    this.currentPage = 1;
    this.loadDonors();
  }
  clearFilters() {
    this.filter = {};
    this.searchQuery = "";
    this.currentPage = 1;
    this.loadDonors();
  }
  onDonorClick(donor) {
    this.router.navigate(["/donors", donor.id]);
  }
  showAddDonorForm() {
    this.showDonorForm = true;
  }
  onDonorCreated() {
    this.showDonorForm = false;
    this.loadDonors();
  }
  onExcelSelected(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.uploading = true;
    this.donorService.importExcel(file).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.uploading = false;
        input.value = "";
        const base = `Imported ${result.imported} of ${result.totalRows} donor(s).`;
        if (result.skipped > 0) {
          this.notificationService.success(`${base} ${result.skipped} row(s) skipped.`);
        } else {
          this.notificationService.success(base);
        }
        this.currentPage = 1;
        this.loadDonors();
      },
      error: (err) => {
        this.uploading = false;
        input.value = "";
        const msg = err?.error?.message || `Upload failed (${err.status}). Please try again.`;
        this.notificationService.error(msg);
      }
    });
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadDonors();
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadDonors();
    }
  }
  loadDonors() {
    this.loading = true;
    const searchFilter = __spreadProps(__spreadValues({}, this.filter), {
      page: this.currentPage,
      pageSize: this.pageSize
    });
    this.donorService.search(searchFilter).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.donors = result.items;
        this.totalCount = result.totalCount;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function DonorListComponent_Factory(t) {
      return new (t || _DonorListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DonorListComponent, selectors: [["app-donor-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 53, vars: 23, consts: [["excelInput", ""], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "margin-bottom", "1.5rem"], [2, "font-size", "1.75rem", "font-weight", "800", "color", "#f1f5f9", "margin", "0", "letter-spacing", "-0.02em"], ["style", "color:#64748b;font-size:0.875rem;margin:0.25rem 0 0", 4, "ngIf"], ["style", "display:flex;gap:0.625rem;align-items:center", 4, "ngIf"], [2, "display", "flex", "flex-direction", "column", "gap", "1.25rem"], [1, "search-wrap"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "search-icon", 2, "width", "1.125rem", "height", "1.125rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], ["type", "text", "placeholder", "Search by name, email, or phone...", "aria-label", "Search donors", 1, "dark-input", 2, "padding-left", "2.5rem", "padding-top", "0.625rem", "padding-bottom", "0.625rem", "font-size", "0.9375rem", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "gap", "1.25rem", "align-items", "flex-start"], [2, "width", "260px", "flex-shrink", "0"], ["aria-expanded", "filtersOpen", 1, "glass-card", 2, "width", "100%", "display", "flex", "align-items", "center", "justify-content", "space-between", "padding", "0.75rem 1rem", "border-radius", "0.625rem", "background", "none", "cursor", "pointer", "color", "#e2e8f0", "font-size", "0.875rem", "font-weight", "600", "margin-bottom", "0.5rem", 3, "click"], [2, "display", "flex", "align-items", "center", "gap", "0.5rem"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1rem", "height", "1rem", "color", "#22d3ee"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1rem", "height", "1rem", "transition", "transform 0.2s", "color", "#64748b"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 9l-7 7-7-7"], ["id", "filter-panel", 1, "glass-card", 2, "border-radius", "0.75rem", "padding", "1.25rem", "display", "flex", "flex-direction", "column", "gap", "1rem"], [2, "display", "block", "font-size", "0.75rem", "font-weight", "600", "color", "#64748b", "margin-bottom", "0.375rem", "letter-spacing", "0.05em", "text-transform", "uppercase"], [1, "dark-input", 2, "cursor", "pointer", 3, "ngModelChange", "ngModel"], [2, "background", "#1e293b", 3, "ngValue"], ["style", "background:#1e293b", 3, "ngValue", 4, "ngFor", "ngForOf"], ["type", "text", "placeholder", "City or country...", 1, "dark-input", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "gap", "0.5rem"], ["type", "number", "placeholder", "Min", 1, "dark-input", 2, "width", "50%", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "Max", 1, "dark-input", 2, "width", "50%", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "flex-direction", "column", "gap", "0.375rem"], ["type", "date", 1, "dark-input", 3, "ngModelChange", "ngModel"], [2, "width", "100%", "padding", "0.5rem", "font-size", "0.8125rem", "font-weight", "600", "color", "#22d3ee", "background", "rgba(34,211,238,0.06)", "border", "1px solid rgba(34,211,238,0.2)", "border-radius", "0.5rem", "cursor", "pointer", "transition", "background 0.15s", 3, "click"], [2, "flex", "1", "min-width", "0"], ["style", "display:flex;justify-content:center;align-items:center;padding:4rem 0", 4, "ngIf"], ["style", "text-align:center;padding:4rem 2rem", 4, "ngIf"], ["style", "display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:0.875rem", 4, "ngIf"], ["style", "display:flex;align-items:center;justify-content:space-between;margin-top:1.25rem;padding:0 0.25rem", 4, "ngIf"], [3, "saved", "closed", "visible", "donor"], [2, "color", "#64748b", "font-size", "0.875rem", "margin", "0.25rem 0 0"], [2, "display", "flex", "gap", "0.625rem", "align-items", "center"], ["type", "file", "accept", ".xlsx", 2, "display", "none", 3, "change"], [1, "btn-secondary", 2, "display", "flex", "align-items", "center", "gap", "0.375rem", 3, "click", "disabled"], ["style", "width:0.875rem;height:0.875rem;border:2px solid rgba(255,255,255,0.3);border-top-color:#22d3ee;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block", 4, "ngIf"], ["style", "width:1rem;height:1rem", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], [1, "btn-primary", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1rem", "height", "1rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [2, "width", "0.875rem", "height", "0.875rem", "border", "2px solid rgba(255,255,255,0.3)", "border-top-color", "#22d3ee", "border-radius", "50%", "animation", "spin 0.7s linear infinite", "display", "inline-block"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"], [2, "display", "flex", "justify-content", "center", "align-items", "center", "padding", "4rem 0"], [1, "spinner"], [2, "text-align", "center", "padding", "4rem 2rem"], [2, "width", "64px", "height", "64px", "border-radius", "50%", "background", "rgba(34,211,238,0.08)", "border", "1px solid rgba(34,211,238,0.15)", "display", "flex", "align-items", "center", "justify-content", "center", "margin", "0 auto 1rem"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "2rem", "height", "2rem", "color", "#334155"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"], [2, "font-size", "1rem", "font-weight", "600", "color", "#94a3b8", "margin", "0 0 0.375rem"], [2, "font-size", "0.875rem", "color", "#475569", "margin", "0"], [2, "display", "grid", "grid-template-columns", "repeat(auto-fill,minmax(260px,1fr))", "gap", "0.875rem"], ["class", "donor-card", "role", "button", "tabindex", "0", 3, "click", "keydown.enter", 4, "ngFor", "ngForOf"], ["role", "button", "tabindex", "0", 1, "donor-card", 3, "click", "keydown.enter"], [2, "display", "flex", "align-items", "center", "gap", "0.75rem", "margin-bottom", "0.875rem"], [2, "width", "42px", "height", "42px", "border-radius", "50%", "background", "linear-gradient(135deg,rgba(6,182,212,0.3),rgba(99,102,241,0.3))", "border", "1px solid rgba(34,211,238,0.2)", "display", "flex", "align-items", "center", "justify-content", "center", "flex-shrink", "0"], [2, "font-size", "1rem", "font-weight", "700", "color", "#22d3ee"], [2, "font-size", "0.9375rem", "font-weight", "700", "color", "#f1f5f9", "margin", "0", "white-space", "nowrap", "overflow", "hidden", "text-overflow", "ellipsis"], [2, "display", "flex", "align-items", "center", "gap", "0.5rem", "margin-bottom", "0.375rem"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "0.875rem", "height", "0.875rem", "color", "#475569", "flex-shrink", "0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"], [2, "font-size", "0.8125rem", "color", "#64748b", "white-space", "nowrap", "overflow", "hidden", "text-overflow", "ellipsis"], [2, "display", "flex", "align-items", "center", "gap", "0.5rem", "margin-bottom", "0.875rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"], [2, "font-size", "0.8125rem", "color", "#64748b"], [1, "badge"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "margin-top", "1.25rem", "padding", "0 0.25rem"], [1, "btn-secondary", 2, "padding", "0.4rem 0.875rem", "font-size", "0.8125rem", 3, "click", "disabled"], [2, "display", "flex", "align-items", "center", "padding", "0 0.625rem", "font-size", "0.8125rem", "color", "#64748b"]], template: function DonorListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div")(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Donors");
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, DonorListComponent_p_5_Template, 2, 1, "p", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, DonorListComponent_div_6_Template, 11, 4, "div", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5)(8, "div", 6);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 7);
        \u0275\u0275element(10, "path", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(11, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_11_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_11_listener($event) {
          return ctx.onSearchChange($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 10)(13, "aside", 11)(14, "button", 12);
        \u0275\u0275listener("click", function DonorListComponent_Template_button_click_14_listener() {
          return ctx.filtersOpen = !ctx.filtersOpen;
        });
        \u0275\u0275elementStart(15, "span", 13);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(16, "svg", 14);
        \u0275\u0275element(17, "path", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275text(18, " Filters ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "svg", 16);
        \u0275\u0275element(20, "path", 17);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(21, "div", 18)(22, "div")(23, "label", 19);
        \u0275\u0275text(24, "Family Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "select", 20);
        \u0275\u0275twoWayListener("ngModelChange", function DonorListComponent_Template_select_ngModelChange_25_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filter.familyStatus, $event) || (ctx.filter.familyStatus = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function DonorListComponent_Template_select_ngModelChange_25_listener() {
          return ctx.onFilterChange();
        });
        \u0275\u0275elementStart(26, "option", 21);
        \u0275\u0275text(27, "All");
        \u0275\u0275elementEnd();
        \u0275\u0275template(28, DonorListComponent_option_28_Template, 2, 2, "option", 22);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div")(30, "label", 19);
        \u0275\u0275text(31, "Location");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "input", 23);
        \u0275\u0275twoWayListener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_32_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filter.location, $event) || (ctx.filter.location = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_32_listener() {
          return ctx.onFilterChange();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "div")(34, "label", 19);
        \u0275\u0275text(35, "Donation Amount");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "div", 24)(37, "input", 25);
        \u0275\u0275twoWayListener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_37_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filter.minAmount, $event) || (ctx.filter.minAmount = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_37_listener() {
          return ctx.onFilterChange();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "input", 26);
        \u0275\u0275twoWayListener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_38_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filter.maxAmount, $event) || (ctx.filter.maxAmount = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_38_listener() {
          return ctx.onFilterChange();
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(39, "div")(40, "label", 19);
        \u0275\u0275text(41, "Date Range");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "div", 27)(43, "input", 28);
        \u0275\u0275twoWayListener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_43_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filter.fromDate, $event) || (ctx.filter.fromDate = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_43_listener() {
          return ctx.onFilterChange();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "input", 28);
        \u0275\u0275twoWayListener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_44_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filter.toDate, $event) || (ctx.filter.toDate = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function DonorListComponent_Template_input_ngModelChange_44_listener() {
          return ctx.onFilterChange();
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(45, "button", 29);
        \u0275\u0275listener("click", function DonorListComponent_Template_button_click_45_listener() {
          return ctx.clearFilters();
        });
        \u0275\u0275text(46, " Clear All Filters ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(47, "main", 30);
        \u0275\u0275template(48, DonorListComponent_div_48_Template, 2, 0, "div", 31)(49, DonorListComponent_div_49_Template, 8, 0, "div", 32)(50, DonorListComponent_div_50_Template, 2, 1, "div", 33)(51, DonorListComponent_div_51_Template, 10, 7, "div", 34);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(52, "app-donor-form", 35);
        \u0275\u0275listener("saved", function DonorListComponent_Template_app_donor_form_saved_52_listener() {
          return ctx.onDonorCreated();
        })("closed", function DonorListComponent_Template_app_donor_form_closed_52_listener() {
          return ctx.showDonorForm = false;
        });
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.totalCount > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isAdmin);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
        \u0275\u0275advance(3);
        \u0275\u0275styleProp("display", "flex");
        \u0275\u0275advance(5);
        \u0275\u0275styleProp("transform", ctx.filtersOpen ? "rotate(180deg)" : "rotate(0)");
        \u0275\u0275advance(2);
        \u0275\u0275styleProp("display", ctx.filtersOpen ? "flex" : "none");
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filter.familyStatus);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", void 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.familyStatuses);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filter.location);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.filter.minAmount);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.filter.maxAmount);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.filter.fromDate);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.filter.toDate);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.donors.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.donors.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.totalCount > 0);
        \u0275\u0275advance();
        \u0275\u0275property("visible", ctx.showDonorForm)("donor", null);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DonorFormComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DonorListComponent, { className: "DonorListComponent", filePath: "src\\app\\features\\donors\\donor-list\\donor-list.component.ts", lineNumber: 231 });
})();
export {
  DonorListComponent
};
//# sourceMappingURL=chunk-PDL5WGDE.js.map
