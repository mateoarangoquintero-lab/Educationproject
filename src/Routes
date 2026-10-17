// ============================================================
//  Mycelial — routes to each career ("Ways to get there")
//  Each pathway can have several routes. Route 1 is the main route used
//  for the Value Score; the others are alternatives with their own time,
//  fees and providers. Fees and lengths come from the sources listed on
//  each route (checked October 2026).
// ============================================================

// How you study in each step. It decides how much salary you give up:
// full-time 100%, technical or study + paid work 50%, part-time 25%,
// paid apprenticeship or paid job 0%.
export type RMode = "apprenticeship" | "employment" | "work-study" | "technical" | "part-time" | "full-time";
export type T = [string, string]; // [English, Spanish]
export type L = [string, string]; // [label, url]

export interface Step {
  t: T;            // what you do in this step
  y: number | null; // years (null = varies)
  m: RMode;
  f: number | null; // fees for the whole step, local currency (null = not published)
  d?: T;           // length shown instead of years (e.g. "10 weeks")
}

export interface Route {
  t: T;            // route name
  steps: Step[];
  prov: L[];       // where to study (2 or 3 providers when there are that many)
  src: L[];        // sources for fees and length
  note?: T;
  prior?: T;       // what you need before starting (not counted in the cost)
  related?: boolean; // leads to a related job with different pay: no payback shown
  approx?: boolean;  // length is an estimate
}

const st = (t: T, y: number | null, m: RMode, f: number | null, d?: T): Step => ({ t, y, m, f, d });

// ---------- providers ----------
const P: Record<string, L> = {
  // New Zealand
  uoa: ["University of Auckland", "https://www.auckland.ac.nz"],
  aut: ["AUT", "https://www.aut.ac.nz"],
  vuw: ["Victoria University of Wellington", "https://www.wgtn.ac.nz"],
  uc: ["University of Canterbury", "https://www.canterbury.ac.nz"],
  otago: ["University of Otago", "https://www.otago.ac.nz"],
  massey: ["Massey University", "https://www.massey.ac.nz"],
  waikato: ["University of Waikato", "https://www.waikato.ac.nz"],
  unitec: ["Unitec", "https://www.unitec.ac.nz"],
  ara: ["Ara", "https://www.ara.ac.nz"],
  ucol: ["UCOL", "https://www.ucol.ac.nz"],
  op: ["Otago Polytechnic", "https://www.op.ac.nz"],
  sit: ["SIT", "https://www.sit.ac.nz"],
  northtec: ["NorthTec", "https://www.northtec.ac.nz"],
  nmit: ["NMIT", "https://www.nmit.ac.nz"],
  wintec: ["Wintec", "https://www.wintec.ac.nz"],
  toi: ["Toi Ohomai", "https://www.toiohomai.ac.nz"],
  trm: ["Te Rito Maioha", "https://www.ecnz.ac.nz/Public/Study/Programme-pages/Bachelor-of-Teaching-ECE.aspx"],
  tfnz: ["Teach First NZ", "https://teachfirstnz.org/"],
  yoobee: ["Yoobee Colleges", "https://www.yoobee.ac.nz"],
  vision: ["Vision College (online)", "https://visioncollege.ac.nz/study/information-technology/new-zealand-diploma-in-software-development/"],
  etco: ["ETCO", "https://www.etco.co.nz"],
  earnlearn: ["EarnLearn", "https://earnlearn.ac.nz"],
  bcito: ["BCITO", "https://bcito.org.nz"],
  serviceiq: ["ServiceIQ", "https://serviceiq.org.nz/training/hospitality/cookery/new-zealand-cookery-apprenticeship"],
  // Australia
  tafensw: ["TAFE NSW", "https://www.tafensw.edu.au"],
  vu: ["Victoria University (TAFE)", "https://www.vu.edu.au"],
  swin: ["Swinburne (TAFE)", "https://www.swinburne.edu.au"],
  nmtafe: ["North Metropolitan TAFE", "https://www.northmetrotafe.wa.edu.au"],
  gotafe: ["GOTAFE", "https://www.gotafe.vic.edu.au"],
  tafeqld: ["TAFE Queensland", "https://tafeqld.edu.au"],
  cdu: ["Charles Darwin University", "https://www.cdu.edu.au"],
  wsu: ["Western Sydney University", "https://www.westernsydney.edu.au"],
  uts: ["UTS", "https://www.uts.edu.au"],
  deakin: ["Deakin University", "https://www.deakin.edu.au"],
  usyd: ["University of Sydney", "https://www.sydney.edu.au"],
  unsw: ["UNSW Sydney", "https://www.unsw.edu.au"],
  monash: ["Monash University", "https://www.monash.edu"],
  uq: ["University of Queensland", "https://study.uq.edu.au"],
  unimelb: ["University of Melbourne", "https://study.unimelb.edu.au"],
  adelaide: ["University of Adelaide", "https://www.adelaide.edu.au"],
  csu: ["Charles Sturt University", "https://www.csu.edu.au"],
  cqu: ["CQUniversity", "https://www.cqu.edu.au"],
  cairnmillar: ["Cairnmillar Institute", "https://www.cairnmillar.org.au/course/master-professional-psychology/"],
  uow: ["University of Wollongong", "https://www.uow.edu.au"],
  mq: ["Macquarie University", "https://www.mq.edu.au"],
  qut: ["QUT", "https://www.qut.edu.au"],
  acu: ["ACU", "https://www.acu.edu.au"],
  ecu: ["Edith Cowan University (HAT)", "https://ecu.edu.au/schools/education/courses/hat@ecu"],
  rmit: ["RMIT University", "https://www.rmit.edu.au"],
  lpab: ["Legal Profession Admission Board (NSW)", "https://lpab.nsw.gov.au/content/dcj/legal-profession-admission-board/legal-profession-admission-board-home/diploma-law-course.html"],
  lec: ["Sydney Law School LEC (tuition)", "https://lec.sydney.edu.au"],
  // Colombia
  sena: ["SENA", "https://www.sena.edu.co"],
  bosque: ["Universidad El Bosque", "https://www.unbosque.edu.co"],
  javeriana: ["Pontificia Universidad Javeriana", "https://www.javeriana.edu.co"],
  sabana: ["Universidad de La Sabana", "https://www.unisabana.edu.co"],
  rosario: ["Universidad del Rosario", "https://urosario.edu.co"],
  andes: ["Universidad de los Andes", "https://uniandes.edu.co"],
  ces: ["Universidad CES", "https://www.ces.edu.co"],
  icesi: ["Universidad Icesi", "https://www.icesi.edu.co"],
  upb: ["UPB", "https://www.upb.edu.co"],
  eafit: ["Universidad EAFIT", "https://www.eafit.edu.co"],
  uco: ["Universidad Católica de Oriente", "https://www.uco.edu.co"],
  externado: ["Universidad Externado", "https://www.uexternado.edu.co"],
  lasalle: ["Universidad de La Salle", "https://www.lasalle.edu.co"],
  tadeo: ["Universidad Jorge Tadeo Lozano", "https://www.utadeo.edu.co"],
  unal: ["Universidad Nacional de Colombia", "https://unal.edu.co"],
  udea: ["Universidad de Antioquia", "https://www.udea.edu.co"],
  univalle: ["Universidad del Valle", "https://www.univalle.edu.co"],
  uis: ["Universidad Industrial de Santander", "https://www.uis.edu.co"],
  upn: ["Universidad Pedagógica Nacional", "https://www.pedagogica.edu.co"],
  unad: ["UNAD (virtual)", "https://www.unad.edu.co"],
  normal: ["Escuelas normales superiores", "https://www.mineducacion.gov.co"],
  utp: ["Universidad Tecnológica de Pereira", "https://www.utp.edu.co"],
};
const p = (...keys: string[]): L[] => keys.map((k) => P[k]);

// ---------- sources ----------
// New Zealand
const S_EARNLEARN: L = ["EarnLearn — apprenticeship fees", "https://earnlearn.ac.nz/?p=12687"];
const S_BCITO: L = ["BCITO — 2026 fees schedule", "https://bcito.org.nz/documents/75/BCITO_Fees_Schedule_2026_v4.pdf"];
const S_ARA_ELEC: L = ["Ara — Electrical Pre-Trade (L3), 2026 fees", "https://www.ara.ac.nz/products/programme/nz4316-stru-new-zealand-certificate-in-electrical-pre-trade-level-3/"];
const S_ARA_PLUMB: L = ["Ara — Plumbing, Gasfitting and Drainlaying (L3), 2026 fees", "https://search.ara.ac.nz/products/programme/nz2660-stru-new-zealand-certificate-in-plumbing-gasfitting-and-drainlaying-level-3/"];
const S_OP_CARP: L = ["Otago Polytechnic — Construction Trade Skills (Carpentry) L3", "https://www.op.ac.nz/programmes/nzqa/new-zealand-certificate-in-construction-trade-skills-carpentry-level-3/print"];
const S_NMIT: L = ["NMIT — NZ Certificate in Cookery (L4) 2026", "https://www.nmit.ac.nz/study/programmes/trainee-chef-level-4"];
const S_ARA_COOK: L = ["Ara — NZ Certificate in Cookery (L4), 2026 fees", "https://www.ara.ac.nz/products/programme/nz2101-cook-new-zealand-certificate-in-cookery-level-4/"];
const S_SERVICEIQ: L = ["ServiceIQ — NZ Cookery Apprenticeship (30–36 months)", "https://www.serviceiq.org.nz/assets/Attachments/Programmes/Hospitality/H_NZA-Cookery-Flyer_Ed1-Jul25.pdf"];
const S_UOA: L = ["University of Auckland — 2026 domestic fees", "https://www.auckland.ac.nz/en/study/fees-and-money-matters/tuition-fees/domestic-student-fees/undergraduate-domestic-fees.html"];
const S_OTAGO: L = ["University of Otago — 2026 domestic fees", "https://www.otago.ac.nz/courses/fees/domestic-tuition-fees"];
const S_ARA_EN: L = ["Ara — NZ Diploma in Enrolled Nursing, 2026 fees", "https://www.ara.ac.nz/products/programme/nz2889-stru-new-zealand-diploma-in-enrolled-nursing/"];
const S_UOA_MNSC: L = ["University of Auckland — Master of Nursing Science", "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/master-of-nursing-science-mnsc.html"];
const S_UOA_MBCHB: L = ["University of Auckland — MBChB entry categories", "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-medicine-and-bachelor-of-surgery-mbchb.html"];
const S_TRM: L = ["Te Rito Maioha — field-based Bachelor of Teaching (ECE), 2026 fees", "https://www.ecnz.ac.nz/Public/Study/Programme-pages/Bachelor-of-Teaching-ECE.aspx"];
const S_UOA_GDTP: L = ["University of Auckland — Graduate Diploma in Teaching (Primary)", "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/graduate-diploma-in-teaching-primary-graddiptchgprimary.html"];
const S_UOA_GDTS: L = ["University of Auckland — Graduate Diploma in Teaching (Secondary)", "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/graduate-diploma-in-teaching-secondary-graddiptchgsec.html"];
const S_TFNZ: L = ["Teach First NZ — two-year employment-based programme", "https://teachfirstnz.org/"];
const S_TFNZ_PAY: L = ["Teach First NZ — salary and funded diploma", "https://programme.teachfirstnz.org/blog"];
const S_YOOBEE_SD: L = ["Tahatū — Yoobee NZ Diploma in Software Development fees", "https://api.careers.govt.nz/qualifications/view/2604/9324"];
const S_UC_DS: L = ["Tahatū — UC Postgraduate Diploma in Applied Data Science fees", "https://api.careers.govt.nz/qualifications/view/CN0624/7005"];
const S_UOA_BCOM: L = ["University of Auckland — BCom (part time available)", "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-commerce-bcom.html"];
const S_UOA_LLB: L = ["University of Auckland — LLB (part time available)", "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-laws-llb.html"];
const S_AUT_DIPENG: L = ["AUT — Diploma in Engineering (into Year 2 of the BE)", "https://aut.ac.nz/study/study-options/engineering-computer-and-mathematical-sciences/courses/diploma-in-engineering"];
const S_AUT_BE: L = ["AUT — Bachelor of Engineering (Honours) fees", "https://www.aut.ac.nz/study/study-options/engineering-computer-and-mathematical-sciences/courses/bachelor-of-engineering-honours"];
const S_ARA_BENGTECH: L = ["Ara — Bachelor of Engineering Technology, 2026 fees", "https://search.ara.ac.nz/products/programme/ch4018-civl-bachelor-of-engineering-technology-civil/"];
// Australia
const S_NSW_FREE: L = ["TAFE NSW — Fee-Free Apprenticeships", "https://www.tafensw.edu.au/courses/fee-free-apprenticeships"];
const S_CSP: L = ["Dept of Education — 2026 student contribution rates", "https://www.education.gov.au/download/19201/2026-indexed-rates/41481/document/pdf"];
const S_FREE_TAFE: L = ["AEU — Free TAFE made permanent (100,000 places a year from 2027)", "https://www.aeufederal.org.au/news-media/media-releases/2025/free-tafe-now-permanent"];
const S_SWIN_ELEC: L = ["Swinburne — Cert II Electrotechnology (Career Start), 2026", "https://static.swinburne.edu.au/course/tafe/certificate-ii-in-electrotechnology-career-start"];
const S_VU_PLUMB: L = ["Victoria University — Cert II Plumbing (Pre-apprenticeship), 2026", "https://www.vu.edu.au/courses/22701VIC"];
const S_VU_CARP: L = ["Victoria University — Cert II Building and Construction (Pre-apprenticeship), 2026", "https://www.vu.edu.au/courses/certificate-ii-in-building-and-construction-pre-apprenticeship-22614vic"];
const S_GOTAFE_AUTO: L = ["GOTAFE — Cert II Automotive Vocational Preparation, 2026", "https://www.gotafe.vic.edu.au/study/technical-trades/automotive/certificate-ii-in-automotive-vocational-preparation"];
const S_CDU_COOK: L = ["CDU — Cert III Commercial Cookery (Fee-Free TAFE 2026)", "https://www.cdu.edu.au/study/course/sit30821-certificate-iii-commercial-cookery-sit30821?year=2026"];
const S_VU_COOK: L = ["Victoria University — Cert III Commercial Cookery, 2026", "https://www.vu.edu.au/courses/SIT30821"];
const S_VU_NURS: L = ["Victoria University — Diploma of Nursing, 2026", "https://www.vu.edu.au/courses/HLT54121"];
const S_WSU_BN: L = ["TAFE NSW credit transfer — WSU Bachelor of Nursing (80 of 240 points)", "https://credittransfer.tafensw.edu.au/Bachelor-of-Nursing-4691-8685.htm"];
const S_CDU_ENBN: L = ["CDU — Bachelor of Nursing (Enrolled Nurses pathway)", "https://www.cdu.edu.au/study/course/bachelor-nursing-enrolled-nurses-pathway-wnure1?year=2026"];
const S_UNIMELB_MD: L = ["University of Melbourne — Doctor of Medicine (4 years, CSP)", "https://study.unimelb.edu.au/find/courses/graduate/doctor-of-medicine/"];
const S_PSYBA: L = ["Psychology Board of Australia — 5+1 internship program", "https://www.psychologyboard.gov.au/Registration/Provisional/5-1-Internship-Program.aspx"];
const S_UQ_MSW: L = ["University of Queensland — Master of Social Work (Qualifying), 2026", "https://study.uq.edu.au/study-options/programs/master-social-work-qualifying-5767?year=2026"];
const S_VU_ECEC: L = ["Victoria University — Diploma of Early Childhood Education and Care, 2026", "https://www.vu.edu.au/courses/CHC50121"];
const S_WSU_ECE: L = ["TAFE NSW credit transfer — WSU BEd (Early Childhood), up to 120 of 320 points", "https://credittransfer.tafensw.edu.au/Bachelor-of-Education-Early-Childhood-1926-8676.htm"];
const S_ECU_HAT: L = ["ECU — HAT@ECU, 18-month paid pathway", "https://ecu.edu.au/schools/education/courses/hat@ecu"];
const S_UNIMELB_MTS: L = ["University of Melbourne — Master of Teaching (Secondary), CSP", "https://study.unimelb.edu.au/find/courses/graduate/master-of-teaching-secondary/fees/"];
const S_UNIMELB_MTSI: L = ["University of Melbourne — Master of Teaching (Secondary) Internship", "https://study.unimelb.edu.au/find/courses/graduate/master-of-teaching-secondary-internship/"];
const S_TAFENSW_IT: L = ["TAFE NSW — Diploma of Information Technology, 2026", "https://www.tafensw.edu.au/course-areas/information-and-communication-technology/courses/diploma-of-information-technology--ICT50220-01/offerings/ICT50220-01V03-26PMQ-011"];
const S_WSU_IT: L = ["WSU — credit for the Diploma of IT (80 of 240 points)", "https://www.westernsydney.edu.au/tertiary-education-pathways-and-partnerships/all-vet-courses/diploma-of-information-technology"];
const S_WSU_GDDS: L = ["WSU — Graduate Diploma in Data Science", "https://www.westernsydney.edu.au/future/study/courses/postgraduate/graduate-diploma-in-data-science.html"];
const S_VU_ACC: L = ["Victoria University — Diploma of Accounting, 2026", "https://www.vu.edu.au/courses/FNS50222"];
const S_WSU_ACC: L = ["TAFE NSW credit transfer — WSU Bachelor of Business (50 of 240 points)", "https://credittransfer.tafensw.edu.au/Bachelor-of-Business-2786-8669.htm"];
const S_LPAB_FAQ: L = ["LPAB — Diploma in Law: 20 subjects, part time", "https://lpab.nsw.gov.au/content/dcj/legal-profession-admission-board/legal-profession-admission-board-home/diploma-law-course/frequently-asked-question/frequently-asked-questions---general-diploma-in-law-course-infor.html"];
const S_LPAB_FEES: L = ["LPAB — schedule of fees (3 July 2026)", "https://lpab.nsw.gov.au/documents/fee-schedules-/lpab_schedule_of_fees_3_july_2026.pdf"];
const S_UNSW_JD: L = ["UNSW — Juris Doctor, 2026 CSP fee", "https://www.unsw.edu.au/study/postgraduate/juris-doctor"];
// Colombia
const S_SENA: L = ["SENA — free technical training", "https://www.pulzo.com/empleo/sena-abrio-inscripciones-41-programas-tecnicos-2025-PP4207954A"];
const S_SENA_CERT: L = ["Valora Analitik — free SENA skills certification", "https://www.valoraanalitik.com/sena-otorgara-certificaciones-personas-aprendieron-labores-empiricas/"];
const S_GRATUIDAD: L = ["MinEducación — Política de Gratuidad, reglamento (Aug 2026)", "https://www.mineducacion.gov.co/1780/articles-419531_recurso_8.pdf"];
const S_BOSQUE: L = ["Universidad El Bosque — 2026 fees", "https://www.unbosque.edu.co/sites/default/files/2025-12/valores-de-matricula-pregrado-2026.pdf"];
const S_UPB: L = ["UPB Medellín — 2026 fees", "https://portal.upb.edu.co/wp-content/uploads/2026/04/resolucion-tarifas-pregrados-presenciales-2026.pdf"];
const S_UCO: L = ["Universidad Católica de Oriente — 2026 fees", "https://uco.edu.co/wp-content/uploads/2025/10/Tarifas-de-Matricula-2026-1-.pdf"];
const S_SABANA: L = ["Universidad de La Sabana — 2025 fees", "https://unisabana.edu.co/fileadmin/Archivos_de_usuario/Documentos/Documentos_la_Universidad/derechos_pecuniarios/2025/2025-acuerdo-077-precio-matriculas-derechos-pecuciarios.pdf"];
const S_DEC1236: L = ["Decreto 1236 de 2020 — escuelas normales superiores", "https://normograma.icfes.gov.co/docs/pdf/decreto_1236_2020.pdf"];
const S_NORMAL_PASTO: L = ["Escuela Normal Superior de Pasto — PFC, 4 to 5 semesters", "https://www.escuelanormalpasto.edu.co/normalsuperior/wp-content/uploads/2023/07/INSTRUCTIVO-PARA-INSCRIPCIONES-VIRTUALES-PFC-B-2023.pdf"];
const S_DEC2035: L = ["Decreto 2035 de 2005 — pedagogy for non-licenciado teachers", "https://www.dmsjuridica.com/buscador_20179478954/legislacion/decretos/?p=38448"];
const S_UTP_PED: L = ["UTP — pedagogy programme for professionals (2024)", "https://media2.utp.edu.co/programas/5/DIPLOMADO-FINAL.pdf"];
const S_SENA_ADSO: L = ["Colombia.com — free SENA tecnólogos (software: 3,984 hours)", "https://www.colombia.com/educacion/cursos/listado-de-tecnologos-virtuales-y-presenciales-gratuitos-en-el-sena-491371"];
const S_UREP_SENA: L = ["Universidad Republicana — credit for SENA tecnólogos", "https://urepublicana.edu.co/images/documentos/ingenieria_de_sistemas_convenio_sena_2024_I.pdf"];
const S_TEACHER: L = ["Decreto 0299 de 2026 — public teacher pay scale", "https://fecode.edu.co/wp-content/uploads/2026/03/DECRETO-No.-0299-DEL-25-DE-MARZO-DE-2026.pdf"];

// ---------- shared wording ----------
const FREE_TAFE_NOTE: T = [
  "Free TAFE covers tuition for eligible students; materials fees still apply. Free TAFE is permanent from 2027.",
  "Free TAFE cubre la matrícula a quienes cumplen los requisitos; los materiales se pagan aparte. Es permanente desde 2027.",
];
const DEGREE_FIRST: T = ["a bachelor's degree in any field; it is not counted here", "un título universitario en cualquier área; no se cuenta aquí"];

// ============================================================
//  NEW ZEALAND
// ============================================================
const nzApprentice = (fees: number, src: L, prov: L[]): Route => ({
  t: ["Paid apprenticeship", "Aprendizaje pagado"],
  steps: [st(["Apprenticeship: work for an employer and train on the job", "Aprendizaje: trabajas para un empleador y te formas en el trabajo"], 4, "apprenticeship", fees)],
  prov, src: [src],
});
const nzPreTrade = (cert: T, y: number, fees: number, appFees: number, src: L[], prov: L[], d?: T, approxFee?: boolean): Route => ({
  t: ["Pre-trade certificate, then apprenticeship", "Certificado de preoficio y luego aprendizaje"],
  steps: [
    st(cert, y, "technical", fees, d),
    st(["Apprenticeship", "Aprendizaje pagado"], 4, "apprenticeship", appFees),
  ],
  prov, src,
  note: approxFee
    ? ["Useful if you have no employer yet. It does not shorten the apprenticeship. The certificate fee is the polytechnic's approximate figure.",
       "Sirve si todavía no tienes empleador. No acorta el aprendizaje. La matrícula del certificado es la cifra aproximada del politécnico."]
    : ["Useful if you have no employer yet: you start as a first-year apprentice, so it adds time rather than shortening the apprenticeship.",
       "Sirve si todavía no tienes empleador: entras como aprendiz de primer año, así que suma tiempo en vez de acortar el aprendizaje."],
});

const nzEngineering = (major: T): Route[] => [
  {
    t: ["Bachelor of Engineering (Honours)", "Ingeniería (Bachelor of Engineering Honours)"],
    steps: [st([`BE(Hons), ${major[0]}`, `BE(Hons), ${major[1]}`], 4, "full-time", 40632)],
    prov: p("uoa", "uc", "aut"), src: [S_UOA],
  },
  {
    t: ["Start with a one-year diploma", "Empezar con un diplomado de un año"],
    steps: [
      st(["AUT Diploma in Engineering", "Diplomado en Ingeniería de AUT"], 1, "full-time", 8190),
      st(["BE(Hons) from Year 2", "BE(Hons) desde el segundo año"], 3, "full-time", 31893),
    ],
    prov: p("aut"), src: [S_AUT_DIPENG, S_AUT_BE],
    note: ["Credits move you into Year 2 of the degree; some summer courses are needed to finish in four years.",
           "Los créditos te pasan al segundo año del título; se necesitan algunos cursos de verano para terminar en cuatro años."],
  },
  {
    t: ["Engineering technologist degree", "Título de tecnólogo en ingeniería"],
    steps: [st(["Bachelor of Engineering Technology", "Bachelor of Engineering Technology"], 3, "full-time", 28605)],
    prov: p("ara", "wintec", "unitec"), src: [S_ARA_BENGTECH],
    related: true,
    note: ["Leads to engineering technologist jobs, a related role with its own pay scale.",
           "Lleva a empleos de tecnólogo en ingeniería, un rol relacionado con su propia escala salarial."],
  },
];

const NZ: Record<string, Route[]> = {
  "elec-nz": [
    nzApprentice(11596, S_EARNLEARN, p("etco", "earnlearn")),
    nzPreTrade(["NZ Certificate in Electrical Pre-Trade (Level 3)", "Certificado de preoficio eléctrico (nivel 3)"], 1, 4010, 11596, [S_ARA_ELEC, S_EARNLEARN], p("ara", "ucol", "op")),
  ],
  "plum-nz": [
    nzApprentice(10816, S_EARNLEARN, p("earnlearn")),
    nzPreTrade(["NZ Certificate in Plumbing, Gasfitting and Drainlaying (Level 3)", "Certificado de plomería, gas y drenaje (nivel 3)"], 0.5, 3176, 10816, [S_ARA_PLUMB, S_EARNLEARN], p("ara", "northtec", "ucol"), ["23 weeks", "23 semanas"]),
  ],
  "carp-nz": [
    nzApprentice(4876, S_BCITO, p("bcito")),
    nzPreTrade(["NZ Certificate in Construction Trade Skills (Carpentry, Level 3)", "Certificado de oficios de construcción (carpintería, nivel 3)"], 1, 7599, 4876, [S_OP_CARP, S_BCITO], p("op", "sit", "ucol"), undefined, true),
  ],
  "chef-nz": [
    {
      t: ["Full-time cookery certificate", "Certificado de cocina de tiempo completo"],
      steps: [st(["NZ Certificate in Cookery (Level 4)", "Certificado de cocina (nivel 4)"], 1, "technical", 8420)],
      prov: p("nmit", "ara", "northtec"), src: [S_NMIT, S_ARA_COOK],
    },
    {
      t: ["Apprenticeship in a commercial kitchen", "Aprendizaje pagado en una cocina comercial"],
      steps: [st(["Work as a cook and train on the job", "Trabajas como cocinero y te formas en el trabajo"], 3, "apprenticeship", null, ["30–36 months", "30 a 36 meses"])],
      prov: p("serviceiq"), src: [S_SERVICEIQ],
      note: ["You are employed while you train. Fees are not published; ask ServiceIQ.",
             "Tienes empleo mientras te formas. La matrícula no está publicada; pregunta a ServiceIQ."],
    },
  ],
  "nurse-nz": [
    {
      t: ["Bachelor of Nursing", "Título de enfermería (Bachelor of Nursing)"],
      steps: [st(["Bachelor of Nursing", "Bachelor of Nursing"], 3, "full-time", 26356)],
      prov: p("uoa", "aut", "ara"), src: [S_UOA],
    },
    {
      t: ["Enrolled nurse first", "Primero enfermero/a auxiliar (enrolled nurse)"],
      steps: [
        st(["NZ Diploma in Enrolled Nursing", "Diplomado en enfermería auxiliar"], 1.5, "full-time", 13500),
        st(["Bachelor of Nursing", "Bachelor of Nursing"], 3, "full-time", 26356),
      ],
      prov: p("ara", "wintec", "toi"), src: [S_ARA_EN, S_UOA],
      note: ["You can work as an enrolled nurse before the degree. Some schools credit part of the diploma, which would shorten the degree; ask before you enrol.",
             "Puedes trabajar como enfermero/a auxiliar antes del título. Algunas escuelas reconocen parte del diplomado y eso acorta el título; pregunta antes de inscribirte."],
    },
    {
      t: ["Graduate entry", "Ingreso para graduados"],
      steps: [st(["Master of Nursing Science", "Master of Nursing Science"], 2, "full-time", 23090)],
      prov: p("uoa", "aut"), src: [S_UOA_MNSC],
      prior: ["a relevant bachelor's degree, such as health sciences; it is not counted here", "un título relacionado, como ciencias de la salud; no se cuenta aquí"],
    },
  ],
  "pharm-nz": [
    {
      t: ["Bachelor of Pharmacy", "Título de farmacia (Bachelor of Pharmacy)"],
      steps: [st(["First year in health sciences, then the BPharm", "Primer año en ciencias de la salud y luego el BPharm"], 4, "full-time", 39542)],
      prov: p("uoa", "otago"), src: [S_UOA],
    },
  ],
  "physio-nz": [
    {
      t: ["Bachelor of Physiotherapy", "Título de fisioterapia (Bachelor of Physiotherapy)"],
      steps: [st(["Bachelor of Physiotherapy", "Bachelor of Physiotherapy"], 4, "full-time", 37992)],
      prov: p("otago", "aut"), src: [S_OTAGO],
    },
  ],
  "gp-nz": [
    {
      t: ["Medicine from school", "Medicina desde el colegio"],
      steps: [
        st(["First year: Health Sciences or Biomedical Science", "Primer año: ciencias de la salud o biomedicina"], 1, "full-time", 9886),
        st(["MBChB, years 2 to 6", "MBChB, años 2 a 6"], 5, "full-time", 97656),
      ],
      prov: p("uoa", "otago"), src: [S_UOA, S_UOA_MBCHB],
      note: ["Medical degree only; GP specialist training adds further years.", "Solo el título de medicina; la especialización como médico general suma más años."],
    },
    {
      t: ["Graduate entry", "Ingreso para graduados"],
      steps: [st(["MBChB, years 2 to 6", "MBChB, años 2 a 6"], 5, "full-time", 97656)],
      prov: p("uoa", "otago"), src: [S_UOA_MBCHB, S_UOA],
      prior: ["a degree with a B+ average; some graduates also need first-year courses", "un título con promedio B+; algunos graduados también deben tomar cursos de primer año"],
    },
  ],
  "dent-nz": [
    {
      t: ["Bachelor of Dental Surgery", "Título de odontología (BDS)"],
      steps: [st(["First year in health sciences, then the BDS", "Primer año en ciencias de la salud y luego el BDS"], 5, "full-time", 88311)],
      prov: p("otago"), src: [S_OTAGO],
      note: ["Otago is the only dental school in New Zealand.", "Otago es la única facultad de odontología de Nueva Zelanda."],
    },
  ],
  "ece-nz": [
    {
      t: ["Teaching degree on campus", "Título de docencia presencial"],
      steps: [st(["Bachelor of Education (Teaching), early childhood", "Bachelor of Education (Teaching), educación infantil"], 3, "full-time", 22849)],
      prov: p("uoa", "unitec"), src: [S_UOA],
    },
    {
      t: ["Field-based degree", "Título con práctica en un centro"],
      steps: [st(["Bachelor of Teaching (ECE), at least 12 hours a week in a centre", "Bachelor of Teaching (ECE), mínimo 12 horas a la semana en un centro"], 3, "full-time", 22320)],
      prov: p("trm"), src: [S_TRM],
      note: ["If the centre pays you for those hours, your real cost is lower. A six-year part-time option exists.",
             "Si el centro te paga esas horas, tu costo real es menor. También existe una opción de medio tiempo en seis años."],
    },
  ],
  "prim-nz": [
    {
      t: ["Teaching degree", "Título de docencia"],
      steps: [st(["Bachelor of Education (Teaching), primary", "Bachelor of Education (Teaching), primaria"], 3, "full-time", 22849)],
      prov: p("uoa", "vuw", "uc"), src: [S_UOA],
    },
    {
      t: ["Degree first, then a one-year teaching diploma", "Primero un título y luego un diplomado de docencia de un año"],
      steps: [
        st(["Bachelor's degree in any subject", "Título en cualquier área"], 3, "full-time", 22849),
        st(["Graduate Diploma in Teaching (Primary)", "Diplomado de posgrado en docencia (primaria)"], 1, "full-time", 9578),
      ],
      prov: p("uoa", "uc", "massey"), src: [S_UOA, S_UOA_GDTP],
    },
  ],
  "sec-nz": [
    {
      t: ["Degree, then a one-year teaching diploma", "Título y luego un diplomado de docencia de un año"],
      steps: [
        st(["Bachelor's degree in a school subject", "Título en una materia escolar"], 3, "full-time", 22849),
        st(["Graduate Diploma in Teaching (Secondary)", "Diplomado de posgrado en docencia (secundaria)"], 1, "full-time", 9578),
      ],
      prov: p("uoa", "vuw", "uc"), src: [S_UOA, S_UOA_GDTS],
    },
    {
      t: ["Teach First NZ: paid while you train", "Teach First NZ: te pagan mientras te formas"],
      steps: [
        st(["Bachelor's degree in a priority subject", "Título en una materia prioritaria"], 3, "full-time", 22849),
        st(["Teach in a partner school while you study", "Enseñas en un colegio aliado mientras estudias"], 2, "employment", 0),
      ],
      prov: p("tfnz"), src: [S_UOA, S_TFNZ, S_TFNZ_PAY],
      note: ["You are paid on the untrained teacher scale and the Postgraduate Diploma in Secondary Teaching is fully funded.",
             "Te pagan en la escala de docentes sin título y el diplomado de posgrado en docencia secundaria está financiado."],
    },
  ],
  "swe-nz": [
    {
      t: ["Computer science degree", "Título en ciencias de la computación"],
      steps: [st(["Bachelor of Science, computer science", "Bachelor of Science, ciencias de la computación"], 3, "full-time", 30474)],
      prov: p("uoa", "vuw", "uc"), src: [S_UOA],
    },
    {
      t: ["Two-year software diploma", "Diplomado de software de dos años"],
      steps: [st(["NZ Diploma in Software Development (Level 6)", "Diplomado en desarrollo de software (nivel 6)"], 2, "technical", 16018)],
      prov: p("yoobee", "vision"), src: [S_YOOBEE_SD],
      note: ["No university entrance needed; also offered online.", "No necesitas requisitos de ingreso universitario; también se ofrece en línea."],
    },
  ],
  "data-nz": [
    {
      t: ["Data science degree", "Título en ciencia de datos"],
      steps: [st(["Bachelor of Science, data science", "Bachelor of Science, ciencia de datos"], 3, "full-time", 30474)],
      prov: p("uoa", "vuw", "uc"), src: [S_UOA],
    },
    {
      t: ["One-year postgraduate diploma", "Diplomado de posgrado de un año"],
      steps: [st(["Postgraduate Diploma in Applied Data Science", "Diplomado de posgrado en ciencia de datos aplicada"], 1, "full-time", 8538)],
      prov: p("uc"), src: [S_UC_DS],
      prior: DEGREE_FIRST,
    },
  ],
  "acc-nz": [
    {
      t: ["Commerce degree", "Título en comercio"],
      steps: [st(["Bachelor of Commerce, accounting major", "Bachelor of Commerce, énfasis en contabilidad"], 3, "full-time", 24620)],
      prov: p("uoa", "vuw", "aut"), src: [S_UOA],
    },
    {
      t: ["Part time while you work", "Medio tiempo mientras trabajas"],
      steps: [st(["Bachelor of Commerce, half load", "Bachelor of Commerce, media carga"], 6, "part-time", 24620)],
      prov: p("uoa", "massey"), src: [S_UOA_BCOM, S_UOA],
      approx: true,
      note: ["Same fees spread out; the length depends on your study load.", "La misma matrícula repartida; la duración depende de tu carga de estudio."],
    },
  ],
  "law-nz": [
    {
      t: ["Bachelor of Laws", "Título de derecho (LLB)"],
      steps: [st(["Bachelor of Laws (LLB)", "Bachelor of Laws (LLB)"], 4, "full-time", 32827)],
      prov: p("uoa", "vuw", "otago"), src: [S_UOA],
    },
    {
      t: ["Part time while you work", "Medio tiempo mientras trabajas"],
      steps: [st(["LLB, half load", "LLB, media carga"], 8, "part-time", 32827)],
      prov: p("uoa", "waikato"), src: [S_UOA_LLB, S_UOA],
      approx: true,
      note: ["Same fees spread out; the length depends on your study load.", "La misma matrícula repartida; la duración depende de tu carga de estudio."],
    },
  ],
  "civil-nz": nzEngineering(["civil", "civil"]),
  "eleng-nz": nzEngineering(["electrical", "eléctrica"]),
  "mech-nz": nzEngineering(["mechanical", "mecánica"]),
  "arch-nz": [
    {
      t: ["Architecture degree and master's", "Título y maestría en arquitectura"],
      steps: [
        st(["Bachelor of Architectural Studies", "Bachelor of Architectural Studies"], 3, "full-time", 30474),
        st(["Master of Architecture (Professional)", "Master of Architecture (Professional)"], 2, "full-time", 19111),
      ],
      prov: p("uoa", "vuw", "unitec"), src: [S_UOA],
    },
  ],
  "graph-nz": [
    {
      t: ["Design degree", "Título en diseño"],
      steps: [st(["Bachelor of Design", "Bachelor of Design"], 3, "full-time", 30474)],
      prov: p("uoa", "massey", "aut"), src: [S_UOA],
    },
  ],
};

// ============================================================
//  AUSTRALIA (CSP = Commonwealth supported place, 2026 rates)
// ============================================================
const auApprentice = (prov: L[], src: L): Route => ({
  t: ["Paid apprenticeship", "Aprendizaje pagado"],
  steps: [st(["Apprenticeship: work for an employer and train at TAFE", "Aprendizaje: trabajas para un empleador y te formas en TAFE"], 4, "apprenticeship", 0)],
  prov, src: [src],
  note: ["Fee-free in NSW; other states charge apprenticeship fees.", "Gratis en Nueva Gales del Sur; otros estados cobran el aprendizaje."],
});
const auPreApp = (cert: T, y: number, d: T, prov: L[], src: L): Route => ({
  t: ["Pre-apprenticeship, then apprenticeship", "Preaprendizaje y luego aprendizaje"],
  steps: [
    st(cert, y, "technical", 0, d),
    st(["Apprenticeship", "Aprendizaje pagado"], 4, "apprenticeship", 0),
  ],
  prov, src: [src, S_NSW_FREE, S_FREE_TAFE],
  note: ["Good if you have no employer yet. Free TAFE covers the course for eligible students (materials extra); the apprenticeship is fee-free in NSW.",
         "Sirve si todavía no tienes empleador. Free TAFE cubre el curso a quienes cumplen requisitos (materiales aparte); el aprendizaje es gratis en Nueva Gales del Sur."],
});
const auSingle = (t: T, step: T, y: number, fees: number, prov: L[]): Route[] => [
  { t, steps: [st(step, y, "full-time", fees)], prov, src: [S_CSP] },
];
const auHat = (level: T): Route => ({
  t: ["Paid pathway for graduates (HAT)", "Ruta pagada para graduados (HAT)"],
  steps: [st([`Master of Teaching (${level[0]}) with paid work in a school`, `Master of Teaching (${level[1]}) con trabajo pagado en un colegio`], 1.5, "work-study", 7107)],
  prov: p("ecu"), src: [S_ECU_HAT, S_CSP],
  prior: ["a bachelor's degree with good marks; it is not counted here", "un título con buenas notas; no se cuenta aquí"],
  note: ["Includes A$18,000 in scholarships (not deducted) and up to 160 days of paid work. Fee assumes a Commonwealth supported place.",
         "Incluye A$18.000 en becas (no descontadas) y hasta 160 días de trabajo pagado. La matrícula supone un cupo con apoyo del Gobierno (CSP)."],
});
const auEngineering = (major: T): Route[] => auSingle(
  ["Bachelor of Engineering (Honours)", "Ingeniería (Bachelor of Engineering Honours)"],
  [`BE(Hons), ${major[0]}`, `BE(Hons), ${major[1]}`], 4, 38148, p("unsw", "monash", "qut"));

const AU: Record<string, Route[]> = {
  "elec-au": [
    auApprentice(p("tafensw"), S_NSW_FREE),
    auPreApp(["Cert II in Electrotechnology (Career Start)", "Certificado II en electrotecnia (preaprendizaje)"], 0.2, ["10 weeks", "10 semanas"], p("swin", "nmtafe"), S_SWIN_ELEC),
  ],
  "plum-au": [
    auApprentice(p("tafensw"), S_NSW_FREE),
    auPreApp(["Cert II in Plumbing (Pre-apprenticeship)", "Certificado II en plomería (preaprendizaje)"], 0.25, ["3 months", "3 meses"], p("vu", "swin"), S_VU_PLUMB),
  ],
  "carp-au": [
    auApprentice(p("tafensw"), S_NSW_FREE),
    auPreApp(["Cert II in Building and Construction (Carpentry)", "Certificado II en construcción (carpintería)"], 0.42, ["5 months", "5 meses"], p("vu", "swin"), S_VU_CARP),
  ],
  "mmech-au": [
    auApprentice(p("tafensw"), S_NSW_FREE),
    auPreApp(["Cert II in Automotive Vocational Preparation", "Certificado II en preparación automotriz"], 0.25, ["3 months", "3 meses"], p("gotafe", "tafeqld", "cqu"), S_GOTAFE_AUTO),
  ],
  "chef-au": [
    {
      t: ["Paid apprenticeship", "Aprendizaje pagado"],
      steps: [st(["Cert III in Commercial Cookery as an apprentice", "Certificado III en cocina comercial como aprendiz"], 3, "apprenticeship", 0)],
      prov: p("cdu", "tafensw"), src: [S_CDU_COOK],
    },
    {
      t: ["Full-time cookery course", "Curso de cocina de tiempo completo"],
      steps: [st(["Cert III in Commercial Cookery, full time", "Certificado III en cocina comercial, tiempo completo"], 1, "technical", 0)],
      prov: p("vu", "nmtafe"), src: [S_VU_COOK, S_FREE_TAFE],
      note: FREE_TAFE_NOTE,
    },
  ],
  "nurse-au": [
    {
      t: ["Bachelor of Nursing", "Título de enfermería (Bachelor of Nursing)"],
      steps: [st(["Bachelor of Nursing", "Bachelor of Nursing"], 3, "full-time", 14214)],
      prov: p("uts", "wsu", "deakin"), src: [S_CSP],
    },
    {
      t: ["Enrolled nurse first", "Primero enfermero/a auxiliar (enrolled nurse)"],
      steps: [
        st(["Diploma of Nursing at TAFE", "Diploma of Nursing en TAFE"], 2, "technical", 0),
        st(["Bachelor of Nursing with one year of credit", "Bachelor of Nursing con un año reconocido"], 2, "full-time", 9476),
      ],
      prov: p("vu", "wsu", "cdu"), src: [S_VU_NURS, S_WSU_BN, S_CDU_ENBN, S_CSP],
      note: ["You can work as an enrolled nurse from year three. Free TAFE covers the diploma for eligible students; the degree credit needs registration as an enrolled nurse.",
             "Puedes trabajar como enfermero/a auxiliar desde el tercer año. Free TAFE cubre el diploma a quienes cumplen requisitos; el reconocimiento exige registro como enfermero/a auxiliar."],
    },
  ],
  "pharm-au": auSingle(["Bachelor of Pharmacy", "Título de farmacia (Bachelor of Pharmacy)"], ["Bachelor of Pharmacy (Honours)", "Bachelor of Pharmacy (Honours)"], 4, 38148, p("usyd", "monash", "uq")),
  "physio-au": auSingle(["Physiotherapy degree", "Título de fisioterapia"], ["Bachelor of Physiotherapy", "Bachelor of Physiotherapy"], 4, 38148, p("usyd", "monash", "uq")),
  "gp-au": [
    {
      t: ["Medicine from school", "Medicina desde el colegio"],
      steps: [st(["Undergraduate medicine", "Medicina de pregrado"], 6, "full-time", 81348)],
      prov: p("unsw", "monash", "adelaide"), src: [S_CSP],
      note: ["Medical degree only; GP training adds further years.", "Solo el título de medicina; la formación como médico general suma más años."],
    },
    {
      t: ["Graduate entry", "Ingreso para graduados"],
      steps: [st(["Doctor of Medicine (MD)", "Doctor of Medicine (MD)"], 4, "full-time", 54232)],
      prov: p("unimelb", "usyd", "uq"), src: [S_UNIMELB_MD, S_CSP],
      prior: DEGREE_FIRST,
    },
  ],
  "dent-au": auSingle(["Dentistry degree", "Título de odontología"], ["Bachelor of Dental Surgery", "Bachelor of Dental Surgery"], 5, 67790, p("adelaide", "uq", "csu")),
  "psych-au": [
    {
      t: ["Four-year sequence and a master's (4+2)", "Cuatro años y una maestría (4+2)"],
      steps: [
        st(["Accredited four-year psychology sequence", "Secuencia acreditada de psicología de cuatro años"], 4, "full-time", 38148),
        st(["Master of Professional or Clinical Psychology", "Maestría en psicología profesional o clínica"], 2, "full-time", 9476),
      ],
      prov: p("unsw", "monash", "uq"), src: [S_CSP],
    },
    {
      t: ["Fifth year and a paid internship (5+1)", "Quinto año y práctica pagada (5+1)"],
      steps: [
        st(["Accredited four-year psychology sequence", "Secuencia acreditada de psicología de cuatro años"], 4, "full-time", 38148),
        st(["Master of Professional Psychology", "Master of Professional Psychology"], 1, "full-time", 4738),
        st(["Supervised internship in a work role", "Práctica supervisada en un puesto de trabajo"], 1, "employment", 0),
      ],
      prov: p("cqu", "cairnmillar"), src: [S_PSYBA, S_CSP],
      note: ["After the internship you sit the National Psychology Exam. The fifth-year fee assumes a Commonwealth supported place.",
             "Después de la práctica presentas el examen nacional de psicología. La matrícula del quinto año supone un cupo CSP."],
    },
  ],
  "sw-au": [
    {
      t: ["Bachelor of Social Work", "Título de trabajo social"],
      steps: [st(["Bachelor of Social Work", "Bachelor of Social Work"], 4, "full-time", 38148)],
      prov: p("unsw", "monash", "usyd"), src: [S_CSP],
    },
    {
      t: ["Two-year qualifying master's", "Maestría habilitante de dos años"],
      steps: [st(["Master of Social Work (Qualifying)", "Master of Social Work (Qualifying)"], 2, "full-time", 19080)],
      prov: p("uq", "wsu", "uow"), src: [S_UQ_MSW],
      prior: ["a relevant bachelor's degree with some social and behavioural science; it is not counted here", "un título relacionado con algo de ciencias sociales y del comportamiento; no se cuenta aquí"],
    },
  ],
  "ece-au": [
    {
      t: ["Early childhood teaching degree", "Título de docencia infantil"],
      steps: [st(["Bachelor of Education (Early Childhood)", "Bachelor of Education (Early Childhood)"], 4, "full-time", 18952)],
      prov: p("mq", "wsu", "qut"), src: [S_CSP],
    },
    {
      t: ["TAFE diploma first", "Primero un diploma en TAFE"],
      steps: [
        st(["Diploma of Early Childhood Education and Care", "Diploma de educación y cuidado infantil"], 1, "technical", 0),
        st(["Bachelor of Education (Early Childhood) with credit", "Bachelor of Education (Early Childhood) con créditos reconocidos"], 2.5, "full-time", 11845),
      ],
      prov: p("vu", "wsu"), src: [S_VU_ECEC, S_WSU_ECE, S_CSP],
      note: ["You can work as a diploma educator during the degree, and the diploma can be done as a paid traineeship. Free TAFE covers it for eligible students.",
             "Puedes trabajar como educador/a con diploma durante el título, y el diploma se puede hacer como formación pagada (traineeship). Free TAFE lo cubre a quienes cumplen requisitos."],
    },
    auHat(["Early Childhood", "educación infantil"]),
  ],
  "prim-au": [
    {
      t: ["Primary teaching degree", "Título de docencia primaria"],
      steps: [st(["Bachelor of Education (Primary)", "Bachelor of Education (Primary)"], 4, "full-time", 18952)],
      prov: p("acu", "wsu", "qut"), src: [S_CSP],
    },
    {
      t: ["Master of Teaching after a degree", "Master of Teaching después de un título"],
      steps: [st(["Master of Teaching (Primary)", "Master of Teaching (Primary)"], 2, "full-time", 9476)],
      prov: p("unimelb", "monash", "unsw"), src: [S_CSP],
      prior: DEGREE_FIRST,
    },
    auHat(["Primary", "primaria"]),
  ],
  "sec-au": [
    {
      t: ["Secondary teaching degree", "Título de docencia secundaria"],
      steps: [st(["Bachelor of Education (Secondary)", "Bachelor of Education (Secondary)"], 4, "full-time", 18952)],
      prov: p("usyd", "monash", "qut"), src: [S_CSP],
    },
    {
      t: ["Master of Teaching after a degree", "Master of Teaching después de un título"],
      steps: [st(["Master of Teaching (Secondary)", "Master of Teaching (Secondary)"], 2, "full-time", 9476)],
      prov: p("unimelb", "unsw", "monash"), src: [S_UNIMELB_MTS, S_CSP],
      prior: ["a bachelor's degree in a school subject; it is not counted here", "un título en una materia escolar; no se cuenta aquí"],
    },
    {
      t: ["Paid internship master's", "Maestría con práctica pagada"],
      steps: [st(["Master of Teaching (Secondary) Internship: full-time paraprofessional salary", "Master of Teaching (Secondary) Internship: salario de asistente de tiempo completo"], 2, "employment", 9476)],
      prov: p("unimelb"), src: [S_UNIMELB_MTSI, S_CSP],
      prior: ["a bachelor's degree in a school subject; it is not counted here", "un título en una materia escolar; no se cuenta aquí"],
      note: ["You work in a school with one paid study day a week.", "Trabajas en un colegio con un día de estudio pagado a la semana."],
    },
  ],
  "swe-au": [
    {
      t: ["Computer science degree", "Título en ciencias de la computación"],
      steps: [st(["Bachelor of Computer Science", "Bachelor of Computer Science"], 3, "full-time", 28611)],
      prov: p("unsw", "usyd", "monash"), src: [S_CSP],
    },
    {
      t: ["TAFE diploma first", "Primero un diploma en TAFE"],
      steps: [
        st(["Diploma of Information Technology", "Diploma de tecnologías de la información"], 0.5, "technical", 0, ["6 months", "6 meses"]),
        st(["Bachelor of ICT or Computer Science with one year of credit", "Bachelor en TIC o computación con un año reconocido"], 2, "full-time", 19074),
      ],
      prov: p("tafensw", "wsu"), src: [S_TAFENSW_IT, S_WSU_IT, S_CSP],
      note: ["The diploma costs A$0 to A$4,060 depending on eligibility. Western Sydney guarantees entry and one year of credit.",
             "El diploma cuesta entre A$0 y A$4.060 según tus requisitos. Western Sydney garantiza el ingreso y un año reconocido."],
    },
  ],
  "data-au": [
    {
      t: ["Data science degree", "Título en ciencia de datos"],
      steps: [st(["Bachelor of Data Science", "Bachelor of Data Science"], 3, "full-time", 14214)],
      prov: p("unsw", "uts", "monash"), src: [S_CSP],
    },
    {
      t: ["One-year graduate diploma", "Diplomado de posgrado de un año"],
      steps: [st(["Graduate Diploma in Data Science", "Graduate Diploma in Data Science"], 1, "full-time", 11885)],
      prov: p("wsu"), src: [S_WSU_GDDS],
      prior: DEGREE_FIRST,
      note: ["Fee shown is the indicative full fee; a few discounted CSP places exist.", "La matrícula es la tarifa completa indicativa; hay pocos cupos con descuento (CSP)."],
    },
  ],
  "acc-au": [
    {
      t: ["Commerce or accounting degree", "Título en comercio o contaduría"],
      steps: [st(["Bachelor of Commerce (Accounting)", "Bachelor of Commerce (Accounting)"], 3, "full-time", 52197)],
      prov: p("unsw", "monash", "uts"), src: [S_CSP],
    },
    {
      t: ["TAFE diploma first", "Primero un diploma en TAFE"],
      steps: [
        st(["Diploma of Accounting", "Diploma de contabilidad"], 0.5, "technical", 0, ["6 months", "6 meses"]),
        st(["Bachelor of Business (Accounting) with credit", "Bachelor of Business (Accounting) con créditos reconocidos"], 2.4, "full-time", 41323),
      ],
      prov: p("vu", "wsu"), src: [S_VU_ACC, S_WSU_ACC, S_CSP],
      note: ["Western Sydney guarantees entry and 50 of 240 credit points. Free TAFE covers the diploma for eligible students.",
             "Western Sydney garantiza el ingreso y 50 de 240 créditos. Free TAFE cubre el diploma a quienes cumplen requisitos."],
    },
  ],
  "law-au": [
    {
      t: ["Bachelor of Laws", "Título de derecho (LLB)"],
      steps: [st(["Bachelor of Laws (LLB)", "Bachelor of Laws (LLB)"], 4, "full-time", 69596)],
      prov: p("usyd", "unsw", "monash"), src: [S_CSP],
    },
    {
      t: ["Diploma in Law while you work (NSW)", "Diploma en Derecho mientras trabajas (NSW)"],
      steps: [st(["LPAB Diploma in Law: 20 subjects, part time", "Diploma en Derecho del LPAB: 20 materias, medio tiempo"], 4, "part-time", 24955)],
      prov: p("lpab", "lec"), src: [S_LPAB_FAQ, S_LPAB_FEES],
      note: ["Equivalent to a law degree for admission. Most students finish in four to five years; exam and textbook costs are extra.",
             "Equivale a un título de derecho para la admisión. La mayoría termina en cuatro a cinco años; exámenes y libros aparte."],
    },
    {
      t: ["Juris Doctor after a degree", "Juris Doctor después de un título"],
      steps: [st(["Juris Doctor (JD)", "Juris Doctor (JD)"], 3, "full-time", 52500)],
      prov: p("unsw", "unimelb", "uts"), src: [S_UNSW_JD],
      prior: DEGREE_FIRST,
      note: ["CSP places are limited and competitive.", "Los cupos CSP son pocos y competidos."],
    },
  ],
  "civil-au": auEngineering(["civil", "civil"]),
  "mech-au": auEngineering(["mechanical", "mecánica"]),
  "arch-au": [
    {
      t: ["Architecture degree and master's", "Título y maestría en arquitectura"],
      steps: [
        st(["Bachelor of Design in Architecture", "Bachelor of Design in Architecture"], 3, "full-time", 28611),
        st(["Master of Architecture", "Master of Architecture"], 2, "full-time", 19074),
      ],
      prov: p("usyd", "unsw", "unimelb"), src: [S_CSP],
    },
  ],
  "graph-au": auSingle(["Design degree", "Título en diseño"], ["Bachelor of Design (Visual Communication)", "Bachelor of Design (Visual Communication)"], 3, 28611, p("uts", "rmit", "monash")),
};

// ============================================================
//  COLOMBIA
// ============================================================
const GRATUIDAD_NOTE: T = [
  "Tuition is free for strata 1 to 3, Sisbén A to C and other groups under the Política de Gratuidad; others pay by family income. Entry is by exam and places are limited. Length varies by university.",
  "La matrícula es gratis para estratos 1 a 3, Sisbén A a C y otros grupos con la Política de Gratuidad; los demás pagan según ingresos. El ingreso es por examen y los cupos son limitados. La duración varía por universidad.",
];
const coTrade = (prog: T): Route[] => [
  {
    t: ["SENA técnico (free)", "Técnico del SENA (gratis)"],
    steps: [st(prog, 1.5, "technical", 0)],
    prov: p("sena"), src: [S_SENA],
  },
  {
    t: ["Learn on the job, then certify with SENA", "Aprender trabajando y certificarte con el SENA"],
    steps: [
      st(["Work in the trade and learn on the job", "Trabajar en el oficio y aprender en la práctica"], null, "employment", 0),
      st(["Free SENA skills assessment and certificate", "Evaluación y certificación de competencias gratis del SENA"], null, "employment", 0),
    ],
    prov: p("sena"), src: [S_SENA_CERT],
    note: ["For people who already work in the trade without a title. SENA certifies more than 100 occupations at no cost.",
           "Para quienes ya trabajan en el oficio sin título. El SENA certifica más de 100 ocupaciones sin costo."],
  },
];
const coPrivate = (t: T, y: number, fees: number, src: L, prov: L[]): Route => ({
  t: ["Private university", "Universidad privada"],
  steps: [st(t, y, "full-time", fees)], prov, src: [src],
});
const coPublic = (t: T, y: number, prov: L[]): Route => ({
  t: ["Public university", "Universidad pública"],
  steps: [st(t, y, "full-time", 0)], prov, src: [S_GRATUIDAD],
  approx: true, note: GRATUIDAD_NOTE,
});
const coPair = (t: T, y: number, fees: number, src: L, priv: L[], pub: L[]): Route[] => [coPrivate(t, y, fees, src, priv), coPublic(t, y, pub)];

const CO: Record<string, Route[]> = {
  "elec-co": coTrade(["Técnico in electrical installations", "Técnico en instalaciones eléctricas"]),
  "plum-co": coTrade(["Técnico in plumbing and sanitary installations", "Técnico en instalaciones hidrosanitarias"]),
  "carp-co": coTrade(["Técnico in carpentry", "Técnico en carpintería"]),
  "mmech-co": coTrade(["Técnico in vehicle mechanics", "Técnico en mecánica automotriz"]),
  "chef-co": coTrade(["Técnico in cooking", "Técnico en cocina"]),
  "nurse-co": coPair(["Nursing degree", "Enfermería"], 4, 75720000, S_BOSQUE, p("bosque", "javeriana", "sabana"), p("unal", "udea", "univalle")),
  "pharm-co": coPair(["Pharmaceutical chemistry degree", "Química farmacéutica"], 4.5, 86913000, S_BOSQUE, p("bosque", "icesi", "ces"), p("unal", "udea")),
  "physio-co": coPair(["Physiotherapy degree", "Fisioterapia"], 4, 75720000, S_BOSQUE, p("bosque", "rosario", "ces"), p("unal", "univalle", "uis")),
  "gp-co": coPair(["Medicine degree", "Medicina"], 6, 394248000, S_BOSQUE, p("bosque", "javeriana", "rosario"), p("unal", "udea", "univalle")),
  "dent-co": coPair(["Dentistry degree", "Odontología"], 5, 144050000, S_BOSQUE, p("bosque", "javeriana", "ces"), p("unal", "udea", "univalle")),
  "psych-co": [
    ...coPair(["Psychology degree", "Psicología"], 5, 99900000, S_BOSQUE, p("bosque", "javeriana", "andes"), p("unal", "udea", "univalle")),
    {
      t: ["Virtual public university while you work", "Universidad pública virtual mientras trabajas"],
      steps: [st(["Psychology, virtual", "Psicología virtual"], 5, "part-time", 0)],
      prov: p("unad"), src: [S_GRATUIDAD],
      approx: true,
      note: ["UNAD is public and covered by the Política de Gratuidad for eligible students. Length varies with your study load.",
             "La UNAD es pública y tiene Gratuidad para quienes cumplen requisitos. La duración depende de tu carga de estudio."],
    },
  ],
  "ece-co": [
    coPrivate(["Licenciatura in early childhood education", "Licenciatura en educación infantil"], 4, 37248000, S_BOSQUE, p("bosque", "javeriana", "sabana")),
    coPublic(["Licenciatura in early childhood education", "Licenciatura en educación infantil"], 4, p("upn", "udea", "unad")),
    {
      t: ["Escuela normal superior", "Escuela normal superior"],
      steps: [st(["Programa de Formación Complementaria (normalista superior)", "Programa de Formación Complementaria (normalista superior)"], 2.5, "technical", null, ["4 to 5 semesters", "4 a 5 semestres"])],
      prov: p("normal"), src: [S_DEC1236, S_NORMAL_PASTO, S_TEACHER],
      related: true,
      note: ["Normalistas superiores can teach early childhood and primary, but enter the public pay scale below licenciados. Fees vary by school.",
             "Los normalistas superiores pueden enseñar en educación inicial y primaria, pero entran a la escala salarial pública por debajo de los licenciados. La matrícula varía por escuela."],
    },
  ],
  "sec-co": [
    coPrivate(["Licenciatura in a school subject", "Licenciatura en una materia escolar"], 4, 43192000, S_BOSQUE, p("bosque", "javeriana", "sabana")),
    coPublic(["Licenciatura in a school subject", "Licenciatura en una materia escolar"], 4, p("upn", "udea", "univalle")),
    {
      t: ["Professional in a subject, then teach", "Profesional en una materia y luego docente"],
      steps: [st(["Pass the teacher exam and teach on probation while you take a pedagogy programme (10+ credits)", "Pasar el concurso docente y enseñar en período de prueba mientras haces un programa de pedagogía (10+ créditos)"], 1, "employment", 2500000)],
      prov: p("utp"), src: [S_DEC2035, S_UTP_PED],
      prior: ["a professional degree in a school subject, such as maths or biology; it is not counted here", "un título profesional en una materia escolar, como matemáticas o biología; no se cuenta aquí"],
      note: ["The pedagogy fee is UTP's 2024 price; other universities offer it too.", "La matrícula de pedagogía es el precio de la UTP en 2024; otras universidades también lo ofrecen."],
    },
  ],
  "swe-co": [
    ...coPair(["Systems engineering degree", "Ingeniería de sistemas"], 4.5, 71910000, S_BOSQUE, p("bosque", "javeriana", "andes"), p("unal", "udea", "uis")),
    {
      t: ["SENA tecnólogo (free)", "Tecnólogo del SENA (gratis)"],
      steps: [st(["Tecnólogo in software analysis and development", "Tecnólogo en análisis y desarrollo de software"], 2, "technical", 0, ["3,984 hours", "3.984 horas"])],
      prov: p("sena"), src: [S_SENA_ADSO, S_UREP_SENA],
      related: true, approx: true,
      note: ["Leads to developer jobs at tecnólogo level; the pay data here is for engineers. Some universities credit it towards Ingeniería de Sistemas.",
             "Lleva a empleos de desarrollador a nivel tecnólogo; el salario de esta página es de ingenieros. Algunas universidades lo homologan para Ingeniería de Sistemas."],
    },
  ],
  "data-co": coPair(["Data science degree", "Ciencia de datos"], 4, 55840000, S_BOSQUE, p("bosque", "javeriana", "rosario"), p("unal", "udea", "univalle")),
  "acc-co": coPair(["Public accounting degree", "Contaduría pública"], 5, 50055000, S_UCO, p("uco", "javeriana", "eafit"), p("unal", "udea", "univalle")),
  "law-co": coPair(["Law degree", "Derecho"], 4.5, 75294000, S_BOSQUE, p("bosque", "rosario", "externado"), p("unal", "udea", "uis")),
  "civil-co": coPair(["Civil engineering degree", "Ingeniería civil"], 5, 172700000, S_SABANA, p("sabana", "javeriana", "andes"), p("unal", "udea", "uis")),
  "eleng-co": coPair(["Electrical engineering degree", "Ingeniería eléctrica"], 5, 130912000, S_UPB, p("upb", "andes", "lasalle"), p("unal", "udea", "uis")),
  "mech-co": coPair(["Mechanical engineering degree", "Ingeniería mecánica"], 5, 130912000, S_UPB, p("upb", "andes", "eafit"), p("unal", "udea", "uis")),
  "arch-co": coPair(["Architecture degree", "Arquitectura"], 5, 109470000, S_BOSQUE, p("bosque", "javeriana", "upb"), p("unal", "univalle")),
  "graph-co": coPair(["Graphic design degree", "Diseño gráfico"], 5, 109470000, S_BOSQUE, p("bosque", "javeriana", "tadeo"), p("unal", "univalle")),
};

export const ROUTES: Record<string, Route[]> = { ...NZ, ...AU, ...CO };
