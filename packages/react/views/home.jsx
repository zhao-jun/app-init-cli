import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { toJS } from "mobx";

@inject("homeStore")
@observer
export default class Home extends Component {
  homeStore = this.props.homeStore;

  componentDidMount() {
    this.homeStore.getHomeList();
  }

  updateText = () => {
    this.homeStore.updateText("yeah!");
  };

  render() {
    const homeStore = this.homeStore;
    const { title } = homeStore;
    return <div onClick={this.updateText}>{title}</div>;
  }
}
