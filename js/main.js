//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){
    
    //map frame dimensions
    var width = 960,
        height = 460; // defines map width

    // define projection of map
    var projection = d3.geoAlbers()
        .translate([width / 2 , height / 2]) //centers map
        .scale([850]); //sets zoom scale

    var path = d3.geoPath() //defines path variable that holds objects in map
        .projection(projection);

    var map = d3.select("body") //defines map svg as a property of the body element
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    d3.queue()
        .defer(d3.csv, "data/SouthwestCSV.csv") //load attributes from csv
        .defer(d3.json, "data/Southwest.topojson") //load background spatial data
        .defer(d3.json, "data/WI_Counties.topojson") //load choropleth spatial data
        .await(callback);
    
    function callback(error, jsonData, southwest, county){
        
/*       //translate southwest and Wisconsin Counties Topojson
        var SouthWest_Counties = topojson.feature(southwest, southwest.objects.Southwest);

        
        //add Southwest Counties to the map
        var counties = map.append("path")
            .datum(SouthWest_Counties)
            .attr("class", "counties")
            .attr("d", path);   
        
        
        var state = map.append("path")
            .datum(Wisconsin_Counties)
            .attr("class", "state")
            .attr("d",path);*/
        
        //translate Wisconsin Counties & Southwest Counties
        console.log(error);
        console.log(jsonData);
        console.log(southwest);
        console.log(county);
        
    };
    
    
    function setGraticule(map, path){
        
    var graticule = d3.geoGraticule()
        .step([5, 5]);
    
    var gratBackground = map.append('path')
        .datum(graticule.outline())
        .attr('class', 'gratBackground')
        .attr('d', path);

    var gratLines = map.selectAll('.gratlines')
        .data(graticule.lines())
        .enter()
        .append('path')
        .attr('class', 'gratLines')
        .attr('d', path);

};//end of function setGraticule
};