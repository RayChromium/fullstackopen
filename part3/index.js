const http = require('http');

const app = http.createServer( ( request, respond ) => {
    respond.writeHead( 200, { 'Content-Type' : 'text/plain' } );
    respond.end( 'Hello World!' );
} );

const PORT = 3001;

app.listen(PORT);
console.log( `Server running on port ${PORT}` );