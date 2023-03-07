const tarefa = document.getElementById('tarefa')
const botao =  document.getElementById('adicionar')
const lista = document.getElementById('lista')

const validarEntrada = () => tarefa.value.trim().length > 0


const adicionarTarefa = ()=>{
    const valido = validarEntrada()
    if(!valido){
        tarefa.classList.add('erro')
    } 
       

        const item = document.createElement('div')
        item.classList.add('item')

        const p = document.createElement('p')
        p.innerHTML = tarefa.value
        item.appendChild(p)
        
        item.addEventListener('click', () => concluirTarefa(p))


        const icone = document.createElement('i')
        icone.classList.add('fa-solid')
        icone.classList.add('fa-trash')
        item.appendChild(icone)

        icone.addEventListener('click', () => deletarTarefa(item, p))

        lista.appendChild(item)

        tarefa.value = ''
        atualizarArmazenamento()
    }


const concluirTarefa = (elemento) => {
    const tarefas = lista.childNodes

    for (const tarefa of tarefas){
        if(tarefa.firstChild === elemento){
            tarefa.firstChild.classList.toggle('concluido')
        }
    }
    
    atualizarArmazenamento()

}

const deletarTarefa = (item, p) => {
    const tarefas = lista.childNodes

    for (const tarefa of tarefas){
        
        if(tarefa.firstChild === p){
            item.remove()
        }
    }
    
    atualizarArmazenamento()

}

const mudanca = () =>{
    const valido = validarEntrada()
    if(valido){
        tarefa.classList.remove('erro')
    }
}


const atualizarArmazenamento = () => {
    const tarefas = lista.childNodes
   
    const memoria = [...tarefas].map(task => {
        const conteudo = task.firstChild
        const isCompleted = conteudo.classList.contains('concluido')

        return {descricao: conteudo.innerText, isCompleted}
    })

    localStorage.setItem('tarefas', JSON.stringify(memoria)   )
}

const trazertarefas = () =>{
    const tarefasMemoria = JSON.parse(localStorage.getItem('tarefas'))

    if(!tarefasMemoria){return}
    
    for (const tarefa of tarefasMemoria){
        const item = document.createElement('div')
        item.classList.add('item')
    
        const p = document.createElement('p')
        p.innerText = tarefa.descricao
        item.appendChild(p)

        if(tarefa.isCompleted){
            p.classList.add('concluido')
        }
    
    
        p.addEventListener('click', () => concluirTarefa(p))
    
        const icone = document.createElement('i')
        icone.classList.add('fa-solid')
        icone.classList.add('fa-trash')
        item.appendChild(icone)
    
        icone.addEventListener('click', () => deletarTarefa(item, p))
    
        lista.appendChild(item)
    
        tarefa.value = ''
    
        
    
        
    }
    
}
trazertarefas()
botao.addEventListener("click", adicionarTarefa)
tarefa.addEventListener("change", mudanca)



