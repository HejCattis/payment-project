require('dotenv').config();
import { app } from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}).on('error', (err) => {
    console.error(`Server startup error: ${err.message}`);
});
