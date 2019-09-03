// shop 누르면 나오는 페이지 부분

import React, {Component} from 'react';
import Slider from 'react-slick';
import '../common/index.scss';

// import custom Components
import ProductListing from './common/product-listing'
import Breadcrumb from "../common/breadcrumb";
import FilterBar from "./common/filter-bar";

import { Actions } from '../../actions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class CollectionNoSideBar extends Component {

    // shouldComponentUpdate(nextProps, nextState, nextContext){
    //     console.log('nextProps', nextProps);
    //     if(this.props !== nextProps){
    //         console.log('collectionCategory >> ', nextProps.match.params);
    //         return true;
    //     }
    //     return false;
    // }

    // componentWillUpdate(nextProps, nextState){
    //     const { id } = nextProps.match.params;
    //     console.log('collectionCategory 1 >> ', id);
    //     this.props.fetchCategory(id);
    // }

    state = {
        layoutColumns:3
    }

    LayoutViewClicked(colums) {
        this.setState({
            layoutColumns:colums
        })
    }

    // componentWillMount(){
    //     this.fetchSingleProduct2();
    // }
   

    render(){
        return (
            <div>
                <Breadcrumb title={'Collection'} />

                {/*Section Start*/}
                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="collection-content col">
                                    <div className="page-main-content">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="top-banner-wrapper">
                                                        <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/mega-menu/2.jpg`}
                                                                         className="img-fluid" alt=""/></a>
                                                        <div className="top-banner-content small-section">
                                                            <h4>TodayArt | fashion ????</h4>
                                                            <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h5>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
                                                        </div>
                                                    </div>

                                                    <div className="container">

                                <div className="row">
                                    <div className="col-xl-12">								

                                    </div>
                                </div> */}
                            </div>
                                       


                                                    <div className="collection-product-wrapper">
                                                        <div className="product-top-filter">
                                                            <div className="container-fluid p-0">
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <FilterBar onLayoutViewClicked={(colmuns) => this.LayoutViewClicked(colmuns)}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="product-wrapper-grid">
                                                            <div className="container-fluid">
                                                                <div className="row">
                                                                    <ProductListing colSize={this.state.layoutColumns}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*Section End*/}

            </div>
        )
    }
}

export default CollectionNoSideBar;