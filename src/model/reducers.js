import {
  CHANGE_CHART_TYPE,
  ADD_COLUMN,
  MODIFY_COLUMN,
  DELETE_COLUMN,
  ADD_ROW,
  MODIFY_ROWS,
  DELETE_ROW,
  TOGGLE_AXIS_LABELS,
  SET_AXIS_LABEL,
  SET_CHART_TITLE,
  TOGGLE_LEGEND,
  SET_COLOR,
  IMPORT_CSV,
  UNDO,
  REDO,
  ChartType,
  Axis
} from "./actions";
// Some of actions i have added for example only and not used
const initialColumns = ["Series 1", "Series 2", "Series 3", "Series 4"];
const initialColors = ["#8884d8", "#82ca9d", "#ffc658", "#000000"];

const initialState = {
  chartType: ChartType.BAR,
  columns: initialColumns,
  rows: [
    {
      [initialColumns[0]]: 1,
      [initialColumns[1]]: 2,
      [initialColumns[2]]: 3,
      [initialColumns[3]]: 13
    }, {
      [initialColumns[0]]: 3,
      [initialColumns[1]]: 4,
      [initialColumns[2]]: 3,
      [initialColumns[3]]: 2
    }, {
      [initialColumns[0]]: 5,
      [initialColumns[1]]: 7,
      [initialColumns[2]]: 3,
      [initialColumns[3]]: 9
    }, {
      [initialColumns[0]]: 5,
      [initialColumns[1]]: 7,
      [initialColumns[2]]: 3,
      [initialColumns[3]]: 9
    }
  ],
  title: "Showcase insights",
  axisLabels: {
    visible: true,
    [Axis.X]: "Label X",
    [Axis.Y]: "Label Y"
  },
  colors: {
    [initialColumns[0]]: initialColors[0],
    [initialColumns[1]]: initialColors[1],
    [initialColumns[2]]: initialColors[2],
    [initialColumns[3]]: initialColors[3]
  },
  legendVisible: true
};

function reduceChartType(state = initialState.chartType, action) {
  switch (action.type) {
    case CHANGE_CHART_TYPE:
      return action.chartType;
    default:
      return state;
  }
}

function createNewName(name, names) {
  while (names.indexOf(name) !== -1) {
    if (isNaN(parseInt(name[name.length - 2]))) {
      name += "(1)";
    } else {
      let suffixNumber = parseInt(name[name.length - 2]) + 1;
      name = name.substring(0, name.length - 2);
      name += suffixNumber + ")";
    }
  }
  return name;
}

function reduceColumns(state = initialState.columns, action) {
  let newState = [...state];
  switch (action.type) {
    case ADD_COLUMN:
      return [
        ...newState,
        createNewName(action.name, newState)
      ];
    case MODIFY_COLUMN:
      newState[action.index] = createNewName(action.newName, newState);
      return newState;
    case DELETE_COLUMN:
      newState.splice(action.index, 1);
      return newState;
    case IMPORT_CSV:
      newState = [...action.columns];
      return newState;
    default:
      return newState;
  }
}

function reduceRows(state = initialState.rows, action, columns) {
  // deep copy of state
  let newState = state.map(row => ({
    ...row
  }));
  switch (action.type) {
    case ADD_ROW:
      let newRow = {};
      action
        .values
        .forEach((value, index) => {
          newRow[columns[index]] = value;
        });
      newState.splice(action.index, 0, newRow);
      return newState;
    case MODIFY_ROWS:
      for (let i = action.fromIndex; i <= action.toIndex; i++) {
        newState[i] = {
          ...newState[i],
          ...action.newValues
        };
      }
      return newState;
    case DELETE_ROW:
      newState.splice(action.index, 1);
      return newState;
    case ADD_COLUMN:
      const columnName = createNewName(action.name, columns);
      newState.forEach(row => {
        row[columnName] = undefined;
      });
      return [...newState];
    case MODIFY_COLUMN:
      const newColumnName = createNewName(action.newName, columns);
      newState.forEach(row => {
        row[newColumnName] = row[columns[action.index]];
        delete row[columns[action.index]];
      });
      return newState;
    case DELETE_COLUMN:
      newState.forEach(row => {
        delete row[columns[action.index]];
      });
      return newState;
    case IMPORT_CSV:
      newState = action
        .rows
        .map(row => ({
          ...row
        }));
      return newState;
    default:
      return newState;
  }
}

function reduceTitle(state = initialState.title, action) {
  switch (action.type) {
    case SET_CHART_TITLE:
      return action.title;
    default:
      return state;
  }
}

function reduceAxisLabels(state = initialState.axisLabels, action) {
  let newState = {
    ...state
  };
  switch (action.type) {
    case SET_AXIS_LABEL:
      newState[action.axis] = action.label;
      return newState;
    case TOGGLE_AXIS_LABELS:
      newState.visible = !newState.visible;
      return newState;
    default:
      return newState;
  }
}

function reduceLegend(state = initialState.legendVisible, action) {
  switch (action.type) {
    case TOGGLE_LEGEND:
      return !state;
    default:
      return state;
  }
}

function reduceColors(state = initialState.colors, action, columns) {
  let newState = {
    ...state
  };
  switch (action.type) {
    case SET_COLOR:
      newState[columns[action.columnIndex]] = action.colorValue;
      return newState;
    case ADD_COLUMN:
      // initialize new column with random color
      return {
        ...newState,
        [createNewName(action.name, columns)]: "#" + ((Math.random() * 0xffffff) << 0).toString(16)
      };
    case DELETE_COLUMN:
      delete newState[columns[action.index]];
      return newState;
    case IMPORT_CSV:
      newState = {};
      action
        .columns
        .forEach((columnName, index) => {
          let color;
          if (index < initialColors.length) 
            color = initialColors[index];
          else 
            color = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
          newState[columnName] = color;
          return newState;
        });
    default:
      return newState;
  }
}

let history = [];
let futureHistory = [];
const MAX_HISTORY_LENGTH = 10;

export function chartApp(state = {}, action) {
  if (action.type === REDO) {
    if (futureHistory.length < 1) 
      return state;
    else {
      if (history.length > MAX_HISTORY_LENGTH) {
        history.splice(0, 1);
      }
      history.push(state);
      return futureHistory.pop();
    }
  } else if (action.type === UNDO) {
    if (history.length <= 1) 
      return state;
    else {
      if (futureHistory.length > MAX_HISTORY_LENGTH) {
        futureHistory.splice(0, 1);
      }
      futureHistory.push(state);
      return history.pop();
    }
  } else {
    const newState = {
      chartType: reduceChartType(state.chartType, action),
      columns: reduceColumns(state.columns, action),
      rows: reduceRows(state.rows, action, state.columns),
      title: reduceTitle(state.title, action),
      axisLabels: reduceAxisLabels(state.axisLabels, action),
      legendVisible: reduceLegend(state.legendVisible, action),
      colors: reduceColors(state.colors, action, state.columns)
    };
    // dont let history be longer than MAX_HISTORY_LENGTH, just start forgetting the
    // oldest states
    if (history.length > MAX_HISTORY_LENGTH) {
      history.splice(0, 1);
    }
    history.push(state);
    futureHistory = [];
    return newState;
  }
}

export function canUndo() {
  return history.length > 1;
}

export function canRedo() {
  return futureHistory.length > 0;
}
