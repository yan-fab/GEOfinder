/* ═══════════════════════════════════════════
   geoBR Explorer — Application Logic
═══════════════════════════════════════════ */

// ── Dataset Registry ──────────────────────────────────────────
const DATASETS = [
  // Administrative
  { id:'country',             label:'País',                  emoji:'🌎', func:'read_country',            rfunc:'read_country',            cat:'admin',  years:[1872,1900,1911,1920,1933,1940,1950,1960,1970,1980,1991,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],   hasCode:false, hasZone:false, codeLabel:null },
  { id:'region',              label:'Regiões',               emoji:'🗺',  func:'read_region',             rfunc:'read_region',             cat:'admin',  years:[1872,1900,1911,1920,1933,1940,1950,1960,1970,1980,1991,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],   hasCode:false, hasZone:false, codeLabel:null },
  { id:'state',               label:'Estados',               emoji:'🏛',  func:'read_state',              rfunc:'read_state',              cat:'admin',  years:[1872,1900,1911,1920,1933,1940,1950,1960,1970,1980,1991,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],   hasCode:true,  hasZone:false, codeLabel:'Sigla/código do estado (ex: SP, 35, all)' },
  { id:'municipality',        label:'Municípios',            emoji:'🏘',  func:'read_municipality',       rfunc:'read_municipality',       cat:'admin',  years:[1872,1933,1940,1950,1960,1970,1980,1991,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022], hasCode:true,  hasZone:false, codeLabel:'Código IBGE do município, sigla do estado, ou "all"' },
  { id:'meso_region',         label:'Mesorregiões',          emoji:'📍',  func:'read_meso_region',        rfunc:'read_meso_region',        cat:'admin',  years:[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],   hasCode:true,  hasZone:false, codeLabel:'Sigla do estado ou "all"' },
  { id:'micro_region',        label:'Microrregiões',         emoji:'📌',  func:'read_micro_region',       rfunc:'read_micro_region',       cat:'admin',  years:[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],   hasCode:true,  hasZone:false, codeLabel:'Sigla do estado ou "all"' },
  { id:'intermediate_region', label:'Regiões Intermediárias',emoji:'🔵',  func:'read_intermediate_region',rfunc:'read_intermediate_region', cat:'admin',  years:[2017,2019],                                                       hasCode:true,  hasZone:false, codeLabel:'Sigla do estado ou "all"' },
  { id:'immediate_region',    label:'Regiões Imediatas',     emoji:'🟢',  func:'read_immediate_region',   rfunc:'read_immediate_region',   cat:'admin',  years:[2017,2019],                                                       hasCode:true,  hasZone:false, codeLabel:'Sigla do estado ou "all"' },
  // Environment
  { id:'biomes',              label:'Biomas',                emoji:'🌿',  func:'read_biomes',             rfunc:'read_biomes',             cat:'env',    years:[2004,2019],                                                       hasCode:false, hasZone:false, codeLabel:null },
  { id:'amazon',              label:'Amazônia Legal',        emoji:'🌳',  func:'read_amazon',             rfunc:'read_amazon',             cat:'env',    years:[2012],                                                            hasCode:false, hasZone:false, codeLabel:null },
  { id:'semiarid',            label:'Semiárido',             emoji:'🏜',  func:'read_semiarid',           rfunc:'read_semiarid',           cat:'env',    years:[2017],                                                            hasCode:false, hasZone:false, codeLabel:null },
  { id:'conservation_units',  label:'Unidades de Conservação',emoji:'🛡',  func:'read_conservation_units', rfunc:'read_conservation_units', cat:'env',    years:[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],               hasCode:false, hasZone:false, codeLabel:null },
  { id:'indigenous_land',     label:'Terras Indígenas',      emoji:'🪶',  func:'read_indigenous_land',    rfunc:'read_indigenous_land',    cat:'env',    years:[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],               hasCode:false, hasZone:false, codeLabel:null },
  { id:'disaster_risk_area',  label:'Áreas de Risco',        emoji:'⚠️',  func:'read_disaster_risk_area', rfunc:'read_disaster_risk_area', cat:'env',    years:[2010],                                                            hasCode:true,  hasZone:false, codeLabel:'Sigla do estado ou "all"' },
  // Census
  { id:'census_tract',        label:'Setores Censitários',   emoji:'🔲',  func:'read_census_tract',       rfunc:'read_census_tract',       cat:'census', years:[2000,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022], hasCode:true, hasZone:true, codeLabel:'Código IBGE (7 dígitos), sigla do estado, ou "all"' },
  { id:'weighting_area',      label:'Áreas de Ponderação',   emoji:'⚖️',  func:'read_weighting_area',     rfunc:'read_weighting_area',     cat:'census', years:[2010],                                                            hasCode:true,  hasZone:false, codeLabel:'Sigla do estado ou "all"' },
  { id:'statistical_grid',    label:'Grade Estatística',     emoji:'🗃',  func:'read_statistical_grid',   rfunc:'read_statistical_grid',   cat:'census', years:[2010],                                                            hasCode:false, hasZone:false, codeLabel:null },
  { id:'comparable_areas',    label:'Áreas Comparáveis',     emoji:'📐',  func:'read_comparable_areas',   rfunc:'read_comparable_areas',   cat:'census', years:[1872,1900,1920,1940,1950,1960,1970,1980,1991,2000,2010],         hasCode:false, hasZone:false, codeLabel:null },
  // Health / Education
  { id:'health_region',       label:'Regiões de Saúde',      emoji:'❤️',  func:'read_health_region',      rfunc:'read_health_region',      cat:'health', years:[2013],                                                            hasCode:true,  hasZone:false, codeLabel:'Sigla do estado ou "all"' },
  { id:'health_facilities',   label:'Unidades de Saúde',     emoji:'🏥',  func:'read_health_facilities',  rfunc:'read_health_facilities',  cat:'health', years:[2015],                                                            hasCode:true,  hasZone:false, codeLabel:'Sigla do estado ou "all"' },
  { id:'schools',             label:'Escolas',               emoji:'🏫',  func:'read_schools',            rfunc:'read_schools',            cat:'health', years:[2020],                                                            hasCode:true,  hasZone:false, codeLabel:'Sigla do estado ou "all"' },
  // Urban
  { id:'urban_area',          label:'Áreas Urbanas',         emoji:'🏙',  func:'read_urban_area',         rfunc:'read_urban_area',         cat:'urban',  years:[2005,2015],                                                       hasCode:false, hasZone:false, codeLabel:null },
  { id:'urban_concentrations',label:'Concentrações Urbanas', emoji:'🌆',  func:'read_urban_concentrations',rfunc:'read_urban_concentrations',cat:'urban', years:[2015],                                                           hasCode:false, hasZone:false, codeLabel:null },
  { id:'metro_area',          label:'Regiões Metropolitanas',emoji:'🌇',  func:'read_metro_area',         rfunc:'read_metro_area',         cat:'urban',  years:[2010,2011,2012,2013,2014,2015,2016,2017,2018],                    hasCode:true,  hasZone:false, codeLabel:'Sigla do estado ou "all"' },
  { id:'municipal_seat',      label:'Sedes Municipais',      emoji:'📍',  func:'read_municipal_seat',     rfunc:'read_municipal_seat',     cat:'urban',  years:[2010],                                                            hasCode:false, hasZone:false, codeLabel:null },
  { id:'neighborhood',        label:'Bairros',               emoji:'🏠',  func:'read_neighborhood',       rfunc:'read_neighborhood',       cat:'urban',  years:[2010],                                                            hasCode:true,  hasZone:false, codeLabel:'Sigla do estado ou "all"' },
  { id:'pop_arrangements',    label:'Arranjos Populacionais',emoji:'👥',  func:'read_pop_arrangements',   rfunc:'read_pop_arrangements',   cat:'urban',  years:[2015],                                                            hasCode:false, hasZone:false, codeLabel:null },
];

const CAT_LABELS = { admin:'🏛 Admin', env:'🌿 Ambiente', census:'📊 Censo', health:'❤️ Saúde', urban:'🏙 Urbano' };

// ── State ─────────────────────────────────────────────────────
let currentLang = 'python'; // 'python' | 'r'
let qqSimplified = true;
let selectedDatasets = new Set();
let cgLang = 'python';

// ── Helpers ───────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const on = (el, ev, fn) => el.addEventListener(ev, fn);

function showToast(msg, type = 'info') {
  const t = $('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => { t.className = 'toast'; }, 2500);
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast('✓ Código copiado!', 'success'));
}

function dsById(id) { return DATASETS.find(d => d.id === id); }

// ── Code generators ───────────────────────────────────────────
function genPython(ds, opts = {}) {
  const { year, code, simplified = true, output = 'gpd', cache = true, progress = true, verbose = false, zone } = opts;
  let fn = ds.func;
  let args = [];

  if (year !== undefined) args.push(`year=${year}`);
  if (code && code !== 'all' && code !== '') {
    const codeParam = ds.id === 'municipality' ? 'code_muni' :
                      ds.id === 'census_tract'  ? 'code_tract' :
                      ds.id === 'state'          ? 'code_state' : 'code_state';
    args.push(`${codeParam}="${code}"`);
  }
  if (ds.id === 'census_tract' && zone) args.push(`zone="${zone}"`);
  if (!simplified) args.push('simplified=False');
  if (output !== 'gpd') args.push(`output="${output}"`);
  if (!cache) args.push('cache=False');
  if (!progress) args.push('show_progress=False');
  if (verbose) args.push('verbose=True');

  const argsStr = args.join(', ');
  return `import geobr\n\n${ds.id.replace(/\//g, '_')} = geobr.${fn}(${argsStr})`;
}

function genR(ds, opts = {}) {
  const { year, code, simplified = true, output = 'sf', verbose = false, zone } = opts;
  let args = [];

  if (year !== undefined) args.push(`year = ${year}`);
  if (code && code !== 'all' && code !== '') {
    const codeParam = ds.id === 'municipality' ? 'code_muni' :
                      ds.id === 'census_tract'  ? 'code_tract' :
                      ds.id === 'state'          ? 'code_state' : 'code_state';
    args.push(`${codeParam} = "${code}"`);
  }
  if (ds.id === 'census_tract' && zone) args.push(`zone = "${zone}"`);
  if (!simplified) args.push('simplified = FALSE');
  if (verbose) args.push('verbose = TRUE');

  const argsStr = args.join(', ');
  return `library(geobr)\n\n${ds.id} <- ${ds.rfunc}(${argsStr})`;
}

// ── Quick Query Panel ─────────────────────────────────────────
function qqGetOpts() {
  const ds = dsById($('qq-dataset').value);
  return {
    year: parseInt($('qq-year').value),
    code: $('qq-code').value.trim(),
    simplified: qqSimplified,
    output: $('qq-output').value,
    cache: $('qq-cache').checked,
    progress: $('qq-progress').checked,
    verbose: $('qq-verbose').checked,
    zone: $('qq-zone').value,
  };
}

function qqUpdateCode() {
  const dsId = $('qq-dataset').value;
  const ds = dsById(dsId);
  if (!ds) return;
  const opts = qqGetOpts();

  // Show/hide zone
  $('qq-zone-group').classList.toggle('hidden', ds.id !== 'census_tract');
  // Show/hide code
  $('qq-code-group').classList.toggle('hidden', !ds.hasCode);
  if (ds.codeLabel) $('qq-code-hint').textContent = ds.codeLabel;

  // Update year options to only show available years
  const yearSel = $('qq-year');
  const currentYear = parseInt(yearSel.value);
  yearSel.innerHTML = '';
  ds.years.slice().reverse().forEach(y => {
    const opt = document.createElement('option');
    opt.value = y; opt.textContent = y;
    if (y === currentYear) opt.selected = true;
    yearSel.appendChild(opt);
  });
  if (!ds.years.includes(currentYear)) {
    yearSel.value = ds.years[ds.years.length - 1];
  }

  opts.year = parseInt($('qq-year').value);

  // Code
  const activeLang = document.querySelector('.lang-tab.active')?.dataset.lang || 'python';
  const code = activeLang === 'python' ? genPython(ds, opts) : genR(ds, opts);
  $('qq-code-content').textContent = code;

  // Dataset label
  $('qq-dataset-label').textContent = ds.id;
}

// Simplified toggles
on($('qq-simplified-true'), 'click', () => {
  qqSimplified = true;
  $('qq-simplified-true').classList.add('active');
  $('qq-simplified-false').classList.remove('active');
  qqUpdateCode();
});
on($('qq-simplified-false'), 'click', () => {
  qqSimplified = false;
  $('qq-simplified-false').classList.add('active');
  $('qq-simplified-true').classList.remove('active');
  qqUpdateCode();
});

// Lang tabs
document.querySelectorAll('.lang-tab').forEach(btn => {
  on(btn, 'click', () => {
    document.querySelectorAll('.lang-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    qqUpdateCode();
  });
});

// Dataset / year / code / options change
['qq-dataset','qq-year','qq-output','qq-zone'].forEach(id => {
  const el = $(id);
  if (el) on(el, 'change', qqUpdateCode);
});
['qq-cache','qq-progress','qq-verbose'].forEach(id => {
  const el = $(id);
  if (el) on(el, 'change', qqUpdateCode);
});
on($('qq-code'), 'input', qqUpdateCode);

// Copy button
on($('qq-copy-btn'), 'click', () => {
  copyText($('qq-code-content').textContent);
  $('qq-copy-btn').classList.add('copied');
  setTimeout(() => $('qq-copy-btn').classList.remove('copied'), 1500);
});

// Run button (visual demo — copies code and shows toast)
on($('qq-run-btn'), 'click', () => {
  const code = $('qq-code-content').textContent;
  copyText(code);
  showToast('💾 Código copiado! Cole no seu ambiente Python/R para executar.', 'success');
});

// ── Navigation ────────────────────────────────────────────────
const PANEL_TITLES = {
  'quick-query':  'Quick Query',
  'administrative': 'Divisões Administrativas',
  'environment':  'Meio Ambiente',
  'census':       'Censo & Setores',
  'health':       'Saúde & Educação',
  'urban':        'Áreas Urbanas',
  'local-db':     'Banco de Dados Local',
  'list':         'Listar Datasets',
  'code-gen':     'Gerador de Código',
};

function showPanel(panelId) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));

  const panel = $(`panel-${panelId}`);
  if (panel) panel.classList.add('active');

  const navBtn = document.querySelector(`[data-panel="${panelId}"]`);
  if (navBtn) navBtn.classList.add('active');

  $('topbarTitle').textContent = PANEL_TITLES[panelId] || panelId;

  // Close sidebar on mobile
  if (window.innerWidth < 900) {
    $('sidebar').classList.remove('mobile-open');
  }
}

document.querySelectorAll('.nav-item').forEach(btn => {
  on(btn, 'click', () => showPanel(btn.dataset.panel));
});

// Hamburger
const sidebar = $('sidebar');
on($('hamburger'), 'click', () => {
  sidebar.classList.toggle('mobile-open');
  // Desktop collapse
  if (window.innerWidth >= 900) {
    const wrapper = document.querySelector('.main-wrapper');
    sidebar.classList.toggle('collapsed');
    wrapper.classList.toggle('sidebar-hidden');
  }
});
on($('sidebarToggle'), 'click', () => {
  if (window.innerWidth < 900) {
    sidebar.classList.remove('mobile-open');
  }
});

// ── Dataset Card buttons ──────────────────────────────────────
document.querySelectorAll('.dataset-card-btn').forEach(btn => {
  on(btn, 'click', e => {
    e.stopPropagation();
    const card = btn.closest('.dataset-card');
    openModal(card.dataset.func);
  });
});

document.querySelectorAll('.dataset-card').forEach(card => {
  on(card, 'click', () => openModal(card.dataset.func));
});

// ── Modal ─────────────────────────────────────────────────────
let modalDsId = null;

function openModal(funcName) {
  const ds = DATASETS.find(d => d.func === funcName);
  if (!ds) return;
  modalDsId = ds.id;

  $('modal-title').textContent = `${ds.emoji} ${ds.label}`;

  // Build form
  let html = '';

  // Year
  if (ds.years.length > 0) {
    html += `<div class="form-group">
      <label class="form-label">Ano</label>
      <div class="select-wrapper">
        <select id="modal-year" class="form-select">
          ${ds.years.slice().reverse().map(y => `<option value="${y}">${y}</option>`).join('')}
        </select>
        <span class="select-arrow">▾</span>
      </div>
    </div>`;
  }

  // Code filter
  if (ds.hasCode) {
    html += `<div class="form-group">
      <label class="form-label">Filtro <span class="optional">(opcional)</span></label>
      <input type="text" id="modal-code" class="form-input" placeholder='all' />
      <span class="form-hint">${ds.codeLabel}</span>
    </div>`;
  }

  // Zone (census_tract)
  if (ds.hasZone) {
    html += `<div class="form-group">
      <label class="form-label">Zona</label>
      <div class="select-wrapper">
        <select id="modal-zone" class="form-select">
          <option value="urban">Urbana</option>
          <option value="rural">Rural</option>
        </select>
        <span class="select-arrow">▾</span>
      </div>
    </div>`;
  }

  // Simplified
  html += `<div class="form-group">
    <label class="form-label">Geometria</label>
    <div class="toggle-group">
      <button class="toggle-btn active" id="modal-simp-true">Simplificada</button>
      <button class="toggle-btn" id="modal-simp-false">Original</button>
    </div>
  </div>`;

  // Output
  html += `<div class="form-group">
    <label class="form-label">Formato de saída (Python)</label>
    <div class="select-wrapper">
      <select id="modal-output" class="form-select">
        <option value="gpd">GeoPandas</option>
        <option value="arrow">Arrow</option>
      </select>
      <span class="select-arrow">▾</span>
    </div>
  </div>`;

  html += `<div class="code-card compact">
    <div class="code-card-header">
      <div class="code-lang-tabs" id="modal-lang-tabs">
        <button class="lang-tab active" data-lang="python">Python</button>
        <button class="lang-tab" data-lang="r">R</button>
      </div>
    </div>
    <pre class="code-block"><code id="modal-code-preview"></code></pre>
  </div>`;

  $('modal-body').innerHTML = html;
  $('modal-overlay').classList.add('open');

  // Modal simplified toggles
  let modalSimplified = true;
  function updateModalCode() {
    const opts = {
      year: $('modal-year') ? parseInt($('modal-year').value) : undefined,
      code: $('modal-code') ? $('modal-code').value.trim() : '',
      simplified: modalSimplified,
      output: $('modal-output') ? $('modal-output').value : 'gpd',
      zone: $('modal-zone') ? $('modal-zone').value : 'urban',
    };
    const lang = document.querySelector('#modal-lang-tabs .lang-tab.active')?.dataset.lang || 'python';
    const code = lang === 'python' ? genPython(ds, opts) : genR(ds, opts);
    $('modal-code-preview').textContent = code;
  }

  const simpTrue = $('modal-simp-true');
  const simpFalse = $('modal-simp-false');
  if (simpTrue) {
    on(simpTrue, 'click', () => {
      modalSimplified = true;
      simpTrue.classList.add('active'); simpFalse.classList.remove('active');
      updateModalCode();
    });
    on(simpFalse, 'click', () => {
      modalSimplified = false;
      simpFalse.classList.add('active'); simpTrue.classList.remove('active');
      updateModalCode();
    });
  }

  ['modal-year','modal-output','modal-zone'].forEach(id => {
    const el = $(id);
    if (el) on(el, 'change', updateModalCode);
  });
  const codeEl = $('modal-code');
  if (codeEl) on(codeEl, 'input', updateModalCode);

  // Modal lang tabs
  document.querySelectorAll('#modal-lang-tabs .lang-tab').forEach(tab => {
    on(tab, 'click', () => {
      document.querySelectorAll('#modal-lang-tabs .lang-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateModalCode();
    });
  });

  updateModalCode();
}

on($('modal-close'), 'click', () => $('modal-overlay').classList.remove('open'));
on($('modal-cancel'), 'click', () => $('modal-overlay').classList.remove('open'));
on($('modal-overlay'), 'click', e => { if (e.target === $('modal-overlay')) $('modal-overlay').classList.remove('open'); });

on($('modal-apply'), 'click', () => {
  const code = $('modal-code-preview')?.textContent;
  if (code) {
    copyText(code);
    $('modal-overlay').classList.remove('open');
    showToast('✓ Código gerado e copiado!', 'success');
  }
});

// ── Catalog Table ─────────────────────────────────────────────
function buildCatalog(filter = '') {
  const tbody = $('catalog-tbody');
  tbody.innerHTML = '';
  const filtered = filter ? DATASETS.filter(d =>
    d.label.toLowerCase().includes(filter.toLowerCase()) ||
    d.func.toLowerCase().includes(filter.toLowerCase()) ||
    d.rfunc.toLowerCase().includes(filter.toLowerCase())
  ) : DATASETS;

  filtered.forEach(ds => {
    const tr = document.createElement('tr');
    const yearsStr = ds.years.length <= 4
      ? ds.years.join(', ')
      : `${ds.years[0]}–${ds.years[ds.years.length-1]}`;
    tr.innerHTML = `
      <td>${ds.emoji} <strong>${ds.label}</strong></td>
      <td><code>${ds.func}()</code></td>
      <td><code>${ds.rfunc}()</code></td>
      <td style="color:var(--text-secondary);font-size:.8rem">${yearsStr}</td>
      <td><span class="cat-badge cat-${ds.cat}">${CAT_LABELS[ds.cat]}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

on($('catalog-search'), 'input', e => buildCatalog(e.target.value));
buildCatalog();

// ── Copy buttons in list panel ────────────────────────────────
document.querySelectorAll('.btn-copy').forEach(btn => {
  on(btn, 'click', () => {
    const card = btn.closest('.code-card');
    const code = card?.querySelector('.code-block')?.textContent;
    if (code) copyText(code.trim());
  });
});

// ── Local DB panel ────────────────────────────────────────────
on($('ldb-path-input'), 'input', () => {
  const path = $('ldb-path-input').value.trim() || '/caminho/para/seus/parquets/';
  $('ldb-set-code').textContent = `import geobr\ngeobr.set_local_db("${path}")`;
});

// ── Code Generator ────────────────────────────────────────────
function buildPickerList(filter = '') {
  const list = $('picker-list');
  list.innerHTML = '';
  const filtered = filter ? DATASETS.filter(d =>
    d.label.toLowerCase().includes(filter.toLowerCase()) ||
    d.func.toLowerCase().includes(filter.toLowerCase())
  ) : DATASETS;

  filtered.forEach(ds => {
    const item = document.createElement('div');
    item.className = `picker-item${selectedDatasets.has(ds.id) ? ' selected' : ''}`;
    item.innerHTML = `
      <input type="checkbox" ${selectedDatasets.has(ds.id) ? 'checked' : ''} />
      <span class="picker-emoji">${ds.emoji}</span>
      <span>${ds.label}</span>
    `;
    const cb = item.querySelector('input');
    on(cb, 'change', () => {
      if (cb.checked) { selectedDatasets.add(ds.id); item.classList.add('selected'); }
      else { selectedDatasets.delete(ds.id); item.classList.remove('selected'); }
      updateCgCode();
    });
    on(item, 'click', e => { if (e.target !== cb) cb.click(); });
    list.appendChild(item);
  });
}

function updateCgCode() {
  const year = parseInt($('cg-year').value);
  const simplified = $('cg-simplified').checked;
  const useLocalDb = $('cg-local-db').checked;
  const lang = cgLang;

  const label = $('cg-lang-label');
  if (label) label.textContent = lang === 'python' ? 'Python' : 'R';

  if (selectedDatasets.size === 0) {
    $('cg-code-content').textContent = `# Selecione datasets à esquerda para gerar o código`;
    return;
  }

  let lines = [];
  if (lang === 'python') {
    lines.push('import geobr\n');
    if (useLocalDb) lines.push(`geobr.set_local_db("/caminho/para/seus/parquets/")\n`);
    selectedDatasets.forEach(id => {
      const ds = dsById(id);
      if (!ds) return;
      const code = genPython(ds, { year: ds.years.includes(year) ? year : ds.years[ds.years.length-1], simplified });
      // Remove the import line from each generated code snippet
      const snippet = code.replace('import geobr\n\n', '');
      lines.push(snippet);
    });
  } else {
    lines.push('library(geobr)\n');
    if (useLocalDb) lines.push(`set_local_db("/caminho/para/seus/parquets/")\n`);
    selectedDatasets.forEach(id => {
      const ds = dsById(id);
      if (!ds) return;
      const code = genR(ds, { year: ds.years.includes(year) ? year : ds.years[ds.years.length-1], simplified });
      const snippet = code.replace('library(geobr)\n\n', '');
      lines.push(snippet);
    });
  }

  $('cg-code-content').textContent = lines.join('\n');
}

on($('picker-search'), 'input', e => buildPickerList(e.target.value));
on($('cg-year'), 'change', updateCgCode);
on($('cg-simplified'), 'change', updateCgCode);
on($('cg-local-db'), 'change', updateCgCode);

on($('cg-lang-py'), 'click', () => {
  cgLang = 'python';
  $('cg-lang-py').classList.add('active'); $('cg-lang-r').classList.remove('active');
  updateCgCode();
});
on($('cg-lang-r'), 'click', () => {
  cgLang = 'r';
  $('cg-lang-r').classList.add('active'); $('cg-lang-py').classList.remove('active');
  updateCgCode();
});

on($('cg-copy-btn'), 'click', () => {
  copyText($('cg-code-content').textContent);
  $('cg-copy-btn').classList.add('copied');
  setTimeout(() => $('cg-copy-btn').classList.remove('copied'), 1500);
});

on($('cg-download-btn'), 'click', () => {
  const code = $('cg-code-content').textContent;
  const ext = cgLang === 'python' ? 'py' : 'R';
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `geobr_script.${ext}`;
  a.click(); URL.revokeObjectURL(url);
  showToast(`✓ Arquivo geobr_script.${ext} baixado!`, 'success');
});

// ── Lang toggle (topbar) ──────────────────────────────────────
on($('langToggle'), 'click', () => {
  currentLang = currentLang === 'python' ? 'r' : 'python';
  $('langLabel').textContent = currentLang === 'python' ? 'Python' : 'R';

  // Sync quick query lang tab
  document.querySelectorAll('.lang-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.lang === currentLang);
  });
  qqUpdateCode();
});

// ── Init ──────────────────────────────────────────────────────
buildPickerList();
qqUpdateCode();

// ═══════════════════════════════════════════════════════════════════
//  LAYER BUILDER MODULE  (geo_workspace → QGIS)
// ═══════════════════════════════════════════════════════════════════

const API_BASE = 'http://localhost:5050/api';
let lbSelectedLayers = new Set();
let lbFormat = 'gpkg';
let lbCurrentJobId = null;
let lbSseSource = null;
let lbApiOnline = false;

const CAT_COLORS = {
  migracao:'#22d3ee', assistencia:'#818cf8', economia:'#fbbf24',
  censo:'#a78bfa', transporte:'#34d399', base:'#94a3b8',
};

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '148,163,184';
}

async function lbCheckApi() {
  try {
    const r = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (r.ok) {
      lbApiOnline = true;
      document.getElementById('lb-api-dot').className = 'status-dot active';
      document.getElementById('lb-api-text').textContent = 'API online — servidor Layer Builder conectado';
      lbLoadLayers(); lbLoadOutputs();
    } else { throw new Error(); }
  } catch {
    lbApiOnline = false;
    document.getElementById('lb-api-dot').className = 'status-dot inactive';
    document.getElementById('lb-api-text').textContent = 'API offline — execute: python geo_workspace/layer_builder/api_server.py';
  }
}

async function lbLoadLayers() {
  try {
    const r = await fetch(`${API_BASE}/layers`);
    const data = await r.json();
    lbRenderLayerCards(data.layers || []);
  } catch {
    document.getElementById('lb-layers-grid').innerHTML = '<div style="color:var(--accent-rose);padding:12px;font-size:.84rem">Erro ao carregar camadas</div>';
  }
}

function lbRenderLayerCards(layers) {
  const grid = document.getElementById('lb-layers-grid');
  grid.innerHTML = '';
  layers.forEach(layer => {
    const color = CAT_COLORS[layer.category] || '#94a3b8';
    const lbl = document.createElement('label');
    lbl.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:8px;cursor:pointer;transition:all .18s ease;font-size:.83rem;color:var(--text-secondary)';
    lbl.innerHTML = `<input type="checkbox" style="accent-color:${color};width:14px;height:14px" data-lid="${layer.id}" /><span style="flex:1">${layer.label}</span><span style="font-size:.68rem;padding:2px 6px;border-radius:999px;background:rgba(${hexToRgb(color)},.12);color:${color};font-weight:600;white-space:nowrap">${layer.category}</span>`;
    const cb = lbl.querySelector('input');
    cb.addEventListener('change', () => {
      if (cb.checked) { lbSelectedLayers.add(layer.id); lbl.style.borderColor=color; lbl.style.background=`rgba(${hexToRgb(color)},.06)`; }
      else { lbSelectedLayers.delete(layer.id); lbl.style.borderColor='var(--border)'; lbl.style.background='var(--bg-elevated)'; }
      lbUpdateSummary();
    });
    grid.appendChild(lbl);
  });
  lbUpdateSummary();
}

function lbUpdateSummary() {
  const n = lbSelectedLayers.size;
  document.getElementById('lb-selection-summary').textContent = n === 0 ? 'Nenhuma camada selecionada' : `${n} camada${n>1?'s':''} selecionada${n>1?'s':''} -- formato: .${lbFormat}`;
  document.getElementById('lb-build-btn').disabled = n === 0 || !lbApiOnline;
}

document.getElementById('lb-select-all').addEventListener('click', () => document.querySelectorAll('#lb-layers-grid input').forEach(cb => { if (!cb.checked) cb.click(); }));
document.getElementById('lb-deselect-all').addEventListener('click', () => document.querySelectorAll('#lb-layers-grid input').forEach(cb => { if (cb.checked) cb.click(); }));

['lb-fmt-gpkg','lb-fmt-geojson','lb-fmt-shp'].forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    ['lb-fmt-gpkg','lb-fmt-geojson','lb-fmt-shp'].forEach(i => document.getElementById(i).classList.remove('active'));
    document.getElementById(id).classList.add('active');
    lbFormat = document.getElementById(id).dataset.fmt;
    lbUpdateSummary();
  });
});

document.getElementById('lb-build-btn').addEventListener('click', async () => {
  if (!lbApiOnline || lbSelectedLayers.size === 0) return;
  const layers = Array.from(lbSelectedLayers);
  const outDir = document.getElementById('lb-output-dir').value.trim() || undefined;
  document.getElementById('lb-log-console').textContent = 'Iniciando build...\n';
  document.getElementById('lb-build-progress').style.display = 'block';
  document.getElementById('lb-result-card').style.display = 'none';
  document.getElementById('lb-build-btn').disabled = true;
  lbSetProgress(5, 'Enviando job...');
  try {
    const body = { layers, format: lbFormat };
    if (outDir) body.output_dir = outDir;
    const resp = await fetch(`${API_BASE}/build`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
    const data = await resp.json();
    if (!data.job_id) throw new Error(data.error || 'Erro ao criar job');
    lbCurrentJobId = data.job_id;
    document.getElementById('lb-job-badge').textContent = `job: ${lbCurrentJobId}`;
    lbSetProgress(15, 'Job em execucao...');
    lbStreamLogs(lbCurrentJobId);
  } catch(e) {
    lbSetProgress(0, 'Erro: ' + e.message, true);
    document.getElementById('lb-build-btn').disabled = false;
  }
});

function lbSetProgress(pct, msg, error=false) {
  document.getElementById('lb-progress-bar').style.width = pct + '%';
  document.getElementById('lb-build-status').textContent = msg;
  const c = error ? 'var(--accent-rose)' : pct === 100 ? 'var(--accent-emerald)' : 'var(--accent-amber)';
  document.getElementById('lb-build-status').style.color = c;
  document.getElementById('lb-progress-dot').style.background = c;
}

function lbStreamLogs(jobId) {
  if (lbSseSource) lbSseSource.close();
  lbSseSource = new EventSource(`${API_BASE}/logs/${jobId}`);
  let lines = [], pct = 20;
  lbSseSource.onmessage = e => {
    if (e.data === '[BUILD COMPLETE]') { lbSseSource.close(); lbOnBuildComplete(jobId); return; }
    lines.push(e.data);
    const logEl = document.getElementById('lb-log-console');
    logEl.textContent = lines.join('\n');
    logEl.scrollTop = logEl.scrollHeight;
    if (e.data.includes('Building')) pct = Math.min(pct+8, 85);
    else if (e.data.includes('Salvo') || e.data.includes('success')) pct = Math.min(pct+5, 90);
    lbSetProgress(pct, `Processando... (${lines.length} linhas)`);
  };
  lbSseSource.onerror = () => { lbSseSource.close(); lbOnBuildComplete(jobId); };
}

async function lbOnBuildComplete(jobId) {
  lbSetProgress(95, 'Finalizando...');
  await new Promise(r => setTimeout(r, 800));
  try {
    const r = await fetch(`${API_BASE}/status/${jobId}`);
    const job = await r.json();
    if (job.status === 'done') {
      lbSetProgress(100, `Build concluido -- ${job.summary && job.summary.succeeded || '?'} camadas geradas`);
      lbShowResult(job.summary);
    } else { lbSetProgress(100, 'Build falhou -- veja o log', true); }
  } catch { lbSetProgress(100, 'Build concluido (verifique outputs)'); }
  document.getElementById('lb-build-btn').disabled = false;
  lbLoadOutputs();
}

function lbShowResult(summary) {
  if (!summary) return;
  const ok = summary.succeeded || 0, fail = summary.failed || 0;
  document.getElementById('lb-result-title').textContent = `${ok > 0 ? 'OK' : 'FALHA'} -- ${ok} camadas geradas, ${fail} falha(s)`;
  let html = `<div style="text-align:center;padding:12px;background:var(--bg-elevated);border-radius:8px"><div style="font-size:1.8rem;font-weight:700;color:var(--accent-emerald)">${ok}</div><div style="font-size:.78rem;color:var(--text-muted);margin-top:2px">Geradas</div></div><div style="text-align:center;padding:12px;background:var(--bg-elevated);border-radius:8px"><div style="font-size:1.8rem;font-weight:700;color:${fail>0?'var(--accent-rose)':'var(--text-muted)'}">${fail}</div><div style="font-size:.78rem;color:var(--text-muted);margin-top:2px">Falhas</div></div><div style="text-align:center;padding:12px;background:var(--bg-elevated);border-radius:8px"><div style="font-size:1.1rem;font-weight:700;color:var(--accent-cyan);font-family:monospace">.${lbFormat}</div><div style="font-size:.78rem;color:var(--text-muted);margin-top:2px">Formato</div></div>`;
  if (summary.layers && summary.layers.length) {
    const rows = summary.layers.map(l => `<div style="display:flex;align-items:center;gap:8px;font-size:.8rem;padding:4px 0"><span style="color:${l.success?'var(--accent-emerald)':'var(--accent-rose)'};font-weight:700;width:14px">${l.success?'OK':'ERR'}</span><span style="flex:1;color:var(--text-secondary)">${l.layer_id}</span><span style="color:var(--text-muted)">${l.features} feicoes</span><span style="color:var(--text-muted)">${l.duration_s}s</span></div>`).join('');
    html += `<div style="grid-column:1/-1;padding:12px;background:var(--bg-elevated);border-radius:8px">${rows}</div>`;
  }
  document.getElementById('lb-result-stats').innerHTML = html;
  document.getElementById('lb-result-card').style.display = 'block';
}

async function lbLoadOutputs() {
  const tbody = document.getElementById('lb-files-tbody');
  try {
    const r = await fetch(`${API_BASE}/outputs`);
    const data = await r.json();
    const files = data.files || [];
    if (!files.length) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:24px">Nenhum arquivo gerado ainda</td></tr>'; return; }
    const extC = { gpkg:'#22d3ee', geojson:'#fbbf24', shp:'#a78bfa' };
    tbody.innerHTML = files.map(f => `<tr><td><strong>${f.name}</strong></td><td><span style="font-family:monospace;color:${extC[f.ext]||'#94a3b8'};font-size:.8rem">.${f.ext}</span></td><td style="color:var(--text-secondary)">${f.size_mb} MB</td><td style="color:var(--text-muted);font-size:.8rem">${new Date(f.modified).toLocaleString('pt-BR')}</td><td><a href="${API_BASE}/download/${f.name}" class="btn-icon" download style="text-decoration:none;font-size:.75rem">Download</a></td></tr>`).join('');
  } catch { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:16px">API offline</td></tr>'; }
}

document.getElementById('lb-log-copy').addEventListener('click', () => { navigator.clipboard.writeText(document.getElementById('lb-log-console').textContent); });
document.getElementById('lb-refresh-outputs').addEventListener('click', lbLoadOutputs);
document.getElementById('lb-check-api').addEventListener('click', lbCheckApi);

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => { if (btn.dataset.panel === 'layer-builder') setTimeout(lbCheckApi, 80); });
});

const _lbStyle = document.createElement('style');
_lbStyle.textContent = '@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}';
document.head.appendChild(_lbStyle);
