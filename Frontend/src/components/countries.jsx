import React, { Component } from "react";

import { getCountries } from "../services/countryService";
import CardList from "./common/cardList";

class Countries extends Component {
  state = {
    countries: [],
    searchQuery: "",
    //sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data: countries } = await getCountries();

    this.setState({ countries });
  }

  render() {
    return (
      <div className="scroll_style_components">
        <CardList items={this.state.countries} cardButton="countries" />
      </div>
    );
  }
}

export default Countries;
