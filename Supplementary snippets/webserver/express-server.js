import express from "express"
const app = express();
// '' is the root page
app.get('', (req, res) => {
    res.send('Hello express!');
});
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})