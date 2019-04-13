import React, { Component } from "react";
import DataGrid, { ColumnData } from "./components/data-grid";

export default class App extends Component {
  render() {
    return (
      <div>
        <DataGrid>
          <ColumnData title="First Name" labelField="firstName" />
          <ColumnData title="Last Name" labelField="lastName" />
          <ColumnData title="Date Of Birth (DOB)" labelField="dob" />
          <ColumnData title="Gender" labelField="gender" />
        </DataGrid>
      </div>
    );
  }
}
