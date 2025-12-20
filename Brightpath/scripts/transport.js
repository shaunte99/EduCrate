// Transport prototype JS
// - Uses Google Maps if available (API key). If not available, uses a simulated canvas-like map and simulated movement.
// - Start Trip button simulates a driver moving along a route (array of coords).
// - Transport request form uses mailto for demo and shows a confirmation message.

// Basic helpers
const $ = sel => document.querySelector(sel);
const $all = sel => Array.from(document.querySelectorAll(sel));

let map, driverMarker, pickupMarker, dropMarker;
let routeCoords = []; // will be filled with lat/lng objects for simulation
let simInterval = null;
let simIndex = 0;
let simSpeedMs = 900; // smaller is faster

// Default demo route around Johannesburg area (few coordinates) - replace with real route if you want
const DEMO_ROUTE = [
  { lat: -26.1453, lng: 27.9029 },
  { lat: -26.1440, lng: 27.9050 },
  { lat: -26.1422, lng: 27.9068 },
  { lat: -26.1395, lng: 27.9092 },
  { lat: -26.1370, lng: 27.9115 },
  { lat: -26.1350, lng: 27.9140 },
];

// Initialize map: prefer Google Maps if available
function initMapIfReady() {
  if (window.google && google.maps) {
    try {
      const center = DEMO_ROUTE[0];
      map = new google.maps.Map(document.getElementById('map'), {
        center,
        zoom: 14,
        disableDefaultUI: false,
      });

      // markers
      driverMarker = new google.maps.Marker({ position: center, map, title: 'Driver' });
      pickupMarker = new google.maps.Marker({ position: DEMO_ROUTE[0], map, title: 'Pickup', icon: { path: google.maps.SymbolPath.CIRCLE, scale:8, fillColor: '#ffd24c', fillOpacity:1, strokeWeight:0 }});
      dropMarker = new google.maps.Marker({ position: DEMO_ROUTE[DEMO_ROUTE.length -1], map, title: 'Dropoff', icon: { path: google.maps.SymbolPath.CIRCLE, scale:8, fillColor: '#4caf50', fillOpacity:1, strokeWeight:0 }});

      // route polyline
      const routeLine = new google.maps.Polyline({
        path: DEMO_ROUTE,
        geodesic: true,
        strokeColor: '#7ec8e3',
        strokeOpacity: 0.7,
        strokeWeight: 4,
      });
      routeLine.setMap(map);

      routeCoords = DEMO_ROUTE.slice();
      setDriverInfo('T. Mokoena', 'Toyota Quantum', 'BXY 123 GP');
    } catch (e) {
      console.warn('Google maps init failed, falling back to simulation', e);
      fallbackInit();
    }
  } else {
    fallbackInit();
  }
}

// Fallback: create a simple simulated map area (we won't draw a real map, but simulate movement)
function fallbackInit() {
  const mapEl = document.getElementById('map');
  mapEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;">Map simulation active (no Google API key)</div>';
  routeCoords = DEMO_ROUTE.slice();
  setDriverInfo('T. Mokoena', 'Toyota Quantum', 'BXY 123 GP');
  // create "driver" visual using absolute positioned element inside the map (simple)
  const fakeMarker = document.createElement('div');
  fakeMarker.id = 'fakeDriver';
  fakeMarker.style.position = 'absolute';
  fakeMarker.style.width = '18px';
  fakeMarker.style.height = '18px';
  fakeMarker.style.borderRadius = '50%';
  fakeMarker.style.background = '#007ea7';
  fakeMarker.style.left = '10px';
  fakeMarker.style.top = '10px';
  fakeMarker.style.boxShadow = '0 6px 14px rgba(0,0,0,0.12)';
  mapEl.style.position = 'relative';
  mapEl.appendChild(fakeMarker);
  driverMarker = fakeMarker;
  pickupMarker = null;
  dropMarker = null;
}

// Update driver card info
function setDriverInfo(name, vehicle, reg) {
  $('#driver-name').textContent = `Driver: ${name}`;
  document.querySelector('.driver-meta').textContent = `Vehicle: ${vehicle} · Reg: ${reg}`;
}

// Utility to compute approx distance between two lat/lng (haversine)
function haversine(a, b) {
  const R = 6371; // km
  const toRad = v => v * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDlat = Math.sin(dLat/2);
  const sinDlon = Math.sin(dLon/2);
  const A = sinDlat*sinDlat + sinDlon*sinDlon * Math.cos(lat1)*Math.cos(lat2);
  const C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1-A));
  return R * C; // km
}

// Simulate movement along routeCoords
function startSimulation() {
  if (!routeCoords || routeCoords.length === 0) return;
  simIndex = 0;
  appendLog(`Trip started at ${new Date().toLocaleTimeString()}`);
  $('#eta-val').textContent = 'calculating...';
  $('#distance-val').textContent = '—';

  if (simInterval) clearInterval(simInterval);
  simInterval = setInterval(() => {
    // move marker to routeCoords[simIndex]
    const pos = routeCoords[simIndex];
    if (driverMarker instanceof HTMLElement) {
      // fake map: move absolute marker by percentage across map box
      const mapRect = document.getElementById('map').getBoundingClientRect();
      // compute a simple mapping from lat/lng to box coords (for demo only)
      const pct = simIndex / (routeCoords.length - 1);
      driverMarker.style.left = `${10 + pct * (mapRect.width - 40)}px`;
      driverMarker.style.top = `${10 + (1 - pct) * (mapRect.height - 40)}px`;
    } else if (window.google && google.maps && driverMarker.setPosition) {
      const gpos = new google.maps.LatLng(pos.lat, pos.lng);
      driverMarker.setPosition(gpos);
      map.panTo(gpos);
    }

    // update ETA and distance to final point
    const last = routeCoords[routeCoords.length - 1];
    const remainingKm = haversine(pos, last);
    $('#distance-val').textContent = (remainingKm).toFixed(2) + ' km';
    const etaMin = Math.max(1, Math.round((remainingKm / 30) * 60)); // assume avg 30 km/h for demo
    $('#eta-val').textContent = `${etaMin} min`;

    appendLog(`Driver at ${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)} — ${remainingKm.toFixed(2)} km left`);

    simIndex++;
    if (simIndex >= routeCoords.length) {
      stopSimulation(true);
    }
  }, simSpeedMs);
}

// stop simulation
function stopSimulation(finished=false) {
  if (simInterval) {
    clearInterval(simInterval);
    simInterval = null;
  }
  appendLog(finished ? `Trip ended at ${new Date().toLocaleTimeString()}` : `Trip stopped at ${new Date().toLocaleTimeString()}`);
  $('#eta-val').textContent = '—';
  // if finished show final distance
  if (finished) $('#distance-val').textContent = 'Arrived';
}

// append to trip log
function appendLog(text) {
  const ul = $('#tripLog');
  const li = document.createElement('li');
  li.textContent = `${new Date().toLocaleTimeString()} — ${text}`;
  ul.prepend(li);
  // cap logs
  while (ul.children.length > 30) ul.removeChild(ul.lastChild);
}

// attach ui handlers
function attachHandlers(){
  $('#startTripBtn').addEventListener('click', () => {
    // if already running, ignore
    if (simInterval) return;
    startSimulation();
  });

  $('#stopTripBtn').addEventListener('click', () => {
    stopSimulation(false);
  });

  // transport request form
  $('#transportRequestForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const service = $('#serviceType').value;
    const pickup = $('#pickup').value.trim();
    const dropoff = $('#dropoff').value.trim();
    const date = $('#tripDate').value;
    const time = $('#tripTime').value;
    const student = $('#studentName').value.trim();
    const phone = $('#parentPhone').value.trim();

    if (!pickup || !dropoff || !date || !time || !student || !phone) {
      $('#requestMessage').textContent = 'Please fill all fields.';
      $('#requestMessage').style.color = 'crimson';
      return;
    }

    // mailto content
    const subject = encodeURIComponent('BrightPath Transport Request');
    const body = encodeURIComponent(
      `Service: ${service}\nPickup: ${pickup}\nDropoff: ${dropoff}\nDate: ${date}\nTime: ${time}\nStudent: ${student}\nPhone: ${phone}\n\nPlease contact me to confirm.`
    );
    const mailto = `mailto:brightpathaftercare@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailto, '_blank');

    $('#requestMessage').textContent = 'Request created. Check your email to confirm.';
    $('#requestMessage').style.color = '#007ea7';

    // reset form lightly
    setTimeout(()=> {
      $('#transportRequestForm').reset();
    }, 600);
  });
}

// init on load
window.addEventListener('load', () => {
  initMapIfReady();
  attachHandlers();
});
