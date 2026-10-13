/**
 * Mycelial: early access reservation form (English and Spanish)
 * How to use:
 *  1. Go to https://script.google.com, click "New project", delete the sample code and paste this file.
 *  2. Replace VENTURE_EMAIL below with your venture email.
 *  3. Choose the function createMycelialForms and click Run. Accept the permissions the first time.
 *  4. Open View > Logs (or "Execution log"): it prints the public link of each form.
 *  5. Check both forms in an incognito window before sharing them.
 */
const VENTURE_EMAIL = 'PUT_YOUR_VENTURE_EMAIL_HERE';

const TEXT = {
  en: {
    title: 'Mycelial early access: reserve for US$19',
    description:
      'Mycelial is The Education Data Library. For each career and study pathway in New Zealand, Australia and Colombia it shows the median pay, ' +
      'the true cost of studying (fees plus the earnings you give up while you study) and a Value Score, with every figure linked to its source.\n\n' +
      'WHAT US$19 BUYS\nUS$19 is an early access price for the first users, not the regular price. It buys three months of full access to the complete library from launch: every pathway in New Zealand, Australia and Colombia, ' +
      'the full Value Score breakdown, side by side comparisons and downloadable data. After three months you can continue with the yearly membership ' +
      '(about US$105, or NZ$180) or stop. Nothing renews automatically.\n\n' +
      'NOTHING IS CHARGED TODAY. When the full library opens, you will receive a payment link, and you only pay if you still want it.\n\n' +
      'This form takes about 2 minutes. Your name and email are optional.\n\n' +
      'PRIVACY. We only collect the answers you give here. Your first name and email are optional, and we only use your email to send you the launch link. ' +
      'Your answers are used to measure interest in Mycelial and are reported only in aggregate. They are stored in Google Forms, never sold or shared, ' +
      'and deleted within 12 months or whenever you ask. Under the New Zealand Privacy Act 2020 you can ask to see, correct or delete your information at any time: ' +
      VENTURE_EMAIL + '.',
    firstName: 'First name (optional)',
    email: 'Email (optional, only if you want the launch link)',
    emailHelp: 'We will only use it to send you the launch link.',
    country: 'Where do you live?',
    countries: ['New Zealand', 'Australia', 'Colombia', 'Other'],
    age: 'Age range',
    ages: ['Under 20', '20 to 27', '28 to 45', '46 or over'],
    decision: 'Are you weighing a study or career decision?',
    decisions: ['Yes, a postgraduate qualification', 'Yes, an undergraduate degree or diploma', 'Yes, a trade or apprenticeship',
      'Yes, a career change', 'Not right now', 'I work in education (school, university or government)'],
    when: 'When do you expect to make that decision?',
    whens: ['Within 3 months', 'In 3 to 6 months', 'In 6 to 12 months', 'More than a year from now', 'I am not making a decision'],
    heard: 'How did you hear about Mycelial?',
    heards: ['A direct message from Mateo', 'A LinkedIn post', 'A friend or colleague', 'Other'],
    pay: 'Which best describes you?',
    pay1: 'I expect to buy access when it launches',
    pay2: 'I might buy but need more information',
    pay3: 'I would not buy this offer for US$19',
    maybeTitle: 'What would help you decide?',
    maybeQ: 'What information is missing, or what would you need to see? (optional)',
    noTitle: 'Why would you not buy it?',
    noQ: 'Choose all that apply',
    reasons: ['I’m unclear about what is included', 'The price is too high for me', 'I don’t need this at the moment',
      'I need to see a sample', 'Free alternatives meet my needs'],
    noMore: 'Anything else you would like to explain? (optional)',
    endTitle: 'One last question',
    endQ: 'What would you most want to see in Mycelial? (optional)',
    thanks: 'Thank you. Your answer helps me decide what to build next. Mateo',
  },
  es: {
    title: 'Acceso anticipado a Mycelial: reserva por US$19',
    description:
      'Mycelial es The Education Data Library. Para cada carrera y camino de estudio en Nueva Zelanda, Australia y Colombia muestra el salario mediano, ' +
      'el costo real de estudiar (matrícula más el salario que dejas de ganar mientras estudias) y un Value Score, con cada cifra enlazada a su fuente.\n\n' +
      'QUÉ COMPRA US$19\nUS$19 es un precio de acceso anticipado para los primeros usuarios, no el precio regular. Compra tres meses de acceso completo a toda la biblioteca desde el lanzamiento: todas las carreras de Nueva Zelanda, Australia y Colombia, ' +
      'el detalle completo del Value Score, comparaciones lado a lado y datos descargables. Después de tres meses puedes seguir con la membresía anual ' +
      '(cerca de US$105, o NZ$180) o parar. Nada se renueva automáticamente.\n\n' +
      'HOY NO SE COBRA NADA. Cuando abra la biblioteca completa recibirás un enlace de pago, y solo pagas si todavía lo quieres.\n\n' +
      'Este formulario toma unos 2 minutos. Tu nombre y tu email son opcionales.\n\n' +
      'PRIVACIDAD. Solo recogemos las respuestas que des aquí. Tu nombre y tu email son opcionales, y solo usamos tu email para enviarte el enlace del lanzamiento. ' +
      'Tus respuestas sirven para medir el interés en Mycelial y solo se reportan en conjunto. Se guardan en Google Forms, nunca se venden ni se comparten, ' +
      'y se borran en un plazo de 12 meses o cuando lo pidas. Según la Privacy Act 2020 de Nueva Zelanda puedes pedir ver, corregir o borrar tu información en cualquier momento: ' +
      VENTURE_EMAIL + '.',
    firstName: 'Nombre (opcional)',
    email: 'Email (opcional, solo si quieres el enlace del lanzamiento)',
    emailHelp: 'Solo lo usaremos para enviarte el enlace del lanzamiento.',
    country: '¿Dónde vives?',
    countries: ['Nueva Zelanda', 'Australia', 'Colombia', 'Otro'],
    age: 'Rango de edad',
    ages: ['Menos de 20', '20 a 27', '28 a 45', '46 o más'],
    decision: '¿Estás pensando en una decisión de estudio o de carrera?',
    decisions: ['Sí, un posgrado', 'Sí, una carrera universitaria o un técnico', 'Sí, un oficio o aprendizaje',
      'Sí, un cambio de carrera', 'Ahora no', 'Trabajo en educación (colegio, universidad o gobierno)'],
    when: '¿Cuándo esperas tomar esa decisión?',
    whens: ['En los próximos 3 meses', 'En 3 a 6 meses', 'En 6 a 12 meses', 'En más de un año', 'No estoy tomando una decisión'],
    heard: '¿Cómo te enteraste de Mycelial?',
    heards: ['Un mensaje directo de Mateo', 'Una publicación en LinkedIn', 'Un amigo o colega', 'Otro'],
    pay: '¿Qué te describe mejor?',
    pay1: 'Espero comprar el acceso cuando se lance',
    pay2: 'Podría comprar, pero necesito más información',
    pay3: 'No compraría esta oferta por US$19',
    maybeTitle: '¿Qué te ayudaría a decidir?',
    maybeQ: '¿Qué información te falta o qué necesitarías ver? (opcional)',
    noTitle: '¿Por qué no la comprarías?',
    noQ: 'Elige todas las que apliquen',
    reasons: ['No me queda claro qué incluye', 'El precio es muy alto para mí', 'No lo necesito en este momento',
      'Necesito ver un ejemplo', 'Las alternativas gratuitas me bastan'],
    noMore: '¿Algo más que quieras explicar? (opcional)',
    endTitle: 'Una última pregunta',
    endQ: '¿Qué te gustaría ver en Mycelial? (opcional)',
    thanks: 'Gracias. Tu respuesta me ayuda a decidir qué construir. Mateo',
  },
};

function createMycelialForms() {
  ['en', 'es'].forEach(buildForm_);
}

function buildForm_(lang) {
  const T = TEXT[lang];
  const form = FormApp.create(T.title);
  form.setDescription(T.description)
      .setCollectEmail(false)
      .setAllowResponseEdits(false)
      .setProgressBar(true)
      .setConfirmationMessage(T.thanks);

  form.addTextItem().setTitle(T.firstName).setRequired(false);
  const email = form.addTextItem().setTitle(T.email).setHelpText(T.emailHelp).setRequired(false);
  email.setValidation(FormApp.createTextValidation().requireTextIsEmail().build());

  form.addMultipleChoiceItem().setTitle(T.country).setChoiceValues(T.countries).setRequired(true);
  form.addMultipleChoiceItem().setTitle(T.age).setChoiceValues(T.ages).setRequired(true);
  form.addMultipleChoiceItem().setTitle(T.decision).setChoiceValues(T.decisions).setRequired(true);
  form.addMultipleChoiceItem().setTitle(T.when).setChoiceValues(T.whens).setRequired(true);
  form.addMultipleChoiceItem().setTitle(T.heard).setChoiceValues(T.heards).setRequired(true);
  const pay = form.addMultipleChoiceItem().setTitle(T.pay).setRequired(true);

  // Section for "might buy"
  const pageMaybe = form.addPageBreakItem().setTitle(T.maybeTitle);
  form.addParagraphTextItem().setTitle(T.maybeQ).setRequired(false);

  // Section for "would not buy"
  const pageNo = form.addPageBreakItem().setTitle(T.noTitle);
  form.addCheckboxItem().setTitle(T.noQ).setChoiceValues(T.reasons).showOtherOption(true).setRequired(true);
  form.addParagraphTextItem().setTitle(T.noMore).setRequired(false);

  // Final section for everyone
  const pageEnd = form.addPageBreakItem().setTitle(T.endTitle);
  form.addParagraphTextItem().setTitle(T.endQ).setRequired(false);

  // Branching: answer 1 -> end, answer 2 -> maybe, answer 3 -> reasons
  pay.setChoices([
    pay.createChoice(T.pay1, pageEnd),
    pay.createChoice(T.pay2, pageMaybe),
    pay.createChoice(T.pay3, pageNo),
  ]);
  // After the "might buy" section, skip the "would not buy" section
  pageNo.setGoToPage(pageEnd);

  // Responses go to a Google Sheet
  const sheet = SpreadsheetApp.create(T.title + ' (responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('[' + lang + '] Public link: ' + form.getPublishedUrl());
  Logger.log('[' + lang + '] Edit link:   ' + form.getEditUrl());
}
