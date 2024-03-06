const net = require('net');
const { Buffer } = require('node:buffer');

//criar o socket
const server = net.createServer(function(socket) {
    socket.on('data', (msg) => {
    message = JSON.parse(msg);
    console.log(`server got: ${message.valor}`);
    cotacao = Math.floor(Math.random() * 10);
    const novoValor = message.valor * cotacao;
    const messageBuffer = Buffer.from(
        JSON.stringify(
        {novoValor:novoValor,
        cotacao:cotacao}
        )
    );
    socket.write(messageBuffer);
    });
});

server.listen(8124, 'localhost', () => {
  console.log('server listening');
});


