import { Component } from './Component'

export class Tooltip extends Component {
    constructor(closeNotfierFn, toolTipText, hostElementId) {
        super(hostElementId);
        this.closeNotifier = closeNotfierFn;
        this.text = toolTipText;
        this.closeTooltip = () => {
            this.detach();
            this.closeNotifier();
        };
        this.create();
    }

    create() {
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'card';
        const tooltipTemplate = document.getElementById('tooltip');
        const tooltipBody = document.importNode(tooltipTemplate.content,
            true);
        tooltipBody.querySelector('p').textContent = this.text;
        tooltipElement.append(tooltipBody);

        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        const hostElHeight = this.hostElement.clientHeight;
        const parentElScrolling = this.hostElement.parentElement.scrollTop;

        const x = hostElPosLeft + 20;
        const y = hostElPosTop + hostElHeight - parentElScrolling - 10;
        tooltipElement.style.position = 'absolute';
        tooltipElement.style.left = `${x} + px`;
        tooltipElement.style.top = `${y} + px`;

        tooltipElement.addEventListener('click',
            this.closeToolTip);
        this.element = tooltipElement;
    }
}