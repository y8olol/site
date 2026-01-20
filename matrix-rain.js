// MATRIX RAIN EFFECT - Subtle background animation
// Add this as a cool optional feature

class MatrixRain {
    constructor() {
        this.container = null;
        this.columns = [];
        this.characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?';
        this.isRunning = false;
        this.animationFrameId = null;
    }

    init() {
        // Only run on desktop for performance
        if (window.innerWidth <= 768 || 'ontouchstart' in window) {
            console.log('📱 Matrix rain disabled on mobile for performance');
            return;
        }

        console.log('🌊 Initializing Matrix rain effect...');
        this.createContainer();
        this.createColumns();
        this.start();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'matrix-rain';
        document.body.appendChild(this.container);
    }

    createColumns() {
        const columnWidth = 20; // Width of each character column
        const numColumns = Math.floor(window.innerWidth / columnWidth);
        
        for (let i = 0; i < numColumns; i++) {
            if (Math.random() > 0.7) { // Only show 30% of possible columns for subtle effect
                this.createColumn(i * columnWidth);
            }
        }
    }

    createColumn(left) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${left}px`;
        
        // Random animation duration between 3-8 seconds
        const duration = 3 + Math.random() * 5;
        column.style.animationDuration = `${duration}s`;
        
        // Random delay to stagger the start
        const delay = Math.random() * 2;
        column.style.animationDelay = `${delay}s`;
        
        // Create character string for this column
        const height = Math.floor(20 + Math.random() * 20); // 20-40 characters
        let charString = '';
        
        for (let i = 0; i < height; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            charString += char + '\n';
        }
        
        column.textContent = charString;
        this.container.appendChild(column);
        this.columns.push(column);
        
        // Remove and recreate after animation completes
        setTimeout(() => {
            if (this.container.contains(column)) {
                this.container.removeChild(column);
                const index = this.columns.indexOf(column);
                if (index > -1) {
                    this.columns.splice(index, 1);
                }
                
                // Recreate with new content
                if (this.isRunning) {
                    setTimeout(() => {
                        this.createColumn(left);
                    }, Math.random() * 3000); // Random respawn delay
                }
            }
        }, (duration + delay) * 1000);
    }

    start() {
        this.isRunning = true;
        console.log('✅ Matrix rain effect started');
    }

    stop() {
        this.isRunning = false;
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
            this.columns = [];
        }
        console.log('🛑 Matrix rain effect stopped');
    }

    // Method to toggle the effect
    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.init();
        }
    }
}

// Initialize Matrix rain effect when page loads
let matrixRain = null;

document.addEventListener('DOMContentLoaded', function() {
    // Add a 3 second delay so it doesn't interfere with other loading
    setTimeout(() => {
        matrixRain = new MatrixRain();
        matrixRain.init();
    }, 3000);
    
    // Optional: Add keyboard shortcut to toggle (Ctrl+M)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            if (matrixRain) {
                matrixRain.toggle();
            }
        }
    });
});

// Export for manual control if needed
window.MatrixRain = MatrixRain;
