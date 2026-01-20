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
                const maxRotation = 20; // Increased for more dramatic effect
                const maxTranslation = 8;
                
                // More responsive rotations
                const rotateX = Math.max(-maxRotation, Math.min(maxRotation, 
                    (mouseY - centerY) / rect.height * -20 * intensity));
                const rotateY = Math.max(-maxRotation, Math.min(maxRotation, 
                    (mouseX - centerX) / rect.width * 20 * intensity));
                
                const translateX = Math.max(-maxTranslation, Math.min(maxTranslation,
                    (mouseX - centerX) / rect.width * 6 * intensity));
                const translateY = Math.max(-maxTranslation, Math.min(maxTranslation,
                    (mouseY - centerY) / rect.height * 6 * intensity));
                
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
                        scale(${(1 + intensity * 0.03).toFixed(3)})
                    `;
                    
                    // Dynamic shadow based on rotation
                    const shadowX = Math.max(-15, Math.min(15, rotateY * -0.8));
                    const shadowY = Math.max(5, Math.min(25, rotateX * 0.8 + 15));
                    const shadowBlur = 15 + Math.abs(rotateX) * 0.5 + Math.abs(rotateY) * 0.5;
                    
                    element.style.boxShadow = `
                        ${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px ${shadowBlur.toFixed(1)}px rgba(0, 0, 0, 0.3),
                        0 0 20px rgba(255, 255, 255, 0.1)
                    `;
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
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) translateZ(0px) scale(1)';
                
                // Reset shadow after transition
                setTimeout(() => {
                    if (!isHovering) {
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
        
        console.log('✅ Enhanced 3D effects initialization complete!');
    }, 500); // Wait 500ms for main script to finish
});
