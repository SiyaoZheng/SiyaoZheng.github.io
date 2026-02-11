// ═══════════════════════════════════════════════════════════════════
// Social Cleavages — RA Coding Tracker (Google Apps Script)
// Storage: PropertiesService (no OAuth scopes required)
//
// Deployed via clasp. Script ID: 1YsWC3mqy0u7ST0Kv2kXOSQeIBYVa3F2WkV2rJdd31K85Xog0UwLPKcLR
// URL: https://script.google.com/macros/s/AKfycbyaNy_KfdXPbu827r5g-EZRIVdK8DvVtjgIRFv5jySRsTS-_HP1fH2Ffd4tEgR9y82LQw/exec
// ═══════════════════════════════════════════════════════════════════

var CHUNK_SIZE = 20;   // events per property chunk (kept under 9KB limit)
var MAX_CHUNKS = 50;   // ~1000 events max before circular overwrite

function doGet(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  if (p.action === 'fetch_data') return fetchData(p);
  if (p.action === 'clear_data') return clearData(p);
  return recordBeacon(p);
}

// ── Beacon auth: djb2 hash with 5-min rotating window ──
function validBeacon(p) {
  var token = p._k || '';
  if (!token) return false;
  var now = Math.floor(new Date().getTime() / 300000);
  for (var d = -1; d <= 1; d++) {
    var h = 5381, s = 'sc2026b' + (now + d);
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    if ((h >>> 0).toString(36) === token) return true;
  }
  return false;
}

// ── Record one beacon event ──
function recordBeacon(p) {
  if (!validBeacon(p)) {
    return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
  }
  try {
    var props = PropertiesService.getScriptProperties();
    var meta = JSON.parse(props.getProperty('_meta') || '{"chunk":0,"idx":0,"total":0}');

    var evt = {
      ts: new Date().toISOString(),
      et: p.et || '', ra: p.ra || '', sv: p.sv || '',
      vi: p.vi || '', dm: p.dm || '', cn: p.cn || '',
      vm: p.vm || '', si: p.si || '',
      cc: p.cc || '', tv: p.tv || '',
      rt: p.rt || '', oa: p.oa || ''
    };

    var key = 'e_' + meta.chunk;
    var chunk = JSON.parse(props.getProperty(key) || '[]');
    chunk.push(evt);

    if (chunk.length >= CHUNK_SIZE) {
      props.setProperty(key, JSON.stringify(chunk));
      meta.chunk = (meta.chunk + 1) % MAX_CHUNKS;
      meta.idx = 0;
      // Clear next chunk if wrapping around
      props.setProperty('e_' + meta.chunk, '[]');
    } else {
      props.setProperty(key, JSON.stringify(chunk));
      meta.idx = chunk.length;
    }
    meta.total = Math.min(meta.total + 1, MAX_CHUNKS * CHUNK_SIZE);
    props.setProperty('_meta', JSON.stringify(meta));
  } catch (err) {
    // Silent — never break the coding app
  }
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ── Fetch all stored events (JSONP) ──
function fetchData(p) {
  var cb = p.cb || '';
  if ((p.pw || '') !== 'cleavages2026') {
    return wrap(cb, { error: 'unauthorized' });
  }
  try {
    var props = PropertiesService.getScriptProperties();
    var meta = JSON.parse(props.getProperty('_meta') || '{"chunk":0,"idx":0,"total":0}');
    var events = [];
    for (var i = 0; i < MAX_CHUNKS; i++) {
      var chunk = JSON.parse(props.getProperty('e_' + i) || '[]');
      for (var j = 0; j < chunk.length; j++) {
        var r = chunk[j];
        events.push({
          server_ts: r.ts, event_type: r.et, ra: r.ra,
          survey: r.sv, var_id: r.vi, dimension: r.dm,
          concept: r.cn, view_ms: r.vm, session_id: r.si,
          coded_count: r.cc, total_vars: r.tv,
          retest: r.rt, original_answer: r.oa
        });
      }
    }
    return wrap(cb, { events: events, meta: meta });
  } catch (err) {
    return wrap(cb, { error: err.message });
  }
}

// ── Clear stored events (for dashboard archive-and-clear) ──
function clearData(p) {
  var cb = p.cb || '';
  if ((p.pw || '') !== 'cleavages2026') {
    return wrap(cb, { error: 'unauthorized' });
  }
  try {
    var props = PropertiesService.getScriptProperties();
    props.deleteAllProperties();
    props.setProperty('_meta', '{"chunk":0,"idx":0,"total":0}');
    return wrap(cb, { status: 'cleared' });
  } catch (err) {
    return wrap(cb, { error: err.message });
  }
}

// ── JSONP wrapper ──
function wrap(cb, data) {
  var json = JSON.stringify(data);
  if (cb && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(cb)) {
    return ContentService.createTextOutput(cb + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
