let carrinho =  [];

function atualizarContador() {
    document.getElementById('contador-carrinho').textContent = carrinho.length;
    atualizarCarrinhoModal();
    
}

function adicionarAoCarrinho(nome, preco) {
    const item = {
        nome: nome,
        preco: preco,
        id: Date.now()
    };
    
    carrinho.push(item);
    atualizarContador();
    
   
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = `${nome} adicionado ao carrinho!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarContador();
}

function atualizarCarrinhoModal() {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    
    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = 'Seu carrinho está vazio';
        totalCarrinho.textContent = 'Total: R$ 0,00';
    } else {
        itensCarrinho.innerHTML = carrinho.map(item => `
            <div class="item-carrinho">
                <span>${item.nome}</span>
                <div>
                    <span>R$ ${item.preco.toFixed(2)}</span>
                    <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">Remover</button>
                </div>
            </div>
        `).join('');
        
        const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
        totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

function toggleCarrinho() {
    const modal = document.getElementById('carrinho-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function exibirDataAtual() {
    const dataAtual = new Date();
    const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR', opcoes);
    const elementoData = document.getElementById('data-atual');
    if (elementoData) {
        elementoData.textContent = `Hoje é ${dataFormatada}`;
    }
}



document.addEventListener('DOMContentLoaded', () => {
    atualizarContador();
    exibirDataAtual();
    
    
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('carrinho-modal');
        const btnCarrinho = document.getElementById('btn-carrinho');
        
        if (modal.style.display === 'block' && 
            !modal.contains(e.target) && 
            !btnCarrinho.contains(e.target)) {
            modal.style.display = 'none';
        }
    });
});