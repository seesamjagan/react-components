import React, { Component, Children } from "react";
import "./index.scss";

export default class Tabs extends Component {
  state = {
    index: this.props.defaultIndex || 0
  };

  onTabClick = (index, e) => {
    this.props.onTabChanging && this.props.onTabChanging(e, index);
    if (e.defaultPrevented === false) {
      this.setState({ index }, () => {
        this.props.onTabChange && this.props.onTabChange(index);
      });
    }
  };

  getTabButtonClass = index => {
    let cn = ["tab-button", this.getActiveClass(index)];
    if (this.props.tabButtonClassName) {
      cn.push(this.props.tabButtonClassName);
    }
    return cn.join(" ");
  };

  getTabViewClassName = index => {
    let cn = ["tab-view", this.getActiveClass(index)];
    if (this.props.tabViewClassName) {
      cn.push(this.props.tabViewClassName);
    }
    return cn.join(" ");
  };

  getTabClassName = () => {
    let cn = ["tabs"];
    let { tabPosition = "top", className } = this.props;
    let pos = { left: "left", right: "right", top: false, bottom: "bottom" };
    if (pos[tabPosition]) {
      cn.push(pos[tabPosition]);
    }
    if (className) {
      cn.push(className);
    }
    return cn.join(" ");
  };

  getActiveClass = index => (this.state.index === index ? "active" : null);

  renderTabButton = (child, index) => {
    let props = {
      className: this.getTabButtonClass(index)
    };
    return (
      <a {...props} onClick={this.onTabClick.bind(this, index)} key={index}>
        {child.props.tabTitle || `Tab ${index + 1}`}
      </a>
    );
  };

  renderTabView = (child, index) => {
    return (
      <div key={index} className={this.getTabViewClassName(index)}>
        {child}
      </div>
    );
  };

  render() {
    let { children } = this.props;
    let className = this.getTabClassName();
    return (
      <div className={className}>
        <div className="tab-button-holder">
          {Children.map(children, this.renderTabButton)}
        </div>
        <div className="tab-view-holder">
          {Children.map(children, this.renderTabView)}
        </div>
      </div>
    );
  }
}
