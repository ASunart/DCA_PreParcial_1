import '../TaskItem/index.js'

class TaskList extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
        this.tasks = []
    }

    connectedCallback(){
        this.render()

        const form = this.shadowRoot.querySelector('.task-form')
        form.addEventListener("submit", (e)=>{
            e.preventDefault()
        
            const title = this.shadowRoot.querySelector('.input-title').value
            const description = this.shadowRoot.querySelector('.input-description').value

            this.tasks.push({title, description, state: false})

            this.addTask({title, description, state: false})
            
            form.reset()
        })
    }

    render(){
        this.shadowRoot.innerHTML = `
        <h2>Task List</h2>
        <form class="task-form">
            <input type="text" placeholder="Titulo" class="input-title" required>
            <input type="text" placeholder="Descripcion" class="input-description" required>
            <button>Agregar tarea</button>
        </form>
        <ul class="tasks-container">
        </ul>
        `

        this.tasks.forEach(task => this.addTask(task))
    }

    addTask({title, description, state}){
        
        const tasksContainer = this.shadowRoot.querySelector('.tasks-container')
        tasksContainer.innerHTML += `
        <task-item title="${title}" description="${description}" state="${state}"></task-item>
        `

        // const taskItem = document.createElement('task-item')
        // taskItem.setAttribute('title', title)
        // taskItem.setAttribute('description', description)
        // taskItem.setAttribute('state', state)

        // this.shadowRoot.querySelector('.tasks-container').appendChild(taskItem)

    }
}

customElements.define('task-list', TaskList)
export default TaskList