const searchUrl = "https://nominatim.openstreetmap.org/search";

export function createLocationRepository(fetchLocation = fetch) {
    return {
        async findByCity(city) {
            const url = `${searchUrl}?format=jsonv2&limit=1&q=${encodeURIComponent(city)}`;
            const response = await fetchLocation(url, {
                headers: { "User-Agent": "node-js-witchcraft-location-api" },
            });

            if (!response.ok) throw new Error("Location API request failed");

            const [result] = await response.json();
            if (!result) return null;

            return {
                latitude: Number(result.lat),
                longitude: Number(result.lon),
            };
        },
    };
}
