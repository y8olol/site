// Add this temporarily to your HTML to debug device detection
console.log('=== DEVICE DETECTION DEBUG ===');
console.log('User Agent:', navigator.userAgent);
console.log('Window width:', window.innerWidth);
console.log('Touch support:', 'ontouchstart' in window);
console.log('Hardware concurrency:', navigator.hardwareConcurrency);
console.log('Device memory:', navigator.deviceMemory);

// Check the mobile detection
function detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent) || 
           'ontouchstart' in window || 
           window.innerWidth <= 768;
}

function detectLowEndDevice() {
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const deviceMemory = navigator.deviceMemory || 2;
    const isLowEnd = hardwareConcurrency <= 2 || deviceMemory <= 2;
    return isLowEnd;
}

const isMobile = detectMobile();
const isLowEndDevice = detectLowEndDevice();

console.log('Is Mobile?', isMobile);
console.log('Is Low-end device?', isLowEndDevice);
console.log('3D effects will be:', (!isMobile && !isLowEndDevice) ? 'ENABLED' : 'DISABLED');
console.log('===============================');
