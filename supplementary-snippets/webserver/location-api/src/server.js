import { createApp } from "./app.js";
import { createLocationRepository } from "./repositories/location-repository.js";

const app = createApp(createLocationRepository());
const port = 3000;

app.listen(port, () => {
    console.log(`Location API is running at http://localhost:${port}`);
});
