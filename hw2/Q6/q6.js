width = 1000,
height = 500,
dataset1 = [],
dataset2 = [];
var colors = ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"];
var margin = {top:10,left:10,right:20,bottom:2}

d3.csv("education.csv",function(error,data){
  data.forEach(function(d){
      dataset1.push({
        "id":d.id,
        "name":d.name,
        "percentage_educated":d.percent_educated
      });
    });
});

d3.csv("education_details.csv",function(error,data){
  data.forEach(function(d){
      dataset2.push({
        "id":d.id,
        "qualified_professionals":d.qualified_professionals,
        "high_school":d.high_school,
        "middle_school_or_lower":d.middle_school_or_lower
      });
    });
});

var pmap= d3.map();

s = d3.scale.quantile()
                .domain([0,10,20,30,40,50,60,70,80,90])
                .range(colors);

map_projection = d3.geo.albersUsa()
           .scale(1000)
           .translate([width / 2, height / 2]);

path = d3.geo.path()
              .projection(map_projection);


tooltip = d3.tip()
        .attr("class","tip")
        .offset([-15,-15])
        .html(function(d){
          //console.log(d.id);
          return getinfo(d.id);
        });


function getinfo(id){
  var data1 = dataset1;
  var data2 = dataset2;

  //console.log(data1)
  //console.log(data2);
  var country_nam = "";
  var per_edu = "";
  var qualified_pro = "";
  var high_schl = "";
  var middle_schl = "";
  for(i=0; i<data1.length; i++){
    //console.log(id);
    //console.log(data1[i].id);
    if (data1[i].id == id){
      country_nam = data1[i].name;
      //console.log("hello");
      //console.log(country_nam);
      per_edu = data1[i].percentage_educated;
      for (j=0;j<data2.length; j++){
        if (data2[j].id ==  id){
          qualified_pro = data2[j].qualified_professionals;
          high_schl = data2[j].high_school;
          middle_schl = data2[j].middle_school_or_lower;
        }
      }
    }


    var result_str = ""

    result_str = result_str + "Country: " + country_nam + "</br>" + "Percentage educated: " + per_edu + " %" +"</br>" + "Qualified professionals: "
    + qualified_pro + "</br>" + "Highschool graduates: " + high_schl + "</br>" +"Middle school or lower graduates: " + middle_schl + "</br>";
  }




  console.log(result_str)
  return result_str;

}


svg = d3.select("body")
        .append("svg")
        .attr("width",width)
        .attr("height",height)
        .attr("transform", "translate("+margin.left+", "+margin.top+")");

svg.call(tooltip);


q = d3.queue()
      .defer(d3.json,"us.json")
      .defer(d3.csv,"education.csv")
      .defer(d3.csv,"education_details.csv")
      .await(read);


function read(error, us, education)
  { console.log("inside read function")
console.log(education);
    d = education;

    for (i=0; i<d.length;i++){
      pmap.set(d[i].id, +d[i].percent_educated);
    }
    //console.log(pmap.get(1000));
    plotmap(error, us)
  }


function plotmap(error,us){
console.log("inside plotting map")

svg.append("g")
    .attr("class","states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter()
    .append("path")
    .style("fill",function(d){
      //console.log(d);
      //console.log(d);
      var da = dataset1;
      for(i=0;i<da.length;i++){
        if (d.id == da[i].id){
          //console.log(s(pmap.get(da[i].id)));
          return s(pmap.get(da[i].id))
        }
      }
      })

    .attr("d",path)
    .on("mouseover", tooltip.show)
    .on("mouseout", tooltip.hide);


    var l = [0,10,20,30,40,50,60,70,80,90]
    var legend=svg.selectAll(".legend")
                  .data(l);
            legend.enter()
                  .append("g")
                  .attr("class","legend");
            legend.append("rect")
                  .attr("x", width-65)
                  .attr("y", function(d,i){
                    return height/3+i*32;
                  })
                  .attr("width", 30)
                  .attr("height", 30)
                  .style("fill", function(d,i){
                    return colors[i];
                  });



            legend.append("text")
                  .text(function(d){
                   return d+"%"
                  })
                  .attr("x",width-33)
                  .attr("y", function(d,i){
                    return height/2.99+i*32 +6;
                  });
}
