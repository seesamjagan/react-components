import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

export class ColumnData {
  static propTypes = {
    title: PropTypes.string,
    labelField: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  static defaultProps = {
    width: null
  };
}

class Column extends React.Component {
  state = {
    width: this.props.width || 0,
  };

  componentDidUpdate(prevProp) {
    if (prevProp.width !== this.props.width) {
      this.setState({
        width: this.props.width
      });
    }
  }

  render() {
    let style = {
      width: this.state.width + "px",
    };
    return (
      <div className="column" style={style}>
        {this.props.title}ndjasdkjhkasjhdkjhaskdhakjshdak
      </div>
    );
  }
}

class Header extends React.Component {
  columnConverter = col => {
    return (
      <Column
        {...col.props}
        rootWidth={this.props.rootWidth}
        width={this.childWidth}
      />
    );
  };

  render() {
    this.childCount = React.Children.count(this.props.children) || 1;
    this.childWidth = this.props.rootWidth / this.childCount;
    return (
      <header className="header">
        {React.Children.map(this.props.children, this.columnConverter)}
      </header>
    );
  }
}

export default class DataGrid extends React.Component {
  state = {
    root: null,
    rootWidth: 0
  };
  setRoot = root => {
    root && this.setState({ root, rootWidth: root.clientWidth });
  };

  handleResize = () => {
    this.resizeTaskId = null;
    this.setRoot(this.state.root);
  }

  onWindowResize = e => {
    if (this.resizeTaskId !== null) {
      clearTimeout(this.resizeTaskId);
    }
    this.resizeTaskId = setTimeout(this.handleResize, 100);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  }

  render() {
    return (
      <section className="data-grid" ref={this.setRoot}>
        <Header rootWidth={this.state.rootWidth}>{this.props.children}</Header>
        <section>this is table body</section>
      </section>
    );
  }
}

DataGrid.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf([ColumnData])
    })
  ).isRequired
};
