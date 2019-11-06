import React from "react";
import {CSVLink} from "react-csv";
import CSVReader from "react-csv-reader";
import {withAlert} from "react-alert";

class ImportCSV extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFileLoaded = (data, filename) => {
    if (!this.validateData(data)) {
      this
        .props
        .alert
        .error("Your CSV file is badly formatted. Please try another file.");
    } else {
      const {columns, rows} = this.parseData(data);
      this
        .props
        .onCsvImported(columns, rows);
    }
  };

  parseData = data => {
    let dataCopy = data.map(row => [...row]);
    const columns = dataCopy.splice(0, 1)[0];
    let rows = [];
    dataCopy.forEach((row, rowIndex) => {
      let dataRow = {};
      row.forEach((column, columnIndex) => {
        let value = undefined;
        if (!isNaN(parseFloat(column))) 
          value = parseFloat(column);
        dataRow[columns[columnIndex]] = value;
      });
      rows.push(dataRow);
    });
    return {columns, rows};
  };

  validateData = data => {
    const headers = [...data[0]];
    const numberOfColumns = headers.length;
    for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
      let row = data[rowIndex];
      if (row.length !== numberOfColumns) 
        return false;
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        let column = row[columnIndex];
        if (column !== "" && isNaN(parseFloat(column))) 
          return false;
        }
      }
    return true;
  };

  handleError = error => {
    console.log(error);
  };
  // This is just example of handle upload CSV file < div >
  render() {
    return (<CSVReader
      cssClass="csv-reader-input"
      cssInputClass="csv-input"
      label="Import CSV..."
      onFileLoaded={this.handleFileLoaded}
      onError={this.handleError}
      inputId="import-csv"/>);
  }
}

export class ExportCSV extends React.Component {
  constructor(props) {
    super(props);
  }

  createData = () => {
    let data = [];
    let dataColumns = [];
    this
      .props
      .columns
      .forEach(columnName => {
        dataColumns.push(columnName.replace(new RegExp('["]', "g"), ""));
      });
    data.push(dataColumns);
    this
      .props
      .rows
      .forEach(row => {
        let dataRow = [];
        this
          .props
          .columns
          .forEach(columnName => {
            dataRow.push(row[columnName]);
          });
        data.push(dataRow);
      });
    return data;
  };

  render() {
    const downloadData = this.createData();
    let downloadFilename = this
      .props
      .chartTitle
      .trim()
      .toLowerCase();
    downloadFilename = downloadFilename.replace(new RegExp("\\s", "g"), "_");
    downloadFilename = downloadFilename.replace(new RegExp('[/\\"<>?*:|]', "g"), "");
    downloadFilename += ".csv";

    return (
      <CSVLink data={downloadData} filename={downloadFilename} target="_blank">
        Export CSV...
      </CSVLink >
    );
  }
}

export default withAlert(ImportCSV);
