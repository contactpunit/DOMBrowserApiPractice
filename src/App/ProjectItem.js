import { DomHelper } from '../Utils/DomHelper';
import { Tooltip } from './ToolTip';

export class ProjectItem {
    constructor(id, updateProjectListFunction, type) {
        this.id = id;
        this.hasActiveTooltip = false;
        this.updateProjectListHandler = updateProjectListFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
        this.connectDrag();
    }

    showMoreInfoHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        const projectElement = document.getElementById(this.id);
        const toolTipText = projectElement.dataset.extraInfo;
        const tooltip = new Tooltip(() => {
            this.hasActiveTooltip = false;
        },
        toolTipText,
        this.id);
        tooltip.attach();
        this.hasActiveTooltip = true
    }

    connectDrag() {
        document.getElementById(this.id).addEventListener('dragstart',
            (event) => {
                event.dataTransfer.setData('text/plain',
                    this.id);
                event.dataTransfer.effectAllowed = 'move';
            })
    }

    connectMoreInfoButton() {
        const projItemElement = document.getElementById(this.id);
        const moreInfoBtn = projItemElement.
            querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click',
            this.showMoreInfoHandler.bind(this))
    }

    connectSwitchButton(type) {
        const projItemElement = document.getElementById(this.id);
        let switchButton = projItemElement.querySelector('button:last-of-type');
        switchButton = DomHelper.clearEventListeners(switchButton);
        switchButton.textContent = type === 'active'
            ? 'Finish'
            : 'Activate';
        switchButton.addEventListener('click',
            this.updateProjectListHandler.bind(null,
                this.id));
    }

    update(updateProjectFunc, type) {
        this.updateProjectListHandler = updateProjectFunc;
        this.connectSwitchButton(type);

    }
}