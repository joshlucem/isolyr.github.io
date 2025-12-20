(function(){
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Header scroll shadow toggle
    const header = document.querySelector('.site-header');
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Reveal on view
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries)=>{
        entries.forEach((e)=>{
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

      document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
    }

    // Theme Manager
    (function(){
      const themeKey = 'isolyr_theme';
      const savedTheme = localStorage.getItem(themeKey) || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);

      const themeBtns = document.querySelectorAll('.theme-btn');
      themeBtns.forEach(btn => {
        if (btn.dataset.theme === savedTheme) {
          btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
          const theme = btn.dataset.theme;
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem(themeKey, theme);
          themeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    })();

    // Settings Menu & Language switcher
    (function(){
      const settingsMenu = document.querySelector('.settings-menu');
      if (!settingsMenu) return;
      const toggle = settingsMenu.querySelector('.settings-toggle');
      const dropdown = settingsMenu.querySelector('.settings-dropdown');

      const translations = {
        en: {
          // Nav
          nav_home: 'Home',
          nav_products: 'Products',
          nav_organization: 'Organization',
          nav_contact: 'Contact',
          // Home
          home_subtitle: 'An independent development laboratory.',
          home_intro1: 'Isolyr Labs is an independent laboratory focused on the development and maintenance of digital systems. Our work includes Discord bots, Minecraft plugins, and experimental or contractual digital services.',
          home_intro2: 'Founded and maintained by an independent developer, Isolyr Labs operates as a controlled environment for design, iteration, and long-term maintenance.',
          // FAQ
          faq_title: 'FAQ',
          faq_q1: 'What is Isolyr Labs?',
          faq_a1: 'Isolyr Labs is an independent development laboratory focused on digital systems. Work is structured, intentional, and long-term.',
          faq_q2: 'What services are provided?',
          faq_a2: 'Discord bots, Minecraft plugins, and experimental systems. Contractual work is considered selectively.',
          faq_q3: 'How does contact work?',
          faq_a3: 'Discord is the only channel. Communication is asynchronous and capacity-driven.',
          // Products
          products_title: 'Products',
          products_subtitle: 'Laboratory projects and systems.',
          products_cat_discord: 'Discord',
          products_cat_discord_desc: 'Discord bots and automation tools',
          products_cat_minecraft: 'Minecraft',
          products_cat_minecraft_desc: 'Minecraft server plugins and tools',
          products_explore: 'Explore',
          // Organization
          org_title: 'Organization',
          org_subtitle: 'Structure, responsibilities, and operating model.',
          org_operating_principles: 'Operating Principles',
          org_principle1: 'Independent and capacity-driven work',
          org_principle2: 'Intentional iteration and maintenance',
          org_principle3: 'Security-conscious and minimal data collection',
          org_structure_title: 'Structure',
          org_structure_text: 'Isolyr Labs is maintained by a single operator. Collaboration is limited and contractual when necessary.',
          org_contact_policy_title: 'Contact Policy',
          org_contact_policy_text: 'Discord is the only communication channel. Requests are processed asynchronously.',
          // Organization Members
          org_members_title: 'Members',
          org_member_josh_role: 'Founder · Systems & Direction',
          // Contact
          contact_title: 'Contact',
          contact_subtitle: 'Discord is the only communication channel.',
          contact_badge: 'Discord Only',
          contact_lead: 'All communication is handled asynchronously through our Discord server. There are no public support channels, email addresses, or forms.',
          contact_cta1: 'Contact via Discord',
          contact_cta2: 'Open in Discord',
          // Discord Products page
          discord_title: 'Discord Products',
          discord_subtitle: 'Discord bots and tools developed by Isolyr Labs.',
          breadcrumb_back: '← Back to Products',
          scriptor_tagline: 'An experience management system designed around writing.',
          scriptor_features_title: 'Core Features',
          scriptor_philosophy_title: 'Philosophy',
          // Minecraft Products page
          mc_title: 'Minecraft Plugins',
          mc_subtitle: 'Minecraft server plugins and tools.',
          airwavechat_tagline: 'Realistic radio communication for your Minecraft server',
          airwavechat_features_title: 'Features',
          // 404
          '404_title': '404 - Page not found',
          '404_subtitle': 'This page does not exist.',
          '404_body': 'This page does not exist. It may have been moved or removed.',
          '404_back': 'Back to Isolyr Labs'
        },
        es: {
          // Nav
          nav_home: 'Inicio',
          nav_products: 'Productos',
          nav_organization: 'Organización',
          nav_contact: 'Contacto',
          // Home
          home_subtitle: 'Un laboratorio de desarrollo independiente.',
          home_intro1: 'Isolyr Labs es un laboratorio independiente centrado en el desarrollo y mantenimiento de sistemas digitales. Nuestro trabajo incluye bots de Discord, plugins de Minecraft y servicios digitales experimentales o contractuales.',
          home_intro2: 'Fundado y mantenido por un desarrollador independiente, Isolyr Labs opera como un entorno controlado para diseño, iteración y mantenimiento a largo plazo.',
          // FAQ
          faq_title: 'Preguntas frecuentes',
          faq_q1: '¿Qué es Isolyr Labs?',
          faq_a1: 'Isolyr Labs es un laboratorio de desarrollo independiente centrado en sistemas digitales. El trabajo es estructurado, intencional y de largo plazo.',
          faq_q2: '¿Qué servicios ofrece?',
          faq_a2: 'Bots de Discord, plugins de Minecraft y sistemas experimentales. El trabajo contractual se considera de forma selectiva.',
          faq_q3: '¿Cómo funciona el contacto?',
          faq_a3: 'Discord es el único canal. La comunicación es asíncrona y en función de la capacidad.',
          // Products
          products_title: 'Productos',
          products_subtitle: 'Proyectos y sistemas del laboratorio.',
          products_cat_discord: 'Discord',
          products_cat_discord_desc: 'Bots de Discord y herramientas de automatización',
          products_cat_minecraft: 'Minecraft',
          products_cat_minecraft_desc: 'Plugins y herramientas para servidores de Minecraft',
          products_explore: 'Explorar',
          // Organization
          org_title: 'Organización',
          org_subtitle: 'Estructura, responsabilidades y modelo operativo.',
          org_operating_principles: 'Principios de operación',
          org_principle1: 'Trabajo independiente y guiado por capacidad',
          org_principle2: 'Iteración y mantenimiento intencional',
          org_principle3: 'Conciencia de seguridad y mínima recopilación de datos',
          org_structure_title: 'Estructura',
          org_structure_text: 'Isolyr Labs es mantenido por un único operador. La colaboración es limitada y contractual cuando es necesario.',
          org_contact_policy_title: 'Política de contacto',
          org_contact_policy_text: 'Discord es el único canal de comunicación. Las solicitudes se procesan de forma asíncrona.',
          // Organization Members
          org_members_title: 'Integrantes',
          org_member_josh_role: 'Fundador · Sistemas y Dirección',
          // Contact
          contact_title: 'Contacto',
          contact_subtitle: 'Discord es el único canal de comunicación.',
          contact_badge: 'Solo Discord',
          contact_lead: 'Toda la comunicación se gestiona de forma asíncrona mediante nuestro servidor de Discord. No hay canales públicos de soporte, correos electrónicos ni formularios.',
          contact_cta1: 'Contactar por Discord',
          contact_cta2: 'Abrir en Discord',
          // Discord Products page
          discord_title: 'Productos de Discord',
          discord_subtitle: 'Bots y herramientas de Discord desarrollados por Isolyr Labs.',
          breadcrumb_back: '← Volver a Productos',
          scriptor_tagline: 'Un sistema de gestión de experiencia diseñado alrededor de la escritura.',
          scriptor_features_title: 'Características principales',
          scriptor_philosophy_title: 'Filosofía',
          // Minecraft Products page
          mc_title: 'Plugins de Minecraft',
          mc_subtitle: 'Plugins y herramientas para servidores de Minecraft.',
          airwavechat_tagline: 'Comunicación por radio realista para tu servidor de Minecraft',
          airwavechat_features_title: 'Características',
          // 404
          '404_title': '404 - Página no encontrada',
          '404_subtitle': 'Esta página no existe.',
          '404_body': 'Esta página no existe. Es posible que haya sido movida o eliminada.',
          '404_back': 'Volver a Isolyr Labs'
        }
      };

      function applyLanguage(lang){
        const dict = translations[lang] || translations.en;
        document.querySelectorAll('[data-i18n]').forEach(el=>{
          const key = el.getAttribute('data-i18n');
          if (dict[key]) el.textContent = dict[key];
        });
        // Mark active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
          if (btn.dataset.lang === lang) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
        try { localStorage.setItem('isolyr_lang', lang); } catch {}
      }

      function detectBrowserLanguage(){
        try {
          const prefs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
          const code = String(prefs[0] || 'en').toLowerCase();
          if (code.startsWith('es')) return 'es';
          return 'en';
        } catch {
          return 'en';
        }
      }

      const saved = (function(){ try { return localStorage.getItem('isolyr_lang'); } catch { return null; } })();
      const initial = saved || detectBrowserLanguage();
      applyLanguage(initial);

      // Toggle settings dropdown
      if (toggle && dropdown) {
        toggle.addEventListener('click', ()=>{
          const open = dropdown.classList.contains('open');
          dropdown.classList.toggle('open', !open);
          toggle.setAttribute('aria-expanded', (!open).toString());
        });

        // Language button clicks
        dropdown.addEventListener('click', (e)=>{
          if (e.target && e.target.matches('.lang-btn')){
            const lang = e.target.getAttribute('data-lang');
            applyLanguage(lang);
          }
        });

        // Close on outside click
        document.addEventListener('click', (e)=>{
          if (!settingsMenu.contains(e.target)){
            if (dropdown) dropdown.classList.remove('open');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    })();

    // Fireflies effect removed
  }
})();
