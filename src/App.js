import { Component } from "react";
import { CanvasJSChart, CanvasJS } from "canvasjs-react-charts";
import html2canvas from "html2canvas";
import { dataStore } from "./data.json";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPoints: [],
      currentYear: "",
      optionsArray: [],
      optionsArray2: [],
    };
  }
  showGraphs() {
    this.setState({ optionsArray2: this.state.optionsArray });
  }

  saveAsImage(data) {
    this.setState({ dataPoints: data }, () => {
      var container = document.getElementById("chartContainer"); // full page
      html2canvas(container, { allowTaint: true }).then(function (canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "html_image.jpg";
        link.href = canvas.toDataURL();
        link.target = "_blank";
        link.click();
        // this.wait(3000);
        this.setState({
          dataPoints: [],
        });
      });
    });
  }

  componentDidMount() {
    console.log(dataStore);

    for (let i in dataStore) {
      console.log(dataStore[i]);
      let dataPoint = [];
      let data = dataStore[i];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          let obj = {};
          if (key !== "Date") {
            obj["y"] = data[key];
            obj["label"] = key;
            dataPoint.push(obj);
          }
        }
      }
      let array = this.state.optionsArray;
      array.push(dataPoint);
      this.setState({ optionsArray: array });
      //   this.setState({dataPoints: dataPoint},()=>{
      //   this.saveAsImage(dataPoint);
      //   this.wait(3000);
      //   this.setState({dataPoints:[]},()=>{
      // console.log(dataPoint);
      // dataPoint = [];
      // console.log(dataPoint);
      //   });
      // console.log(this.state.dataPoints, this.state.currentYear);
      // console.log("before");
      // // this.wait(5000);
      // console.log("after");
      //   });
    }
  }

  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  render() {
    
    const mapData = this.state.optionsArray2.map((data, key) => {
      let options = {
        animationEnabled: false,
        theme: "light2",
        title: {
          text: "Most Popular Web Browsers",
        },
        culture: "es",
        axisX: {
          title: "Web Browsers",
          reversed: true,
          // labelAngle: -70,
          interval: 1,
        },
        axisY: {
          title: "Monthly Active Users % in " + key,
          includeZero: true,
          interval: 10,
          maximum: 100,
          minimum: 0,
        },
        data: [
          {
            type: "bar",
            dataPoints: data,
          },
        ],
      };
      return (
        <div id="key">
          <CanvasJSChart key={"graph" + key} options={options} />
        </div>
      );
    });
    return (
      <>
        {mapData}

        <div>
          <button onClick={() => this.showGraphs()}>Save as</button>
        </div>
      </>
    );
  }
  // addSymbols(e){
  // 	var suffixes = ["", "K", "M", "B"];
  // 	var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
  // 	if(order > suffixes.length - 1)
  // 		order = suffixes.length - 1;
  // 	var suffix = suffixes[order];
  // 	return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  // }
}
export default App;
