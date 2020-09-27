import { ProjectItem } from './ProjectItem.js'
import { DomHelper } from '../Utils/DomHelper.js'

export class ProjectList {
    projects = []
    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const projItem of prjItems) {
            this.projects.push(new ProjectItem(projItem.id, this.switchProject.bind(this), type));
        }
        this.connectDroppable();
    }

    connectDroppable() {
        const list = document.querySelector(`#${this.type}-projects ul`);
        list.addEventListener('dragover', event => {
            if (event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
            }
        });
        list.addEventListener('dragenter', event => {
            if (event.dataTransfer.types[0] === 'text/plain') {
                list.parentElement.classList.add('droppable');
                event.preventDefault();
            }
        });

        list.addEventListener('dragleave', event => {
            if(event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
                list.parentElement.classList.remove('droppable');
            } 
        });

        list.addEventListener('drop', event =>  {
            const prjId = event.dataTransfer.getData('text/plain');
            if(this.projects.find(f => f.id === prjId)) {
                return;
            }
            document
            .getElementById(prjId)
            .querySelector('button:last-of-type')
            .click();
            list.parentElement.classList.remove('droppable');
            event.preventDefault();
        })
    }

    switchProject(projId) {
        this.switchHandler(this.projects.find(p => p.id === projId));
        this.projects = this.projects.filter(p => p.id !== projId);
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DomHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
    }
}
