// DYNAMIC TEXT SCALING - Auto-adjust font sizes to prevent layout overlap
// This script scales project description text to fit perfectly within available space

document.addEventListener('DOMContentLoaded', function() {
    // Wait for projects to load and other scripts to complete
    setTimeout(function() {
        console.log('🎯 Starting dynamic text scaling for project descriptions...');
        initializeDynamicTextScaling();
    }, 2000); // Wait for projects to load and DOM to stabilize
});

function initializeDynamicTextScaling() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length === 0) {
        console.log('⚠️ No project cards found for text scaling');
        return;
    }

    console.log(`📏 Processing ${projectCards.length} project cards for dynamic scaling`);
    
    projectCards.forEach((card, index) => {
        scaleProjectDescription(card, index);
    });
    
    // Re-run scaling when window is resized
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('🔄 Re-scaling text after window resize');
            projectCards.forEach((card, index) => {
                scaleProjectDescription(card, index);
            });
        }, 250);
    });
}

function scaleProjectDescription(card, index) {
    const description = card.querySelector('.project-description');
    const statsSection = card.querySelector('.project-stats');
    
    if (!description || !statsSection) {
        console.log(`⚠️ Card ${index + 1}: Missing description or stats section`);
        return;
    }
    
    // Configuration
    const config = {
        maxFontSize: 0.7,    // Maximum font size in rem (original)
        minFontSize: 0.5,    // Minimum font size in rem (readability limit)
        stepSize: 0.05,      // Font size reduction steps
        targetMargin: 8,     // Minimum margin between description and stats (px)
        maxIterations: 10    // Safety limit for scaling attempts
    };
    
    // Get original styles
    const originalFontSize = parseFloat(window.getComputedStyle(description).fontSize);
    const remToPixel = originalFontSize / 0.7; // Calculate rem to pixel ratio
    
    // Reset to maximum size
    description.style.fontSize = config.maxFontSize + 'rem';
    description.style.lineHeight = '1.3';
    
    // Force layout recalculation
    card.offsetHeight;
    
    let currentFontSize = config.maxFontSize;
    let iterations = 0;
    
    // Iteratively reduce font size until text fits
    while (iterations < config.maxIterations && currentFontSize >= config.minFontSize) {
        const descriptionRect = description.getBoundingClientRect();
        const statsRect = statsSection.getBoundingClientRect();
        
        const descriptionBottom = descriptionRect.bottom;
        const statsTop = statsRect.top;
        const availableSpace = statsTop - descriptionBottom;
        
        // Check if we have enough space
        if (availableSpace >= config.targetMargin) {
            console.log(`✅ Card ${index + 1}: Optimal fit at ${currentFontSize.toFixed(2)}rem (${availableSpace.toFixed(0)}px margin)`);
            break;
        }
        
        // Reduce font size
        currentFontSize = Math.max(config.minFontSize, currentFontSize - config.stepSize);
        description.style.fontSize = currentFontSize + 'rem';
        
        // Adjust line height for better space utilization
        const lineHeight = currentFontSize < 0.6 ? 1.2 : 1.3;
        description.style.lineHeight = lineHeight;
        
        // Force layout recalculation
        card.offsetHeight;
        
        iterations++;
        
        // Debug logging
        if (iterations === 1) {
            console.log(`📐 Card ${index + 1}: Started scaling from ${config.maxFontSize}rem (needed ${Math.abs(availableSpace).toFixed(0)}px more space)`);
        }
    }
    
    // Final check and fallback
    if (iterations >= config.maxIterations) {
        console.log(`⚠️ Card ${index + 1}: Reached max iterations, applying fallback`);
        applyFallbackSolution(description, config);
    } else if (currentFontSize <= config.minFontSize) {
        console.log(`⚠️ Card ${index + 1}: Reached minimum font size (${config.minFontSize}rem), applying line-clamp fallback`);
        applyFallbackSolution(description, config);
    }
    
    // Add smooth transition for font changes
    description.style.transition = 'font-size 0.3s ease, line-height 0.3s ease';
    
    // Mark as processed
    description.setAttribute('data-scaled', 'true');
    description.setAttribute('data-final-size', currentFontSize + 'rem');
}

function applyFallbackSolution(description, config) {
    // Apply minimum font size and line clamping as fallback
    description.style.fontSize = config.minFontSize + 'rem';
    description.style.lineHeight = '1.2';
    
    // Add line clamping for extremely long text
    description.style.display = '-webkit-box';
    description.style.webkitBoxOrient = 'vertical';
    description.style.webkitLineClamp = '4'; // Maximum 4 lines at minimum size
    description.style.overflow = 'hidden';
    description.style.textOverflow = 'ellipsis';
    
    console.log('🔒 Applied fallback: minimum font + 4-line clamp');
}

// Utility function to recalculate scaling (for dynamic content updates)
function recalculateTextScaling() {
    console.log('🔄 Recalculating text scaling...');
    const scaledDescriptions = document.querySelectorAll('.project-description[data-scaled="true"]');
    
    scaledDescriptions.forEach((desc, index) => {
        // Reset scaling attributes
        desc.removeAttribute('data-scaled');
        desc.removeAttribute('data-final-size');
        
        // Remove fallback styles
        desc.style.display = '';
        desc.style.webkitBoxOrient = '';
        desc.style.webkitLineClamp = '';
        desc.style.overflow = '';
        desc.style.textOverflow = '';
        
        // Find parent card and re-scale
        const card = desc.closest('.project-card');
        if (card) {
            scaleProjectDescription(card, index);
        }
    });
}

// Export for external use
window.DynamicTextScaling = {
    initialize: initializeDynamicTextScaling,
    recalculate: recalculateTextScaling
};

console.log('📏 Dynamic Text Scaling module loaded');
