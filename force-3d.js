// FORCE 3D EFFECTS - Override device detection
// Add this script BEFORE script.js to force 3D effects

window.FORCE_3D_EFFECTS = true;

// Override device detection methods
const originalProfileLoader = window.ProfileLoader;

// Patch the ProfileLoader constructor if it exists
if (typeof window.ProfileLoader !== 'undefined') {
    const OriginalProfileLoader = window.ProfileLoader;
    window.ProfileLoader = class extends OriginalProfileLoader {
        constructor() {
            super();
            // Force enable 3D effects
            this.isMobile = false;
            this.isLowEndDevice = false;
            console.log('🚀 FORCED 3D EFFECTS ENABLED');
            
            // Re-run interactivity setup with 3D effects enabled
            setTimeout(() => {
                this.addInteractivity();
            }, 100);
        }

        detectMobile() {
            return false; // Always return false to force desktop mode
        }

        detectLowEndDevice() {
            return false; // Always return false to force high-end mode
        }
    };
} else {
    // If ProfileLoader doesn't exist yet, set up a flag for it
    window.DEVICE_OVERRIDE = {
        isMobile: false,
        isLowEndDevice: false
    };
}
