function isAddress(string) {
  try {
    bitcoin.address.fromBase58Check(string);
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
}
function parseHexString(str) {
    var result = [];
    while (str.length >= 2) {
        result.push(parseInt(str.substring(0, 2), 16));
        str = str.substring(2, str.length);
    }

    return result;
}

function getBalance(addr){
	var innerAddr = addr;

  // first check if its a pubkey
  try{



  var testing = Buffer.Buffer(addr,"hex");
  //var secp256k1 = ecurve.getCurveByName("secp256k1");
  //var Q = ecurve.Point.decodeFrom(secp256k1, testing);
  //console.log(Q);
  //var ec = bitcoin.ECPair(null,Q,{compressed: Q.compressed});
  //console.log(ec);

  var ec = bitcoin.ECPair.fromPublicKeyBuffer(testing);
  var add = ec.getAddress();
  console.log("found addr: " + add);
  innerAddr = add;
  }
  catch(e){
  }

  if(!isAddress(innerAddr)){
	    document.getElementById("getpy").innerHTML="<p align=center style='padding-top: 30px;'>" + innerAddr + "<br><br>is <b><font color=red>not a valid bitcoin address or public key</font></b>.</p>";
	    location.href="#openModal";
	    return;
   }

	var xmlHttp = new XMLHttpRequest();
	    xmlHttp.onreadystatechange = function() {
    		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    		{
    			document.getElementById("getpy").innerHTML = xmlHttp.responseText;
    			location.href="#openModal";
    		}
	    };
	    xmlHttp.open("GET", "/lookup?addr=" + innerAddr, true); // true for asynchronous
	    xmlHttp.send(null);
}

(function($){

	// Declare global variables
	var map,
		mapLatLng;

	$(window).on('load', function(){

		// Remove loading indicator
		setTimeout(function(){



			$('#preload-content').fadeOut(400, function(){
				$('#preload').fadeOut(800);
				$('.fadeInLeft, .fadeInRight').addClass('animate');
			});
		}, 400);

	});

	$(document).ready( function(){
    var points = [397000,400000,403000,406000,409000,412000,415000,418000,421000,424000,425920,425921,430000];

	  var line1=[];
    for (var i in points) {
        var p = -(4000/25920)*(points[i]-400000)+8000;
        if(p>8000) p=8000;
        if(points[i]>425920) p=0;
        line1.push([points[i],p]);
    }
    console.log(line1);

	var temp = {
        seriesStyles: {
            seriesColors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo'],
            highlightColors: ['lightpink', 'lightsalmon', 'lightyellow', 'lightgreen', 'lightblue', 'mediumslateblue']
        },
        legend: {
            fontSize: '8pt'
        },


        axesStyles: {
           borderWidth: 0,
           ticks: {
               fontSize: '8pt',
               fontFamily: 'Helvetica',
               textColor: '#606873'
           },
           label: {
               fontFamily: 'Helvetica',
               textColor: '#606873'
           }
        },
        title: {
            fontSize: '8pt',
            textColor: '#606873'
        },
        grid: {
            backgroundColor: '#ffffff',
            gridLineColor: '#cfcfcf',
            gridLineWidth: 1,
            shadow: false        }
    	};
	$.plot2 = null;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "/misc/current_block.txt", false); // true for asynchronous
	xmlHttp.send(null);
	var xvar = parseInt(xmlHttp.responseText);





	$.plot2 = $.jqplot ('chart2', [line1], {
	      // Give the plot a title.
	      title: 'Fig 1: Amount of ELC Received Per BTC Depending on Buy-In Time',
	      // You can specify options for all axes on the plot at once with
	      // the axesDefaults object.  Here, we're using a canvas renderer
	      // to draw the axis label which allows rotated text.
	      axesDefaults: {
	        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
	      },
				seriesDefaults: {
	          rendererOptions: {
	              smooth: false
	          }
	      },
	      axes: {
	          xaxis:{
		          min:397000,
							max:430000,
		          tickInterval:3000,
							pad: 0,
		          label:'Time of Buy-In (Bitcoin block)'
	          },
						yaxis:{
							min:0,
							max:8000
						},

	      }, canvasOverlay: {
			   show: true,
			   objects: [
			       {verticalLine: {
			           name: 'stack-overflow',
			           x: xvar, // x-axis position where you want to draw the vertical line.
			           lineWidth: 6,
			           color: 'rgb(0, 0, 0)',
			           shadow: false
			       }}
			    ]
			}
	    });
  	    $.plot2.themeEngine.newTheme('neat', temp);
		$.plot2.activateTheme('neat');










		// Add background image
		$('.left-wrap .bg').backstretch('images/bg.jpg');

		// Invoke the Placeholder plugin
		$('input, textarea').placeholder();

		// Validate newsletter form
		$('<div class="spinner"><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div></div>').hide().appendTo('.newsletter');
		$('<div class="success"></div>').hide().appendTo('.newsletter');
		$('#newsletter-form').validate({
			rules: {
				newsletter_email: { required: true, email: true }
			},
			messages: {
				newsletter_email: {
					required: 'Email address is required',
					email: 'Email address is not valid'
				}
			},
			errorElement: 'span',
			errorPlacement: function(error, element){
				error.appendTo(element.parent());
			},
			submitHandler: function(form){
				$(form).hide();
				$('.newsletter').find('.spinner').css({ opacity: 0 }).show().animate({ opacity: 1 });
				$.post($(form).attr('action'), $(form).serialize(), function(data){
					$('.newsletter').find('.spinner').animate({opacity: 0}, function(){
						$(this).hide();
						$('.newsletter').find('.success').show().html('<i class="icon ion-ios7-checkmark-outline"></i> Thank you for subscribing!').animate({opacity: 1});
					});
				});
				return false;
			}
		});









	});


})(jQuery);
 $(document).ready(function() {




		// Create a countdown instance. Change the launchDay according to your needs.
		// The month ranges from 0 to 11. I specify the month from 1 to 12 and manually subtract the 1.
		// Thus the launchDay below denotes 5 December, 2015.
		var launchDay = new Date(2016, 6, 25);
		$('#countdown-timer').countdown({
			until: launchDay,
			format: 'DHMS'
		});

      
    });
