import { useState, useMemo } from "react";
import "./styles.css";

// ============================================================
//  Mycelial — The Education Data Library (beta)
//  Pay and fee figures are taken from the sources linked on each
//  pathway page (checked October 2026).
// ============================================================

type Country = "NZ" | "AU" | "CO";
type Demand = "Rising" | "Stable" | "No rating";
type Mode = "apprenticeship" | "technical" | "full-time";
type Src = [string, string]; // [label, url]

interface Pathway {
  id: string;
  name: string;
  country: Country;
  code: string;       // ANZSCO (NZ/AU) or CIUO-08 A.C. (CO)
  isco: string;       // ISCO-08
  field: string;      // NZSCED / ASCED (NZ/AU) or ISCED-F 2013 (CO)
  skillLevel: string;
  medianSalary: number; // annual, local currency
  studyCost: number;    // total tuition for the whole route, local currency
  studyYears: number;
  mode: Mode;
  demand: Demand;
  network: number;      // Mycelial estimate (beta)
  pay: Src;
  fees: Src;
  demandSrc?: Src;
  note?: string;
}

const STRIPE_LINK = "PEGA_AQUI_TU_LINK_DE_RESERVA";
const INTEREST_LINK = "https://forms.gle/WJdpoycxKN1h8CKKA";

// ---------- shared sources ----------
const TAHATU = (slug: string, label: string): Src => [`Tahatū Career Navigator — ${label}`, `https://tahatu.govt.nz/work/explore-career-ideas/occupation/${slug}`];
const UOA_FEES: Src = ["University of Auckland — 2026 domestic fees", "https://www.auckland.ac.nz/en/study/fees-and-money-matters/tuition-fees/domestic-student-fees/undergraduate-domestic-fees.html"];
const OTAGO_FEES: Src = ["University of Otago — 2026 domestic fees", "https://www.otago.ac.nz/courses/fees/domestic-tuition-fees"];
const GREEN_LIST: Src = ["Immigration NZ Green List (March 2026)", "https://www.immigration.govt.nz/opsmanual/89117.htm"];
const JSA = (slug: string, label: string): Src => [`Jobs and Skills Australia — ${label}`, `https://www.jobsandskills.gov.au/data/labour-market-insights/occupations/${slug}`];
const CSP_2026: Src = ["Dept of Education — 2026 student contribution rates", "https://www.education.gov.au/download/19201/2026-indexed-rates/41481/document/pdf"];
const NSW_FREE: Src = ["TAFE NSW — Fee-Free Apprenticeships", "https://www.tafensw.edu.au/courses/fee-free-apprenticeships"];
const OSD_2025: Src = ["JSA 2025 Occupation Shortage Drivers report", "https://www.jobsandskills.gov.au/sites/default/files/2025-10/2025%20OSD%20Report.pdf"];
const TALENT = (q: string, label: string): Src => [`Talent.com — salario ${label}`, `https://co.talent.com/salary?job=${q}`];
const COMPUTRABAJO = (slug: string, label: string): Src => [`Computrabajo — sueldo ${label}`, `https://co.computrabajo.com/salarios/${slug}`];
const SENA: Src = ["SENA — free technical training", "https://www.pulzo.com/empleo/sena-abrio-inscripciones-41-programas-tecnicos-2025-PP4207954A"];
const BOSQUE: Src = ["Universidad El Bosque — 2026 fees", "https://www.unbosque.edu.co/sites/default/files/2025-12/valores-de-matricula-pregrado-2026.pdf"];
const UPB: Src = ["UPB Medellín — 2026 fees", "https://portal.upb.edu.co/wp-content/uploads/2026/04/resolucion-tarifas-pregrados-presenciales-2026.pdf"];
const TEACHER_DECREE: Src = ["Decreto 0299 de 2026 — public teacher pay (grade 2A)", "https://fecode.edu.co/wp-content/uploads/2026/03/DECRETO-No.-0299-DEL-25-DE-MARZO-DE-2026.pdf"];
const CO_SURVEY_NOTE = "Salary surveys mostly pre-date the 2026 minimum-wage rise (+23.7%).";

const PATHWAYS: Pathway[] = [
  // ===================== NEW ZEALAND (Tahatū pay = midpoint of lower–upper range) =====================
  { id: "elec-nz", name: "Electrician", country: "NZ", code: "341111", isco: "7411", field: "031301", skillLevel: "Skill level 3", medianSalary: 91500, studyCost: 11596, studyYears: 4, mode: "apprenticeship", demand: "Rising", network: 70, pay: TAHATU("T00750-electrician", "Electrician"), fees: ["EarnLearn — apprenticeship fees", "https://earnlearn.ac.nz/?p=12687"], demandSrc: GREEN_LIST },
  { id: "plum-nz", name: "Plumber", country: "NZ", code: "334111", isco: "7126", field: "040327", skillLevel: "Skill level 3", medianSalary: 79000, studyCost: 10816, studyYears: 4, mode: "apprenticeship", demand: "Rising", network: 68, pay: TAHATU("T00757-plumber", "Plumber"), fees: ["EarnLearn — apprenticeship fees", "https://earnlearn.ac.nz/?p=12687"], demandSrc: GREEN_LIST },
  { id: "carp-nz", name: "Carpenter", country: "NZ", code: "331212", isco: "7115", field: "040311", skillLevel: "Skill level 3", medianSalary: 76500, studyCost: 4876, studyYears: 4, mode: "apprenticeship", demand: "Stable", network: 64, pay: TAHATU("T00737-carpenter", "Carpenter"), fees: ["BCITO — 2026 fees schedule", "https://bcito.org.nz/documents/75/BCITO_Fees_Schedule_2026_v4.pdf"] },
  { id: "chef-nz", name: "Chef", country: "NZ", code: "351311", isco: "3434", field: "110105", skillLevel: "Skill level 2", medianSalary: 71760, studyCost: 8420, studyYears: 1, mode: "technical", demand: "Stable", network: 60, pay: TAHATU("T00575-chef", "Chef"), fees: ["NMIT — NZ Certificate in Cookery (L4) 2026", "https://www.nmit.ac.nz/study/programmes/trainee-chef-level-4"], note: "Tahatū gives hourly pay; converted at 2,080 hours a year." },
  { id: "nurse-nz", name: "Registered Nurse", country: "NZ", code: "254499", isco: "2221", field: "060301", skillLevel: "Skill level 1", medianSalary: 91500, studyCost: 26356, studyYears: 3, mode: "full-time", demand: "Rising", network: 75, pay: TAHATU("T00454-registered-nurse", "Registered nurse"), fees: UOA_FEES, demandSrc: GREEN_LIST },
  { id: "pharm-nz", name: "Pharmacist", country: "NZ", code: "251513", isco: "2262", field: "060501", skillLevel: "Skill level 1", medianSalary: 114000, studyCost: 39542, studyYears: 4, mode: "full-time", demand: "Rising", network: 70, pay: TAHATU("T00438-pharmacist", "Pharmacist"), fees: UOA_FEES, demandSrc: GREEN_LIST },
  { id: "physio-nz", name: "Physiotherapist", country: "NZ", code: "252511", isco: "2264", field: "061701", skillLevel: "Skill level 1", medianSalary: 114000, studyCost: 37992, studyYears: 4, mode: "full-time", demand: "Rising", network: 72, pay: TAHATU("T00444-physiotherapist", "Physiotherapist"), fees: OTAGO_FEES, demandSrc: GREEN_LIST },
  { id: "gp-nz", name: "General Practitioner", country: "NZ", code: "253111", isco: "2211", field: "060101", skillLevel: "Skill level 1", medianSalary: 216500, studyCost: 107542, studyYears: 6, mode: "full-time", demand: "Rising", network: 85, pay: TAHATU("T00468-general-practitioner", "General practitioner"), fees: UOA_FEES, demandSrc: GREEN_LIST, note: "Medical degree (MBChB) only; GP specialist training adds further years." },
  { id: "dent-nz", name: "Dentist", country: "NZ", code: "252312", isco: "2261", field: "060701", skillLevel: "Skill level 1", medianSalary: 226500, studyCost: 88311, studyYears: 5, mode: "full-time", demand: "Rising", network: 78, pay: TAHATU("T00431-dentist", "Dentist"), fees: OTAGO_FEES, demandSrc: GREEN_LIST },
  { id: "ece-nz", name: "Early Childhood Teacher", country: "NZ", code: "241111", isco: "2342", field: "070101", skillLevel: "Skill level 1", medianSalary: 82000, studyCost: 22849, studyYears: 3, mode: "full-time", demand: "Rising", network: 62, pay: TAHATU("T00346-early-childhood-teacher", "Early childhood teacher"), fees: UOA_FEES, demandSrc: GREEN_LIST },
  { id: "prim-nz", name: "Primary Teacher", country: "NZ", code: "241213", isco: "2341", field: "070103", skillLevel: "Skill level 1", medianSalary: 82000, studyCost: 22849, studyYears: 3, mode: "full-time", demand: "Rising", network: 65, pay: TAHATU("T00350-primary-school-teacher", "Primary school teacher"), fees: UOA_FEES, demandSrc: GREEN_LIST },
  { id: "sec-nz", name: "Secondary Teacher", country: "NZ", code: "241411", isco: "2330", field: "070105", skillLevel: "Skill level 1", medianSalary: 82000, studyCost: 32427, studyYears: 4, mode: "full-time", demand: "Rising", network: 66, pay: TAHATU("T00353-secondary-school-teacher", "Secondary school teacher"), fees: UOA_FEES, demandSrc: GREEN_LIST, note: "Route: 3-year degree + Graduate Diploma in Teaching." },
  { id: "swe-nz", name: "Software Engineer", country: "NZ", code: "261313", isco: "2512", field: "020103", skillLevel: "Skill level 1", medianSalary: 129000, studyCost: 30474, studyYears: 3, mode: "full-time", demand: "Rising", network: 82, pay: TAHATU("T00131-software-developer", "Software developer"), fees: UOA_FEES, demandSrc: GREEN_LIST },
  { id: "data-nz", name: "Data Analyst", country: "NZ", code: "224999", isco: "2511", field: "010103", skillLevel: "Skill level 1", medianSalary: 101000, studyCost: 30474, studyYears: 3, mode: "full-time", demand: "Rising", network: 74, pay: TAHATU("T01061-data-analyst", "Data analyst"), fees: UOA_FEES, demandSrc: ["Tahatū — employment change 2018–2023: increase", "https://tahatu.govt.nz/work/explore-career-ideas/occupation/T01061-data-analyst"] },
  { id: "acc-nz", name: "Accountant", country: "NZ", code: "221111", isco: "2411", field: "080101", skillLevel: "Skill level 1", medianSalary: 118500, studyCost: 24620, studyYears: 3, mode: "full-time", demand: "Stable", network: 78, pay: TAHATU("T00101-accountant-and-auditor", "Accountant and auditor"), fees: UOA_FEES },
  { id: "law-nz", name: "Lawyer", country: "NZ", code: "271311", isco: "2611", field: "090999", skillLevel: "Skill level 1", medianSalary: 223000, studyCost: 32827, studyYears: 4, mode: "full-time", demand: "Stable", network: 85, pay: TAHATU("T00299-lawyer", "Lawyer"), fees: UOA_FEES, note: "Wide pay range; most lawyers earn NZ$85k–$215k." },
  { id: "civil-nz", name: "Civil Engineer", country: "NZ", code: "233211", isco: "2142", field: "030999", skillLevel: "Skill level 1", medianSalary: 135000, studyCost: 40632, studyYears: 4, mode: "full-time", demand: "Rising", network: 78, pay: TAHATU("T00165-civil-engineer", "Civil engineer"), fees: UOA_FEES, demandSrc: GREEN_LIST },
  { id: "eleng-nz", name: "Electrical Engineer", country: "NZ", code: "233311", isco: "2151", field: "031301", skillLevel: "Skill level 1", medianSalary: 127500, studyCost: 40632, studyYears: 4, mode: "full-time", demand: "Rising", network: 76, pay: TAHATU("T00169-electrical-engineer", "Electrical engineer"), fees: UOA_FEES, demandSrc: GREEN_LIST },
  { id: "mech-nz", name: "Mechanical Engineer", country: "NZ", code: "233512", isco: "2144", field: "030701", skillLevel: "Skill level 1", medianSalary: 108500, studyCost: 40632, studyYears: 4, mode: "full-time", demand: "Rising", network: 74, pay: TAHATU("T00181-mechanical-engineer", "Mechanical engineer"), fees: UOA_FEES, demandSrc: GREEN_LIST },
  { id: "arch-nz", name: "Architect", country: "NZ", code: "232111", isco: "2161", field: "040101", skillLevel: "Skill level 1", medianSalary: 110500, studyCost: 49585, studyYears: 5, mode: "full-time", demand: "Stable", network: 76, pay: TAHATU("T00156-architect", "Architect"), fees: UOA_FEES },
  { id: "graph-nz", name: "Graphic Designer", country: "NZ", code: "232411", isco: "2166", field: "100501", skillLevel: "Skill level 1", medianSalary: 88500, studyCost: 30474, studyYears: 3, mode: "full-time", demand: "Stable", network: 70, pay: TAHATU("T00391-graphic-designer", "Graphic designer"), fees: UOA_FEES },

  // ===================== AUSTRALIA (JSA median full-time weekly earnings × 52) =====================
  { id: "elec-au", name: "Electrician", country: "AU", code: "341111", isco: "7411", field: "031313", skillLevel: "Skill level 3", medianSalary: 114608, studyCost: 0, studyYears: 4, mode: "apprenticeship", demand: "Rising", network: 70, pay: JSA("3411-electricians", "Electricians"), fees: NSW_FREE, demandSrc: OSD_2025, note: "Fee-free in NSW; other states charge apprenticeship fees." },
  { id: "plum-au", name: "Plumber", country: "AU", code: "334111", isco: "7126", field: "040327", skillLevel: "Skill level 3", medianSalary: 103480, studyCost: 0, studyYears: 4, mode: "apprenticeship", demand: "Rising", network: 68, pay: JSA("3341-plumbers", "Plumbers"), fees: NSW_FREE, demandSrc: OSD_2025, note: "Fee-free in NSW; other states charge apprenticeship fees." },
  { id: "carp-au", name: "Carpenter", country: "AU", code: "331212", isco: "7115", field: "040311", skillLevel: "Skill level 3", medianSalary: 91520, studyCost: 0, studyYears: 4, mode: "apprenticeship", demand: "Rising", network: 64, pay: JSA("3312-carpenters-and-joiners", "Carpenters and Joiners"), fees: NSW_FREE, demandSrc: OSD_2025, note: "Fee-free in NSW; other states charge apprenticeship fees." },
  { id: "mmech-au", name: "Motor Mechanic", country: "AU", code: "321211", isco: "7231", field: "030503", skillLevel: "Skill level 3", medianSalary: 73060, studyCost: 0, studyYears: 4, mode: "apprenticeship", demand: "Rising", network: 58, pay: JSA("3212-motor-mechanics", "Motor Mechanics"), fees: NSW_FREE, demandSrc: OSD_2025, note: "Fee-free in NSW; other states charge apprenticeship fees." },
  { id: "chef-au", name: "Chef", country: "AU", code: "351311", isco: "3434", field: "110109", skillLevel: "Skill level 2", medianSalary: 69160, studyCost: 0, studyYears: 3, mode: "apprenticeship", demand: "Stable", network: 60, pay: JSA("3513-chefs", "Chefs"), fees: ["CDU — Cert III Commercial Cookery (Fee-Free TAFE 2026)", "https://www.cdu.edu.au/study/course/sit30821-certificate-iii-commercial-cookery-sit30821?year=2026"], demandSrc: ["2025 OSL — regional shortage only", "https://sacsa.org.au/news/jobs-and-skills-australias-2025-occupation-shortage-list"] },
  { id: "nurse-au", name: "Registered Nurse", country: "AU", code: "2544", isco: "2221", field: "060301", skillLevel: "Skill level 1", medianSalary: 112112, studyCost: 14214, studyYears: 3, mode: "full-time", demand: "Rising", network: 76, pay: JSA("2544-registered-nurses", "Registered Nurses"), fees: CSP_2026, demandSrc: OSD_2025 },
  { id: "pharm-au", name: "Pharmacist", country: "AU", code: "2515", isco: "2262", field: "060501", skillLevel: "Skill level 1", medianSalary: 101712, studyCost: 38148, studyYears: 4, mode: "full-time", demand: "Rising", network: 70, pay: JSA("2515-pharmacists", "Pharmacists"), fees: CSP_2026, demandSrc: OSD_2025 },
  { id: "physio-au", name: "Physiotherapist", country: "AU", code: "2525", isco: "2264", field: "061701", skillLevel: "Skill level 1", medianSalary: 98176, studyCost: 38148, studyYears: 4, mode: "full-time", demand: "Rising", network: 72, pay: JSA("2525-physiotherapists", "Physiotherapists"), fees: CSP_2026, demandSrc: OSD_2025 },
  { id: "gp-au", name: "General Practitioner", country: "AU", code: "2531", isco: "2211", field: "060101", skillLevel: "Skill level 1", medianSalary: 136032, studyCost: 81348, studyYears: 6, mode: "full-time", demand: "Rising", network: 85, pay: JSA("2531-general-practitioners-and-resident-medical-officers", "GPs and Resident Medical Officers"), fees: CSP_2026, demandSrc: ["JSA — national shortage of GPs", "https://www.jobsandskills.gov.au/data/occupation-shortage"], note: "Pay group includes resident medical officers, so it understates GP-only pay." },
  { id: "dent-au", name: "Dentist", country: "AU", code: "2523", isco: "2261", field: "060701", skillLevel: "Skill level 1", medianSalary: 168064, studyCost: 67790, studyYears: 5, mode: "full-time", demand: "Rising", network: 78, pay: JSA("2523-dental-practitioners", "Dental Practitioners"), fees: CSP_2026, demandSrc: OSD_2025 },
  { id: "psych-au", name: "Psychologist", country: "AU", code: "2723", isco: "2634", field: "090701", skillLevel: "Skill level 1", medianSalary: 114608, studyCost: 47624, studyYears: 6, mode: "full-time", demand: "Rising", network: 72, pay: JSA("2723-psychologists-and-psychotherapists", "Psychologists and Psychotherapists"), fees: CSP_2026, demandSrc: OSD_2025 },
  { id: "sw-au", name: "Social Worker", country: "AU", code: "272511", isco: "2635", field: "090501", skillLevel: "Skill level 1", medianSalary: 112944, studyCost: 38148, studyYears: 4, mode: "full-time", demand: "Stable", network: 70, pay: JSA("2725-social-workers", "Social Workers"), fees: CSP_2026 },
  { id: "ece-au", name: "Early Childhood Teacher", country: "AU", code: "2411", isco: "2342", field: "070101", skillLevel: "Skill level 1", medianSalary: 99112, studyCost: 18952, studyYears: 4, mode: "full-time", demand: "Rising", network: 62, pay: JSA("2411-early-childhood-pre-primary-school-teachers", "Early Childhood Teachers"), fees: CSP_2026, demandSrc: OSD_2025 },
  { id: "prim-au", name: "Primary Teacher", country: "AU", code: "2412", isco: "2341", field: "070103", skillLevel: "Skill level 1", medianSalary: 104000, studyCost: 18952, studyYears: 4, mode: "full-time", demand: "Rising", network: 65, pay: JSA("2412-primary-school-teachers", "Primary School Teachers"), fees: CSP_2026, demandSrc: OSD_2025 },
  { id: "sec-au", name: "Secondary Teacher", country: "AU", code: "2414", isco: "2330", field: "070105", skillLevel: "Skill level 1", medianSalary: 120744, studyCost: 18952, studyYears: 4, mode: "full-time", demand: "Rising", network: 66, pay: JSA("2414-secondary-school-teachers", "Secondary School Teachers"), fees: CSP_2026, demandSrc: OSD_2025 },
  { id: "swe-au", name: "Software Engineer", country: "AU", code: "261313", isco: "2512", field: "020103", skillLevel: "Skill level 1", medianSalary: 129792, studyCost: 28611, studyYears: 3, mode: "full-time", demand: "Stable", network: 84, pay: JSA("2613-software-and-applications-programmers", "Software and Applications Programmers"), fees: CSP_2026, demandSrc: ["ACS — no longer in shortage (2025 OSL)", "https://ia.acs.org.au/article/2025/there-s-no-shortage-of-software-engineers-in-australia-anymore.html"] },
  { id: "data-au", name: "Data Analyst", country: "AU", code: "224114", isco: "2120", field: "010103", skillLevel: "Skill level 1", medianSalary: 107744, studyCost: 14214, studyYears: 3, mode: "full-time", demand: "No rating", network: 74, pay: JSA("2241-actuaries-mathematicians-and-statisticians", "Actuaries, Mathematicians and Statisticians"), fees: CSP_2026, note: "Pay is for the whole unit group 2241, which includes data analysts." },
  { id: "acc-au", name: "Accountant", country: "AU", code: "221111", isco: "2411", field: "080101", skillLevel: "Skill level 1", medianSalary: 104156, studyCost: 52197, studyYears: 3, mode: "full-time", demand: "No rating", network: 78, pay: JSA("2211-accountants", "Accountants"), fees: CSP_2026 },
  { id: "law-au", name: "Lawyer", country: "AU", code: "271311", isco: "2611", field: "090999", skillLevel: "Skill level 1", medianSalary: 107640, studyCost: 69596, studyYears: 4, mode: "full-time", demand: "Rising", network: 85, pay: JSA("2713-solicitors", "Solicitors"), fees: CSP_2026, demandSrc: OSD_2025 },
  { id: "civil-au", name: "Civil Engineer", country: "AU", code: "233211", isco: "2142", field: "030901", skillLevel: "Skill level 1", medianSalary: 115284, studyCost: 38148, studyYears: 4, mode: "full-time", demand: "Rising", network: 78, pay: JSA("2332-civil-engineering-professionals", "Civil Engineering Professionals"), fees: CSP_2026, demandSrc: OSD_2025 },
  { id: "mech-au", name: "Mechanical Engineer", country: "AU", code: "233512", isco: "2144", field: "030701", skillLevel: "Skill level 1", medianSalary: 135928, studyCost: 38148, studyYears: 4, mode: "full-time", demand: "Stable", network: 74, pay: JSA("2335-industrial-mechanical-and-production-engineers", "Industrial, Mechanical and Production Engineers"), fees: CSP_2026 },
  { id: "arch-au", name: "Architect", country: "AU", code: "232111", isco: "2161", field: "040101", skillLevel: "Skill level 1", medianSalary: 120016, studyCost: 47685, studyYears: 5, mode: "full-time", demand: "Stable", network: 76, pay: JSA("2321-architects-and-landscape-architects", "Architects and Landscape Architects"), fees: CSP_2026 },
  { id: "graph-au", name: "Graphic Designer", country: "AU", code: "232411", isco: "2166", field: "100501", skillLevel: "Skill level 1", medianSalary: 78000, studyCost: 28611, studyYears: 3, mode: "full-time", demand: "No rating", network: 70, pay: JSA("2324-graphic-and-web-designers-and-illustrators", "Graphic and Web Designers, and Illustrators"), fees: CSP_2026 },

  // ===================== COLOMBIA (salary surveys / official decree; private-university fees) =====================
  { id: "elec-co", name: "Electrician", country: "CO", code: "7411", isco: "7411", field: "0713", skillLevel: "Técnico (SENA)", medianSalary: 16800000, studyCost: 0, studyYears: 1.5, mode: "technical", demand: "Stable", network: 70, pay: TALENT("electricista", "electricista"), fees: SENA, note: CO_SURVEY_NOTE },
  { id: "plum-co", name: "Plumber", country: "CO", code: "7126", isco: "7126", field: "0732", skillLevel: "Técnico", medianSalary: 16800000, studyCost: 0, studyYears: 1.5, mode: "technical", demand: "Stable", network: 68, pay: TALENT("plomero", "plomero"), fees: SENA, note: CO_SURVEY_NOTE },
  { id: "carp-co", name: "Carpenter", country: "CO", code: "7115", isco: "7115", field: "0722", skillLevel: "Técnico (SENA)", medianSalary: 16872000, studyCost: 0, studyYears: 1.5, mode: "technical", demand: "Stable", network: 64, pay: TALENT("carpintero", "carpintero"), fees: SENA, note: CO_SURVEY_NOTE },
  { id: "mmech-co", name: "Motor Mechanic", country: "CO", code: "7231", isco: "7231", field: "0716", skillLevel: "Técnico (SENA)", medianSalary: 21780000, studyCost: 0, studyYears: 1.5, mode: "technical", demand: "Stable", network: 58, pay: TALENT("mecanico+automotriz", "mecánico automotriz"), fees: SENA },
  { id: "chef-co", name: "Chef / Cook", country: "CO", code: "3434", isco: "3434", field: "1013", skillLevel: "Técnico (SENA)", medianSalary: 19704000, studyCost: 0, studyYears: 1.5, mode: "technical", demand: "Stable", network: 60, pay: TALENT("cocinero", "cocinero"), fees: SENA, note: CO_SURVEY_NOTE },
  { id: "nurse-co", name: "Registered Nurse", country: "CO", code: "2221", isco: "2221", field: "0913", skillLevel: "Profesional", medianSalary: 26400000, studyCost: 75720000, studyYears: 4, mode: "full-time", demand: "Stable", network: 75, pay: TALENT("enfermera+jefe", "enfermera jefe"), fees: BOSQUE },
  { id: "pharm-co", name: "Pharmacist", country: "CO", code: "2262", isco: "2262", field: "0916", skillLevel: "Profesional", medianSalary: 34885152, studyCost: 86913000, studyYears: 4.5, mode: "full-time", demand: "Stable", network: 70, pay: COMPUTRABAJO("quimico-farmaceutico", "químico farmacéutico"), fees: BOSQUE },
  { id: "physio-co", name: "Physiotherapist", country: "CO", code: "2264", isco: "2264", field: "0915", skillLevel: "Profesional", medianSalary: 24600000, studyCost: 75720000, studyYears: 4, mode: "full-time", demand: "Stable", network: 72, pay: TALENT("fisioterapeuta", "fisioterapeuta"), fees: BOSQUE },
  { id: "gp-co", name: "General Practitioner", country: "CO", code: "2211", isco: "2211", field: "0912", skillLevel: "Profesional", medianSalary: 32376000, studyCost: 394248000, studyYears: 6, mode: "full-time", demand: "Stable", network: 85, pay: TALENT("medico+general", "médico general"), fees: BOSQUE, note: "Low-confidence salary; other sources report about COP 3.5–4M a month." },
  { id: "dent-co", name: "Dentist", country: "CO", code: "2261", isco: "2261", field: "0911", skillLevel: "Profesional", medianSalary: 30000000, studyCost: 144050000, studyYears: 5, mode: "full-time", demand: "Stable", network: 78, pay: TALENT("odontologo", "odontólogo"), fees: BOSQUE },
  { id: "psych-co", name: "Psychologist", country: "CO", code: "2634", isco: "2634", field: "0313", skillLevel: "Profesional", medianSalary: 27840000, studyCost: 99900000, studyYears: 5, mode: "full-time", demand: "Stable", network: 72, pay: TALENT("psicologo", "psicólogo"), fees: BOSQUE },
  { id: "ece-co", name: "Early Childhood Teacher", country: "CO", code: "2342", isco: "2342", field: "0112", skillLevel: "Licenciatura", medianSalary: 45855288, studyCost: 37248000, studyYears: 4, mode: "full-time", demand: "Stable", network: 62, pay: TEACHER_DECREE, fees: BOSQUE, note: "Official pay for public-school teachers who pass the state exam; private-school pay is usually lower." },
  { id: "sec-co", name: "Secondary Teacher", country: "CO", code: "2330", isco: "2330", field: "0114", skillLevel: "Licenciatura", medianSalary: 45855288, studyCost: 43192000, studyYears: 4, mode: "full-time", demand: "Stable", network: 66, pay: TEACHER_DECREE, fees: BOSQUE, note: "Official pay for public-school teachers who pass the state exam; private-school pay is usually lower." },
  { id: "swe-co", name: "Software Engineer", country: "CO", code: "2512", isco: "2512", field: "0613", skillLevel: "Profesional", medianSalary: 33957264, studyCost: 71910000, studyYears: 4.5, mode: "full-time", demand: "Stable", network: 82, pay: COMPUTRABAJO("ingeniero-de-sistemas", "ingeniero de sistemas"), fees: BOSQUE },
  { id: "data-co", name: "Data Analyst", country: "CO", code: "2120", isco: "2120", field: "0542", skillLevel: "Profesional", medianSalary: 25136112, studyCost: 55840000, studyYears: 4, mode: "full-time", demand: "Rising", network: 74, pay: COMPUTRABAJO("analista-de-datos", "analista de datos"), fees: BOSQUE, demandSrc: ["El Colombiano citing the Observatorio Laboral", "https://www.elcolombiano.com/empleos/contenidos/carreras-mejor-salario-recien-egresados-ole-BG27211653"] },
  { id: "acc-co", name: "Accountant", country: "CO", code: "2411", isco: "2411", field: "0411", skillLevel: "Profesional", medianSalary: 33000000, studyCost: 50055000, studyYears: 5, mode: "full-time", demand: "Stable", network: 78, pay: TALENT("contador+publico", "contador público"), fees: ["Universidad Católica de Oriente — 2026 fees", "https://uco.edu.co/wp-content/uploads/2025/10/Tarifas-de-Matricula-2026-1-.pdf"] },
  { id: "law-co", name: "Lawyer", country: "CO", code: "2611", isco: "2611", field: "0421", skillLevel: "Profesional", medianSalary: 48000000, studyCost: 75294000, studyYears: 4.5, mode: "full-time", demand: "Stable", network: 85, pay: TALENT("abogado", "abogado"), fees: BOSQUE, note: "Low-confidence salary; recent graduates report about COP 2.5M a month." },
  { id: "civil-co", name: "Civil Engineer", country: "CO", code: "2142", isco: "2142", field: "0732", skillLevel: "Profesional", medianSalary: 35163504, studyCost: 172700000, studyYears: 5, mode: "full-time", demand: "Stable", network: 78, pay: COMPUTRABAJO("ingeniero-civil", "ingeniero civil"), fees: ["Universidad de La Sabana — 2025 fees", "https://unisabana.edu.co/fileadmin/Archivos_de_usuario/Documentos/Documentos_la_Universidad/derechos_pecuniarios/2025/2025-acuerdo-077-precio-matriculas-derechos-pecuciarios.pdf"] },
  { id: "eleng-co", name: "Electrical Engineer", country: "CO", code: "2151", isco: "2151", field: "0713", skillLevel: "Profesional", medianSalary: 45600000, studyCost: 130912000, studyYears: 5, mode: "full-time", demand: "Stable", network: 76, pay: ["Magneto365 — salario ingeniero electricista", "https://www.magneto365.com/co/preguntas-frecuentes/ingeniero-electricista/cual-es-salario-de-un-ingeniero-electricista-en-colombia"], fees: UPB, note: "Low-confidence salary (approximate, undated survey)." },
  { id: "mech-co", name: "Mechanical Engineer", country: "CO", code: "2144", isco: "2144", field: "0715", skillLevel: "Profesional", medianSalary: 29615184, studyCost: 130912000, studyYears: 5, mode: "full-time", demand: "Stable", network: 74, pay: COMPUTRABAJO("ingeniero-mecanico", "ingeniero mecánico"), fees: UPB },
  { id: "arch-co", name: "Architect", country: "CO", code: "2161", isco: "2161", field: "0731", skillLevel: "Profesional", medianSalary: 24000000, studyCost: 109470000, studyYears: 5, mode: "full-time", demand: "Stable", network: 76, pay: TALENT("arquitecto", "arquitecto"), fees: BOSQUE },
  { id: "graph-co", name: "Graphic Designer", country: "CO", code: "2166", isco: "2166", field: "0212", skillLevel: "Profesional", medianSalary: 17082000, studyCost: 109470000, studyYears: 5, mode: "full-time", demand: "Stable", network: 70, pay: TALENT("disenador+grafico", "diseñador gráfico"), fees: BOSQUE, note: CO_SURVEY_NOTE },
];

// ===== Money formatting =====
function fmtMoney(country: Country, n: number) {
  if (country === "CO") return `COP ${(n / 1000000).toFixed(n < 100000000 ? 1 : 0).replace(/\.0$/, "")}M`;
  const cur = country === "NZ" ? "NZ$" : "AU$";
  return `${cur}${Math.round(n / 1000)}k`;
}
const fmtSalary = (p: Pathway) => fmtMoney(p.country, p.medianSalary);

// ===== TRUE COST & ROI logic =====
// Reference wage = full-time minimum wage, 2026.
// NZ: NZ$23.95/h × 40h × 52 · AU: A$1,004.90/week × 52 · CO: SMMLV $1.750.905 × 12
const REF_WAGE: Record<Country, number> = { NZ: 49816, AU: 52255, CO: 21010860 };
const FORGONE_SHARE: Record<Mode, number> = { apprenticeship: 0, technical: 0.5, "full-time": 1 };

function trueCostOf(p: Pathway) {
  const forgone = p.studyYears * REF_WAGE[p.country] * FORGONE_SHARE[p.mode];
  return { fees: p.studyCost, forgone, total: p.studyCost + forgone };
}
function paybackYears(p: Pathway) {
  // years for the extra salary (median − reference wage) to recover the true cost
  const premium = p.medianSalary - REF_WAGE[p.country];
  if (premium <= 0) return Infinity;
  return trueCostOf(p).total / premium;
}

// Three capitals
const HIRE: Record<Demand, number> = { Rising: 88, Stable: 68, "No rating": 60 };
function economicOf(p: Pathway) {
  // pay rank within its country, scaled 30–98
  const peers = PATHWAYS.filter((x) => x.country === p.country).map((x) => x.medianSalary).sort((a, b) => a - b);
  const rank = peers.findIndex((s) => s >= p.medianSalary);
  return Math.round(30 + (68 * rank) / Math.max(peers.length - 1, 1));
}
function capitals(p: Pathway) {
  return { economic: economicOf(p), hireability: HIRE[p.demand], network: p.network };
}

function roi(p: Pathway) {
  const pb = paybackYears(p);
  const pbScore = Math.max(0, 100 - pb * 9); // ~11 years of payback = 0
  const c = capitals(p);
  const score = Math.round(pbScore * 0.45 + c.hireability * 0.35 + c.economic * 0.2);
  const level = score >= 78 ? "High" : score >= 62 ? "Medium" : "Low";
  return { score, level, payback: pb };
}
function roiClass(level: string) {
  return level === "High" ? "roi-high" : level === "Medium" ? "roi-mid" : "roi-low";
}

function CapitalBars({ p }: { p: Pathway }) {
  const c = capitals(p);
  const rows: [string, number][] = [["Economic", c.economic], ["Hireability", c.hireability], ["Network", c.network]];
  return (
    <>
      {rows.map(([label, val]) => (
        <div className="cap" key={label}>
          <div className="cap-row"><span>{label}</span><b>{val}</b></div>
          <div className="bar"><i style={{ width: `${val}%` }} /></div>
        </div>
      ))}
      <div className="sub" style={{ fontSize: 12, color: "#8A8F98", marginTop: 8, lineHeight: 1.5 }}>
        Economic = pay rank in {p.country} · Hireability = official shortage status · Network = Mycelial estimate (beta)
      </div>
    </>
  );
}

function SourceLink({ k, s }: { k: string; s: Src }) {
  return (
    <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 6 }}>
      <span style={{ color: "#8A8F98" }}>{k}: </span>
      <a href={s[1]} target="_blank" rel="noopener noreferrer" style={{ color: "#22D3A0", textDecoration: "none" }}>{s[0]} ↗</a>
    </div>
  );
}

function PathwayDetail({ p, onBack }: { p: Pathway; onBack: () => void }) {
  const [showRoi, setShowRoi] = useState(false);
  const r = roi(p);
  const tc = trueCostOf(p);
  const up = p.demand === "Rising";
  return (
    <div className="detail-page">
      <button className="back" onClick={onBack}>← Back to all pathways</button>
      <div className="card">
        <div className="chead">
          <div>
            <h2>{p.name}</h2>
            <div className="codes">
              <span className="badge a">{p.country === "CO" ? `CIUO ${p.code}` : `ANZSCO ${p.code}`}</span>
              <span className="badge i">ISCO {p.isco}</span>
              <span className="badge">{p.country} · {p.skillLevel}</span>
            </div>
          </div>
          <div className="demand">
            <div className="t">DEMAND</div>
            <div className={`v ${up ? "up" : ""}`}>{up ? "▲ " : ""}{p.demand}</div>
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
            <div className="val">{fmtMoney(p.country, tc.total)}</div>
            <div className="sub">
              {tc.fees > 0 ? `${fmtMoney(p.country, tc.fees)} fees` : "No tuition fees"}
              {tc.forgone > 0
                ? ` + ${fmtMoney(p.country, tc.forgone)} earnings given up (${p.studyYears} yrs)`
                : " · earn while training"}
            </div>
          </div>
        </div>

        <div className="roi-box">
          <button className="roi-toggle" onClick={() => setShowRoi(!showRoi)}>
            <span className="roi-left">
              <span className="roi-k">VALUE SCORE</span>
              <span className={`roi-badge ${roiClass(r.level)}`}>{r.level} · {r.score}/100</span>
            </span>
            <span className="roi-info">{showRoi ? "✕" : "ⓘ"}</span>
          </button>
          {showRoi && (
            <div className="roi-detail">
              <div className="roi-row"><span>Payback on true cost</span><b>{isFinite(r.payback) ? `${r.payback.toFixed(1)} years` : "Not at median pay"}</b></div>
              <div className="roi-row"><span>Earnings given up while studying</span><b>{fmtMoney(p.country, tc.forgone)}</b></div>
              <div className="roi-row"><span>Study time</span><b>{p.studyYears} yrs · {p.mode}</b></div>
              <p className="roi-note">True cost = fees + the earnings you give up while studying (a full-time minimum-wage salary for each year of full-time study; half for part-time-compatible technical study; none for paid apprenticeships). Payback = years for the extra salary over that wage to recover the true cost. Value Score blends payback (45%), hireability (35%) and pay rank (20%). Illustrative — not financial advice.</p>
            </div>
          )}
        </div>

        <div className="lower">
          <div className="section">
            <div className="k">Return across three capitals</div>
            <CapitalBars p={p} />
          </div>
          <div className="section">
            <div className="k">Sources</div>
            <SourceLink k="Pay" s={p.pay} />
            <SourceLink k="Fees" s={p.fees} />
            {p.demandSrc && <SourceLink k="Demand" s={p.demandSrc} />}
            {p.note && <div style={{ fontSize: 12, color: "#8A8F98", marginTop: 8, lineHeight: 1.5 }}>Note: {p.note}</div>}
            <div style={{ fontSize: 12, color: "#5B616C", marginTop: 8 }}>Field code {p.field} · checked October 2026</div>
          </div>
        </div>

        <div className="cta">
          <p>Want the full database (all NZ, AU &amp; CO pathways)?</p>
          <div className="cta-btns">
            <a className="btn" href={INTEREST_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>I'm interested</a>
            <a className="btn-ghost" href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Reserve · $19 at launch</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="detail-page">
      <button className="back" onClick={onBack}>← Back</button>
      <div className="card" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="chead"><div><h2>About Mycelial</h2></div></div>
        <div style={{ padding: "24px" }}>
          <p style={{ color: "#C7CBD1", lineHeight: 1.7, marginBottom: 20 }}>
            Every year, people commit tens of thousands of dollars and years of their lives to a study or career path — with no honest way to see what it really returns or what it truly costs. Mycelial is <b>The Education Data Library</b>: independent, coded, sourced data on study and career pathways across New Zealand, Australia and Colombia. We don't sell courses and we take no commissions — we just show the numbers, and let you decide.
          </p>
          <div className="k" style={{ color: "#22D3A0", marginBottom: 12 }}>HOW WE MEASURE EDUCATIONAL RETURN</div>
          <p style={{ color: "#9AA0A8", lineHeight: 1.7, marginBottom: 18 }}>
            A pathway is more than a salary. Drawing on the economics of hidden cost and Bourdieu's forms of capital, we read every pathway across three kinds of return:
          </p>
          <div className="about-cap"><b style={{ color: "#F5F547" }}>Economic</b> — what it pays: median salary from official or survey data, ranked within each country.</div>
          <div className="about-cap"><b style={{ color: "#F5F547" }}>Hireability (cultural)</b> — whether it actually hires: official shortage lists (NZ Green List, Jobs and Skills Australia).</div>
          <div className="about-cap"><b style={{ color: "#F5F547" }}>Network (social)</b> — who you meet: how connected the field is. This one is a Mycelial estimate while we build the data.</div>
          <p style={{ color: "#9AA0A8", lineHeight: 1.7, marginTop: 18 }}>
            Alongside these sits the <b>true cost</b> — fees plus the earnings you give up while studying — and a <b>Value Score</b> that blends payback, hireability and pay. Every pathway page links to its sources.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [country, setCountry] = useState<"All" | Country>("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  const inCountry = useMemo(
    () => PATHWAYS.filter((p) => country === "All" || p.country === country),
    [country]
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return inCountry
      .filter((p) => p.name.toLowerCase().includes(q) || p.code.includes(q) || p.isco.includes(q))
      .slice(0, 8);
  }, [query, inCountry]);

  const openPathway = openId ? PATHWAYS.find((p) => p.id === openId)! : null;

  const Nav = (
    <nav>
      <div className="wrap nav">
        <div className="brand" style={{ cursor: "pointer" }} onClick={() => { setOpenId(null); setShowAbout(false); }}>
          <span className="dot" />Mycelial
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="nav-link" onClick={() => { setShowAbout(true); setOpenId(null); }}>About</button>
          <div className="pill">NZ · AU · CO beta</div>
        </div>
      </div>
    </nav>
  );

  if (showAbout) {
    return (<>{Nav}<main className="wrap"><AboutPage onBack={() => setShowAbout(false)} /></main></>);
  }

  if (openPathway) {
    return (<>{Nav}<main className="wrap"><PathwayDetail p={openPathway} onBack={() => setOpenId(null)} /></main></>);
  }

  return (
    <>
      {Nav}
      <header>
        <div className="wrap">
          <div className="eyebrow">The Education Data Library</div>
          <h1>See any career or qualification by its <span className="g">real data</span>.</h1>
          <p>Search a pathway. See what it pays, whether it hires, and what it truly costs — coded to ANZSCO &amp; ISCO across New Zealand, Australia and Colombia, with every figure linked to its source.</p>

          <div className="hero-cta">
            <a className="btn" href={INTEREST_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>I'm interested — get early access</a>
            <a className="btn-ghost" href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Reserve · $19 at launch</a>
          </div>

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
          {inCountry.map((p) => {
            const r = roi(p);
            return (
              <button key={p.id} className="grid-card" onClick={() => setOpenId(p.id)}>
                <span className="gc-top">
                  <span className="gc-name">{p.name}</span>
                  <span className={`roi-pill ${roiClass(r.level)}`}>{r.level}</span>
                </span>
                <span className="gc-codes">{p.country === "CO" ? `ISCO ${p.isco}` : `ANZSCO ${p.code}`}</span>
                <span className="gc-foot">
                  <span className="gc-country">{p.country}</span>
                  <span className="gc-salary">{fmtSalary(p)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </main>

      <footer>
        <div className="wrap">Beta · pay and fees from official and survey sources linked on each page (checked October 2026) · coded to ANZSCO &amp; ISCO · not financial advice</div>
      </footer>
    </>
  );
}
