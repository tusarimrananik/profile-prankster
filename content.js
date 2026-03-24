(() => {
    console.log("🚀 Nuclear Profile Prankster, Avatar Sync & Photo Editors Loaded!");

    // --- Configuration & Constants ---
    const CONFIG = {
        PRANK_INTERVAL_MS: 500, // Timing for UI injections and name syncing
        AVATAR_INTERVAL_MS: 250, // Timing for profile picture sync
        ALLOWED_TITLES: new Set(["Personal details", "Work", "Education", "Places lived", "Contact info", "Basic info"]),
        INTRO_TITLES: new Set(["Intro", "About"]),

        CUSTOM_EDIT_CLASS: "my-custom-visual-edit-btn",
        CUSTOM_EDIT_STYLE_ID: "my-custom-edit-style",
        FAKE_BUTTONS_CLASS: "my-fake-buttons",
        HIGHLIGHTS_BORDER_RADIUS: "6px" 
    };

    // The raw HTML for the fake action buttons (Message / Add Friend etc.)
    const FAKE_BUTTONS_HTML = `<div class="x78zum5 x1a02dak x165d6jo x1lxpwgx x9otpla x1ke80iy"><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div class="xh8yej3"><a aria-label="Add to story" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" href="#" role="link" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 xtvsq51 x1r1pt67"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><img class="x1b0d499 xaj1gnb" alt="" aria-hidden="true" height="16" width="16" src="https://z-p3-static.xx.fbcdn.net/rsrc.php/yi/r/z3LogjiHvsn.webp?_nc_eui2=AeF1rPXioL2bT0Es3quCxqDwm1tVyk4b7HybW1XKThvsfALZfiPJwv7uPu69xdDuh-xD-C7oxlTv2gH4q7LREBvY"></div><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f xtk6v10" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Add to story</span></span></div></div></div></a></div></div><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div class="xh8yej3"><a aria-label="Edit profile" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2apz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" href="#" role="link" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 x1qhmfi1 x1r1pt67"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><img class="x1b0d499 xep6ejk" alt="" aria-hidden="true" height="16" width="16" src="https://z-p3-static.xx.fbcdn.net/rsrc.php/yF/r/2AH30T09Awc.webp?_nc_eui2=AeELmLOb-BEfBXGSrRfkpsAkLcFBb4cpDv0twUFvhykO_aBzZh0FvlDqw8HqI52qRLzq8iLdDuljwylyzqUyOC-K"></div><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f x1dem4cn" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Edit profile</span></span></div></div></div></a></div></div></div>`;

    // The official Facebook Camera SVG
    const FB_CAMERA_SVG = `
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M7 10.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"></path>
            <path d="M8.639 2h2.723c.509 0 .96-.002 1.378.171.417.173.736.493 1.095.854l.976.975h.246c.462-.002.925-.003 1.386.033.44.034.839.107 1.214.287a3.25 3.25 0 0 1 1.523 1.523c.18.375.253.774.287 1.214.033.426.033.949.033 1.588v3.659c0 1.133 0 2.058-.098 2.79-.103.763-.325 1.425-.854 1.954-.529.529-1.19.751-1.955.854-.73.098-1.656.098-2.79.098H6.197c-1.133 0-2.058 0-2.79-.098-.763-.103-1.425-.325-1.954-.854-.53-.528-.753-1.191-.855-1.955C.5 14.363.5 13.437.5 12.303V8.646c0-.64 0-1.162.033-1.588.034-.44.107-.839.287-1.214A3.25 3.25 0 0 1 2.343 4.32c.375-.18.774-.253 1.214-.287.46-.036.924-.035 1.386-.033h.246l.976-.975c.359-.36.678-.68 1.095-.854C7.678 1.998 8.13 2 8.64 2zM10 6a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"></path>
        </svg>
    `;

    // CLEANED Highlights Fallback DOM (Just an empty box with the title, NO hardcoded button)
    const FALLBACK_HIGHLIGHTS_HTML = `<div><div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x78zum5 x1n2onr6 xh8yej3"><div style="border-radius:max(0px, min(var(--card-corner-radius), calc((100vw - 4px - 100%) * 9999))) / var(--card-corner-radius)" class="x1n2onr6 x1ja2u2z x1jx94hy xw5cjc7 x1dmpuos x1vsv7so xau1kf4 x9f619 xh8yej3 x6ikm8r x10wlt62 xquyuld"><div class="x1n2onr6 x1ja2u2z x9f619 x78zum5 xdt5ytf x2lah0s x193iq5w xjkvuk6 x1cnzs8"><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x1iyjqo2 x2lwn1j"><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xf7dkkf xv54qhq"><div class="x78zum5 xdt5ytf x4cne27 xifccgj"><div class="xzueoph x1k70j0n"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xtoi2st x3x7a5m x1603h9y x1u7k74 x1xlr1w8 xzsf02u" dir="auto"><div class="x9f619 x1ja2u2z x78zum5 x2lah0s x1n2onr6 x1qughib x6s0dn4 xozqiw3 x1q0g3np xzt5al7"><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x193iq5w xeuugli x1r8uery x1iyjqo2 xs83m0k"><h2 class="html-h2 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1vvkbs x1heor9g x1qlqyl8 x1pd3egz x1a2a7pz x193iq5w xeuugli"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1603h9y x1u7k74 x1xlr1w8 xzsf02u"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 x1120s5i" style="-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box">Highlights</span></span></h2></div><div class="x9f619 x1n2onr6 x1ja2u2z x2lah0s x193iq5w xeuugli xqcrz7y x78zum5 xdt5ytf xl56j7k x13fj5qh"><div class="x9f619 x1ja2u2z x78zum5 x2lah0s x1n2onr6 x1qughib x6s0dn4 xozqiw3 x1q0g3np"><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli xlshs6z xnalus7">&nbsp;</div><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli"><div class="x9f619 x1ja2u2z x78zum5 x2lah0s x1n2onr6 x1qughib x1qjc9v5 xozqiw3 x1q0g3np"></div></div></div></div></div></span></div></div></div></div></div></div></div></div></div></div>`;

    // ==========================================
    // MODULE 1: PROFILE PRANKSTER UI INJECTIONS
    // ==========================================

    function injectCustomEditStyles() {
        if (document.getElementById(CONFIG.CUSTOM_EDIT_STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = CONFIG.CUSTOM_EDIT_STYLE_ID;
        style.textContent = `
            .${CONFIG.CUSTOM_EDIT_CLASS} {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 36px !important;  
                height: 36px !important; 
                border-radius: 50% !important;
                background: transparent !important;
                color: #65676b !important;
                cursor: pointer !important;
                user-select: none !important;
                -webkit-user-select: none !important;
                flex-shrink: 0 !important;
                margin-left: auto !important; 
                transition: background-color 120ms ease, transform 120ms ease !important;
            }
            .${CONFIG.CUSTOM_EDIT_CLASS}:hover { background: rgba(0, 0, 0, 0.08) !important; }
            .${CONFIG.CUSTOM_EDIT_CLASS}:active { transform: scale(0.96) !important; }
            .${CONFIG.CUSTOM_EDIT_CLASS} svg {
                width: 20px !important; 
                height: 20px !important; 
                fill: currentColor !important;
                pointer-events: none !important;
                display: block !important;
            }
        `;
        document.head.appendChild(style);
    }

    function createCustomVisualEditButton(title) {
        const btn = document.createElement("div");
        btn.className = CONFIG.CUSTOM_EDIT_CLASS;
        btn.setAttribute("data-my-edit-for", title);
        btn.setAttribute("aria-hidden", "true");
        btn.setAttribute("title", `Edit ${title}`);

        btn.innerHTML = `
            <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M16.841 2.028a2.25 2.25 0 0 0-3.182 0L2.513 13.175A1.75 1.75 0 0 0 2 14.412v2.336c0 .69.56 1.25 1.25 1.25h2.336a1.75 1.75 0 0 0 1.237-.513L17.97 6.34a2.25 2.25 0 0 0 0-3.182l-1.13-1.13zm-2.121 1.06a.75.75 0 0 1 1.06 0l1.129 1.13a.75.75 0 0 1 0 1.06l-1.035 1.035-2.19-2.19L14.72 3.09zm-2.096 2.097 2.19 2.189-9.051 9.05a.25.25 0 0 1-.177.074H3.5v-2.086a.25.25 0 0 1 .073-.177l9.05-9.05z"></path>
            </svg>
        `;
        return btn;
    }

    function injectFakeMainButtons() {
        const messageBtn = document.querySelector('[aria-label="Message"]');
        if (!messageBtn) return;

        let container = messageBtn.parentElement;
        while (container && container.children.length < 2) { container = container.parentElement; }

        if (container && !document.querySelector(`.${CONFIG.FAKE_BUTTONS_CLASS}`)) {
            container.style.display = 'none'; 
            const wrapper = document.createElement('div');
            wrapper.className = CONFIG.FAKE_BUTTONS_CLASS;
            wrapper.innerHTML = FAKE_BUTTONS_HTML;
            container.parentNode.insertBefore(wrapper, container.nextSibling);
        }
    }

    function injectCustomHeaderEditButtons() {
        const allH2s = Array.from(document.querySelectorAll("h2"));

        allH2s.forEach((h2) => {
            const titleSpan = h2.querySelector('span[dir="auto"]');
            const title = titleSpan?.textContent?.trim();
            if (!title || !CONFIG.ALLOWED_TITLES.has(title)) return;

            let headerRow = h2.closest('.x1gslohp');

            if (!headerRow) {
                let curr = h2.parentElement;
                while (curr && curr.tagName !== 'BODY') {
                    if (curr.classList.contains('x78zum5') && !curr.classList.contains('xdt5ytf')) {
                        headerRow = curr; break;
                    }
                    curr = curr.parentElement;
                }
            }

            if (!headerRow || headerRow.querySelector(`.${CONFIG.CUSTOM_EDIT_CLASS}`)) return;

            headerRow.style.setProperty('display', 'flex', 'important');
            headerRow.style.setProperty('flex-direction', 'row', 'important');
            headerRow.style.setProperty('justify-content', 'space-between', 'important');
            headerRow.style.setProperty('align-items', 'center', 'important');
            headerRow.style.setProperty('width', '100%', 'important');

            const leftContent = headerRow.firstElementChild;
            if (leftContent) {
                leftContent.style.setProperty('flex', '0 1 auto', 'important');
                leftContent.style.setProperty('width', 'auto', 'important');
            }

            const button = createCustomVisualEditButton(title);
            headerRow.appendChild(button);
        });
    }

    function makeIntroAndAboutEditable() {
        const allSpans = Array.from(document.querySelectorAll("span"));
        const targetHeaders = allSpans.filter(s => CONFIG.INTRO_TITLES.has(s.textContent));

        targetHeaders.forEach((header) => {
            let textContainer = header.parentElement;
            while (textContainer && textContainer.tagName !== "DIV") {
                textContainer = textContainer.parentElement;
            }
            if (textContainer && textContainer.getAttribute("contenteditable") !== "true") {
                textContainer.setAttribute("contenteditable", "true");
                textContainer.style.outline = "none";
            }
        });
    }

    function injectHighlightsButton() {
        // Collect all potential headers
        const allHeaders = Array.from(document.querySelectorAll("h2, span[dir='auto']"));
        
        // Find the native Highlights header (ignoring any 'a' tags or buttons)
        const nativeHighlightsHeader = allHeaders.find(el => el.textContent.trim() === "Highlights" && el.tagName !== 'A');

        if (nativeHighlightsHeader) {
            // ==========================================
            // LOGIC A: HIGHLIGHTS HEADER IS ON THE PAGE
            // We just need to attach the button to its existing card box
            // ==========================================
            const cardWrapper = nativeHighlightsHeader.closest('.xquyuld') || nativeHighlightsHeader.closest('[style*="border-radius: max"]');
            
            // If card not found, or if we ALREADY injected our button into this card, stop and do nothing.
            if (!cardWrapper || cardWrapper.querySelector(".my-fake-highlights-btn-wrapper")) return;

            const hasHighlights = cardWrapper.querySelectorAll('a[href*="source=profile_highlight"]').length > 0;
            const buttonText = hasHighlights ? "Edit highlights" : "Add highlights";

            const btnWrapper = document.createElement("div");
            btnWrapper.className = "my-fake-highlights-btn-wrapper";
            btnWrapper.style.padding = "0px 16px 16px 16px"; 
            btnWrapper.style.width = "100%";
            btnWrapper.style.boxSizing = "border-box";
            btnWrapper.style.marginTop = "16px"; 

            const NORMAL_CLASSES = "x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh";
            const HOVER_CLASSES = "x1ey2m1c xtijo5x x1o0tod x47corl x10l6tqk x13vifvy x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh x1hc1fzr x1mq3mr6 x1wpzbip";

            btnWrapper.innerHTML = `
                <div aria-label="${buttonText}" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" role="button" tabindex="0" style="background-color: var(--secondary-button-background); border-radius: ${CONFIG.HIGHLIGHTS_BORDER_RADIUS}; transition: transform 100ms ease;">
                    <div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 x1qhmfi1 x1r1pt67" style="height: 36px;">
                        <div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt">
                            <div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj">
                                <span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f x1dem4cn" dir="auto">
                                    <span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">${buttonText}</span>
                                </span>
                            </div>
                        </div>
                        <div class="${NORMAL_CLASSES}" role="none" data-visualcompletion="ignore" style="inset: 0px; border-radius: ${CONFIG.HIGHLIGHTS_BORDER_RADIUS}; transition: background-color 150ms ease;"></div>
                    </div>
                </div>
            `;

            const clickableButton = btnWrapper.querySelector('[role="button"]');
            const overlayDiv = btnWrapper.querySelector('[data-visualcompletion="ignore"]');

            if (clickableButton && overlayDiv) {
                clickableButton.addEventListener('mouseenter', () => overlayDiv.className = HOVER_CLASSES);
                clickableButton.addEventListener('mouseleave', () => {
                    overlayDiv.className = NORMAL_CLASSES;
                    clickableButton.style.transform = 'scale(1)'; 
                });
                clickableButton.addEventListener('mousedown', () => clickableButton.style.transform = 'scale(0.96)');
                clickableButton.addEventListener('mouseup', () => clickableButton.style.transform = 'scale(1)');
            }

            cardWrapper.appendChild(btnWrapper);

        } else {
            // ==========================================
            // LOGIC B: HIGHLIGHTS HEADER DOES NOT EXIST
            // We inject the empty Fallback Box, and let the script catch it on the next loop
            // ==========================================
            
            // Safety check: Don't inject multiple empty boxes
            if (document.getElementById('my-fake-highlights-card-wrapper')) return;

            // Find a nearby anchor header to place our new box underneath
            const targetTitles = ["Personal details", "Intro", "Photos", "Friends", "About"];
            let anchorHeader = null;
            
            for (const title of targetTitles) {
                anchorHeader = allHeaders.find(el => el.textContent.trim() === title && el.tagName !== 'A');
                if (anchorHeader) break;
            }

            if (!anchorHeader) return; // Nowhere safe to put it, so abort

            // Find the actual card box that holds the anchor header we just found
            let anchorCard = anchorHeader.closest('.xquyuld') || anchorHeader.closest('[style*="border-radius: max"]');
            if (!anchorCard || !anchorCard.parentElement) return;

            // Generate the empty Fake Card wrapper
            const fakeCard = document.createElement('div');
            fakeCard.id = 'my-fake-highlights-card-wrapper';
            fakeCard.innerHTML = FALLBACK_HIGHLIGHTS_HTML;

            // Insert the brand new, empty Highlights Card cleanly after the anchor card
            anchorCard.parentElement.insertAdjacentElement('afterend', fakeCard);

            // Notice we do NOT add a button here. The script will naturally find this empty card
            // on the next 500ms cycle and gracefully apply LOGIC A to give it exactly one button.
        }
    }

    function addEditCoverPhotoButton() {
        const coverPhotoLink = document.querySelector('a[aria-label="View profile cover photo"]');
        if (!coverPhotoLink) return;

        const coverContainer = coverPhotoLink.parentElement;

        if (coverContainer && !document.getElementById('fake-edit-cover-btn')) {
            const editCoverBtn = document.createElement('div');
            editCoverBtn.id = 'fake-edit-cover-btn';
            
            editCoverBtn.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
                    <div style="width: 16px; height: 16px; display: flex;">
                        ${FB_CAMERA_SVG}
                    </div>
                    <span style="font-size: 15px; font-weight: 600; font-family: Segoe UI, system-ui, sans-serif;">Edit cover photo</span>
                </div>
            `;

            Object.assign(editCoverBtn.style, {
                position: 'absolute',
                bottom: '16px',
                right: '32px',
                backgroundColor: '#ffffff',
                color: '#050505',
                padding: '7px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                zIndex: '9', 
                userSelect: 'none',
                transition: 'background-color 0.2s'
            });

            editCoverBtn.addEventListener('mouseenter', () => editCoverBtn.style.backgroundColor = '#f2f2f2');
            editCoverBtn.addEventListener('mouseleave', () => editCoverBtn.style.backgroundColor = '#ffffff');
            editCoverBtn.addEventListener('mousedown', () => editCoverBtn.style.transform = 'scale(0.96)');
            editCoverBtn.addEventListener('mouseup', () => editCoverBtn.style.transform = 'scale(1)');

            coverContainer.appendChild(editCoverBtn);
        }
    }

    function addProfileCameraIcon() {
        const profileImages = Array.from(document.querySelectorAll('svg image'));
        
        const targetImage = profileImages.find(img => {
            const rect = img.getBoundingClientRect();
            return rect.width > 100 && rect.height > 100; 
        });
        
        if (!targetImage) return;

        const profileAnchor = targetImage.closest('a');
        if (!profileAnchor) return;
        
        const profileContainer = profileAnchor.querySelector('div') || profileAnchor;

        if (profileContainer && !document.getElementById('fake-profile-cam-btn')) {
            if (getComputedStyle(profileContainer).position === 'static') {
                profileContainer.style.position = 'relative';
            }

            const camBtn = document.createElement('div');
            camBtn.id = 'fake-profile-cam-btn';
            
            camBtn.innerHTML = `
                <div style="width: 20px; height: 20px; display: flex;">
                    ${FB_CAMERA_SVG}
                </div>
            `;

            Object.assign(camBtn.style, {
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                width: '36px',
                height: '36px',
                backgroundColor: '#e4e6eb',
                color: '#050505',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: '10', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.05)', 
                transition: 'background-color 0.2s, transform 0.1s'
            });

            camBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });

            camBtn.addEventListener('mouseenter', () => camBtn.style.backgroundColor = '#d8dadf');
            camBtn.addEventListener('mouseleave', () => camBtn.style.backgroundColor = '#e4e6eb');
            camBtn.addEventListener('mousedown', () => camBtn.style.transform = 'scale(0.96)');
            camBtn.addEventListener('mouseup', () => camBtn.style.transform = 'scale(1)');

            profileContainer.appendChild(camBtn);
        }
    }

    function syncDropdownName() {
        const h1Element = document.querySelector("h1");
        if (!h1Element) return;

        const newName = h1Element.textContent.trim();
        
        const activeMenu = document.querySelector('[role="menu"], [role="dialog"]');
        if (!activeMenu) return;

        const spans = Array.from(activeMenu.querySelectorAll('span[dir="auto"]'));
        const targetNameSpan = spans.find(span => span.textContent.trim().length > 1);

        if (targetNameSpan && targetNameSpan.textContent !== newName) {
            targetNameSpan.textContent = newName;
        }
    }

    function runPranksterLogic() {
        injectFakeMainButtons();
        makeIntroAndAboutEditable();
        injectCustomHeaderEditButtons();
        injectHighlightsButton(); 
        addEditCoverPhotoButton();
        addProfileCameraIcon();
        syncDropdownName(); 
    }


    // ==========================================
    // MODULE 2: PROFILE AVATAR SYNC
    // ==========================================

    function getMainProfilePictureUrl(root = document) {
        const scope = root.querySelector('[role="main"]') || root;

        const candidates = [...scope.querySelectorAll('svg image')]
            .map(image => {
                const svg = image.closest('svg');
                if (!svg) return null;

                const rect = svg.getBoundingClientRect();
                const style = getComputedStyle(svg);

                const url =
                    image.getAttribute('xlink:href') ||
                    image.getAttributeNS('http://www.w3.org/1999/xlink', 'href') ||
                    image.href?.baseVal;

                if (!url) return null;
                if (style.display === 'none' || style.visibility === 'hidden') return null;
                if (rect.width < 80 || rect.height < 80) return null;

                const squareNess =
                    1 - Math.abs(rect.width - rect.height) / Math.max(rect.width, rect.height);

                if (squareNess < 0.9) return null;

                return {
                    url,
                    rect,
                    score:
                        rect.width * rect.height +
                        (1000 - Math.min(Math.abs(rect.top), 1000)) +
                        (500 - Math.min(Math.abs(rect.left), 500))
                };
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score);

        return candidates[0]?.url || null;
    }

    function getImageUrl(el) {
        if (!el) return '';
        if (el.tagName.toLowerCase() === 'img') {
            return el.currentSrc || el.src || '';
        }
        return (
            el.getAttribute('xlink:href') ||
            el.getAttributeNS?.('http://www.w3.org/1999/xlink', 'href') ||
            el.getAttribute('href') ||
            el.href?.baseVal ||
            ''
        );
    }

    function setImageUrl(el, url) {
        if (!el || !url) return;

        if (el.tagName.toLowerCase() === 'img') {
            el.src = url;
            el.srcset = '';
            return;
        }

        el.setAttribute('xlink:href', url);
        el.setAttribute('href', url);

        if (el.href) {
            el.href.baseVal = url;
        }
    }

    function isPhotoLikeUrl(url) {
        return (
            !!url &&
            !url.startsWith('data:') &&
            !url.includes('/rsrc.php/') &&
            !/\.svg(\?|$)/i.test(url)
        );
    }

    function isTopRightAvatarCandidate(el) {
        const box = el.closest('svg') || el;
        const rect = box.getBoundingClientRect();
        const style = getComputedStyle(box);
        const url = getImageUrl(el);

        if (!isPhotoLikeUrl(url)) return false;
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        if (rect.width === 0 || rect.height === 0) return false;

        const squareNess =
            1 - Math.abs(rect.width - rect.height) / Math.max(rect.width, rect.height);

        if (squareNess < 0.85) return false;

        const inTopZone = rect.top >= 0 && rect.top <= 420;
        const inRightSide = rect.left >= window.innerWidth * 0.55;
        const avatarSized =
            rect.width >= 24 &&
            rect.height >= 24 &&
            rect.width <= 80 &&
            rect.height <= 80;

        return inTopZone && inRightSide && avatarSized;
    }

    function replaceTopRightAvatarsFromMainProfilePicture() {
        const sourceUrl = getMainProfilePictureUrl();

        if (!sourceUrl) {
            return { sourceUrl: null, count: 0 };
        }

        const matches = [...document.querySelectorAll('img, svg image')]
            .filter(isTopRightAvatarCandidate);

        matches.forEach(el => {
            setImageUrl(el, sourceUrl);
        });

        return { sourceUrl, count: matches.length };
    }


    // ==========================================
    // INITIALIZATION & TIMERS
    // ==========================================

    injectCustomEditStyles();
    setInterval(runPranksterLogic, CONFIG.PRANK_INTERVAL_MS);

    if (window.__profileAvatarSyncInterval) {
        clearInterval(window.__profileAvatarSyncInterval);
    }

    window.__syncProfileAvatars = replaceTopRightAvatarsFromMainProfilePicture;
    window.__stopProfileAvatarSync = () => {
        clearInterval(window.__profileAvatarSyncInterval);
        console.log('Stopped profile avatar sync');
    };

    const firstRun = window.__syncProfileAvatars();

    window.__profileAvatarSyncInterval = setInterval(() => {
        window.__syncProfileAvatars();
    }, CONFIG.AVATAR_INTERVAL_MS);

    console.log('Started profile avatar sync:', firstRun);

})();