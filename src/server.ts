import { Server } from 'http';
import app from './app';

const PORT = process.env.PORT || 5000;

let server: Server;

function main() {
   server = app.listen(PORT, () => {
      console.log(`Server is ready at http://localhost:${PORT}`);
   });
}

main();
