import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell
} from "recharts";
import {Axis, ChartType} from "../model/actions";

const CHART_WIDTH = 800;
const CHART_HEIGHT = 600;

export class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('PROPS', this.props)
    return (
      <div style={{
        width: CHART_WIDTH,
        textAlign: "center"
      }}>
        <h2>{this.props.chartTitle}</h2>
        {this.barChart()}
        {this.pieChart()}
        {this.linearChart()}
      </div>
    );
  }

  barChart = () => {
    return (
      <BarChart width={CHART_WIDTH} height={CHART_HEIGHT} data={this.props.data}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis
          dataKey="name"
          {...(this.props.axisLabels.visible ? { label: { value: this.props.axisLabels[Axis.X], dy: 10 } } : {})}/>
        <YAxis
          {...(this.props.axisLabels.visible ? { label: { value: this.props.axisLabels[Axis.Y], dy: 10, angle: -90 } } : {})}/>
        <Tooltip/> {this.props.legendVisible && <Legend/>}
        {this
          .props
          .columns
          .map((columnName, index) => (<Bar
            key={index}
            dataKey={columnName}
            fill={this.props.colors[columnName]}
            {...(this.props.chartType === ChartType.STACKED_BAR ? { stackId: "a" } : {})}/>))}
      </BarChart>
    );
  };

  linearChart = () => {
    return (
      <LineChart width={CHART_WIDTH} height={CHART_HEIGHT} data={this.props.data}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis
          dataKey="name"
          {...(this.props.axisLabels.visible ? { label: { value: this.props.axisLabels[Axis.X], dy: 10 } } : {})}/>
        <YAxis
          {...(this.props.axisLabels.visible ? { label: { value: this.props.axisLabels[Axis.Y], dy: 10, angle: -90 } } : {})}/>
        <Tooltip/> {this.props.legendVisible && <Legend/>}
        {this
          .props
          .columns
          .map((columnName, index) => (<Line key={index} dataKey={columnName} stroke={this.props.colors[columnName]}/>))}
      </LineChart>
    );
  };

  pieChart = () => {
    function transformData(data, columns) {
      console.log('');
      let transformed = [];
      data.forEach(item => {
        let row = [];
        columns.forEach(columnName => {
          row.push({name: columnName, value: item[columnName]});
        });
        transformed.push(row);
      });
      return transformed;
    }

    const transformedData = transformData(this.props.data, this.props.columns);
    const legendItems = [];
    this
      .props
      .columns
      .forEach(columnName => {
        legendItems.push({value: columnName, color: this.props.colors[columnName]});
      });

    return (
      <PieChart width={CHART_WIDTH} height={CHART_HEIGHT}>
        <Tooltip/> {this.props.legendVisible && <Legend payload={legendItems}/>}
        {transformedData.map((dataRow, index) => (
          <Pie
            key={index}
            data={dataRow}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={(index * CHART_HEIGHT * 0.75) / transformedData.length / 2}
            outerRadius={((index + 1) * CHART_HEIGHT * 0.75) / transformedData.length / 2 - 5}>
            {this
              .props
              .columns
              .map((columnName, index) => (<Cell key={index} fill={this.props.colors[columnName]}/>))}
          </Pie>
        ))}
      </PieChart>
    );
  };
}
