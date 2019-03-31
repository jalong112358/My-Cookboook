import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { addSearch } from "../../actions/recipeActions";
import { connect } from "react-redux";

class NavSearch extends Component {
  state = {
    search: ""
  };

  onChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let search = this.state.search;
    this.props.addSearch(search);
    this.props.history.push("/recipes");
    this.props.toggleSearchBar();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className={this.props.classes}>
        <Link className="browse" to="/recipes">
          Browse All
        </Link>
        <input
          type="text"
          name="search"
          placeholder="Find a recipe..."
          onChange={this.onChange}
        />
        <button type="submit">
          <i class="fas fa-search fa-lg" />
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  search: state.profile
});

export default connect(
  mapStateToProps,
  { addSearch }
)(withRouter(NavSearch));
