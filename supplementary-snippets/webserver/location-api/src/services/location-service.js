export function createLocationService(locationRepository) {
    return {
        findCoordinates(city) {
            return locationRepository.findByCity(city);
        },
    };
}