import { Component } from 'react';
import { CanvasJSChart, CanvasJS } from "canvasjs-react-charts";
import html2canvas from 'html2canvas';
class App extends Component {
  saveAsImage(){
    var container = document.getElementById("chartContainer");; // full page 
            html2canvas(container, { allowTaint: true }).then(function (canvas) {

                var link = document.createElement("a");
                document.body.appendChild(link);
                link.download = "html_image.jpg";
                link.href = canvas.toDataURL();
                link.target = '_blank';
                link.click();
            });
  }
  
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Most Popular Social Networking Sites"
			},
			axisX: {
				title: "Social Network",
				reversed: true,
			},
			axisY: {
				title: "Monthly Active Users",
				includeZero: true,
				labelFormatter: this.addSymbols
      },
      export: true,
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  2200000000, label: "Facebook" },
					{ y:  1800000000, label: "YouTube" },
					{ y:  800000000, label: "Instagram" },
					{ y:  563000000, label: "Qzone" },
					{ y:  376000000, label: "Weibo" },
					{ y:  336000000, label: "Twitter" },
					{ y:  330000000, label: "Reddit" }
				]
			}]
    }
		return (
      <>
		<div id="chartContainer">
			<CanvasJSChart options = {options}
			/>
      
		</div>
    <div>
    <button onClick={()=>this.saveAsImage()}>Save as</button>
  </div>
  </>
		);
	}
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}
export default App; 