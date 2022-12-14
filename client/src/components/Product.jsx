import { PureComponent } from "react";
import { connect } from "react-redux";
import withRouter from "../pages/withRouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {addToCart, removeFromCart, defaultAttribute, selectAttribute} from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
    currency: state.reducer.currency,
    selectedAttribute: state.reducer.selectedAttribute
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: (id, gallery, brand, prices, name, attributes, selectedAttribute) => {dispatch(addToCart(id, gallery, brand, prices, name, attributes, selectedAttribute))},
    defaultAttribute: (inStock, attributes) => (dispatch(defaultAttribute(inStock, attributes)))
})

class Product extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        addToCart();
        this.addToCart();
        this.defAtt();
    }

    addToCart(id, gallery, brand, prices, name, attributes, selectedAttribute) {
        console.log(selectedAttribute)
        this.props.addToCart(id, gallery, brand, prices, name, attributes, selectedAttribute)
    }

    defAtt() {
        this.props.defaultAttribute(this.props.inStock, this.props.attributes)
    }

    handleClick = (e, id) => {
        if (e.target.localName !== 'button') {
             this.props.router.navigate(`/Scandiweb/pdp/${id}`);
        }
    }
    
    render() {
        const {id, inStock, gallery, brand, prices, name, attributes, addToCart, selectedAttribute } = this.props;

        return (            
            <div className="col-lg-4">
                <div onClick={e => inStock && this.handleClick(e, id)} className={inStock ? 'flex col' : 'flex col outOfStock'}>
                    <div className="img">
                        <img src={gallery[0]} alt="" />
                        {inStock === false && <span className="font-24 weight-400">OUT OF STOCK</span>}
                    </div>
                    {inStock && <button className="icon-cart" onClick={() => this.addToCart(id, gallery, brand, prices, name, attributes, selectedAttribute)}><FontAwesomeIcon icon='cart-shopping' className="icon" /></button>}
                    <span className="name">{brand}</span>
                    <span className="price weight-500">
                        {prices?.map(({currency, amount}) => 
                            this.props.currency === currency.symbol && (this.props.currency) + (amount)
                        )}
                    </span>
                </div>
            </div>
        )
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));