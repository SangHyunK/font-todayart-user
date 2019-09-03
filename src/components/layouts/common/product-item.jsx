// 메인 홈화면에 대한 부분

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';
import {addToCart, Actions} from '../../../actions'
import {ActionTypes} from '../../../constants/ActionTypes'
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Files } from '../../../utils';

class ProductItem extends Component {

    constructor(props){
        super(props)

        this.state = {
            open: false,
            stock: 'InStock',
            quantity: 1,
            image: '',
            onAddToWishlistClicked:props.onAddToCartClicked
        }
    }

    onClickHandle(img) {
        this.setState({ image : img} );
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    minusQty = () => {
        if(this.state.quantity > 1) {
            this.setState({stock: 'InStock'})
            this.setState({quantity: this.state.quantity - 1})
        }
    }


    plusQty = () => {
        if(this.props.product.remain > this.state.quantity) {
            this.setState({quantity: this.state.quantity+1})
        }else{
            this.setState({stock: 'Out of Stock !'})
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render() {
        const {symbol,  onAddToWishlistClicked,  item} = this.props;
        const {thumbnail} = item;

        const { fileName } = thumbnail
        const image = Files.filePath(fileName);

        const asyncAddCart=(item,qty)=>{
            this.props.addToCart(item,qty)
                .then(response=>{
                if(response.type===ActionTypes.ADD_CART_SUCCESS){
                    this.props.calcPrice();
                }
             }).catch(error=>{
                 console.log('error >>', error)
             })
        }

        const addWishilist=(item)=>{
            this.props.addWishlist(item)
                .then(response=>{
                if(response.type==ActionTypes.ADD_WISHLIST_SUCCESS){
                    toast.success("상품이 찜하기에 추가되었습니다");       
                    console.log('찜하기성공!')  
                } 
            }).catch(error=>{
                console.log('error >>', error)
            })
       }                 
               


        // let RatingStars = []
        // for(var i = 0; i < product.rating; i++) {
        //     RatingStars.push(<i className="fa fa-star" key={i}></i>)
        // }
        return (
                <div className="product-box">
                    <div className="img-wrapper">
                        <div className="lable-block">
                            {/* {(product.new == true)? <span className="lable3">new</span> : ''} */}

                            {/* 상품상세 아래 상품박스에 on sale이라고 박혀있는 부분 */}
                            {/* {(product.sale == true)? <span className="lable4">on sale</span> : ''} */}

                        </div>
                        <div className="front">

                            {/* 상품상세 아래 상품박스 상품 이미지 부분  */}
                            {/* <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.productId}`} ><img
                                src={`${
                                    product.variants?
                                        this.state.image?this.state.image:product.variants[0].images
                                        :product.pictures[0]
                                    }`}
                                className="img-fluid"
                                alt="" /></Link> */}
                                
                                {/* 이미지 */}

                                <Link to={{pathname :`${process.env.PUBLIC_URL}/product/${item.productId}`,
                                state :{ item:this.props.item }}}>

                                    <img src={image}className="img-fluid"

                                    alt="" /></Link>

                        </div>
                        <div className="cart-info cart-wrap">
                            
                            <a  href="javascript:void(0)" title="Add to cart" onClick={()=>asyncAddCart(item, 1)}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            </a>
                            <a  href="javascript:void(0)"  title="Add to Wishlist" onClick={()=>addWishilist(item)}>
                                <i className="fa fa-heart" aria-hidden="true"></i>
                            </a>
                            <a  href="javascript:void(0)" data-toggle="modal"
                               data-target="#quick-view"
                               title="Quick View"
                               onClick={this.onOpenModal}><i className="fa fa-search" aria-hidden="true"></i></a>
                           
                        </div>
                        {/* {product.variants?
                        <ul className="product-thumb-list">
                            { product.variants.map((vari, i) =>
                                <li className={`grid_thumb_img ${(vari.images === this.state.image)?'active':''}`} key={i}>
                                    <a href="#" title="Add to Wishlist">
                                        <img src={`${vari.images}`} onClick={() => this.onClickHandle(vari.images)} />
                                    </a>
                                </li>)}
                        </ul>:''} */}

                    </div>
                    <div className="product-detail">
                        <div>
                            <div className="rating">

                                {/* 상품상세페이지 아래 상품박스 별점 부분 */}
                                {/* {RatingStars} */}
                            </div>
                            {/* <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}>   
                            </Link> */}
                            {/* <h6>{item.productName}</h6> */}
                            
                            <Link to={{pathname :`${process.env.PUBLIC_URL}/product/${item.productId}`,
                                state :{ item:this.props.item }}}>
                            <h4>
                            {/* {symbol}{product.price} */}
                                <span className="money">{item.productName}</span>
                            </h4>
                            </Link>


                        </div>
                    </div>
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content quick-view-modal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-6  col-xs-12">
                                            <div className="quick-view-img">

                                                <img src={image} alt="" className="img-fluid" />

                                            </div>
                                        </div>
                                        <div className="col-lg-6 rtl-text">
                                            <div className="product-right">
                                                <h2> {item.productName} </h2>
                                                <h3>{symbol}{item.productPrice}</h3>



                                                <div className="border-product">

                                                     {/* 여기는 거기야 돋보기 눌렀을 때 뜨는 창에 나오는 상품상세설명 */}
                                                    <h6 className="product-title">product details</h6>

                                                    <p>{item.productContent}</p>
                                                </div>
                                                <div className="product-description border-product">
                                                    
                                                    <div className="size-box">
                                                        <ul>
                                                            
                                                               <li>{item.productSize}</li>
                                                           
                                                        </ul>
                                                    </div>

                                                    <h6 className="product-title">quantity</h6>
                                                    <div className="qty-box">
                                                        <div className="input-group">
                                                              <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                                                 <i className="fa fa-angle-left"></i>
                                                                </button>
                                                              </span>
                                                            <input type="text" name="quantity" value={this.state.quantity}  onChange={this.changeQty} className="form-control input-number" />
                                                                <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                                                <i className="fa fa-angle-right"></i>
                                                                </button>
                                                               </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-buttons">
                                                    <button  className="btn btn-solid" onClick={() => asyncAddCart(item, this.state.quantity)} >add to cart</button>
                                                    <Link to={{pathname :`${process.env.PUBLIC_URL}/product/${item.productId}`,
                                                        state :{ item:this.props.item }}} className="btn btn-solid">>view detail</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>({
 addToCart:(item, qty)=>dispatch(addToCart(item, qty)),
 calcPrice:()=>dispatch(Actions.calcCartPrice()),
 addWishlist: (item) => dispatch(Actions.addWishlist(item)),
})

export default connect(null,mapDispatchToProps)(ProductItem);