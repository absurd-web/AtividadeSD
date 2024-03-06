const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');
const { Buffer } = require('node:buffer');

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
    message = JSON.parse(msg);
    console.log(`server got: ${message.valor} from ${rinfo.address}:${rinfo.port}`);
    cotacao = Math.floor(Math.random() * 10);
    const novoValor = message.valor * cotacao;
    const messageBuffer = Buffer.from(
      JSON.stringify(
        {novoValor:novoValor,
        cotacao:cotacao}
      )
    );
    server.send(messageBuffer, rinfo.port, rinfo.address, (err) => {
      if(err){
        console.log(err);
      }
    });
});
server.bind(41234);
