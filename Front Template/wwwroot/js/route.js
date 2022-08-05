// desarrollo
//const server = 'https://localhost:44347/';
const origin = 'https://localhost:7012/';
//const gen = 'http://localhost:44329/';

// qa
//const server = 'http://qa.cygnus.cl:9001/';
//const origin = 'http://qa.cygnus.cl:8001/';
//const gen = 'https://qa.cygnus.cl:9020/';

//produccion
const server = 'https://vacb.cygnus.cl/';
//const origin = 'https://vac.cygnus.cl/';
const gen = 'https://prod.cygnus.cl:9020/';

function host() {    
    return server;
}

function origen() {
    return origin;
}

function generico() {
    return gen;
}