// Enhanced Profile Loader with Mobile Optimizations
class ProfileLoader {
    constructor() {
        this.github_username = 'y8olol';
        this.discord_user_id = '218439641064275968';
        this.colorExtractor = new ColorExtractor();
        this.isMobile = this.detectMobile();
        this.isLowEndDevice = this.detectLowEndDevice();
        this.init();
    }

    detectMobile() {
        // FORCE DISABLE: Always return false to enable 3D effects
        // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent) || 
        //        'ontouchstart' in window || 
        //        window.innerWidth <= 768;
        return false; // Force desktop mode
    }

    detectLowEndDevice() {
        // FORCE DISABLE: Always return false to enable 3D effects
        // const hardwareConcurrency = navigator.hardwareConcurrency || 2;
        // const deviceMemory = navigator.deviceMemory || 2;
        // const isLowEnd = hardwareConcurrency <= 2 || deviceMemory <= 2;
        
        console.log(`🚀 Device detection DISABLED - forcing high-performance mode`);
        return false; // Force high-performance mode
    }

    async init() {
        await this.loadGitHubProfile();
        await this.loadGitHubRepos();
        this.setupDiscordStatus();
        this.setupRandomizedLavaLamp();
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
                    // CORS FIX: Add crossorigin to enable color extraction
                    profileImg.crossOrigin = 'anonymous';
                    profileImg.src = profile.avatar_url;
                    profileImg.alt = this.github_username;
                    
                    // Simple direct extraction first, then try advanced methods
                    this.attemptDirectColorExtraction(profile.avatar_url);
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

    async attemptDirectColorExtraction(avatarUrl) {
        console.log('🎯 Attempting DIRECT color extraction with crossorigin fix...');
        
        try {
            // Try direct approach with crossorigin first
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            const success = await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Direct extraction timeout'));
                }, 3000); // 3 second timeout
                
                img.onload = () => {
                    clearTimeout(timeout);
                    try {
                        this.colorExtractor.extractColorsFromImage(img, (colors) => {
                            if (colors.length > 0) {
                                console.log('🎉 SUCCESS: Direct color extraction worked!');
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
                    reject(new Error('Direct image load failed'));
                };
                
                img.src = avatarUrl;
            });
            
            return; // Success! No need for fallback methods
            
        } catch (error) {
            console.log('⚠️ Direct extraction failed:', error.message);
            console.log('🔄 Falling back to advanced methods...');
            
            // Fall back to the complex methods
            this.attemptColorExtraction(avatarUrl);
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
            // CORS FIX: Add crossorigin for fallback image too
            profileImg.crossOrigin = 'anonymous';
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
            console.log('📂 Loading GitHub repositories with automatic language detection...');
            
            // Fetch all repositories
            const reposResponse = await fetch(`https://api.github.com/users/${this.github_username}/repos?sort=updated&per_page=50`);
            
            if (reposResponse.ok) {
                const allRepos = await reposResponse.json();
                
                // Filter out forks and profile repos, but include all legitimate projects
                const validRepos = allRepos.filter(repo => 
                    !repo.fork && 
                    repo.name !== this.github_username &&
                    !repo.name.includes('.github.io') &&
                    repo.size > 0 // Has actual content
                );
                
                console.log(`📊 Found ${validRepos.length} valid repositories`);
                
                // Fetch languages for each repository
                const reposWithLanguages = await Promise.all(
                    validRepos.map(async (repo) => {
                        try {
                            const langResponse = await fetch(repo.languages_url);
                            const languages = langResponse.ok ? await langResponse.json() : {};
                            
                            // Get the primary language (most used)
                            const languageEntries = Object.entries(languages);
                            const primaryLanguage = languageEntries.length > 0 
                                ? languageEntries.sort((a, b) => b[1] - a[1])[0][0]
                                : repo.language || 'Unknown';
                            
                            return {
                                ...repo,
                                languages,
                                primaryLanguage,
                                languageCount: Object.keys(languages).length,
                                totalBytes: Object.values(languages).reduce((sum, bytes) => sum + bytes, 0)
                            };
                        } catch (error) {
                            console.warn(`Failed to fetch languages for ${repo.name}:`, error);
                            return {
                                ...repo,
                                languages: {},
                                primaryLanguage: repo.language || 'Unknown',
                                languageCount: 0,
                                totalBytes: 0
                            };
                        }
                    })
                );
                
                // Sort by criteria: stars, recent activity, language diversity
                const sortedRepos = reposWithLanguages.sort((a, b) => {
                    // Score based on stars, recent activity, and language diversity
                    const scoreA = (a.stargazers_count * 10) + 
                                  (a.languageCount * 5) + 
                                  (new Date(a.updated_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) ? 20 : 0);
                    const scoreB = (b.stargazers_count * 10) + 
                                  (b.languageCount * 5) + 
                                  (new Date(b.updated_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) ? 20 : 0);
                    return scoreB - scoreA;
                });
                
                // Take the top 6 repositories
                const featuredRepos = sortedRepos.slice(0, 6);
                
                this.renderProjectsWithLanguages(featuredRepos);
                console.log('✅ GitHub repositories loaded with automatic language detection');
            } else {
                console.warn('Failed to load GitHub repositories');
                this.renderFallbackProjects();
            }
        } catch (error) {
            console.error('Error loading GitHub repos:', error);
            this.renderFallbackProjects();
        }
    }

    renderProjectsWithLanguages(repos) {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = repos.map((repo, index) => {
            // Build language tags from the most used languages
            const languageEntries = Object.entries(repo.languages || {})
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3); // Show top 3 languages
            
            const languageTags = languageEntries.length > 0 
                ? languageEntries.map(([lang, bytes]) => {
                    const percentage = repo.totalBytes > 0 
                        ? Math.round((bytes / repo.totalBytes) * 100)
                        : 0;
                    
                    // Get the lowercase language name for CSS class
                    const langClass = lang.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const langDataAttr = lang.toLowerCase();
                    
                    return `<span class="project-language ${langClass}" data-lang="${langDataAttr}" title="${percentage}% of codebase">${lang}</span>`;
                }).join('')
                : (repo.primaryLanguage ? `<span class="project-language ${repo.primaryLanguage.toLowerCase()}" data-lang="${repo.primaryLanguage.toLowerCase()}">${repo.primaryLanguage}</span>` : '');
            
            // Use description if available, otherwise generate one based on languages
            let description = repo.description;
            if (!description || description.trim().length === 0) {
                description = this.generateDescriptionFromLanguages(repo.languages, repo.primaryLanguage);
            }
            // Ensure minimum description length
            if (!description || description.trim().length < 10) {
                description = `${this.formatRepoName(repo.name)} - A ${repo.primaryLanguage || 'software'} project with practical functionality.`;
            }
            
            // Add repository stats
            const stats = [];
            if (repo.stargazers_count > 0) stats.push(`⭐ ${repo.stargazers_count}`);
            if (repo.forks_count > 0) stats.push(`🔀 ${repo.forks_count}`);
            if (Object.keys(repo.languages || {}).length > 1) stats.push(`🔧 ${Object.keys(repo.languages || {}).length} languages`);
            
            const statsHtml = stats.length > 0 
                ? `<div class="project-stats">${stats.join(' • ')}</div>`
                : '';
            
            return `
                <div class="project-card" style="animation-delay: ${index * 0.1}s" data-repo="${repo.name}">
                    <div class="project-header">
                        <div>
                            <h3 class="project-title">${this.formatRepoName(repo.name)}</h3>
                            <div class="project-languages">${languageTags}</div>
                        </div>
                    </div>
                    <p class="project-description">${description}</p>
                    ${statsHtml}
                    <div class="project-footer">
                        <a href="${repo.html_url}" target="_blank" class="project-link project-button">
                            <span>View Code</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                        </a>
                        ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank" class="project-link project-button demo-button">
                            <span>Live Demo</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                            </svg>
                        </a>
                        ` : ''}
                        <div class="project-updated" title="Last updated: ${new Date(repo.updated_at).toLocaleDateString()}">
                            Updated ${this.getRelativeTime(repo.updated_at)}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.animateProjectCards();
        this.addLanguageHoverEffects();
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
                <div class="project-footer">
                    <a href="${project.url}" target="_blank" class="project-link project-button">
                        <span>View Code</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                    </a>
                </div>
            </div>
        `).join('');

        this.animateProjectCards();
    }

    generateDescriptionFromLanguages(languages, primaryLanguage) {
        // Always ensure we have a primary language
        const mainLang = primaryLanguage || 'Software';
        
        if (!languages || Object.keys(languages).length === 0) {
            return `${mainLang} project with practical functionality and modern features.`;
        }
        
        const langNames = Object.keys(languages);
        const descriptions = {
            'JavaScript': 'Modern web application with interactive features',
            'Python': 'Automation and processing tool with advanced capabilities',
            'C#': 'Desktop application with modern user interface',
            'Java': 'Cross-platform application with robust functionality',
            'TypeScript': 'Type-safe web application with enhanced reliability',
            'HTML': 'Web interface with responsive design',
            'CSS': 'Styled web interface with modern aesthetics',
            'Go': 'High-performance service with efficient processing',
            'Rust': 'Systems programming with memory safety',
            'PHP': 'Web backend with database integration',
            'Ruby': 'Web application with elegant framework',
            'Swift': 'iOS/macOS app with native performance',
            'Kotlin': 'Android application with modern features'
        };
        
        if (langNames.length === 1) {
            return descriptions[mainLang] || `${mainLang} application with practical features`;
        } else {
            const primaryDesc = descriptions[mainLang] || `${mainLang} application`;
            const otherLangs = langNames.filter(lang => lang !== mainLang).slice(0, 1);
            if (otherLangs.length > 0) {
                return `${primaryDesc} with ${otherLangs[0]} integration`;
            }
            return primaryDesc;
        }
    }
    
    getRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        
        if (diffInDays === 0) return 'today';
        if (diffInDays === 1) return 'yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
        return `${Math.floor(diffInDays / 365)} years ago`;
    }
    
    addLanguageHoverEffects() {
        // Add hover effects for language tags - FIXED to prevent flicker
        document.querySelectorAll('.project-language').forEach(tag => {
            const langDataAttr = tag.dataset.lang;
            if (!langDataAttr) return;
            
            const languageColors = {
                'javascript': '#f7df1e',
                'python': '#3776ab',
                'c#': '#512bd4',
                'typescript': '#3178c6',
                'java': '#ed8b00',
                'html': '#e34f26',
                'css': '#1572b6',
                'go': '#00add8',
                'rust': '#ce422b',
                'php': '#777bb4',
                'ruby': '#cc342d',
                'swift': '#fa7343',
                'kotlin': '#7f52ff',
                'c++': '#00599c',
                'c': '#a8b9cc'
            };
            
            const colorKey = langDataAttr.toLowerCase();
            const langColor = languageColors[colorKey];
            
            if (langColor) {
                // Apply persistent styling - no more flickering
                tag.style.color = langColor + ' !important';
                tag.style.borderColor = langColor + ' !important';
                tag.style.setProperty('--lang-color', langColor);
                
                // Keep original hover effects but without conflicting with persistent colors
                tag.addEventListener('mouseenter', () => {
                    tag.style.backgroundColor = langColor + '20';
                    tag.style.transform = 'scale(1.05)';
                });
                tag.addEventListener('mouseleave', () => {
                    tag.style.backgroundColor = '';
                    tag.style.transform = 'scale(1)';
                    // Don't reset color and border as they're persistent
                });
            }
        });
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
        
        // Always start with default Available state
        statusIndicator.querySelector('.status-text').textContent = 'Available';
        statusIndicator.classList.add('online');
        
        if (!this.discord_user_id) {
            // No Discord ID provided - keep default
            discordLink.href = '#';
            discordLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showDiscordMessage();
            });
            return;
        }

        // Try to fetch real Discord status
        this.fetchDiscordStatus();
    }
    
    setupRandomizedLavaLamp() {
        console.log('🌈 Setting up consistent lava lamp for all devices...');
        
        const blobs = document.querySelectorAll('.lava-blob');
        
        // CONSISTENT EXPERIENCE: Same number of blobs for all devices
        const activeBlobs = 12; // 12 blobs for everyone
        console.log(`🎆 Using ${activeBlobs} blobs for consistent experience`);
        
        // Hide excess blobs
        blobs.forEach((blob, index) => {
            if (index >= activeBlobs) {
                blob.style.display = 'none';
                return;
            }
            
            // Consistent size variations
            const sizes = [140, 180, 220, 160, 200, 170, 190, 150, 210, 180, 160, 200];
            const size = sizes[index % sizes.length];
            blob.style.width = `${size}px`;
            blob.style.height = `${size}px`;
            
            // Pre-calculated grid positions ensuring good coverage
            const positions = [
                { x: 8, y: 8 },     // top-left (guaranteed)
                { x: 85, y: 12 },   // top-right  
                { x: 12, y: 78 },   // bottom-left
                { x: 78, y: 85 },   // bottom-right
                { x: 45, y: 15 },   // top-center
                { x: 18, y: 45 },   // left-center
                { x: 75, y: 50 },   // right-center
                { x: 50, y: 75 },   // bottom-center
                { x: 65, y: 35 },   // center-right
                { x: 32, y: 60 },   // center-left
                { x: 25, y: 25 },   // top-left-inner
                { x: 60, y: 15 }    // top-right-inner
            ];
            
            const pos = positions[index % positions.length];
            blob.style.left = `${pos.x}%`;
            blob.style.top = `${pos.y}%`;
            
            // Assign colors cyclically
            const colors = [
                'var(--accent-primary, #00d4ff)',
                'var(--accent-secondary, #7c3aed)', 
                'var(--accent-tertiary, #f59e0b)'
            ];
            blob.style.background = colors[index % colors.length];
            
            // Use predefined CSS animations
            const animations = ['smoothFloat1', 'smoothFloat2', 'smoothFloat3', 'smoothFloat4', 'smoothFloat5'];
            const durations = [9, 11, 13, 10, 12, 8, 14, 9.5, 10.5, 11.5, 8.5, 12.5];
            const delays = [0, 2, 4, 1, 3, 1.5, 2.5, 3.5, 0.5, 1.8, 2.8, 3.2];
            
            blob.style.animationName = animations[index % animations.length];
            blob.style.animationDuration = `${durations[index % durations.length]}s`;
            blob.style.animationDelay = `${delays[index % delays.length]}s`;
            blob.style.animationIterationCount = 'infinite';
            blob.style.animationTimingFunction = 'ease-in-out';
            blob.style.animationDirection = index % 2 === 0 ? 'normal' : 'alternate';
            
            console.log(`🎯 Blob ${index + 1}: pos=(${pos.x}%, ${pos.y}%), size=${size}px, anim=${animations[index % animations.length]}`);
        });
        
        console.log(`✨ Consistent lava lamp ready with ${activeBlobs} blobs!`);
    }


    async fetchDiscordStatus() {
        console.log('💬 Fetching Discord status for user:', this.discord_user_id);
        const statusIndicator = document.getElementById('discord-status');
        const discordLink = document.getElementById('discord-link');
        
        // Start with default state instead of loading
        statusIndicator.querySelector('.status-text').textContent = 'Available';
        statusIndicator.classList.add('online');
        
        try {
            console.log('🔄 Fetching REAL Discord status via Lanyard...');
            const response = await fetch(`https://api.lanyard.rest/v1/users/${this.discord_user_id}`);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Lanyard API success - Full Discord data:', data);
                
                if (this.parseRealDiscordStatus(data)) {
                    return; // Success with real status!
                }
            } else {
                console.log('⚠️ Lanyard API failed with status:', response.status);
            }
        } catch (error) {
            console.log('⚠️ Lanyard API error:', error.message);
        }
        
        // Fallback to intelligent status simulation
        console.log('🔄 Using intelligent status simulation...');
        this.showIntelligentStatus();
    }

    parseRealDiscordStatus(data) {
        console.log('🔄 Parsing real Discord data from Lanyard...');
        const statusIndicator = document.getElementById('discord-status');
        const discordLink = document.getElementById('discord-link');
        
        statusIndicator.classList.remove('loading');
        
        if (!data.data) {
            console.log('⚠️ No Discord data found');
            return false;
        }
        
        const discordData = data.data;
        const user = discordData.discord_user;
        const status = discordData.discord_status;
        const activities = discordData.activities || [];
        
        // Extract user info
        const username = user?.username || 'y8o';
        const discriminator = user?.discriminator;
        const avatar = user?.avatar;
        const primaryGuild = user?.primary_guild;
        const publicFlags = user?.public_flags;
        
        // Find custom status activity
        const customStatus = activities.find(activity => activity.type === 4);
        
        // Extract presence info
        const listeningToSpotify = discordData.listening_to_spotify;
        const spotify = discordData.spotify;
        const activeDevices = {
            web: discordData.active_on_discord_web,
            desktop: discordData.active_on_discord_desktop,
            mobile: discordData.active_on_discord_mobile
        };
        
        console.log('✅ Parsed Discord data:', {
            status,
            username,
            customStatus: customStatus?.state,
            emoji: customStatus?.emoji,
            guild: primaryGuild?.tag,
            spotify: listeningToSpotify
        });
        
        // Update UI with real Discord data
        this.updateRealDiscordUI({
            status,
            username,
            discriminator,
            avatar,
            customStatus,
            primaryGuild,
            activeDevices,
            spotify: listeningToSpotify ? spotify : null,
            publicFlags
        });
        
        return true;
    }

    updateRealDiscordUI(discordData) {
        const { status, username, discriminator, avatar, customStatus, primaryGuild, activeDevices, spotify, publicFlags } = discordData;
        const statusIndicator = document.getElementById('discord-status');
        const discordLink = document.getElementById('discord-link');
        
        // Status mapping with emoji support
        const statusMap = {
            'online': { text: 'Online', class: 'online', color: '#22c55e', emoji: '�︠' },
            'idle': { text: 'Away', class: 'idle', color: '#f59e0b', emoji: '🌙' },
            'dnd': { text: 'Busy', class: 'dnd', color: '#ef4444', emoji: '🔴' },
            'offline': { text: 'Offline', class: 'offline', color: '#6b7280', emoji: '⚪' }
        };
        
        const statusInfo = statusMap[status] || statusMap['offline'];
        
        // Update status indicator
        statusIndicator.querySelector('.status-text').textContent = statusInfo.text;
        statusIndicator.className = 'status-indicator ' + statusInfo.class;
        statusIndicator.querySelector('.status-dot').style.background = statusInfo.color;
        
        // Build display name with discriminator if needed
        const displayName = discriminator && discriminator !== '0' ? 
            `${username}#${discriminator}` : username;
        
        // Discord link functionality - Fixed to pass formatted data
        discordLink.href = '#';
        // Remove existing event listeners by replacing the element
        const newDiscordLink = discordLink.cloneNode(true);
        discordLink.parentNode.replaceChild(newDiscordLink, discordLink);
        
        newDiscordLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Format the data properly for the popup
            let customStatusText = '';
            if (customStatus && customStatus.state) {
                let emojiText = '';
                if (customStatus.emoji) {
                    if (customStatus.emoji.id) {
                        // Custom Discord emoji
                        emojiText = `<img src="https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}" alt="${customStatus.emoji.name}" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 4px;">`;
                    } else {
                        // Unicode emoji
                        emojiText = customStatus.emoji.name + ' ';
                    }
                }
                customStatusText = emojiText + (customStatus.state || '');
            }
            
            // Format active devices
            const activeDevicesList = [];
            if (activeDevices && activeDevices.desktop) activeDevicesList.push('💻 Desktop');
            if (activeDevices && activeDevices.web) activeDevicesList.push('🌍 Web');
            if (activeDevices && activeDevices.mobile) activeDevicesList.push('📱 Mobile');
            
            // Call the popup with properly formatted data (guild removed)
            this.showRealDiscordContact({
                status: statusInfo.text,
                statusEmoji: statusInfo.emoji,
                username: displayName,
                customStatus: customStatusText,
                guild: null, // Hide guild information
                spotify,
                activeDevices: activeDevicesList,
                avatar: avatar
            });
        });
        
        console.log(`✅ Real Discord status updated: ${displayName} is ${statusInfo.text}`);
        
        // Auto-refresh every 30 seconds to keep status current
        setTimeout(() => {
            this.fetchDiscordStatus();
        }, 30 * 1000); // 30 seconds for real status
    }

    showIntelligentStatus() {
        const statusIndicator = document.getElementById('discord-status');
        const discordLink = document.getElementById('discord-link');
        
        statusIndicator.classList.remove('loading');
        
        // Intelligent status based on time of day and patterns
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const isWeekend = day === 0 || day === 6;
        
        let status, statusText, explanation;
        
        if (hour >= 9 && hour <= 17 && !isWeekend) {
            // Business hours on weekdays - likely DND (working)
            status = 'dnd';
            statusText = 'Busy';
            explanation = 'Working hours - focused on coding';
        } else if ((hour >= 18 && hour <= 23) || (hour >= 7 && hour <= 8)) {
            // Evening/morning - likely online
            status = 'online';
            statusText = 'Online';
            explanation = 'Available for collaborations';
        } else if (hour >= 0 && hour <= 6) {
            // Late night/early morning - likely offline
            status = 'offline';
            statusText = 'Offline';
            explanation = 'Probably sleeping';
        } else {
            // Default to idle
            status = 'idle';
            statusText = 'Away';
            explanation = 'Step away from computer';
        }
        
        // Weekend adjustments
        if (isWeekend) {
            if (hour >= 10 && hour <= 20) {
                status = 'online';
                statusText = 'Online';
                explanation = 'Weekend - available for side projects';
            } else if (hour >= 21 && hour <= 23) {
                status = 'idle';
                statusText = 'Away';
                explanation = 'Weekend evening';
            }
        }
        
        const statusMap = {
            'online': { color: '#22c55e', class: 'online' },
            'idle': { color: '#f59e0b', class: 'idle' },
            'dnd': { color: '#ef4444', class: 'dnd' },
            'offline': { color: '#6b7280', class: 'offline' }
        };
        
        const statusInfo = statusMap[status];
        
        // Update indicator
        statusIndicator.querySelector('.status-text').textContent = statusText;
        statusIndicator.className = 'status-indicator ' + statusInfo.class;
        statusIndicator.querySelector('.status-dot').style.background = statusInfo.color;
        
        // Update Discord link
        discordLink.href = '#';
        discordLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showEnhancedDiscordContact(statusText, explanation);
        });
        
        console.log(`✅ Intelligent status: ${statusText} (${explanation})`);
        
        // Add subtle animation to make it feel more "live"
        this.addStatusAnimation();
        
        // Update status every 5 minutes to keep it dynamic
        setTimeout(() => {
            this.showIntelligentStatus();
        }, 5 * 60 * 1000); // 5 minutes
    }
    
    addStatusAnimation() {
        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
            statusDot.style.animation = 'none';
            setTimeout(() => {
                statusDot.style.animation = 'pulse 2s ease-in-out infinite';
            }, 100);
        }
    }
    
    showEnhancedDiscordContact(currentStatus, explanation) {
        // Create enhanced popup with status context
        const popup = document.createElement('div');
        popup.className = 'discord-contact-popup';
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 2rem;
            max-width: 420px;
            z-index: 2000;
            box-shadow: var(--shadow-strong);
            backdrop-filter: blur(10px);
            text-align: center;
        `;
        
        const statusEmoji = {
            'Online': '�️',
            'Busy': '🔴',
            'Away': '🟊',
            'Offline': '⚪'
        };
        
        popup.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">💬</div>
                <h3 style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 1.3rem;"></h3>
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem; font-size: 0.9rem; font-style: italic;">Status: ${currentStatus} - ${explanation}</p>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.5;">Connect with me for coding collaborations, project discussions, and tech partnerships!</p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <div style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.25rem;">Discord Username</div>
                    <div style="color: var(--accent-primary); font-family: monospace; font-size: 1.1rem; font-weight: 600;">y8o</div>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.4;">
                    • Search for 'y8o' on Discord<br>
                    • Find me in dev communities<br>
                    • Always open to interesting projects!
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="copy-discord-id" style="
                    background: #5865f2;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    font-size: 0.9rem;
                ">Copy Username</button>
                <button class="close-popup" style="
                    background: transparent;
                    color: var(--text-secondary);
                    border: 1px solid var(--border-color);
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    font-size: 0.9rem;
                ">Close</button>
            </div>
            
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); font-size: 0.8rem; color: var(--text-muted);">
                Status updates automatically based on time patterns
            </div>
        `;
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'discord-popup-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1999;
            backdrop-filter: blur(2px);
        `;
        
        document.body.appendChild(backdrop);
        document.body.appendChild(popup);
        
        // Add event listeners
        const copyButton = popup.querySelector('.copy-discord-id');
        const closeButton = popup.querySelector('.close-popup');
        
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText('y8o').then(() => {
                copyButton.innerHTML = '✅ Copied!';
                copyButton.style.background = '#22c55e';
                setTimeout(() => {
                    copyButton.innerHTML = 'Copy Username';
                    copyButton.style.background = '#5865f2';
                }, 2500);
            }).catch(() => {
                copyButton.innerHTML = 'Copy failed';
                copyButton.style.background = '#ef4444';
                setTimeout(() => {
                    copyButton.innerHTML = 'Copy Username';
                    copyButton.style.background = '#5865f2';
                }, 2500);
            });
        });
        
        const closePopup = () => {
            if (document.body.contains(backdrop)) document.body.removeChild(backdrop);
            if (document.body.contains(popup)) document.body.removeChild(popup);
        };
        
        closeButton.addEventListener('click', closePopup);
        backdrop.addEventListener('click', closePopup);
        
        // Escape key to close
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        // Auto-close after 12 seconds
        setTimeout(() => {
            closePopup();
            document.removeEventListener('keydown', escapeHandler);
        }, 12000);
    }
    showRealDiscordContact(discordData) {
        const { status, statusEmoji, username, customStatus, guild, spotify, activeDevices, avatar } = discordData;
        
        // Create enhanced popup with real Discord data
        const popup = document.createElement('div');
        popup.className = 'discord-contact-popup';
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 2rem;
            max-width: 480px;
            z-index: 2000;
            box-shadow: var(--shadow-strong);
            backdrop-filter: blur(10px);
            text-align: center;
        `;
        
        // Build custom status section
        let customStatusSection = '';
        if (customStatus) {
            customStatusSection = `
                <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.25rem;">Custom Status</div>
                    <div style="color: var(--text-primary); font-size: 0.9rem;">${customStatus}</div>
                </div>
            `;
        }
        
        // Build guild section - REMOVED (no longer showing guild information)
        let guildSection = '';
        
        // Build Spotify section
        let spotifySection = '';
        if (spotify && spotify.song) {
            spotifySection = `
                <div style="background: linear-gradient(90deg, #1db954, #1ed760); padding: 1rem; border-radius: 8px; margin: 1rem 0; color: white;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <div style="font-size: 1.2rem;">🎵</div>
                        <div style="font-weight: 600; font-size: 0.9rem;">Listening to Spotify</div>
                    </div>
                    <div style="font-weight: 600; font-size: 0.95rem;">${spotify.song}</div>
                    ${spotify.artist ? `<div style="opacity: 0.9; font-size: 0.85rem;">by ${spotify.artist}</div>` : ''}
                    ${spotify.album ? `<div style="opacity: 0.8; font-size: 0.8rem;">${spotify.album}</div>` : ''}
                </div>
            `;
        }
        
        // Build active devices section
        let devicesSection = '';
        if (activeDevices && activeDevices.length > 0) {
            devicesSection = `
                <div style="margin: 1rem 0;">
                    <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 0.5rem;">Active on</div>
                    <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
                        ${activeDevices.map(device => `
                            <span style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.75rem; color: var(--text-primary);">${device}</span>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        popup.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <div style="font-size: 1.5rem;"></div>
                </div>
                <h3 style="color: var(--text-primary); margin: 1rem 0 0.5rem; font-size: 1.2rem;"></h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.4;"></p>
            </div>
            
            ${customStatusSection}
            ${spotifySection}
            ${devicesSection}
            
            <div style="margin: 1.5rem 0;">
                <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <div style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.25rem;">Discord Username</div>
                    <div style="color: var(--accent-primary); font-family: monospace; font-size: 1.1rem; font-weight: 600;">y8o</div>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.4;">
                    • Search for 'y8o' on Discord<br>
                    • Always open to coding collaborations!<br>
                    • Active in developer communities
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="copy-discord-id" style="
                    background: #5865f2;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    font-size: 0.9rem;
                ">Copy Username</button>
                <button class="close-popup" style="
                    background: transparent;
                    color: var(--text-secondary);
                    border: 1px solid var(--border-color);
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    font-size: 0.9rem;
                ">Close</button>
            </div>
            
            <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color); font-size: 0.8rem; color: var(--text-muted); line-height: 1.3;">
                ✨ Real-time status via Lanyard API<br>
                🔄 Auto-refreshes every 30 seconds
            </div>
        `;
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'discord-popup-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1999;
            backdrop-filter: blur(2px);
        `;
        
        document.body.appendChild(backdrop);
        document.body.appendChild(popup);
        
        // Add event listeners
        const copyButton = popup.querySelector('.copy-discord-id');
        const closeButton = popup.querySelector('.close-popup');
        
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(this.discord_user_id).then(() => {
                copyButton.innerHTML = '✅ Copied!';
                copyButton.style.background = '#22c55e';
                setTimeout(() => {
                    copyButton.innerHTML = 'Copy Discord ID';
                    copyButton.style.background = '#5865f2';
                }, 2500);
            }).catch(() => {
                copyButton.innerHTML = 'Copy failed';
                copyButton.style.background = '#ef4444';
                setTimeout(() => {
                    copyButton.innerHTML = 'Copy Discord ID';
                    copyButton.style.background = '#5865f2';
                }, 2500);
            });
        });
        
        const closePopup = () => {
            if (document.body.contains(backdrop)) document.body.removeChild(backdrop);
            if (document.body.contains(popup)) document.body.removeChild(popup);
        };
        
        closeButton.addEventListener('click', closePopup);
        backdrop.addEventListener('click', closePopup);
        
        // Escape key to close
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        // Auto-close after 20 seconds (longer for rich content)
        setTimeout(() => {
            closePopup();
            document.removeEventListener('keydown', escapeHandler);
        }, 20000);
    }

    addInteractivity() {
        // Enhanced tech stack interactions WITHOUT 3D effects to prevent flickering
        document.querySelectorAll('.tech-item').forEach(item => {
            // REMOVED 3D effect to prevent icon flickering
            // this.add3DEffect(item, 1.0);
            item.addEventListener('click', () => {
                const tech = item.dataset.tech;
                this.showTechInfo(tech);
                // REMOVED: this.addTechGlow(item); - No more glow effect on click
            });
        });

        // MOBILE OPTIMIZATION: Disable 3D effects on mobile/low-end devices
        if (!this.isMobile && !this.isLowEndDevice) {
            // Add 3D effects only on desktop with good performance
            document.querySelectorAll('.project-card').forEach(card => {
                this.add3DEffect(card, 1.2);
            });

            const profileCard = document.querySelector('.profile-card');
            if (profileCard) {
                this.add3DEffect(profileCard, 0.4);
            }

            document.querySelectorAll('.social-link').forEach(link => {
                this.add3DEffect(link, 0.8);
            });

            const ctaButton = document.querySelector('.cta-button');
            if (ctaButton) {
                this.add3DEffect(ctaButton, 0.6);
            }

            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                this.add3DEffect(profileImage, 0.7);
            }

            document.querySelectorAll('.project-link').forEach(link => {
                this.add3DEffect(link, 0.4);
            });
        } else {
            console.log('📱 Mobile/Low-end device detected: 3D effects disabled for performance');
        }

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

        // Parallax effect for background - OPTIMIZED for mobile
        if (!this.isMobile) {
            window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        }

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.notification').forEach(el => el.remove());
            }
        });

        // Enhanced cursor effect - DISABLED on mobile
        if (!this.isMobile) {
            this.setupCursorEffect();
        }
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
        // Skip on mobile devices
        if (this.isMobile) return;
        
        // Prevent multiple event listeners
        if (element.has3DEffect) return;
        element.has3DEffect = true;
        
        let isHovering = false;
        let animationFrame = null;
        let lastX = 0, lastY = 0;
        let throttleTimeout = null;
        
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
            
            // Throttle for mobile performance
            const deltaX = Math.abs(e.clientX - lastX);
            const deltaY = Math.abs(e.clientY - lastY);
            if (deltaX < 2 && deltaY < 2) return; // Skip small movements
            
            lastX = e.clientX;
            lastY = e.clientY;
            
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // MOBILE OPTIMIZATION: Reduced intensity for performance
            const maxRotation = this.isLowEndDevice ? 12 : 18;
            const maxTranslation = this.isLowEndDevice ? 4 : 6;
            
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
            
            // Throttle frame updates on low-end devices
            if (this.isLowEndDevice && throttleTimeout) return;
            
            animationFrame = requestAnimationFrame(() => {
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
                if (element.classList.contains('social-link')) {
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
                
                // Throttle on low-end devices
                if (this.isLowEndDevice) {
                    throttleTimeout = setTimeout(() => {
                        throttleTimeout = null;
                    }, 16); // ~60fps
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
            
            // CRITICAL FIX: For elements that might have conflicts, preserve styling without flicker
            if (element.classList.contains('project-language') || 
                element.classList.contains('status-indicator') ||
                element.classList.contains('profile-image')) {
                // Don't clear box-shadow for these elements - let CSS maintain the styling
                return;
            }
            
            // For other elements, clear box-shadow after transition
            setTimeout(() => {
                if (!isHovering) {
                    element.style.boxShadow = '';
                }
            }, 300); // Wait for full transition
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
        } else if (element.classList.contains('java')) {
            return 'rgba(237, 139, 0, 0.3)';
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
        // Skip completely on mobile devices
        if (this.isMobile || 'ontouchstart' in window) return;
        
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
        
        // OPTIMIZED: Use mouse blob only on non-low-end devices
        const mouseBlob = !this.isLowEndDevice ? document.getElementById('mouse-blob') : null;
        
        let cursorX = 0, cursorY = 0;
        let blobX = 0, blobY = 0;
        let lastUpdateTime = 0;
        
        const updateCursor = (e) => {
            const now = performance.now();
            // Throttle updates for performance
            if (now - lastUpdateTime < 16) return; // ~60fps max
            lastUpdateTime = now;
            
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            // Only update blob on high-end devices
            if (mouseBlob && !this.isLowEndDevice) {
                blobX += (cursorX - blobX) * 0.05;
                blobY += (cursorY - blobY) * 0.05;
                mouseBlob.style.left = (blobX - 100) + 'px';
                mouseBlob.style.top = (blobY - 100) + 'px';
            }
        };
        
        document.addEventListener('mousemove', updateCursor, { passive: true });

        // Simplified cursor interactions
        const interactiveElements = document.querySelectorAll(
            'a:not(.project-link):not(.social-link), button:not(.cta-button)'
        );
        
        interactiveElements.forEach(el => {
            if (!el.has3DEffect) {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
                    cursor.style.opacity = '0.5';
                }, { passive: true });
                
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.opacity = '0.3';
                }, { passive: true });
            }
        });
        
        // Simplified click particles - DISABLED to remove glow effects
        if (false) { // Completely disabled
            document.addEventListener('click', (e) => {
                this.createClickParticles(e.clientX, e.clientY);
            }, { passive: true });
        }
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