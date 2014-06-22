// Main function
$(document).ready(function () {

    bindEvents();

});

// Bind events
var bindEvents = function () {
    getLineChartData();
    getDoughnutData();
    getSidebar();
    getBarChartData();

    $('#movieSidebar').on('click', '.movie-choice', loadPosts);

};

var getLineChartData = function () {
    $.ajax({
        url: 'api/get_linechartdata',
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            console.log(data);
            var date = new Date();
            var currentHour = date.getHours();
            labels: [currentHour];
            var chartData = {
                labels: ['' + currentHour - 6 + ':00', '' + currentHour - 5 + ':00', '' + currentHour - 4 + ':00', ''
                    + currentHour - 3 + ':00', '' + currentHour - 2 + ':00', '' + currentHour - 1 + ':00'
                ],
                datasets: [
                    {
                        fillColor: "rgba(38,145,241,.4)",
                        strokeColor: "rgba(42,66,86,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        data: [data[6], data[5], data[4], data[3], data[2], data[1]]
                    },
                    {
                        fillColor: "rgba(219,186,52,0.4)",
                        strokeColor: "rgba(246,59,87,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        data: [20, 60, 42, 58, 31, 21, 50]
                    }
                ]
            };
            var options = {
                //Boolean - If we show the scale above the chart data
                scaleOverlay: false,
                //Boolean - If we want to override with a hard coded scale
                scaleOverride: true,
                //** Required if scaleOverride is true **
                //Number - The number of steps in a hard coded scale
                scaleSteps: 8,
                //Number - The value jump in the hard coded scale
                scaleStepWidth: 20,
                //Number - The scale starting value
                scaleStartValue: null,
                //String - Colour of the scale line
                scaleLineColor: "rgba(0,0,0,.1)",
                //Number - Pixel width of the scale line
                scaleLineWidth: 1,
                //Boolean - Whether to show labels on the scale
                scaleShowLabels: true,
                //Interpolated JS string - can access value
                scaleLabel: "<%=value%>",
                //String - Scale label font declaration for the scale label
                scaleFontFamily: "'Arial'",
                //Number - Scale label font size in pixels
                scaleFontSize: 12,
                //String - Scale label font weight style
                scaleFontStyle: "normal",
                //String - Scale label font colour
                scaleFontColor: "#666",
                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,
                //String - Colour of the grid lines
                scaleGridLineColor: "rgba(0,0,0,.05)",
                //Number - Width of the grid lines
                scaleGridLineWidth: 1,
                //Boolean - Whether the line is curved between points
                bezierCurve: false,
                //Boolean - Whether to show a dot for each point
                pointDot: true,
                //Number - Radius of each point dot in pixels
                pointDotRadius: 3,
                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,
                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,
                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 4,
                //Boolean - Whether to fill the dataset with a colour
                datasetFill: false,
                //Boolean - Whether to animate the chart
                animation: true,
                //Number - Number of animation steps
                animationSteps: 60,
                //String - Animation easing effect
                animationEasing: "easeOutQuart",
                //Function - Fires when the animation is complete
                onAnimationComplete: null
            };
            var ctx = $('#hourlyChart')[0].getContext("2d");
            new Chart(ctx).Line(chartData, options);
        }
    });
};

var getSidebar = function() {
    $.ajax({
        url: 'api/get_sidebar',
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            console.log("getSidebar: " + data);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var movie = key.toLowerCase().replace(/ /g, "");
                    console.log(movie);
                    if (data[key] === 0) {
                        $('#movieSidebar').append('<li><a class="movie-choice"  id="' + movie + '" data-movie-title="' + key + '" href="#">' + key + '<span class=" text-success glyphicon glyphicon-circle-arrow-up pull-right"></span></a></li>')
                    } else if (data[key] === 1) {
                        $('#movieSidebar').append('<li ><a class="movie-choice" id="' + movie + '" data-movie-title="' + key + '" href="#">' + key + '<span class=" text-success glyphicon glyphicon-circle-arrow-up pull-right"></span></a></li>')
                    } else {
                        $('#movieSidebar').append('<li><a class="movie-choice" id="' + movie + '" data-movie-title="' + key + '" href="#">' + key + '<span class=" text-danger glyphicon glyphicon-circle-arrow-down pull-right"></span></a></li>')
                    }
                }
            }
        }
    });
};

var getDoughnutData = function () {
    $.ajax({
        url: 'api/get_doughnutdata',
        dataType: 'json',
        type: 'GET',
        success: function (data) {

            var names = [];
            for (key in data) {
                names.push(key);
            }
            console.log(data);
            var doughnutData = [
                {
                    value: data[names[0]],
                    color: "#F7464A"
                },
                {
                    value: data[names[1]],
                    color: "#718D8A"
                },
                {
                    value: data[names[3]],
                    color: "#D4CCC5"
                },
                {
                    value: data[names[2]],
                    color: "#949FB1"
                },
                {
                    value: data[names[4]],
                    color: "#4D5360"
                }
            ];
            var options = {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,

                //String - The colour of each segment stroke
                segmentStrokeColor: "#fff",

                //Number - The width of each segment stroke
                segmentStrokeWidth: 2,

                //The percentage of the chart that we cut out of the middle.
                percentageInnerCutout: 50,

                //Boolean - Whether we should animate the chart
                animation: true,

                //Number - Amount of animation steps
                animationSteps: 100,

                //String - Animation easing effect
                animationEasing: "easeOutBounce",

                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate: true,

                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale: false,

                //Function - Will fire on animation completion.
                onAnimationComplete: populateDoughnutLabels(names, data)
            };
            //Get context with jQuery - using jQuery's .get() method.
            var ctx = $("#doughnutChart").get(0).getContext("2d");
            //This will get the first returned node in the jQuery collection.
            var myNewChart = new Chart(ctx).Doughnut(doughnutData, options);

            var ctx = $("#doughnutChart2").get(0).getContext("2d");
            //This will get the first returned node in the jQuery collection.
            var myNewChart2 = new Chart(ctx).Doughnut(doughnutData, options);


        }

    });
};
    
    
var populateDoughnutLabels = function(names, data) {
    $('#doughnutSpace').append('<p class="text-center" style="color: #F7464A; margin: 0 auto;">' + names[0] + ': ' + data[names[0]] + '</p>');
    $('#doughnutSpace').append('<p class="text-center" style="color: #718D8A; margin: 0 auto;">' + names[1] + ': ' + data[names[1]] + '</p>');
    $('#doughnutSpace').append('<p class="text-center" style="color: #9C9893; margin: 0 auto;">' + names[3] + ': ' + data[names[3]] + '</p>');
    $('#doughnutSpace').append('<p class="text-center" style="color: #949FB1; margin: 0 auto;">' + names[2] + ': ' + data[names[2]] + '</p>');
    $('#doughnutSpace').append('<p class="text-center" style="color: #4D5360; margin: 0 auto;">' + names[4] + ': ' + data[names[4]] + '</p>');
};

var loadPosts = function () {
    // Get the movie name from data object
    movieName = getMovieName(this);
    var encoded = encodeURIComponent(movieName);
    // Send request for posts
    $('#movieSidebar li').removeClass('active');
    $(this).parent().addClass('active');

    $.get( 'api/get_posts?movie='+ encoded, function( data ) {
        // Set new title
        $('#post-header').text(movieName);
        // Clear table
        table = $('#post-feed');
        table.empty();
        // Repopulate posts
        table.append('<tr><th>Time</th><th>Tweet</th><th>Confidence</th></tr>');
        $.each(JSON.parse(data), function(idx, obj) {
            if (obj.semantic === 0) {
                if (obj.confidence > 85) {
                    table.append('<tr class="danger"><td style="width: 20%;">' + obj.time + '</td><td>' + obj.text + '</td><td>' + obj.confidence + '</td></tr></tbody>')
                } else {
                    table.append('<tr><td style="width: 20%;">' + obj.time + '</td><td>' + obj.text + '</td><td>' + obj.confidence + '</td></tr></tbody>')
                }

            } else if (obj.semantic === 1) {

                table.append('<tr><td style="width: 20%;">' + obj.time + '</td><td>' + obj.text + '</td><td>' + obj.confidence + '</td></tr></tbody>')

            } else {
                if (obj.confidence > 85) {
                    table.append('<tr class="success"><td style="width: 20%;">' + obj.time + '</td><td>' + obj.text + '</td><td>' + obj.confidence + '</td></tr></tbody>')
                } else {
                    table.append('<tr><td style="width: 20%;">' + obj.time + '</td><td>' + obj.text + '</td><td>' + obj.confidence + '</td></tr></tbody>')
                }
            }
        });


    });
};

var getBarChartData = function () {
//    $.ajax({
//        url: 'api/get_doughnutdata',
//        dataType: 'json',
//        type: 'GET',
//        success: function (data) {
//
//
//        }
//    });

    var data = {
        labels: ["Positive", "Negative", "Neutral"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                data: [60, 45, 30]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                data: [86, 90, 78]
            }
        ]
    }
    var options = {

        //Boolean - If we show the scale above the chart data
        scaleOverlay: false,

        //Boolean - If we want to override with a hard coded scale
        scaleOverride: false,

        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps: null,
        //Number - The value jump in the hard coded scale
        scaleStepWidth: null,
        //Number - The scale starting value
        scaleStartValue: null,

        //String - Colour of the scale line
        scaleLineColor: "rgba(0,0,0,.1)",

        //Number - Pixel width of the scale line
        scaleLineWidth: 1,

        //Boolean - Whether to show labels on the scale
        scaleShowLabels: true,

        //Interpolated JS string - can access value
        scaleLabel: "<%=value%>",

        //String - Scale label font declaration for the scale label
        scaleFontFamily: "'Arial'",

        //Number - Scale label font size in pixels
        scaleFontSize: 12,

        //String - Scale label font weight style
        scaleFontStyle: "normal",

        //String - Scale label font colour
        scaleFontColor: "#666",

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,

        //Boolean - Whether to animate the chart
        animation: true,

        //Number - Number of animation steps
        animationSteps: 60,

        //String - Animation easing effect
        animationEasing: "easeOutQuart",

        //Function - Fires when the animation is complete
        onAnimationComplete: null

    }
    var ctx = $("#barGraph1").get(0).getContext("2d");
    var myNewChart = new Chart(ctx).Bar(data, options);
}

var getMovieName = function(element){
    var title = $(element).attr('data-movie-title');
    return title === undefined ? '' : title;
};
