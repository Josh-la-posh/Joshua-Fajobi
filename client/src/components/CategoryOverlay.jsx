import { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import {addToCart, removeFromCart} from '../redux/ActionCreators';
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
    cart: state.reducer.cart,
    currency: state.reducer.currency,
    subTotal: state.reducer.subTotal,
    totalQuantity: state.reducer.totalQuantity,
    qty: state.reducer.qty,
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (id, gallery, brand, prices, name, attributes, selectedAttribute, index) => {dispatch(addToCart(id, gallery, brand, prices, name, attributes, selectedAttribute, index))},
    removeFromCart: (id, selectedAttribute) => {dispatch(removeFromCart(id, selectedAttribute))}
})

class CategoryOverlay extends PureComponent {
    componentDidMount() {
        addToCart();
        removeFromCart();
    }


    handleQuantity(id, gallery, brand, prices, name, attributes, selectedAttribute, index) {
        this.props.addToCart(id, gallery, brand, prices, name, attributes, selectedAttribute, index)
    }

    render() {
        const {addToCart, removeFromCart, cart, currency, subTotal, totalQuantity, toggle} = this.props

        return (
            <div className="categoryOverlay">
                <p className="font-16 weight-700">My Bag, 
                    <span className="weight-500"> {totalQuantity} items</span>
                </p>

                <div className="overlayContent">
                    {cart?.map(({id, gallery, brand, prices, name, attributes, selectedAttribute, qty}, index) => {
                        return (
                            <section className="flex" key={index}>
                                    <div className="leftContent flex col font-16">
                                        <span className="weight-300">{name}</span>
                                        <span className="nameLight weight-300">{brand}</span>
                                        <span className="price weight-500">
                                            {prices?.map(({currency, amount}) => 
                                                this.props.currency === currency.symbol && (this.props.currency) + (amount)
                                            )}
                                        </span>


                                        {attributes?.map(({id, name, type, items}, index) => {
                                            return (
                                                <div key={index} className="size flex col font-14 weight-400">
                                                    <span>{name}:</span>
                                                    <div className={type === "swatch" ? 'color flex' : 'sizes flex'}>
                                                        {type === "swatch" ? items.map(({value}, index) => {
                                                            return (
                                                                <span key={index} className="flex-center" style={selectedAttribute.some(att => Object.keys(att)[0] === name && Object.values(att)[0] === value) ? {backgroundColor: `${value}`, outline: '1px solid #5ECE7B'} : {backgroundColor: `${value}`}}></span>
                                                            )
                                                        }) : items.map(({value}, index) => {
                                                            return (
                                                                <span key={index} className="flex-center" style={selectedAttribute.some(att => Object.keys(att)[0] === name && Object.values(att)[0] === value) ? { backgroundColor: '#000', color: '#fff'} : { backgroundColor: '#fff', color: '#000'}}>{value}</span>
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>

                                    <div className="rightContent flex">
                                        <div className="button flex-btw-align col">
                                            <button className="add flex-center font-14" onClick={() => addToCart(id, gallery, brand, prices, name, attributes, selectedAttribute, index)}>
                                                <FontAwesomeIcon icon='plus' />
                                            </button>
                                            <span className="weight-500">{qty}</span>
                                            <button className="minus flex-center font-14" onClick={() => {removeFromCart(id, selectedAttribute)}}>
                                                <FontAwesomeIcon icon='minus' />
                                            </button>
                                        </div>
                                        <div className="content">
                                            <img src={gallery[0]} alt="" />                                
                                        </div>
                                    </div>
                            </section>
                        )
                    })}
                </div>

                <div className="total flex-btw-align">
                    <span className="weight-500">Total</span>
                    <span className="weight-700">{currency}{(subTotal)?.toFixed(2)}</span>
                </div>
                
                <div className="button flex-align font-14 weight-600">
                    <Link to='/Scandiweb/cart'><button className="view" onClick={toggle}>VIEW BAG</button></Link>
                    <button className="checkout">ORDER</button>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOverlay);