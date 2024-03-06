const net = require('net');
const client = new net.Socket();
const { Buffer } = require('node:buffer');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

client.connect(8124, 'localhost', () => {
  console.log('Client connected');
});

client.on('data', (msg) => {
    resposta = JSON.parse(msg);
    console.log(`O valor pós conversão é de R$: ${resposta.novoValor} devido a cotação de: ${resposta.cotacao}.`);
    client.end();
});

const message = {valor:'0',moeda:'dolar'};

rl.question('Informe o valor original, em reais. \n', (res1) => {
    rl.question('Informe a moeda para a conversão. \n', (res2) => {
        message.valor = res1;
        message.moeda = res2;
        const messageBuffer = Buffer.from(JSON.stringify(message));
        client.write(messageBuffer);
        rl.close();
    });
});


