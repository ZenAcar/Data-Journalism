var svgWidth = 800;
var svgHeight = 500;

var margin = {
    top: 50,
    right: 40,
    bottom: 100,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.

var svg = d3.select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//-----------------------------------------------------------

// (async function() {
//     // file = "assets/data/data.csv";

d3.csv("https://media.githubusercontent.com/media/the-Coding-Boot-Camp-at-UT/UT-MCC-DATA-PT-01-2020-U-C/master/homework-instructions/16-D3/Instructions/StarterCode/assets/data/data.csv?token=AOMKT4NWVSSVLQA2SD6TT526Y563I").then(successHandle, errorHandle);

function errorHandle(error) {
    throw err;
}

function successHandle(data) {

    data.forEach(function(d) {
        d.poverty = +d.poverty;
        d.smokes = +d.smokes;
    });
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(data, d => d.poverty)])
        .range([0, width]);
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.smokes)])
        .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) { return (`${d.state}<br> in Poverty: ${d.poverty}<br> Smokers: ${d.smokes}`) });
    svg.call(tool_tip);

    var circleGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", ".5")
        .on('mouseover', tool_tip.show)
        .on('mouseover', tool_tip.show);


    chartGroup.append("g").selectAll("text").data(data)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("dx", d => xLinearScale(d.poverty))
        .attr("dy", d => (yLinearScale(d.smokes)) + 5)
        .attr("class", "stateText")
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);


    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smokers (%)")
        .attr("class", "active");

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - (height / 2))
        .attr("class", "axisText")
        .text("Obese (%)")
        .attr("class", "inactive");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)")
        .attr("class", "active");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 50})`)
        .attr("class", "axisText")
        .text("Age (median)")
        .attr("class", "inactive");








};

// })