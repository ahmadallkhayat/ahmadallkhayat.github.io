document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. MOUSE-FOLLOWING GLOW EFFECT (CARD PARALLAX SHADOW)
    // ==========================================================================
    const glowCards = document.querySelectorAll('.hover-glow');
    
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==========================================================================
    // 2. DYNAMIC PROJECT FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('fade-out');
                } else {
                    card.classList.add('fade-out');
                }
            });
        });
    });

    // ==========================================================================
    // 3. INTERACTIVE TERMINAL WIDGET
    // ==========================================================================
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    
    // Auto-focus terminal on click inside terminal body or window
    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow) {
        terminalWindow.addEventListener('click', () => {
            terminalInput.focus();
        });
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const commandText = terminalInput.value.trim();
                executeCommand(commandText);
                terminalInput.value = '';
            }
        });
    }

    function appendTerminalLine(text, isCommand = false, isError = false) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        if (isCommand) {
            line.innerHTML = `<span class="terminal-prompt">guest@ahmad-dev-pc:~$</span> ${text}`;
        } else if (isError) {
            line.innerHTML = `<span style="color: hsl(var(--error))">${text}</span>`;
        } else {
            line.innerHTML = text;
        }
        
        terminalBody.appendChild(line);
        // Auto scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function executeCommand(cmdStr) {
        const fullCmd = cmdStr.trim();
        if (!fullCmd) return;
        
        appendTerminalLine(fullCmd, true);
        
        const args = fullCmd.toLowerCase().split(' ');
        const primaryCmd = args[0];
        
        switch (primaryCmd) {
            case 'help':
                appendTerminalLine(`Available commands:<br>
  - <span class="highlight-cyan">about</span>       : Display professional summary.<br>
  - <span class="highlight-cyan">skills</span>      : List technical expertise.<br>
  - <span class="highlight-cyan">projects</span>    : Showcase key projects.<br>
  - <span class="highlight-cyan">experience</span>  : Print work history.<br>
  - <span class="highlight-cyan">education</span>   : Show degrees & languages.<br>
  - <span class="highlight-cyan">contact</span>     : Print active contact profiles.<br>
  - <span class="highlight-cyan">resume</span>      : Download the full resume (PDF).<br>
  - <span class="highlight-cyan">clear</span>       : Reset the screen logs.`);
                break;

            case 'about':
                appendTerminalLine(`Ahmad Salahaddin | Computer Engineer & IT Specialist<br>
5+ years building and deploying cross-platform apps (iOS, Android, Web) with Flutter/Dart, backed by Laravel/Node systems and Python automation. Experienced across construction, retail, and hospitality sectors, plus full IT infrastructure management. B.Sc. Computer Engineering (Lebanese French University, 2026). Based in Erbil, Iraq.`);
                break;

            case 'skills':
                appendTerminalLine(`TECHNICAL INVENTORY:<br>
  - <span class="highlight-green">Languages:</span> Python, Dart, JavaScript, SQL, Bash<br>
  - <span class="highlight-green">Cross-Platform:</span> Flutter/Dart (iOS, Android, Web, Windows, macOS), REST API<br>
  - <span class="highlight-green">Backend:</span> PHP/Laravel, Node.js daemons, Query optimization, Caching<br>
  - <span class="highlight-green">Databases:</span> SQLite, Firebase, SQL Server, MySQL<br>
  - <span class="highlight-green">Integrations:</span> Telegram Bot API, WhatsApp Web API, Thermal Printing, HW Locks<br>
  - <span class="highlight-green">IT & Networking:</span> Network Setup, Server Config, Hardware Troubleshooting<br>
  - <span class="highlight-green">AI/Vision:</span> MediaPipe, OpenCV, Human-Computer Interfaces`);
                break;

            case 'projects':
                appendTerminalLine(`KEY PROJECTS:<br>
  1. <span class="highlight-green">usama-auto</span>    : Flutter e-commerce app (iOS/Android/Web) + Laravel & Node.js backend. Live with real customers.<br>
  2. <span class="highlight-green">rtr-ctms</span>      : Custom Flutter CRM & billing platform for a construction office.<br>
  3. <span class="highlight-green">servex</span>        : Fully offline Flutter POS (SQLite) with Telegram-linked anti-piracy.<br>
  4. <span class="highlight-green">mobipos</span>       : Accessories POS with USD-IQD exchange rate worker & barcode sheets.<br>
  5. <span class="highlight-green">silkroute</span>     : Auto parts trips and invoices manager.<br>
  6. <span class="highlight-green">handmouse-py</span>  : Computer vision gesture-based mouse tracker (MediaPipe/OpenCV).`);
                break;

            case 'experience':
                appendTerminalLine(`WORK EXPERIENCE:<br>
  - <span class="highlight-green">2022 - Present</span> | Software Developer @ Usama Auto<br>
      Built a full Flutter e-commerce platform serving real customers; cut order processing time ~60%.<br>
  - <span class="highlight-green">2018 - 2022</span>    | IT Manager & Software Developer @ Rast To Rast Construction<br>
      Managed full IT infrastructure and built a custom CRM/billing system (RTR CTMS).<br>
  - <span class="highlight-green">2021 - Present</span> | Technical Support Specialist @ Aqua Pool<br>
      Hardware/software troubleshooting ensuring minimal downtime.`);
                break;

            case 'education':
                appendTerminalLine(`EDUCATION:<br>
  - <span class="highlight-green">2022 - 2026</span> | B.Sc. Computer Engineering — Lebanese French University, Erbil<br>
  - <span class="highlight-green">2017 - 2022</span> | Diploma in Information Technology (CIS) — CIS College, Erbil<br>
<br>
LANGUAGES: Kurdish (Native), English (Advanced), Arabic (Advanced), Turkish (Basic)`);
                break;

            case 'resume':
            case 'cv':
                appendTerminalLine(`Opening resume... <a href="assets/Ahmad-Salahaddin-Resume.pdf" target="_blank" download style="text-decoration: underline" class="highlight-green">Download Ahmad-Salahaddin-Resume.pdf</a>`);
                window.open('assets/Ahmad-Salahaddin-Resume.pdf', '_blank');
                break;

            case 'contact':
                appendTerminalLine(`CHANNELS:<br>
  - <span class="highlight-green">Email:</span> ahmadsadiqkhayat@gmail.com<br>
  - <span class="highlight-green">Phone:</span> +964 751 029 2797<br>
  - <span class="highlight-green">LinkedIn:</span> <a href="https://www.linkedin.com/in/ahmad-salahaddin-531495288" target="_blank" style="text-decoration: underline">ahmad-salahaddin</a><br>
  - <span class="highlight-green">GitHub:</span> <a href="https://github.com/ahmadallkhayat" target="_blank" style="text-decoration: underline">github.com/ahmadallkhayat</a><br>
  - <span class="highlight-green">Location:</span> Erbil, Iraq`);
                break;

            case 'clear':
                terminalBody.innerHTML = '';
                break;
                
            default:
                appendTerminalLine(`shell: command not found: '${primaryCmd}'. Type 'help' for options.`, false, true);
                break;
        }
    }
});

// ==========================================================================
// ✦ POLISH LAYER — motion, reveals, particles & interactions
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;

    // ---- Scroll progress bar ----
    const progress = document.getElementById('scroll-progress');
    const onScrollProgress = () => {
        const h = document.documentElement;
        const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
        if (progress) progress.style.width = `${Math.min(scrolled * 100, 100)}%`;
    };
    window.addEventListener('scroll', onScrollProgress, { passive: true });
    onScrollProgress();

    // ---- Mobile nav drawer ----
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    const navOverlay = document.getElementById('nav-overlay');
    const setNav = (open) => {
        if (!navToggle || !navList) return;
        navToggle.classList.toggle('open', open);
        navList.classList.toggle('open', open);
        if (navOverlay) navOverlay.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    };
    if (navToggle) navToggle.addEventListener('click', () => setNav(!navList.classList.contains('open')));
    if (navOverlay) navOverlay.addEventListener('click', () => setNav(false));
    if (navList) navList.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => setNav(false)));

    // ---- Scroll spy (active nav link) ----
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const spy = () => {
        const pos = window.scrollY + window.innerHeight * 0.3;
        let current = '';
        sections.forEach(s => { if (pos >= s.offsetTop) current = s.id; });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    };
    window.addEventListener('scroll', spy, { passive: true });
    spy();

    // ---- Scroll reveal with stagger ----
    const revealTargets = [
        '.about-card', '.section-title', '.skills-card', '.project-card',
        '.timeline-item', '.edu-card', '.lang-card', '.contact-card',
        '.terminal-window', '.section-subtitle', '.languages-title', '.hero-stats'
    ];
    const groups = {};
    revealTargets.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.classList.add('reveal');
            const arr = (groups[sel] = groups[sel] || []);
            arr.push(el);
        });
    });
    // stagger siblings within each selector group
    Object.values(groups).forEach(arr => {
        arr.forEach((el, i) => { el.style.setProperty('--d', `${Math.min(i * 70, 420)}ms`); });
    });

    if (reduceMotion) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
    } else {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    }

    // ---- Animated stat counters ----
    const counters = document.querySelectorAll('.stat-count');
    const runCounter = (el) => {
        const target = parseInt(el.dataset.target, 10) || 0;
        if (reduceMotion) { el.textContent = target; return; }
        const dur = 1400;
        let start = null;
        const step = (ts) => {
            if (start === null) start = ts;
            const p = Math.min((ts - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target);
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    if (counters.length) {
        const cio = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); } });
        }, { threshold: 0.6 });
        counters.forEach(c => cio.observe(c));
    }

    // ---- Typing role rotator ----
    const roleEl = document.getElementById('role-text');
    if (roleEl) {
        const roles = [
            'Computer Engineer',
            'IT Specialist',
            'Cross-Platform App Developer',
            'Flutter & Dart Engineer',
            'Full-Stack Developer'
        ];
        if (reduceMotion) {
            roleEl.textContent = roles[0];
        } else {
            let ri = 0, ci = 0, deleting = false;
            const tick = () => {
                const word = roles[ri];
                ci += deleting ? -1 : 1;
                roleEl.textContent = word.slice(0, ci);
                let delay = deleting ? 45 : 90;
                if (!deleting && ci === word.length) { delay = 1500; deleting = true; }
                else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 350; }
                setTimeout(tick, delay);
            };
            tick();
        }
    }

    // ---- Hero particle constellation ----
    const canvas = document.getElementById('hero-canvas');
    if (canvas && !reduceMotion) {
        const ctx = canvas.getContext('2d');
        let w, h, particles = [], raf, mouse = { x: null, y: null };
        const DPR = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            w = rect.width; h = rect.height;
            canvas.width = w * DPR; canvas.height = h * DPR;
            canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            const count = Math.round(Math.min(90, Math.max(28, (w * h) / 16000)));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.8 + 0.6
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(150, 120, 255, 0.55)';
                ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x, dy = p.y - q.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = `rgba(120, 180, 220, ${0.16 * (1 - dist / 120)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
                if (mouse.x !== null) {
                    const dx = p.x - mouse.x, dy = p.y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 160) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(160, 130, 255, ${0.28 * (1 - dist / 160)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            raf = requestAnimationFrame(draw);
        };

        const heroSection = document.getElementById('hero');
        heroSection.addEventListener('mousemove', (e) => {
            const rect = canvas.parentElement.getBoundingClientRect();
            mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
        });
        heroSection.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
        window.addEventListener('resize', resize);
        resize();
        draw();
    }

    // ---- 3D tilt on cards (desktop only) ----
    if (canHover && !reduceMotion) {
        document.querySelectorAll('.skills-card, .project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `perspective(800px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg) translateY(-4px)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    // ---- Back to top ----
    const toTop = document.getElementById('back-to-top');
    if (toTop) {
        const heroEl = document.getElementById('hero');
        window.addEventListener('scroll', () => {
            // Only show once the hero (and its stats) is scrolled out of view,
            // so the floating button never overlaps hero content.
            const trigger = heroEl ? heroEl.offsetHeight - 100 : 600;
            toTop.classList.toggle('show', window.scrollY > trigger);
        }, { passive: true });
        toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
    }
});
