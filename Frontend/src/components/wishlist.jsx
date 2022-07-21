import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeViewer from "./common/treeView";
import { getWishlist } from "../services/userService";
import _ from "lodash";

class Wishlist extends Component {
  state = {
    wishlist: [],
    useStyles: {},

    //sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data: wishlist } = await getWishlist();

    const useStyles = makeStyles({
      root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
      },
    });
    this.setState({ wishlist, useStyles });
  }

  render() {
    return (
      <div>
        {this.state.wishlist && (
          <TreeViewer items={this.state.wishlist} classes={this.state.useStyles} />
        )}
        {_.isEmpty(this.state.wishlist) && (
          <div>
            <span D>No items added yet</span>
          </div>
        )}
      </div>
    );
  }
}
export default Wishlist;
//{this.state.wishlist === null <div>No items added yet</div>}</div>
