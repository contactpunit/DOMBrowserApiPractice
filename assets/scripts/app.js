class Tooltip {}

class DomHelper {
    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element);
    }
}

class ProjectItem {
    constructor(id, updateProjectListFunction){
        this.id = id;
        this.updateProjectListHandler = updateProjectListFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton();
    }
    connectMoreInfoButton() {}
    connectSwitchButton() {
        const projItemElement = document.getElementById(this.id);
        const switchButton = projItemElement.querySelector('button:last-of-type');
        switchButton.addEventListener('click', this.updateProjectListHandler.bind(null, this.id));
    }
}

class ProjectList {
    projects = []
    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const projItem of prjItems) {
            this.projects.push(new ProjectItem(projItem.id, this.switchProject.bind(this)));
        }
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
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');
        activeProjectList.setSwitchHandlerFunction(
            finishedProjectList.addProject.bind(finishedProjectList)
        );
        finishedProjectList.setSwitchHandlerFunction(
            activeProjectList.addProject.bind(activeProjectList)
        );

    }
}

App.init();