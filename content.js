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

    const STORAGE_KEY = "pranksterEnabled";
    const BUTTON_MODE_KEY = "pranksterButtonMode";
    let prankIntervalId = null;
    let avatarIntervalId = null;
    let isPranksterRunning = false;
    let lastDetectedProfileType = null;
    let currentButtonMode = "auto";

    // The raw HTML for the fake action buttons.
    const FAKE_BUTTONS_HTML_NORMAL = `<div><div class="x78zum5 x1a02dak x165d6jo x1lxpwgx x9otpla x1ke80iy"><!--$--><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div class="xh8yej3"><a aria-label="Add to story" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" href="https://web.facebook.com/stories/create/" role="link" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 xtvsq51 x1r1pt67"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><img class="x1b0d499 xaj1gnb" src="https://static.xx.fbcdn.net/rsrc.php/yi/r/z3LogjiHvsn.webp?_nc_eui2=AeF-td7xS_0fCoIg5ZAKa84cUeosC8rraIVR6iwLyutohUDJ9pp2QI0UZ5OpniZ_3GtwbwRunYrqUmubXzhDD7cU" alt="" aria-hidden="true" height="16" width="16"></div><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x1f6kntn xvq8zen x1s688f xtk6v10" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Add to story</span></span></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="inset: 0px;"></div></div></a></div></div><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div class="xh8yej3"><a aria-label="Edit profile" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" href="/profile.php?fb_profile_edit_entry_point=%7B%22click_point%22%3A%22edit_profile_button%22%2C%22feature%22%3A%22profile_header%22%7D&amp;id=100006234702363&amp;sk=about" role="link" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 x1qhmfi1 x1r1pt67"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><img class="x1b0d499 xep6ejk" src="https://static.xx.fbcdn.net/rsrc.php/yF/r/2AH30T09Awc.webp?_nc_eui2=AeH9WvGdqhDGih-iM5W37fUTkfaWfC7BK5yR9pZ8LsErnHhdhdSqLkp6m7fjvlO9ZkCJ3h5xJmJpAUIhdjV-vA6R" alt="" aria-hidden="true" height="16" width="16"></div><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x1f6kntn xvq8zen x1s688f x1dem4cn" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Edit profile</span></span></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="inset: 0px;"></div></div></a></div></div><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div aria-expanded="false" aria-label="See recommendations" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" role="button" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1qhmfi1 x1r1pt67 x7at6mh xkde5i4" style="transform: none;"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true" class="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style="--x-color: var(--primary-icon);"><path d="M6.94 10.354a1.5 1.5 0 0 0 2.12 0l2.647-2.647a1 1 0 0 0-1.414-1.414L8 8.586 5.707 6.293a1 1 0 0 0-1.414 1.414l2.646 2.647z"></path></svg></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="inset: 0px;"></div></div></div></div><!--/$--></div></div>`;


    const FAKE_BUTTONS_HTML_PROFESSIONAL = `<div><div class="x78zum5 x1a02dak x165d6jo x1lxpwgx x9otpla x1ke80iy"><!--$--><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div class="xh8yej3"><a aria-label="Professional dashboard" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" href="/professional_dashboard/?ref=profile_action" role="link" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 xtvsq51 x1r1pt67"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><img class="x1b0d499 xaj1gnb" src="https://static.xx.fbcdn.net/rsrc.php/yl/r/XiqKwrWtew-.webp?_nc_eui2=AeHbqKznMpy20IZXfT8BUUKWdU4CwSRjn0J1TgLBJGOfQkgaTQUMsYh4QlxN4v72WCKMq-dvxFpa58QnJzO2V_xS" alt="" aria-hidden="true" height="16" width="16"></div><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x1f6kntn xvq8zen x1s688f xtk6v10" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Professional dashboard</span></span></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="inset: 0px;"></div></div></a></div></div><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div class="xh8yej3"><a aria-label="Edit" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" href="/profile.php?fb_profile_edit_entry_point=%7B%22click_point%22%3A%22edit_profile_button%22%2C%22feature%22%3A%22profile_header%22%7D&amp;id=100006234702363&amp;sk=about" role="link" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 x1qhmfi1 x1r1pt67"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><img class="x1b0d499 xep6ejk" src="https://static.xx.fbcdn.net/rsrc.php/yF/r/2AH30T09Awc.webp?_nc_eui2=AeH9WvGdqhDGih-iM5W37fUTkfaWfC7BK5yR9pZ8LsErnHhdhdSqLkp6m7fjvlO9ZkCJ3h5xJmJpAUIhdjV-vA6R" alt="" aria-hidden="true" height="16" width="16"></div><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x1f6kntn xvq8zen x1s688f x1dem4cn" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Edit</span></span></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="inset: 0px;"></div></div></a></div></div><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div class="xh8yej3"><div aria-label="Advertise" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" role="button" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 x1qhmfi1 x1r1pt67"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><img class="x1b0d499 xep6ejk" src="https://static.xx.fbcdn.net/rsrc.php/yh/r/sPVjSYVIm7y.webp?_nc_eui2=AeEEHmULvgCfg6GqItnOz2x3DRRGydSk19cNFEbJ1KTX1zZMBP-dOd-NQb23K3GGqkzLh5CyEfKfSBT4ocBCfDD1" alt="" aria-hidden="true" height="16" width="16"></div><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x1f6kntn xvq8zen x1s688f x1dem4cn" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Advertise</span></span></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="inset: 0px;"></div></div></div></div></div><div class="xdwrcjd x2fvf9 x1xmf6yo x1w6jkce xusnbm3"><div aria-expanded="false" aria-label="See recommendations" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" role="button" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1qhmfi1 x1r1pt67 x7at6mh xkde5i4" style="transform: none;"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true" class="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style="--x-color: var(--primary-icon);"><path d="M6.94 10.354a1.5 1.5 0 0 0 2.12 0l2.647-2.647a1 1 0 0 0-1.414-1.414L8 8.586 5.707 6.293a1 1 0 0 0-1.414 1.414l2.646 2.647z"></path></svg></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="inset: 0px;"></div></div></div></div><!--/$--></div></div>`;

    // The official Facebook Camera SVG
    const FB_CAMERA_SVG = `
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M7 10.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"></path>
            <path d="M8.639 2h2.723c.509 0 .96-.002 1.378.171.417.173.736.493 1.095.854l.976.975h.246c.462-.002.925-.003 1.386.033.44.034.839.107 1.214.287a3.25 3.25 0 0 1 1.523 1.523c.18.375.253.774.287 1.214.033.426.033.949.033 1.588v3.659c0 1.133 0 2.058-.098 2.79-.103.763-.325 1.425-.854 1.954-.529.529-1.19.751-1.955.854-.73.098-1.656.098-2.79.098H6.197c-1.133 0-2.058 0-2.79-.098-.763-.103-1.425-.325-1.954-.854-.53-.528-.753-1.191-.855-1.955C.5 14.363.5 13.437.5 12.303V8.646c0-.64 0-1.162.033-1.588.034-.44.107-.839.287-1.214A3.25 3.25 0 0 1 2.343 4.32c.375-.18.774-.253 1.214-.287.46-.036.924-.035 1.386-.033h.246l.976-.975c.359-.36.678-.68 1.095-.854C7.678 1.998 8.13 2 8.64 2zM10 6a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"></path>
        </svg>
    `;

    // CLEANED Highlights Fallback DOM
    const FALLBACK_HIGHLIGHTS_HTML = `<div><div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x78zum5 x1n2onr6 xh8yej3"><div style="border-radius:max(0px, min(var(--card-corner-radius), calc((100vw - 4px - 100%) * 9999))) / var(--card-corner-radius)" class="x1n2onr6 x1ja2u2z x1jx94hy xw5cjc7 x1dmpuos x1vsv7so xau1kf4 x9f619 xh8yej3 x6ikm8r x10wlt62 xquyuld"><div class="x1n2onr6 x1ja2u2z x9f619 x78zum5 xdt5ytf x2lah0s x193iq5w xjkvuk6 x1cnzs8"><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x1iyjqo2 x2lwn1j"><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xf7dkkf xv54qhq"><div class="x78zum5 xdt5ytf x4cne27 xifccgj"><div class="xzueoph x1k70j0n"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xtoi2st x3x7a5m x1603h9y x1u7k74 x1xlr1w8 xzsf02u" dir="auto"><div class="x9f619 x1ja2u2z x78zum5 x2lah0s x1n2onr6 x1qughib x6s0dn4 xozqiw3 x1q0g3np xzt5al7"><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x193iq5w xeuugli x1r8uery x1iyjqo2 xs83m0k"><h2 class="html-h2 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1vvkbs x1heor9g x1qlqyl8 x1pd3egz x1a2a7pz x193iq5w xeuugli"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1603h9y x1u7k74 x1xlr1w8 xzsf02u"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 x1120s5i" style="-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box">Highlights</span></span></h2></div><div class="x9f619 x1n2onr6 x1ja2u2z x2lah0s x193iq5w xeuugli xqcrz7y x78zum5 xdt5ytf xl56j7k x13fj5qh"><div class="x9f619 x1ja2u2z x78zum5 x2lah0s x1n2onr6 x1qughib x6s0dn4 xozqiw3 x1q0g3np"><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli xlshs6z xnalus7">&nbsp;</div><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli"><div class="x9f619 x1ja2u2z x78zum5 x2lah0s x1n2onr6 x1qughib x1qjc9v5 xozqiw3 x1q0g3np"></div></div></div></div></div></span></div></div></div></div></div></div></div></div></div></div>`;

    const COMPOSER_BOX_HTML = `<div data-prankster-composer="true" style="margin-bottom: 16px;"><div class="x1yztbdb"><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x78zum5 x1n2onr6 xh8yej3"><div style="border-radius:max(0px, min(var(--card-corner-radius), calc((100vw - 4px - 100%) * 9999))) / var(--card-corner-radius)" class="x1n2onr6 x1ja2u2z x1jx94hy xw5cjc7 x1dmpuos x1vsv7so xau1kf4 x9f619 xh8yej3 x6ikm8r x10wlt62 xquyuld"><div class="x1qjc9v5 x78zum5 xdt5ytf x1a8lsjc xv54qhq xf7dkkf xz9dl7a"><div class="x1cy8zhl x78zum5 x1iyjqo2 xh8yej3"><a aria-label="Timeline" class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 x2lah0s x3ct3a4 xdj266r xat24cr x1lziwak x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x1q0g3np x87ps6o x1lku1pv x1a2a7pz x78zum5 x1xegmmw" href="#" role="link" tabindex="0"><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl"><div class="x1rg5ohu x1n2onr6 x3ajldb x1ja2u2z"><svg aria-hidden="true" class="x3ajldb" data-visualcompletion="ignore-dynamic" role="none" style="height:40px;width:40px"><mask id="_R_pcqil9l5bb6ismj5ilipam_"><circle cx="20" cy="20" fill="white" r="20"></circle></mask><g mask="url(#_R_pcqil9l5bb6ismj5ilipam_)"><image class="prankster-composer-avatar" style="height:40px;width:40px" x="0" y="0" height="100%" preserveAspectRatio="xMidYMid slice" width="100%" xlink:href=""></image><circle class="xbh8q5q x1pwv2dq xvlca1e" cx="20" cy="20" r="20"></circle></g></svg></div></div></a><div class="fb-prank-composer-input x1i10hfl x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x16tdsg8 x1hl2dhg xggy1nq x87ps6o x1lku1pv x1a2a7pz x6s0dn4 xmjcpbm x12ol6y4 x180vkcf x1khw62d x709u02 x78zum5 x1q0g3np x1iyjqo2 x1nhvcw1 x1n2onr6 xt7dq6l x1ba4aug x1y1aw1k xpdmqnj xwib8y2 x1g0dm76" role="button" tabindex="0"><div class="xi81zsa x1lkfr7t xkjl1po x1mzt3pk xh8yej3 x13faqbe"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6" style="-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box; color: var(--secondary-text);">What's on your mind?</span></div></div></div><div class="xqmpxtq x13fuv20 x178xt8z x78zum5 x1a02dak x1vqgdyp x1l1ennw x14vqqas x6ikm8r x10wlt62 x1y1aw1k"><div aria-label="Live video" class="fb-prank-composer-btn x1i10hfl xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1a2a7pz x6s0dn4 x1obq294 x5a5i1n xde0f50 x15x8krk x78zum5 x1r8uery x1iyjqo2 xs83m0k xl56j7k x1pshirs x1y1aw1k xf159sx xwib8y2 xmzvs34" role="button" tabindex="0"><div class="x6s0dn4 x78zum5 xl56j7k x1rfph6h x6ikm8r x10wlt62"><span class="x3nfvp2 x1c4vz4f x2lah0s x1xegmmw"><img height="24" width="24" class="xz74otr x15mokao x1ga7v0g x16uus16 xbiv7yw" alt="" referrerpolicy="origin-when-cross-origin" src="https://z-p3-static.xx.fbcdn.net/rsrc.php/yE/r/f0XMdTi7eQy.webp?_nc_eui2=AeGs2N8T41HpLPwo2xYJyfurnS7om8ylOkSdLuibzKU6REVu0Uu7vz-CLJsB0GtpW-nWFl7EyMN5xvSn5zXvpxx2"></span><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f xi81zsa" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Live video</span></span></div></div><div aria-label="Photo/video" class="fb-prank-composer-btn x1i10hfl xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1a2a7pz x6s0dn4 x1obq294 x5a5i1n xde0f50 x15x8krk x78zum5 x1r8uery x1iyjqo2 xs83m0k xl56j7k x1pshirs x1y1aw1k xf159sx xwib8y2 xmzvs34" role="button" tabindex="0"><div class="x6s0dn4 x78zum5 xl56j7k x1rfph6h x6ikm8r x10wlt62"><span class="x3nfvp2 x1c4vz4f x2lah0s x1xegmmw"><img height="24" width="24" class="xz74otr x15mokao x1ga7v0g x16uus16 xbiv7yw" alt="" referrerpolicy="origin-when-cross-origin" src="https://z-p3-static.xx.fbcdn.net/rsrc.php/yX/r/8_VnccIZfRa.webp?_nc_eui2=AeG2YlsAn6yuCAsB-TFdhgav9CYClD12-rT0JgKUPXb6tHEDnAdsaeRILiCzgfYZgcU1a8sgszVq-lU-KP-LcH8J"></span><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f xi81zsa" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Photo/video</span></span></div></div><div aria-label="Life update" class="fb-prank-composer-btn x1i10hfl xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1a2a7pz x6s0dn4 x1obq294 x5a5i1n xde0f50 x15x8krk x78zum5 x1r8uery x1iyjqo2 xs83m0k xl56j7k x1pshirs x1y1aw1k xf159sx xwib8y2 xmzvs34" role="button" tabindex="0"><div class="x6s0dn4 x78zum5 xl56j7k x1rfph6h x6ikm8r x10wlt62"><span class="x3nfvp2 x1c4vz4f x2lah0s x1xegmmw"><img height="24" width="24" class="xz74otr x15mokao x1ga7v0g x16uus16 xbiv7yw" alt="" referrerpolicy="origin-when-cross-origin" src="https://z-p3-static.xx.fbcdn.net/rsrc.php/yd/r/R9lJq0bdBk6.webp?_nc_eui2=AeF_xPC1MGmF8JkkiG9y1flUCtL4N2IW0WkK0vg3YhbRaXW7fiKi63Ji7Y1ejxVK3k0DXEFLebwtl1VvkPw4_E82"></span><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f xi81zsa" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Life update</span></span></div></div></div></div></div></div></div></div>`;

    const RICH_POSTS_HEADER_HTML = `<div class="x1yztbdb"><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x78zum5 x1n2onr6 xh8yej3"><div style="border-radius:max(0px, min(var(--card-corner-radius), calc((100vw - 4px - 100%) * 9999))) / var(--card-corner-radius)" class="x1n2onr6 x1ja2u2z x1jx94hy xw5cjc7 x1dmpuos x1vsv7so xau1kf4 x9f619 xh8yej3 x6ikm8r x10wlt62 xquyuld"><div class="x9f619 x1ja2u2z x78zum5 x2lah0s x1n2onr6 x1qughib x1qjc9v5 xozqiw3 x1q0g3np xv54qhq xf7dkkf x18d9i69 xexx8yu x1ws5yxj xw01apr x4cne27 xifccgj"><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli xamitd3 x1icxu4v x25sj25 x10b6aqq x1yrsyyn"><div class="x78zum5 xdt5ytf x4cne27 xifccgj"><div class="xzueoph x1k70j0n"><h2 dir="auto" class="html-h2 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1vvkbs x1heor9g x1qlqyl8 x1pd3egz x1a2a7pz x193iq5w xeuugli"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xtoi2st x3x7a5m x1603h9y x1u7k74 x1xlr1w8 xzsf02u x1yc453h" dir="auto">Posts</span></h2></div></div></div><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli xamitd3 x1icxu4v x25sj25 x10b6aqq x1yrsyyn"><div class="x78zum5 xwib8y2 x1y1aw1k"><div><div aria-label="Filters" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" role="button" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 x1qhmfi1 x1r1pt67"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true" class="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style="--x-color:var(--primary-icon)"><path d="M2.614 5.75H1.75a.75.75 0 0 1 0-1.5h.864a2.501 2.501 0 1 1 0 1.5zM11 8.5c1.12 0 2.067.736 2.386 1.75h.864a.75.75 0 0 1 0 1.5h-.864A2.501 2.501 0 1 1 11 8.5zM7.5 11a.75.75 0 0 0-.75-.75h-5a.75.75 0 0 0 0 1.5h5A.75.75 0 0 0 7.5 11zm1.75-6.75a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-5z"></path></svg></div><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f x1dem4cn" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Filters</span></span></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore"></div></div></div></div><div><div class="x13fj5qh"><div aria-label="Manage posts" class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3" role="button" tabindex="0"><div role="none" class="x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x14ldlfn x1b1wa69 xws8118 x5fzff1 x972fbf x10w94by x1qhh985 x14e42zd x9f619 xpdmqnj x1g0dm76 x1qhmfi1 x1r1pt67"><div class="html-div xdj266r xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x78zum5 xl56j7k x14ayic xwyz465 x1e0frkt"><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true" class="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style="--x-color:var(--primary-icon)"><path d="M6 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path><path d="M5.85 1.246A1.15 1.15 0 0 1 6.928.5h2.146c.48 0 .909.298 1.077.746l.36.963a1.25 1.25 0 0 0 1.326.801l.888-.11a1.15 1.15 0 0 1 1.1.502l1.06 1.59a1.15 1.15 0 0 1-.021 1.306l-.697.976a1.25 1.25 0 0 0 0 1.453l.697.975c.277.389.286.909.02 1.306l-1.06 1.59a1.15 1.15 0 0 1-1.099.503l-.888-.11a1.25 1.25 0 0 0-1.325.8l-.361.963a1.15 1.15 0 0 1-1.077.746H6.927a1.15 1.15 0 0 1-1.076-.746l-.344-.915a1.25 1.25 0 0 0-1.363-.796l-.833.13c-.45.07-.9-.132-1.146-.517l-1.063-1.661a1.15 1.15 0 0 1 .033-1.288l.684-.959a1.25 1.25 0 0 0-.012-1.47l-.66-.892a1.15 1.15 0 0 1-.056-1.287L2.16 3.362a1.15 1.15 0 0 1 1.156-.534l.828.13a1.25 1.25 0 0 0 1.363-.796l.344-.916zM8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"></path></svg></div><div role="none" class="x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s xsqbvy7 xb9jzoj"><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f x1dem4cn" dir="auto"><span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft">Manage posts</span></span></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore"></div></div></div></div></div></div></div></div><div class="x1n2xptk"></div><div role="tablist" class="x9f619 x1ja2u2z x78zum5 x2lah0s x1n2onr6 x1qughib x1qjc9v5 xozqiw3 x1q0g3np xyqm7xq x1ys307a"><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x193iq5w xeuugli x1r8uery x1iyjqo2 xs83m0k"><a aria-hidden="false" aria-selected="true" class="x1i10hfl x3ct3a4 xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz xjyslct xjbqb8w x18o3ruo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1heor9g x1ypdohk x78zum5 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x16tdsg8 x1hl2dhg x1vjfegm" role="tab" tabindex="0" href="/esemsojib/"><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x9f619 x78zum5 x2lah0s x1hshjfz x1n2onr6 x1vqgdyp xl56j7k xh8yej3"><div class="html-div xdj266r xat24cr x1lziwak xexx8yu x18d9i69 x1c1uobl x14ju556 xptfeew x1mmqav5"><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true" class="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style="--x-color:var(--accent)"><path d="M3 2a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2H3zM2 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1z"></path></svg></div><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f x1fey0fg" dir="auto">List view</span><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x91jh78 xkqq1k2 x1ey2m1c x13np604 xtijo5x x1o0tod x10l6tqk xl8spv7" style="--x-backgroundColor:var(--accent)"></div></div></a></div><div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x193iq5w xeuugli x1r8uery x1iyjqo2 xs83m0k"><a aria-hidden="false" aria-selected="false" class="x1i10hfl x3ct3a4 xggy1nq x1fmog5m xu25z0z x140muxe xo1y3bh x87ps6o x1lku1pv x1a2a7pz xjyslct xjbqb8w x18o3ruo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1heor9g x1ypdohk x78zum5 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x16tdsg8 x1hl2dhg x1vjfegm" role="tab" tabindex="0" href="/esemsojib/grid/"><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x6s0dn4 x9f619 x78zum5 x2lah0s x1hshjfz x1n2onr6 x1vqgdyp xl56j7k xh8yej3"><div class="html-div xdj266r xat24cr x1lziwak xexx8yu x18d9i69 x1c1uobl x14ju556 xptfeew x1mmqav5"><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true" class="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style="--x-color:var(--secondary-icon)"><path d="M2.75 1A1.75 1.75 0 0 0 1 2.75v3c0 .966.784 1.75 1.75 1.75h3A1.75 1.75 0 0 0 7.5 5.75v-3A1.75 1.75 0 0 0 5.75 1h-3zm7.5 0A1.75 1.75 0 0 0 8.5 2.75v3c0 .966.784 1.75 1.75 1.75h3A1.75 1.75 0 0 0 15 5.75v-3A1.75 1.75 0 0 0 13.25 1h-3zm-7.5 7.5A1.75 1.75 0 0 0 1 10.25v3c0 .966.784 1.75 1.75 1.75h3a1.75 1.75 0 0 0 1.75-1.75v-3A1.75 1.75 0 0 0 5.75 8.5h-3zm7.5 0a1.75 1.75 0 0 0-1.75 1.75v3c0 .966.784 1.75 1.75 1.75h3A1.75 1.75 0 0 0 15 13.25v-3a1.75 1.75 0 0 0-1.75-1.75h-3z"></path></svg></div><span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f xi81zsa" dir="auto">Grid view</span><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl xholzvs x91jh78 xkqq1k2 x1ey2m1c x13np604 xtijo5x x1o0tod x10l6tqk"></div></div><div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="border-radius: 6px; inset: 4px 0px;"></div></a></div></div></div></div></div>`;

    // The full HTML row for Like, Comment, and Share
    const FAKE_ACTION_BAR_HTML = `
    <div data-prankster-action-bar="true" class="x9f619 x1ja2u2z x78zum5 x2lah0s x1n2onr6 x1qughib x1qjc9v5 xozqiw3 x1q0g3np xyri2b x1c1uobl xjkvuk6 x1iorvi4 x11lt19s xe9ewy2 x4cne27 xifccgj">
        <div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x193iq5w xeuugli x1r8uery x1iyjqo2 xs83m0k x14vy60q xyiysdx x10b6aqq x1yrsyyn">
            <div aria-label="Like" class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 x2lah0s x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x16tdsg8 x1hl2dhg x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x5ve5x3" role="button" tabindex="0">
                <div class="x9f619 x1ja2u2z x78zum5 x1n2onr6 x1r8uery x1iyjqo2 xs83m0k xeuugli xl56j7k x6s0dn4 xozqiw3 x1q0g3np xpdmqnj x1g0dm76 x18d9i69 xexx8yu x1lxpwgx x165d6jo x4cne27 xifccgj xn3w4p2 xuxw1ft">
                    <div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli x11lfxj5 x135b78x x10b6aqq x1yrsyyn">
                        <span class="x3nfvp2"><i data-visualcompletion="css-img" class="x1b0d499 x1d69dk1" style="background-image: url(&quot;https://z-p3-static.xx.fbcdn.net/rsrc.php/yd/r/Fv2SXGWpLpB.webp?_nc_eui2=AeHyJPpKVgvMqjhv0DD-R1XDb1SaOyNkmMxvVJo7I2SYzDom7ZT1HK30fr_Tk6xBIoFgE0sRs4SvSGMFqNIoQzZR&quot;); background-position: 0px -697px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i></span>
                    </div>
                    <div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli x11lfxj5 x135b78x x10b6aqq x1yrsyyn">
                        <span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f xi81zsa" dir="auto"><span>Like</span></span>
                    </div>
                </div>
                <div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="border-radius: 4px; inset: 0px;"></div>
            </div>
        </div>
        <div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x193iq5w xeuugli x1r8uery x1iyjqo2 xs83m0k x14vy60q xyiysdx x10b6aqq x1yrsyyn">
            <div aria-label="Leave a comment" class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 x2lah0s x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz" role="button" tabindex="0">
                <div class="x9f619 x1ja2u2z x78zum5 x1n2onr6 x1r8uery x1iyjqo2 xs83m0k xeuugli xl56j7k x6s0dn4 xozqiw3 x1q0g3np xpdmqnj x1g0dm76 x18d9i69 xexx8yu x1lxpwgx x165d6jo x4cne27 xifccgj xn3w4p2 xuxw1ft">
                    <div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli x11lfxj5 x135b78x x10b6aqq x1yrsyyn">
                        <i data-visualcompletion="css-img" class="x1b0d499 x1d69dk1" aria-hidden="true" style="background-image: url(&quot;https://z-p3-static.xx.fbcdn.net/rsrc.php/yd/r/Fv2SXGWpLpB.webp?_nc_eui2=AeHyJPpKVgvMqjhv0DD-R1XDb1SaOyNkmMxvVJo7I2SYzDom7ZT1HK30fr_Tk6xBIoFgE0sRs4SvSGMFqNIoQzZR&quot;); background-position: 0px -487px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
                    </div>
                    <div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli x11lfxj5 x135b78x x10b6aqq x1yrsyyn">
                        <span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f xi81zsa" dir="auto">Comment</span>
                    </div>
                </div>
                <div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore" style="border-radius: 4px; inset: 0px;"></div>
            </div>
        </div>
        <div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x193iq5w xeuugli x1r8uery x1iyjqo2 xs83m0k x14vy60q xyiysdx x10b6aqq x1yrsyyn">
            <div aria-label="Send this to friends or post it on your profile." class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 x2lah0s x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz" role="button" tabindex="0">
                <div class="x9f619 x1ja2u2z x78zum5 x1n2onr6 x1r8uery x1iyjqo2 xs83m0k xeuugli xl56j7k x6s0dn4 xozqiw3 x1q0g3np xpdmqnj x1g0dm76 x18d9i69 xexx8yu x1lxpwgx x165d6jo x4cne27 xifccgj xn3w4p2 xuxw1ft">
                    <div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli x11lfxj5 x135b78x x10b6aqq x1yrsyyn">
                        <i data-visualcompletion="css-img" class="x1b0d499 x1d69dk1" style="background-image: url(&quot;https://z-p3-static.xx.fbcdn.net/rsrc.php/yd/r/Fv2SXGWpLpB.webp?_nc_eui2=AeHyJPpKVgvMqjhv0DD-R1XDb1SaOyNkmMxvVJo7I2SYzDom7ZT1HK30fr_Tk6xBIoFgE0sRs4SvSGMFqNIoQzZR&quot;); background-position: 0px -844px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
                    </div>
                    <div class="x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x2lah0s x193iq5w xeuugli x11lfxj5 x135b78x x10b6aqq x1yrsyyn">
                        <span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f xi81zsa" dir="auto">Share</span>
                    </div>
                </div>
                <div class="x1ey2m1c xtijo5x x1o0tod xg01cxk x47corl x10l6tqk x13vifvy x1ebt8du x19991ni x1dhq9h x1fmog5m xu25z0z x140muxe xo1y3bh" role="none" data-visualcompletion="ignore"></div>
            </div>
        </div>
    </div>`;

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

            /* --- Base Hover Surface --- */
            .fb-prank-surface {
                background-color: var(--secondary-button-background, #e4e6eb) !important;
                color: var(--primary-text, #050505) !important;
                position: absolute !important;
                overflow: hidden !important; 
                transition: transform 0.1s !important;
            }
            .fb-prank-surface::after {
                content: '' !important;
                position: absolute !important;
                inset: 0 !important;
                background-color: var(--hover-overlay, rgba(0, 0, 0, 0.05)) !important;
                opacity: 0 !important;
                transition: opacity 0.2s !important;
                pointer-events: none !important;
            }
            .fb-prank-surface:hover::after { opacity: 1 !important; }
            .fb-prank-surface:active { transform: scale(0.96) !important; }

            /* --- Composer Input Box (The Pill Shape) --- */
            .fb-prank-composer-input {
                background-color: var(--comment-background, #f0f2f5) !important;
                position: relative !important;
                overflow: hidden !important;
                border-radius: 50px !important;
                cursor: pointer !important;
            }
            .fb-prank-composer-input::after {
                content: '' !important;
                position: absolute !important;
                inset: 0 !important;
                background-color: var(--hover-overlay, rgba(0, 0, 0, 0.05)) !important;
                opacity: 0 !important;
                transition: opacity 0.2s !important;
                pointer-events: none !important;
            }
            .fb-prank-composer-input:hover::after { opacity: 1 !important; }

            /* --- Composer Action Buttons (Live, Photo, Life) --- */
            .fb-prank-composer-btn {
                background-color: transparent !important;
                position: relative !important;
                overflow: hidden !important;
                border-radius: 8px !important;
                transition: transform 0.1s !important;
                cursor: pointer !important;
            }
            .fb-prank-composer-btn::after {
                content: '' !important;
                position: absolute !important;
                inset: 0 !important;
                background-color: var(--hover-overlay, rgba(0, 0, 0, 0.05)) !important;
                opacity: 0 !important;
                transition: opacity 0.2s !important;
                pointer-events: none !important;
            }
            .fb-prank-composer-btn:hover::after { opacity: 1 !important; }
            .fb-prank-composer-btn:active { transform: scale(0.96) !important; }

            /* --- Dark Mode Fallbacks --- */
            @media (prefers-color-scheme: dark) {
                .fb-prank-surface::after, .fb-prank-composer-input::after, .fb-prank-composer-btn::after {
                    background-color: var(--hover-overlay, rgba(255, 255, 255, 0.1)) !important;
                }
                .fb-prank-composer-input {
                    background-color: var(--comment-background, #3a3b3c) !important;
                }
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
        const h1Element = document.querySelector("h1");
        const mainScope = h1Element?.closest('[role="main"]') || document;

        const actionRowCandidates = Array.from(
            mainScope.querySelectorAll('div.x78zum5.x1a02dak.x165d6jo.x1lxpwgx')
        );

        const container = actionRowCandidates
            .map((node) => {
                const text = (node.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
                const rect = node.getBoundingClientRect();
                const h1Rect = h1Element?.getBoundingClientRect();

                const hasProfileActionText =
                    text.includes("add to story") ||
                    text.includes("edit profile") ||
                    text.includes("professional dashboard") ||
                    text.includes("message") ||
                    text.includes("follow") ||
                    text.includes("add friend");

                if (!hasProfileActionText) return null;

                const distanceFromName = h1Rect ? Math.abs(rect.top - h1Rect.bottom) : rect.top;

                return { node, distanceFromName };
            })
            .filter(Boolean)
            .sort((a, b) => a.distanceFromName - b.distanceFromName)[0]?.node;

        if (!container) return;

        const profileType =
            currentButtonMode === "auto"
                ? (window.__pranksterProfileType?.type || detectProfileType().type)
                : currentButtonMode;

        const fakeButtonsHtml =
            profileType === "professional"
                ? FAKE_BUTTONS_HTML_PROFESSIONAL
                : FAKE_BUTTONS_HTML_NORMAL;

        const existingWrapper = document.querySelector(`.${CONFIG.FAKE_BUTTONS_CLASS}`);

        if (existingWrapper) {
            if (existingWrapper.dataset.pranksterButtonMode === profileType) return;
            existingWrapper.remove();
        }

        container.style.display = 'none';
        const wrapper = document.createElement('div');
        wrapper.className = CONFIG.FAKE_BUTTONS_CLASS;
        wrapper.dataset.pranksterButtonMode = profileType;
        wrapper.innerHTML = fakeButtonsHtml;
        container.parentNode.insertBefore(wrapper, container.nextSibling);
    }

    function detectProfileType(root = document) {
        const h1Element = root.querySelector("h1");
        if (!h1Element) {
            return { type: "unknown", hasFollowers: false, hasFollowing: false, hasFriends: false, sourceText: "" };
        }

        const mainScope = h1Element.closest('[role="main"]') || root;
        const candidateNodes = Array.from(mainScope.querySelectorAll('span, a, div'));

        const statNode = candidateNodes.find((node) => {
            const text = (node.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
            if (!text) return false;

            const hasFollowers = /\bfollowers?\b/.test(text);
            const hasFollowing = /\bfollowing\b/.test(text);
            const hasFriends = /\bfriends?\b/.test(text);

            return (hasFollowers && hasFollowing) || hasFriends;
        });

        const sourceText = (statNode?.textContent || "").replace(/\s+/g, " ").trim();
        const normalizedText = sourceText.toLowerCase();

        const hasFollowers = /\bfollowers?\b/.test(normalizedText);
        const hasFollowing = /\bfollowing\b/.test(normalizedText);
        const hasFriends = /\bfriends?\b/.test(normalizedText);

        let type = "unknown";
        if (hasFollowers && hasFollowing) {
            type = "professional";
        } else if (hasFriends) {
            type = "normal";
        }

        return { type, hasFollowers, hasFollowing, hasFriends, sourceText };
    }

    function syncProfileTypeDetection() {
        const profileType = detectProfileType();

        document.documentElement.dataset.pranksterProfileType = profileType.type;
        window.__pranksterProfileType = profileType;

        if (lastDetectedProfileType !== profileType.type) {
            lastDetectedProfileType = profileType.type;
            console.log("Detected profile type:", profileType);
        }

        return profileType;
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
        // 1. Find the Native Highlights text. We look at all spans to avoid missing it if Facebook changes attributes
        const allElements = Array.from(document.querySelectorAll("span, h2"));

        const nativeHighlightsHeader = allElements.find(el => {
            const text = el.textContent.trim();
            const isTargetText = (text === "Highlights" || text === "Story highlights");
            const isNotOurs = !el.closest('#my-fake-highlights-card-wrapper');
            // We want the actual text node container, usually an innermost span
            return isTargetText && isNotOurs && el.children.length === 0;
        });

        const fakeCard = document.getElementById('my-fake-highlights-card-wrapper');



        // ==========================================
        // LOGIC A: NATIVE HIGHLIGHTS EXIST
        // ==========================================


        if (nativeHighlightsHeader) {
            if (fakeCard) fakeCard.remove();

            const cardWrapper = nativeHighlightsHeader.closest('.xquyuld') || nativeHighlightsHeader.closest('[style*="border-radius: max"]');

            if (!cardWrapper || cardWrapper.querySelector(".my-fake-highlights-btn-wrapper")) return;

            const hasHighlights = cardWrapper.querySelectorAll('a[href*="source=profile_highlight"]').length > 0 || cardWrapper.querySelectorAll('svg image').length > 0;
            const buttonText = hasHighlights ? "Edit highlights" : "Add highlights";

            const btnWrapper = document.createElement("div");
            btnWrapper.className = "my-fake-highlights-btn-wrapper";

            // 1. Remove the old 16px margin top and keep bottom padding
            btnWrapper.style.padding = "0px 16px 0px 16px";
            btnWrapper.style.width = "100%";
            btnWrapper.style.boxSizing = "border-box";
            btnWrapper.style.marginTop = "0px";

            // 2. Use Transform to force the button upward, bypassing margin restrictions.
            // Adjust the -8px to whatever looks best (e.g., -12px, -4px)
            btnWrapper.style.transform = "translateY(-20px)";

            // To ensure it doesn't get clipped by the parent's overflow hidden, 
            // making it relative and bumping the z-index can help.
            btnWrapper.style.position = "relative";
            btnWrapper.style.zIndex = "1";

            btnWrapper.innerHTML = `
                <div aria-label="${buttonText}" class="fb-prank-surface" role="button" tabindex="0" style="position: relative !important; width: 100%; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: ${CONFIG.HIGHLIGHTS_BORDER_RADIUS}; font-weight: 600; font-size: 15px; cursor: pointer;">
                    ${buttonText}
                </div>
            `;

            cardWrapper.appendChild(btnWrapper);
        }



        // ==========================================
        // LOGIC B: NO NATIVE HIGHLIGHTS (Inject Fallback)
        // ==========================================
        else {
            if (fakeCard) return; // Already injected

            const targetTitles = ["Personal details", "Intro", "Photos", "Friends", "About"];
            let anchorHeader = null;

            for (const title of targetTitles) {
                // Find innermost span with this text to ensure we get the real section header
                anchorHeader = allElements.find(el => el.textContent.trim() === title && el.children.length === 0 && !el.closest('#my-fake-highlights-card-wrapper'));
                if (anchorHeader) break;
            }

            if (!anchorHeader) return;

            let anchorCard = anchorHeader.closest('.xquyuld') || anchorHeader.closest('[style*="border-radius: max"]');
            if (!anchorCard || !anchorCard.parentElement) return;

            const newFakeCard = document.createElement('div');
            newFakeCard.id = 'my-fake-highlights-card-wrapper';
            newFakeCard.innerHTML = FALLBACK_HIGHLIGHTS_HTML;

            // Inject the fallback box
            anchorCard.parentElement.insertAdjacentElement('afterend', newFakeCard);

            // Immediately inject the button into our brand new fake box
            const fakeCardWrapper = newFakeCard.querySelector('.xquyuld') || newFakeCard.querySelector('[style*="border-radius: max"]');
            if (fakeCardWrapper) {
                const btnWrapper = document.createElement("div");
                btnWrapper.className = "my-fake-highlights-btn-wrapper";
                btnWrapper.style.padding = "0px 16px 16px 16px";
                btnWrapper.style.width = "100%";
                btnWrapper.style.boxSizing = "border-box";
                btnWrapper.style.marginTop = "16px";

                btnWrapper.innerHTML = `
                    <div aria-label="Add highlights" class="fb-prank-surface" role="button" tabindex="0" style="position: relative !important; width: 100%; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: ${CONFIG.HIGHLIGHTS_BORDER_RADIUS}; font-weight: 600; font-size: 15px; cursor: pointer;">
                        Add highlights
                    </div>
                `;
                fakeCardWrapper.appendChild(btnWrapper);
            }
        }
    }

    function injectComposerAndRichPostsHeader() {
        if (document.getElementById('prankster-feed-payload')) return;

        const postsH2 = Array.from(document.querySelectorAll('h2[dir="auto"]')).find(el => el.textContent.trim() === "Posts");
        if (!postsH2) return;

        const postsContainer = postsH2.closest('.x1yztbdb');
        if (!postsContainer) return;

        const customWrapper = document.createElement('div');
        customWrapper.id = 'prankster-feed-payload';
        customWrapper.innerHTML = COMPOSER_BOX_HTML + RICH_POSTS_HEADER_HTML;

        postsContainer.replaceWith(customWrapper);
    }

    function addEditCoverPhotoButton() {
        const coverPhotoLink = document.querySelector('a[aria-label="View profile cover photo"]');
        if (!coverPhotoLink) return;

        const coverContainer = coverPhotoLink.parentElement;

        if (coverContainer && !document.getElementById('fake-edit-cover-btn')) {
            const editCoverBtn = document.createElement('div');
            editCoverBtn.id = 'fake-edit-cover-btn';

            // Apply our new master class
            editCoverBtn.className = 'fb-prank-surface';

            editCoverBtn.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
                    <div style="width: 16px; height: 16px; display: flex;">
                        ${FB_CAMERA_SVG}
                    </div>
                    <span style="font-size: 15px; font-weight: 600; font-family: Segoe UI, system-ui, sans-serif;">Edit cover photo</span>
                </div>
            `;

            Object.assign(editCoverBtn.style, {
                bottom: '16px',
                right: '32px',
                padding: '7px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                zIndex: '9',
                userSelect: 'none'
            });

            coverContainer.appendChild(editCoverBtn);
        }
    }

    function addProfileCameraIcon() {
        const profileImages = Array.from(document.querySelectorAll('svg image'));

        const targetImage = profileImages.find(img => {
            const rect = img.getBoundingClientRect();
            return rect.width > 100 && rect.height > 100 && img.closest('svg');
        });

        if (!targetImage) return;

        const profileSvg = targetImage.closest('svg');
        if (!profileSvg) return;

        const profileContainer = profileSvg.parentElement;

        if (profileContainer && !document.getElementById('fake-profile-cam-btn')) {
            if (getComputedStyle(profileContainer).position === 'static') {
                profileContainer.style.position = 'relative';
            }

            const camBtn = document.createElement('div');
            camBtn.id = 'fake-profile-cam-btn';

            // Apply our new master class
            camBtn.className = 'fb-prank-surface';

            camBtn.innerHTML = `
                <div style="width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
                    ${FB_CAMERA_SVG}
                </div>
            `;

            Object.assign(camBtn.style, {
                bottom: '8px',
                right: '8px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: '10',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.05)'
            });

            camBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });

            profileContainer.appendChild(camBtn);
        }
    }

    function syncDropdownName() {
        const newName = getCleanProfileName();
        if (!newName) return;

        const activeMenu = document.querySelector('[role="menu"], [role="dialog"]');
        if (!activeMenu) return;

        const spans = Array.from(activeMenu.querySelectorAll('span[dir="auto"]'));
        const targetNameSpan = spans.find(span => span.textContent.trim().length > 1);

        if (targetNameSpan && targetNameSpan.textContent !== newName) {
            targetNameSpan.textContent = newName;
        }
    }

    function getCleanProfileName() {
        const h1Element = document.querySelector("h1");
        if (!h1Element) return "";

        const rawName = h1Element.textContent || "";

        return rawName
            .replace(/\s*\(.*?\)\s*/g, " ")
            .replace(/\bverified\s+(account|profile)\b/gi, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    // ==========================================
    // MODULE 3: FEED PRANKSTER (COMMENTS & ACTION BARS)
    // ==========================================

    function forceFullActionBars() {
        const actionWrappers = document.querySelectorAll('.xbmvrgn.x1diwwjn');

        actionWrappers.forEach(wrapper => {
            if (wrapper.querySelector('[data-prankster-action-bar="true"]')) return;

            const textContent = wrapper.textContent || "";
            const hasLike = textContent.includes("Like");
            const hasComment = textContent.includes("Comment");
            const hasShare = textContent.includes("Share");

            if (!hasLike || !hasComment || !hasShare) {
                const nativeBar = wrapper.querySelector('.x9f619.x1ja2u2z.x78zum5.x2lah0s.x1n2onr6.x1qughib.x1qjc9v5.xozqiw3.x1q0g3np.xyri2b.x1c1uobl.xjkvuk6.x1iorvi4.x11lt19s.xe9ewy2.x4cne27.xifccgj');

                if (nativeBar) {
                    nativeBar.style.display = 'none';

                    const fakeContainer = document.createElement('div');
                    fakeContainer.innerHTML = FAKE_ACTION_BAR_HTML;
                    wrapper.appendChild(fakeContainer.firstElementChild);
                }
            }
        });
    }

    function syncCommentIdentities() {
        const ownerName = getCleanProfileName();
        if (!ownerName) return;

        const targetLabel = `Comment as ${ownerName}`;

        const textboxes = document.querySelectorAll('div[aria-label^="Comment as "], div[aria-placeholder^="Comment as "]');
        textboxes.forEach(box => {
            if (box.getAttribute('aria-label') && box.getAttribute('aria-label') !== targetLabel) {
                box.setAttribute('aria-label', targetLabel);
            }
            if (box.getAttribute('aria-placeholder') && box.getAttribute('aria-placeholder') !== targetLabel) {
                box.setAttribute('aria-placeholder', targetLabel);
            }
        });

        const visualPlaceholders = document.querySelectorAll('div[aria-hidden="true"] div');
        visualPlaceholders.forEach(el => {
            if (el.textContent.startsWith("Comment as ") && el.textContent !== targetLabel) {
                el.textContent = targetLabel;
            }
        });

        const sourceUrl = getMainProfilePictureUrl();
        if (sourceUrl) {
            const commentAvatars = document.querySelectorAll('form[role="presentation"] svg image, div[aria-label="Available Voices"] svg image, div[aria-label="Comment with an avatar sticker"] svg image');

            commentAvatars.forEach(img => {
                setImageUrl(img, sourceUrl);
            });
        }
    }
    function runPranksterLogic() {
        syncProfileTypeDetection();
        injectFakeMainButtons();
        makeIntroAndAboutEditable();
        injectCustomHeaderEditButtons();
        injectHighlightsButton();
        injectComposerAndRichPostsHeader();
        addEditCoverPhotoButton();
        addProfileCameraIcon();
        syncDropdownName();

        forceFullActionBars();
        syncCommentIdentities();
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

    function isInsidePostContent(el) {
        return Boolean(
            el.closest(
                '[role="main"], [role="article"], [data-pagelet*="FeedUnit"], [data-pagelet*="ProfileTimeline"], [aria-label="Timeline"]'
            )
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
        if (isInsidePostContent(el)) return false;

        const squareNess =
            1 - Math.abs(rect.width - rect.height) / Math.max(rect.width, rect.height);

        if (squareNess < 0.85) return false;

        const inTopZone = rect.top >= 0 && rect.top <= 180;
        const inRightSide = rect.left >= window.innerWidth * 0.55;
        const avatarSized =
            rect.width >= 24 &&
            rect.height >= 24 &&
            rect.width <= 80 &&
            rect.height <= 80;

        return inTopZone && inRightSide && avatarSized;
    }

    function syncAllAvatarsFromMainProfilePicture() {
        const sourceUrl = getMainProfilePictureUrl();

        if (!sourceUrl) {
            return { sourceUrl: null, count: 0 };
        }

        const matches = [...document.querySelectorAll('img, svg image')]
            .filter(isTopRightAvatarCandidate);

        matches.forEach(el => {
            setImageUrl(el, sourceUrl);
        });

        const composerAvatar = document.querySelector('.prankster-composer-avatar');
        if (composerAvatar) {
            setImageUrl(composerAvatar, sourceUrl);
            matches.push(composerAvatar);
        }

        return { sourceUrl, count: matches.length };
    }

    // ==========================================
    // INITIALIZATION & TOGGLE HANDLING
    // ==========================================

    function stopPrankster() {
        if (prankIntervalId) {
            clearInterval(prankIntervalId);
            prankIntervalId = null;
        }

        if (avatarIntervalId) {
            clearInterval(avatarIntervalId);
            avatarIntervalId = null;
        }

        if (window.__profileAvatarSyncInterval) {
            clearInterval(window.__profileAvatarSyncInterval);
            window.__profileAvatarSyncInterval = null;
        }

        isPranksterRunning = false;
        console.log("Profile Prankster paused");
    }

    function startPrankster() {
        if (isPranksterRunning) return;

        injectCustomEditStyles();
        runPranksterLogic();
        prankIntervalId = setInterval(runPranksterLogic, CONFIG.PRANK_INTERVAL_MS);

        if (window.__profileAvatarSyncInterval) {
            clearInterval(window.__profileAvatarSyncInterval);
        }

        window.__syncProfileAvatars = syncAllAvatarsFromMainProfilePicture;
        window.__stopProfileAvatarSync = stopPrankster;

        const firstRun = window.__syncProfileAvatars();

        avatarIntervalId = setInterval(() => {
            window.__syncProfileAvatars();
        }, CONFIG.AVATAR_INTERVAL_MS);

        window.__profileAvatarSyncInterval = avatarIntervalId;
        isPranksterRunning = true;

        console.log("Started profile avatar sync:", firstRun);
    }

    function applyEnabledState(enabled) {
        if (enabled) {
            startPrankster();
            return;
        }

        stopPrankster();
    }

    function getStoredEnabledState(callback) {
        chrome.storage.local.get({ [STORAGE_KEY]: false }, (result) => {
            callback(Boolean(result[STORAGE_KEY]));
        });
    }

    chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName !== "local") return;

        if (changes[BUTTON_MODE_KEY]) {
            currentButtonMode = changes[BUTTON_MODE_KEY].newValue || "auto";
            if (isPranksterRunning) {
                runPranksterLogic();
            }
        }

        if (changes[STORAGE_KEY]) {
            applyEnabledState(Boolean(changes[STORAGE_KEY].newValue));
        }
    });

    chrome.storage.local.get({ [BUTTON_MODE_KEY]: "auto" }, (result) => {
        currentButtonMode = result[BUTTON_MODE_KEY] || "auto";
    });

    getStoredEnabledState((enabled) => {
        applyEnabledState(enabled);
    });

})();
