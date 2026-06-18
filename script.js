/* ========================================================
   Bibek Thandar — Main Script
   CET138 Full Stack ePortfolio
   Features: Theme toggle, scroll spy, animated counters,
   skills bars, color palette, calculator, jokes API,
   to-do list with localStorage + bulk actions + suggestions,
   form validation, copy buttons, layout switcher, flow
   animation, modal.
   ======================================================== */

(function () {
    'use strict';

    /* ---------- TINY UTILS ---------- */
    const $  = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const escapeHtml = (str) => {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(String(str)));
        return div.innerHTML;
    };
    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    /* ---------- TOAST ---------- */
    function toast(msg, duration = 2200) {
        const el = $('#toast');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(el._t);
        el._t = setTimeout(() => el.classList.remove('show'), duration);
    }

    /* ---------- THEME TOGGLE ---------- */
    function initTheme() {
        const btn = $('#theme-toggle');
        const saved = localStorage.getItem('dash-theme') || 'dark';
        document.body.setAttribute('data-theme', saved);
        updateIcon(saved);

        btn.addEventListener('click', () => {
            const current = document.body.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', next);
            localStorage.setItem('dash-theme', next);
            updateIcon(next);
            toast(`Switched to ${next} mode`);
        });

        function updateIcon(theme) {
            btn.innerHTML = theme === 'dark'
                ? '<i class="bi bi-sun-fill"></i>'
                : '<i class="bi bi-moon-stars-fill"></i>';
        }
    }

    /* ---------- MOBILE MENU ---------- */
    function initMenu() {
        const btn = $('#menu-toggle');
        const sidebar = $('#sidebar');
        const backdrop = $('#sidebar-backdrop');
        if (!btn || !sidebar) return;

        function close() {
            sidebar.classList.remove('open');
            if (backdrop) backdrop.classList.remove('show');
        }
        function toggle() {
            const opening = !sidebar.classList.contains('open');
            sidebar.classList.toggle('open');
            if (backdrop) backdrop.classList.toggle('show', opening);
        }

        btn.addEventListener('click', toggle);
        if (backdrop) backdrop.addEventListener('click', close);

        $$('.sidebar-nav a').forEach(a => {
            a.addEventListener('click', () => {
                if (window.innerWidth < 992) close();
            });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });
    }

    /* ---------- SCROLL PROGRESS BAR + SPY ---------- */
    function initScroll() {
        const bar = $('#progress-bar');
        const navLinks = $$('.sidebar-nav a');
        const sections = navLinks
            .map(a => document.querySelector(a.getAttribute('href')))
            .filter(Boolean);

        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const h = document.documentElement;
                    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
                    bar.style.width = `${Math.min(100, scrolled * 100)}%`;

                    const fromTop = window.scrollY + 150;
                    let current = sections[0];
                    sections.forEach(s => {
                        if (s.offsetTop <= fromTop) current = s;
                    });
                    if (current) {
                        navLinks.forEach(a => a.classList.toggle('active',
                            a.getAttribute('href') === '#' + current.id));
                    }

                    ticking = false;
                });
                ticking = true;
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- KEYBOARD SHORTCUTS ---------- */
    function initKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.target.matches('input, textarea')) return;
            if (e.key === 't' || e.key === 'T') { $('#theme-toggle').click(); }
            if (e.key === '/') { e.preventDefault(); $('#todo-input')?.focus(); }
        });
    }

    /* ---------- ANIMATED COUNTERS ---------- */
    function initCounters() {
        const counters = $$('.counter');
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        counters.forEach(c => io.observe(c));

        function animate(el) {
            const target = parseInt(el.dataset.target, 10);
            const duration = 1500;
            const start = performance.now();
            function tick(now) {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.floor(eased * target);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            }
            requestAnimationFrame(tick);
        }
    }

    /* ---------- SIDEBAR SKILLS BARS ---------- */
    function initSkillsBars() {
        const bars = $$('.sidebar-skill .bar i');
        if (!bars.length) return;
        // animate immediately on load (sidebar may be off-screen on mobile)
        setTimeout(() => {
            bars.forEach(b => {
                const target = b.style.width;
                b.style.width = '0';
                requestAnimationFrame(() => { b.style.width = target; });
            });
        }, 300);
    }

    /* ---------- COPY BUTTONS ---------- */
    function initCopyBtns() {
        $$('.copy-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.copy;
                const code = $('#' + id);
                if (!code) return;
                try {
                    await navigator.clipboard.writeText(code.textContent);
                    btn.classList.add('copied');
                    btn.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
                    toast('Code copied to clipboard');
                    setTimeout(() => {
                        btn.classList.remove('copied');
                        btn.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                    }, 1800);
                } catch (err) {
                    toast('Copy failed');
                }
            });
        });
    }

    /* ---------- FULL-STACK FLOW ANIMATION ---------- */
    function initFlowAnim() {
        const btn = $('#animate-flow');
        const steps = $$('.flow-step');
        if (!btn || !steps.length) return;
        btn.addEventListener('click', async () => {
            btn.disabled = true;
            for (const s of steps) {
                s.classList.add('active');
                await wait(500);
            }
            await wait(700);
            steps.forEach(s => s.classList.remove('active'));
            btn.disabled = false;
        });
    }

    /* ---------- HTML FORM VALIDATION ---------- */
    function initHtmlForm() {
        const form = $('#html-demo-form');
        if (!form) return;
        const result = $('#html-form-result');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('input[required]');
            let ok = true;
            inputs.forEach(i => {
                if (!i.checkValidity()) {
                    i.classList.add('is-invalid');
                    i.classList.remove('is-valid');
                    ok = false;
                } else {
                    i.classList.add('is-valid');
                    i.classList.remove('is-invalid');
                }
            });
            if (ok) {
                result.innerHTML = '<span class="text-c"><i class="bi bi-check-circle-fill"></i> Form submitted successfully!</span>';
                toast('Form passes validation ✓');
                form.reset();
                setTimeout(() => {
                    form.querySelectorAll('input').forEach(i => i.classList.remove('is-valid'));
                    result.innerHTML = '';
                }, 3500);
            } else {
                result.innerHTML = '<span style="color:#ef4444"><i class="bi bi-exclamation-triangle-fill"></i> Please fix errors above</span>';
            }
        });

        form.querySelectorAll('input').forEach(i => {
            i.addEventListener('input', () => {
                if (i.value) {
                    i.classList.toggle('is-valid', i.checkValidity());
                    i.classList.toggle('is-invalid', !i.checkValidity());
                } else {
                    i.classList.remove('is-valid', 'is-invalid');
                }
            });
        });
    }

    /* ---------- COLOR PALETTE GENERATOR ---------- */
    function initPalette() {
        const wrap = $('#palette');
        const btn  = $('#gen-palette');
        if (!wrap || !btn) return;

        function hsl(h, s, l) { return `hsl(${h}, ${s}%, ${l}%)`; }
        function hslToHex(h, s, l) {
            s /= 100; l /= 100;
            const k = n => (n + h / 30) % 12;
            const a = s * Math.min(l, 1 - l);
            const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
            const toHex = x => Math.round(255 * x).toString(16).padStart(2, '0');
            return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
        }

        function generate() {
            wrap.innerHTML = '';
            const baseHue = Math.floor(Math.random() * 360);
            for (let i = 0; i < 5; i++) {
                const h = (baseHue + i * 35) % 360;
                const s = 65 + Math.floor(Math.random() * 20);
                const l = 45 + i * 5;
                const hex = hslToHex(h, s, l);
                const sw = document.createElement('div');
                sw.className = 'palette-swatch';
                sw.style.background = hsl(h, s, l);
                sw.textContent = hex;
                sw.title = 'Click to copy ' + hex;
                sw.addEventListener('click', async () => {
                    try {
                        await navigator.clipboard.writeText(hex);
                        toast(`Copied ${hex}`);
                    } catch {}
                });
                wrap.appendChild(sw);
            }
        }
        btn.addEventListener('click', generate);
        generate();
    }

    /* ---------- LAYOUT SWITCHER ---------- */
    function initLayoutSwitch() {
        const btns = $$('.layout-btn');
        const demo = $('#layout-demo');
        if (!demo) return;
        btns.forEach(b => {
            b.addEventListener('click', () => {
                btns.forEach(x => x.classList.remove('active'));
                b.classList.add('active');
                demo.classList.remove('flex-mode', 'grid-mode');
                demo.classList.add(b.dataset.layout + '-mode');
            });
        });
    }

    /* ---------- CALCULATOR ---------- */
    function initCalculator() {
        const display = $('#calc-display');
        const keys = $$('.calc-keys button');
        if (!display) return;
        let expr = '';

        const safeEval = (str) => {
            if (!/^[0-9+\-*/.() ]+$/.test(str)) throw new Error('Invalid');
            return Function('"use strict"; return (' + str + ')')();
        };

        function render() { display.textContent = expr || '0'; }

        keys.forEach(k => {
            k.addEventListener('click', () => {
                const key = k.dataset.key;
                if (key === 'C') { expr = ''; }
                else if (key === '←') { expr = expr.slice(0, -1); }
                else if (key === '=') {
                    try {
                        const result = safeEval(expr);
                        if (result === undefined || isNaN(result)) throw new Error();
                        expr = String(Math.round(result * 1e10) / 1e10);
                    } catch { expr = 'Error'; }
                }
                else { expr += key; }
                render();
            });
        });
        render();
    }

    /* ---------- JOKE API ---------- */
    function initJokes() {
        const btn = $('#get-joke');
        const text = $('#joke-text');
        if (!btn) return;

        const fallback = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "There are 10 types of people: those who understand binary and those who don't.",
            "Why did the developer go broke? Because he used up all his cache.",
            "A SQL query walks into a bar, sees two tables and asks: 'May I join you?'",
            "Why do Java developers wear glasses? Because they don't C#.",
            "I would tell you a UDP joke, but you might not get it.",
            "How many programmers does it take to change a lightbulb? None — that's a hardware issue!"
        ];

        btn.addEventListener('click', async () => {
            btn.disabled = true;
            text.textContent = 'Fetching a joke...';
            try {
                const res = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
                if (!res.ok) throw new Error();
                const data = await res.json();
                const joke = Array.isArray(data) ? data[0] : data;
                text.innerHTML = `<strong>${escapeHtml(joke.setup)}</strong><br><em>— ${escapeHtml(joke.punchline)}</em>`;
            } catch (err) {
                const j = fallback[Math.floor(Math.random() * fallback.length)];
                text.textContent = j;
            }
            btn.disabled = false;
        });
    }

    /* ---------- TO-DO LIST (with bulk actions + suggestions) ---------- */
    function initTodo() {
        const input        = $('#todo-input');
        const addBtn       = $('#todo-add');
        const list         = $('#todo-list');
        const empty        = $('#todo-empty');
        const totalEl      = $('#todo-total');
        const doneEl       = $('#todo-done');
        const leftEl       = $('#todo-left');
        const completeAll  = $('#todo-complete-all');
        const clearDone    = $('#todo-clear-done');
        const clearAll     = $('#todo-clear-all');
        const suggestWrap  = $('#todo-suggestions');
        if (!input || !list) return;

        const KEY = 'dash-todos';
        let todos = JSON.parse(localStorage.getItem(KEY) || '[]');

        function save() { localStorage.setItem(KEY, JSON.stringify(todos)); }

        function updateStats() {
            const total = todos.length;
            const done  = todos.filter(t => t.done).length;
            if (totalEl) totalEl.textContent = total;
            if (doneEl)  doneEl.textContent  = done;
            if (leftEl)  leftEl.textContent  = total - done;
            // refresh suggestion chips (mark already-added ones)
            updateSuggestionState();
        }

        function updateSuggestionState() {
            if (!suggestWrap) return;
            const existing = new Set(todos.map(t => t.text.toLowerCase()));
            $$('.chip', suggestWrap).forEach(c => {
                const t = (c.dataset.task || '').toLowerCase();
                c.classList.toggle('added', existing.has(t));
            });
        }

        function render() {
            list.innerHTML = '';
            empty.style.display = todos.length ? 'none' : 'block';
            todos.forEach((t, i) => {
                const li = document.createElement('li');
                if (t.done) li.classList.add('done');
                li.innerHTML = `
                    <input type="checkbox" ${t.done ? 'checked' : ''} aria-label="Mark complete">
                    <span>${escapeHtml(t.text)}</span>
                    <button aria-label="Delete task" title="Delete"><i class="bi bi-trash3"></i></button>
                `;
                li.querySelector('input').addEventListener('change', () => {
                    todos[i].done = !todos[i].done;
                    save(); render();
                });
                li.querySelector('span').addEventListener('click', () => {
                    todos[i].done = !todos[i].done;
                    save(); render();
                });
                li.querySelector('button').addEventListener('click', () => {
                    todos.splice(i, 1);
                    save(); render();
                    toast('Task removed');
                });
                list.appendChild(li);
            });
            updateStats();
        }

        function addTask(text) {
            text = String(text || '').trim();
            if (!text) return false;
            // avoid duplicates
            if (todos.some(t => t.text.toLowerCase() === text.toLowerCase())) {
                toast('That task is already on your list');
                return false;
            }
            todos.unshift({ text, done: false });
            save(); render();
            return true;
        }

        function add() {
            if (addTask(input.value)) {
                input.value = '';
                toast('Task added ✓');
            }
        }

        addBtn.addEventListener('click', add);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') add();
        });

        // Suggestions: click a chip to add the task
        if (suggestWrap) {
            suggestWrap.addEventListener('click', (e) => {
                const chip = e.target.closest('.chip');
                if (!chip) return;
                if (addTask(chip.dataset.task)) toast('Added: ' + chip.dataset.task);
            });
        }

        // Bulk: complete all
        if (completeAll) {
            completeAll.addEventListener('click', () => {
                if (!todos.length) { toast('Nothing to complete'); return; }
                if (todos.every(t => t.done)) { toast('Already all complete ✓'); return; }
                todos.forEach(t => t.done = true);
                save(); render();
                toast('All tasks completed 🎉');
            });
        }

        // Bulk: clear done
        if (clearDone) {
            clearDone.addEventListener('click', () => {
                const before = todos.length;
                todos = todos.filter(t => !t.done);
                if (todos.length === before) { toast('No completed tasks to clear'); return; }
                save(); render();
                toast('Cleared completed tasks');
            });
        }

        // Bulk: clear all (with confirm)
        if (clearAll) {
            clearAll.addEventListener('click', () => {
                if (!todos.length) { toast('List is already empty'); return; }
                if (!confirm(`Remove all ${todos.length} task(s)? This can't be undone.`)) return;
                todos = [];
                save(); render();
                toast('All tasks removed');
            });
        }

        render();
    }

    /* ---------- CONTACT FORM ---------- */
    function initContactForm() {
        const form = $('#contact-form');
        if (!form) return;
        const result = $('#contact-result');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('input, textarea');
            let ok = true;
            inputs.forEach(i => {
                if (i.hasAttribute('required') && !i.value.trim()) {
                    i.classList.add('is-invalid');
                    ok = false;
                } else if (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value)) {
                    i.classList.add('is-invalid');
                    ok = false;
                } else {
                    i.classList.remove('is-invalid');
                    i.classList.add('is-valid');
                }
            });
            if (ok) {
                result.innerHTML = '<span class="text-c"><i class="bi bi-check-circle-fill"></i> Message sent! (demo)</span>';
                toast('Message sent successfully!');
                form.reset();
                setTimeout(() => {
                    inputs.forEach(i => i.classList.remove('is-valid'));
                    result.innerHTML = '';
                }, 3500);
            } else {
                result.innerHTML = '<span style="color:#ef4444"><i class="bi bi-exclamation-triangle-fill"></i> Please complete all fields</span>';
            }
        });
    }

    /* ---------- TYPEWRITER ---------- */
    function initTypewriter() {
        const el = $('#typewriter');
        if (!el) return;
        const phrases = [
            'Full Stack Developer',
            'HTML & CSS Enthusiast',
            'JavaScript Learner',
            'Bootstrap Builder',
            'Code Lover'
        ];
        let pi = 0, ci = 0, deleting = false;
        function tick() {
            const word = phrases[pi];
            el.textContent = deleting
                ? word.substring(0, ci--)
                : word.substring(0, ci++);
            let speed = deleting ? 50 : 90;
            if (!deleting && ci === word.length + 1) {
                deleting = true;
                speed = 1500;
            } else if (deleting && ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
                speed = 300;
            }
            setTimeout(tick, speed);
        }
        tick();
    }

    /* ---------- INTERSECTION FADE-IN ---------- */
    function initFadeIn() {
        const sections = $$('.content-card, .stat-card, .hero-card');
        sections.forEach(s => {
            s.style.opacity = '0';
            s.style.transform = 'translateY(20px)';
            s.style.transition = 'opacity .6s ease, transform .6s ease';
        });
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sections.forEach(s => io.observe(s));
    }

    /* ---------- INIT ALL ---------- */
    function init() {
        initTheme();
        initMenu();
        initScroll();
        initKeyboard();
        initCounters();
        initSkillsBars();
        initCopyBtns();
        initFlowAnim();
        initHtmlForm();
        initPalette();
        initLayoutSwitch();
        initCalculator();
        initJokes();
        initTodo();
        initContactForm();
        initTypewriter();
        initFadeIn();

        setTimeout(() => toast('Welcome to the Bibek Thandar portfolio! Press T for theme'), 800);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
