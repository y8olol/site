// Enhanced Profile Loader with Dynamic Color Theming and Advanced CORS Bypass
class ProfileLoader {
    constructor() {
        this.github_username = 'y8olol';
        this.discord_user_id = '218439641064275968'; // Your Discord ID
        this.colorExtractor = new ColorExtractor();
        this.init();
    }

    async init() {
        await this.loadGitHubProfile();
        await this.loadGitHubRepos();
        this.setupDiscordStatus();
        this.addInteractivity();
    }

    async loadGitHubProfile() {
        try {
            console.log('🎨 Loading GitHub profile with dynamic theming...');
            const response = await fetch(`https://api.github.com/users/${this.github_username}`);
            
            if (response.ok) {
                const profile = await response.json();
                
                // Update profile image
                const profileImg = document.getElementById('profile-image');
                if (profileImg && profile.avatar_url) {
                    profileImg.src = profile.avatar_url;
                    profileImg.alt = this.github_username;
                    
                    // Try multiple CORS bypass methods
                    this.attemptColorExtraction(profile.avatar_url);
                }

                // Update bio if available
                if (profile.bio) {
                const tagline = document.querySelector('.tagline');
                if (tagline) {
                // Just use the bio as-is, no more highlights
                tagline.textContent = profile.bio;
                }
                }

                console.log('✅ GitHub profile loaded with dynamic theming');
            } else {
                console.warn('Failed to load GitHub profile');
                this.setFallbackImage();
                this.applySmartFallbackTheme('fallback');
            }
        } catch (error) {
            console.error('Error loading GitHub profile:', error);
            this.setFallbackImage();
            this.applySmartFallbackTheme('fallback');
        }
    }

    async attemptColorExtraction(avatarUrl) {
        console.log('🚀 Attempting advanced color extraction with CORS bypass...');
        
        // Method 1: Try different CORS proxies in sequence
        const corsProxies = [
            'https://api.allorigins.win/raw?url=',
            'https://cors-anywhere.herokuapp.com/',
            'https://thingproxy.freeboard.io/fetch/',
        ];
        
        for (const proxy of corsProxies) {
            try {
                console.log(`🔧 Trying proxy: ${proxy}`);
                const success = await this.tryColorExtractionWithProxy(proxy + encodeURIComponent(avatarUrl));
                if (success) return; // Success, exit
            } catch (error) {
                console.log(`⚠️ Proxy ${proxy} failed:`, error.message);
                continue;
            }
        }
        
        // Method 2: Canvas proxy technique with timeout
        try {
            console.log('🖼️ Trying canvas proxy technique...');
            const success = await this.tryCanvasProxyMethod(avatarUrl);
            if (success) return;
        } catch (error) {
            console.log('⚠️ Canvas proxy failed:', error.message);
        }
        
        // Method 3: Fetch as blob and create object URL
        try {
            console.log('💾 Trying blob conversion method...');
            const success = await this.tryBlobMethod(avatarUrl);
            if (success) return;
        } catch (error) {
            console.log('⚠️ Blob method failed:', error.message);
        }
        
        // Method 4: Intelligent URL-based color prediction
        console.log('🎨 All extraction methods failed, using advanced URL-based color intelligence...');
        this.useAdvancedUrlColorAnalysis(avatarUrl);
    }

    async tryColorExtractionWithProxy(proxyUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            const timeout = setTimeout(() => {
                reject(new Error('Proxy timeout'));
            }, 5000); // 5 second timeout
            
            img.onload = () => {
                clearTimeout(timeout);
                try {
                    this.colorExtractor.extractColorsFromImage(img, (colors) => {
                        if (colors.length > 0) {
                            console.log('🎉 Successfully extracted colors via proxy!');
                            this.applyDynamicTheme(colors);
                            resolve(true);
                        } else {
                            reject(new Error('No colors extracted'));
                        }
                    });
                } catch (err) {
                    reject(err);
                }
            };
            
            img.onerror = () => {
                clearTimeout(timeout);
                reject(new Error('Image load failed'));
            };
            
            img.src = proxyUrl;
        });
    }

    async tryCanvasProxyMethod(avatarUrl) {
        return new Promise((resolve, reject) => {
            // Create iframe to bypass some CORS restrictions
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = 'about:blank';
            document.body.appendChild(iframe);
            
            setTimeout(() => {
                try {
                    const iframeDoc = iframe.contentDocument;
                    const img = iframeDoc.createElement('img');
                    
                    img.crossOrigin = 'anonymous';
                    img.onload = () => {
                        try {
                            this.colorExtractor.extractColorsFromImage(img, (colors) => {
                                document.body.removeChild(iframe);
                                if (colors.length > 0) {
                                    console.log('🎉 Successfully extracted colors via canvas proxy!');
                                    this.applyDynamicTheme(colors);
                                    resolve(true);
                                } else {
                                    reject(new Error('No colors extracted'));
                                }
                            });
                        } catch (err) {
                            document.body.removeChild(iframe);
                            reject(err);
                        }
                    };
                    
                    img.onerror = () => {
                        document.body.removeChild(iframe);
                        reject(new Error('Canvas proxy image load failed'));
                    };
                    
                    img.src = avatarUrl;
                } catch (err) {
                    document.body.removeChild(iframe);
                    reject(err);
                }
            }, 100);
        });
    }

    async tryBlobMethod(avatarUrl) {
        try {
            const response = await fetch(avatarUrl, { mode: 'no-cors' });
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            
            return new Promise((resolve, reject) => {
                const img = new Image();
                
                img.onload = () => {
                    try {
                        this.colorExtractor.extractColorsFromImage(img, (colors) => {
                            URL.revokeObjectURL(objectUrl);
                            if (colors.length > 0) {
                                console.log('🎉 Successfully extracted colors via blob method!');
                                this.applyDynamicTheme(colors);
                                resolve(true);
                            } else {
                                reject(new Error('No colors extracted'));
                            }
                        });
                    } catch (err) {
                        URL.revokeObjectURL(objectUrl);
                        reject(err);
                    }
                };
                
                img.onerror = () => {
                    URL.revokeObjectURL(objectUrl);
                    reject(new Error('Blob image load failed'));
                };
                
                img.src = objectUrl;
            });
        } catch (error) {
            throw new Error('Blob conversion failed: ' + error.message);
        }
    }

    useAdvancedUrlColorAnalysis(avatarUrl) {
        console.log('🧠 Using advanced AI-like URL color analysis...');
        
        // Extract user ID from GitHub avatar URL
        const userIdMatch = avatarUrl.match(/u\/(\d+)/);
        const userId = userIdMatch ? parseInt(userIdMatch[1]) : this.hashCode(avatarUrl);
        
        // Advanced color themes based on mathematical patterns
        const advancedThemes = [
            // Cyberpunk themes
            [{ r: 0, g: 255, b: 255 }, { r: 255, g: 0, b: 150 }], // Cyan-Magenta
            [{ r: 57, g: 255, b: 20 }, { r: 255, g: 206, b: 84 }], // Matrix Green-Gold
            [{ r: 138, g: 43, b: 226 }, { r: 30, g: 144, b: 255 }], // Purple-DeepBlue
            
            // Synthwave themes  
            [{ r: 255, g: 20, b: 147 }, { r: 0, g: 191, b: 255 }], // DeepPink-DeepSky
            [{ r: 255, g: 69, b: 0 }, { r: 255, g: 215, b: 0 }], // Red-Gold
            [{ r: 75, g: 0, b: 130 }, { r: 255, g: 20, b: 147 }], // Indigo-DeepPink
            
            // Neon themes
            [{ r: 57, g: 255, b: 20 }, { r: 255, g: 255, b: 255 }], // Lime-White
            [{ r: 255, g: 105, b: 180 }, { r: 64, g: 224, b: 208 }], // HotPink-Turquoise
            [{ r: 255, g: 127, b: 80 }, { r: 255, g: 99, b: 71 }], // Coral-Tomato
            
            // Holographic themes
            [{ r: 186, g: 85, b: 211 }, { r: 72, g: 209, b: 204 }], // MediumOrchid-MediumTurquoise
            [{ r: 255, g: 182, b: 193 }, { r: 173, g: 216, b: 230 }], // LightPink-LightBlue
            [{ r: 250, g: 128, b: 114 }, { r: 135, g: 206, b: 250 }], // Salmon-SkyBlue
        ];
        
        // Use mathematical selection for consistency
        const selectedTheme = advancedThemes[Math.abs(userId) % advancedThemes.length];
        
        console.log(`🎨 Selected advanced theme ${Math.abs(userId) % advancedThemes.length} based on user pattern`);
        this.applyDynamicTheme(selectedTheme);
    }

    setFallbackImage() {
        const profileImg = document.getElementById('profile-image');
        if (profileImg) {
            const fallbackUrl = `https://ui-avatars.com/api/?name=${this.github_username}&size=200&background=1a1a2e&color=00d4ff&bold=true&font-size=0.6`;
            profileImg.src = fallbackUrl;
            
            // Apply a cool default theme immediately
            this.applyDynamicTheme([
                { r: 0, g: 212, b: 255 },   // Cyan
                { r: 124, g: 58, b: 237 },  // Purple
                { r: 26, g: 26, b: 46 }     // Dark blue
            ]);
        }
    }

    applyDynamicTheme(colors) {
        if (!colors || colors.length === 0) {
            console.log('⚠️ No colors provided for theming');
            return;
        }
        
        console.log('🌈 Applying dynamic theme based on extracted colors:', colors);
        
        const root = document.documentElement;
        const dominantColor = colors[0];
        const accentColor = colors[1] || colors[0];
        const tertiaryColor = colors[2] || accentColor;
        
        // Generate enhanced color palette
        const primary = `${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b}`;
        const secondary = `${accentColor.r}, ${accentColor.g}, ${accentColor.b}`;
        const tertiary = `${tertiaryColor.r}, ${tertiaryColor.g}, ${tertiaryColor.b}`;
        
        // Apply dynamic theme with enhanced colors
        root.style.setProperty('--accent-primary', `rgb(${primary})`);
        root.style.setProperty('--accent-secondary', `rgb(${secondary})`);
        root.style.setProperty('--accent-tertiary', `rgb(${tertiary})`);
        root.style.setProperty('--gradient-primary', 
            `linear-gradient(135deg, rgb(${primary}), rgb(${secondary}), rgb(${tertiary}))`);
        root.style.setProperty('--shadow-glow', `0 0 20px rgba(${primary}, 0.3)`);
        
        // Update grid colors with the new primary color
        const bgGrid = document.querySelector('.bg-grid');
        if (bgGrid) {
            bgGrid.style.backgroundImage = `
                linear-gradient(rgba(${primary}, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(${primary}, 0.08) 1px, transparent 1px)
            `;
        }
        
        // Update lava lamp colors
        const lavaLamp = document.querySelector('.lava-lamp-bg');
        if (lavaLamp) {
            lavaLamp.style.background = `
                radial-gradient(circle at 20% 80%, rgb(${primary}) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgb(${secondary}) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgb(${tertiary}) 0%, transparent 50%)
            `;
        }
        
        // Update individual blobs
        const blobs = document.querySelectorAll('.lava-blob');
        if (blobs.length > 0) {
            blobs.forEach((blob, index) => {
                // Cycle through the 3 colors for all blobs
                if (index % 3 === 0) {
                    blob.style.background = `rgb(${primary})`;
                } else if (index % 3 === 1) {
                    blob.style.background = `rgb(${secondary})`;
                } else {
                    blob.style.background = `rgb(${tertiary})`;
                }
            });
        }
        
        // Update mouse blob
        const mouseBlob = document.getElementById('mouse-blob');
        if (mouseBlob) {
            mouseBlob.style.background = `rgb(${primary})`;
        }
        
        // Remove any loading state classes
        document.body.classList.remove('theme-loading');
        
        // Add theme class to body for additional styling
        document.body.classList.add(this.getThemeClass(dominantColor));
        
        console.log('✨ Enhanced dynamic theme applied successfully with', colors.length, 'colors');
    }

    applySmartFallbackTheme(avatarUrl) {
        // Smart color detection based on avatar URL patterns and hash
        const urlHash = this.hashCode(avatarUrl);
        const themes = [
            [{ r: 0, g: 212, b: 255 }, { r: 124, g: 58, b: 237 }], // Cyan-Purple
            [{ r: 255, g: 107, b: 53 }, { r: 245, g: 158, b: 11 }], // Orange-Yellow
            [{ r: 16, g: 185, b: 129 }, { r: 5, g: 150, b: 105 }], // Green-Teal
            [{ r: 59, g: 130, b: 246 }, { r: 139, g: 92, b: 246 }], // Blue-Purple
            [{ r: 239, g: 68, b: 68 }, { r: 220, g: 38, b: 38 }], // Red-DarkRed
            [{ r: 168, g: 85, b: 247 }, { r: 124, g: 58, b: 237 }] // Purple-Violet
        ];
        
        const selectedTheme = themes[Math.abs(urlHash) % themes.length];
        console.log('🎨 Applied smart fallback theme based on avatar URL');
        this.applyDynamicTheme(selectedTheme);
    }
    
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash;
    }

    getThemeClass(color) {
        const { r, g, b } = color;
        const warmth = (r + g * 0.5) / (b + 1);
        
        if (warmth > 1.5) return 'theme-warm';
        if (g > r && g > b) return 'theme-nature';
        if (r > g && r > 100) return 'theme-sunset';
        return 'theme-cool';
    }

    async loadGitHubRepos() {
        try {
            console.log('📂 Loading GitHub repositories...');
            const response = await fetch(`https://api.github.com/users/${this.github_username}/repos?sort=updated&per_page=12`);
            
            if (response.ok) {
                const repos = await response.json();
                const featuredRepos = repos.filter(repo => 
                    !repo.fork && 
                    repo.name !== this.github_username &&
                    repo.description &&
                    !repo.name.includes('.')
                ).slice(0, 6);

                this.renderProjects(featuredRepos);
                console.log('✅ GitHub repositories loaded');
            } else {
                console.warn('Failed to load GitHub repositories');
                this.renderFallbackProjects();
            }
        } catch (error) {
            console.error('Error loading GitHub repos:', error);
            this.renderFallbackProjects();
        }
    }

    renderProjects(repos) {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = repos.map((repo, index) => `
            <div class="project-card" style="animation-delay: ${index * 0.1}s">
                <div class="project-header">
                    <div>
                        <h3 class="project-title">${this.formatRepoName(repo.name)}</h3>
                        ${repo.language ? `<span class="project-language">${repo.language}</span>` : ''}
                    </div>
                </div>
                <p class="project-description">
                    ${this.enhanceDescription(repo.description)}
                </p>
                <a href="${repo.html_url}" target="_blank" class="project-link">
                    <span>View Project</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                </a>
            </div>
        `).join('');

        this.animateProjectCards();
    }

    renderFallbackProjects() {
        const fallbackProjects = [
            {
                name: 'onion_chat',
                language: 'JavaScript',
                description: 'Anonymous chat system with Tor support, file sharing, and auto-cleanup features.',
                url: 'https://github.com/y8olol/onion_chat'
            },
            {
                name: 'rotrade_beta',
                language: 'JavaScript', 
                description: 'Advanced trading system with automation and market analysis capabilities.',
                url: 'https://github.com/y8olol/rotrade_beta'
            },
            {
                name: 'RapidSails',
                language: 'C#',
                description: 'Advanced manager for game modding with modern UI and packaging tools.',
                url: 'https://github.com/y8olol/RapidSails'
            },
            {
                name: 'marvel_rivals_instalocker',
                language: 'Python',
                description: 'Computer vision-powered automation tool for competitive gaming.',
                url: 'https://github.com/y8olol/marvel_rivals_instalocker'
            }
        ];

        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = fallbackProjects.map((project, index) => `
            <div class="project-card" style="animation-delay: ${index * 0.1}s">
                <div class="project-header">
                    <div>
                        <h3 class="project-title">${this.formatRepoName(project.name)}</h3>
                        <span class="project-language">${project.language}</span>
                    </div>
                </div>
                <p class="project-description">${project.description}</p>
                <a href="${project.url}" target="_blank" class="project-link">
                    <span>View Project</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                </a>
            </div>
        `).join('');

        this.animateProjectCards();
    }

    enhanceDescription(description) {
        if (!description) return 'A project focused on automation and practical solutions.';
        
        // Just return the description as-is, no more highlights
        return description;
    }

    formatRepoName(name) {
        // Handle specific known projects first
        const specialNames = {
            'rotrade_beta': 'RoTrade Beta',
            'onion_chat': 'Onion Chat',
            'marvel_rivals_instalocker': 'Marvel Rivals Instalocker',
            'rapidsails': 'RapidSails',
            'roblox_value_predictor': 'Roblox Value Predictor'
        };
        
        // Check if it's a special case first
        const lowerName = name.toLowerCase();
        if (specialNames[lowerName]) {
            return specialNames[lowerName];
        }
        
        // Default formatting for other projects
        return name
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/\bApi\b/g, 'API')
            .replace(/\bUi\b/g, 'UI')
            .replace(/\bAi\b/g, 'AI')
            .replace(/\bBot\b/g, 'Bot');
    }

    animateProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupDiscordStatus() {
        const statusIndicator = document.getElementById('discord-status');
        const discordLink = document.getElementById('discord-link');
        
        // Show default status
        statusIndicator.querySelector('.status-text').textContent = 'Available';
        statusIndicator.classList.add('online');
        discordLink.href = '#';
        discordLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showDiscordMessage();
        });
    }

    showDiscordMessage() {
        this.showNotification('User: y8o');
    }

    addInteractivity() {
        // Enhanced tech stack interactions with 3D effects
        document.querySelectorAll('.tech-item').forEach(item => {
            this.add3DEffect(item, 1.0);
            item.addEventListener('click', () => {
                const tech = item.dataset.tech;
                this.showTechInfo(tech);
                this.addTechGlow(item);
            });
        });

        // Add 3D effects to ALL cards and interactive elements
        document.querySelectorAll('.project-card').forEach(card => {
            this.add3DEffect(card, 1.2); // Slightly more intense for projects
        });

        // Add 3D effect to profile card
        const profileCard = document.querySelector('.profile-card');
        if (profileCard) {
            this.add3DEffect(profileCard, 0.4); // Subtle but noticeable
        }

        // Add 3D effects to social links
        document.querySelectorAll('.social-link').forEach(link => {
            this.add3DEffect(link, 0.8);
        });

        // Add 3D effects to CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            this.add3DEffect(ctaButton, 0.6);
        }

        // Add 3D effects to status indicator - REMOVED (causes unwanted glow)
        // const statusIndicator = document.querySelector('.status-indicator');
        // if (statusIndicator) {
        //     this.add3DEffect(statusIndicator, 0.5);
        // }

        // NEW: Add 3D effects to MORE elements (but exclude text-only elements)
        // Section titles - REMOVED (text only)
        // document.querySelectorAll('.section-title').forEach(title => {
        //     this.add3DEffect(title, 0.3);
        // });

        // Profile image
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            this.add3DEffect(profileImage, 0.7);
        }

        // Tech icons inside cards - Re-enabled for 3D effects
        document.querySelectorAll('.tech-icon').forEach(icon => {
            this.add3DEffect(icon, 0.7);
        });

        // Project links - Re-enabled for 3D effects
        document.querySelectorAll('.project-link').forEach(link => {
            this.add3DEffect(link, 0.4);
        });

        // Language tags - REMOVED (causes unwanted glow effects on project cards)
        // document.querySelectorAll('.project-language').forEach(lang => {
        //     this.add3DEffect(lang, 0.5);
        //     // Apply language-specific styling
        //     this.applyLanguageSpecificStyling(lang);
        // });
        
        // Apply language-specific styling without 3D effects
        document.querySelectorAll('.project-language').forEach(lang => {
            this.applyLanguageSpecificStyling(lang);
        });

        // Main name/title - REMOVED (text only)
        // const nameMain = document.querySelector('.name-main');
        // if (nameMain) {
        //     this.add3DEffect(nameMain, 0.2);
        // }

        // Tagline - REMOVED (text only)
        // const tagline = document.querySelector('.tagline');
        // if (tagline) {
        //     this.add3DEffect(tagline, 0.2);
        // }

        // Contact text - REMOVED (text only)
        // const contactText = document.querySelector('.contact-text');
        // if (contactText) {
        //     this.add3DEffect(contactText, 0.2);
        // }

        // Parallax effect for background
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.notification').forEach(el => el.remove());
            }
        });

        // Enhanced cursor effect
        this.setupCursorEffect();
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const bgGrid = document.querySelector('.bg-grid');
        if (bgGrid) {
            bgGrid.style.transform = `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)`;
        }

        // Add scroll-based animations
        const cards = document.querySelectorAll('.project-card, .tech-item');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (inView && !card.classList.contains('in-view')) {
                card.classList.add('in-view');
                card.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
        });
    }

    add3DEffect(element, intensity = 1) {
        // Prevent multiple event listeners
        if (element.has3DEffect) return;
        element.has3DEffect = true;
        
        let isHovering = false;
        let animationFrame = null;
        
        // Check if element has pseudo-elements that might conflict
        const hasPseudoElements = element.classList.contains('social-link') || 
                                element.classList.contains('cta-button') ||
                                element.classList.contains('tech-item') ||
                                element.classList.contains('project-card');
        
        // CRITICAL FIX: Disable problematic pseudo-elements for 3D elements
        if (hasPseudoElements) {
            element.classList.add('disable-pseudo-3d');
        }
        
        // Ensure element has proper CSS setup
        element.style.transformStyle = 'preserve-3d';
        element.style.willChange = 'transform';
        element.style.backfaceVisibility = 'hidden';
        
        const updateTransform = (e) => {
            if (!isHovering || !e) return;
            
            const rect = element.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Use full intensity now that pseudo-elements are disabled
            const maxRotation = 18;
            const maxTranslation = 6;
            
            const rotateX = Math.max(-maxRotation, Math.min(maxRotation, 
                (mouseY - centerY) / rect.height * -12 * intensity));
            const rotateY = Math.max(-maxRotation, Math.min(maxRotation, 
                (mouseX - centerX) / rect.width * 12 * intensity));
            
            const translateX = Math.max(-maxTranslation, Math.min(maxTranslation,
                (mouseX - centerX) / rect.width * 5 * intensity));
            const translateY = Math.max(-maxTranslation, Math.min(maxTranslation,
                (mouseY - centerY) / rect.height * 5 * intensity));
            
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            
            animationFrame = requestAnimationFrame(() => {
                // Now we can use full 3D transforms for all elements
                element.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX.toFixed(2)}deg) 
                    rotateY(${rotateY.toFixed(2)}deg) 
                    translateX(${translateX.toFixed(2)}px) 
                    translateY(${translateY.toFixed(2)}px) 
                    translateZ(${(8 * intensity).toFixed(2)}px)
                    scale(${(1 + intensity * 0.02).toFixed(3)})
                `;
                
                const shadowX = Math.max(-12, Math.min(12, rotateY * -0.8));
                const shadowY = Math.max(3, Math.min(18, rotateX * 0.8 + 10));
                const shadowBlur = 12 + Math.abs(rotateX) * 0.3 + Math.abs(rotateY) * 0.3;
                
                element.style.boxShadow = `
                    ${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px ${shadowBlur.toFixed(1)}px rgba(0, 0, 0, 0.2)
                `;
                
                // Smart glow assignment based on element type
                if (element.classList.contains('tech-item')) {
                    // Tech cards get language-specific glow
                    const langGlow = this.getLanguageGlow(element);
                    element.style.boxShadow += `, 0 0 15px ${langGlow}`;
                } else if (element.classList.contains('tech-icon')) {
                    // Tech icons get their parent's language glow
                    const parentCard = element.closest('.tech-item');
                    if (parentCard) {
                        const langGlow = this.getLanguageGlow(parentCard);
                        element.style.boxShadow += `, 0 0 15px ${langGlow}`;
                    } else {
                        element.style.boxShadow += `, 0 0 15px rgba(255, 255, 255, 0.1)`;
                    }
                } else if (element.classList.contains('social-link')) {
                    // Social links get a consistent cyan glow (not profile colors)
                    element.style.boxShadow += `, 0 0 15px rgba(0, 212, 255, 0.3)`;
                } else if (element.classList.contains('project-language') || 
                          element.classList.contains('status-indicator') ||
                          element.classList.contains('profile-image')) {
                    // NO GLOW for project language tags, status indicators, and profile image
                    // Just keep the basic shadow
                } else {
                    // Everything else gets a subtle neutral glow
                    element.style.boxShadow += `, 0 0 15px rgba(255, 255, 255, 0.1)`;
                }
            });
        };
        
        element.addEventListener('mouseenter', (e) => {
            isHovering = true;
            element.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
        });
        
        element.addEventListener('mousemove', updateTransform);
        
        element.addEventListener('mouseleave', () => {
            isHovering = false;
            
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }
            
            element.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-out';
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) translateZ(0px) scale(1)';
            element.style.boxShadow = '';
        });
    }

    applyLanguageSpecificStyling(langElement) {
        const langText = langElement.textContent.toLowerCase();
        
        // Map languages to their colors and apply styling
        const languageColors = {
            'javascript': { color: '#f7df1e', border: '#f7df1e' },
            'python': { color: '#3776ab', border: '#3776ab' },
            'c#': { color: '#512bd4', border: '#512bd4' },
            'typescript': { color: '#3178c6', border: '#3178c6' },
            'node.js': { color: '#339933', border: '#339933' },
            'react': { color: '#61dafb', border: '#61dafb' },
            'vue': { color: '#4fc08d', border: '#4fc08d' },
            'html': { color: '#e34f26', border: '#e34f26' },
            'css': { color: '#1572b6', border: '#1572b6' },
            'java': { color: '#ed8b00', border: '#ed8b00' },
            'php': { color: '#777bb4', border: '#777bb4' },
            'ruby': { color: '#cc342d', border: '#cc342d' },
            'go': { color: '#00add8', border: '#00add8' },
            'rust': { color: '#ce422b', border: '#ce422b' },
            'swift': { color: '#fa7343', border: '#fa7343' },
            'kotlin': { color: '#7f52ff', border: '#7f52ff' }
        };
        
        for (const [lang, colors] of Object.entries(languageColors)) {
            if (langText.includes(lang)) {
                langElement.style.color = colors.color;
                langElement.style.borderColor = colors.border;
                langElement.style.setProperty('--lang-color', colors.color);
                break;
            }
        }
    }

    getLanguageGlow(element) {
        // Get language-specific glow color
        if (element.classList.contains('javascript')) {
            return 'rgba(247, 223, 30, 0.3)';
        } else if (element.classList.contains('python')) {
            return 'rgba(55, 118, 171, 0.3)';
        } else if (element.classList.contains('csharp')) {
            return 'rgba(81, 43, 212, 0.3)';
        } else if (element.classList.contains('nodejs')) {
            return 'rgba(51, 153, 51, 0.3)';
        } else if (element.classList.contains('ai')) {
            return 'rgba(255, 107, 53, 0.3)';
        } else if (element.classList.contains('automation')) {
            return 'rgba(138, 43, 226, 0.3)';
        }
        // Fallback to profile color
        return 'var(--accent-primary, rgba(0, 212, 255, 0.1))';
    }

    addTechGlow(item) {
        // Add a temporary glow effect
        const originalBoxShadow = item.style.boxShadow;
        item.style.boxShadow = '0 0 30px var(--lang-color, var(--accent-primary))';
        setTimeout(() => {
            item.style.boxShadow = originalBoxShadow;
        }, 1000);
    }

    setupCursorEffect() {
        if ('ontouchstart' in window) return; // Skip on touch devices
        
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--accent-primary) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            opacity: 0.3;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: opacity 0.2s ease, transform 0.1s ease;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(cursor);
        
        // Mouse blob that follows cursor
        const mouseBlob = document.getElementById('mouse-blob');
        
        let cursorX = 0, cursorY = 0;
        let blobX = 0, blobY = 0;
        
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            // Smooth blob following with lag
            blobX += (cursorX - blobX) * 0.05;
            blobY += (cursorY - blobY) * 0.05;
            
            if (mouseBlob) {
                mouseBlob.style.left = (blobX - 100) + 'px';
                mouseBlob.style.top = (blobY - 100) + 'px';
            }
        });

        // Enhanced cursor interactions - but avoid conflicts with 3D effects
        const interactiveElements = document.querySelectorAll(
            'a:not(.project-link):not(.social-link), button:not(.cta-button)'
        );
        
        interactiveElements.forEach(el => {
            // Only apply cursor effects to elements without 3D effects
            if (!el.has3DEffect) {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
                    cursor.style.opacity = '0.5';
                    if (mouseBlob) {
                        mouseBlob.style.transform = 'scale(1.2)';
                        mouseBlob.style.opacity = '0.25';
                    }
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.opacity = '0.3';
                    if (mouseBlob) {
                        mouseBlob.style.transform = 'scale(1)';
                        mouseBlob.style.opacity = '0.15';
                    }
                });
            }
        });
        
        // Add particle effects on click
        document.addEventListener('click', (e) => {
            this.createClickParticles(e.clientX, e.clientY);
        });
    }

    createClickParticles(x, y) {
        const colors = [
            'var(--accent-primary, #00d4ff)',
            'var(--accent-secondary, #7c3aed)', 
            'var(--accent-tertiary, #f59e0b)'
        ];
        
        // Create 6 particles
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: ${colors[i % colors.length]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = (Math.PI * 2 * i) / 6;
            const distance = 50 + Math.random() * 30;
            const duration = 600 + Math.random() * 400;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).addEventListener('finish', () => {
                document.body.removeChild(particle);
            });
        }
    }

    showTechInfo(tech) {
        const techInfo = {
            'JavaScript': 'Full-stack development with modern ES6+ features, Node.js, and real-time applications. Building interactive web experiences.',
            'Python': 'Computer vision, automation scripts, data processing, and machine learning applications. Perfect for rapid prototyping.',
            'C#': 'Desktop applications, game modding tools, and Windows-specific utilities with modern UI frameworks.',
            'Node.js': 'Backend APIs, real-time chat systems, and server-side automation. Scalable JavaScript runtime.',
            'Computer Vision': 'Image processing, object detection, and automated visual recognition systems using OpenCV and AI.',
            'Automation': 'Building tools that handle repetitive tasks and streamline workflows. Making life easier through code.'
        };

        const info = techInfo[tech] || `Specialized in ${tech} development and implementation.`;
        this.showNotification(`💡 ${tech}: ${info}`);
    }

    showNotification(message) {
        document.querySelectorAll('.notification').forEach(el => el.remove());

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1rem 1.5rem;
            color: var(--text-primary);
            max-width: 400px;
            z-index: 1000;
            box-shadow: var(--shadow-strong);
            transform: translateX(400px);
            transition: all 0.3s ease;
            font-size: 0.9rem;
            line-height: 1.4;
            backdrop-filter: blur(10px);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Enhanced Color extraction utility with advanced methods
class ColorExtractor {
    extractColorsFromImage(img, callback) {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const colors = this.analyzeColors(imageData.data);
            
            callback(colors);
        } catch (error) {
            console.warn('Could not extract colors from image:', error);
            callback([]);
        }
    }

    analyzeColors(data) {
        const colorMap = new Map();
        const step = 4; // RGBA
        
        // Sample every 6th pixel for better coverage and performance
        for (let i = 0; i < data.length; i += step * 6) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            if (a < 128) continue; // Skip transparent pixels
            
            // Skip very dark colors (grays, blacks)
            const brightness = (r + g + b) / 3;
            if (brightness < 40) continue;
            
            // Skip very desaturated colors (pure grays)
            const maxChannel = Math.max(r, g, b);
            const minChannel = Math.min(r, g, b);
            const saturation = maxChannel > 0 ? (maxChannel - minChannel) / maxChannel : 0;
            if (saturation < 0.25 && brightness < 140) continue; // Skip gray colors
            
            // Group similar colors with tighter grouping for more variety
            const colorKey = `${Math.floor(r/12)*12},${Math.floor(g/12)*12},${Math.floor(b/12)*12}`;
            colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
        }
        
        // Sort by frequency and filter
        const sortedColors = Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([color]) => {
                const [r, g, b] = color.split(',').map(Number);
                return { r, g, b };
            })
            .filter(color => {
                const brightness = (color.r + color.g + color.b) / 3;
                const maxChannel = Math.max(color.r, color.g, color.b);
                const minChannel = Math.min(color.r, color.g, color.b);
                const saturation = maxChannel > 0 ? (maxChannel - minChannel) / maxChannel : 0;
                
                // Accept more variety of colors
                return brightness > 35 && brightness < 230 && (saturation > 0.3 || brightness > 100);
            });
        
        console.log('🎨 Extracted colors before enhancement:', sortedColors.slice(0, 8));
        
        // If we don't have good colors, enhance what we have
        if (sortedColors.length === 0) {
            console.log('⚠️ No good colors found, using enhanced fallback');
            return [];
        }
        
        // Enhanced multi-color extraction - get up to 5 colors
        const enhancedColors = sortedColors.slice(0, 5).map((color, index) => {
            const { r, g, b } = color;
            
            // Different enhancement strategies for different colors
            let factor;
            const brightness = (r + g + b) / 3;
            
            if (brightness < 80) {
                factor = 2.2; // Boost very dim colors significantly
            } else if (brightness < 120) {
                factor = 1.8; // Boost dim colors
            } else if (brightness > 180) {
                factor = 0.9; // Slightly dim very bright colors
            } else {
                factor = 1.3; // Standard boost
            }
            
            // For secondary colors, add some variation
            if (index > 0) {
                const variation = 0.1 * (index * 0.5); // Add slight variation to prevent monotony
                factor += variation;
            }
            
            return {
                r: Math.min(255, Math.max(30, Math.floor(r * factor))),
                g: Math.min(255, Math.max(30, Math.floor(g * factor))),
                b: Math.min(255, Math.max(30, Math.floor(b * factor)))
            };
        });
        
        console.log('✨ Enhanced multi-color palette:', enhancedColors);
        return enhancedColors;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfileLoader();
    
    // Add scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Observe all animatable elements
    document.querySelectorAll('.tech-item, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add slide-in animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);