import React, { Component } from "react";
import queryString from "query-string";
import "./cities.css";
import { getCities, getCountryCities } from "../services/cityService";
import { getUserCities, handleCityPref } from "../services/userService";
import CardList from "./common/cardList";
import SearchBox from "./common/searchBox";

class Cities extends Component {
  state = {
    cities: [],
    searchQuery: "",
    //sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { countryId } = queryString.parse(this.props.location.search);
    if (countryId) {
      const { data: cities } = await getCountryCities(countryId);
      this.setState({ cities });
    } else {
      const { data: cities } = await getCities();
      this.setState({ cities });
    }

    this.checkCitiesPref();
  }

  async checkCitiesPref() {
    const { data: cityPref } = await getUserCities();
    const cities = [...this.state.cities];

    cities.forEach((city) => {
      this.checkIfCityLiked(cityPref, cities, city);
    });
  }

  checkIfCityLiked(cityPref, cities, city) {
    const index = cities.indexOf(city);
    cities[index] = { ...cities[index] };

    if (cityPref.cities.some((e) => e._id === city._id)) {
      cities[index].liked = true;
    } else {
      cities[index].liked = false;
    }

    this.setState({ cities });
  }

  handleLike = async (city) => {
    let cities = [...this.state.cities];
    const index = cities.indexOf(city);
    cities[index] = { ...cities[index] };
    cities[index].liked ^= true;
    this.setState({ cities });
    city = { ...cities[index] };
    delete city.liked;
    await handleCityPref(city);
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    let { cities } = this.state;
    const { searchQuery } = this.state;
    if (searchQuery)
      cities = this.state.cities.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    return (
      <div className="component-wrapper">
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <div className="scroll_style_components">
          <CardList
            items={cities}
            cardButton="cities"
            onLike={this.handleLike}
            // selectedItem={this.state.selectedGenre}
            // onItemSelect={this.handleGenreSelect}
          />
        </div>
      </div>
    );
  }
}

export default Cities;
