// Dados fixos da conta bancária
const contaBancaria = {
    titular: 'Maria Oliveira',
    agencia: '0001',
    numeroConta: '12345-6',
    saldo: 500.00
};

// Formatação do saldo no padrão de moeda em Reais (R$)
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Atualiza a interface com o saldo formatado
function atualizarTela() {
    document.getElementById('saldoDisplay').innerText =
        formatarMoeda(contaBancaria.saldo);
}

// Exibe mensagens de feedback ao usuário
function exibirMensagem(texto, tipo) {
    const msgDiv = document.getElementById('mensagem');

    msgDiv.innerText = texto;
    msgDiv.className = `message ${tipo}`;
}

// Operação de Débito (Saque) com validação de saldo
function realizarDebito() {
    const input = document.getElementById('valorInput');
    const valor = parseFloat(input.value);

    // Validação do valor informado
    if (isNaN(valor) || valor <= 0) {
        exibirMensagem(
            '❌ Por favor, informe um valor válido maior que zero.',
            'error'
        );
        return;
    }

    // Validação do saldo disponível
    if (valor > contaBancaria.saldo) {
        exibirMensagem(
            `❌ Saldo insuficiente! Seu saldo atual é ${formatarMoeda(contaBancaria.saldo)}.`,
            'error'
        );
        return;
    }

    // Realiza o débito
    contaBancaria.saldo -= valor;

    // Atualiza a tela
    atualizarTela();

    // Exibe mensagem de sucesso
    exibirMensagem(
        `✅ Débito de ${formatarMoeda(valor)} realizado com sucesso!`,
        'success'
    );

    // Limpa o campo de valor
    input.value = '';
}

// Operação de Crédito (Depósito)
function realizarCredito() {
    const input = document.getElementById('valorInput');
    const valor = parseFloat(input.value);

    // Validação do valor informado
    if (isNaN(valor) || valor <= 0) {
        exibirMensagem(
            '❌ Por favor, informe um valor válido maior que zero.',
            'error'
        );
        return;
    }

    // Realiza o crédito
    contaBancaria.saldo += valor;

    // Atualiza a tela
    atualizarTela();

    // Exibe mensagem de sucesso
    exibirMensagem(
        `✅ Crédito de ${formatarMoeda(valor)} realizado com sucesso!`,
        'success'
    );

    // Limpa o campo de valor
    input.value = '';
}

// Configuração dos escutadores de eventos no carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    atualizarTela();

    document
        .getElementById('btnDebito')
        .addEventListener('click', realizarDebito);

    document
        .getElementById('btnCredito')
        .addEventListener('click', realizarCredito);
});
