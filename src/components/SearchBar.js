import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Textbox } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

//import punkApi from "../service/punk.service";
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.searchOptions = [
      { value: "name", label: "Name" },
      { value: "brewed_before", label: "Brewed before" }
    ];
    this.state = {
      searchBy: "name",
      searchParams: { name: "" }
    };
  }

  changeSearchParams(searchBy) {
    this.setState({
      searchBy,
      searchParams:
        searchBy === "name" ? { name: "" } : { brewed_before: new Date() }
    });
  }
  selectDate(date) {
    this.setState({
      searchParams: { brewed_before: date }
    });
  }

  async searchBeers(event) {
    event.preventDefault();
    console.log(this.state);
    //console.log(await punkApi.getBeers(this.state.searchParams));
  }
  renderInputParam() {
    if (this.state.searchBy === "name") {
      return (
        <Textbox
          attributesInput={{
            type: "text",
            placeholder: "Search for some beers!"
          }}
          value={this.state.searchParams.name}
          onChange={(name, e) => {
            this.setState({ searchParams: { name } });
          }}
          onBlur={e => {}}
          validationOption={{
            reg: /^[0-9A-Za-z\s\-]+$/,
            regMsg: "Use only letters, numbers, hyphens and spaces."
          }}
        />
      );
    }
    return (
      <DatePicker
        selected={this.state.searchParams.brewed_before}
        onChange={date => this.selectDate(date)}
      />
    );
  }

  renderSearchOptions() {
    return this.searchOptions.map(option => {
      return (
        <div className="form-check" key={option.value}>
          <input
            className="form-check-input"
            type="radio"
            style={{ display: "block", opacity: 1 }}
            value={option.value}
            checked={this.state.searchBy === option.value}
            onChange={() => this.changeSearchParams(option.value)}
          />
          <label className="form-check-label">{option.label}</label>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <form className="row" onSubmit={event => this.searchBeers(event)}>
          <div className="form-group col-md-3 col-xs-12">
            {this.renderInputParam()}
          </div>
          <div className="col-md-6 col-xs-12">{this.renderSearchOptions()}</div>
          <div className="form-group col-md-3 col-xs-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;