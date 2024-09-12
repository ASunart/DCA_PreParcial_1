class TaskItem extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes(){
        return ['title', 'description', 'state']
    }

    connectedCallback(){
        this.render()
    }

    attributeChangedCallback(propName, oldValue, newValue){
        this.render()
        if (oldValue !== newValue) {
            this[propName] = propName === 'state' ? newValue === 'true' : newValue
            this.render()
        }
    }

    toggleTask(){
        this.state = !this.state
        this.render()
    }

    render(){
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./src/components/TaskItem/styles.css">
        <li class=${this.state ? "completed" : "task"}>
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <p>${!this.state ? "Pendiente" : "Completada"}</p>
            <input type="checkbox" ${this.state ? "checked" : ""} class="task-checkbox">
        </li>
        `

        const checkbox = this.shadowRoot.querySelector('.task-checkbox')
        checkbox.addEventListener('change', () => this.toggleTask())
    }
}

customElements.define('task-item', TaskItem)
export default TaskItem