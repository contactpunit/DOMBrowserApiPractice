class Tooltip {}

class ProjectItem {
    constructor(id){
        this.id = id
        this.connectMoreInfoButton()
        this.connectSwtchButton()
    }
    connectMoreInfoButton() {}
    connectSwtchButton() {
        const projItemElement = document.getElementById(this.id);
        const switchButton = projItemElement.querySelector('button:last-of-type')
        switchButton.addEventListener('click',)
    }
}

class ProjectList {
    projects = []
    constructor(type) {
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const projItem of prjItems) {
            this.projects.push(new ProjectItem(projItem.id))
        }
        console.log(this.projects)
    }

    // addProject() {}

    // switchProject(projId) {
    //     this.projects = this.projects.filter(p => p.id === projId)
    // }
}

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');
    }
}

App.init();