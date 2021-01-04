import { Component } from "react";
import { dataStore } from "./data.json";
import Chart from "react-apexcharts";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import download from "downloadjs";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPoints: [],
      currentYear: "",
      optionsArray: [],
      optionsArray2: [],
      optionsArray3: [
        {
          categories: [],
          data: [],
        },
      ],
      lengtharray: 0,
    };
  }
  showGraphs() {
    this.setState({ optionsArray2: this.state.optionsArray });
  }

  saveAsImage(id) {
    htmlToImage.toPng(document.getElementById(id))
      .then(function (dataUrl) {
        download(dataUrl, 'my-node.png');
      });
  }

  componentDidMount() {
    this.setState({
      lengtharray: dataStore.length,
    });


    for (let i in dataStore) {

      let xaxisData = [];
      let yaxisData = [];
      let dataPoint = [];
      let data = dataStore[i];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          let obj = {};
          if (key !== "Date") {
            obj["y"] = data[key];
            obj["label"] = key;
            dataPoint.push(obj);
            xaxisData[xaxisData.length] = data[key];
            yaxisData[yaxisData.length] = key;
          }
        }
      }
      let categoriesDataObj = {};
      categoriesDataObj["categories"] = yaxisData;
      categoriesDataObj["data"] = xaxisData;
      let array = this.state.optionsArray;
      let arr = this.state.optionsArray3;
      arr[arr.length] = categoriesDataObj;
      array.push(dataPoint);
      this.setState({ optionsArray: array, optionsArray3: arr });


      this.showGraphs();
    }
  }

  clickAll(key) {

    var el = document.getElementsByClassName('exportPNG');

    for (let i = 0; i < el.length; i++) {
      el[i].click();
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
  const mapData =
    this.state.lengtharray !== 0 &&
    this.state.optionsArray3.map((data, key) => {
      let options = {
        chart: {
          id: "basic-bar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          categories: data.categories,
        },
      };
      let series = [
        {
          name: "User % ",
          data: data.data,
        },
      ];
      return (
        <>
          {data.categories.length > 0 && data.data.length > 0 && (
            <>
              <button onClick={() => this.saveAsImage(key)}>
                Save Chart {key}
              </button>
              <div id={key} style={{ backgroundColor: "white" }}>
                <Chart
                  options={options}
                  series={series}
                  type="bar"
                  export="true"
                  width="80%"
                />
              </div>
            </>
          )}
        </>
      );
    });

  return <>{mapData}</>;
}
}
export default App;
