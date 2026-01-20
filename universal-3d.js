// UNIVERSAL 3D EFFECTS - Cross-browser detection and fixes
// This script detects browser capabilities and applies appropriate 3D effects

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Starting cross-browser 3D compatibility check...');
    
    // Browser detection
    const browserInfo = detectBrowser();
    console.log('🌐 Browser detected:', browserInfo);
    
    // 3D capability test
    const supports3D = test3DSupport();
    console.log('🎮 3D Support:', supports3D ? 'YES' : 'NO');
    
    // Hardware acceleration test
    const hasHardwareAccel = testHardwareAcceleration();
    console.log('⚡ Hardware Acceleration:', hasHardwareAccel ? 'YES' : 'NO');
    
    // Apply appropriate 3D effects
    setTimeout(() => {
        applyUniversal3DEffects(supports3D, hasHardwareAccel, browserInfo);
    }, 100);
});

function detectBrowser() {
    const ua = navigator.userAgent;
    const browser = {
        isChrome: /Chrome/.test(ua) && /Google Inc/.test(navigator.vendor),
        isFirefox: /Firefox/.test(ua),
        isSafari: /Safari/.test(ua) && /Apple Computer/.test(navigator.vendor),
        isEdge: /Edg/.test(ua),
        isIE: /MSIE|Trident/.test(ua),
        isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
    };
    
    browser.name = browser.isChrome ? 'Chrome' :
                   browser.isFirefox ? 'Firefox' :
                   browser.isSafari ? 'Safari' :
                   browser.isEdge ? 'Edge' :
                   browser.isIE ? 'IE' : 'Unknown';
    
    return browser;
}

function test3DSupport() {
    // Test if browser supports CSS 3D transforms
    const testElement = document.createElement('div');
    const transforms = [
        'transform',
        'webkitTransform',
        'MozTransform',
        'msTransform',
        'OTransform'
    ];
    
    for (let i = 0; i < transforms.length; i++) {
        if (testElement.style[transforms[i]] !== undefined) {
            testElement.style[transforms[i]] = 'perspective(400px) rotateY(45deg)';
            if (testElement.style[transforms[i]].length > 0) {
                return true;
            }
        }
    }
    
    // Also test using CSS.supports if available
    if (window.CSS && CSS.supports) {
        return CSS.supports('transform-style', 'preserve-3d') || 
               CSS.supports('-webkit-transform-style', 'preserve-3d');
    }
    
    return false;
}

function testHardwareAcceleration() {
    // Test if hardware acceleration is working
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
    } catch (e) {
        return false;
    }
}

function applyUniversal3DEffects(supports3D, hasHardwareAccel, browserInfo) {
    console.log('🚀 Applying universal 3D effects...');
    
    // Get all elements that should have 3D effects
    const elements = {
        projectCards: document.querySelectorAll('.project-card'),
        techItems: document.querySelectorAll('.tech-item'),
        socialLinks: document.querySelectorAll('.social-link'),
        profileCard: document.querySelector('.profile-card')
    };
    
    // Apply class for debugging
    Object.values(elements).forEach(nodeList => {
        if (nodeList.length) {
            nodeList.forEach(el => el.classList.add('force-3d-universal'));
        } else if (nodeList) {
            nodeList.classList.add('force-3d-universal');
        }
    });
    
    // Browser-specific fixes
    if (browserInfo.isFirefox) {
        applyFirefoxFixes(elements);
    } else if (browserInfo.isSafari) {
        applySafariFixes(elements);
    } else if (browserInfo.isEdge || browserInfo.isIE) {
        applyEdgeFixes(elements);
    }
    
    // Apply 3D effects based on capability
    if (supports3D && hasHardwareAccel) {
        console.log('✅ Applying full 3D effects');
        applyFullEffects(elements, browserInfo);
    } else if (supports3D) {
        console.log('⚠️ Applying basic 3D effects (no hardware acceleration)');
        applyBasicEffects(elements, browserInfo);
    } else {
        console.log('❌ Applying 2D fallback effects');
        apply2DFallback(elements, browserInfo);
    }
    
    // Add debug info if needed (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
        addDebugInfo(supports3D, hasHardwareAccel, browserInfo);
    }
}

function applyFullEffects(elements, browserInfo) {
    const intensity = browserInfo.isMobile ? 0.7 : 1.0;
    
    // Project cards - full dynamic 3D
    elements.projectCards.forEach((card, index) => {
        addDynamic3DEffect(card, {
            maxRotation: 15 * intensity,
            maxTranslation: 10 * intensity,
            depth: 25 * intensity,
            scale: 1.02 + (0.01 * intensity)
        });
        console.log(`✨ Applied full 3D to project card ${index + 1}`);
    });
    
    // Tech items
    elements.techItems.forEach((item, index) => {
        addDynamic3DEffect(item, {
            maxRotation: 12 * intensity,
            maxTranslation: 8 * intensity,
            depth: 15 * intensity,
            scale: 1.03 + (0.02 * intensity)
        });
    });
    
    // Social links
    elements.socialLinks.forEach((link, index) => {
        addDynamic3DEffect(link, {
            maxRotation: 8 * intensity,
            maxTranslation: 5 * intensity,
            depth: 10 * intensity,
            scale: 1.02
        });
    });
}

function applyBasicEffects(elements, browserInfo) {
    // Simpler 3D effects without complex mouse tracking
    elements.projectCards.forEach(card => {
        addBasic3DEffect(card, 'perspective(600px) rotateX(-5deg) rotateY(5deg) translateZ(15px) scale(1.02)');
    });
    
    elements.techItems.forEach(item => {
        addBasic3DEffect(item, 'perspective(400px) rotateX(-3deg) rotateY(3deg) translateZ(10px) scale(1.03)');
    });
    
    elements.socialLinks.forEach(link => {
        addBasic3DEffect(link, 'perspective(300px) rotateX(-2deg) rotateY(2deg) translateZ(8px) scale(1.02)');
    });
}

function apply2DFallback(elements, browserInfo) {
    // 2D effects for browsers without 3D support
    elements.projectCards.forEach(card => {
        add2DFallback(card, 'translateY(-8px) scale(1.02)');
    });
    
    elements.techItems.forEach(item => {
        add2DFallback(item, 'translateY(-6px) scale(1.03)');
    });
    
    elements.socialLinks.forEach(link => {
        add2DFallback(link, 'translateY(-4px) scale(1.02)');
    });
}

function addDynamic3DEffect(element, config) {
    let isHovering = false;
    let animationFrame = null;
    
    // Set base styles
    const prefixes = ['', '-webkit-', '-moz-', '-ms-', '-o-'];
    prefixes.forEach(prefix => {
        element.style.setProperty(`${prefix}transform-style`, 'preserve-3d', 'important');
        element.style.setProperty(`${prefix}backface-visibility`, 'hidden', 'important');
        element.style.setProperty(`${prefix}perspective`, '1000px', 'important');
    });
    
    function updateTransform(e) {
        if (!isHovering || !e) return;
        
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const rotateX = Math.max(-config.maxRotation, Math.min(config.maxRotation, 
            (e.clientY - centerY) / rect.height * -config.maxRotation));
        const rotateY = Math.max(-config.maxRotation, Math.min(config.maxRotation, 
            (e.clientX - centerX) / rect.width * config.maxRotation));
        
        const translateX = (e.clientX - centerX) / rect.width * config.maxTranslation;
        const translateY = (e.clientY - centerY) / rect.height * config.maxTranslation;
        
        if (animationFrame) cancelAnimationFrame(animationFrame);
        
        animationFrame = requestAnimationFrame(() => {
            const transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px) translateZ(${config.depth}px) scale(${config.scale})`;
            
            // Apply with all prefixes for maximum compatibility
            element.style.transform = transform;
            element.style.webkitTransform = transform;
            element.style.MozTransform = transform;
            element.style.msTransform = transform;
            element.style.OTransform = transform;
            
            element.style.boxShadow = `${rotateY * -0.5}px ${Math.abs(rotateX) + 10}px ${20 + Math.abs(rotateX) + Math.abs(rotateY)}px rgba(0,0,0,0.3)`;
        });
    }
    
    element.addEventListener('mouseenter', () => {
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
        
        element.style.transition = 'transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1), box-shadow 0.4s ease-out';
        
        // Reset with all prefixes
        const resetTransform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) translateZ(0px) scale(1)';
        element.style.transform = resetTransform;
        element.style.webkitTransform = resetTransform;
        element.style.MozTransform = resetTransform;
        element.style.msTransform = resetTransform;
        element.style.OTransform = resetTransform;
        
        setTimeout(() => {
            if (!isHovering) element.style.boxShadow = '';
        }, 400);
    });
}

function addBasic3DEffect(element, transform) {
    element.addEventListener('mouseenter', () => {
        element.style.transform = transform;
        element.style.webkitTransform = transform;
        element.style.MozTransform = transform;
        element.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'none';
        element.style.webkitTransform = 'none';
        element.style.MozTransform = 'none';
        element.style.boxShadow = '';
    });
}

function add2DFallback(element, transform) {
    element.addEventListener('mouseenter', () => {
        element.style.transform = transform;
        element.style.webkitTransform = transform;
        element.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = '';
        element.style.webkitTransform = '';
        element.style.boxShadow = '';
    });
}

function applyFirefoxFixes(elements) {
    console.log('🦊 Applying Firefox-specific fixes...');
    // Firefox sometimes needs explicit 3D context
    document.body.style.transformStyle = 'preserve-3d';
}

function applySafariFixes(elements) {
    console.log('🍎 Applying Safari-specific fixes...');
    // Safari needs explicit hardware acceleration triggers
    Object.values(elements).forEach(nodeList => {
        if (nodeList.length) {
            nodeList.forEach(el => {
                el.style.webkitTransform = 'translateZ(0)';
                el.style.webkitFontSmoothing = 'antialiased';
            });
        } else if (nodeList) {
            nodeList.style.webkitTransform = 'translateZ(0)';
            nodeList.style.webkitFontSmoothing = 'antialiased';
        }
    });
}

function applyEdgeFixes(elements) {
    console.log('🔷 Applying Edge/IE fixes...');
    // Use simpler effects for older browsers
    Object.values(elements).forEach(nodeList => {
        if (nodeList.length) {
            nodeList.forEach(el => el.classList.add('edge-fallback'));
        } else if (nodeList) {
            nodeList.classList.add('edge-fallback');
        }
    });
}

function addDebugInfo(supports3D, hasHardwareAccel, browserInfo) {
    const debugDiv = document.createElement('div');
    debugDiv.style.cssText = `
        position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.8); 
        color: lime; padding: 10px; font-family: monospace; font-size: 11px; 
        border-radius: 5px; z-index: 9999; max-width: 300px;
    `;
    debugDiv.innerHTML = `
        <strong>3D DEBUG INFO:</strong><br>
        Browser: ${browserInfo.name}<br>
        3D Support: ${supports3D ? '✅' : '❌'}<br>
        Hardware Accel: ${hasHardwareAccel ? '✅' : '❌'}<br>
        Mobile: ${browserInfo.isMobile ? '📱' : '🖥️'}<br>
        User Agent: ${navigator.userAgent.substring(0, 50)}...
    `;
    document.body.appendChild(debugDiv);
    
    // Remove debug after 10 seconds
    setTimeout(() => debugDiv.remove(), 10000);
}
