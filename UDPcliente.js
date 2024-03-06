const dgram = require('node:dgram');
const client = dgram.createSocket('udp4');
const { Buffer } = require('node:buffer');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

client.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    server.close();
});

client.on('message', (msg, rinfo) => {
    resposta = JSON.parse(msg);
    console.log(`O valor pós conversão é de: ${resposta.novoValor} devido a cotação de: ${resposta.cotacao}.`);
    client.close();
});

const message = {valor:'0',moeda:'dolar'};

rl.question('Informe o valor original, em reais. \n', (res1) => {
    rl.question('Informe a moeda para a conversão. \n', (res2) => {
        message.valor = res1;
        message.moeda = res2;
        const messageBuffer = Buffer.from(JSON.stringify(message));
        client.send(messageBuffer, 41234, 'localhost', (err) => {
            if(err){
                console.log(err);
            }
        });
        rl.close();
    });
});


