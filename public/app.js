'use strict';
// Create audio context

var AUDIO = new (window.AudioContext || window.webkitAudioContext)();
if(!AUDIO) console.error('Web Audio API not supported :(');
;
// Create and configure analyzer node and storage buffer
var analyzer = AUDIO.createAnalyser();
analyzer.fftSize = 128;

var bufferLength = analyzer.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

// grabs the audio HTML element
var song = document.getElementById('audioElement');


function init() {
  // Connect song to analyzer and analyzer to audio-out
  var source = AUDIO.createMediaElementSource(song);
  source.connect(analyzer);
  analyzer.connect(AUDIO.destination);
  loop();
}


// analyser.getByteFrequencyData(frequencyData);
function loop() {
  requestAnimationFrame(loop);
  analyzer.getByteFrequencyData(dataArray);
  // console.log(dataArray);
  var newArr = dataArray.slice(43);
  song.play();
  myChart.data.datasets[0].data = newArr;
  // updateChart();
  myChart.update();
}


var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['', '', '', '', '','', '', '', '', '', '', '', '', '', '','', '', '', '', '', ''],
    datasets: [{
      label: '',
      data: [19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
      backgroundColor: [
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 255, 0)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 0
    }]
  },
  options: {
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          lineWidth: 0,
          color: 'rgba(255,255,255,0)'
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});




song.addEventListener('loadeddata', init, false);