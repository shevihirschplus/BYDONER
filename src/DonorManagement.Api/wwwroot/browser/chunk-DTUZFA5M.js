import {
  NotificationService
} from "./chunk-UFM4NYX4.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MinValidator,
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
  HttpClient,
  HttpParams
} from "./chunk-66BI7DE2.js";
import {
  CommonModule,
  EventEmitter,
  NgForOf,
  NgIf,
  inject,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-IBG4PQOV.js";

// src/app/core/services/donor.service.ts
var DonorService = class _DonorService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = "/api/donors";
  }
  search(filter) {
    let params = new HttpParams();
    if (filter.query) {
      params = params.set("query", filter.query);
    }
    if (filter.familyStatus) {
      params = params.set("familyStatus", filter.familyStatus);
    }
    if (filter.location) {
      params = params.set("location", filter.location);
    }
    if (filter.minAmount != null) {
      params = params.set("minAmount", filter.minAmount.toString());
    }
    if (filter.maxAmount != null) {
      params = params.set("maxAmount", filter.maxAmount.toString());
    }
    if (filter.fromDate) {
      params = params.set("fromDate", filter.fromDate);
    }
    if (filter.toDate) {
      params = params.set("toDate", filter.toDate);
    }
    if (filter.page != null) {
      params = params.set("page", filter.page.toString());
    }
    if (filter.pageSize != null) {
      params = params.set("pageSize", filter.pageSize.toString());
    }
    return this.http.get(this.baseUrl, { params });
  }
  getById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  create(request) {
    return this.http.post(this.baseUrl, request);
  }
  update(id, request) {
    return this.http.put(`${this.baseUrl}/${id}`, request);
  }
  delete(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  importExcel(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.baseUrl}/import`, formData);
  }
  static {
    this.\u0275fac = function DonorService_Factory(t) {
      return new (t || _DonorService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DonorService, factory: _DonorService.\u0275fac, providedIn: "root" });
  }
};

// src/app/models/donor.model.ts
var FamilyStatus;
(function(FamilyStatus2) {
  FamilyStatus2["Single"] = "Single";
  FamilyStatus2["Married"] = "Married";
  FamilyStatus2["Divorced"] = "Divorced";
  FamilyStatus2["Widowed"] = "Widowed";
})(FamilyStatus || (FamilyStatus = {}));

// src/app/shared/data/countries-cities.ts
var COUNTRIES_CITIES = {
  "Afghanistan": ["Kabul", "Kandahar", "Herat", "Mazar-i-Sharif"],
  "Albania": ["Tirana", "Durr\xEBs", "Vlor\xEB", "Shkod\xEBr"],
  "Algeria": ["Algiers", "Oran", "Constantine", "Annaba"],
  "Argentina": ["Buenos Aires", "C\xF3rdoba", "Rosario", "Mendoza"],
  "Armenia": ["Yerevan", "Gyumri", "Vanadzor"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra"],
  "Austria": ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck"],
  "Azerbaijan": ["Baku", "Ganja", "Sumqayit"],
  "Bahrain": ["Manama", "Riffa", "Muharraq"],
  "Bangladesh": ["Dhaka", "Chittagong", "Khulna", "Rajshahi"],
  "Belarus": ["Minsk", "Gomel", "Mogilev", "Vitebsk"],
  "Belgium": ["Brussels", "Antwerp", "Ghent", "Bruges", "Li\xE8ge"],
  "Bolivia": ["La Paz", "Santa Cruz", "Cochabamba", "Sucre"],
  "Bosnia and Herzegovina": ["Sarajevo", "Banja Luka", "Tuzla", "Mostar"],
  "Brazil": ["S\xE3o Paulo", "Rio de Janeiro", "Bras\xEDlia", "Salvador", "Fortaleza"],
  "Bulgaria": ["Sofia", "Plovdiv", "Varna", "Burgas"],
  "Cambodia": ["Phnom Penh", "Siem Reap", "Battambang"],
  "Cameroon": ["Yaound\xE9", "Douala", "Bamenda"],
  "Canada": ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa", "Edmonton"],
  "Chile": ["Santiago", "Valpara\xEDso", "Concepci\xF3n"],
  "China": ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Hong Kong"],
  "Colombia": ["Bogot\xE1", "Medell\xEDn", "Cali", "Barranquilla"],
  "Costa Rica": ["San Jos\xE9", "Alajuela", "Cartago"],
  "Croatia": ["Zagreb", "Split", "Rijeka", "Dubrovnik"],
  "Cuba": ["Havana", "Santiago de Cuba", "Camag\xFCey"],
  "Cyprus": ["Nicosia", "Limassol", "Larnaca", "Paphos"],
  "Czech Republic": ["Prague", "Brno", "Ostrava", "Plze\u0148"],
  "Denmark": ["Copenhagen", "Aarhus", "Odense", "Aalborg"],
  "Dominican Republic": ["Santo Domingo", "Santiago", "San Pedro de Macor\xEDs"],
  "Ecuador": ["Quito", "Guayaquil", "Cuenca"],
  "Egypt": ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan"],
  "Estonia": ["Tallinn", "Tartu", "Narva"],
  "Ethiopia": ["Addis Ababa", "Dire Dawa", "Gondar"],
  "Finland": ["Helsinki", "Espoo", "Tampere", "Turku"],
  "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Strasbourg"],
  "Georgia": ["Tbilisi", "Batumi", "Kutaisi"],
  "Germany": ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart"],
  "Ghana": ["Accra", "Kumasi", "Tamale"],
  "Greece": ["Athens", "Thessaloniki", "Patras", "Heraklion"],
  "Guatemala": ["Guatemala City", "Quetzaltenango", "Escuintla"],
  "Honduras": ["Tegucigalpa", "San Pedro Sula"],
  "Hungary": ["Budapest", "Debrecen", "Szeged", "P\xE9cs"],
  "Iceland": ["Reykjavik", "Akureyri"],
  "India": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata"],
  "Indonesia": ["Jakarta", "Surabaya", "Bandung", "Bali"],
  "Iran": ["Tehran", "Isfahan", "Mashhad", "Tabriz", "Shiraz"],
  "Iraq": ["Baghdad", "Basra", "Erbil", "Mosul"],
  "Ireland": ["Dublin", "Cork", "Galway", "Limerick"],
  "Israel": ["Jerusalem", "Tel Aviv", "Haifa", "Beer Sheva", "Bnei Brak", "Ashdod"],
  "Italy": ["Rome", "Milan", "Naples", "Turin", "Florence", "Venice"],
  "Jamaica": ["Kingston", "Montego Bay", "Spanish Town"],
  "Japan": ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya", "Sapporo"],
  "Jordan": ["Amman", "Zarqa", "Irbid", "Aqaba"],
  "Kazakhstan": ["Astana", "Almaty", "Shymkent"],
  "Kenya": ["Nairobi", "Mombasa", "Kisumu"],
  "Kuwait": ["Kuwait City", "Hawalli", "Salmiya"],
  "Latvia": ["Riga", "Daugavpils", "Liep\u0101ja"],
  "Lebanon": ["Beirut", "Tripoli", "Sidon", "Byblos"],
  "Libya": ["Tripoli", "Benghazi", "Misrata"],
  "Lithuania": ["Vilnius", "Kaunas", "Klaip\u0117da"],
  "Luxembourg": ["Luxembourg City", "Esch-sur-Alzette"],
  "Malaysia": ["Kuala Lumpur", "George Town", "Johor Bahru", "Malacca"],
  "Malta": ["Valletta", "Sliema", "St. Julian's"],
  "Mexico": ["Mexico City", "Guadalajara", "Monterrey", "Canc\xFAn", "Puebla"],
  "Moldova": ["Chi\u0219in\u0103u", "B\u0103l\u021Bi", "Tiraspol"],
  "Mongolia": ["Ulaanbaatar", "Erdenet", "Darkhan"],
  "Montenegro": ["Podgorica", "Nik\u0161i\u0107", "Budva"],
  "Morocco": ["Casablanca", "Rabat", "Marrakech", "Fez", "Tangier"],
  "Nepal": ["Kathmandu", "Pokhara", "Lalitpur"],
  "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
  "New Zealand": ["Auckland", "Wellington", "Christchurch", "Hamilton"],
  "Nigeria": ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"],
  "North Macedonia": ["Skopje", "Bitola", "Ohrid"],
  "Norway": ["Oslo", "Bergen", "Trondheim", "Stavanger"],
  "Oman": ["Muscat", "Salalah", "Sohar"],
  "Pakistan": ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"],
  "Palestine": ["Ramallah", "Gaza", "Nablus", "Hebron", "Bethlehem"],
  "Panama": ["Panama City", "Col\xF3n", "David"],
  "Paraguay": ["Asunci\xF3n", "Ciudad del Este", "Encarnaci\xF3n"],
  "Peru": ["Lima", "Arequipa", "Cusco", "Trujillo"],
  "Philippines": ["Manila", "Quezon City", "Cebu", "Davao"],
  "Poland": ["Warsaw", "Krak\xF3w", "Wroc\u0142aw", "Gda\u0144sk", "Pozna\u0144"],
  "Portugal": ["Lisbon", "Porto", "Braga", "Faro"],
  "Qatar": ["Doha", "Al Wakrah", "Al Khor"],
  "Romania": ["Bucharest", "Cluj-Napoca", "Timi\u0219oara", "Ia\u0219i"],
  "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
  "Senegal": ["Dakar", "Saint-Louis", "Thi\xE8s"],
  "Serbia": ["Belgrade", "Novi Sad", "Ni\u0161"],
  "Singapore": ["Singapore"],
  "Slovakia": ["Bratislava", "Ko\u0161ice", "Pre\u0161ov"],
  "Slovenia": ["Ljubljana", "Maribor", "Celje"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban", "Pretoria"],
  "South Korea": ["Seoul", "Busan", "Incheon", "Daegu"],
  "Spain": ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"],
  "Sri Lanka": ["Colombo", "Kandy", "Galle"],
  "Sudan": ["Khartoum", "Omdurman", "Port Sudan"],
  "Sweden": ["Stockholm", "Gothenburg", "Malm\xF6", "Uppsala"],
  "Switzerland": ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"],
  "Syria": ["Damascus", "Aleppo", "Homs", "Latakia"],
  "Taiwan": ["Taipei", "Kaohsiung", "Taichung", "Tainan"],
  "Tanzania": ["Dar es Salaam", "Dodoma", "Zanzibar"],
  "Thailand": ["Bangkok", "Chiang Mai", "Phuket", "Pattaya"],
  "Tunisia": ["Tunis", "Sfax", "Sousse"],
  "Turkey": ["Istanbul", "Ankara", "Izmir", "Antalya", "Bursa"],
  "Uganda": ["Kampala", "Entebbe", "Gulu"],
  "Ukraine": ["Kyiv", "Kharkiv", "Odesa", "Lviv", "Dnipro"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Edinburgh", "Liverpool", "Glasgow"],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "San Francisco", "Washington DC"],
  "Uruguay": ["Montevideo", "Salto", "Paysand\xFA"],
  "Uzbekistan": ["Tashkent", "Samarkand", "Bukhara"],
  "Venezuela": ["Caracas", "Maracaibo", "Valencia"],
  "Vietnam": ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hue"],
  "Yemen": ["Sana'a", "Aden", "Taiz"],
  "Zambia": ["Lusaka", "Kitwe", "Ndola"],
  "Zimbabwe": ["Harare", "Bulawayo", "Mutare"]
};

// src/app/features/donors/donor-form/donor-form.component.ts
function DonorFormComponent_div_0_p_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1, "Full name is required.");
    \u0275\u0275elementEnd();
  }
}
function DonorFormComponent_div_0_option_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    \u0275\u0275property("value", s_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r3);
  }
}
function DonorFormComponent_div_0_p_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1, "Must be 0 or greater.");
    \u0275\u0275elementEnd();
  }
}
function DonorFormComponent_div_0_p_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1, "Please enter a valid email address.");
    \u0275\u0275elementEnd();
  }
}
function DonorFormComponent_div_0_p_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1, "Invalid phone format.");
    \u0275\u0275elementEnd();
  }
}
function DonorFormComponent_div_0_p_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1, "Invalid phone format.");
    \u0275\u0275elementEnd();
  }
}
function DonorFormComponent_div_0_p_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1, "Invalid phone format.");
    \u0275\u0275elementEnd();
  }
}
function DonorFormComponent_div_0_option_106_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    \u0275\u0275property("value", c_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r4);
  }
}
function DonorFormComponent_div_0_option_113_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const city_r5 = ctx.$implicit;
    \u0275\u0275property("value", city_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(city_r5);
  }
}
function DonorFormComponent_div_0_span_129_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275element(1, "span", 58);
    \u0275\u0275text(2, " Saving... ");
    \u0275\u0275elementEnd();
  }
}
function DonorFormComponent_div_0_span_130_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.donor ? "Update Donor" : "Create Donor");
  }
}
function DonorFormComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275listener("click", function DonorFormComponent_div_0_Template_div_click_1_listener() {
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
    \u0275\u0275listener("click", function DonorFormComponent_div_0_Template_button_click_10_listener() {
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
    \u0275\u0275listener("ngSubmit", function DonorFormComponent_div_0_Template_form_ngSubmit_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(14, "fieldset", 14)(15, "legend", 15);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(16, "svg", 16);
    \u0275\u0275element(17, "path", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Personal Information ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(19, "div", 17)(20, "div", 18)(21, "label", 19);
    \u0275\u0275text(22, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 20);
    \u0275\u0275listener("input", function DonorFormComponent_div_0_Template_input_input_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNameChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div")(25, "label", 19);
    \u0275\u0275text(26, "First Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 21);
    \u0275\u0275listener("input", function DonorFormComponent_div_0_Template_input_input_27_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNameChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div")(29, "label", 19);
    \u0275\u0275text(30, "Last Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 22);
    \u0275\u0275listener("input", function DonorFormComponent_div_0_Template_input_input_31_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNameChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 18)(33, "label", 19);
    \u0275\u0275text(34, " Full Name ");
    \u0275\u0275elementStart(35, "span", 23);
    \u0275\u0275text(36, "*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 24);
    \u0275\u0275text(38, "\u2014 auto-filled, editable");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "input", 25);
    \u0275\u0275listener("input", function DonorFormComponent_div_0_Template_input_input_39_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFullNameInput());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(40, DonorFormComponent_div_0_p_40_Template, 2, 0, "p", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 18)(42, "label", 19);
    \u0275\u0275text(43, "Spouse / Partner Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(44, "input", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div")(46, "label", 19);
    \u0275\u0275text(47, "Birthdate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(48, "input", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div")(50, "label", 19);
    \u0275\u0275text(51, " Family Status ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "select", 29)(53, "option", 30);
    \u0275\u0275text(54, "Not specified");
    \u0275\u0275elementEnd();
    \u0275\u0275template(55, DonorFormComponent_div_0_option_55_Template, 2, 2, "option", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div")(57, "label", 19);
    \u0275\u0275text(58, " Number of Kids ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(59, "input", 32);
    \u0275\u0275template(60, DonorFormComponent_div_0_p_60_Template, 2, 0, "p", 26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(61, "hr", 33);
    \u0275\u0275elementStart(62, "fieldset", 14)(63, "legend", 34);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(64, "svg", 16);
    \u0275\u0275element(65, "path", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275text(66, " Contact Information ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(67, "div", 17)(68, "div", 18)(69, "label", 19);
    \u0275\u0275text(70, " Email ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(71, "input", 36);
    \u0275\u0275template(72, DonorFormComponent_div_0_p_72_Template, 2, 0, "p", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div")(74, "label", 19);
    \u0275\u0275text(75, " Cell Phone ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(76, "input", 37);
    \u0275\u0275template(77, DonorFormComponent_div_0_p_77_Template, 2, 0, "p", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "div")(79, "label", 19);
    \u0275\u0275text(80, "Home Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(81, "input", 38);
    \u0275\u0275template(82, DonorFormComponent_div_0_p_82_Template, 2, 0, "p", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "div")(84, "label", 19);
    \u0275\u0275text(85, "Work Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(86, "input", 39);
    \u0275\u0275template(87, DonorFormComponent_div_0_p_87_Template, 2, 0, "p", 26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(88, "hr", 33);
    \u0275\u0275elementStart(89, "fieldset", 14)(90, "legend", 40);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(91, "svg", 16);
    \u0275\u0275element(92, "path", 41)(93, "path", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275text(94, " Location ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(95, "div", 17)(96, "div", 18)(97, "label", 19);
    \u0275\u0275text(98, "Address");
    \u0275\u0275elementEnd();
    \u0275\u0275element(99, "input", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "div")(101, "label", 19);
    \u0275\u0275text(102, "Country");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "select", 44);
    \u0275\u0275listener("change", function DonorFormComponent_div_0_Template_select_change_103_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCountryChange());
    });
    \u0275\u0275elementStart(104, "option", 30);
    \u0275\u0275text(105, "Select country");
    \u0275\u0275elementEnd();
    \u0275\u0275template(106, DonorFormComponent_div_0_option_106_Template, 2, 2, "option", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(107, "div")(108, "label", 19);
    \u0275\u0275text(109, "City");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(110, "select", 45)(111, "option", 30);
    \u0275\u0275text(112);
    \u0275\u0275elementEnd();
    \u0275\u0275template(113, DonorFormComponent_div_0_option_113_Template, 2, 2, "option", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(114, "div")(115, "label", 19);
    \u0275\u0275text(116, "Zip Code");
    \u0275\u0275elementEnd();
    \u0275\u0275element(117, "input", 46);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(118, "fieldset", 14)(119, "legend", 47);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(120, "svg", 16);
    \u0275\u0275element(121, "path", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275text(122, " General Notes ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(123, "textarea", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275element(124, "hr", 33);
    \u0275\u0275elementStart(125, "div", 50)(126, "button", 51);
    \u0275\u0275listener("click", function DonorFormComponent_div_0_Template_button_click_126_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275text(127, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "button", 52);
    \u0275\u0275template(129, DonorFormComponent_div_0_span_129_Template, 3, 0, "span", 53)(130, DonorFormComponent_div_0_span_130_Template, 2, 1, "span", 54);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_13_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r1.donor ? "Edit Donor" : "Create Donor");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.donor ? "Edit Donor" : "New Donor");
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(26);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("fullName"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("fullName"));
    \u0275\u0275advance(13);
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.familyStatuses);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("numberOfKids"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("numberOfKids"));
    \u0275\u0275advance(11);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("email"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("email") && ((tmp_11_0 = ctx_r1.form.get("email")) == null ? null : tmp_11_0.errors == null ? null : tmp_11_0.errors["email"]));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("phoneNumber"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("phoneNumber") && ((tmp_13_0 = ctx_r1.form.get("phoneNumber")) == null ? null : tmp_13_0.errors == null ? null : tmp_13_0.errors["pattern"]));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("homePhone"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("homePhone"));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("workPhone"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("workPhone"));
    \u0275\u0275advance(17);
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.countries);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.cities.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.cities.length ? "Select city" : "Select a country first");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.cities);
    \u0275\u0275advance(15);
    \u0275\u0275property("disabled", ctx_r1.form.invalid || ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.submitting);
  }
}
var DonorFormComponent = class _DonorFormComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.donorService = inject(DonorService);
    this.notificationService = inject(NotificationService);
    this.visible = false;
    this.donor = null;
    this.saved = new EventEmitter();
    this.closed = new EventEmitter();
    this.submitting = false;
    this.fullNameManuallyEdited = false;
    this.familyStatuses = Object.values(FamilyStatus);
    this.countries = Object.keys(COUNTRIES_CITIES).sort();
    this.cities = [];
    this.form = this.fb.group({
      title: [null],
      firstName: [null],
      lastName: [null],
      fullName: ["", [Validators.required]],
      spouseName: [null],
      birthdate: [null],
      email: ["", [Validators.email]],
      phoneNumber: ["", [Validators.pattern(/^[0-9+\-() ]+$/)]],
      homePhone: [null, [Validators.pattern(/^[0-9+\-() ]+$/)]],
      workPhone: [null, [Validators.pattern(/^[0-9+\-() ]+$/)]],
      generalNotes: [null],
      country: [null],
      city: [null],
      zipCode: [null],
      fullAddress: [null],
      familyStatus: [null],
      numberOfKids: [null, [Validators.min(0)]]
    });
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
  onCountryChange() {
    const country = this.form.get("country")?.value;
    this.cities = country ? COUNTRIES_CITIES[country] || [] : [];
    this.form.patchValue({ city: null });
  }
  /** Auto-fill Full Name from First + Last unless the user has manually edited it. */
  onNameChange() {
    if (this.fullNameManuallyEdited) {
      return;
    }
    const title = (this.form.get("title")?.value || "").trim();
    const first = (this.form.get("firstName")?.value || "").trim();
    const last = (this.form.get("lastName")?.value || "").trim();
    const combined = [title, first, last].filter(Boolean).join(" ");
    this.form.get("fullName")?.setValue(combined, { emitEvent: false });
  }
  onFullNameInput() {
    const value = (this.form.get("fullName")?.value || "").trim();
    this.fullNameManuallyEdited = value.length > 0;
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
      fullName: formValue.fullName,
      title: formValue.title || null,
      firstName: formValue.firstName || null,
      lastName: formValue.lastName || null,
      spouseName: formValue.spouseName || null,
      birthdate: formValue.birthdate || null,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      homePhone: formValue.homePhone || null,
      cellPhone: formValue.phoneNumber || null,
      workPhone: formValue.workPhone || null,
      generalNotes: formValue.generalNotes || null,
      country: formValue.country || null,
      city: formValue.city || null,
      zipCode: formValue.zipCode || null,
      location: null,
      fullAddress: formValue.fullAddress || null,
      familyStatus: formValue.familyStatus || null,
      numberOfKids: Number(formValue.numberOfKids) || 0
    };
    const operation$ = this.donor ? this.donorService.update(this.donor.id, request) : this.donorService.create(request);
    operation$.subscribe({
      next: () => {
        this.submitting = false;
        this.notificationService.success(this.donor ? "Donor updated successfully." : "Donor created successfully.");
        this.saved.emit();
        this.closed.emit();
      },
      error: (err) => {
        this.submitting = false;
        const msg = err?.error?.error || err?.error?.errors ? "Validation failed: " + JSON.stringify(err.error.errors) : `Failed to save donor (${err.status}). Please try again.`;
        this.notificationService.error(msg);
      }
    });
  }
  resetForm() {
    if (this.donor) {
      this.cities = this.donor.country ? COUNTRIES_CITIES[this.donor.country] || [] : [];
      this.form.patchValue({
        title: this.donor.title,
        firstName: this.donor.firstName,
        lastName: this.donor.lastName,
        fullName: this.donor.fullName,
        spouseName: this.donor.spouseName,
        birthdate: this.donor.birthdate,
        email: this.donor.email,
        phoneNumber: this.donor.phoneNumber,
        homePhone: this.donor.homePhone,
        workPhone: this.donor.workPhone,
        generalNotes: this.donor.generalNotes,
        country: this.donor.country,
        city: this.donor.city,
        zipCode: this.donor.zipCode,
        fullAddress: this.donor.fullAddress,
        familyStatus: this.donor.familyStatus,
        numberOfKids: this.donor.numberOfKids
      });
      const auto = [this.donor.title || "", this.donor.firstName || "", this.donor.lastName || ""].map((s) => s.trim()).filter(Boolean).join(" ");
      this.fullNameManuallyEdited = (this.donor.fullName || "").trim() !== auto;
    } else {
      this.cities = [];
      this.form.reset({ numberOfKids: null, familyStatus: null, country: null, city: null, zipCode: null });
      this.fullNameManuallyEdited = false;
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.submitting = false;
  }
  static {
    this.\u0275fac = function DonorFormComponent_Factory(t) {
      return new (t || _DonorFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DonorFormComponent, selectors: [["app-donor-form"]], inputs: { visible: "visible", donor: "donor" }, outputs: { saved: "saved", closed: "closed" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["style", "position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center", "role", "dialog", "aria-modal", "true", 4, "ngIf"], ["role", "dialog", "aria-modal", "true", 2, "position", "fixed", "inset", "0", "z-index", "50", "display", "flex", "align-items", "center", "justify-content", "center"], [2, "position", "absolute", "inset", "0", "background", "rgba(0,0,0,0.7)", "backdrop-filter", "blur(4px)", 3, "click"], [2, "position", "relative", "width", "100%", "max-width", "680px", "margin", "1rem", "max-height", "90vh", "overflow-y", "auto", "background", "#0f172a", "border", "1px solid rgba(100,116,139,0.25)", "border-radius", "1rem", "box-shadow", "0 25px 60px rgba(0,0,0,0.6)"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "padding", "1.25rem 1.5rem", "border-bottom", "1px solid rgba(100,116,139,0.15)", "position", "sticky", "top", "0", "background", "#0f172a", "z-index", "1"], [2, "display", "flex", "align-items", "center", "gap", "0.75rem"], [2, "width", "36px", "height", "36px", "border-radius", "0.5rem", "background", "linear-gradient(135deg,rgba(6,182,212,0.2),rgba(99,102,241,0.2))", "border", "1px solid rgba(34,211,238,0.2)", "display", "flex", "align-items", "center", "justify-content", "center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.125rem", "height", "1.125rem", "color", "#22d3ee"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"], [2, "font-size", "1.0625rem", "font-weight", "700", "color", "#f1f5f9", "margin", "0"], ["aria-label", "Close", 2, "background", "none", "border", "none", "cursor", "pointer", "color", "#64748b", "padding", "0.25rem", "border-radius", "0.375rem", "display", "flex", "align-items", "center", "transition", "color 0.15s", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "1.25rem", "height", "1.25rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [2, "padding", "1.5rem", "display", "flex", "flex-direction", "column", "gap", "1.5rem", 3, "ngSubmit", "formGroup"], [2, "border", "none", "padding", "0", "margin", "0"], [2, "font-size", "0.7rem", "font-weight", "700", "color", "#22d3ee", "letter-spacing", "0.1em", "text-transform", "uppercase", "margin-bottom", "0.875rem", "display", "flex", "align-items", "center", "gap", "0.5rem"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 2, "width", "0.875rem", "height", "0.875rem"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "0.875rem"], [2, "grid-column", "1/-1"], [2, "display", "block", "font-size", "0.75rem", "font-weight", "600", "color", "#64748b", "margin-bottom", "0.375rem"], ["type", "text", "formControlName", "title", "placeholder", 'Honorific / title (e.g. \u05D4\u05E8"\u05E8)', 1, "dark-input", 3, "input"], ["type", "text", "formControlName", "firstName", "placeholder", "First name", 1, "dark-input", 3, "input"], ["type", "text", "formControlName", "lastName", "placeholder", "Last name", 1, "dark-input", 3, "input"], [2, "color", "#f87171"], [2, "font-weight", "400", "color", "#475569", "text-transform", "none", "letter-spacing", "0"], ["type", "text", "formControlName", "fullName", "placeholder", "Auto-filled from first + last name", 1, "dark-input", 3, "input"], ["style", "margin-top:0.3rem;font-size:0.75rem;color:#f87171", 4, "ngIf"], ["type", "text", "formControlName", "spouseName", "placeholder", "Spouse or partner name", 1, "dark-input"], ["type", "date", "formControlName", "birthdate", 1, "dark-input"], ["formControlName", "familyStatus", 1, "dark-input", 2, "cursor", "pointer"], [2, "background", "#1e293b", 3, "ngValue"], ["style", "background:#1e293b", 3, "value", 4, "ngFor", "ngForOf"], ["type", "number", "formControlName", "numberOfKids", "min", "0", "placeholder", "0", 1, "dark-input"], [2, "border", "none", "border-top", "1px solid rgba(100,116,139,0.15)", "margin", "0"], [2, "font-size", "0.7rem", "font-weight", "700", "color", "#34d399", "letter-spacing", "0.1em", "text-transform", "uppercase", "margin-bottom", "0.875rem", "display", "flex", "align-items", "center", "gap", "0.5rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"], ["type", "email", "formControlName", "email", "placeholder", "email@example.com", 1, "dark-input"], ["type", "tel", "formControlName", "phoneNumber", "placeholder", "+1 555 000 0000", 1, "dark-input"], ["type", "tel", "formControlName", "homePhone", "placeholder", "Home number", 1, "dark-input"], ["type", "tel", "formControlName", "workPhone", "placeholder", "Work number", 1, "dark-input"], [2, "font-size", "0.7rem", "font-weight", "700", "color", "#a78bfa", "letter-spacing", "0.1em", "text-transform", "uppercase", "margin-bottom", "0.875rem", "display", "flex", "align-items", "center", "gap", "0.5rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 11a3 3 0 11-6 0 3 3 0 016 0z"], ["type", "text", "formControlName", "fullAddress", "placeholder", "Street, building, apartment\u2026", 1, "dark-input"], ["formControlName", "country", 1, "dark-input", 2, "cursor", "pointer", 3, "change"], ["formControlName", "city", 1, "dark-input", 2, "cursor", "pointer", 3, "disabled"], ["type", "text", "formControlName", "zipCode", "placeholder", "Postal / ZIP code", 1, "dark-input"], [2, "font-size", "0.7rem", "font-weight", "700", "color", "#fbbf24", "letter-spacing", "0.1em", "text-transform", "uppercase", "margin-bottom", "0.875rem", "display", "flex", "align-items", "center", "gap", "0.5rem"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["formControlName", "generalNotes", "rows", "4", "placeholder", "Any general notes about this donor\u2026", 1, "dark-input", 2, "resize", "vertical", "min-height", "90px", "font-family", "inherit", "line-height", "1.5"], [2, "display", "flex", "justify-content", "flex-end", "gap", "0.75rem", "padding-top", "0.5rem", "border-top", "1px solid rgba(100,116,139,0.15)"], ["type", "button", 1, "btn-secondary", 3, "click"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["style", "display:flex;align-items:center;gap:0.375rem", 4, "ngIf"], [4, "ngIf"], [2, "margin-top", "0.3rem", "font-size", "0.75rem", "color", "#f87171"], [2, "background", "#1e293b", 3, "value"], [2, "display", "flex", "align-items", "center", "gap", "0.375rem"], [2, "width", "0.875rem", "height", "0.875rem", "border", "2px solid rgba(255,255,255,0.3)", "border-top-color", "white", "border-radius", "50%", "animation", "spin 0.7s linear infinite", "display", "inline-block"]], template: function DonorFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, DonorFormComponent_div_0_Template, 131, 32, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.visible);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DonorFormComponent, { className: "DonorFormComponent", filePath: "src\\app\\features\\donors\\donor-form\\donor-form.component.ts", lineNumber: 239 });
})();

export {
  DonorService,
  FamilyStatus,
  DonorFormComponent
};
//# sourceMappingURL=chunk-DTUZFA5M.js.map
