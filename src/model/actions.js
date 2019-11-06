export const CHANGE_CHART_TYPE = "CHANGE_CHART_TYPE";
export const ADD_ROW = "ADD_ROW";
export const MODIFY_ROWS = "MODIFY_ROWS";
export const DELETE_ROW = "DELETE_ROW";
export const ADD_COLUMN = "ADD_COLUMN";
export const MODIFY_COLUMN = "MODIFY_COLUMN";
export const DELETE_COLUMN = "DELETE_COLUMN";
export const TOGGLE_AXIS_LABELS = "TOGGLE_AXIS_LABELS";
export const SET_AXIS_LABEL = "SET_AXIS_LABEL";
export const SET_CHART_TITLE = "SET_CHART_TITLE";
export const TOGGLE_LEGEND = "TOGGLE_LEGEND";
export const SET_COLOR = "SET_COLOR";
export const IMPORT_CSV = "IMPORT_CSV";
export const UNDO = "UNDO";
export const REDO = "REDO";

// Some of actions i have created for example only

export const ChartType = {
  LINEAR: "Line",
  BAR: "Bar",
  PIE: "Pie",
  SCATTER: "Scatter",
  STACKED_BAR: "Stacked bar"
};

export const Axis = {
  X: "X",
  Y: "Y"
};

/*
 * action creators
 */

export function changeChartType(chartType) {
  return {type: CHANGE_CHART_TYPE, chartType};
}

export function addRow(index, values) {
  return {type: ADD_ROW, index, values};
}

export function modifyRows(fromIndex, toIndex, newValues) {
  return {type: MODIFY_ROWS, fromIndex, toIndex, newValues};
}

export function deleteRow(index) {
  return {type: DELETE_ROW, index};
}

export function addColumn(name) {
  return {type: ADD_COLUMN, name};
}

export function modifyColumn(index, newName) {
  return {type: MODIFY_COLUMN, index, newName};
}

export function deleteColumn(index) {
  return {type: DELETE_COLUMN, index};
}

export function toggleAxisLabels() {
  return {type: TOGGLE_AXIS_LABELS};
}

export function setAxisLabel(axis, label) {
  return {type: SET_AXIS_LABEL, axis, label};
}

export function setChartTitle(title) {
  return {type: SET_CHART_TITLE, title};
}

export function toggleLegend() {
  return {type: TOGGLE_LEGEND};
}

export function setColor(columnIndex, colorValue) {
  return {type: SET_COLOR, columnIndex, colorValue};
}

export function importCsv(columns, rows) {
  return {type: IMPORT_CSV, columns, rows};
}

export function undo() {
  return {type: UNDO};
}

export function redo() {
  return {type: REDO};
}
