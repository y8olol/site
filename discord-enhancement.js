// FORCE Enhanced Discord Status - Override everything
// This script COMPLETELY replaces Discord popup functionality

console.log('🚀 FORCING Discord Enhancement override...');

// Immediately override as soon as possible
(function() {
    // Force override the ProfileLoader class before it's even created
    let originalProfileLoader = null;
    
    // Define our custom popup function
    function showCustomDiscordPopup(discordData) {
        console.log('💬 CUSTOM popup with username display:', discordData);
        
        const { status, statusEmoji, username, customStatus, guild, spotify, activeDevices, avatar } = discordData;
        
        // Create enhanced popup with username focus
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
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="font-size: 1.3rem; line-height: 1;">${statusEmoji}</div>
                    <div style="color: var(--text-primary); font-size: 1.3rem; font-weight: 600; line-height: 1;">${status}</div>
                </div>

                <p style="color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.4;">Live Discord integration powered by Lanyard • Updates every 30 seconds</p>
            </div>
            
            ${customStatusSection}
            ${spotifySection}
            ${devicesSection}
            
            <div style="margin: 1.5rem 0;">
                <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <div style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.25rem;">Discord Username</div>
                    <div style="color: var(--accent-primary); font-family: monospace; font-size: 1.1rem; font-weight: 600;">${username}</div>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.4;">
                    • Search for "${username}" on Discord<br>
                    • Always open to coding collaborations!<br>
                    • Active in developer communities
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="copy-discord-username" style="
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
        const copyButton = popup.querySelector('.copy-discord-username');
        const closeButton = popup.querySelector('.close-popup');
        
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(username).then(() => {
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
        
        // Auto-close after 20 seconds
        setTimeout(() => {
            closePopup();
            document.removeEventListener('keydown', escapeHandler);
        }, 20000);
    }
    
    // Function to enhance Discord status display
    function updateEnhancedDiscordStatus(discordData) {
        const statusIndicator = document.getElementById('discord-status');
        if (!statusIndicator) return;
        
        const { status, customStatus } = discordData;
        
        // Status mapping
        const statusMap = {
            'online': { text: 'Online', class: 'online', color: '#23a55a' },
            'idle': { text: 'Idle', class: 'idle', color: '#f0b232' },
            'dnd': { text: 'Busy', class: 'dnd', color: '#f23f42' },
            'offline': { text: 'Offline', class: 'offline', color: '#80848e' }
        };
        
        const statusInfo = statusMap[status] || statusMap['offline'];
        
        // Update status elements
        const statusText = statusIndicator.querySelector('.status-text');
        const statusDot = statusIndicator.querySelector('.status-dot');
        
        if (statusText) statusText.textContent = statusInfo.text;
        if (statusDot) statusDot.style.background = statusInfo.color;
        
        statusIndicator.className = 'discord-status-enhanced ' + statusInfo.class;
        
        // Show custom status only
        const richInfo = document.getElementById('discord-rich-info');
        const customStatusEl = document.getElementById('custom-status');
        const guildTagEl = document.getElementById('guild-tag');
        
        let hasRichInfo = false;
        
        // Update custom status
        if (customStatus && customStatus.state) {
            let customStatusHtml = '';
            if (customStatus.emoji) {
                if (customStatus.emoji.id) {
                    customStatusHtml += `<img src="https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}" alt="${customStatus.emoji.name}">`;
                } else {
                    customStatusHtml += customStatus.emoji.name + ' ';
                }
            }
            customStatusHtml += customStatus.state || '';
            
            if (customStatusEl) {
                customStatusEl.innerHTML = customStatusHtml;
                customStatusEl.style.display = 'flex';
                hasRichInfo = true;
            }
        } else if (customStatusEl) {
            customStatusEl.style.display = 'none';
        }
        
        // Hide guild tag
        if (guildTagEl) {
            guildTagEl.style.display = 'none';
        }
        
        // Show/hide rich info
        if (richInfo) {
            richInfo.style.display = hasRichInfo ? 'flex' : 'none';
        }
        
        console.log('✅ Enhanced Discord status updated!');
    }
    
    // FORCEFUL override approach
    function forceOverrideDiscord() {
        // Try to intercept the ProfileLoader class creation
        let attempts = 0;
        const maxAttempts = 50;
        
        const interceptor = setInterval(() => {
            attempts++;
            
            if (window.ProfileLoader) {
                console.log('🎯 Found ProfileLoader! Applying FORCE override...');
                
                // Store original methods
                const originalUpdateMethod = ProfileLoader.prototype.updateRealDiscordUI;
                const originalShowMethod = ProfileLoader.prototype.showRealDiscordContact;
                
                // Override updateRealDiscordUI
                ProfileLoader.prototype.updateRealDiscordUI = function(discordData) {
                    console.log('🔥 FORCED Discord update!');
                    
                    // Call original for click setup
                    if (originalUpdateMethod) {
                        originalUpdateMethod.call(this, discordData);
                    }
                    
                    // Apply our enhancements
                    updateEnhancedDiscordStatus(discordData);
                    
                    // FORCE override the click handler
                    const discordLink = document.getElementById('discord-link');
                    if (discordLink) {
                        // Remove ALL existing listeners by cloning
                        const newDiscordLink = discordLink.cloneNode(true);
                        discordLink.parentNode.replaceChild(newDiscordLink, discordLink);
                        
                        // Add our custom click handler
                        newDiscordLink.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            console.log('🚀 FORCED custom popup!');
                            
                            // Format data for our custom popup
                            const { status, username, customStatus, primaryGuild, spotify, activeDevices } = discordData;
                            
                            const statusMap = {
                                'online': '🟢',
                                'idle': '🌙', 
                                'dnd': '🚫',
                                'offline': '⚫'
                            };
                            
                            let customStatusText = '';
                            if (customStatus && customStatus.state) {
                                let emojiText = '';
                                if (customStatus.emoji) {
                                    if (customStatus.emoji.id) {
                                        emojiText = `<img src="https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}" alt="${customStatus.emoji.name}" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 4px;">`;
                                    } else {
                                        emojiText = customStatus.emoji.name + ' ';
                                    }
                                }
                                customStatusText = emojiText + (customStatus.state || '');
                            }
                            
                            const activeDevicesList = [];
                            if (activeDevices && activeDevices.desktop) activeDevicesList.push('💻 Desktop');
                            if (activeDevices && activeDevices.web) activeDevicesList.push('🌍 Web');
                            if (activeDevices && activeDevices.mobile) activeDevicesList.push('📱 Mobile');
                            
                            // Show OUR custom popup
                            showCustomDiscordPopup({
                                status: status.charAt(0).toUpperCase() + status.slice(1),
                                statusEmoji: statusMap[status] || '⚫',
                                username: username || 'y8o',
                                customStatus: customStatusText,
                                guild: primaryGuild,
                                spotify: spotify,
                                activeDevices: activeDevicesList,
                                avatar: discordData.avatar
                            });
                        });
                        
                        console.log('✅ FORCED click handler installed!');
                    }
                };
                
                // Completely override showRealDiscordContact to prevent it from running
                ProfileLoader.prototype.showRealDiscordContact = function(discordData) {
                    console.log('🚫 Blocked original popup, using custom one!');
                    // Do nothing - we handle this in our click handler
                };
                
                clearInterval(interceptor);
                console.log('✅ FORCE override completed successfully!');
                
            } else if (attempts >= maxAttempts) {
                console.log('❌ Could not find ProfileLoader after', maxAttempts, 'attempts');
                clearInterval(interceptor);
            }
        }, 100);
    }
    
    // Start the force override immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceOverrideDiscord);
    } else {
        forceOverrideDiscord();
    }
    
})();

console.log('💪 FORCE Discord Enhancement loaded!');
