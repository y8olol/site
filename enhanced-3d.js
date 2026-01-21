// Enhanced 3D Effects for Project Cards - Multi-directional mouse tracking
// This script enhances the project cards with dynamic 3D effects

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the main script to load
    setTimeout(function() {
        console.log('🎮 Loading enhanced 3D effects for project cards...');
        
        // Enhanced 3D effect function specifically for project cards
        function addEnhanced3DEffect(element, intensity = 1.2) {
            let isHovering = false;
            let animationFrame = null;
            
            // Ensure element has proper CSS setup
            element.style.transformStyle = 'preserve-3d';
            element.style.willChange = 'transform';
            element.style.backfaceVisibility = 'hidden';
            element.style.perspective = '1000px';
            
            const updateTransform = (e) => {
                if (!isHovering || !e) return;
                
                const rect = element.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) return;
                
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                // Calculate rotation based on mouse position relative to card center
                const maxRotation = 15; // Reasonable rotation limit
                const maxTranslation = 5;
                
                // Normalize mouse position to -1 to 1 range
                const normalizedX = (mouseX - centerX) / (rect.width / 2);
                const normalizedY = (mouseY - centerY) / (rect.height / 2);
                
                // Apply intensity and create smooth rotations
                // Invert Y for natural feel (mouse up = card tilts away)
                const rotateX = Math.max(-maxRotation, Math.min(maxRotation, 
                    normalizedY * maxRotation * -intensity));
                const rotateY = Math.max(-maxRotation, Math.min(maxRotation, 
                    normalizedX * maxRotation * intensity));
                
                // Subtle translation follows mouse
                const translateX = Math.max(-maxTranslation, Math.min(maxTranslation,
                    normalizedX * maxTranslation * intensity));
                const translateY = Math.max(-maxTranslation, Math.min(maxTranslation,
                    normalizedY * maxTranslation * intensity));
                
                // Debug logging for profile card (disabled)
                // if (element.classList.contains('profile-card')) {
                //     console.log(`Profile 3D: X:${normalizedX.toFixed(2)}, Y:${normalizedY.toFixed(2)}, RotX:${rotateX.toFixed(1)}, RotY:${rotateY.toFixed(1)}`);
                // }
                
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }\n                
                animationFrame = requestAnimationFrame(() => {
                    element.style.transform = `
                        perspective(1000px) 
                        rotateX(${rotateX.toFixed(2)}deg) 
                        rotateY(${rotateY.toFixed(2)}deg) 
                        translateX(${translateX.toFixed(2)}px) 
                        translateY(${translateY.toFixed(2)}px) 
                        translateZ(${(15 * intensity).toFixed(2)}px)
                    `;
                    // NO SCALING - removed scale() to prevent clipping
                    
                    // Only apply dynamic shadow to NON-social elements to avoid CSS hover conflicts
                    if (!element.classList.contains('social-link')) {
                        // Dynamic shadow based on rotation - more responsive to mouse
                        const shadowIntensity = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
                        const shadowX = Math.max(-20, Math.min(20, normalizedX * 15));
                        const shadowY = Math.max(8, Math.min(30, 15 + normalizedY * 8));
                        const shadowBlur = 15 + shadowIntensity * 10;
                        
                        element.style.boxShadow = `
                            ${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px ${shadowBlur.toFixed(1)}px rgba(0, 0, 0, 0.3)
                        `;
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
                
                element.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease-out';
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) translateZ(0px)';
                // NO SCALING - removed scale(1) to prevent clipping
                
                // Reset shadow after transition (but preserve CSS hover effects for social links)
                setTimeout(() => {
                    if (!isHovering && !element.classList.contains('social-link')) {
                        element.style.boxShadow = '';
                    }
                }, 400);
            });
        }
        
        // Apply enhanced 3D effects to all project cards
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 0) {
            console.log(`🚀 Applying enhanced 3D effects to ${projectCards.length} project cards`);
            
            projectCards.forEach((card, index) => {
                // Remove any existing 3D effect flag to allow re-application
                card.has3DEffect = false;
                
                // Apply the enhanced effect
                addEnhanced3DEffect(card, 1.2);
                
                console.log(`✨ Enhanced 3D effect applied to project card ${index + 1}`);
            });
        } else {
            console.log('⚠️ No project cards found for enhanced 3D effects');
        }
        
        // Also apply to tech items for consistency
        const techItems = document.querySelectorAll('.tech-item');
        if (techItems.length > 0) {
            console.log(`🎯 Applying enhanced 3D effects to ${techItems.length} tech items`);
            
            techItems.forEach((item, index) => {
                item.has3DEffect = false;
                addEnhanced3DEffect(item, 1.0);
            });
        }
        
        // Add 3D effects to profile card
        const profileCard = document.querySelector('.profile-card');
        if (profileCard) {
            console.log('🃏 Applying enhanced 3D effects to profile card');
            profileCard.has3DEffect = false;
            addEnhanced3DEffect(profileCard, 0.8); // Lighter intensity for profile card
        } else {
            console.log('⚠️ Profile card not found for enhanced 3D effects');
        }
        
        // Add 3D effects to social links
        const socialLinks = document.querySelectorAll('.social-link');
        if (socialLinks.length > 0) {
            console.log(`🔗 Applying enhanced 3D effects to ${socialLinks.length} social links`);
            
            socialLinks.forEach((link, index) => {
                link.has3DEffect = false;
                console.log(`🔗 Applying 3D effect to social link ${index + 1}: ${link.classList.toString()}`);
                addEnhanced3DEffect(link, 0.6); // Very light intensity for social links
                console.log(`✅ Enhanced 3D effect applied to social link ${index + 1}`);
            });
        } else {
            console.log('⚠️ Social links not found for enhanced 3D effects');
        }
        
        console.log('✅ Enhanced 3D effects initialization complete!');
    }, 1000); // Wait 1000ms to ensure all other scripts are done
});
