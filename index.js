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
                appendTerminalLine(`Ahmad Salahaddin | Software Developer, IT Engineer & Cross-Platform App Developer<br>
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
