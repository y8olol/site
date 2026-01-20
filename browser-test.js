// Quick 3D Browser Test - Add this to console to check browser support
// Copy and paste this in browser console (F12) to see what's wrong

console.log('🔍 RUNNING 3D BROWSER COMPATIBILITY TEST...\n');

// 1. Browser Detection
const ua = navigator.userAgent;
console.log('Browser:', ua);

const browsers = {
    Chrome: /Chrome/.test(ua) && /Google Inc/.test(navigator.vendor),
    Firefox: /Firefox/.test(ua),
    Safari: /Safari/.test(ua) && /Apple Computer/.test(navigator.vendor),
    Edge: /Edg/.test(ua),
    IE: /MSIE|Trident/.test(ua)
};

let detectedBrowser = 'Unknown';
for (let browser in browsers) {
    if (browsers[browser]) {
        detectedBrowser = browser;
        break;
    }
}
console.log('✅ Detected Browser:', detectedBrowser);

// 2. 3D Transform Support Test
const testEl = document.createElement('div');
testEl.style.transform = 'perspective(400px) rotateY(45deg)';
const supports3D = testEl.style.transform.length > 0;
console.log('✅ CSS 3D Transform Support:', supports3D ? 'YES' : 'NO');

// 3. CSS.supports API test
if (window.CSS && CSS.supports) {
    const cssSupports3D = CSS.supports('transform-style', 'preserve-3d');
    console.log('✅ CSS.supports 3D:', cssSupports3D ? 'YES' : 'NO');
} else {
    console.log('❌ CSS.supports API: Not available');
}

// 4. Hardware Acceleration Test
try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    console.log('✅ WebGL (Hardware Acceleration):', gl ? 'YES' : 'NO');
    if (gl) {
        console.log('   GPU Vendor:', gl.getParameter(gl.VENDOR));
        console.log('   GPU Renderer:', gl.getParameter(gl.RENDERER));
    }
} catch (e) {
    console.log('❌ WebGL Error:', e.message);
}

// 5. Test Current Page Elements
const projectCards = document.querySelectorAll('.project-card');
const techItems = document.querySelectorAll('.tech-item');

console.log('✅ Project Cards Found:', projectCards.length);
console.log('✅ Tech Items Found:', techItems.length);

if (projectCards.length > 0) {
    const firstCard = projectCards[0];
    const computedStyle = getComputedStyle(firstCard);
    console.log('✅ First Project Card Styles:');
    console.log('   transform-style:', computedStyle.transformStyle || computedStyle.webkitTransformStyle);
    console.log('   perspective:', computedStyle.perspective || computedStyle.webkitPerspective);
    console.log('   backface-visibility:', computedStyle.backfaceVisibility || computedStyle.webkitBackfaceVisibility);
    console.log('   will-change:', computedStyle.willChange);
}

// 6. Manual 3D Test
console.log('\n🧪 RUNNING MANUAL 3D TEST...');
if (projectCards.length > 0) {
    const testCard = projectCards[0];
    testCard.style.transition = 'transform 1s ease';
    testCard.style.transform = 'perspective(800px) rotateX(-10deg) rotateY(10deg) translateZ(20px) scale(1.1)';
    testCard.style.webkitTransform = 'perspective(800px) rotateX(-10deg) rotateY(10deg) translateZ(20px) scale(1.1)';
    testCard.style.boxShadow = '0 20px 40px rgba(255, 0, 0, 0.5)';
    
    console.log('🎮 Applied test 3D transform to first project card');
    console.log('   Look for a tilted card with red shadow');
    
    setTimeout(() => {
        testCard.style.transform = '';
        testCard.style.webkitTransform = '';
        testCard.style.boxShadow = '';
        console.log('✅ Reset test transform');
    }, 3000);
}

// 7. Check for common issues
console.log('\n🔧 CHECKING COMMON ISSUES...');

// Check if hardware acceleration is disabled
if (window.chrome && chrome.app) {
    console.log('⚠️  Chrome Apps detected - hardware acceleration may be limited');
}

// Check for privacy/performance settings
if (typeof InstallTrigger !== 'undefined') {
    console.log('🦊 Firefox detected - check about:config for gfx.webrender.enabled');
}

// Check for reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
console.log('🎭 Prefers Reduced Motion:', prefersReducedMotion ? 'YES' : 'NO');

// Check viewport
console.log('📐 Viewport Size:', window.innerWidth + 'x' + window.innerHeight);

console.log('\n🏁 TEST COMPLETE! Check above results and look for the red shadow test.');
