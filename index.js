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
  - <span class="highlight-cyan">about</span>      : Display professional summary.<br>
  - <span class="highlight-cyan">skills</span>     : List technical expertise.<br>
  - <span class="highlight-cyan">projects</span>   : Showcase completed repositories.<br>
  - <span class="highlight-cyan">contact</span>    : Print active contact profiles.<br>
  - <span class="highlight-cyan">clear</span>      : Reset the screen logs.`);
                break;
                
            case 'about':
                appendTerminalLine(`Ahmad | Full-Stack Software Engineer<br>
Specialized in Laravel, Flutter desktop development, and high-performance system configurations. Key focus points: eager loading optimization, caching structures, custom daemons, and hardware-level interfaces.`);
                break;
                
            case 'skills':
                appendTerminalLine(`TECHNICAL INVENTORY:<br>
  - <span class="highlight-green">Languages:</span> PHP 8.2+, Dart, Python, JavaScript, HTML/CSS<br>
  - <span class="highlight-green">Frameworks:</span> Laravel 12, Flutter (Desktop/Mobile), React Native, Expo, Alpine.js, Tailwind CSS<br>
  - <span class="highlight-green">Optimization:</span> N+1 Resolution, Caching invalidation, DB Indexing, Safe balances<br>
  - <span class="highlight-green">Daemon Services:</span> PM2 WhatsApp Client, Telegram API, Instance Locks`);
                break;
                
            case 'projects':
                appendTerminalLine(`FEATURED REPOSITORIES:<br>
  1. <span class="highlight-green">ecommerce</span>     : Laravel + Node.js WhatsApp daemon + iOS Expo wrapper PWA.<br>
  2. <span class="highlight-green">pfms</span>          : Multi-currency Ledger & Safe balances, optimized (N*8 → 1 query).<br>
  3. <span class="highlight-green">servex</span>        : Flutter Restaurant POS with Telegram-linked licensing & anti-piracy.<br>
  4. <span class="highlight-green">mobipos</span>       : Accessories POS with USD-IQD exchange rate worker & barcode sheets.<br>
  5. <span class="highlight-green">silkroute</span>     : Auto parts trips and invoices manager utilizing Repository patterns.<br>
  6. <span class="highlight-green">handmouse-py</span>  : Computer vision gesture-based mouse tracker (MediaPipe/OpenCV).`);
                break;
                
            case 'contact':
                appendTerminalLine(`CHANNELS:<br>
  - <span class="highlight-green">GitHub:</span> <a href="https://github.com/ahmadallkhayat" target="_blank" style="text-decoration: underline">github.com/ahmadallkhayat</a><br>
  - <span class="highlight-green">Email:</span> ahmadsadiqkhayat@gmail.com`);
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
