import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Page,
  Inject,
  Search,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import "../../assets/sf/grid.css";
import { labService } from "../../services/labs";
import { AppContext } from "../../context/appContext";
import React from "react";

const toolbarOptions = ["Search"];

export class LabList extends React.Component {
  constructor() {
    super(...arguments);
    this.template = this.gridTemplate;
  }
  service = labService(this.context.token);
  grid;
  data;

  pageSettings = { pageSize: 10 };
  renderComplete() {
    if (
      this.grid &&
      this.grid.dataSource instanceof Array &&
      !this.grid.dataSource.length
    ) {
      const state = { skip: 0, take: this.pageSettings.pageSize };
      this.dataStateChange(state);
    }
  }
  dataStateChange(state) {
    // console.log("State:", state);
    const searchTerm = state?.search?.[0]?.key || "";
    let page = 1;
    let take = state.take || 1;
    const skip = state.skip || 0;
    if (state.skip > 0) page = 1 + skip / take;
    this.service.getPage(page, take, searchTerm).then((gridData) => {
      if (this.grid) {
        this.grid.dataSource = gridData;
      }
    });
  }

  gridTemplate(props) {
    const id = props.id;
    return (
      <div className="text-danger">
        <ButtonComponent
          onClick={() => console.log("clicked:", id)}
          cssClass="e-info"
        >
          Request
        </ButtonComponent>
      </div>
    );
  }

  static contextType = AppContext;

  render() {
    this.renderComplete = this.renderComplete.bind(this);
    this.dataStateChange = this.dataStateChange.bind(this);
    return (
      <div className="control-pane">
        <div className="control-section">
          <GridComponent
            dataSource={this.data}
            ref={(g) => (this.grid = g)}
            pageSettings={this.pageSettings}
            dataBound={this.renderComplete}
            dataStateChange={this.dataStateChange}
            allowPaging={true}
            toolbar={toolbarOptions}
          >
            <ColumnsDirective>
              <ColumnDirective headerText="No" width="20" textAlign="Right" />
              <ColumnDirective field="name" headerText="Lab Name" width="100" />
              <ColumnDirective field="code" headerText="Lab Code" width="30" />
              <ColumnDirective
                field="startDate"
                headerText="Starts"
                width="70"
              />

              {/* <ColumnDirective field='StopDate' headerText='Ends' width='70' /> */}
              <ColumnDirective
                headerText="Request Access"
                width="60"
                template={this.template}
              />
            </ColumnsDirective>
            <Inject services={[Page, Search, Toolbar]} />
          </GridComponent>
        </div>
      </div>
    );
  }
}

export default LabList;
