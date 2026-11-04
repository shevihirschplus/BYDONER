import {
  BehaviorSubject,
  ɵɵdefineInjectable
} from "./chunk-IBG4PQOV.js";

// src/app/core/services/notification.service.ts
var NotificationService = class _NotificationService {
  constructor() {
    this.notifications$ = new BehaviorSubject([]);
    this.nextId = 0;
  }
  get notifications() {
    return this.notifications$.asObservable();
  }
  success(message, duration = 3e3) {
    this.addNotification(message, "success", duration);
  }
  error(message, duration = 5e3) {
    this.addNotification(message, "error", duration);
  }
  info(message, duration = 3e3) {
    this.addNotification(message, "info", duration);
  }
  dismiss(id) {
    const current = this.notifications$.value;
    this.notifications$.next(current.filter((n) => n.id !== id));
  }
  addNotification(message, type, duration) {
    const id = this.nextId++;
    const notification = { id, message, type, duration };
    const current = this.notifications$.value;
    this.notifications$.next([...current, notification]);
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }
  static {
    this.\u0275fac = function NotificationService_Factory(t) {
      return new (t || _NotificationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
  }
};

export {
  NotificationService
};
//# sourceMappingURL=chunk-UFM4NYX4.js.map
