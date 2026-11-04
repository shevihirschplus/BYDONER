import {
  HttpClient
} from "./chunk-66BI7DE2.js";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  NgForOf,
  NgIf,
  forkJoin,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-IBG4PQOV.js";

// src/app/core/services/dashboard.service.ts
var DashboardService = class _DashboardService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = "/api/dashboard";
  }
  getSummary() {
    return this.http.get(`${this.baseUrl}/summary`);
  }
  getRecentDonations() {
    return this.http.get(`${this.baseUrl}/recent-donations`);
  }
  getTopDonors() {
    return this.http.get(`${this.baseUrl}/top-donors`);
  }
  getMonthlyStats() {
    return this.http.get(`${this.baseUrl}/monthly-stats`);
  }
  getUpcomingEvents() {
    return this.http.get(`${this.baseUrl}/upcoming-events`);
  }
  static {
    this.\u0275fac = function DashboardService_Factory(t) {
      return new (t || _DashboardService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/dashboard/dashboard.component.ts
function DashboardComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3);
    \u0275\u0275element(2, "div", 4);
    \u0275\u0275elementStart(3, "p", 5);
    \u0275\u0275text(4, "Loading dashboard...");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_div_1_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1, " No donations recorded yet. ");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_1_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "div")(2, "p", 52);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 53);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 54);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const donation_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 3, donation_r1.amount));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 5, donation_r1.donationDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatPaymentMethod(donation_r1.paymentMethod));
  }
}
function DashboardComponent_div_1_div_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1, " No donors found. ");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_1_div_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "div", 55)(2, "span", 56);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 57)(5, "p", 58);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 53);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "span", 59);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const donor_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", i_r4 + 1, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(donor_r3.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", donor_r3.donationCount, " donation", donor_r3.donationCount !== 1 ? "s" : "", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 5, donor_r3.totalAmount));
  }
}
function DashboardComponent_div_1_div_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 61);
    \u0275\u0275element(2, "path", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 62);
    \u0275\u0275text(4, "No upcoming events in the next 30 days.");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_1_div_70_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(event_r5.notes);
  }
}
function DashboardComponent_div_1_div_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "div", 55)(2, "span", 63);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 57)(5, "p", 58);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 53);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, DashboardComponent_div_1_div_70_p_10_Template, 2, 1, "p", 64);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "span", 65);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatEventType(event_r5.eventType));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(event_r5.donorName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 7, event_r5.eventDate, "mediumDate"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", event_r5.notes);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", event_r5.daysUntil <= 3 ? "#f87171" : event_r5.daysUntil <= 7 ? "#fb923c" : "#64748b");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", event_r5.daysUntil === 0 ? "Today" : event_r5.daysUntil === 1 ? "Tomorrow" : "In " + event_r5.daysUntil + " days", " ");
  }
}
function DashboardComponent_div_1_div_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275text(1, " No donation data for this year. ");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_1_div_79_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const stat_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(2, 1, stat_r6.total, "USD", "symbol", "1.0-0"), " ");
  }
}
function DashboardComponent_div_1_div_79_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const stat_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(2, 1, stat_r6.total, "USD", "symbol", "1.0-0"), " ");
  }
}
function DashboardComponent_div_1_div_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "span", 69);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 70)(4, "div", 71);
    \u0275\u0275template(5, DashboardComponent_div_1_div_79_span_5_Template, 3, 6, "span", 72);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, DashboardComponent_div_1_div_79_span_6_Template, 3, 6, "span", 73);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const stat_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getMonthName(stat_r6.month));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.getBarWidth(stat_r6.total), "%");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getBarWidth(stat_r6.total) > 15);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getBarWidth(stat_r6.total) <= 15);
  }
}
function DashboardComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "h1", 8);
    \u0275\u0275text(3, "Dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 9);
    \u0275\u0275text(5, "Overview");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 10)(7, "div", 11)(8, "div", 12)(9, "div")(10, "p", 13);
    \u0275\u0275text(11, "Total Donors");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 14);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 15);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 16);
    \u0275\u0275element(16, "path", 17);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(17, "div", 18)(18, "div", 12)(19, "div")(20, "p", 13);
    \u0275\u0275text(21, "Total Raised");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 19);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 20);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(26, "svg", 21);
    \u0275\u0275element(27, "path", 22);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(28, "div", 23)(29, "div", 12)(30, "div")(31, "p", 13);
    \u0275\u0275text(32, "Upcoming Events");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "p", 24);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(36, "svg", 26);
    \u0275\u0275element(37, "path", 27);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(38, "div", 28)(39, "div", 29)(40, "div", 30);
    \u0275\u0275element(41, "div", 31);
    \u0275\u0275elementStart(42, "h2", 32);
    \u0275\u0275text(43, "Recent Donations");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 33);
    \u0275\u0275template(45, DashboardComponent_div_1_div_45_Template, 2, 0, "div", 34);
    \u0275\u0275elementStart(46, "div", 35);
    \u0275\u0275template(47, DashboardComponent_div_1_div_47_Template, 10, 8, "div", 36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(48, "div", 29)(49, "div", 30);
    \u0275\u0275element(50, "div", 37);
    \u0275\u0275elementStart(51, "h2", 32);
    \u0275\u0275text(52, "Top Donors");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 33);
    \u0275\u0275template(54, DashboardComponent_div_1_div_54_Template, 2, 0, "div", 34);
    \u0275\u0275elementStart(55, "div", 35);
    \u0275\u0275template(56, DashboardComponent_div_1_div_56_Template, 12, 7, "div", 36);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(57, "div", 38)(58, "div", 39)(59, "div", 40);
    \u0275\u0275element(60, "div", 41);
    \u0275\u0275elementStart(61, "h2", 32);
    \u0275\u0275text(62, " Upcoming Events ");
    \u0275\u0275elementStart(63, "span", 42);
    \u0275\u0275text(64, "(next 30 days)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "span", 43);
    \u0275\u0275text(66);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 33);
    \u0275\u0275template(68, DashboardComponent_div_1_div_68_Template, 5, 0, "div", 44);
    \u0275\u0275elementStart(69, "div", 35);
    \u0275\u0275template(70, DashboardComponent_div_1_div_70_Template, 13, 10, "div", 36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(71, "div", 38)(72, "div", 30);
    \u0275\u0275element(73, "div", 45);
    \u0275\u0275elementStart(74, "h2", 32);
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 46);
    \u0275\u0275template(77, DashboardComponent_div_1_div_77_Template, 2, 0, "div", 47);
    \u0275\u0275elementStart(78, "div", 48);
    \u0275\u0275template(79, DashboardComponent_div_1_div_79_Template, 7, 5, "div", 49);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r1.summary == null ? null : ctx_r1.summary.totalDonors) !== null && tmp_1_0 !== void 0 ? tmp_1_0 : 0);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 14, (tmp_2_0 = ctx_r1.summary == null ? null : ctx_r1.summary.totalDonations) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : 0));
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.upcomingEvents.length);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", ctx_r1.recentDonations.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.recentDonations);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.topDonors.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.topDonors);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate2("", ctx_r1.upcomingEvents.length, " event", ctx_r1.upcomingEvents.length !== 1 ? "s" : "", "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.upcomingEvents.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.upcomingEvents);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Monthly Donations \u2014 ", ctx_r1.currentYear, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.monthlyStats.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.monthlyStats);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor() {
    this.dashboardService = inject(DashboardService);
    this.loading = true;
    this.summary = null;
    this.recentDonations = [];
    this.topDonors = [];
    this.monthlyStats = [];
    this.upcomingEvents = [];
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    this.maxMonthlyTotal = 0;
  }
  ngOnInit() {
    this.loadDashboardData();
  }
  loadDashboardData() {
    this.loading = true;
    forkJoin({
      summary: this.dashboardService.getSummary(),
      recentDonations: this.dashboardService.getRecentDonations(),
      topDonors: this.dashboardService.getTopDonors(),
      monthlyStats: this.dashboardService.getMonthlyStats(),
      upcomingEvents: this.dashboardService.getUpcomingEvents()
    }).subscribe({
      next: (data) => {
        this.summary = data.summary;
        this.recentDonations = data.recentDonations;
        this.topDonors = data.topDonors;
        this.monthlyStats = data.monthlyStats;
        this.upcomingEvents = data.upcomingEvents;
        this.maxMonthlyTotal = Math.max(...data.monthlyStats.map((s) => s.total), 0);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  getBarWidth(total) {
    if (this.maxMonthlyTotal === 0)
      return 0;
    return total / this.maxMonthlyTotal * 100;
  }
  getMonthName(month) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return months[month - 1] || "";
  }
  formatPaymentMethod(method) {
    switch (method) {
      case "CreditCard":
        return "Credit Card";
      case "BankTransfer":
        return "Bank Transfer";
      default:
        return method;
    }
  }
  formatEventType(type) {
    switch (type) {
      case "Birthday":
        return "Birthday";
      case "Yahrzeit":
        return "\u05D9\u05D5\u05E8\u05E6\u05D0\u05D9\u05D8";
      case "Wedding":
        return "Wedding";
      case "BarMitzva":
        return "Bar Mitzva";
      case "Dinner":
        return "Dinner";
      case "Visit":
        return "\u05D1\u05D9\u05E7\u05D5\u05E8 \u05D4\u05EA\u05E8\u05DE\u05D4";
      case "FollowUp":
        return "Follow Up";
      default:
        return type;
    }
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 2, consts: [["style", "display:flex;align-items:center;justify-content:center;min-height:400px", 4, "ngIf"], ["style", "display:flex;flex-direction:column;gap:1.5rem", 4, "ngIf"], [2, "display", "flex", "align-items", "center", "justify-content", "center", "min-height", "400px"], [2, "text-align", "center"], [1, "spinner", 2, "margin", "0 auto 1rem"], [2, "color", "#64748b", "font-size", "0.875rem"], [2, "display", "flex", "flex-direction", "column", "gap", "1.5rem"], [2, "display", "flex", "align-items", "baseline", "gap", "0.75rem"], [2, "font-size", "1.75rem", "font-weight", "800", "color", "#f1f5f9", "margin", "0", "letter-spacing", "-0.02em"], [2, "color", "#475569", "font-size", "0.875rem"], [2, "display", "grid", "grid-template-columns", "repeat(auto-fit,minmax(220px,1fr))", "gap", "1rem"], [1, "glass-card", "stat-card-cyan", "glow-cyan", 2, "padding", "1.5rem", "border-radius", "0.875rem"], [2, "display", "flex", "align-items", "flex-start", "justify-content", "space-between"], [2, "color", "#94a3b8", "font-size", "0.75rem", "font-weight", "600", "letter-spacing", "0.08em", "text-transform", "uppercase", "margin", "0 0 0.5rem"], [1, "animate-count", 2, "font-size", "2.5rem", "font-weight", "800", "color", "#22d3ee", "line-height", "1", "margin", "0"], [2, "width", "48px", "height", "48px", "border-radius", "0.75rem", "background", "rgba(34,211,238,0.15)", "display", "flex", "align-items", "center", "justify-content", "center", "flex-shrink", "0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.5rem", "height", "1.5rem", "color", "#22d3ee"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"], [1, "glass-card", "stat-card-emerald", "glow-emerald", 2, "padding", "1.5rem", "border-radius", "0.875rem"], [1, "animate-count", 2, "font-size", "2rem", "font-weight", "800", "color", "#34d399", "line-height", "1", "margin", "0"], [2, "width", "48px", "height", "48px", "border-radius", "0.75rem", "background", "rgba(52,211,153,0.15)", "display", "flex", "align-items", "center", "justify-content", "center", "flex-shrink", "0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.5rem", "height", "1.5rem", "color", "#34d399"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "glass-card", "stat-card-violet", "glow-violet", 2, "padding", "1.5rem", "border-radius", "0.875rem"], [1, "animate-count", 2, "font-size", "2.5rem", "font-weight", "800", "color", "#a78bfa", "line-height", "1", "margin", "0"], [2, "width", "48px", "height", "48px", "border-radius", "0.75rem", "background", "rgba(139,92,246,0.15)", "display", "flex", "align-items", "center", "justify-content", "center", "flex-shrink", "0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.5rem", "height", "1.5rem", "color", "#a78bfa"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "1.25rem"], [1, "glass-card", 2, "border-radius", "0.875rem", "overflow", "hidden", "min-width", "0"], [2, "padding", "1.25rem 1.5rem", "border-bottom", "1px solid rgba(100,116,139,0.15)", "display", "flex", "align-items", "center", "gap", "0.625rem"], [2, "width", "8px", "height", "8px", "border-radius", "50%", "background", "#22d3ee", "box-shadow", "0 0 8px #22d3ee"], [2, "font-size", "0.9375rem", "font-weight", "700", "color", "#f1f5f9", "margin", "0"], [2, "padding", "1rem 1.5rem"], ["style", "color:#475569;font-size:0.875rem;padding:1rem 0;text-align:center", 4, "ngIf"], [2, "display", "flex", "flex-direction", "column", "gap", "0.25rem"], ["class", "hover-row", "style", "display:flex;align-items:center;justify-content:space-between;padding:0.625rem 0.5rem", 4, "ngFor", "ngForOf"], [2, "width", "8px", "height", "8px", "border-radius", "50%", "background", "#34d399", "box-shadow", "0 0 8px #34d399"], [1, "glass-card", 2, "border-radius", "0.875rem", "overflow", "hidden"], [2, "padding", "1.25rem 1.5rem", "border-bottom", "1px solid rgba(100,116,139,0.15)", "display", "flex", "align-items", "center", "justify-content", "space-between"], [2, "display", "flex", "align-items", "center", "gap", "0.625rem"], [2, "width", "8px", "height", "8px", "border-radius", "50%", "background", "#a78bfa", "box-shadow", "0 0 8px #a78bfa"], [2, "font-size", "0.75rem", "font-weight", "400", "color", "#64748b", "margin-left", "0.375rem"], [1, "badge", "badge-violet"], ["style", "text-align:center;padding:2rem 0", 4, "ngIf"], [2, "width", "8px", "height", "8px", "border-radius", "50%", "background", "#818cf8", "box-shadow", "0 0 8px #818cf8"], [2, "padding", "1.25rem 1.5rem"], ["style", "color:#475569;font-size:0.875rem;text-align:center;padding:1rem 0", 4, "ngIf"], [2, "display", "flex", "flex-direction", "column", "gap", "0.75rem"], ["style", "display:flex;align-items:center;gap:0.875rem", 4, "ngFor", "ngForOf"], [2, "color", "#475569", "font-size", "0.875rem", "padding", "1rem 0", "text-align", "center"], [1, "hover-row", 2, "display", "flex", "align-items", "center", "justify-content", "space-between", "padding", "0.625rem 0.5rem"], [2, "font-size", "0.9375rem", "font-weight", "700", "color", "#22d3ee", "margin", "0"], [2, "font-size", "0.75rem", "color", "#64748b", "margin", "0.125rem 0 0"], [1, "badge", "badge-slate"], [2, "display", "flex", "align-items", "center", "gap", "0.75rem", "min-width", "0"], [2, "font-size", "0.75rem", "font-weight", "800", "color", "#475569", "width", "1.5rem", "flex-shrink", "0", "text-align", "center"], [2, "min-width", "0"], [2, "font-size", "0.875rem", "font-weight", "600", "color", "#e2e8f0", "margin", "0", "white-space", "nowrap", "overflow", "hidden", "text-overflow", "ellipsis"], [2, "font-size", "0.875rem", "font-weight", "700", "color", "#34d399", "flex-shrink", "0", "margin-left", "0.5rem"], [2, "text-align", "center", "padding", "2rem 0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "2.5rem", "height", "2.5rem", "color", "#334155", "margin", "0 auto 0.75rem", "display", "block"], [2, "font-size", "0.875rem", "color", "#475569", "margin", "0"], [1, "badge", "badge-violet", 2, "flex-shrink", "0"], ["style", "font-size:0.75rem;color:#94a3b8;margin:0.125rem 0 0;font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis", 4, "ngIf"], [2, "font-size", "0.75rem", "font-weight", "700", "flex-shrink", "0", "margin-left", "0.75rem", "white-space", "nowrap"], [2, "font-size", "0.75rem", "color", "#94a3b8", "margin", "0.125rem 0 0", "font-style", "italic", "white-space", "nowrap", "overflow", "hidden", "text-overflow", "ellipsis"], [2, "color", "#475569", "font-size", "0.875rem", "text-align", "center", "padding", "1rem 0"], [2, "display", "flex", "align-items", "center", "gap", "0.875rem"], [2, "font-size", "0.8rem", "color", "#64748b", "width", "2.5rem", "flex-shrink", "0", "font-weight", "500"], [2, "flex", "1", "background", "#1e293b", "border-radius", "9999px", "height", "1.625rem", "overflow", "hidden", "position", "relative"], [1, "bar-fill", 2, "background", "linear-gradient(90deg,#06b6d4,#6366f1)", "height", "100%", "border-radius", "9999px", "display", "flex", "align-items", "center", "justify-content", "flex-end", "padding-right", "0.625rem", "min-width", "2px"], ["style", "font-size:0.7rem;color:white;font-weight:700;white-space:nowrap", 4, "ngIf"], ["style", "font-size:0.75rem;color:#64748b;width:4rem;text-align:right;flex-shrink:0", 4, "ngIf"], [2, "font-size", "0.7rem", "color", "white", "font-weight", "700", "white-space", "nowrap"], [2, "font-size", "0.75rem", "color", "#64748b", "width", "4rem", "text-align", "right", "flex-shrink", "0"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, DashboardComponent_div_0_Template, 5, 0, "div", 0)(1, DashboardComponent_div_1_Template, 80, 16, "div", 1);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, CurrencyPipe, DatePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\features\\dashboard\\dashboard.component.ts", lineNumber: 208 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-OFGZ45SP.js.map
