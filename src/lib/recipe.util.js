/*eslint-disable */
const d3 = require('d3');

export let container;

export const radius = 20;

const height = 100;
const width = 800;
const startOffset = 25;

let prevTime = 0;

let colors = ['#f44336','#673ab7','#009688','#ffc107','#607dbb'];

export
let colorScale = d3.scaleLinear().range(colors).domain([0,1,2,3,4,5]);

let previous = `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="90" viewBox="0 0 40 40" width="90">
                  <path stroke="green" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
                </svg>`;

let next = `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="90" viewBox="0 0 40 40" width="90">
                <path stroke="green" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>`;

export
function initContainer(element) {
    if (container === undefined) {
        container = d3.select('#' + element)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .style('margin-top','20px')
          .append('g')
          .attr('id','step-group');

        //set up control buttons for visualization
        addControlButtons();
        addMethodContainer(element);
    }
}

export
function addStepper(step) {
    //stepper needs to be overlayed on top of steps, so remove and re add. 
    let stepper = d3.select('.stepper');
    let stepperPosition = 0;

    if(!_.isNull(stepper.node())) {
      stepperPosition = stepper.node().cx.baseVal.value;    
    } else {
       //var now = parseInt(step.time);
       stepperPosition = 25;
    }

    stepper.remove(); 

    container
        .append('circle')
        .attr('class','stepper')
        .attr('cx', stepperPosition) 
        .attr('cy', '35') 
        //.attr('cy', function() {
        //  var index = _.indexOf(categories, step.category);
        //  return 30 * (index + 1);
        //})
        .attr('r', ( radius / 2) )
        .attr('fill', 'green');
}

/**
 * Moves stepper to prev or next step 
 */
export
function moveStep(direction, target) {
  let steps = d3.selectAll('.step');
  let targetStep = '';
  let currentPos = d3.select('.stepper').node().cx.baseVal.value;

  if(direction === 'previous') {

    let prevs = steps.filter(function() {
      return this.cx.baseVal.value < currentPos;
    });

    let max =  d3.max(prevs.nodes(), function(circle) {
      return circle.cx.baseVal.value; 
    });

    targetStep =  steps.filter(function() {
      return this.cx.baseVal.value === max; 
    });

    d3.select('.stepper')
      .attr('fill','blue')
      .transition()
      .duration(500)
      .attr('fill','green')
      .attr('cx', max);

  } else {

    let nexts = steps.filter(function() {
      return this.cx.baseVal.value > currentPos;
    });

    let min =  d3.min(nexts.nodes(), function(circle) {
      return circle.cx.baseVal.value; 
    });

    targetStep =  steps.filter(function() {
      return this.cx.baseVal.value === min; 
    });

    d3.select('.stepper')
      .attr('fill','blue')
      .transition()
      .duration(500)
      .attr('fill','green')
      .attr('cx', min);
  }

  console.log(targetStep.datum().method);
  d3.select('#recipe-method')
    .select('span')
    .transition()
    .duration(500)
    .text(targetStep.datum().method);

}

export
function getStepX(step) {
  var now = parseInt(step.time);
  var cx = prevTime + now;
  if(prevTime === 0) {
    prevTime = cx; 
    return startOffset;
  }
  prevTime = cx; 
  return cx * startOffset;
}

export
function rescale() {
  let steps = d3.selectAll('.step');

  let max =  d3.max(steps.nodes(), function(circle) {
    return circle.cx.baseVal.value; 
  });

  if(max > 800) {
    d3.select('#step-group')
      .transition()
      .duration(500)
      //.attr('transform', 'scale(0.' + ( max / 100 ) + ')');
      .attr('transform', 'scale(0.7)');
  }
}

export
function getLineData() {
  let lineData = [];
  let steps = d3.selectAll('.step');
  steps.each(function(d) {
    //get x of step and y
    let x = this.cx.baseVal.value;
    let y = this.cy.baseVal.value;
    lineData.push({ 'x':x, 'y':y });
  });
  return lineData;
    
}

function addControlButtons() {
    container
        .append('g')
        .attr('class','previous')
        .attr('transform', 'translate(0, ' + ( height - 40 ) + ')')
        .html(previous)
        .style('cursor','pointer')
        .on('click', function() {
          moveStep('previous');
        });

    container
        .append('g')
        .attr('class','next')
        .attr('transform', 'translate(' + ( startOffset * 2 ) + ',' + ( height - 40 ) + ')')
        .html(next)
        .style('cursor','pointer')
        .on('click', function() {
          moveStep('next');
        });

}

function addMethodContainer(element) {
  d3.select('#' + element)
    .append('div')
    .attr('id','recipe-method')
    .attr('class','md-card')
    // .style('position','absolute')
    // .style('top','190px')
    // .style('left','290px')
    .style('margin','20px')
    .style('padding','10px')
    .html(`<span class="md-body-1"></span>`);
    //.html(`<span class="md-body-1">${method}</span>`);
}

/*eslint-enable */
