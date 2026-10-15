// Shown while a lazily-loaded route chunk is being fetched so the app never
// renders a blank screen.
function RouteLoader({ label = 'Loading…' }) {
    return (
        <div className="route-loader" role="status" aria-live="polite">
            <span className="spinner" aria-hidden="true" />
            <span>{label}</span>
        </div>
    );
}

export default RouteLoader;
