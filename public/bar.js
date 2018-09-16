//Simple d3.js barchart example to illustrate d3 selections

//other good related tutorials
//http://www.recursion.org/d3-for-mere-mortals/
//http://mbostock.github.com/d3/tutorial/bar-1.html


var w = 850
var h = 400
var bars = function (data) {

    max = d3.max(data, function (d) {
        return d.value
    })

    //nice breakdown of d3 scales
    //http://www.jeromecukier.net/blog/2011/08/11/d3-scales-and-color/
    y = d3.scaleLinear()
        .domain([0, max])
        .range([0, h])

    x = d3.scaleTime()
        .domain([data[0].time, data[data.length - 1].time])
    //.rangeBands([0, w], .2)


    var vis = d3.select("#barchart")
    console.log("vis", vis)

    //a good written tutorial of d3 selections coming from protovis
    //http://www.jeromecukier.net/blog/2011/08/09/d3-adding-stuff-and-oh-understanding-selections/
    var bars = vis.selectAll("rect.bar")
        .data(data)

    //update
    bars
        .attr("fill", "#0a0")
        .attr("stroke", "#050")

    //enter
    bars.enter()
        .append("svg:rect")
        .attr("class", "bar")
        .attr("fill", "#800")
        .attr("stroke", "#800")


    //exit 
    bars.exit()
        .remove()


    //apply to everything (enter and update)
    bars
        .attr("stroke-width", 4)
        .attr("height", function (d, i) {
            return y(d.value);
        })
        //.attr("width", x.rangeBand())
        .attr("transform", function (d, i) {
            return "translate(" + [x(i), h - y(d.value)] + ")"
        })

}


function initold() {

    //setup the svg
    var svg = d3.select("#svg")
        .attr("width", w + 100)
        .attr("height", h + 100)
    console.log("svg", svg)
    svg.append("svg:rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("stroke", "#000")
        .attr("fill", "none")

    svg.append("svg:g")
        .attr("id", "barchart")
        .attr("transform", "translate(50,50)")

}

function plot(data) {
    // 2. Use the margin convention practice 
    var margin = { top: 50, right: 50, bottom: 50, left: 50 }
        , width = window.innerWidth - margin.left - margin.right // Use the window's width 
        , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

    // The number of datapoints
    var n = 21;

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([data[0].time, data[data.length-1].time]) // input
        .range([0, width]); // output

    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, 35]) // input 
        .range([height, 0]); // output 

    // 7. d3's line generator
    var line = d3.line()
        .x(function (d, i) { return xScale(d.time); }) // set the x values for the line generator
        .y(function (d) { return yScale(d.value); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    //var dataset = d3.range(n).map(function (d) { return { "y": d3.randomUniform(1)() } }
    var dataset = data

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("#plot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

    // 12. Appends a circle for each datapoint 
    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function (d, i) { return xScale(d.time) })
        .attr("cy", function (d) { return yScale(d.value) })
        .attr("r", 5)
        .on("mouseover", function (a, b, c) {
            console.log(a)
            //this.attr('class', 'focus')
        })
        .on("mouseout", function () { })
    //       .on("mousemove", mousemove);

    //   var focus = svg.append("g")
    //       .attr("class", "focus")
    //       .style("display", "none");

    //   focus.append("circle")
    //       .attr("r", 4.5);

    //   focus.append("text")
    //       .attr("x", 9)
    //       .attr("dy", ".35em");

    //   svg.append("rect")
    //       .attr("class", "overlay")
    //       .attr("width", width)
    //       .attr("height", height)
    //       .on("mouseover", function() { focus.style("display", null); })
    //       .on("mouseout", function() { focus.style("display", "none"); })
    //       .on("mousemove", mousemove);

    //   function mousemove() {
    //     var x0 = x.invert(d3.mouse(this)[0]),
    //         i = bisectDate(data, x0, 1),
    //         d0 = data[i - 1],
    //         d1 = data[i],
    //         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    //     focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
    //     focus.select("text").text(d);
    //   }
}

