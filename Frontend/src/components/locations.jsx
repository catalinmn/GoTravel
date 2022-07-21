import React, { Component } from "react";
import queryString from "query-string";
import { getUserLocations, handleLocationPref } from "../services/userService";
import { getLocations, getLocation, getReviews } from "../services/locationService";
import CardList from "./common/cardList";
import CustomModal from "./common/customModal";
import SearchBox from "./common/searchBox";

class Locations extends Component {
  state = {
    locations: [],
    searchQuery: "",
    modalShow: false,
    selectedItem: {},
    selectedItemReviews: {},

    //sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { cityId } = queryString.parse(this.props.location.search);

    const { data: locations } = await getLocations(cityId);

    this.setState({ locations });

    this.checkLocationsPref();
  }

  async checkLocationsPref() {
    const { data: locationPref } = await getUserLocations();
    const locations = [...this.state.locations];

    locations.forEach((location) => {
      this.checkIfLocationLiked(locationPref, locations, location);
    });
  }

  checkIfLocationLiked(locationPref, locations, location) {
    const index = locations.indexOf(location);
    locations[index] = { ...locations[index] };

    if (locationPref.locations.some((e) => e._id === location._id)) {
      locations[index].liked = true;
    } else {
      locations[index].liked = false;
    }

    this.setState({ locations });
  }

  handleLike = async (location) => {
    let locations = [...this.state.locations];
    const index = locations.indexOf(location);
    locations[index] = { ...locations[index] };
    locations[index].liked ^= true;
    this.setState({ locations });
    location = { ...locations[index] };
    delete location.liked;
    await handleLocationPref(location);
  };

  openModal = async (item) => {
    const reviews = await getReviews(item._id);
    //reviews.data.map((review) => delete review._id);

    this.setState({
      modalShow: true,
      selectedItem: item,
      selectedItemReviews: reviews.data,
    });
  };

  closeModal = () => {
    this.setState({ modalShow: false });
  };

  updateLocation = async (data) => {
    const locations = [...this.state.locations];
    const location = this.state.selectedItem;

    let index = {};
    locations.map((temp, ind) => {
      if (temp._id === location._id) index = ind;
    });

    locations[index] = { ...locations[index] };

    const { data: updatedLocation } = await getLocation(this.state.selectedItem._id);

    locations[index] = updatedLocation;

    this.setState({ locations, selectedItemReviews: data });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  // doSubmit = async (data) => {
  //   data["userId"] = getCurrentUser()._id;

  //   const {
  //     data: { reviews },
  //   } = await addLocationReview(this.state.selectedItem._id, data);

  //   const locations = [...this.state.locations];
  //   const location = this.state.selectedItem;

  //   let index = {};
  //   locations.map((temp, ind) => {
  //     if (temp._id === location._id) index = ind;
  //   });

  //   locations[index] = { ...locations[index] };

  //   const { data: updatedLocation } = await getLocation(this.state.selectedItem._id);

  //   locations[index] = updatedLocation;

  //   this.setState({ locations, selectedItemReviews: reviews.data });
  // };

  render() {
    let { locations } = this.state;
    const { searchQuery } = this.state;
    if (searchQuery)
      locations = this.state.locations.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return (
      <div>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <div className="scroll_style_components">
          <CardList
            items={locations}
            cardButton="locations"
            onLike={this.handleLike}
            onComment={this.openModal}
          />
        </div>
        <CustomModal
          modalShow={this.state.modalShow}
          modalClose={this.closeModal}
          updateLocation={this.updateLocation}
          selectedItem={this.state.selectedItem}
          reviews={this.state.selectedItemReviews}
        />
      </div>
    );
  }
}

export default Locations;
