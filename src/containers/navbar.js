import {connect} from "react-redux";
import {NavbarComponent} from "../components/navbarComponent";
import {ChartType} from "../model/actions";
import {canUndo, canRedo} from "../model/reducers";

const mapStateToProps = state => {
  return {
    columns: state.columns,
    chartTypes: ChartType,
    activeChartType: state.chartType,
    axisLabels: state.axisLabels,
    legendVisible: state.legendVisible,
    chartTitle: state.title,
    colors: state.colors,
    rows: state.rows,
    canUndo: canUndo(),
    canRedo: canRedo()
  };
};

const mapDispatchToProps = dispatch => {
  return;
};

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
