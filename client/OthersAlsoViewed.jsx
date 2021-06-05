import React from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';
import {Container, Header, ButtonWrapper, TrackingLine, Line} from './style_OthersAlsoViewed.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faChevronCircleRight, faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons';

class OthersAlsoViewed extends React.Component {
  constructor(props) {
    super(props);

    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);

    this.state = {
      page: null,
      allItems: {},
      pages: {}
    };
  }

  async componentDidMount() {
    let newState = {};
    let allItems = newState.allItems = {};
    let pages = newState.pages = {};
    const id = window.location.href.split('/')[3];
    const response = await axios.get(`/similar-products-by-views/${id}`);
    // C.Tan 6/3/2021: With the refactor to Postgres, the response returned from the server now provides the similar items as an array without a similar_items property to reference so updating how data variable is set.
    // const data = response.data[0].similar_items;
    const data = response.data;
    newState.page = 1;

    for (let i = 0, j = 1; i < data.length && i < 16; i++) {
      allItems[data[i]] = {};
      if (!pages[j]) {
        pages[j] = [];
      }
      if (pages[j].length === 3) {
        pages[j].push(data[i]);
        j++;
      } else {
        pages[j].push(data[i]);
      }
    }

    const mapToAllItems = (APIdata, storage) => {
      if (!APIdata) return;
      for (const item of APIdata) {
        for (const key in item) {
          if ( storage[item._id] && key !== 'id' && key !== '_id') {
            storage[item._id][key] = item[key];
          }
        }
      }
    }

    const aboutPromiseChain = await data.map(async (itemID) => {
      try {
        //C.Tan: Removing calls to other services while performance/stress testing just the 'others also viewed' service.
        // const response = await axios.get(`http://ec2-3-86-58-21.compute-1.amazonaws.com:3003/api/product/${itemID}`);
        const response = {data: []};
        const data = response.data;
        let prep;
        if (data) {
          prep = {
            _id: data._id,
            brand: data.brand,
            category: data.category,
            price: data.price
          };
        }
        return prep;
      } catch {
        return {
          _id: itemID,
          brand: null,
          category: null,
          price: null
        };
      }
    });

    const imagesPromiseChain = await data.map(async (itemID) => {
      try {
        //C.Tan: Removing calls to other services while performance/stress testing just the 'others also viewed' service.
        const response = {data: []};
        // const response = await axios.get(`http://54.67.28.46:3004/images/sizeService/${itemID}`);
        const data = response.data[0];
        let prep = {
          _id: itemID,
          image: data
        };
        return prep;
      } catch {
        return {
          _id: itemID,
          image: null
        };
      }
    });

    const dataCSV = data.join(',');
    //C.Tan: Removing calls to other services while performance/stress testing just the 'others also viewed' service.
    const reviewsAPICall = {data: []};
    // const reviewsAPICall = await axios.get(`http://100.25.191.161/api/reviews/${dataCSV}`);
    const reviewsPromiseChain = reviewsAPICall.data;

    const sizeDataPromiseChain = await data.map(async (itemID) => {
      try {
        //C.Tan: Removing calls to other services while performance/stress testing just the 'others also viewed' service.
        const response = {data: []};
        // const response = await axios.get(`http://18.221.34.3:3002/api/sizes/${itemID}`);
        const data = response.data;
        let prep = {
          _id: data.id,
          title: data.title
        };
        return prep;
      } catch {
        return {
          _id: itemID,
          title: null
        };
        return prep;
      }
    });

    //C.Tan: Removing calls to other services while performance/stress testing just the 'others also viewed' service.
    // const about = await Promise.all(aboutPromiseChain);
    // const images = await Promise.all(imagesPromiseChain);
    // const reviews = await Promise.all(reviewsPromiseChain);
    // const sizeData = await Promise.all(sizeDataPromiseChain);

    // for (const api of [about, images, reviews, sizeData]) {
    //   mapToAllItems(api, allItems);
    // }

    this.setState(newState);
  }

  prevPage(e) {
    let currentPage = this.state.page;
    if (currentPage !== 1) {
      currentPage--;
      this.setState({page: currentPage});
    }
  }

  nextPage(e) {
    let currentPage = this.state.page;
    if (currentPage !== 4) {
      currentPage++;
      this.setState({page: currentPage});
    }
  }

  render() {
    return(
      <Container>
        <Header>Others also viewed</Header>
        <ButtonWrapper>
          <FontAwesomeIcon icon={faChevronCircleLeft} size="2x" onClick={this.prevPage}/>
          <FontAwesomeIcon onClick={this.nextPage} icon={faChevronCircleRight} size="2x" />
        </ButtonWrapper>
        <div>
          <div hidden={this.state.page !== 1}>
            <Carousel data={this.state.allItems} items={this.state.pages[1]}/>
          </div>
          <div hidden={this.state.page !== 2}>
            <Carousel data={this.state.allItems} items={this.state.pages[2]}/>
          </div>
          <div hidden={this.state.page !== 3}>
            <Carousel data={this.state.allItems} items={this.state.pages[3]}/>
          </div>
          <div hidden={this.state.page !== 4}>
            <Carousel data={this.state.allItems} items={this.state.pages[4]}/>
          </div>
        </div>
        <Line>
          <TrackingLine
            isActive={this.state.page === 1}>
          </TrackingLine>
          <TrackingLine
            isActive={this.state.page === 2}>
          </TrackingLine>
          <TrackingLine
            isActive={this.state.page === 3}>
          </TrackingLine>
          <TrackingLine
            isActive={this.state.page === 4}>
          </TrackingLine>
        </Line>
      </Container>
    );
  };
}

export default OthersAlsoViewed;