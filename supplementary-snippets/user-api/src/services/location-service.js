export function createLocationService(fetchLocation = fetch) {
    return {
        async findByCity(city) {
            const response = await fetchLocation(
                `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(city)}`,
                {
                    headers: { "User-Agent": "node-js-witchcraft-user-api" },
                    signal: AbortSignal.timeout(5000),
                },
            );

            if (!response.ok) {
                const error = new Error("Location service failed");
                error.statusCode = 502;
                throw error;
            }

            const [location] = await response.json();
            if (!location) {
                const error = new Error("Location not found");
                error.statusCode = 404;
                throw error;
            }

            return {
                name: location.display_name,
                latitude: location.lat,
                longitude: location.lon,
            };
        },
    };
}
