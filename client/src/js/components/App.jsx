import React from 'react';
import axios from 'axios';
import Header from './Header';
import Accomodations from './Accomodations';
import ViewsAlert from './ViewsAlert';
import Highlights from './HomeHighlights';
import HomeDescription from './HomeDescription';
import Amenities from './Amenities';
import HouseRules from './HouseRules';
import Cancellations from './Cancellations';
import Availability from './Availability';
import SleepingArrangements from './SleepingArrangements';
import '../../../css/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houseId: window.location.pathname.match(/[0-9]/gi).join(''),
      home: {},
      oldHome: {},
      host: {},
      highlights: [],
      description: [],
      nightsOfMinimumStayForDateRange: [{startDate: "2018-08-10T07:00:00.000Z", endDate: "2018-09-25T07:00:00.000Z", nightsOfMinimumStay: 6}],
      amenities: [{title:"Basic",contents:[]},
      {title:"Dining",contents:[]},
      {title:"Facilities",contents:[]},
      {title:"Guess access",contents:[]},
      {title:"Logistics",contents:[]},
      {title:"Not Included",contents:[]},
      ],
      cancellation : {}
    }
  }
  componentDidMount() {
    this.getHomeData(Math.floor(Math.random() * (100)) + 1000);
    this.getHome();
    this.getCancellation();
    this.getHost();
    this.getHighlights();
    this.getDescriptions();
    this.getAmenities();

  }

  getHome() {
    const endpoint = parseInt(this.state.houseId);
    axios.get(`/api/house/${endpoint}/`)
      .then((response) => {
        this.setState({ home: response.data });
      })
      .catch((err) => {
        console.error('error at clientfetching', err);
      });
  }

  getHost() {
    const endpoint = parseInt(this.state.houseId);
    axios.get(`/api/house/${endpoint}/host/`)
      .then((response) => {
        this.setState({ host: response.data });
      })
      .catch((err) => {
        console.error('error at clientfetching', err);
      });
  }
  getHighlights() {
    const endpoint = parseInt(this.state.houseId);
    axios.get(`/api/house/${endpoint}/highlights`)
      .then((response) => {
        this.setState({ highlights: this.state.highlights.concat(response.data) });
      })
      .catch((err) => {
        console.error('error at clientfetching', err);
      });
  }
  getDescriptions() {
    const endpoint = parseInt(this.state.houseId);
    axios.get(`/api/house/${endpoint}/description`)
      .then((response) => {
        this.setState({ description: this.state.description.concat(response.data) });
      })
      .catch((err) => {
        console.error('error at clientfetching', err);
      });
  }

  getAmenities() {
    const endpoint = parseInt(this.state.houseId);
    axios.get(`/api/house/${endpoint}/amenities`)
      .then((response) => {
        this.setState({ amenities: response.data});
      })
      .catch((err) => {
        console.error('error at clientfetching', err);
      });
  }
  getCancellation() {
    const endpoint = parseInt(this.state.houseId);
    axios.get(`/api/house/${endpoint}/cancellation/`)
      .then((response) => {
        this.setState({ cancellation: response.data});
      })
      .catch((err) => {
        console.error('error at clientfetching', err);
      });
  }

  getHomeData(id) {
    const endpoint = window.location.pathname;
    axios.get(`/rooms${endpoint}`)
      .then((response) => {
        const homeData = response.data[0];
        console.log(homeData);
        this.setState({ oldHome: homeData });
      })
      .catch((err) => {
        console.error('error at clientfetching', err);
      });
  }


  render() {
    return (
      <div>
          <div id="board">
            <div className="title_0 " >{this.state.home.propertyType}</div>
            <Header data={this.state.home} host={this.state.host} />
            <Accomodations data={this.state.home} />
            <ViewsAlert data={this.state.home.num_views} />
            <Highlights data={this.state.highlights} />
            <p className="paragraph">{this.state.home.description_comment}</p>
            <HomeDescription data={this.state.description} />
            <div id="contactHost">
              <div className="buttonHover_1" >
                <div className="button_1" >Contact host</div>
              </div>
            </div>

          </div>
          <SleepingArrangements data={this.state.home} />
          <HouseRules data={this.state.home} />
          <Cancellations data={this.state.cancellation} />

        </div>
    );
  }
}

export default App;

