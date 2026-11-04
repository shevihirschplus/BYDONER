import {
  CommonModule,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-IBG4PQOV.js";

// src/app/features/donations/donation-list/donation-list.component.ts
var DonationListComponent = class _DonationListComponent {
  static {
    this.\u0275fac = function DonationListComponent_Factory(t) {
      return new (t || _DonationListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DonationListComponent, selectors: [["app-donation-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 5, vars: 0, consts: [[1, "p-6"], [1, "text-2xl", "font-bold", "text-gray-900", "mb-4"], [1, "text-gray-500"]], template: function DonationListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
        \u0275\u0275text(2, "Donations");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "p", 2);
        \u0275\u0275text(4, "Donation list component - to be implemented");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [CommonModule], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DonationListComponent, { className: "DonationListComponent", filePath: "src\\app\\features\\donations\\donation-list\\donation-list.component.ts", lineNumber: 15 });
})();
export {
  DonationListComponent
};
//# sourceMappingURL=chunk-65NC3SD5.js.map
