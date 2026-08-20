
try {
    const city = process.argv[2];
    if (!city) throw new Error(`Location Error Status: No City Provided`);

    const searchResponse = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(city)}&format=jsonv2`, {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.openstreetmap.org/'
        }
    });
    if (!searchResponse.ok) {
        throw new Error(`HTTP error! Search Status: ${searchResponse.status}`);
    }
    const [searchResponseData] = await searchResponse.json();
    const { lat: latitude, lon: longitude } = searchResponseData;

    const reverseSearchResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&zoom=10&format=jsonv2`, {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.openstreetmap.org/'
        }
    });
    if (!reverseSearchResponse.ok) {
        throw new Error(`HTTP error! Reverse Search Status: ${reverseSearchResponse.status}`);
    }
    const reverseSearchResponseData = await reverseSearchResponse.json();

    const { display_name, place_id } = reverseSearchResponseData;
    console.log("Display Name: ", display_name);
    console.log("Place ID: ", place_id);
} catch (error) {
    console.error('Fetch failed:', error.message);
}
