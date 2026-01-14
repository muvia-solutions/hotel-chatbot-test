(function() {
    // Fonction principale
    function initBotpress() {
        
        // --- 🔒 SÉCURITÉ : ALLOW ORIGIN ---
        const currentDomain = window.location.hostname;
        const allowedDomains = ["www.hotel-muvia2.framer.website", "hotel-muvia2.framer.website"];

        // Si le domaine n'est pas dans la liste, on arrête tout.
        if (!allowedDomains.includes(currentDomain)) {
            console.warn("⛔ MUVIA Chatbot : Licence non valide pour ce domaine (" + currentDomain + ").");
            return; // Arrêt immédiat du script
        }
        // ------------------------------------

        // 1. Ajouter le script Botpress
        const botpressScript = document.createElement('script');
        botpressScript.src = "https://cdn.botpress.cloud/webchat/v3.5/inject.js";
        document.head.appendChild(botpressScript);

        // 2. Ajouter le style
        const style = document.createElement('style');
        style.textContent = `
          #webchat .bpWebchat {
            position: unset;
            width: 100%;
            height: 100%;
            max-height: 100%;
            max-width: 100%;
          }
          #webchat .bpFab {
            display: none;
          }
        `;
        document.head.appendChild(style);

        // 3. Créer le conteneur du webchat
        if (!document.getElementById('webchat') && document.body) {
            const webchatDiv = document.createElement('div');
            webchatDiv.id = 'webchat';
            webchatDiv.style.width = '500px';
            webchatDiv.style.height = '500px';
            // Z-index très élevé pour être sûr qu'il passe devant tout le reste du site
            webchatDiv.style.zIndex = '2147483647'; 
            document.body.appendChild(webchatDiv);
        }

        // 4. Initialiser Botpress
        botpressScript.onload = () => {
            window.botpress.on("webchat:ready", () => {
                window.botpress.open();
            });

            window.botpress.init({
                botId: "e60ad3ae-512f-4cb0-b943-7c41885c96ae",
                configuration: {
                    version: "v2",
                    composerPlaceholder: "Posez votre question...",
                    botName: "Oasila Hotel",
                    botAvatar: "https://files.bpcontent.cloud/2025/10/30/15/20251030150620-6CZLIGCE.png",
                    botDescription: "L'assistant de votre prochaine destination.",
                    website: { title: "https://hotel-muvia2.framer.website/", link: "https://hotel-muvia2.framer.website/" },
                    email: { title: "reception@corsica-hotel.com", link: "reception@corsica-hotel.com" },
                    phone: { title: "0495010203", link: "0495010203" },
                    termsOfService: {},
                    privacyPolicy: {},
                    color: "#8f5533",
                    variant: "solid",
                    additionalStylesheetUrl: "https://files.bpcontent.cloud/2025/10/23/14/20251023143310-EB7PZIKI.css",
                    headerVariant: "solid",
                    themeMode: "light",
                    fontFamily: "Inter",
                    radius: 1.1,
                    feedbackEnabled: false,
                    footer: "[Développé par MUVIA. 🚀](https://muvia-solutions.fr/)",
                    storageLocation: "sessionStorage",
                    soundEnabled: true,
                    proactiveMessageEnabled: true,
                    proactiveBubbleMessage: "Besoin d'aide ?👋",
                    proactiveBubbleTriggerType: "afterDelay",
                    proactiveBubbleDelayTime: 1
                },
                clientId: "6d944a90-4c03-4753-ba87-c636ae31e86c",
                selector: "#webchat"
            });
        };
    }

    // Lancement intelligent (Dès que possible)
    if (document.readyState === "complete" || document.readyState === "interactive") {
        initBotpress();
    } else {
        document.addEventListener("DOMContentLoaded", initBotpress);
    }
})();