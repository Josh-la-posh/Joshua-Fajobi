import { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import {addToCart, removeFromCart, nextImg, prevImg} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
    cart: state.reducer.cart,
    subTotal: state.reducer.subTotal,
    currency: state.reducer.currency,
    totalQuantity: state.reducer.totalQuantity,
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (id, gallery, brand, prices, name, attributes, selectedAttribute, index) => {dispatch(addToCart(id, gallery, brand, prices, name, attributes, selectedAttribute, index))},
    removeFromCart: (id, selectedAttribute) => {dispatch(removeFromCart(id, selectedAttribute))},
    nextImg: (index, imageIndex) => {dispatch(nextImg(index, imageIndex))},
    prevImg: (product) => {dispatch(prevImg(product))},
})

class CartItems extends PureComponent {
    
    componentDidMount() {
        addToCart();
        removeFromCart();
    }

    render() {
        const {addToCart, removeFromCart, cart, subTotal, nextImg, prevImg, currency, totalQuantity} = this.props;

        return (
            <div>
                {cart.map(({id, gallery, brand, prices, name, attributes, selectedAttribute, qty, imageIndex}, index) => {
                    return (
                        <section key={index}>
                            <div className="cartSection flex-btw-align">
                                <div className="leftContent flex col">
                                    <span className="nameBold font-30 weight-700">{name}</span>
                                    <span className="nameLight font-30 weight-400">{brand}</span>
                                    <span className="price font-24 weight-700">
                                        {prices?.map(({currency, amount}) =>
                                            this.props.currency === currency.symbol && (this.props.currency) + (amount)
                                        )}
                                    </span>

                                    {attributes?.map(({name, type, items}, index) => {
                                        return (
                                            <div key={index} className="size flex col">
                                                <span className="font-18 weight-700" >{name}:</span>
                                                <div className={type === "swatch" ? 'color flex' : 'sizes flex font-16 weight-400'}>
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
                                        <button className="add font-15 flex-center" onClick={()=> addToCart(id, gallery, brand, prices, name, attributes, selectedAttribute, index)}>
                                            <FontAwesomeIcon icon='plus' />
                                        </button>
                                        <span className="font-24 weight-500">{qty}</span>
                                        <button className="minus font-15 flex-center" onClick={()=>removeFromCart(id, selectedAttribute)}>
                                            <FontAwesomeIcon icon='minus' />
                                        </button>
                                    </div>
                                    <div className="content">
                                        <img src={imageIndex ? gallery[imageIndex] : gallery[0]} alt="" />
                                        {gallery.length > 1 && <span className="icon flex">
                                            <button onClick={() => prevImg(index, imageIndex)} className="arrow flex-center font-15">
                                                <FontAwesomeIcon icon='chevron-left' />
                                            </button>
                                            <button onClick={() => nextImg(index, imageIndex)} className="arrow flex-center font-15">
                                                <FontAwesomeIcon icon='chevron-right' />
                                            </button>
                                        </span>}
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </section>
                    )
                })}
                <section>
                    <table>
                        <tbody>
                            <tr className="font-24 weight-400">
                                <td>Tax 21%:</td>
                                <td><span className="weight-700">{currency}{(0.21 * subTotal).toFixed(2)}</span></td>
                            </tr>
                            <tr className="font-24 weight-400">
                                <td>Quantity:</td>
                                <td><span className="weight-700">{totalQuantity}</span></td>
                            </tr>
                            <tr className="font-24 weight-400">
                                <td className="weight-500">Total:</td>
                                <td><span className="weight-700">{currency}{Number(subTotal).toFixed(2)}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="order font-14 weight-600">ORDER</button>
                </section>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);