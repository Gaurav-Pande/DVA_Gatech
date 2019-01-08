var data = [{city: 'San Antonio', population_2012: 1383505, growth: {year_2013:25405, year_2014:26644 , year_2015:28593 , year_2016:23591 , year_2017:24208}},
{city: 'New York', population_2012: 8383504, growth: {year_2013:75138 , year_2014:62493 , year_2015:61324 , year_2016:32967 , year_2017:7272}},
{city: 'Chicago', population_2012: 2717989, growth: {year_2013:6493 , year_2014:2051 , year_2015:-1379 , year_2016:-4879 , year_2017:-3825}},
{city: 'Los Angeles', population_2012: 3859267, growth:{year_2013:32516 , year_2014:30885 , year_2015:30791 , year_2016:27657 , year_2017:18643}},
{city: 'Phoenix', population_2012: 1495880, growth: {year_2013:25302 , year_2014:26547 , year_2015:27310 , year_2016:27003 , year_2017:24036}}
];


var margin = {top:20,right:20,bottom:20,left:200},
width = 950 - margin.left-margin.right,
height = 400 -margin.top-margin.bottom,
w = 950,
h=400;


data = data.sort(function(a,b){
  return d3.descending(a.population_2012 + a.growth["year_2013"] + a.growth["year_2014"] + a.growth["year_2015"] + a.growth["year_2016"] + a.growth["year_2017"],
b.population_2012 + b.growth["year_2013"] + b.growth["year_2014"] + b.growth["year_2015"] + b.growth["year_2016"] + b.growth["year_2017"])
})

var svg = d3.select("#Barchart").append("svg")
            .attr("width",w)
            .attr("height",h)
            .append("g")
            .attr("transform","translate("+margin.left+","+margin.top+")")
            .style("float","left");

var xscale = d3.scale.linear()
                      .domain([0,d3.max(data,function(d){return d.population_2012 + d.growth["year_2013"] + d.growth["year_2014"] + d.growth["year_2015"] + d.growth["year_2016"] + d.growth["year_2017"];})])
                      .range([width,0]);

var yscale = d3.scale.ordinal()
                      .rangeRoundBands([0,height], .05)
                      .domain(data.map(function(d) { return d.city; }));



var yaxis = d3.svg.axis()
                  .scale(yscale)
                  .tickSize(0)
                  .orient("left");

var grpy = svg.append("g")
                  .attr("class","y axis")
                  .call(yaxis);


var bars = svg.selectAll(".bar")
              .data(data)
              .enter()
              .append("g")





bars.append("rect")
    .style("fill","#3182bd")
    .attr("x",2)
    .attr("y",function(d){return yscale(d.city)+6;})
    .attr("width",function(d){return width-xscale(d.population_2012 + d.growth["year_2013"] + d.growth["year_2014"] + d.growth["year_2015"] + d.growth["year_2016"] + d.growth["year_2017"]); })
    .attr("height",50)
    .on("mouseover",function(a){
      a.years = []
      a.growths = []
      //.pergrowths = []

      years = []
      growths = []
      //pergrowths = []

      data.forEach(function(di){
            //console.log(di)
            if(a.city == di.city)
            {
              p_2013 = (parseInt(di.growth["year_2013"])/parseInt(di.population_2012))*100;
              p_2014 = (parseInt(di.growth["year_2014"])/(parseInt(di.population_2012) + parseInt(di.growth["year_2013"])))*100;
              p_2015 = (parseInt(di.growth["year_2015"])/(parseInt(di.population_2012) + parseInt(di.growth["year_2013"]) + parseInt(di.growth["year_2014"])))*100;
              p_2016 = (parseInt(di.growth["year_2016"])/(parseInt(di.population_2012) + parseInt(di.growth["year_2013"]) + parseInt(di.growth["year_2014"]) + parseInt(di.growth["year_2015"])))*100;
              p_2017 = (parseInt(di.growth["year_2017"])/(parseInt(di.population_2012) + parseInt(di.growth["year_2013"]) + parseInt(di.growth["year_2014"]) + parseInt(di.growth["year_2015"]) + parseInt(di.growth["year_2016"])))*100;
              a.pergrowths = [p_2013,p_2014,p_2015,p_2016,p_2017];
              //console.log(di.growth);
              for(i in di.growth)
              {
                //console.log("growht")
                years.push(i)
                growths.push(di.growth[i])
               }
            }

            a.years = years;
            a.growths = growths;
            //console.log(a.growths);





            console.log(a.pergrowths)
    });

    d3.select(this).style("fill", "#74c476");
    var s_margin = {l:40,r:40,t:40,b:40},
        s_width = 300 - s_margin.l -s_margin.r,
        s_height = 250 -s_margin.t -s_margin.b,
        s_w = 300,
        s_h = 250;


    var x_data = [2013,2014,2015,2016,2017]
    var xscle = d3.scale.linear().domain([0, x_data.length-1]).range([0, s_width]);
    var yscle = d3.scale.linear().domain([-0.2, d3.max(a.pergrowths)]).range([s_height, 0]);
    var line = d3.svg.line()
                  .x(function(d,i) { return xscle(i); })
                  .y(function(d) { return yscle(d); });

    var graph = d3.select("#Linechart")
                  .append("svg:svg")
                  .attr("width",s_w)
                  .attr("height",s_h)
                  .append("svg:g")
                  .attr("transform", "translate(" + 40 + "," + 40 + ")");

    var xa = d3.svg.axis().scale(xscle).ticks(4).orient("bottom")
                              .tickFormat(function(d) {
                                return x_data[d];
                              })
    graph.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + s_height + ")")
                .call(xa)
                .append("text")
                .attr("x",200)
                .style("text-anchor","bottom")
                .attr("dy", "2.5em")
                .text("Year")

    var ya = d3.svg.axis().scale(yscle).ticks(6).orient("left");

    graph.append("svg:g")
                 .attr("class", "y axis")
                 .attr("transform", "translate(0,0)")
                 .call(ya)
                 .append("text")
                 .attr("y",-10)
                 .style("text-anchor","top")
                 .attr("dx", "-2.5em")
                 .text("Pct %")

            graph.append("svg:path").attr("d", line(a.pergrowths));
    })
    .on("mouseout", function() {
        d3.select(this).style("fill", "#3182bd")
        d3.selectAll('#Linechart svg').remove();
      });



svg.selectAll(".bar")
    .data(data)
    .enter()
    bars.append("text")
    .attr("class", "label")
    .attr("y", function (d) {
        return yscale(d.city) + yscale.rangeBand() / 2 + 2;
    })
    .attr("x", 10)
    // taken from stack overflow here : https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    .text(function (d) {
        cumulative_pop = d.population_2012 + d.growth["year_2013"] + d.growth["year_2014"] + d.growth["year_2015"] + d.growth["year_2016"] + d.growth["year_2017"]
        return cumulative_pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
