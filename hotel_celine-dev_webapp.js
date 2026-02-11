(function() {
    // ============================================================
    // 1. 🔒 SÉCURITÉ : ALLOW ORIGIN
    // ============================================================
    const currentDomain = window.location.hostname;
    const allowedDomains = ["www.muvia-solutions.fr/livret/hotel-celine-848392", "muvia-solutions.fr/livret/hotel-celine-848392"];

    // Si le domaine n'est pas dans la liste, on arrête tout.
    if (!allowedDomains.includes(currentDomain)) {
        console.warn("⛔ MUVIA Assistant : Licence non valide pour ce domaine (" + currentDomain + ").");
        return; // Arrêt immédiat du script
    }

    // ============================================================
    // 2. INJECTION DU STYLE (CSS du mode Fullscreen)
    // ============================================================
    const style = document.createElement('style');
    style.textContent = `
        /* 1) Reset total du body pour le mode plein écran */
        html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important; /* Empêche le scroll de la page derrière */
        }

        /* 2) On cible les classes Botpress pour les forcer en plein écran */
        *[class*="bp"]:not(.bpFab) {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 0;
            overflow: hidden;
            z-index: 9999;
        }

        /* 2bis) Style spécifique pour le FAB (bouton rond) s'il apparaît */
        #fab-root.bpFab {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
        }

        /* 3) Force l'iframe à 100% */
        #bpFull,
        #bpFull iframe {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
        }
    `;
    document.head.appendChild(style);

    // ============================================================
    // 3. CHARGEMENT DE BOTPRESS
    // ============================================================
    const botpressScript = document.createElement('script');
    botpressScript.src = "https://cdn.botpress.cloud/webchat/v3.5/inject.js";
    document.head.appendChild(botpressScript);

    // ============================================================
    // 4. INITIALISATION ET CONFIGURATION
    // ============================================================
    botpressScript.onload = () => {
        
        // Initialisation avec la config du "Livret" (HTML)
        window.botpress.init({
            botId: "89c3aea8-1d22-4652-b88f-f4e3ebff22bd",
            configuration: {
                version: "v2",
                composerPlaceholder: "Posez votre question...",
                botName: "Hôtel Celine ★★★",
                botAvatar: "https://files.bpcontent.cloud/2026/02/05/22/20260205225304-DI876500.jpeg",
                botDescription: "L'hôtel Céline, niché au cœur du maquis corse et surplombant le Golfe d’Ajaccio, vous invite à vivre une parenthèse de détente et de sérénité.",
                fabImage: "https://files.bpcontent.cloud/2026/02/11/15/20260211150604-KHJYO8WW.jpeg",
                website: { title: "Site Web", link: "https://www.hotelcelinecorse.fr/" },
                email: { title: "hotelcelinecorse@orange.fr", link: "hotelcelinecorse@orange.fr" },
                phone: { title: "+33495254105", link: "+33495254105" },
                termsOfService: {},
                privacyPolicy: {},
                color: "#188cd7",
                variant: "solid",
                // Note : C'est ici l'URL CSS spécifique du HTML (livret)
                additionalStylesheetUrl: "https://muvia-solutions.github.io/hotel-chatbot-test/style_css_livret.css",
                headerVariant: "glass",
                themeMode: "light",
                fontFamily: "Inter",
                radius: 1.1,
                feedbackEnabled: false,
                footer: "[Développé par MUVIA. 🚀](https://muvia-solutions.fr/)",
                storageLocation: "localStorage",
                soundEnabled: true,
                proactiveMessageEnabled: true,
                proactiveBubbleMessage: "Besoin d'aide ?👋",
                proactiveBubbleTriggerType: "afterDelay",
                proactiveBubbleDelayTime: 5
            },
            clientId: "51cf9d8a-aec5-4e0c-8008-3e4e39a9f6a5"
            // Note: J'ai retiré 'selector: "#webchat"' car en mode plein écran 
            // injecté via JS global, Botpress gère généralement son propre conteneur.
        });

        // Gestion des événements après initialisation (équivalent du script de bas de page HTML)
        window.botpress.on("webchat:ready", () => {
            // Ouverture automatique
            window.botpress.open();

            // Ajout de la classe .bpFab après un court délai pour correspondre à votre logique HTML
            setTimeout(() => {
                const fab = document.getElementById("fab-root");
                if (fab) {
                    fab.classList.add("bpFab");
                }
            }, 500);
        });
    };

})();
