const app = document.querySelector('#app');

const state = {
  role: 'commuter',
  screen: 'commuter-auth',
  toast: '',
  savedRoute: false,
  selectedRoute: 'mrt-lrt',
  favourites: ['mrt-lrt'],
  activeFilter: 'Best match',
  selectedAmount: 'RM20',
  toggles: { transfers: true, accessible: false, alerts: true },
  homePreferences: new Set(['Avoid crowded services', 'Lowest fare']),
};

const icons = {
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 18-6-6 6-6"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="6" cy="5" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8 5h4a4 4 0 0 1 0 8h-1a3 3 0 0 0 0 6h4"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2z"/><path d="M4 8h14a2 2 0 0 1 2 2v5h-5a2 2 0 0 1 0-4h5"/><circle cx="15" cy="13" r=".8" fill="currentColor"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3z"/><path d="M9 3v15M15 6v15"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 8a2 2 0 0 0 0 4v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a2 2 0 0 0 0-4V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2.4 2.4-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.1 1.6v.2h-3.4v-.2a1.8 1.8 0 0 0-1.1-1.6 1.8 1.8 0 0 0-2 .4l-.1.1-2.4-2.4.1-.1a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.6-1.1H4v-3.4h.2A1.8 1.8 0 0 0 5.8 9a1.8 1.8 0 0 0-.4-2l-.1-.1 2.4-2.4.1.1a1.8 1.8 0 0 0 2 .4A1.8 1.8 0 0 0 10.9 3v-.2h3.4V3A1.8 1.8 0 0 0 15.4 5a1.8 1.8 0 0 0 2-.4l.1-.1 2.4 2.4-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.6 1.1h.2v3.4h-.2a1.8 1.8 0 0 0-1.6 1.5z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  bus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="3" width="14" height="16" rx="3"/><path d="M5 11h14M8 7h8M8 19v2M16 19v2"/><circle cx="8" cy="15" r="1" fill="currentColor"/><circle cx="16" cy="15" r="1" fill="currentColor"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>',
  history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5M12 7v5l3 2"/></svg>',
  scan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4M7 12h10"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3 5 6v5c0 5 3.2 8.3 7 10 3.8-1.7 7-5 7-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M18 20a5 5 0 0 0-3-4.6"/></svg>',
  database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  megaphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 13h4l10 4V7L8 11H4zM8 13l1 6h3l-1-5"/></svg>',
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12 4 4L19 6"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 17l5-5-5-5M15 12H3M21 4v16a1 1 0 0 1-1 1h-7"/></svg>',
};

const i = (name) => icons[name] || '';
const time = () => '9:41';

function statusbar() {
  return `<div class="statusbar"><span>${time()}</span><span class="dynamic-island"></span><span class="status-icons"><span>▮▮▮</span><span>⌁</span><span>▰</span></span></div>`;
}

function header(title, backTo, right = '') {
  return `<header class="app-header">
    ${backTo ? `<button class="back-button" data-go="${backTo}" aria-label="Go back">${i('arrowLeft')}</button>` : '<span class="header-spacer"></span>'}
    <h1 class="app-title">${title}</h1>
    ${right || '<span class="header-spacer"></span>'}
  </header>`;
}

function bottomNav(active) {
  const nav = [
    ['home', 'Home', 'commuter-home'], ['route', 'Plan', 'commuter-route-plan'], ['wallet', 'Wallet', 'commuter-wallet'], ['user', 'Profile', 'commuter-profile'],
  ];
  return `<nav class="bottom-nav" aria-label="Primary navigation">${nav.map(([icon, label, target]) => `<button class="nav-item ${active === label.toLowerCase() ? 'is-active' : ''}" data-go="${target}">${i(icon)}<span>${label}</span></button>`).join('')}</nav>`;
}

function toast() {
  if (!state.toast) return '';
  return `<div class="toast">${i('check')}<span>${state.toast}</span><button data-action="dismiss-toast" aria-label="Dismiss">×</button></div>`;
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function formError() {
  return '<div class="form-error" role="alert" hidden></div>';
}

function field(label, type = 'text', placeholder = '', value = '', icon = '', options = {}) {
  const id = options.id || slug(label);
  const name = options.name || id;
  const minLength = options.minLength || (type === 'password' ? 8 : '');
  const match = options.match ? ` data-match="${options.match}"` : '';
  const toggle = options.toggle ? `<button class="password-toggle" type="button" data-toggle-password="${id}">Show</button>` : '';
  const controlClass = `${icon ? 'field-with-icon ' : ''}${options.toggle ? 'password-control' : ''}`.trim();
  return `<label class="form-field"><span class="field-label">${label}</span><span class="${controlClass}">${icon ? i(icon) : ''}<input id="${id}" name="${name}" class="text-input" type="${type}" placeholder="${placeholder}" value="${value}" data-label="${label}" data-validate required ${minLength ? `minlength="${minLength}"` : ''}${match} />${toggle}</span><span class="field-error"></span></label>`;
}

function selectField(label, options, config = {}) {
  const id = config.id || slug(label);
  return `<label class="form-field"><span class="field-label">${label}</span><span class="select-control"><select id="${id}" name="${config.name || id}" class="select-input" data-label="${label}" data-validate required>${options.map((option, index) => `<option value="${option}" ${index === 0 ? 'selected' : ''}>${option}</option>`).join('')}</select>${i('chevronDown')}</span><span class="field-error"></span></label>`;
}

function textareaField(label, placeholder, options = {}) {
  const id = options.id || slug(label);
  return `<label class="form-field"><span class="field-label">${label}</span><textarea id="${id}" name="${options.name || id}" class="textarea-input" placeholder="${placeholder}" data-label="${label}" data-validate required></textarea><span class="field-error"></span></label>`;
}

function logo(size = '') {
  return `<img class="logo-image ${size}" src="assets/unimove-logo.png" alt="UniMove logo" />`;
}

function listRow(icon, title, detail, value = '', tone = '') {
  return `<div class="favourite-row"><span class="row-icon ${tone}">${i(icon)}</span><div class="row-copy"><h3>${title}</h3><p>${detail}</p></div>${value ? `<div class="row-value">${value}</div>` : i('chevron')}</div>`;
}

function actionRow(icon, title, detail, target, tone = '') {
  return `<button class="favourite-row row-button" type="button" data-go="${target}"><span class="row-icon ${tone}">${i(icon)}</span><span class="row-copy"><h3>${title}</h3><p>${detail}</p></span>${i('chevron')}</button>`;
}

const routeOptions = {
  'mrt-lrt': { id: 'mrt-lrt', name: 'MRT + LRT', detail: 'MRT Kajang Line → Kelana Jaya Line', duration: '11:24 AM', fare: 'RM 4.80', transfers: '1', tag: 'Recommended', recommended: true, progress: 61, next: 'Pasar Seni', status: 'Minor delay near Pasar Seni', disruption: 'minor' },
  'brt-lrt': { id: 'brt-lrt', name: 'BRT + LRT', detail: 'BRT Sunway Line → Kelana Jaya Line', duration: '11:38 AM', fare: 'RM 3.60', transfers: '2', tag: 'Lowest fare', progress: 34, next: 'USJ 7', status: 'No disruption reported', disruption: 'none' },
  'bus-mrt': { id: 'bus-mrt', name: 'Bus + MRT', detail: 'Rapid KL Bus → MRT Kajang Line', duration: '11:31 AM', fare: 'RM 4.10', transfers: '1', tag: 'Less walking', progress: 78, next: 'Bukit Bintang', status: 'Crowded near Bukit Bintang', disruption: 'crowd' },
};

function selectedRoute() {
  return routeOptions[state.selectedRoute] || routeOptions['mrt-lrt'];
}

function routeCard(route) {
  return `<article class="route-card ${route.recommended ? 'is-recommended' : ''}">
    <div class="route-card-head"><div><h3>${route.name}</h3><p>${route.detail}</p></div><span class="tag ${route.recommended ? 'teal' : 'amber'}">${route.tag}</span></div>
    <div class="route-line"></div>
    <div class="route-meta"><div><span>Arrive by</span><strong>${route.duration}</strong></div><div><span>Fare</span><strong>${route.fare}</strong></div><div><span>Transfers</span><strong>${route.transfers}</strong></div></div>
    <div class="button-row"><button class="secondary-button" data-route="${route.id}" data-go="commuter-journey">View journey</button><button class="primary-button" data-route="${route.id}" data-go="commuter-save-favourite">Save favourite</button></div>
  </article>`;
}

function commuterAuth() {
  return `<div class="auth-layout">
    <div class="brand-lockup">${logo()}<h1>UniMove</h1><p>One app for every journey.</p></div>
    <form class="form-stack" data-form="commuter-login" novalidate>${formError()}${field('Email address', 'email', 'you@example.com', '', 'mail')}${field('Password', 'password', 'At least 8 characters', '', 'lock', { id: 'commuter-login-password', toggle: true })}<button class="link-button" type="button" data-go="commuter-reset">Forgot password?</button><button class="primary-button full-width" type="submit">Log in</button></form>
    <div class="auth-footer">New to UniMove? <button data-go="commuter-register">Create an account</button></div>
  </div>`;
}

function commuterRegister() {
  return `${header('Create account', 'commuter-auth')}<form class="form-stack" data-form="commuter-register" novalidate>${formError()}${field('Full name', 'text', 'Your name', '', 'user')}${field('Email address', 'email', 'you@example.com', '', 'mail')}${field('Phone number', 'tel', '+60 12 345 6789')}${field('Password', 'password', 'At least 8 characters', '', 'lock', { id: 'create-password', toggle: true })}${field('Confirm password', 'password', 'Re-enter your password', '', 'lock', { id: 'create-confirm-password', match: 'create-password', toggle: true })}<button class="primary-button full-width" type="submit">Create account</button></form>`;
}

function commuterReset() {
  return `${header('Reset password', 'commuter-auth')}<div class="route-hero"><h2>We’ll help you back in.</h2><p>Enter your email and choose a new password to update your UniMove account.</p></div><form class="form-stack" data-form="commuter-reset" novalidate>${formError()}${field('Email address', 'email', 'you@example.com', '', 'mail')}${field('New password', 'password', 'At least 8 characters', '', 'lock', { id: 'reset-password', toggle: true })}${field('Confirm new password', 'password', 'Re-enter new password', '', 'lock', { id: 'reset-confirm-password', match: 'reset-password', toggle: true })}<button class="primary-button full-width" type="submit">Update password</button></form>`;
}

function commuterHome() {
  const tiles = [
    ['route','Plan route','Fares & options','commuter-route-plan'], ['map','Live tracking','Vehicles nearby','commuter-live-map'], ['wallet','Wallet','RM 18.40','commuter-wallet'],
    ['star','Loyalty','1,240 points','commuter-loyalty'], ['bell','Notifications','3 new','commuter-notifications'], ['user','Profile','Preferences','commuter-profile'],
  ];
  return `<div class="home-topbar"><div class="brand-mini">${logo('logo-small')}<span>UniMove</span></div><div class="top-actions"><button class="icon-button" data-go="commuter-notifications" aria-label="Notifications">${i('bell')}</button><button class="icon-button" data-go="commuter-preferences" aria-label="Settings">${i('settings')}</button></div></div><div class="home-greeting"><p class="micro">Tuesday, 14 July</p><h1>Good morning, <span>Yi Hern.</span></h1></div>
    <section class="journey-card"><span class="card-eyebrow">NEXT JOURNEY</span><h2>Plan your next trip</h2><div class="journey-points"><b>${i('route')}</b><span>Compare multi-modal routes and live fares.</span></div></section>
    <h2 class="section-label">Explore UniMove</h2><section class="action-grid">${tiles.map(([icon,title,sub,target]) => `<button class="action-tile" data-go="${target}">${i(icon)}<span>${title}</span><span class="tile-sub">${sub}</span></button>`).join('')}</section>
    <section class="home-live-card"><span class="live-orb">${i('bus')}</span><div><h3>Live now · KJ5 is 2 minutes away</h3><p>Passenger crowd at Pasar Seni is moderate. Track the next arrival before you leave.</p></div></section><h2 class="section-label">Quick journey preferences</h2><div class="preference-choice-grid">${['Lowest fare','Fastest route','Avoid transfers','Avoid crowded services','Accessible route'].map(pref => `<button class="preference-choice ${state.homePreferences.has(pref) ? 'is-active' : ''}" data-preference="${pref}">${pref}</button>`).join('')}</div><button class="alert-strip" data-go="commuter-disruption">${i('info')}<span><strong>Service update</strong><br />Kelana Jaya Line has a minor delay.</span></button>`;
}

function commuterRoutePlan() {
  return `${header('Plan route', 'commuter-home', `<button class="icon-button" data-go="commuter-favourites" aria-label="Favourites">${i('star')}</button>`)}
  <section class="route-hero"><h2>Where are you going?</h2><p>Find the best route across Malaysia’s public transport network.</p></section>
  <form class="form-stack" data-form="route-plan" novalidate>${formError()}<div class="route-input-group">${field('Origin', 'text', 'Enter origin', 'Sunway University', '', { id: 'route-origin' })}${field('Destination', 'text', 'Enter destination', 'KL Sentral', '', { id: 'route-destination' })}</div><h2 class="section-label">Journey preferences</h2><div class="filter-row"><button class="filter-chip is-active" type="button" data-action="filter">Best route</button><button class="filter-chip" type="button" data-action="filter">Avoid transfers</button><button class="filter-chip" type="button" data-action="filter">Accessible</button></div><button class="primary-button full-width" style="margin-top:20px" type="submit">Find routes</button></form>`;
}

function commuterRouteResults() {
  const filters = ['Best match','Lowest fare','Fastest'];
  return `${header('Route options', 'commuter-route-plan')}<div class="filter-row">${filters.map(f => `<button class="filter-chip ${state.activeFilter === f ? 'is-active' : ''}" data-filter="${f}">${f}</button>`).join('')}</div>
    ${Object.values(routeOptions).map(routeCard).join('')}`;
}

function commuterSaveFavourite() {
  const route = selectedRoute();
  return `${header('Save favourite', 'commuter-route-results')}<section class="route-hero"><h2>Save this route?</h2><p>Keep this journey handy for the next time you travel to KL Sentral.</p></section><section class="route-summary"><h2>${route.name}</h2><p>${route.detail}</p><div class="route-meta"><div><span>Arrive by</span><strong>${route.duration}</strong></div><div><span>Fare</span><strong>${route.fare}</strong></div><div><span>Transfers</span><strong>${route.transfers}</strong></div></div></section><button class="primary-button full-width" style="margin-top:15px" data-action="save-route">Save to favourites</button>`;
}

function commuterFavourites() {
  const favouriteRows = state.favourites.map(id => { const route = routeOptions[id]; return listRow('route', `Sunway University → KL Sentral`, `${route.name} · ${route.fare}`, route.duration.replace(' AM', '')); }).join('');
  return `${header('Favourite routes', 'commuter-home')}<div class="list-card">${favouriteRows || '<div class="empty-state"><h2>No favourite routes yet</h2><p>Save a route from Route options to see it here.</p></div>'}</div><button class="primary-button full-width" style="margin-top:15px" data-go="commuter-route-plan">Plan a route</button>`;
}

function commuterLiveMap() {
  return `${header('Live tracking', 'commuter-home', `<button class="icon-button" data-go="commuter-countdown" aria-label="Arrival countdown">${i('clock')}</button>`)}
  <section class="map-panel"><div class="map-river"></div><div class="map-route"></div><span class="map-pin start"></span><span class="map-pin bus"></span><span class="map-pin end"></span><div class="map-float"><span class="row-icon">${i('bus')}</span><div><strong>KJ5 · Kelana Jaya Line</strong><span>1 min away · moving toward KL Sentral</span></div></div></section>
  <h2 class="section-label">Journey details</h2><div class="button-row"><button class="soft-button" data-go="commuter-journey">Journey progress</button><button class="soft-button" data-go="commuter-countdown">Arrival countdown</button></div><div class="button-row" style="margin-top:9px"><button class="soft-button" data-go="commuter-crowd">Station crowd</button><button class="soft-button" data-go="commuter-occupancy">Vehicle occupancy</button></div>`;
}

function commuterJourney() {
  const route = selectedRoute();
  const countdown = route.id === 'brt-lrt' ? '05:42' : route.id === 'bus-mrt' ? '01:26' : '02:18';
  return `${header('Journey progress', 'commuter-live-map')}<section class="progress-card"><h2>Sunway University → KL Sentral</h2><p>${route.detail} · ${route.transfers} transfer${route.transfers === '1' ? '' : 's'}</p><div class="progress-track" style="--progress:${route.progress}%"><i class="progress-dot"></i></div><div class="progress-stations"><span><strong>Sunway</strong>Departed</span><span style="text-align:center"><strong>${route.next}</strong>Next stop</span><span style="text-align:right"><strong>KL Sentral</strong>Destination</span></div></section><section class="countdown-card" style="margin-top:14px"><div class="small">NEXT ARRIVAL</div><div class="countdown">${countdown}</div><div class="arrival">${route.next} station · Platform 2</div></section><div class="button-row" style="margin-top:14px"><button class="secondary-button" data-go="commuter-disruption">Service status</button><button class="soft-button" data-go="commuter-notifications">Journey updates</button></div>`;
}

function commuterCountdown() {
  return `${header('Arrival countdown', 'commuter-live-map')}${selectField('Select station', ['Pasar Seni station', 'KL Sentral station', 'USJ 7 station'])}<section class="countdown-card" style="margin-top:15px"><div class="small">KELANA JAYA LINE · PLATFORM 2</div><div class="countdown">02:18</div><div class="arrival">Next service toward Gombak</div></section><div class="list-card" style="margin-top:14px">${listRow('bus','Following service','KJ4 · 8 minutes away','08:41 AM')}</div>`;
}

function commuterCrowd() {
  return `${header('Station crowd level', 'commuter-live-map')}${selectField('Select station', ['Pasar Seni station', 'KL Sentral station', 'USJ 7 station'])}<section class="crowd-gauge"><h2>Pasar Seni station</h2><div class="gauge-ring"><div><b>63%</b><span>crowd level</span></div></div><p class="gauge-note">Moderately busy</p></section><button class="secondary-button full-width" style="margin-top:14px" data-go="commuter-occupancy">View vehicle occupancy</button>`;
}

function commuterOccupancy() {
  return `${header('Vehicle occupancy', 'commuter-live-map')}${selectField('Select vehicle', ['KJ5 · Kelana Jaya Line', 'MRT 15 · Kajang Line', 'BRT 04 · Sunway Line'])}<section class="crowd-gauge"><h2>KJ5 · Car 3</h2><div class="gauge-ring" style="background:conic-gradient(var(--teal) 0 47%, #e1eeeb 47% 100%)"><div><b>47%</b><span>occupancy</span></div></div><p class="gauge-note" style="color:var(--teal-dark)">Seats likely available</p></section>`;
}

function commuterWallet() {
  return `${header('Wallet', 'commuter-home', `<button class="icon-button" data-go="commuter-transactions" aria-label="Transaction history">${i('history')}</button>`)}<section class="wallet-balance"><p>AVAILABLE BALANCE</p><h2>RM 18.40</h2><span class="last-topup">Last top up · 11 Jul 2026</span></section><section class="wallet-actions"><button class="wallet-action" data-go="commuter-topup">${i('plus')}Top up</button><button class="wallet-action" data-go="commuter-ticket">${i('ticket')}Generate QR</button><button class="wallet-action" data-go="commuter-transactions">${i('history')}History</button></section><h2 class="section-label">Recent activity</h2><div class="list-card">${listRow('ticket','Journey fare','Kelana Jaya Line','- RM 2.70','red')}${listRow('plus','Wallet top up','Online banking','+ RM 20.00','teal')}</div>`;
}

function commuterTopup() {
  const amounts = ['RM10','RM20','RM50','RM100','RM150','RM200'];
  return `${header('Top up wallet', 'commuter-wallet')}<form class="form-stack" data-form="topup" novalidate>${formError()}${field('Top-up amount', 'number', '0.00', '')}<div><span class="field-label">Quick select</span><div class="amount-grid">${amounts.map(a => `<button class="amount-button ${state.selectedAmount === a ? 'is-active' : ''}" type="button" data-amount="${a}">${a}</button>`).join('')}</div></div>${selectField('Payment method', ['Online banking', 'Credit / debit card', 'E-wallet'])}<button class="primary-button full-width" type="submit">Confirm top up</button></form>`;
}

function commuterTransactions() {
  return `${header('Transaction history', 'commuter-wallet')}<div class="filter-row"><button class="filter-chip is-active">All</button><button class="filter-chip">Top up</button><button class="filter-chip">Payment</button><button class="filter-chip">Refund</button></div><div class="list-card" style="margin-top:12px">${listRow('ticket','Journey fare','14 Jul 2026 · Kelana Jaya Line','- RM 2.70','red')}${listRow('plus','Wallet top up','11 Jul 2026 · Online banking','+ RM 20.00','teal')}${listRow('wallet','Refund processed','09 Jul 2026 · Route cancellation','+ RM 3.60','teal')}${listRow('ticket','Journey fare','08 Jul 2026 · MRT Kajang Line','- RM 4.80','red')}</div>`;
}

function qrSquares() {
  return Array.from({ length: 81 }, () => '<i></i>').join('');
}

function commuterTicket() {
  return `${header('QR e-ticket', 'commuter-wallet')}<section class="qr-card"><span class="tag teal">ACTIVE TICKET</span><div class="qr-code"><span class="qr-corner c1"></span><span class="qr-corner c2"></span><span class="qr-corner c3"></span>${qrSquares()}</div><h2 style="font-size:16px;margin:8px 0 0">KL Sentral journey</h2><p>Valid until 11:45 AM · Present at the station scanner.</p></section><div class="button-row" style="margin-top:14px"><button class="secondary-button" data-go="commuter-payment">Payment</button><button class="primary-button" data-go="commuter-scan">${i('scan')} Scan to board</button></div>`;
}

function commuterScan() {
  return `${header('Scan QR to board', 'commuter-ticket')}<section class="qr-card"><span class="tag teal">QR READY</span><div class="brand-mark" style="margin:23px auto 13px; width:74px; height:74px; border-radius:25px">${i('scan')}</div><h2 style="font-size:17px;margin:8px 0 0">Present your QR code</h2><p>Hold the active QR e-ticket to the station scanner to confirm boarding.</p></section><button class="primary-button full-width" style="margin-top:14px" data-action="scan" data-go="commuter-payment">Confirm boarding</button>`;
}

function commuterPayment() {
  return `${header('Make payment', 'commuter-wallet')}<section class="wallet-balance"><p>JOURNEY FARE</p><h2>RM 2.70</h2><span class="last-topup">Kelana Jaya Line · KL Sentral</span></section><div class="form-stack" style="margin-top:15px">${selectField('Payment method', ['UniMove Wallet · RM 18.40', 'Online banking', 'Credit / debit card'])}<button class="primary-button full-width" data-action="payment" data-go="commuter-earned">Confirm payment</button><button class="link-button" data-go="commuter-refund">Request a refund</button></div>`;
}

function commuterEarned() {
  return `${header('Points earned', 'commuter-payment')}<section class="points-hero" style="text-align:center"><p>JOURNEY COMPLETE</p><h2>+40</h2><span class="tier">Loyalty points credited for this completed journey.</span></section><section class="list-card" style="margin-top:14px">${listRow('star','New points balance','Gold commuter tier','1,280 pts','purple')}</section><button class="primary-button full-width" style="margin-top:15px" data-go="commuter-loyalty">View loyalty rewards</button>`;
}

function commuterRefund() {
  return `${header('Request refund', 'commuter-payment')}<section class="route-hero"><h2>Request a refund</h2><p>Tell us why the payment needs to be reviewed. This is a prototype request only.</p></section><form class="form-stack" data-form="refund" novalidate>${formError()}${field('Refund amount', 'number', '2.70', '2.70')}${selectField('Reason', ['Service disruption', 'Duplicate payment', 'Route cancelled', 'Other'])}${textareaField('Additional details', 'Describe what happened')}<button class="primary-button full-width" type="submit">Send refund request</button></form>`;
}

function commuterLoyalty() {
  return `${header('Loyalty', 'commuter-home', `<button class="icon-button" data-go="commuter-rewards" aria-label="Rewards catalogue">${i('star')}</button>`)}<section class="points-hero"><p>YOUR POINTS BALANCE</p><h2>1,240</h2><span class="tier">Gold commuter · 260 points to Platinum</span></section><h2 class="section-label">Available rewards</h2><section class="reward-card"><div class="reward-art">⌁</div><div><h3>Free ride</h3><p>Redeem points for your next journey.</p></div><div class="reward-side"><b>800 pts</b><button data-action="redeem-ride">Redeem</button></div></section><section class="reward-card"><div class="reward-art">☕</div><div><h3>Merchant voucher</h3><p>Offers from selected partners.</p></div><div class="reward-side"><b>500 pts</b><button data-go="commuter-rewards">View</button></div></section><button class="secondary-button full-width" style="margin-top:14px" data-go="commuter-rewards">Browse rewards catalogue</button>`;
}

function commuterRewards() {
  return `${header('Rewards catalogue', 'commuter-loyalty')}<div class="filter-row"><button class="filter-chip is-active">All rewards</button><button class="filter-chip">Free rides</button><button class="filter-chip">Vouchers</button></div><section class="reward-card"><div class="reward-art">⌁</div><div><h3>Free LRT ride</h3><p>Credit one free ride to your account.</p></div><div class="reward-side"><b>800 pts</b><button data-action="redeem-ride">Redeem</button></div></section><section class="reward-card"><div class="reward-art">☕</div><div><h3>Bean Brothers RM5 voucher</h3><p>Valid until 31 Aug 2026.</p></div><div class="reward-side"><b>500 pts</b><button data-action="redeem-voucher">Redeem</button></div></section><section class="reward-card"><div class="reward-art">🍔</div><div><h3>Campus meal voucher</h3><p>Valid at selected Sunway outlets.</p></div><div class="reward-side"><b>650 pts</b><button data-action="redeem-voucher">Redeem</button></div></section>`;
}

function commuterNotifications() {
  return `${header('Notifications', 'commuter-home')}<div class="list-card"><div class="notification-row is-unread"><span class="row-icon red">${i('info')}</span><div class="row-copy"><h3>Service disruption</h3><p>Kelana Jaya Line is delayed near Pasar Seni.</p></div><span class="time">Now</span></div><div class="notification-row is-unread"><span class="row-icon amber">${i('bus')}</span><div class="row-copy"><h3>Journey update</h3><p>Your next train arrives in 2 minutes.</p></div><span class="time">8m</span></div><div class="notification-row"><span class="row-icon amber">${i('clock')}</span><div class="row-copy"><h3>Peak-hour alert</h3><p>Travel after 8:30 AM to avoid the busiest period.</p></div><span class="time">35m</span></div><div class="notification-row"><span class="row-icon purple">${i('wallet')}</span><div class="row-copy"><h3>Low balance</h3><p>Your wallet balance is below RM 20.</p></div><span class="time">1h</span></div><div class="notification-row"><span class="row-icon">${i('star')}</span><div class="row-copy"><h3>Points earned</h3><p>40 points were credited after your journey.</p></div><span class="time">Yesterday</span></div></div><button class="danger-button full-width" style="margin-top:15px" data-go="commuter-disruption">View disruption alert</button>`;
}

function commuterDisruption() {
  const route = selectedRoute();
  if (route.disruption === 'none') {
    return `${header('Service disruption', 'commuter-notifications')}<section class="clear-status"><span class="tag teal">ALL CLEAR</span><h2>No service disruption on this route</h2><p>${route.name} is operating normally. You can continue to KL Sentral without a service-alert detour.</p></section><button class="primary-button full-width" style="margin-top:14px" data-go="commuter-journey">Return to journey progress</button>`;
  }
  const crowded = route.disruption === 'crowd';
  return `${header('Service disruption', 'commuter-notifications')}<section class="disruption-card"><span class="tag">${crowded ? 'CROWD ALERT' : 'MINOR DELAY'}</span><h2>${crowded ? 'Busy near Bukit Bintang' : 'Kelana Jaya Line'}</h2><p>${crowded ? 'Vehicle occupancy is high near Bukit Bintang. Consider the suggested alternative for a more comfortable journey.' : 'Services are operating with an estimated 10-minute delay near Pasar Seni due to a signalling issue.'}</p><small>${crowded ? 'Updated 10:26 AM' : 'Started 10:14 AM · Updated 10:22 AM'}</small></section><button class="primary-button full-width" style="margin-top:14px" data-go="commuter-alternative">View alternative routes</button>`;
}

function commuterAlternative() {
  const alternativeRoutes = [
    { id: 'brt-lrt', name: 'MRT + BRT', detail: 'Use the MRT Kajang Line via Pasar Seni', duration: '11:44 AM', fare: 'RM 4.20', transfers: '1', tag: 'Recommended', recommended: true, progress: 43, next: 'Muzium Negara', disruption: 'none' },
    { id: 'bus-mrt', name: 'BRT + bus', detail: 'Use BRT Sunway Line toward KL Sentral', duration: '11:58 AM', fare: 'RM 3.80', transfers: '1', tag: 'Low fare', recommended: false, progress: 57, next: 'USJ 7', disruption: 'none' },
  ];
  return `${header('Alternative routes', 'commuter-disruption')}<section class="route-hero"><h2>Keep moving.</h2><p>We found these options while the current service update is active.</p></section>${alternativeRoutes.map(routeCard).join('')}`;
}

function commuterProfile() {
  return `${header('Profile', 'commuter-home')}<section class="list-card">${listRow('user','Yi Hern Chang','yihern@example.com','','')}</section><button class="soft-button full-width" style="margin-top:11px" data-go="commuter-preferences">${i('settings')} Journey preferences</button><h2 class="section-label">Personal details</h2><form class="form-stack" data-form="profile" novalidate>${formError()}${field('Name', 'text', '', 'Yi Hern Chang')}${field('Email address', 'email', '', 'yihern@example.com')}${field('Phone number', 'tel', '', '+60 12 345 6789')}<button class="primary-button full-width" type="submit">Save personal details</button></form><section class="profile-password-card"><h2>Password and security</h2><p>Enter your current password before replacing it with a new one.</p><form class="form-stack" data-form="profile-password" novalidate>${formError()}${field('Current password', 'password', 'Your current password', '', 'lock', { id: 'profile-current-password', toggle: true })}${field('New password', 'password', 'At least 8 characters', '', 'lock', { id: 'profile-new-password', toggle: true })}${field('Confirm new password', 'password', 'Re-enter new password', '', 'lock', { id: 'profile-confirm-password', match: 'profile-new-password', toggle: true })}<button class="secondary-button full-width" type="submit">Change password</button></form></section><button class="danger-button full-width" style="margin-top:15px" data-action="logout">${i('logout')} Log out</button>`;
}

function commuterPreferences() {
  return `${header('Journey preferences', 'commuter-profile')}<div class="form-stack">${selectField('Preferred mode', ['Rail and bus', 'Rail only', 'Bus only'])}${selectField('Route priority', ['Best balance', 'Lowest fare', 'Fastest route'])}</div><section class="list-card" style="margin-top:15px"><div class="switch-row"><div><h3>Avoid transfers</h3><p>Prioritise routes with fewer changes.</p></div><button class="toggle ${state.toggles.transfers ? 'is-on' : ''}" data-toggle="transfers" aria-label="Toggle avoid transfers"></button></div><div class="switch-row"><div><h3>Accessibility needs</h3><p>Prioritise accessible stations and routes.</p></div><button class="toggle ${state.toggles.accessible ? 'is-on' : ''}" data-toggle="accessible" aria-label="Toggle accessibility"></button></div><div class="switch-row"><div><h3>Journey alerts</h3><p>Receive travel updates for active journeys.</p></div><button class="toggle ${state.toggles.alerts ? 'is-on' : ''}" data-toggle="alerts" aria-label="Toggle alerts"></button></div></section><button class="primary-button full-width" style="margin-top:15px" data-action="preferences-save" data-go="commuter-profile">Save preferences</button>`;
}

function commuterContent() {
  const pages = {
    'commuter-auth': commuterAuth, 'commuter-register': commuterRegister, 'commuter-reset': commuterReset, 'commuter-home': commuterHome,
    'commuter-route-plan': commuterRoutePlan, 'commuter-route-results': commuterRouteResults, 'commuter-save-favourite': commuterSaveFavourite, 'commuter-favourites': commuterFavourites,
    'commuter-live-map': commuterLiveMap, 'commuter-journey': commuterJourney, 'commuter-countdown': commuterCountdown, 'commuter-crowd': commuterCrowd, 'commuter-occupancy': commuterOccupancy,
    'commuter-wallet': commuterWallet, 'commuter-topup': commuterTopup, 'commuter-transactions': commuterTransactions, 'commuter-ticket': commuterTicket, 'commuter-scan': commuterScan, 'commuter-payment': commuterPayment, 'commuter-refund': commuterRefund,
    'commuter-loyalty': commuterLoyalty, 'commuter-earned': commuterEarned, 'commuter-rewards': commuterRewards, 'commuter-notifications': commuterNotifications, 'commuter-disruption': commuterDisruption, 'commuter-alternative': commuterAlternative, 'commuter-profile': commuterProfile, 'commuter-preferences': commuterPreferences,
  };
  const auth = ['commuter-auth', 'commuter-register', 'commuter-reset'].includes(state.screen);
  const navigation = state.screen.includes('route') ? 'plan' : state.screen.includes('wallet') || ['commuter-topup','commuter-transactions','commuter-ticket','commuter-payment','commuter-refund'].includes(state.screen) ? 'wallet' : state.screen.includes('profile') || state.screen.includes('preferences') ? 'profile' : 'home';
  return `<div class="app-screen commuter">${statusbar()}<main class="screen-main ${auth ? 'no-bottom-nav' : ''}">${(pages[state.screen] || commuterHome)()}</main>${auth ? '' : bottomNav(navigation)}${toast()}</div>`;
}

function adminLogin() {
  return `<div class="auth-layout"><div class="brand-lockup">${logo()}<h1>Admin portal</h1><p>Secure UniMove platform access.</p></div><form class="form-stack" data-form="admin-login" novalidate>${formError()}${field('Email address', 'email', 'admin@unimove.my', '', 'mail')}${field('Password', 'password', 'At least 8 characters', '', 'lock', { id: 'admin-login-password', toggle: true })}<button class="primary-button full-width" type="submit">Log in securely</button></form><div class="auth-footer">Authorised System Administrator access only.</div></div>`;
}

function adminDashboard() {
  return `${header('Admin portal', '', `<button class="icon-button" data-action="logout" aria-label="Log out">${i('logout')}</button>`)}<section class="portal-banner"><div style="display:flex;justify-content:space-between;align-items:center"><span class="card-eyebrow">SYSTEM OVERVIEW</span>${logo('logo-small')}</div><h2>Good morning, Admin.</h2><p>Monitor operations and manage the UniMove platform.</p></section><section class="portal-metrics"><article class="metric-card"><span class="metric-label">ACTIVE USERS</span><strong>12,482</strong><small>↑ 8.2% this month</small></article><article class="metric-card"><span class="metric-label">LIVE FEEDS</span><strong>24 / 25</strong><small>1 attention needed</small></article></section><h2 class="section-label">Management tools</h2><section class="admin-actions"><button class="admin-action" data-go="admin-users">${i('users')}<b>User accounts</b><span>Search and update users</span></button><button class="admin-action" data-go="admin-feeds">${i('database')}<b>Data feeds</b><span>Operator connections</span></button><button class="admin-action" data-go="admin-announcements">${i('megaphone')}<b>Announcements</b><span>Publish service notices</span></button><button class="admin-action" data-go="admin-reports">${i('chart')}<b>Analytics report</b><span>Usage and ridership</span></button><button class="admin-action" data-go="admin-performance">${i('activity')}<b>Performance</b><span>Monitor system health</span></button></section>`;
}

function adminUsers() {
  return `${header('User accounts', 'admin-dashboard')}<form class="form-stack" data-form="admin-users" novalidate>${formError()}<label class="form-field search-field">${i('user')}<input class="text-input" placeholder="Search name, email, or user ID" data-label="User search" data-validate required /><span class="field-error"></span></label><div class="list-card"><div class="user-row"><span class="avatar">AC</span><div class="row-copy"><h3>Aina Cheong</h3><p>aina.chen@gmail.com · Commuter</p></div><div class="row-value"><span class="status-dot"></span>Active</div></div><div class="user-row"><span class="avatar">RM</span><div class="row-copy"><h3>Ravi Menon</h3><p>ravi.menon@gmail.com · Commuter</p></div><div class="row-value"><span class="status-dot warning"></span>Review</div></div><div class="user-row"><span class="avatar">NS</span><div class="row-copy"><h3>Nur Syafiqah</h3><p>nur.s@unimove.my · Admin</p></div><div class="row-value"><span class="status-dot"></span>Active</div></div></div><button class="secondary-button full-width" type="submit">Update selected account</button></form>`;
}

function adminFeeds() {
  return `${header('Transport data feeds', 'admin-dashboard')}<section class="list-card"><div class="favourite-row"><span class="row-icon">${i('database')}</span><div class="row-copy"><h3>Rapid KL</h3><p>https://api.rapidkl.my/live</p></div><div class="row-value"><span class="status-dot"></span>Connected</div></div><div class="favourite-row"><span class="row-icon">${i('database')}</span><div class="row-copy"><h3>Prasarana Malaysia</h3><p>https://feeds.prasarana.my/v1</p></div><div class="row-value"><span class="status-dot"></span>Connected</div></div><div class="favourite-row"><span class="row-icon amber">${i('database')}</span><div class="row-copy"><h3>Campus Shuttle</h3><p>https://sunway-shuttle.my/feed</p></div><div class="row-value"><span class="status-dot warning"></span>Review</div></div></section><form class="form-stack" style="margin-top:15px" data-form="admin-feed" novalidate>${formError()}${field('Data feed URL', 'url', 'https://')}${selectField('Connection status', ['Connected', 'Needs review', 'Offline'])}<button class="primary-button full-width" type="submit">Update feed configuration</button></form>`;
}

function adminAnnouncements() {
  return `${header('Announcements', 'admin-dashboard')}<form class="form-stack" data-form="admin-announcement" novalidate>${formError()}${field('Announcement title', 'text', 'Title')}${textareaField('Announcement content', 'Write a clear service announcement')}${selectField('Status', ['Published', 'Draft'])}<button class="primary-button full-width" type="submit">Publish announcement</button></form><h2 class="section-label">Recent announcements</h2><section class="announcement-card"><h3>Kelana Jaya Line delay</h3><p>Minor delays are expected near Pasar Seni until further notice.</p><div class="announcement-footer"><small>Published · 14 Jul 2026</small><button class="link-button" data-action="edit-announcement">Edit</button></div></section>`;
}

function adminReports() {
  return `${header('Analytics report', 'admin-dashboard')}<div class="form-stack">${selectField('Date range', ['Last 7 days', 'Last 30 days', 'This quarter'])}${selectField('Metric', ['Ridership', 'Route searches', 'Wallet top ups', 'QR boardings'])}<button class="primary-button full-width" data-action="report">Generate report</button></div><section class="chart-card" style="margin-top:15px"><h3>Weekly ridership</h3><p>Completed commuter journeys</p><div class="bar-chart"><i style="height:51%"></i><i style="height:73%"></i><i style="height:62%"></i><i style="height:88%"></i><i style="height:74%"></i><i style="height:66%"></i><i style="height:41%"></i></div><div class="chart-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div></section>`;
}

function adminPerformance() {
  return `${header('System performance', 'admin-dashboard')}<section class="portal-banner"><span class="card-eyebrow">CURRENT STATUS</span><h2>All core systems online</h2><p>Last monitored at 10:42 AM.</p></section><section class="performance-grid" style="margin-top:14px"><article class="performance-row"><div><span>Server load</span><strong>42%</strong></div><div class="mini-track"><i style="width:42%"></i></div></article><article class="performance-row"><div><span>Uptime</span><strong>99.98%</strong></div><div class="mini-track"><i style="width:99%"></i></div></article><article class="performance-row"><div><span>Response time</span><strong>186 ms</strong></div><div class="mini-track warning"><i style="width:61%"></i></div></article></section><button class="secondary-button full-width" style="margin-top:15px" data-action="monitor">Refresh monitoring</button>`;
}

function adminContent() {
  const pages = {'admin-login': adminLogin, 'admin-dashboard': adminDashboard, 'admin-users': adminUsers, 'admin-feeds': adminFeeds, 'admin-announcements': adminAnnouncements, 'admin-reports': adminReports, 'admin-performance': adminPerformance};
  const login = state.screen === 'admin-login';
  return `<div class="app-screen admin">${statusbar()}<main class="screen-main ${login ? 'no-bottom-nav' : ''}">${(pages[state.screen] || adminLogin)()}</main>${toast()}</div>`;
}

function operatorLogin() {
  return `<div class="auth-layout"><div class="brand-lockup">${logo()}<h1>Operator portal</h1><p>Provide live transport information.</p></div><form class="form-stack" data-form="operator-login" novalidate>${formError()}${field('Operator email', 'email', 'operator@company.my', '', 'mail')}${field('Password', 'password', 'At least 8 characters', '', 'lock', { id: 'operator-login-password', toggle: true })}<button class="primary-button full-width" type="submit">Log in</button></form><div class="auth-footer">For authorised transport operator use.</div></div>`;
}

function operatorDashboard() {
  return `${header('Operator dashboard', '', `<button class="icon-button" data-action="logout" aria-label="Log out">${i('logout')}</button>`)}<section class="operator-hero"><div style="display:flex;justify-content:space-between;align-items:center"><span class="card-eyebrow">OPERATOR PROFILE</span>${logo('logo-small')}</div><h2>Rapid KL</h2><p>Live data service for rail and bus operations.</p><span class="connection-pill"><i></i> Connection active</span></section><section class="operator-stat"><article class="metric-card"><span class="metric-label">VEHICLES</span><strong>84</strong><small>Live now</small></article><article class="metric-card"><span class="metric-label">FEED STATUS</span><strong>99.8%</strong><small>Healthy</small></article><article class="metric-card"><span class="metric-label">ALERTS</span><strong>2</strong><small>Active</small></article></section><h2 class="section-label">Live data management</h2><section class="list-card">${actionRow('database','Manage operator data feed','Update connection, crowd and vehicle data','operator-feed')}${actionRow('info','Active service alerts','Publish or clear commuter service alerts','operator-alerts')}</section>`;
}

function operatorFeed() {
  return `${header('Operator data feed', 'operator-dashboard')}<section class="feed-form-card"><h2>Live feed configuration</h2><p>Enter the secure feed address, then choose the current operating conditions.</p><form class="form-stack" data-form="operator-feed" novalidate>${formError()}${field('Data feed URL', 'url', 'https://api.rapidkl.my/live', 'https://api.rapidkl.my/live')}${selectField('Connection status', ['Connected', 'Maintenance', 'Offline'])}${selectField('Station crowd level', ['Moderate', 'Low', 'High'])}${selectField('Vehicle occupancy', ['47% · Moderate', '30% · Light', '85% · High'])}<button class="primary-button full-width" type="submit">Push live data</button></form></section><section class="data-preview"><h3>Current data sent to UniMove</h3><dl><dt>Connection status</dt><dd>Connected</dd><dt>Station crowd</dt><dd>Moderate</dd><dt>Vehicle occupancy</dt><dd>47%</dd></dl></section>`;
}

function operatorAlerts() {
  return `${header('Service alerts', 'operator-dashboard')}<section class="feed-form-card"><h2>Update commuter alerts</h2><p>Choose the alert details commuters should see for the affected service.</p><form class="form-stack" data-form="operator-alerts" novalidate>${formError()}${selectField('Alert status', ['Minor delay', 'Service disruption', 'No active alert'])}${selectField('Affected service', ['Kelana Jaya Line', 'Kajang Line', 'BRT Sunway Line'])}${selectField('Expected delay', ['5 minutes', '10 minutes', '15 minutes or more'])}${textareaField('Alert message', 'Describe the service update for commuters')}<button class="primary-button full-width" type="submit">Publish service alert</button></form></section><section class="data-preview"><h3>Current commuter alert</h3><dl><dt>Status</dt><dd>Minor delay</dd><dt>Service</dt><dd>Kelana Jaya Line</dd><dt>Expected delay</dt><dd>10 minutes</dd></dl></section>`;
}

function operatorContent() {
  const pages = {'operator-login': operatorLogin, 'operator-dashboard': operatorDashboard, 'operator-feed': operatorFeed, 'operator-alerts': operatorAlerts};
  const login = state.screen === 'operator-login';
  return `<div class="app-screen operator">${statusbar()}<main class="screen-main ${login ? 'no-bottom-nav' : ''}">${(pages[state.screen] || operatorLogin)()}</main>${toast()}</div>`;
}

function render() {
  app.innerHTML = state.role === 'commuter' ? commuterContent() : state.role === 'admin' ? adminContent() : operatorContent();
  document.querySelectorAll('.role-choice').forEach(button => button.classList.toggle('is-active', button.dataset.role === state.role));
}

function showToast(message) {
  state.toast = message;
  render();
  window.clearTimeout(window.toastTimer);
  window.toastTimer = window.setTimeout(() => { state.toast = ''; render(); }, 2800);
}

document.addEventListener('click', (event) => {
  const roleButton = event.target.closest('[data-role]');
  if (roleButton) {
    state.role = roleButton.dataset.role;
    state.screen = state.role === 'commuter' ? 'commuter-auth' : state.role === 'admin' ? 'admin-login' : 'operator-login';
    state.toast = '';
    render();
    return;
  }
  const passwordToggle = event.target.closest('[data-toggle-password]');
  if (passwordToggle) {
    const passwordInput = document.getElementById(passwordToggle.dataset.togglePassword);
    if (passwordInput) {
      const reveal = passwordInput.type === 'password';
      passwordInput.type = reveal ? 'text' : 'password';
      passwordToggle.textContent = reveal ? 'Hide' : 'Show';
    }
    return;
  }
  const route = event.target.closest('[data-route]');
  if (route) state.selectedRoute = route.dataset.route;
  const preference = event.target.closest('[data-preference]');
  if (preference) {
    const name = preference.dataset.preference;
    state.homePreferences.has(name) ? state.homePreferences.delete(name) : state.homePreferences.add(name);
    render();
    return;
  }
  const go = event.target.closest('[data-go]');
  if (go) {
    const needsToast = go.dataset.action;
    state.screen = go.dataset.go;
    if (needsToast) state.toast = actionMessages[needsToast] || '';
    render();
    return;
  }
  const amount = event.target.closest('[data-amount]');
  if (amount) { state.selectedAmount = amount.dataset.amount; render(); return; }
  const filter = event.target.closest('[data-filter]');
  if (filter) { state.activeFilter = filter.dataset.filter; render(); return; }
  const toggle = event.target.closest('[data-toggle]');
  if (toggle) { state.toggles[toggle.dataset.toggle] = !state.toggles[toggle.dataset.toggle]; render(); return; }
  const action = event.target.closest('[data-action]');
  if (action) {
    const name = action.dataset.action;
    if (name === 'dismiss-toast') { state.toast = ''; render(); return; }
    if (name === 'filter') { action.classList.toggle('is-active'); return; }
    if (name === 'save-route') {
      if (!state.favourites.includes(state.selectedRoute)) state.favourites.push(state.selectedRoute);
      state.screen = 'commuter-favourites';
      showToast('Route saved to your favourites.');
      return;
    }
    if (name === 'logout') {
      state.screen = state.role === 'commuter' ? 'commuter-auth' : state.role === 'admin' ? 'admin-login' : 'operator-login';
      showToast('You have been logged out.');
      return;
    }
    if (name === 'choose-route') { state.savedRoute = false; showToast('Route selected for this prototype journey.'); return; }
    showToast(actionMessages[name] || 'Saved in this prototype.');
  }
});

function setFieldError(input, message = '') {
  const container = input.closest('.form-field');
  if (!container) return;
  const error = container.querySelector('.field-error');
  container.classList.toggle('has-error', Boolean(message));
  if (error) error.textContent = message;
}

function validationMessage(input) {
  const value = input.value.trim();
  const label = input.dataset.label || 'This field';
  if (!value) return `${label} cannot be empty.`;
  if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address, for example name@example.com.';
  if (input.type === 'url') {
    try {
      const parsed = new URL(value);
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('protocol');
    } catch {
      return 'Enter a valid URL starting with http:// or https://.';
    }
  }
  if (input.type === 'password' && value.length < 8) return 'Password must be at least 8 characters.';
  if (input.type === 'number' && Number(value) <= 0) return `${label} must be greater than 0.`;
  if (input.dataset.match) {
    const matching = document.getElementById(input.dataset.match);
    if (matching && value !== matching.value) return 'Passwords do not match. Please type the same password again.';
  }
  return '';
}

function validateForm(form) {
  const fields = [...form.querySelectorAll('[data-validate]')];
  const errors = [];
  fields.forEach(input => {
    const message = validationMessage(input);
    setFieldError(input, message);
    if (message) errors.push({ input, message });
  });
  const summary = form.querySelector('.form-error');
  if (summary) {
    summary.hidden = errors.length === 0;
    summary.textContent = errors.length ? `Please correct the highlighted field${errors.length > 1 ? 's' : ''} before continuing.` : '';
  }
  if (errors.length) errors[0].input.focus();
  return errors.length === 0;
}

function completeForm(formName) {
  const destinations = {
    'commuter-login': ['commuter-home', 'Welcome back to UniMove.'],
    'commuter-register': ['commuter-home', 'Account created successfully.'],
    'commuter-reset': ['commuter-auth', 'Password updated. Please log in with your new password.'],
    'route-plan': ['commuter-route-results', 'Route options are ready.'],
    'topup': ['commuter-wallet', 'Top-up confirmed. Your wallet balance is updated locally.'],
    'refund': ['commuter-wallet', 'Refund request submitted for review.'],
    'profile': ['commuter-profile', 'Profile updated.'],
    'profile-password': ['commuter-profile', 'Password changed successfully.'],
    'admin-login': ['admin-dashboard', 'Admin access granted.'],
    'admin-users': ['admin-users', 'Selected user account updated.'],
    'admin-feed': ['admin-feeds', 'Data feed configuration updated.'],
    'admin-announcement': ['admin-announcements', 'Announcement published.'],
    'operator-login': ['operator-dashboard', 'Operator access granted.'],
    'operator-feed': ['operator-feed', 'Live operator data pushed to UniMove.'],
    'operator-alerts': ['operator-alerts', 'Service alert published for commuters.'],
  };
  const [screen, message] = destinations[formName] || [state.screen, 'Saved in this prototype.'];
  state.screen = screen;
  showToast(message);
}

document.addEventListener('submit', (event) => {
  const form = event.target.closest('form[data-form]');
  if (!form) return;
  event.preventDefault();
  if (!validateForm(form)) return;
  completeForm(form.dataset.form);
});

document.addEventListener('input', (event) => {
  if (!event.target.matches('[data-validate]')) return;
  const message = validationMessage(event.target);
  setFieldError(event.target, message);
  const form = event.target.closest('form');
  if (form && !message) {
    const summary = form.querySelector('.form-error');
    if (summary && ![...form.querySelectorAll('.has-error')].length) summary.hidden = true;
  }
});

const actionMessages = {
  'reset-password': 'Password updated. Please log in with your new password.',
  'topup': 'Top-up confirmed. Your wallet balance is updated locally.',
  'scan': 'Boarding confirmed for this prototype.',
  'payment': 'Payment processed. 40 loyalty points were credited.',
  'refund': 'Refund request submitted for review.',
  'redeem-ride': 'Free ride credited to your UniMove account.',
  'redeem-voucher': 'Voucher issued and ready to use.',
  'profile-save': 'Profile updated.',
  'preferences-save': 'Journey preferences saved.',
  'save-route': 'Route saved to your favourites.',
  'logout': 'You have been logged out.',
  'user-update': 'Selected user account updated.',
  'feed-update': 'Data feed configuration updated.',
  'announcement': 'Announcement published.',
  'edit-announcement': 'Announcement opened for editing.',
  'report': 'Analytics report generated.',
  'monitor': 'System monitoring refreshed.',
  'push-feed': 'Live operator data pushed to UniMove.',
};

render();
