var margin = { top:50, left:50, right:50, bottom:50 };
var height = 900- margin.top - margin.bottom;
var width = 1000- margin.left - margin.right;


var svg = d3.select("#map")
            .append("svg")
            .attr("height", height + margin.top + margin.bottom)
            .attr("width", width + margin.left, margin.right)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.queue()
  .defer(d3.json,"uk-counties.json")
  .defer(d3.json,"http://34.78.46.186/Circles/Towns/50")
  .await(ready);

// var projection = d3.geoMercator().translate([width / 2, height / 2]);
var projection = d3.geoAlbers()
    .center([0, 55.4])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(4000)
    .translate([width / 2, height / 2]);
var path = d3.geoPath().projection(projection);


  function ready(error,data,towns){

var countries = topojson.feature(data, data.objects.GBR_adm2).features;

svg.selectAll(".country")
    .data(countries)
    .enter().append("path")
    .attr("class", "country")
    .attr("d", path)
    .attr("fill","#ccccc")
    .on('mouseover', function(d){
        console.log(d)
        d3.select(this).classed("addselection", true)
    })
    .on('mouseout', function(d){
        console.log(d)
        d3.select(this).classed("addselection", false)
    })
  

// creating circles




    var Tooltip = d3
    .select('#map')
    .append('div')
    .data(towns)
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('position', 'absolute');


    var mousehover = function (d) {
        console.log(d);
        Tooltip.style('opacity', 1);
      };
      var mousemove = function (d) {
        Tooltip.html(
          'Town name: ' +
            d.Town +
            '<br>' +
            'population: ' +
            d.Population +
            '<br>' +
            'County: ' +
            d.County
        )
          .style('left', d3.mouse(this)[0] + 10 + 'px')
          .style('top', d3.mouse(this)[1] + 'px');
      };
      var mouseleave = function (d) {
        Tooltip.style('opacity', 0);
      };


      svg
      .selectAll('.town-circle')
      .data(towns)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return projection([d.lng, d.lat])[0];
      })
      .attr('cy', function (d) {
        return projection([d.lng, d.lat])[1];
      })
      .attr('r', 2)
      .attr('class', 'circle town-circle')
      .on('mouseover', mousehover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);

}


// //Creating tooltip 
//     var Tooltip = d3.select("#map")
//     .append("div")
//     .data(towns)
//     .attr("class", "tooltip")
//     .style("opacity", 1)
//     .style("background-color", "white")
//     .style("border", "solid")
//     .style("border-width", "2px")
//     .style("border-radius", "5px")
//     .style("padding", "5px")
//     .style("position", "absolute")

// // Three functions that will add the tooltip 
// var mousehover = function(d) {
//     console.log(d)
//     Tooltip.style("opacity", 1)
//   }
// var mousemove = function(d) {
//     Tooltip
//       .html("Town name: " + d.Town + "<br>" + "population: " + d.Population + "<br>" + "County: " + d.County)
//       .style("left", (d3.mouse(this)[0]+10) + "px")
//       .style("top", (d3.mouse(this)[1]) + "px")
//   }
// var mouseleave = function(d) {
//     Tooltip.style("opacity", 0)
//   }

//   // Add circles:
// svg
// .selectAll(".town-circle")
// .data(towns)
// .enter().append("circle")
// .attr("cx", function(d){ return projection([d.lng, d.lat])[0] })
// .attr("cy", function(d){ return projection([d.lng, d.lat])[1] })
// .attr("r", 7)
// .attr("class", "circle")
// .on("mouseover", mousehover)
// .on("mousemove", mousemove)
// .on("mouseleave", mouseleave)

// }

