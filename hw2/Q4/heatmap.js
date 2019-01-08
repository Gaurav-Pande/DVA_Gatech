var data = []
var h1 = []
var h2 = []
var h3 = []
var h4 = []

d3.csv('heatmap.csv',function(d){
  console.log("getting started")
  hpDataset =[
    [
      book = "Sorcerer's Stone",
      house = d.House,
      spellType = d.SpellType,
      count = parseInt(d["Sorcerer's Stone"]),
      index = 1
    ],
    [
      book = "Chamber of Secrets",
      house = d.House,
      spellType = d.SpellType,
      count = parseInt(d["Chamber of Secrets"]),
      index = 2
    ],
    [
      book = "Prisoner of Azkaban",
      house = d.House,
      spellType = d.SpellType,
      count = parseInt(d["Prisoner of Azkaban"]),
      index = 3
    ],
    [
      book = "Goblet of Fire",
      house = d.House,
      spellType = d.SpellType,
      count = parseInt(d["Goblet of Fire"]),
      index = 4
    ],
    [
      book = "Order of the Phoenix",
      house = d.House,
      spellType = d.SpellType,
      count = parseInt(d["Order of the Phoenix"]),
      index =5
    ],
    [
      book = "Half Blood Prince",
      house = d.House,
      spellType = d.SpellType,
      count = parseInt(d["Half Blood Prince"]),
      index =6
    ],
    [
      book = "Deathly Hallows",
      house = d.House,
      spellType = d.SpellType,
      count = parseInt(d["Deathly Hallows"]),
      index =7
    ]
  ];

  return hpDataset;
},
function(error, rows){
  data=rows;
  console.log(data);
  modify(rows);
});


function modify(in_data){
var option_house = ["Gryffindor","Hufflepuff","Ravenclaw","Slytherin"]
// add dropdown menu
var select = d3.select('#house')
    			     .append('select')
    			     .attr('class','select')
      			   .on('change',ifclicked);
var options = select.selectAll('option')
                    .data(option_house)
                    .enter()
                    .append('option')
                    .text(function(d){
                      return d;});


// filter all the data corresponding to each house and store in a separate variable
for (var i =0;i<in_data.length;i++){
  for(var j=0;j<7;j++){
    if (in_data[i][j][1]=="Gryffindor"){
      temp_data = {
        book:in_data[i][j][0],
        spelltype:in_data[i][j][2],
        value:in_data[i][j][3],
        index:in_data[i][j][4]
      };
      h1.push(temp_data);
    }
    if (in_data[i][j][1]=="Hufflepuff"){
      temp_data = {
        book:in_data[i][j][0],
        spelltype:in_data[i][j][2],
        value:in_data[i][j][3],
        index:in_data[i][j][4]
      };
      h2.push(temp_data);
    }
    if (in_data[i][j][1]=="Ravenclaw"){
      temp_data = {
        book:in_data[i][j][0],
        spelltype:in_data[i][j][2],
        value:in_data[i][j][3],
        index:in_data[i][j][4]
      };
      h3.push(temp_data);
    }
    if (in_data[i][j][1]=="Slytherin"){
      temp_data = {
        book:in_data[i][j][0],
        spelltype:in_data[i][j][2],
        value:in_data[i][j][3],
        index:in_data[i][j][4]
      };
      h4.push(temp_data);
    }
  }
}
plotheatmap(h1);
};


function ifclicked(){
  d3.select('svg').remove();
  house_selected = d3.select('select').property('value');
  console.log(house_selected);
  if (house_selected == "Hufflepuff"){
    plotheatmap(h2);
  }
  else if (house_selected == "Ravenclaw") {
    plotheatmap(h3);

  }
  else if (house_selected == "Slytherin") {
    plotheatmap(h4);

  }
  else{
    plotheatmap(h1);
  }
};



function plotheatmap(data){
//console.log(data)
var margin = {top:50,right:10,bottom:100,left:100}
var width = 960-margin.left - margin.right;
var w = 960;
var h = 700;
var height = 530 -margin.top - margin.bottom;
var block_size = Math.floor(width/15);
var legend_width = block_size;
var bucket = 9;
var colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
var book = ["Sorcerer's Stone","Chamber of Secrets","Prisoner of Azkaban","Goblet of Fire","Order of the Phoenix","Half Blood Prince","Deathly Hallows"]
var spelltype = ["Charm","Conjuration","Counter Spell","Curse","Healing Spell","Hex","Jinx","Transfiguration"]
var dic = {"Charm":1,"Conjuration":2,"Counter Spell":3,"Curse":4,"Healing Spell":5,"Hex":6,"Jinx":7,"Transfiguration":8}
var dic_2 = {"Sorcerer's Stone":1,"Chamber of Secrets":2,"Prisoner of Azkaban":3,"Goblet of Fire":4,"Order of the Phoenix":5,"Half Blood Prince":6,"Deathly Hallows":7}

var svg = d3.select('#heatmap')
            .append('svg')
            .attr("width",w)
            .attr("height",h)
            .append('g')
            .attr("transform", "translate(" + margin.left * 2.5 + "," + margin.top + ")");

var booklabels = svg.selectAll(".book_label")
                   .data(book)
                   .enter().append("text")
                   .text(function (d) { return d; })
                   .attr("x", 0)
                   .attr("y", function (d, i) { return i * block_size; })
                   .style("text-anchor", "end")
                   .attr("transform", "translate(-6," + block_size / 1.5 + ")")
                   .attr("class", function (d, i) { return ((i >= 0 && i <= 6) ? "book_label labels axis x-axis" : "book_label labels axis"); });


var SpellLabels = svg.selectAll(".spell_label")
          .data(spelltype)
          .enter().append("text")
          .text(function(d) { return d; })
          .attr("x", function(d, i) {return (i * block_size); })
          .attr("y", block_size*7 + 30)
          .style("text-anchor", "middle")
          //.attr("transform", 'rotate(-90)')
          .attr("transform", function(d, i) {
          return "translate(" + (-518) + ", -5)" +
                 "rotate(-90 "+ ((i + 5) * block_size) + " " + (150) +")";
     } )
     .style("text-anchor", "end")
          .attr("class", function(d, i) { return "spell_label labels axis y-axis" });



var color = d3.scale.quantile()
              .domain([0,bucket-1,d3.max(data, function(d){ return d.value;})])
              .range(colors);


svg.append('text')
   .text('Spell')
   .attr('class','spell_label map axis x-axis')
   .attr('x',block_size*8 + 10)
   .attr('y',block_size*8 - 25);

svg.append('text')
  .text('No. of spells')
  .attr('class','spell_label map axis x-axis')
  .attr('x',0)
  .attr('y',block_size*7 + 130);


svg.append('text')
  .text('Book')
  .attr('class','spell_label map axis x-axis')
  .attr('x',-block_size)
  .attr('y',-10);



var blocks = svg.selectAll(".spell")
              .data(data, function(d) {return d.book+':'+d.spelltype;});
              blocks.append("title");
              blocks.enter().append("rect")
              .attr("x", function(d) {return (dic[d.spelltype]-1) * block_size;  })
              .attr("y", function(d) {return (dic_2[d.book]-1) * block_size; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "spell tiled")
              .attr("width", block_size)
              .attr("height", block_size)
              .style("fill", colors[0]);
  blocks.transition().duration(1000)
              .style("fill", function(d) { return color(d.value); });
  blocks.select("title").text(function(d) { return d.value; });
  blocks.exit().remove();


var legend = svg.selectAll("legend")
                .data([0].concat(color.quantiles()), function(d) { return d; });

              legend.enter().append("g")
                    .attr("class","legend");

              legend.append("rect")
              .attr("x",function(d,i){return block_size*i;})
              .attr("y",block_size*7 + 150)
              .attr("width",block_size)
              .attr("height",block_size/2)
              .style("fill", function(d, i) { return colors[i]; });

              legend.append("text")
                    .attr("class","labels")
                    .text(function(d) { return Math.round(d); })
                    .attr("x",function(d, i) { return block_size * i; })
                    .attr("y",block_size*7 + 155 + block_size-20);

              legend.exit().remove();

}
