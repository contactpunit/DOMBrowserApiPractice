import { DomHelper } from '../Utils/DomHelper.js'
import { ProjectItem } from './ProjectItem.js'

export class ProjectList {
    constructor(type) {
        this.projects = []
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const projItem of prjItems) {
            this.projects.push(new ProjectItem(
                projItem.id,
                this.switchProject.bind(this),
                type));
        }
        this.connectDroppable();
    }

    connectDroppable() {
        const list = document.querySelector(`#${this.type}-projects ul`);
        list.addEventListener('dragover',
            (event) => {
                if (event.dataTransfer.types[0] === 'text/plain') {
                    event.preventDefault();
                }
            });
        list.addEventListener('dragenter',
            (event) => {
                if (event.dataTransfer.types[0] === 'text/plain') {
                    list.parentElement.classList.add('droppable');
                    event.preventDefault();
                }
            });

        list.addEventListener('dragleave',
            (event) => {
                if (event.relatedTarget.closest(
                    `#${this.type}-projects ul`) !== list) {
                    list.parentElement.classList.remove('droppable');
                }
            });

        list.addEventListener('drop',
            (event) => {
                const prjId = event.dataTransfer.getData('text/plain');
                if (this.projects.find((fid) => fid.id === prjId)) {
                    return;
                }
                document.
                    getElementById(prjId).
                    querySelector('button:last-of-type').
                    click();
                list.parentElement.classList.remove('droppable');
                event.preventDefault();
            })
    }

    switchProject(projId) {
        this.switchHandler(this.projects.find((pj) => pj.id === projId));
        this.projects = this.projects.filter((pj) => pj.id !== projId);
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DomHelper.moveElement(project.id,
            `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this),
            this.type);
    }
}