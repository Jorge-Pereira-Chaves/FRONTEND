const input = document.getElementById("tarefaInput");
const botao = document.getElementById("adicionarBtn");
const lista = document.getElementById("listaTarefas");

// Adicionar tarefa
botao.addEventListener("click", function () {
    const texto = input.value.trim();

    if (texto === "") {
        return;
    }

    const li = document.createElement("li");

    li.textContent = texto;

    lista.appendChild(li);

    input.value = "";
    input.focus();
});

// Delegação de eventos para remover tarefas
lista.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        event.target.remove();
    }
});