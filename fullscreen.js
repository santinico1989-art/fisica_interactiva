// Helper to enable Fullscreen Mode in simulators
(function() {
    window.addEventListener('DOMContentLoaded', () => {
        // Detect if fullscreen is supported
        const docEl = document.documentElement;
        const requestFS = docEl.requestFullscreen || 
                          docEl.webkitRequestFullscreen || 
                          docEl.mozRequestFullScreen || 
                          docEl.msRequestFullscreen;

        // If not supported at all (like iOS iPhone Safari outside of standalone mode), we still keep the helper active or silent.
        // We can show a toggle button but warn the user on click if it fails.
        
        // Create the button element
        const fsButton = document.createElement('button');
        fsButton.id = 'dynamic-fullscreen-btn';
        
        // Standard icon for entering fullscreen (using SVG)
        const enterFSIcon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4h4M4 16v4h4M20 8V4h-4M20 16v4h-4" /></svg>`;
        const exitFSIcon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h4v4M4 20h4v-4M20 4h-4v4M20 20h-4v-4" /></svg>`;
        
        fsButton.innerHTML = enterFSIcon;
        
        // Class styling depending on the simulator layout
        const path = window.location.pathname.toLowerCase();
        
        if (path.includes('baloncesto') || path.includes('proyectiles')) {
            // These have a HUD toggle button at top-4 right-4.
            // We'll place our button to the left of it (right-36)
            fsButton.className = 'fixed top-4 right-32 sm:right-36 z-50 bg-slate-950/90 hover:bg-slate-900 border border-cyan-500/50 rounded-lg p-2 sm:px-3 sm:py-2 text-cyan-400 hover:text-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-950/30 flex items-center gap-2 pointer-events-auto';
            fsButton.innerHTML = enterFSIcon + `<span class="text-xs font-semibold uppercase tracking-wider tech-font hidden sm:inline">Pantalla Completa</span>`;
        } else if (path.includes('circuitos') || path.includes('doodleflow')) {
            // Place it at top-4 right-4 or similar clear position
            fsButton.className = 'fixed top-4 right-16 z-50 bg-slate-950/90 hover:bg-slate-900 border border-cyan-500/50 rounded-lg p-2 text-cyan-400 hover:text-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-950/30 flex items-center justify-center pointer-events-auto';
        } else {
            // Other simulators (Newton, Estatica, Trabajo y energia, Carrera de autos)
            // They have a floating zoom/help controls or portrait settings.
            // We place it as a floating button next to top-right controls
            fsButton.className = 'fixed top-4 right-16 z-30 glass-panel w-10 h-10 rounded-xl flex items-center justify-center text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all shadow-lg pointer-events-auto';
        }

        // Apply styles if we need to enforce layout compatibility
        fsButton.style.zIndex = '999';

        document.body.appendChild(fsButton);

        function toggleFullscreen() {
            if (!requestFS) {
                alert("La pantalla completa no está soportada por el navegador de este dispositivo (por ejemplo, Safari en iPhone). Para usarlo en pantalla completa, añade este portal a tu pantalla de inicio desde Compartir -> 'Añadir a pantalla de inicio'.");
                return;
            }

            const isFS = document.fullscreenElement || 
                         document.webkitFullscreenElement || 
                         document.mozFullScreenElement || 
                         document.msFullscreenElement;

            if (!isFS) {
                const req = docEl.requestFullscreen || 
                            docEl.webkitRequestFullscreen || 
                            docEl.mozRequestFullScreen || 
                            docEl.msRequestFullscreen;
                if (req) {
                    req.call(docEl).catch(err => {
                        console.error("Error entering fullscreen:", err);
                    });
                }
            } else {
                const exit = document.exitFullscreen || 
                             document.webkitExitFullscreen || 
                             document.mozCancelFullScreen || 
                             document.msExitFullscreen;
                if (exit) {
                    exit.call(document).catch(err => {
                        console.error("Error exiting fullscreen:", err);
                    });
                }
            }
        }

        fsButton.addEventListener('click', toggleFullscreen);

        // Update button UI on change
        function onFSChange() {
            const isFS = document.fullscreenElement || 
                         document.webkitFullscreenElement || 
                         document.mozFullScreenElement || 
                         document.msFullscreenElement;

            const span = fsButton.querySelector('span');
            if (isFS) {
                fsButton.innerHTML = exitFSIcon + (span ? `<span class="text-xs font-semibold uppercase tracking-wider tech-font hidden sm:inline">Salir Pantalla</span>` : '');
            } else {
                fsButton.innerHTML = enterFSIcon + (span ? `<span class="text-xs font-semibold uppercase tracking-wider tech-font hidden sm:inline">Pantalla Completa</span>` : '');
            }
        }

        document.addEventListener('fullscreenchange', onFSChange);
        document.addEventListener('webkitfullscreenchange', onFSChange);
        document.addEventListener('mozfullscreenchange', onFSChange);
        document.addEventListener('MSFullscreenChange', onFSChange);
    });
})();
