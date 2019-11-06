import { connect } from "react-redux";
import { ChartComponent } from "../components/chartComponent";

function transformData(columns, rows) {
  let data = [];
  rows.forEach((row, rowIndex) => {
    let point = { name: rowIndex };
    columns.forEach(columnName => {
      point[columnName] = row[columnName];
    });
    data.push(point);
  });
  return data;
}

const mapStateToProps = state => {
  return {
    chartType: state.chartType,
    columns: state.columns,
    data: transformData(state.columns, state.rows),
    axisLabels: state.axisLabels,
    legendVisible: state.legendVisible,
    colors: state.colors,
    chartTitle: state.title
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export const Chart = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartComponent);
