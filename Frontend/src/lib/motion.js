// Decorative scroll animations are the most expensive thing we do on the landing
// page: every animated section registers a ScrollTrigger and keeps re-rasterising
// large layers while the user scrolls. Phones and low-power devices get the same
// layout, just without the entrance animations.
//
// Keep this in sync with the `.defer-render` media query in src/index.css.
const LITE_MOTION_QUERY = '(max-width: 900px), (prefers-reduced-motion: reduce)';

export function isLiteMotion() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false;
    }

    if (window.matchMedia(LITE_MOTION_QUERY).matches) {
        return true;
    }

    const cores = navigator.hardwareConcurrency;
    return typeof cores === 'number' && cores > 0 && cores <= 4;
}
