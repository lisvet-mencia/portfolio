/* Trilingual copy for the one-page portfolio (fr / en / es).
   The markup ships in French; this file rewrites every translatable node from
   the dictionary below. It runs as a blocking script at the end of <body>, so
   the rewrite happens before the theme's #preloader overlay lifts on
   window.load and no untranslated text is ever painted.

   Markup contract:
     data-i18n="key"            -> innerHTML of the element
     data-i18n-title="key"      -> title attribute   (same for alt,
     data-i18n-alt="key"           aria-label, placeholder, content)
     data-i18n-text="key"       -> the element's own text only, keeping its
                                   child elements untouched
     data-i18n-list="key"       -> rebuilds a pensum <ul> from an array
   A key whose value is missing in a language falls back to French. */
(function () {
    "use strict";

    var DEFAULT_LANG = "fr";
    var LANGS = ["fr", "en", "es"];
    var STORAGE_KEY = "lisvet-lang";
    var ATTRS = ["title", "alt", "aria-label", "placeholder", "content"];

    var TRANSLATIONS = {

        /* ---------------------------------------------------------- FRENCH */
        fr: {
            "meta.title": "Lisvet Mencia - Portfolio",
            "meta.description": "Portfolio de Lisvet Mencia, community manager et créatrice de contenu diplômée en marketing.",

            "nav.home": "Accueil",
            "nav.portfolio": "Portfolio",
            "nav.resume": "Mon CV",
            "nav.about": "À propos de moi",
            "nav.contact": "Me contacter",

            "hero.greeting": "Bonjour, je suis <span class='id-color'>Lisvet Mencia</span>. Je suis",
            "hero.job.1": "Responsable des réseaux sociaux",
            "hero.job.2": "Community Manager",
            "hero.job.3": "Créatrice de contenu",
            "hero.intro": "Professionnelle du marketing passionnée par la création de contenu et la gestion de communautés. Je développe la présence en ligne des entreprises grâce à des stratégies créatives. Je possède de solides compétences en gestion des réseaux sociaux et une approche orientée résultats en marketing digital.",
            "hero.location.label": "Localisation",
            "hero.location.value": "Strasbourg, France",
            "hero.education.label": "Formation",
            "hero.education.value": "Licence en Marketing <br> avec mention",
            "hero.languages.label": "Langues",
            "hero.cta": "Télécharger le CV",

            "lang.spanish": "Espagnol",
            "lang.french": "Français",
            "lang.switch.label": "Choisir la langue",

            "services.heading": "Ce que je fais",
            "services.1.title": "Création et planification de contenu",
            "services.1.text": "Développement de contenus créatifs et attractifs, adaptés aux besoins et aux objectifs du client, avec une attention particulière portée à la narration et à la pertinence pour l'audience.",
            "services.2.title": "Communication communautaire",
            "services.2.text": "Interaction proactive avec la communauté à travers la gestion des commentaires sur les réseaux sociaux, en assurant une communication efficace et en construisant des relations solides avec les abonnés.",
            "services.3.title": "Présence lors des événements",
            "services.3.text": "Participation aux événements pertinents pour assister le photographe et capturer un contenu exclusif et de haute qualité.",

            "video.heading": "Exemple de production audiovisuelle",
            "video.text": "Cette vidéo est un exemple de contenu pour lequel j'ai été en charge de la <strong>définition du scénario</strong> et j'ai participé activement à la <strong>journée de tournage</strong> aux côtés de l'équipe technique.",
            "video.cta": "Voir le résultat",
            "video.fallback": "Votre navigateur ne prend pas en charge la balise vidéo.",

            "portfolio.heading": "Portfolio",
            "portfolio.intro": "J'ai été en charge des comptes suivants",
            "portfolio.more": "Voir plus de comptes",

            "resume.heading": "Mon CV",
            "resume.experience": "Expérience",
            "resume.boxx.date": "février 2024 - juillet 2024",
            "resume.boxx.role": "Content Creator",
            "resume.boxx.text": "Groupe d'entreprises dominicain qui propose des solutions digitales pour développer le commerce de ses clients et leur présence en ligne. <br />Mes missions :<br />- Créer du contenu pour une dizaine de comptes sur Instagram et Facebook.<br />- Interagir avec les utilisateurs en répondant à leurs messages et commentaires.<br />- Assister aux événements et aux séances photo pour chaque marque.",
            "resume.timbal.date": "octobre 2024 - août 2025",
            "resume.timbal.role": "Community Manager Freelance",
            "resume.timbal.text": "Agence de marketing digital dominicaine qui propose des services de marketing digital personnalisés dans des domaines tels que le branding, la croissance digitale, la création et le développement web. <br />Mes missions :<br />- Développer et gérer des stratégies de contenu digital, en assurant leur alignement avec les valeurs et les objectifs de la marque, et élaborer des calendriers de contenu créatifs et personnalisés pour chaque compte.<br />- Collaborer activement avec les clients, recueillir leurs retours et guider les designers dans la production de contenus graphiques et audiovisuels.<br />- Administrer les profils des réseaux sociaux, programmer les publications, gérer les campagnes publicitaires et réaliser des analyses de l'environnement digital afin d'optimiser les performances.<br />",
            "resume.education": "Formation",
            "resume.utesa.degree": "Licence en Marketing",
            "resume.utesa.text": "Formation académique pluridisciplinaire qui allie la <strong>stratégie commerciale</strong> à la vision managériale. Le programme intègre l'analyse économique (micro et macro), la comptabilité financière et le raisonnement logico-mathématique, offrant une compréhension à 360º de l'environnement de l'entreprise et du comportement sociologique du consommateur.",
            "resume.utesa.cta": "Détail du programme",

            "about.heading": "À propos de moi",
            "about.text": "J'utilise des technologies modernes pour enrichir mon travail de créatrice de contenu et de community manager, en restant à jour avec les tendances digitales et en proposant des services de haute qualité. L'intégration de ces outils dans mon flux de travail optimise la gestion de projet, la communication et la création de contenu sur des plateformes comme Facebook et Instagram. Avec un souci constant d'efficacité et d'innovation, je garantis des résultats remarquables sur chaque projet.",

            "contact.heading": "Me contacter",
            "contact.email": "E-mail",
            "contact.profile": "Mon profil",

            "modal.close": "Fermer",
            "modal.title": "Programme d'études : Licence en Marketing",
            "modal.tab.marketing": "Spécialisation (Marketing)",
            "modal.tab.business": "Business et Gestion",
            "modal.tab.general": "Tronc commun et Économie",
            "pensum.strategy.title": "Stratégie et Marché",
            "pensum.strategy.items": [
                "Marketing I (Fondamentaux)",
                "Marketing II (Stratégique)",
                "Marketing international",
                "Marketing politique",
                "Audit des marchés",
                "Études de marché"
            ],
            "pensum.promotion.title": "Promotion et Vente",
            "pensum.promotion.items": [
                "Publicité et Propagande I",
                "Direction des ventes",
                "Relations publiques",
                "Merchandising et Trade Marketing",
                "Comportement du consommateur",
                { "text": "Projet de fin d'études (Mémoire)", "highlight": true }
            ],
            "pensum.management.title": "Management",
            "pensum.management.items": [
                "Principes de management",
                "Organisation des entreprises",
                "Relations humaines",
                "Responsabilité sociétale des entreprises",
                "Gestion du personnel",
                "Droit du travail et droit commercial"
            ],
            "pensum.languages.title": "Langues et Communication",
            "pensum.languages.items": [
                "Rédaction commerciale",
                "Langue espagnole (I et II)",
                "Anglais niveau I",
                "Anglais niveau II",
                "Anglais niveau III",
                "Anglais niveau IV"
            ],
            "pensum.economy.title": "Économie et Finance",
            "pensum.economy.items": [
                "Comptabilité (I, II et III)",
                "Principes d'économie",
                "Microéconomie",
                "Macroéconomie",
                "Monnaie et Banque",
                "Comptabilité analytique I"
            ],
            "pensum.science.title": "Sciences exactes et Humanités",
            "pensum.science.items": [
                "Mathématiques de base et supérieures",
                "Statistiques (I et II)",
                "Méthodologie de la recherche",
                "Introduction à la philosophie",
                "Psychologie générale",
                "Sociologie"
            ]
        },

        /* --------------------------------------------------------- ENGLISH */
        en: {
            "meta.title": "Lisvet Mencia - Portfolio",
            "meta.description": "Portfolio of Lisvet Mencia, community manager and content creator with a degree in marketing.",

            "nav.home": "Home",
            "nav.portfolio": "Portfolio",
            "nav.resume": "My Résumé",
            "nav.about": "About me",
            "nav.contact": "Contact me",

            "hero.greeting": "Hi, I'm <span class='id-color'>Lisvet Mencia</span>. I'm&nbsp;a",
            "hero.job.1": "Social Media Manager",
            "hero.job.2": "Community Manager",
            "hero.job.3": "Content Creator",
            "hero.intro": "Marketing professional with a passion for content creation and community management. I grow the online presence of businesses through creative strategies. I bring strong social media management skills and a results-driven approach to digital marketing.",
            "hero.location.label": "Location",
            "hero.location.value": "Strasbourg, France",
            "hero.education.label": "Education",
            "hero.education.value": "Bachelor's Degree in Marketing <br> with honours",
            "hero.languages.label": "Languages",
            "hero.cta": "Download CV",

            "lang.spanish": "Spanish",
            "lang.french": "French",
            "lang.switch.label": "Choose a language",

            "services.heading": "What I do",
            "services.1.title": "Content creation and planning",
            "services.1.text": "Developing creative, engaging content tailored to each client's needs and goals, with close attention to storytelling and to what matters to the audience.",
            "services.2.title": "Community communication",
            "services.2.text": "Proactive interaction with the community through the management of social media comments, keeping communication effective and building strong relationships with followers.",
            "services.3.title": "Presence at events",
            "services.3.text": "Attending relevant events to assist the photographer and capture exclusive, high-quality content.",

            "video.heading": "Audiovisual production sample",
            "video.text": "This video is a sample of content for which I was in charge of <strong>defining the concept</strong> and took an active part in the <strong>shooting day</strong> alongside the technical team.",
            "video.cta": "Watch the result",
            "video.fallback": "Your browser does not support the video tag.",

            "portfolio.heading": "Portfolio",
            "portfolio.intro": "I managed the following accounts",
            "portfolio.more": "See more accounts",

            "resume.heading": "My Résumé",
            "resume.experience": "Experience",
            "resume.boxx.date": "February 2024 - July 2024",
            "resume.boxx.role": "Content Creator",
            "resume.boxx.text": "Dominican business group offering digital solutions to grow its clients' business and their online presence. <br />My responsibilities:<br />- Creating content for around ten Instagram and Facebook accounts.<br />- Engaging with users by replying to their messages and comments.<br />- Attending events and photo shoots for each brand.",
            "resume.timbal.date": "October 2024 - August 2025",
            "resume.timbal.role": "Freelance Community Manager",
            "resume.timbal.text": "Dominican digital marketing agency offering tailor-made digital marketing services in areas such as branding, digital growth, creative work and web development. <br />My responsibilities:<br />- Building and managing digital content strategies, keeping them aligned with the values and goals of each brand, and putting together creative content calendars tailored to every account.<br />- Working closely with clients, gathering their feedback and guiding designers in the production of graphic and audiovisual content.<br />- Managing social media profiles, scheduling posts, running advertising campaigns and analysing the digital landscape to optimise performance.<br />",
            "resume.education": "Education",
            "resume.utesa.degree": "Bachelor's Degree in Marketing",
            "resume.utesa.text": "A multidisciplinary academic programme that combines <strong>commercial strategy</strong> with a management perspective. The curriculum brings together economic analysis (micro and macro), financial accounting and logical-mathematical reasoning, giving a 360º understanding of the business environment and of consumer behaviour from a sociological angle.",
            "resume.utesa.cta": "Course details",

            "about.heading": "About me",
            "about.text": "I use modern technology to strengthen my work as a content creator and community manager, staying up to date with digital trends and delivering high-quality services. Bringing these tools into my workflow streamlines project management, communication and content creation on platforms such as Facebook and Instagram. With a constant focus on efficiency and innovation, I guarantee outstanding results on every project.",

            "contact.heading": "Contact me",
            "contact.email": "Email",
            "contact.profile": "My profile",

            "modal.close": "Close",
            "modal.title": "Curriculum: Bachelor's Degree in Marketing",
            "modal.tab.marketing": "Major (Marketing)",
            "modal.tab.business": "Business and Management",
            "modal.tab.general": "Core Courses and Economics",
            "pensum.strategy.title": "Strategy and Market",
            "pensum.strategy.items": [
                "Marketing I (Fundamentals)",
                "Marketing II (Strategic)",
                "International Marketing",
                "Political Marketing",
                "Market Auditing",
                "Market Research"
            ],
            "pensum.promotion.title": "Promotion and Sales",
            "pensum.promotion.items": [
                "Advertising and Propaganda I",
                "Sales Management",
                "Public Relations",
                "Merchandising and Trade Marketing",
                "Consumer Behaviour",
                { "text": "Final Degree Project (Thesis)", "highlight": true }
            ],
            "pensum.management.title": "Management",
            "pensum.management.items": [
                "Principles of Management",
                "Business Organisation",
                "Human Relations",
                "Corporate Social Responsibility",
                "Personnel Management",
                "Labour and Commercial Law"
            ],
            "pensum.languages.title": "Languages and Communication",
            "pensum.languages.items": [
                "Business Writing",
                "Spanish Language (I and II)",
                "English Level I",
                "English Level II",
                "English Level III",
                "English Level IV"
            ],
            "pensum.economy.title": "Economics and Finance",
            "pensum.economy.items": [
                "Accounting (I, II and III)",
                "Principles of Economics",
                "Microeconomics",
                "Macroeconomics",
                "Money and Banking",
                "Cost Accounting I"
            ],
            "pensum.science.title": "Exact Sciences and Humanities",
            "pensum.science.items": [
                "Basic and Advanced Mathematics",
                "Statistics (I and II)",
                "Research Methodology",
                "Introduction to Philosophy",
                "General Psychology",
                "Sociology"
            ]
        },

        /* --------------------------------------------------------- SPANISH */
        es: {
            "meta.title": "Lisvet Mencia - Portafolio",
            "meta.description": "Portafolio de Lisvet Mencia, community manager y creadora de contenido licenciada en mercadeo.",

            "nav.home": "Inicio",
            "nav.portfolio": "Portafolio",
            "nav.resume": "Mi Currículum",
            "nav.about": "Acerca de mí",
            "nav.contact": "Contáctame",

            "hero.greeting": "Hola, soy <span class='id-color'>Lisvet Mencia</span>. Soy",
            "hero.job.1": "Encargada de redes",
            "hero.job.2": "Community Manager",
            "hero.job.3": "Creadora de Contenido",
            "hero.intro": "Profesional de Mercadeo con pasión por la creación de contenido y gestión de comunidades. Impulso la presencia en línea de empresas mediante estrategias creativas. Poseo sólidas habilidades en gestión de redes sociales y un enfoque orientado a resultados en el marketing digital.",
            "hero.location.label": "Ubicación",
            "hero.location.value": "Estrasburgo, Francia",
            "hero.education.label": "Formación",
            "hero.education.value": "Licenciada en Mercadeo <br> con honores",
            "hero.languages.label": "Idiomas",
            "hero.cta": "Descargar CV",

            "lang.spanish": "Español",
            "lang.french": "Francés",
            "lang.switch.label": "Elegir idioma",

            "services.heading": "A qué me dedico",
            "services.1.title": "Creación y Planificación de Contenido",
            "services.1.text": "Desarrollo de contenido creativo y atractivo, adaptado a las necesidades y objetivos del cliente, con enfoque en la narrativa y la relevancia para la audiencia.",
            "services.2.title": "Comunicación Comunitaria",
            "services.2.text": "Interacción proactiva con la comunidad a través de la gestión de comentarios en redes sociales, asegurando una comunicación efectiva y construyendo relaciones sólidas con los seguidores.",
            "services.3.title": "Presencia en Eventos",
            "services.3.text": "Asistencia a eventos relevantes para asistir al fotógrafo capturando contenido exclusivo y de alta calidad.",

            "video.heading": "Ejemplo de Producción Audiovisual",
            "video.text": "Este video es una muestra de contenido donde estuve a cargo de la <strong>definición del escenario</strong> y participé activamente en la <strong>jornada de grabación</strong> junto al equipo técnico.",
            "video.cta": "Ver Resultado",
            "video.fallback": "Tu navegador no admite la etiqueta de video.",

            "portfolio.heading": "Portafolio",
            "portfolio.intro": "Estuve encargada de las siguientes cuentas",
            "portfolio.more": "Ver más cuentas",

            "resume.heading": "Mi Currículum",
            "resume.experience": "Experiencia",
            "resume.boxx.date": "febrero 2024 - julio 2024",
            "resume.boxx.role": "Content Creator",
            "resume.boxx.text": "Grupo empresarial dominicano que ofrece soluciones digitales para potenciar el comercio de sus clientes y su presencia en línea. <br />Mis misiones:<br />- Crear contenido para una decena de cuentas en Instagram y Facebook.<br />- Interactuar con los usuarios respondiendo a sus mensajes y comentarios.<br />- Asistir a eventos y sesiones de fotos para cada marca.",
            "resume.timbal.date": "octubre 2024 - agosto 2025",
            "resume.timbal.role": "Community Manager Freelance",
            "resume.timbal.text": "Agencia de marketing digital dominicana que ofrece servicios de marketing digital personalizados en áreas como branding, crecimiento digital, creatividad y desarrollo web. <br />Mis misiones:<br />- Desarrollar y gestionar estrategias de contenido digital, asegurando la alineación con los valores y objetivos de la marca, y elaborar calendarios de contenido creativos y personalizados para cada cuenta.<br />- Colaborar activamente con clientes, recopilar retroalimentación y guiar a diseñadores en la producción de contenido gráfico y audiovisual.<br />- Administrar perfiles de redes sociales, programar publicaciones, gestionar campañas publicitarias y realizar análisis del entorno digital para optimizar el rendimiento.<br />",
            "resume.education": "Educación",
            "resume.utesa.degree": "Grado en Mercadeo",
            "resume.utesa.text": "Formación académica multidisciplinaria que fusiona la <strong>estrategia comercial</strong> con la visión administrativa. El plan de estudios integra análisis económico (micro y macro), contabilidad financiera y pensamiento lógico-matemático, proporcionando una comprensión 360º del entorno empresarial y el comportamiento sociológico del consumidor.",
            "resume.utesa.cta": "Detalle del Pensum",

            "about.heading": "Acerca de Mí",
            "about.text": "Utilizo tecnologías modernas para mejorar mi trabajo como creadora de contenido y community manager, manteniéndome al día con las tendencias digitales y ofreciendo servicios de alta calidad. La integración de estas herramientas en mi flujo de trabajo optimiza la gestión de proyectos, la comunicación y la creación de contenido en plataformas como Facebook e Instagram. Con enfoque en la eficiencia e innovación, garantizo resultados sobresalientes en cada proyecto.",

            "contact.heading": "Contáctame",
            "contact.email": "Correo",
            "contact.profile": "Mi Perfil",

            "modal.close": "Cerrar",
            "modal.title": "Plan de Estudios: Licenciatura en Mercadeo",
            "modal.tab.marketing": "Especialización (Mercadeo)",
            "modal.tab.business": "Negocios y Gestión",
            "modal.tab.general": "Ciclo Básico y Economía",
            "pensum.strategy.title": "Estrategia y Mercado",
            "pensum.strategy.items": [
                "Mercadeo I (Fundamentos)",
                "Mercadeo II (Estratégico)",
                "Mercadeo Internacional",
                "Mercadeo Político",
                "Auditoría de Mercados",
                "Investigación de Mercados"
            ],
            "pensum.promotion.title": "Promoción y Cierre",
            "pensum.promotion.items": [
                "Publicidad y Propaganda I",
                "Gerencia de Ventas",
                "Relaciones Públicas",
                "Merchandising y Trade Marketing",
                "Comportamiento del Consumidor",
                { "text": "Proyecto de Grado (Tesis)", "highlight": true }
            ],
            "pensum.management.title": "Administración",
            "pensum.management.items": [
                "Principios de Administración",
                "Organización de Empresas",
                "Relaciones Humanas",
                "Responsabilidad Social Empresarial",
                "Administración de Personal",
                "Derecho Laboral y Comercial"
            ],
            "pensum.languages.title": "Idiomas y Comunicación",
            "pensum.languages.items": [
                "Redacción Comercial",
                "Lengua Española (I y II)",
                "Inglés Nivel I",
                "Inglés Nivel II",
                "Inglés Nivel III",
                "Inglés Nivel IV"
            ],
            "pensum.economy.title": "Economía y Finanzas",
            "pensum.economy.items": [
                "Contabilidad (I, II y III)",
                "Principios de Economía",
                "Microeconomía",
                "Macroeconomía",
                "Moneda y Banca",
                "Costos I"
            ],
            "pensum.science.title": "Ciencias Exactas y Humanidades",
            "pensum.science.items": [
                "Matemática Básica y Superior",
                "Estadística (I y II)",
                "Metodología de la Investigación",
                "Introducción a la Filosofía",
                "Psicología General",
                "Sociología"
            ]
        }
    };

    var current = DEFAULT_LANG;

    function isSupported(lang) {
        return LANGS.indexOf(lang) !== -1;
    }

    function value(lang, key) {
        var v = TRANSLATIONS[lang] ? TRANSLATIONS[lang][key] : undefined;
        return v === undefined ? TRANSLATIONS[DEFAULT_LANG][key] : v;
    }

    function stored() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function remember(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) { /* private browsing */ }
    }

    /* ?lang= wins (shareable links), then the visitor's last choice, then the
       browser's own preference order, then French. */
    function detect() {
        var fromUrl = (location.search.match(/[?&]lang=([a-zA-Z-]+)/) || [])[1];
        if (fromUrl && isSupported(fromUrl.slice(0, 2).toLowerCase())) {
            return fromUrl.slice(0, 2).toLowerCase();
        }
        var saved = stored();
        if (saved && isSupported(saved)) return saved;

        var prefs = navigator.languages || [navigator.language || ""];
        for (var i = 0; i < prefs.length; i++) {
            var code = String(prefs[i]).slice(0, 2).toLowerCase();
            if (isSupported(code)) return code;
        }
        return DEFAULT_LANG;
    }

    /* The pensum <ul>s are pure lists, so they are rendered from the
       dictionary instead of being triplicated in the markup. */
    function renderList(ul, items) {
        var html = "";
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var text = typeof item === "string" ? item : item.text;
            var highlight = typeof item === "object" && item.highlight;
            html += '<li class="mb-2"' +
                (highlight ? ' style="font-weight: bold; color: #202020;"' : "") +
                '><i class="fa ' + (highlight ? "fa-star" : "fa-check-circle") +
                '" style="color: #CB7C6F; margin-right: 8px;"></i>' + text + "</li>";
        }
        ul.innerHTML = html;
    }

    /* Rewrites only the element's own text, leaving child elements in place -
       the menu links carry an empty <span> the theme animates on hover. */
    function setText(el, text) {
        var found = [];
        for (var i = 0; i < el.childNodes.length; i++) {
            if (el.childNodes[i].nodeType === 3) found.push(el.childNodes[i]);
        }
        if (!found.length) {
            el.insertBefore(document.createTextNode(text), el.firstChild);
            return;
        }
        found[0].nodeValue = text;
        for (var j = 1; j < found.length; j++) {
            el.removeChild(found[j]);
        }
    }

    function apply(lang) {
        current = lang;
        document.documentElement.setAttribute("lang", lang);
        document.title = value(lang, "meta.title");

        var nodes = document.querySelectorAll("[data-i18n]");
        for (var i = 0; i < nodes.length; i++) {
            var v = value(lang, nodes[i].getAttribute("data-i18n"));
            if (typeof v === "string") nodes[i].innerHTML = v;
        }

        var texts = document.querySelectorAll("[data-i18n-text]");
        for (var n = 0; n < texts.length; n++) {
            var tv = value(lang, texts[n].getAttribute("data-i18n-text"));
            if (typeof tv === "string") setText(texts[n], tv);
        }

        for (var a = 0; a < ATTRS.length; a++) {
            var attr = ATTRS[a];
            var tagged = document.querySelectorAll("[data-i18n-" + attr + "]");
            for (var j = 0; j < tagged.length; j++) {
                var av = value(lang, tagged[j].getAttribute("data-i18n-" + attr));
                if (typeof av === "string") tagged[j].setAttribute(attr, av);
            }
        }

        var lists = document.querySelectorAll("[data-i18n-list]");
        for (var k = 0; k < lists.length; k++) {
            var items = value(lang, lists[k].getAttribute("data-i18n-list"));
            if (items && items.length) renderList(lists[k], items);
        }

        var buttons = document.querySelectorAll("#lang-switch [data-lang]");
        for (var b = 0; b < buttons.length; b++) {
            var isCurrent = buttons[b].getAttribute("data-lang") === lang;
            buttons[b].setAttribute("aria-current", isCurrent ? "true" : "false");
        }

        // The typed job titles and the isotope grid have to be rebuilt around
        // the new copy; index.html listens for this.
        document.dispatchEvent(new CustomEvent("languagechange", {
            detail: { lang: lang }
        }));
    }

    function set(lang) {
        if (!isSupported(lang) || lang === current) return;
        remember(lang);
        // Keep the address bar in step so the page can be shared in the
        // language the visitor is actually reading.
        if (window.history && history.replaceState) {
            var params = location.search.replace(/^\?/, "").split("&").filter(function (pair) {
                return pair && pair.indexOf("lang=") !== 0;
            });
            params.push("lang=" + lang);
            history.replaceState(null, "", location.pathname + "?" + params.join("&") + location.hash);
        }
        apply(lang);
    }

    document.addEventListener("click", function (event) {
        var button = event.target.closest ? event.target.closest("#lang-switch [data-lang]") : null;
        if (!button) return;
        event.preventDefault();
        set(button.getAttribute("data-lang"));
    });

    window.i18n = {
        get: function () { return current; },
        set: set,
        t: function (key) { return value(current, key); },
        languages: LANGS
    };

    apply(detect());
}());
