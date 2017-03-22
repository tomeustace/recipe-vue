/*eslint-disable */
//TODO update to use micro libraries instead of whole d3 lib!!
const d3 = require('d3');
const _ = require('lodash');

const steps = [];

import { initContainer, addStepper, moveStep, getStepX, getLineData, rescale, container, colorScale, radius } from './recipe.util';


function addNewStep(step) {
    let visStep = { time: step.time, method: step.method };
    steps.push(visStep);

    if (container === undefined) {
        initContainer('recipe-visualization');
    }

    /*eslint-disable */
    container
        .selectAll('.step')
        .data(steps)
        .enter()
        .append('circle')
        .attr('class','step')
        .attr('cx', getStepX(visStep) ) 
        .attr('cy', '34')
        .attr('r', radius)
        .attr('fill', 'white')
        .attr("stroke-width", 2)
        .attr('stroke', 'green');

     let lineFunction = d3.line()
                     .x(function(d) { return d.x; })
                     .y(function(d) { return d.y; });

     let path = container.insert("path","circle")
                            .attr("d", lineFunction(getLineData()))
                            .attr("stroke", "green")
                            .attr("stroke-width", 4)
                            .attr("stroke-dasharray", "4,4")
                            .attr("fill", "none");



     //Check if the scale needs to be altered to accomadate new step
     rescale();
     //Add stepper after other circles as it needs to be overlayed on circles
     addStepper(visStep);
    /*eslint-enable */
}

export default addNewStep;
