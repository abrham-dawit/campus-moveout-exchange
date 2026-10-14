// MoveOut Market — listings live in localStorage in this demo version.
const KEY = "moveout-market-listings-v1";

// Sample listings ship with the demo so the board isn't empty.
// They are clearly labeled SAMPLE in the UI and in this data.
const SAMPLES = [
  { id: "s1", sample: true, title: "IKEA MALM desk + chair", category: "Furniture", price: 40,
    condition: "Good", seller: "Sample Seller", contact: "sample@school.edu", verified: true,
    desc: "Sample listing. Sturdy desk, one small scratch on top. Pickup near dorms, must go by Friday.",
    ts: Date.now() - 86400000 * 2 },
  { id: "s2", sample: true, title: "Mini fridge (works great)", category: "Electronics", price: 55,
    condition: "Good", seller: "Sample Seller", contact: "sample@school.edu", verified: true,
    desc: "Sample listing. Clean, cold, perfect dorm size. I graduate this month so it's priced to move.",
    ts: Date.now() - 86400000 },
  { id: "s3", sample: true, title: "CSE textbooks bundle", category: "Books", price: 30,
    condition: "Fair", seller: "Sample Seller", contact: "sample@school.edu", verified: false,
    desc: "Sample listing. Algorithms + discrete math books, some highlighting, all pages there.",
    ts: Date.now() - 3600000 * 5 },
  { id: "s4", sample: true, title: "Free moving boxes (10)", category: "Other", price: 0,
    condition: "Good", seller: "Sample Seller", contact: "sample@school.edu", verified: true,
    desc: "Sample listing. Free — just come get them. Broken down and stacked by the door.",
    ts: Date.now() - 3600000 },
];

function loadListings() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* fall through to samples */ }
  localStorage.setItem(KEY, JSON.stringify(SAMPLES));
  return [...SAMPLES];
}

function saveListings(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

let listings = loadListings();
const grid = document.getElementById("listingGrid");
const emptyNote = document.getElementById("emptyNote");
const countEl = document.getElementById("count");

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function render() {
  const q = document.getElementById("searchBox").value.trim().toLowerCase();
  const cat = document.getElementById("catFilter").value;
  const sort = document.getElementById("sortBy").value;
  const vOnly = document.getElementById("verifiedOnly").checked;

  let view = listings.filter(l =>
    (cat === "all" || l.category === cat) &&
    (!vOnly || l.verified) &&
    (!q || (l.title + " " + l.desc + " " + l.category).toLowerCase().includes(q))
  );
  if (sort === "low") view.sort((a, b) => a.price - b.price);
  if (sort === "high") view.sort((a, b) => b.price - a.price);
  if (sort === "new") view.sort((a, b) => b.ts - a.ts);

  countEl.textContent = `— ${view.length} listing${view.length === 1 ? "" : "s"}`;
  emptyNote.hidden = view.length > 0;

  grid.innerHTML = view.map(l => `
    <article class="listing-card">
      <div class="listing-top">
        <h4>${esc(l.title)}</h4>
        <span class="price">${l.price === 0 ? "FREE" : "$" + l.price}</span>
      </div>
      ${l.sample ? '<span class="sample-tag">Sample listing</span>' : ""}
      <span class="meta">${esc(l.category)} · ${esc(l.condition)} · by ${esc(l.seller)}
        ${l.verified ? '<span class="badge">✓ Verified student</span>' : ""}</span>
      <p class="desc">${esc(l.desc || "")}</p>
      <div class="card-actions">
        <button class="btn-small" data-contact="${l.id}">Contact seller</button>
        ${l.sample ? "" : `<button class="btn-small btn-ghost" data-remove="${l.id}">Remove</button>`}
      </div>
      <div class="contact-box" id="contact-${l.id}" hidden>
        Reach ${esc(l.seller)} at <strong>${esc(l.contact)}</strong>.<br>
        Meet somewhere public on campus for the swap.
      </div>
    </article>`).join("");

  grid.querySelectorAll("[data-contact]").forEach(btn => {
    btn.addEventListener("click", () => {
      const box = document.getElementById("contact-" + btn.dataset.contact);
      box.hidden = !box.hidden;
    });
  });
  grid.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      listings = listings.filter(l => l.id !== btn.dataset.remove);
      saveListings(listings);
      render();
    });
  });
}

document.getElementById("listingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const item = {
    id: "u" + Date.now(),
    sample: false,
    title: document.getElementById("fTitle").value.trim(),
    category: document.getElementById("fCategory").value,
    price: Number(document.getElementById("fPrice").value),
    condition: document.getElementById("fCondition").value,
    seller: document.getElementById("fSeller").value.trim(),
    contact: document.getElementById("fContact").value.trim(),
    verified: document.getElementById("fVerified").checked,
    desc: document.getElementById("fDesc").value.trim(),
    ts: Date.now(),
  };
  listings.unshift(item);
  saveListings(listings);
  e.target.reset();
  document.getElementById("formMsg").textContent = "Posted! Your listing is in the Browse section below.";
  render();
});

["searchBox", "catFilter", "sortBy", "verifiedOnly"].forEach(id => {
  document.getElementById(id).addEventListener("input", render);
  document.getElementById(id).addEventListener("change", render);
});

render();
