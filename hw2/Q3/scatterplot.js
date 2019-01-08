var height = 800;
var width = 1200;
var padding = 40;
var margin = {top: 30, bottom: 100, left: 80, right: 50};
var r_height= width - margin.left - margin.right;
var r_width= height - margin.top - margin.bottom;
var ds;

d3.csv("movies.csv", function(error,data){

  if (error){
    console.log(error);
  }
  else{
    //console.log(data);
    ds = data;
  }

  var data1 = []
  var good1 = []
  var bad1 = []

  var data2 = []
  var good2 = []
  var bad2 = []

  var data3 =[]
  var good3 = []
  var bad3 = []


// learn about js forEach loop here: https://stackoverflow.com/questions/13465796/d3-javascript-difference-between-foreach-and-each
// first filter the data and store them separatly as good and bad rating
  ds.forEach(function(d){
    d.WinsNoms = + d.WinsNoms;
    d.imdbRating = + d.imdbRating;
    data1.push(d);
    if (d.IsGoodRating == 0){
      bad1.push(d);
    }
    else if (d.IsGoodRating == 1){
      good1.push(d);
    }
  })


  ds.forEach(function(d){
    d.Budget = + d.Budget;
    d.imdbRating = + d.imdbRating;
    data2.push(d);
    if (d.IsGoodRating == 0){
      bad2.push(d);
    }
    else if (d.IsGoodRating == 1){
      good2.push(d);
    }
  })


  ds.forEach(function(d){
    d.imdbVotes = + d.imdbVotes;
    d.imdbRating = + d.imdbRating;
    data3.push(d);
    if (d.IsGoodRating == 0){
      bad3.push(d);
    }
    else if (d.IsGoodRating == 1){
      good3.push(d);
    }
  })




// lets write the scales now for x and y axis
var xScale1 = d3.scale.linear()
                    .domain([d3.min(data1,function(d){return d.imdbRating;}),d3.max(data1,function(d){return d.imdbRating;})])
                    .range([padding, width - padding]).nice();

var yScale1 = d3.scale.linear()
                    .domain([d3.min(data1,function(d){return d.WinsNoms;}),d3.max(data1,function(d){return d.WinsNoms;})])
                    .range([height-padding,padding]).nice();

// lets define the axis now
var xAxis1 = d3.svg.axis()
                  .scale(xScale1)
                  .orient("bottom")
                  .ticks(15);

var yAxis1 = d3.svg.axis()
                  .scale(yScale1)
                  .orient("left")
                  .ticks(10);



// lets write an svg element to finally put things into picture
// transforming the graph: http://www.d3noob.org/2014/02/attributes-in-d3js.html
var svg1 = d3.select("body")
            .append("svg")
            .attr("width",width)
            .attr("height",height)
            .attr("transform","translate("+ margin.left+ "," + margin.top + ")");


            //fill all the data on x axis and y axis
            svg1.selectAll("circles")
        		.data(bad1)
        		.enter()
        		.append("path")
        		.attr("d",d3.svg.symbol().type("circle").size(60))
        		.attr("transform",function(d){return "translate("+xScale1(d.imdbRating)+","+yScale1(d.WinsNoms)+")";})
        		.attr("stroke", "red")
        		.attr("stroke-width",1.5)
        		.attr("fill", "none");

        	   svg1.selectAll("crosses")
        		.data(good1)
        		.enter()
        		.append("path")
        		.attr("d",d3.svg.symbol().type("cross").size(60))
        		.attr("transform",function(d){return "translate("+xScale1(d.imdbRating)+","+yScale1(d.WinsNoms)+")";})
        		.attr("stroke", "blue")
        		.attr("stroke-width",1.5)
        		.attr("fill", "none");







            // add the title to the svg

            svg1.append("text")
                .attr("transform","translate("+400+","+15+")")
                .text("Wins+Nominations vs. IMDb Rating")
                .style("font-weight","bold")
                .attr("font-size","20");


            // create tooltip with red circle and blue cross


          //Add legend
            var legend1 = svg1.append("g")
              .attr("class", "legend")
              .attr("x", width - padding)
              .attr("y", padding)
              .attr("height", 100)
              .attr("width", 100);

            //Add cross
            legend1.append('g')
              .append('path')
              .attr('d',d3.svg.symbol().type('cross')
            .size(50))
              .attr('fill', "none")
              .attr('stroke', "blue")
              .attr('stroke-width',1)
              .attr('transform', "translate("+ (width-padding-50) +","+ 10 +")");

            legend1.append('g')
              .append('svg:text')
              .attr("x", width-padding-40)
              .attr("y", 14)
              .attr("text-align", "center")
              .attr("text-anchor", "center")
              .text("good rating")

              //Add circle
              legend1.append('g')
                .append('path')
                .attr('d',d3.svg.symbol().type('circle')
              .size(50))
                .attr('fill', "none")
                .attr('stroke', "red")
                .attr('stroke-width',1)
                .attr('transform', "translate("+ (width-padding-50) +","+ 30 +")");

              legend1.append('g')
                .append('svg:text')
                .attr("x", width-padding-40)
                .attr("y", 34)
                .attr("text-align", "center")
                .attr("text-anchor", "center")
                .text("bad rating")





              // add axis to the graph
              svg1.append("g")
                     .attr("class", "axis")
                     .attr("stroke-width","1px")
                     .attr("transform", "translate(0, " + (height-25) + ")")
                     .call(xAxis1)
                     .append("text")
                     .attr("class", "label")
                     .attr("x", width-10)
                     .attr("y", -5)
                     .text("Imdb Rating")
                     .style("font-size","18")
                     .style("text-anchor", "end");

                svg1.append("g")
                   .attr("class", "axis")
                   .attr("transform", "translate(" + (padding) +", 5)")
                   .call(yAxis1)
                   .append("text")
                   .text("Wins+Noms")
                   .attr("class", "label")
                   .attr("x", 52)
                   .attr("y", 20)
                   .style("font-size","18")
                   .style("text-anchor", "end");



         // <div class="pagebreak"> </div>
	document.body.innerHTML += '<div style="page-break-before: always;"></div>';
  document.body.innerHTML += '<br><br><br>';








// START PART 2 FROM HERE:
var padding2 = 100;
var xScale2 = d3.scale.linear()
                    .domain([d3.min(data2,function(d){return d.imdbRating;}),d3.max(data2,function(d){return d.imdbRating;})])
                    .range([padding2, width - padding2]).nice();

var yScale2 = d3.scale.linear()
                    .domain([d3.min(data2,function(d){return d.Budget;}),d3.max(data2,function(d){return d.Budget;})])
                    .range([height-padding2,padding2]).nice();

// lets define the axis now
var xAxis2 = d3.svg.axis()
                  .scale(xScale2)
                  .orient("bottom")
                  .ticks(15);

var yAxis2 = d3.svg.axis()
                  .scale(yScale2)
                  .orient("left")
                  .ticks(10);

// lets write an svg element to finally put things into picture
// transforming the graph: http://www.d3noob.org/2014/02/attributes-in-d3js.html
var svg2 = d3.select("body")
            .append("svg")
            .attr("width",width)
            .attr("height",height)
            .attr("transform","translate("+ margin.left+ "," + margin.top + ")");


            //fill all the data on x axis and y axis
            svg2.selectAll("circles")
        		.data(bad2)
        		.enter()
        		.append("path")
        		.attr("d",d3.svg.symbol().type("circle").size(60))
        		.attr("transform",function(d){return "translate("+xScale2(d.imdbRating)+","+yScale2(d.Budget)+")";})
        		.attr("stroke", "red")
        		.attr("stroke-width",1.5)
        		.attr("fill", "none");

        	   svg2.selectAll("crosses")
        		.data(good2)
        		.enter()
        		.append("path")
        		.attr("d",d3.svg.symbol().type("cross").size(60))
        		.attr("transform",function(d){return "translate("+xScale2(d.imdbRating)+","+yScale2(d.Budget)+")";})
        		.attr("stroke", "blue")
        		.attr("stroke-width",1.5)
        		.attr("fill", "none");







            // add the title to the svg

            svg2.append("text")
                .attr("transform","translate("+450+","+15+")")
                .text("Budget vs. IMDb Rating")
                .style("font-weight","bold")
                .attr("font-size","20");


            // create tooltip with red circle and blue cross


          //Add legend
            var legend2 = svg2.append("g")
              .attr("class", "legend")
              .attr("x", width - padding2)
              .attr("y", padding2)
              .attr("height", 100)
              .attr("width", 100);

            //Add cross
            legend2.append('g')
              .append('path')
              .attr('d',d3.svg.symbol().type('cross')
            .size(50))
              .attr('fill', "none")
              .attr('stroke', "blue")
              .attr('stroke-width',1)
              .attr('transform', "translate("+ (width-padding2-50) +","+ 10 +")");

            legend2.append('g')
              .append('svg:text')
              .attr("x", (width-padding2-40))
              .attr("y", 14)
              .attr("text-align", "center")
              .attr("text-anchor", "center")
              .text("good rating")

              //Add circle
              legend2.append('g')
                .append('path')
                .attr('d',d3.svg.symbol().type('circle')
              .size(50))
                .attr('fill', "none")
                .attr('stroke', "red")
                .attr('stroke-width',1)
                .attr('transform', "translate("+ (width-padding2-50) +","+ 30 +")");

              legend2.append('g')
                .append('svg:text')
                .attr("x", (width-padding2-40))
                .attr("y", 34)
                .attr("text-align", "center")
                .attr("text-anchor", "center")
                .text("bad rating")





              // add axis to the graph
              svg2.append("g")
                     .attr("class", "axis")
                     .attr("stroke-width","1px")
                     .attr("transform", "translate(0, " + (height-95) + ")")
                     .call(xAxis2)
                     .append("text")
                     .attr("class", "label")
                     .attr("x", width-40)
                     .attr("y", -5)
                     .text("Imdb Rating")
                     .style("font-size","18")
                     .style("text-anchor", "end");

                svg2.append("g")
                   .attr("class", "axis")
                   .attr("transform", "translate(" + (padding2) +", 5)")
                   .call(yAxis2)
                   .append("text")
                   .text("Budget")
                   .attr("class", "label")
                   .attr("x", 22)
                   .attr("y", 80)
                   .style("font-size","18")
                   .style("text-anchor", "end");



         // <div class="pagebreak"> </div>
	document.body.innerHTML += '<div style="page-break-before: always;"></div>';
  document.body.innerHTML += '<br><br><br>';




















// START PART3 FROM HERE:

var padding3 = 100;
var xScale3 = d3.scale.linear()
                    .domain([d3.min(data3,function(d){return d.imdbRating;}),d3.max(data3,function(d){return d.imdbRating;})])
                    .range([padding3, width - padding3]).nice();

var yScale3 = d3.scale.linear()
                    .domain([d3.min(data3,function(d){return d.imdbVotes;}),d3.max(data3,function(d){return d.imdbVotes;})])
                    .range([height-padding3,padding3]).nice();

// lets define the axis now
var xAxis3 = d3.svg.axis()
                  .scale(xScale3)
                  .orient("bottom")
                  .ticks(15);

var yAxis3 = d3.svg.axis()
                  .scale(yScale3)
                  .orient("left")
                  .ticks(10);


var iconScale = d3.scale.linear()
                        .domain([d3.min(data3,function(d){return d.imdbRating;}),d3.max(data3,function(d){return d.imdbRating;})])
                        .range([30,80]).nice();


var svg3 = d3.select("body")
            .append("svg")
            .attr("width",width)
            .attr("height",height)
            .attr("transform","translate("+ margin.left+ "," + margin.top + ")");


            //fill all the data on x axis and y axis
            svg3.selectAll("circles")
        		.data(bad3)
        		.enter()
        		.append("path")
        		.attr("d",d3.svg.symbol().type("circle").size(function(d){
              return iconScale(d.imdbRating);
            }))
        		.attr("transform",function(d){return "translate("+xScale3(d.imdbRating)+","+yScale3(d.imdbVotes)+")";})
        		.attr("stroke", "red")
        		.attr("stroke-width",1.5)
        		.attr("fill", "none");

        	   svg3.selectAll("crosses")
        		.data(good3)
        		.enter()
        		.append("path")
        		.attr("d",d3.svg.symbol().type("cross").size(function(d){
              return iconScale(d.imdbRating);
            }))
        		.attr("transform",function(d){return "translate("+xScale3(d.imdbRating)+","+yScale3(d.imdbVotes)+")";})
        		.attr("stroke", "blue")
        		.attr("stroke-width",1.5)
        		.attr("fill", "none");







            // add the title to the svg

            svg3.append("text")
                .attr("transform","translate("+350+","+15+")")
                .text("Votes vs. IMDb Rating sized by Wins+Nominations")
                .style("font-weight","bold")
                .attr("font-size","20");


            // create tooltip with red circle and blue cross


          //Add legend
            var legend3 = svg3.append("g")
              .attr("class", "legend")
              .attr("x", width - padding3)
              .attr("y", padding3)
              .attr("height", 100)
              .attr("width", 100);

            //Add cross
            legend3.append('g')
              .append('path')
              .attr('d',d3.svg.symbol().type('cross')
            .size(50))
              .attr('fill', "none")
              .attr('stroke', "blue")
              .attr('stroke-width',1)
              .attr('transform', "translate("+ (width-padding3-50) +","+ 10 +")");

            legend3.append('g')
              .append('svg:text')
              .attr("x", (width-padding3-40))
              .attr("y", 14)
              .attr("text-align", "center")
              .attr("text-anchor", "center")
              .text("good rating")

              //Add circle
              legend3.append('g')
                .append('path')
                .attr('d',d3.svg.symbol().type('circle')
              .size(50))
                .attr('fill', "none")
                .attr('stroke', "red")
                .attr('stroke-width',1)
                .attr('transform', "translate("+ (width-padding3-50) +","+ 30 +")");

              legend3.append('g')
                .append('svg:text')
                .attr("x", (width-padding3-40))
                .attr("y", 34)
                .attr("text-align", "center")
                .attr("text-anchor", "center")
                .text("bad rating")





              // add axis to the graph
              svg3.append("g")
                     .attr("class", "axis")
                     .attr("stroke-width","1px")
                     .attr("transform", "translate(0, " + (height-95) + ")")
                     .call(xAxis3)
                     .append("text")
                     .attr("class", "label")
                     .attr("x", width-40)
                     .attr("y", -5)
                     .text("Imdb Rating")
                     .style("font-size","18")
                     .style("text-anchor", "end");

                svg3.append("g")
                   .attr("class", "axis")
                   .attr("transform", "translate(" + (padding3) +", 5)")
                   .call(yAxis3)
                   .append("text")
                   .text("IMDb Votes")
                   .attr("class", "label")
                   .attr("x", 22)
                   .attr("y", 80)
                   .style("font-size","18")
                   .style("text-anchor", "end");



         // <div class="pagebreak"> </div>
	document.body.innerHTML += '<div style="page-break-before: always;"></div>';
  document.body.innerHTML += '<br><br><br>';




// START PART4 HERE:(plot uses the square root scale for its y-axis (only))

var padding4 = 50;
var xScale4 = d3.scale.linear()
                    .domain([d3.min(data1,function(d){return d.imdbRating;}),d3.max(data1,function(d){return d.imdbRating;})])
                    .range([padding4, width - padding4]).nice();

var sq_root_yScale = d3.scale.sqrt()
                    .domain([d3.min(data1,function(d){return d.WinsNoms;}),d3.max(data1,function(d){return d.WinsNoms;})])
                    .range([height-padding4,padding4]).nice();

// lets define the axis now
var xAxis4 = d3.svg.axis()
                  .scale(xScale4)
                  .orient("bottom")
                  .ticks(15);

var yAxis4 = d3.svg.axis()
                  .scale(sq_root_yScale)
                  .orient("left")
                  .ticks(8);




var svg4 = d3.select("body")
            .append("svg")
            .attr("width",width)
            .attr("height",height)
            .attr("transform","translate("+ margin.left+ "," + margin.top + ")");


            //fill all the data on x axis and y axis
            svg4.selectAll("circles")
        		.data(bad1)
        		.enter()
        		.append("path")
        		.attr("d",d3.svg.symbol().type("circle").size(50))
        		.attr("transform",function(d){return "translate("+xScale4(d.imdbRating)+","+sq_root_yScale(d.WinsNoms)+")";})
        		.attr("stroke", "red")
        		.attr("stroke-width",1.5)
        		.attr("fill", "none");

        	   svg4.selectAll("crosses")
        		.data(good1)
        		.enter()
        		.append("path")
        		.attr("d",d3.svg.symbol().type("cross").size(50))
        		.attr("transform",function(d){return "translate("+xScale4(d.imdbRating)+","+sq_root_yScale(d.WinsNoms)+")";})
        		.attr("stroke", "blue")
        		.attr("stroke-width",1.5)
        		.attr("fill", "none");







            // add the title to the svg

            svg4.append("text")
                .attr("transform","translate("+350+","+15+")")
                .text("Wins+Nominations (square-root-scaled) vs. IMDb Rating")
                .style("font-weight","bold")
                .attr("font-size","20");


            // create tooltip with red circle and blue cross


          //Add legend
            var legend4 = svg4.append("g")
              .attr("class", "legend")
              .attr("x", width - padding4)
              .attr("y", padding4)
              .attr("height", 100)
              .attr("width", 100);

            //Add cross
            legend4.append('g')
              .append('path')
              .attr('d',d3.svg.symbol().type('cross')
            .size(50))
              .attr('fill', "none")
              .attr('stroke', "blue")
              .attr('stroke-width',1)
              .attr('transform', "translate("+ (width-padding4-50) +","+ 10 +")");

            legend4.append('g')
              .append('svg:text')
              .attr("x", (width-padding4-40))
              .attr("y", 14)
              .attr("text-align", "center")
              .attr("text-anchor", "center")
              .text("good rating")

              //Add circle
              legend4.append('g')
                .append('path')
                .attr('d',d3.svg.symbol().type('circle')
                .size(50))
                .attr('fill', "none")
                .attr('stroke', "red")
                .attr('stroke-width',1)
                .attr('transform', "translate("+ (width-padding4-50) +","+ 30 +")");

              legend4.append('g')
                .append('svg:text')
                .attr("x", (width-padding4-40))
                .attr("y", 34)
                .attr("text-align", "center")
                .attr("text-anchor", "center")
                .text("bad rating")





              // add axis to the graph
              svg4.append("g")
                     .attr("class", "axis")
                     .attr("stroke-width","1px")
                     .attr("transform", "translate(0, " + (height-45) + ")")
                     .call(xAxis4)
                     .append("text")
                     .attr("class", "label")
                     .attr("x", width-40)
                     .attr("y", -5)
                     .text("Imdb Rating")
                     .style("font-size","18")
                     .style("text-anchor", "end");

                svg4.append("g")
                   .attr("class", "axis")
                   .attr("transform", "translate(" + (padding4) +", 5)")
                   .call(yAxis4)
                   .append("text")
                   .text("Wins+Noms")
                   .attr("class", "label")
                   .attr("x", 52)
                   .attr("y", 20)
                   .style("font-size","18")
                   .style("text-anchor", "end");



         // <div class="pagebreak"> </div>
	document.body.innerHTML += '<div style="page-break-before: always;"></div>';
 	document.body.innerHTML += '<br><br><br>';




  // START PART5 HERE:



  var padding5 = 50;
  var xScale5 = d3.scale.linear()
                      .domain([d3.min(data1,function(d){return d.imdbRating;}),d3.max(data1,function(d){return d.imdbRating;})])
                      .range([padding5, width - padding5]).nice();

  var log_yScale = d3.scale.log()
                      .clamp(true)
                      .domain([0.0001,d3.max(data1,function(d){return d.imdbRating;})])
                      .range([height-padding5,padding5]).nice();

  // lets define the axis now
  var xAxis5 = d3.svg.axis()
                    .scale(xScale5)
                    .orient("bottom")
                    .ticks(15);

  var yAxis5 = d3.svg.axis()
                    .scale(log_yScale)
                    .orient("left")
                    .ticks(8);




  var svg5 = d3.select("body")
              .append("svg")
              .attr("width",width)
              .attr("height",height)
              .attr("transform","translate("+ margin.left+ "," + margin.top + ")");


              //fill all the data on x axis and y axis
              svg5.selectAll("circles")
          		.data(bad1)
          		.enter()
          		.append("path")
          		.attr("d",d3.svg.symbol().type("circle").size(50))
          		.attr("transform",function(d){return "translate("+xScale5(d.imdbRating)+","+log_yScale(d.WinsNoms)+")";})
          		.attr("stroke", "red")
          		.attr("stroke-width",1.5)
          		.attr("fill", "none");

          	   svg5.selectAll("crosses")
          		.data(good1)
          		.enter()
          		.append("path")
          		.attr("d",d3.svg.symbol().type("cross").size(50))
          		.attr("transform",function(d){return "translate("+xScale5(d.imdbRating)+","+log_yScale(d.WinsNoms)+")";})
          		.attr("stroke", "blue")
          		.attr("stroke-width",1.5)
          		.attr("fill", "none");


              // add the title to the svg

              svg5.append("text")
                  .attr("transform","translate("+350+","+15+")")
                  .text("Wins+Nominations (log-scaled) vs. IMDb Rating")
                  .style("font-weight","bold")
                  .attr("font-size","20");


              // create tooltip with red circle and blue cross


            //Add legend
              var legend5 = svg5.append("g")
                .attr("class", "legend")
                .attr("x", width - padding5)
                .attr("y", padding5)
                .attr("height", 100)
                .attr("width", 100);

              //Add cross
              legend5.append('g')
                .append('path')
                .attr('d',d3.svg.symbol().type('cross')
                .size(50))
                .attr('fill', "none")
                .attr('stroke', "blue")
                .attr('stroke-width',1)
                .attr('transform', "translate("+ (width-padding5-50) +","+ 10 +")");

              legend5.append('g')
                .append('svg:text')
                .attr("x", (width-padding5-40))
                .attr("y", 14)
                .attr("text-align", "center")
                .attr("text-anchor", "center")
                .text("good rating")

                //Add circle
                legend5.append('g')
                  .append('path')
                  .attr('d',d3.svg.symbol().type('circle')
                  .size(50))
                  .attr('fill', "none")
                  .attr('stroke', "red")
                  .attr('stroke-width',1)
                  .attr('transform', "translate("+ (width-padding5-50) +","+ 30 +")");

                legend5.append('g')
                  .append('svg:text')
                  .attr("x", (width-padding5-40))
                  .attr("y", 34)
                  .attr("text-align", "center")
                  .attr("text-anchor", "center")
                  .text("bad rating")





                // add axis to the graph
                svg5.append("g")
                       .attr("class", "axis")
                       .attr("stroke-width","1px")
                       .attr("transform", "translate(0, " + (height-45) + ")")
                       .call(xAxis5)
                       .append("text")
                       .attr("class", "label")
                       .attr("x", width-40)
                       .attr("y", -5)
                       .text("Imdb Rating")
                       .style("font-size","18")
                       .style("text-anchor", "end");

                  svg5.append("g")
                     .attr("class", "axis")
                     .attr("transform", "translate(" + (padding5) +", 5)")
                     .call(yAxis5)
                     .append("text")
                     .text("Wins+Noms")
                     .attr("class", "label")
                     .attr("x", 52)
                     .attr("y", 20)
                     .style("font-size","18")
                     .style("text-anchor", "end");
});
