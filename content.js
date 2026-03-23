(() => {
    console.log("🚀 Nuclear Profile Prankster Loaded (Targeted Layout Fix)!");

    // --- Configuration & Constants ---
    const CONFIG = {
        INTERVAL_MS: 500,
        ALLOWED_TITLES: new Set(["Personal details", "Work", "Education", "Places lived", "Contact info", "Basic info"]),
        INTRO_TITLES: new Set(["Intro", "About"]),
        CUSTOM_EDIT_CLASS: "my-custom-visual-edit-btn",
        CUSTOM_EDIT_STYLE_ID: "my-custom-edit-style",
        FAKE_BUTTONS_CLASS: "my-fake-buttons"
    };

    // The raw HTML for the fake action buttons
    const FAKE_BUTTONS_HTML = `<div><div class="x78zum5 x1a02dak x165d6jo x1lxpwgx x9otpla x1ke80iy"><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div class="xh8yej3"><a aria-label="Add to story" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" href="https://web.facebook.com/stories/create/" role="link" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 xtvsq51 x1r1pt67"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><img class="x1b0d499 xaj1gnb" alt="" aria-hidden="true" height="16" width="16" src="https://z-p3-static.xx.fbcdn.net/rsrc.php/yi/r/z3LogjiHvsn.webp?_nc_eui2=AeF1rPXioL2bT0Es3quCxqDwm1tVyk4b7HybW1XKThvsfALZfiPJwv7uPu69xdDuh-xD-C7oxlTv2gH4q7LREBvY"></div><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f xtk6v10" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Add to story</span></span></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="inset: 0px;"></div></div></a></div></div><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div class="xh8yej3"><a aria-label="Edit profile" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" href="/profile.php?fb_profile_edit_entry_point=%7B%22click_point%22%3A%22edit_profile_button%22%2C%22feature%22%3A%22profile_header%22%7D&amp;id=100017009776002&amp;sk=about" role="link" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 x1qhmfi1 x1r1pt67"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><img class="x1b0d499 xep6ejk" alt="" aria-hidden="true" height="16" width="16" src="https://z-p3-static.xx.fbcdn.net/rsrc.php/yF/r/2AH30T09Awc.webp?_nc_eui2=AeELmLOb-BEfBXGSrRfkpsAkLcFBb4cpDv0twUFvhykO_aBzZh0FvlDqw8HqI52qRLzq8iLdDuljwylyzqUyOC-K"></div><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f x1dem4cn" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Edit profile</span></span></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="inset: 0px;"></div></div></a></div></div><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div aria-expanded="false" aria-label="See recommendations" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" role="button" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1qhmfi1 x1r1pt67 x7at6mh xkde5i4"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true" class="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style="--x-color: var(--primary-icon);"><path d="M6.94 10.354a1.5 1.5 0 0 0 2.12 0l2.647-2.647a1 1 0 0 0-1.414-1.414L8 8.586 5.707 6.293a1 1 0 0 0-1.414 1.414l2.646 2.647z"></path></svg></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore"></div></div></div></div></div></div>`;

    // --- 1. Style Injection ---
    function injectCustomEditStyles() {
        if (document.getElementById(CONFIG.CUSTOM_EDIT_STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = CONFIG.CUSTOM_EDIT_STYLE_ID;
        style.textContent = `
            .${CONFIG.CUSTOM_EDIT_CLASS} {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 38px !important;   /* 👈 INCREASED FROM 32px */
                height: 38px !important;  /* 👈 INCREASED FROM 32px */
                border-radius: 50% !important;
                background: transparent !important;
                color: #65676b !important;
                cursor: pointer !important;
                user-select: none !important;
                -webkit-user-select: none !important;
                flex-shrink: 0 !important;
                margin-left: auto !important; /* Force to the right side */
                transition: background-color 120ms ease, transform 120ms ease !important;
            }
            .${CONFIG.CUSTOM_EDIT_CLASS}:hover {
                background: rgba(0, 0, 0, 0.08) !important;
            }
            .${CONFIG.CUSTOM_EDIT_CLASS}:active {
                transform: scale(0.96) !important;
            }
            .${CONFIG.CUSTOM_EDIT_CLASS} svg {
                width: 22px !important;   /* 👈 INCREASED FROM 18px */
                height: 22px !important;  /* 👈 INCREASED FROM 18px */
                fill: currentColor !important;
                pointer-events: none !important;
                display: block !important;
            }
        `;
        document.head.appendChild(style);
    }

    // --- 2. Element Creation ---
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

    // --- 3. Fake Buttons ---
    function injectFakeMainButtons() {
        const messageBtn = document.querySelector('[aria-label="Message"]');
        if (!messageBtn) return;

        let container = messageBtn.parentElement;
        while (container && container.children.length < 2) {
            container = container.parentElement;
        }

        if (container && !document.querySelector(`.${CONFIG.FAKE_BUTTONS_CLASS}`)) {
            container.style.display = 'none';

            const wrapper = document.createElement('div');
            wrapper.className = CONFIG.FAKE_BUTTONS_CLASS;
            wrapper.innerHTML = FAKE_BUTTONS_HTML;

            container.parentNode.insertBefore(wrapper, container.nextSibling);
        }
    }

    // --- 4. Targeted Icon Injection ---
    function injectCustomHeaderEditButtons() {
        const allH2s = Array.from(document.querySelectorAll("h2"));

        allH2s.forEach((h2) => {
            const titleSpan = h2.querySelector('span[dir="auto"]');
            const title = titleSpan?.textContent?.trim();

            if (!title || !CONFIG.ALLOWED_TITLES.has(title)) return;

            // Target the specific outer wrapper found in your HTML snippet
            // .x1gslohp is the Facebook class for the flex-row containing the header text
            let headerRow = h2.closest('.x1gslohp');

            // Fallback just in case Facebook updates their class names
            if (!headerRow) {
                let curr = h2.parentElement;
                while (curr && curr.tagName !== 'BODY') {
                    if (curr.classList.contains('x78zum5') && !curr.classList.contains('xdt5ytf')) {
                        headerRow = curr;
                        break;
                    }
                    curr = curr.parentElement;
                }
            }

            if (!headerRow) return;

            // Prevent duplicate injections
            if (headerRow.querySelector(`.${CONFIG.CUSTOM_EDIT_CLASS}`)) return;

            // Force Facebook's header row to span 100% of the card width
            headerRow.style.setProperty('display', 'flex', 'important');
            headerRow.style.setProperty('flex-direction', 'row', 'important');
            headerRow.style.setProperty('justify-content', 'space-between', 'important');
            headerRow.style.setProperty('align-items', 'center', 'important');
            headerRow.style.setProperty('width', '100%', 'important');

            // Force the text container to NOT stretch, leaving room for the button
            const leftContent = headerRow.firstElementChild;
            if (leftContent) {
                leftContent.style.setProperty('flex', '0 1 auto', 'important');
                leftContent.style.setProperty('width', 'auto', 'important');
            }

            // Append the button directly to the outer row container
            const button = createCustomVisualEditButton(title);
            headerRow.appendChild(button);
        });
    }

    // --- 5. Make Specific Text Editable ---
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

    // --- Main Loop Routine ---
    function runCoreLogic() {
        injectFakeMainButtons();
        makeIntroAndAboutEditable();
        injectCustomHeaderEditButtons();
    }

    // --- Initialization ---
    injectCustomEditStyles();
    setInterval(runCoreLogic, CONFIG.INTERVAL_MS);

})();