import React, { Component } from "react";
import {
  getActiveWorkSpace,
  setActiveWorkSpace,
} from "../../utils/StorageUtils";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [],
      selectedWorkspace: null,
      newWorkspace: "",
    };
  }

  render() {
    return (
      <section className="login-block">
        Dashboard {getActiveWorkSpace()}
        <button
          onClick={() => {
            setActiveWorkSpace(null);
            this.props.onRefreshWorkSpace();
          }}
        >
          Switch Workspace
        </button>
      </section>
    );
  }
}

export default Page;
