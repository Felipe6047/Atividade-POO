// ✅ VARIÁVEIS GLOBAIS (Bagunçadas)
class GerenciadorTarefas {
    constructor () {
this.tarefas = [];
this.proximoId = 1;
this.listaElement = null;
this.inputElement = null;
this.btnAdicionar = null;

}
inicializar() {
    this.listaElement = document.getElementById('lista-tarefas');
    this.inputElement = document.getElementById('nova-tarefa');
    this.btnAdicionar = document.getElementById('btn-adicionar');
    
    this.carregarDoLocalStorage();
    this.renderizarTudo();
 // Eventos espalhados
    this.btnAdicionar.addEventListener('click', adicionarTarefa);
    
    this.inputElement.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            this.adicionarTarefa();
        }
    });
    
    // Eventos delegados misturados
    this.listaElement.addEventListener('click', function(e) {
        if (e.target.type === 'checkbox') {
            const li = e.target.closest('.tarefa');
            const id = parseInt(this.li.dataset.id);
            this.alternarConclusao(id);
        }
        
        if (e.target.classList.contains('btn-remover')) {
            const li = e.target.closest('.tarefa');
            const id = parseInt(this.li.dataset.id);
            this.removerTarefa(id);
        }
    });
    
    // Botões adicionais soltos
    document.getElementById('limpar-concluidas').addEventListener('click', function() {
        tarefas = tarefas.filter(t => !t.concluida);
        this.salvarNoLocalStorage();
        this.renderizarTudo();
    });
}

// ✅ FUNÇÕES SOLTAS NO ESCOPO GLOBAL
 adicionarTarefa() {
    this.descricao = this.inputElement.value.trim();
    
    if (!this.descricao) {
        alert('Digite uma tarefa!');
        return;
    }
    
    const novaTarefa = {
        id: this.proximoId++,
        descricao: this.descricao,
        concluida: false,
        dataCriacao: new Date()
    };
    
    this.tarefas.push(novaTarefa);
    this.inputElement.value = '';
    this.salvarNoLocalStorage();
    this.renderizarTudo();
}

 removerTarefa(id) {
    this.tarefas = this.tarefas.filter(t => t.id !== id);
    this.salvarNoLocalStorage();
    this.renderizarTudo();
}

alternarConclusao(id) {
    for (let i = 0; i < this.tarefas.length; i++) {
        if (this.tarefas[i].id === id) {
            this.tarefas[i].concluida = !this.tarefas[i].concluida;
            break;
        }
    }
    this.salvarNoLocalStorage();
    this.renderizarTudo();
}

// ✅ FUNÇÃO GIGANTE PARA RENDERIZAR
renderizarTudo() {
    this.listaElement.innerHTML = '';

    for (let i = 0; i < this.tarefas.length; i++) {
        const tarefa = this.tarefas[i];
        
        const li = this.document.createElement('li');
        li.className = 'tarefa';
        if (tarefa.concluida) {
           this.li.classList.add('concluida');
        }
        li.dataset.id = tarefa.id;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        
        const span = document.createElement('span');
        span.textContent = tarefa.descricao;
        
        const btnRemover = document.createElement('button');
        btnRemover.className = 'btn-remover';
        btnRemover.textContent = '×';
        btnRemover.title = 'Remover tarefa';
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnRemover);
        
        listaElement.appendChild(li);
    }
    
    // Atualizar estatísticas (código repetido em vários lugares)
    this.atualizarEstatisticas();
}

// ✅ OUTRA FUNÇÃO SOLTA
atualizarEstatisticas() {
    const totalElement = document.getElementById('total');
    const concluidasElement = document.getElementById('concluidas');
    
    if (totalElement) {
        totalElement.textContent = tarefas.length;
    }
    
    if (concluidasElement) {
        const concluidas = tarefas.filter(t => t.concluida).length;
        concluidasElement.textContent = concluidas;
    }
}

// ✅ FUNÇÕES DE LOCALSTORAGE ESPALHADAS
salvarNoLocalStorage() {
    const dados = {
        tarefas: tarefas,
        proximoId: proximoId
    };
    localStorage.setItem('todoAppSemPOO', JSON.stringify(dados));
}

carregarDoLocalStorage() {
    const dados = JSON.parse(localStorage.getItem('todoAppSemPOO'));
    
    if (dados) {
        tarefas = dados.tarefas;
        proximoId = dados.proximoId;
    }
}

// ✅ FUNÇÃO PARA EDITAR (FEITA DEPOIS, MISTURADA)
 editarTarefa(id, novaDescricao) {
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id === id) {
            tarefas[i].descricao = novaDescricao;
            break;
        }
    }
    salvarNoLocalStorage();
    renderizarTudo();
}

// ✅ FUNÇÃO PARA FILTRAR (ADICIONADA DEPOIS)
filtrarTarefas(filtro) {
    let tarefasFiltradas = [];
    
    if (filtro === 'todas') {
        tarefasFiltradas = tarefas;
    } else if (filtro === 'ativas') {
        tarefasFiltradas = tarefas.filter(t => !t.concluida);
    } else if (filtro === 'concluidas') {
        tarefasFiltradas = tarefas.filter(t => t.concluida);
    }
    
    // Código quase igual ao renderizarTudo() 😕
    listaElement.innerHTML = '';
    
    for (let i = 0; i < tarefasFiltradas.length; i++) {
        const tarefa = tarefasFiltradas[i];
        
        const li = document.createElement('li');
        li.className = 'tarefa';
        if (tarefa.concluida) {
            li.classList.add('concluida');
        }
        li.dataset.id = tarefa.id;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        
        const span = document.createElement('span');
        span.textContent = tarefa.descricao;
        
        const btnRemover = document.createElement('button');
        btnRemover.className = 'btn-remover';
        btnRemover.textContent = '×';
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnRemover);
        
        listaElement.appendChild(li);
    }
}

// ✅ INICIALIZAR QUANDO A PÁGINA CARREGAR


// ✅ MAIS FUNÇÕES ADICIONADAS SEM ORGANIZAÇÃO...
 exportarParaTexto() {
    let texto = 'Minhas Tarefas:\n\n';
    
    for (let i = 0; i < tarefas.length; i++) {
        const status = tarefas[i].concluida ? '[✓]' : '[ ]';
        texto += `${status} ${tarefas[i].descricao}\n`;
    }
    
    const blob = new Blob([texto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tarefas.txt';
    a.click();
}
}
// ... e assim vai crescendo desorganizadamente!