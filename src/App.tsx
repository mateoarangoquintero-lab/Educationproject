import { useState, useMemo } from "react";
import "./styles.css";

type Country = "NZ" | "AU" | "CO";
type Trend = "Rising" | "Stable" | "Falling";

interface Pathway {
  id: string;
  name: string;
  anzsco: string;
  isco: string;
  nzsced: string;
  country: Country;
  skillLevel: string;
  medianSalary: number;
  trueCost: string;
  demandTrend: number[];
  demandLabel: Trend;
  economic: number;
  hireability: number;
  network: number;
}

const STRIPE_LINK = "https://buy.stripe.com/test_28EdR25B85H2co188qgQE00";

const PATHWAYS: Pathway[] = [
  // ===== NEW ZEALAND =====
  { id: "elec-nz", name: "Electrician", anzsco: "341111", isco: "7411", nzsced: "031505", country: "NZ", skillLevel: "Skill level 3", medianSalary: 84000, trueCost: "~$8k (earn while training)", demandTrend: [70,74,78,82,86,90], demandLabel: "Rising", economic: 82, hireability: 90, network: 70 },
  { id: "plum-nz", name: "Plumber", anzsco: "334111", isco: "7126", nzsced: "040311", country: "NZ", skillLevel: "Skill level 3", medianSalary: 90000, trueCost: "~$6k (earn while training)", demandTrend: [72,76,80,84,88,92], demandLabel: "Rising", economic: 85, hireability: 88, network: 68 },
  { id: "carp-nz", name: "Carpenter", anzsco: "331212", isco: "7115", nzsced: "040321", country: "NZ", skillLevel: "Skill level 3", medianSalary: 75000, trueCost: "~$5k (earn while training)", demandTrend: [64,68,71,73,74,76], demandLabel: "Rising", economic: 76, hireability: 84, network: 64 },
  { id: "nurse-nz", name: "Registered Nurse", anzsco: "254411", isco: "2221", nzsced: "060301", country: "NZ", skillLevel: "Skill level 1", medianSalary: 83000, trueCost: "$32k + 3 yrs study", demandTrend: [74,78,82,86,90,94], demandLabel: "Rising", economic: 72, hireability: 95, network: 75 },
  { id: "swe-nz", name: "Software Engineer", anzsco: "261313", isco: "2512", nzsced: "020113", country: "NZ", skillLevel: "Skill level 1", medianSalary: 110000, trueCost: "$30k + 3 yrs study", demandTrend: [98,102,104,102,100,101], demandLabel: "Stable", economic: 92, hireability: 68, network: 82 },
  { id: "data-nz", name: "Data Analyst", anzsco: "224999", isco: "2529", nzsced: "020305", country: "NZ", skillLevel: "Skill level 1", medianSalary: 95000, trueCost: "$30k + 3 yrs study", demandTrend: [72,80,86,92,98,104], demandLabel: "Rising", economic: 88, hireability: 82, network: 74 },
  { id: "teach-nz", name: "Secondary Teacher", anzsco: "241411", isco: "2330", nzsced: "070101", country: "NZ", skillLevel: "Skill level 1", medianSalary: 75000, trueCost: "$34k + 4 yrs study", demandTrend: [66,70,74,78,82,85], demandLabel: "Rising", economic: 60, hireability: 82, network: 65 },
  { id: "acc-nz", name: "Accountant", anzsco: "221111", isco: "2411", nzsced: "080101", country: "NZ", skillLevel: "Skill level 1", medianSalary: 85000, trueCost: "$28k + 3 yrs study", demandTrend: [74,76,78,79,80,81], demandLabel: "Stable", economic: 76, hireability: 72, network: 78 },
  { id: "civil-nz", name: "Civil Engineer", anzsco: "233211", isco: "2142", nzsced: "031303", country: "NZ", skillLevel: "Skill level 1", medianSalary: 100000, trueCost: "$40k + 4 yrs study", demandTrend: [78,82,85,88,91,94], demandLabel: "Rising", economic: 86, hireability: 86, network: 78 },
  { id: "chef-nz", name: "Chef", anzsco: "351311", isco: "3434", nzsced: "110101", country: "NZ", skillLevel: "Skill level 3", medianSalary: 62000, trueCost: "~$10k + apprenticeship", demandTrend: [58,60,62,63,64,66], demandLabel: "Stable", economic: 55, hireability: 78, network: 60 },
  { id: "pharm-nz", name: "Pharmacist", anzsco: "251513", isco: "2262", nzsced: "060501", country: "NZ", skillLevel: "Skill level 1", medianSalary: 85000, trueCost: "$45k + 4 yrs study", demandTrend: [70,71,71,70,70,69], demandLabel: "Stable", economic: 68, hireability: 74, network: 70 },
  { id: "mech-nz", name: "Motor Mechanic", anzsco: "321211", isco: "7231", nzsced: "030701", country: "NZ", skillLevel: "Skill level 3", medianSalary: 68000, trueCost: "~$5k (earn while training)", demandTrend: [60,62,64,65,66,68], demandLabel: "Rising", economic: 62, hireability: 80, network: 58 },

  // ===== AUSTRALIA =====
  { id: "elec-au", name: "Electrician", anzsco: "341111", isco: "7411", nzsced: "031505", country: "AU", skillLevel: "Skill level 3", medianSalary: 100000, trueCost: "AU$8k (earn while training)", demandTrend: [76,80,84,88,92,96], demandLabel: "Rising", economic: 86, hireability: 90, network: 70 },
  { id: "plum-au", name: "Plumber", anzsco: "334111", isco: "7126", nzsced: "040311", country: "AU", skillLevel: "Skill level 3", medianSalary: 95000, trueCost: "AU$6k (earn while training)", demandTrend: [74,78,82,86,90,94], demandLabel: "Rising", economic: 84, hireability: 88, network: 68 },
  { id: "carp-au", name: "Carpenter", anzsco: "331212", isco: "7115", nzsced: "040321", country: "AU", skillLevel: "Skill level 3", medianSalary: 80000, trueCost: "AU$5k (earn while training)", demandTrend: [66,69,72,74,76,78], demandLabel: "Rising", economic: 76, hireability: 84, network: 64 },
  { id: "nurse-au", name: "Registered Nurse", anzsco: "254418", isco: "2221", nzsced: "060301", country: "AU", skillLevel: "Skill level 1", medianSalary: 85000, trueCost: "AU$34k + 3 yrs study", demandTrend: [76,80,84,88,92,96], demandLabel: "Rising", economic: 74, hireability: 95, network: 76 },
  { id: "swe-au", name: "Software Engineer", anzsco: "261313", isco: "2512", nzsced: "020113", country: "AU", skillLevel: "Skill level 1", medianSalary: 120000, trueCost: "AU$35k + 3 yrs study", demandTrend: [100,104,106,104,103,104], demandLabel: "Stable", economic: 94, hireability: 72, network: 84 },
  { id: "data-au", name: "Data Scientist", anzsco: "224999", isco: "2529", nzsced: "020305", country: "AU", skillLevel: "Skill level 1", medianSalary: 122000, trueCost: "AU$35k + 3 yrs study", demandTrend: [78,86,94,100,106,112], demandLabel: "Rising", economic: 92, hireability: 84, network: 76 },
  { id: "civil-au", name: "Civil Engineer", anzsco: "233211", isco: "2142", nzsced: "031303", country: "AU", skillLevel: "Skill level 1", medianSalary: 115000, trueCost: "AU$40k + 4 yrs study", demandTrend: [80,84,87,90,93,96], demandLabel: "Rising", economic: 88, hireability: 86, network: 80 },
  { id: "eleceng-au", name: "Electrical Engineer", anzsco: "233311", isco: "2151", nzsced: "031303", country: "AU", skillLevel: "Skill level 1", medianSalary: 133000, trueCost: "AU$40k + 4 yrs study", demandTrend: [82,86,89,92,95,98], demandLabel: "Rising", economic: 90, hireability: 84, network: 80 },
  { id: "acc-au", name: "Accountant", anzsco: "221111", isco: "2411", nzsced: "080101", country: "AU", skillLevel: "Skill level 1", medianSalary: 95000, trueCost: "AU$30k + 3 yrs study", demandTrend: [74,76,78,79,80,81], demandLabel: "Stable", economic: 78, hireability: 74, network: 80 },
  { id: "teach-au", name: "Primary School Teacher", anzsco: "241213", isco: "2341", nzsced: "070101", country: "AU", skillLevel: "Skill level 1", medianSalary: 82000, trueCost: "AU$34k + 4 yrs study", demandTrend: [68,72,75,78,80,82], demandLabel: "Rising", economic: 64, hireability: 84, network: 66 },
  { id: "chef-au", name: "Chef", anzsco: "351311", isco: "3434", nzsced: "110101", country: "AU", skillLevel: "Skill level 3", medianSalary: 68000, trueCost: "AU$10k + apprenticeship", demandTrend: [58,60,62,63,64,66], demandLabel: "Stable", economic: 55, hireability: 78, network: 60 },
  { id: "mining-au", name: "Mining Engineer", anzsco: "233611", isco: "2146", nzsced: "031303", country: "AU", skillLevel: "Skill level 1", medianSalary: 150000, trueCost: "AU$40k + 4 yrs study", demandTrend: [88,92,96,100,104,108], demandLabel: "Rising", economic: 96, hireability: 82, network: 78 },

  // ===== COLOMBIA =====
  { id: "elec-co", name: "Electrician", anzsco: "—", isco: "7411", nzsced: "031505", country: "CO", skillLevel: "ISCO skill level 2", medianSalary: 30000000, trueCost: "COP ~4M + técnico (SENA)", demandTrend: [60,63,66,68,70,72], demandLabel: "Rising", economic: 55, hireability: 82, network: 58 },
  { id: "plum-co", name: "Plumber", anzsco: "—", isco: "7126", nzsced: "040311", country: "CO", skillLevel: "ISCO skill level 2", medianSalary: 28000000, trueCost: "COP ~3M + técnico", demandTrend: [58,60,62,63,64,66], demandLabel: "Stable", economic: 52, hireability: 78, network: 55 },
  { id: "carp-co", name: "Carpenter", anzsco: "—", isco: "7115", nzsced: "040321", country: "CO", skillLevel: "ISCO skill level 2", medianSalary: 26000000, trueCost: "COP ~3M + técnico", demandTrend: [56,57,58,59,60,61], demandLabel: "Stable", economic: 48, hireability: 74, network: 52 },
  { id: "nurse-co", name: "Registered Nurse", anzsco: "—", isco: "2221", nzsced: "060301", country: "CO", skillLevel: "ISCO skill level 3", medianSalary: 36000000, trueCost: "COP ~40M + 4–5 yrs", demandTrend: [64,67,70,73,76,79], demandLabel: "Rising", economic: 58, hireability: 88, network: 66 },
  { id: "swe-co", name: "Software Engineer", anzsco: "—", isco: "2512", nzsced: "020113", country: "CO", skillLevel: "ISCO skill level 4", medianSalary: 60000000, trueCost: "COP ~50M + 5 yrs", demandTrend: [80,90,100,110,120,130], demandLabel: "Rising", economic: 82, hireability: 80, network: 78 },
  { id: "data-co", name: "Data Analyst", anzsco: "—", isco: "2529", nzsced: "020305", country: "CO", skillLevel: "ISCO skill level 4", medianSalary: 54000000, trueCost: "COP ~50M + 5 yrs", demandTrend: [72,82,92,102,112,122], demandLabel: "Rising", economic: 78, hireability: 80, network: 72 },
  { id: "teach-co", name: "Secondary Teacher", anzsco: "—", isco: "2330", nzsced: "070101", country: "CO", skillLevel: "ISCO skill level 4", medianSalary: 30000000, trueCost: "COP ~40M + licenciatura", demandTrend: [58,60,62,63,64,65], demandLabel: "Stable", economic: 48, hireability: 78, network: 60 },
  { id: "acc-co", name: "Accountant", anzsco: "—", isco: "2411", nzsced: "080101", country: "CO", skillLevel: "ISCO skill level 4", medianSalary: 36000000, trueCost: "COP ~40M + 5 yrs", demandTrend: [66,68,70,71,72,73], demandLabel: "Stable", economic: 62, hireability: 76, network: 74 },
  { id: "civil-co", name: "Civil Engineer", anzsco: "—", isco: "2142", nzsced: "031303", country: "CO", skillLevel: "ISCO skill level 4", medianSalary: 36000000, trueCost: "COP ~50M + 5 yrs", demandTrend: [68,70,72,74,76,78], demandLabel: "Rising", economic: 66, hireability: 82, network: 72 },
  { id: "eleceng-co", name: "Electrical Engineer", anzsco: "—", isco: "2151", nzsced: "031303", country: "CO", skillLevel: "ISCO skill level 4", medianSalary: 39000000, trueCost: "COP ~50M + 5 yrs", demandTrend: [70,72,74,76,78,80], demandLabel: "Rising", economic: 70, hireability: 82, network: 74 },
  { id: "chef-co", name: "Chef", anzsco: "—", isco: "3434", nzsced: "110101", country: "CO", skillLevel: "ISCO skill level 3", medianSalary: 24000000, trueCost: "COP ~10M + técnico", demandTrend: [54,56,58,59,60,62], demandLabel: "Stable", economic: 44, hireability: 74, network: 56 },
  { id: "pharm-co", name: "Pharmacist", anzsco: "—", isco: "2262", nzsced: "060501", country: "CO", skillLevel: "ISCO skill level 4", medianSalary: 42000000, trueCost: "COP ~50M + 5 yrs", demandTrend: [64,66,67,68,69,70], demandLabel: "Stable", economic: 66, hireability: 76, network: 68 },
];

function fmtSalary(p: Pathway) {
  if (p.country === "CO") return `COP ${Math.round(p.medianSalary / 1000000)}M`;
  const cur = p.country === "NZ" ? "NZ$" : "AU$";
  return `${cur}${Math.round(p.medianSalary / 1000)}k`;
}

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const w = 260, h = 64, pad = 6;
  const min = Math.min(...data), max = Math.max(...data), rng = max - min || 1;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - 2 * pad);
    const y = h - pad - ((v - min) / rng) * (h - 2 * pad);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="64" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={up ? "#22D3A0" : "#E2685C"} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CapitalBars({ p }: { p: Pathway }) {
  const rows: [string, number][] = [["Economic", p.economic], ["Hireability", p.hireability], ["Network", p.network]];
  return (
    <>
      {rows.map(([label, val]) => (
        <div className="cap" key={label}>
          <div className="cap-row"><span>{label}</span><b>{val}</b></div>
          <div className="bar"><i style={{ width: `${val}%` }} /></div>
        </div>
      ))}
    </>
  );
}

function PathwayDetail({ p, onBack }: { p: Pathway; onBack: () => void }) {
  const up = p.demandLabel !== "Falling";
  return (
    <div className="detail-page">
      <button className="back" onClick={onBack}>← Back to all pathways</button>
      <div className="card">
        <div className="chead">
          <div>
            <h2>{p.name}</h2>
            <div className="codes">
              {p.country === "CO"
                ? <span className="badge a">CNO —</span>
                : <span className="badge a">ANZSCO {p.anzsco}</span>}
              <span className="badge i">ISCO {p.isco}</span>
              <span className="badge">{p.country} · {p.skillLevel}</span>
            </div>
          </div>
          <div className="demand">
            <div className="t">DEMAND TREND</div>
            <div className={`v ${up ? "up" : "down"}`}>{up ? "▲" : "▼"} {p.demandLabel}</div>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="k">Median salary</div>
            <div className="val">{fmtSalary(p)}</div>
            <div className="sub">per year</div>
          </div>
          <div className="stat">
            <div className="k">True cost</div>
            <div className="val" style={{ fontSize: 18 }}>{p.trueCost}</div>
            <div className="sub">fees + foregone earnings</div>
          </div>
        </div>
        <div className="lower">
          <div className="section">
            <div className="k">Return across three capitals</div>
            <CapitalBars p={p} />
          </div>
          <div className="section">
            <div className="k">Demand, last 6 years</div>
            <Sparkline data={p.demandTrend} up={up} />
            <div className="sub" style={{ fontSize: 12, color: "#8A8F98", marginTop: 8 }}>Indexed labour-market demand · illustrative</div>
          </div>
        </div>
        <div className="cta">
          <p>Full database (all NZ, AU &amp; CO pathways) — get early access.</p>
          <a className="btn" href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-block" }}>Get early access — $19</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [country, setCountry] = useState<"All" | Country>("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null); // null = list view; id = detail page

  const inCountry = useMemo(
    () => PATHWAYS.filter((p) => country === "All" || p.country === country),
    [country]
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return inCountry
      .filter((p) => p.name.toLowerCase().includes(q) || p.anzsco.includes(q) || p.isco.includes(q))
      .slice(0, 8);
  }, [query, inCountry]);

  const openPathway = openId ? PATHWAYS.find((p) => p.id === openId)! : null;

  // ===== DETAIL PAGE (feels like another page) =====
  if (openPathway) {
    return (
      <>
        <nav>
          <div className="wrap nav">
            <div className="brand" style={{ cursor: "pointer" }} onClick={() => setOpenId(null)}>
              <span className="dot" />Mycelial
            </div>
            <div className="pill">NZ · AU · CO beta</div>
          </div>
        </nav>
        <main className="wrap">
          <PathwayDetail p={openPathway} onBack={() => setOpenId(null)} />
        </main>
        <footer>
          <div className="wrap">Illustrative sample data · coded to ANZSCO &amp; ISCO · updated and timestamped</div>
        </footer>
      </>
    );
  }

  // ===== LIST / HOME PAGE =====
  return (
    <>
      <nav>
        <div className="wrap nav">
          <div className="brand"><span className="dot" />Mycelial</div>
          <div className="pill">NZ · AU · CO beta</div>
        </div>
      </nav>

      <header>
        <div className="wrap">
          <div className="eyebrow">The Education Data Library</div>
          <h1>See any career or qualification by its <span className="g">real data</span>.</h1>
          <p>Search a pathway. See what it pays, whether it hires, and what it truly costs — coded to ANZSCO &amp; ISCO across New Zealand, Australia and Colombia.</p>

          <div className="controls">
            <select className="dropdown" value={country} onChange={(e) => setCountry(e.target.value as "All" | Country)}>
              <option value="All">🌐 All countries</option>
              <option value="NZ">🇳🇿 New Zealand</option>
              <option value="AU">🇦🇺 Australia</option>
              <option value="CO">🇨🇴 Colombia</option>
            </select>

            <div className="search">
              <div className="searchbar">
                <span>⌕</span>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a career or qualification…" />
              </div>
              {matches.length > 0 && (
                <div className="sug">
                  {matches.map((p) => (
                    <button key={p.id} onClick={() => { setOpenId(p.id); setQuery(""); }}>
                      <span>{p.name} <span style={{ color: "#5B616C" }}>· {p.country}</span></span>
                      <span className="code">ISCO {p.isco}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="wrap">
        <div className="grid-head">{inCountry.length} pathways — click one to analyse</div>
        <div className="grid">
          {inCountry.map((p) => (
            <button key={p.id} className="grid-card" onClick={() => setOpenId(p.id)}>
              <span className="gc-name">{p.name}</span>
              <span className="gc-codes">
                {p.country === "CO" ? `ISCO ${p.isco}` : `ANZSCO ${p.anzsco}`}
              </span>
              <span className="gc-foot">
                <span className="gc-country">{p.country}</span>
                <span className="gc-salary">{fmtSalary(p)}</span>
              </span>
            </button>
          ))}
        </div>
      </main>

      <footer>
        <div className="wrap">Illustrative sample data · coded to ANZSCO &amp; ISCO · updated and timestamped</div>
      </footer>
    </>
  );
}