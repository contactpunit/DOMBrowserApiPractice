class Component {
    constructor(hostElementId, insertBefore=false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }

    detach() {
        if (this.element) {
            this.element.remove();
        }
    }

    attach() {
        // document.body.append(this.element);
        this.hostElement.insertAdjacentElement(
            this.insertBefore ? 'afterbegin' : 'beforeend', this.element
        );
    }
}

class Tooltip extends Component{
    constructor(closeNotfierFn, toolTipText, hostElementId) {
        super(hostElementId);
        this.closeNotifier = closeNotfierFn;
        this.text = toolTipText;
        this.create();
    }

    closeToolTip = () => {
        this.detach();
        this.closeNotifier();
    }

    create() {
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'card';
        tooltipElement.textContent = this.text;

        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        const hostElHeight = this.hostElement.clientHeight;
        const parentElScrolling = this.hostElement.parentElement.scrollTop;

        const x = hostElPosLeft + 20;
        const y = hostElPosTop + hostElHeight - parentElScrolling - 10;

        tooltipElement.style.position = 'absolute';
        tooltipElement.style.left = x + 'px';
        tooltipElement.style.top = y + 'px';

        tooltipElement.addEventListener('click', this.closeToolTip);
        this.element = tooltipElement;
    }
}

class DomHelper {
    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }
    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element);
    }
}

class ProjectItem {
    hasActiveTooltip = false;
    constructor(id, updateProjectListFunction, type){
        this.id = id;
        this.updateProjectListHandler = updateProjectListFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
    }

    showMoreInfoHandler() {
        if(this.hasActiveTooltip) {
            return;
        }
        const projectElement = document.getElementById(this.id);
        console.log(projectElement.dataset);
        const toolTipText = projectElement.dataset.extraInfo;
        const tooltip = new Tooltip(() => {
            this.hasActiveTooltip = false;
        }, toolTipText, this.id);
        tooltip.attach();
        this.hasActiveTooltip = true
    }

    connectMoreInfoButton() {
        const projItemElement = document.getElementById(this.id);
        let moreInfoBtn = projItemElement.querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this))
    }

    connectSwitchButton(type) {
        const projItemElement = document.getElementById(this.id);
        let switchButton = projItemElement.querySelector('button:last-of-type');
        switchButton = DomHelper.clearEventListeners(switchButton);
        switchButton.textContent = type === 'active' ? 'Finish' : 'Activate';
        switchButton.addEventListener('click', this.updateProjectListHandler.bind(null, this.id));
    }

    update(updateProjectFunc, type) {
        this.updateProjectListHandler = updateProjectFunc;
        this.connectSwitchButton(type);

    }
}

class ProjectList {
    projects = []
    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const projItem of prjItems) {
            this.projects.push(new ProjectItem(projItem.id, this.switchProject.bind(this), type));
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
        project.update(this.switchProject.bind(this), this.type);
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