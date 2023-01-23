import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ReactComponent as CartIcon } from "../icons/cart.svg";
import withRouter from "../pages/withRouter";
import { addToCart } from "../redux/ActionCreators";

const mapStateToProps = (state) => ({
  currency: state.reducer.currency,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (
    id,
    gallery,
    brand,
    prices,
    name,
    attributes,
    selectedAttribute
  ) => {
    dispatch(
      addToCart(id, gallery, brand, prices, name, attributes, selectedAttribute)
    );
  },
});

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { selectedAttribute: [] };
    this.myButtonRef = React.createRef();
  }

  componentDidMount() {
    addToCart();
    this.defAtt();
  }

  defAtt = () => {
    const selectedAttribute =
      this.props.inStock &&
      this.props.attributes.reduce((selectedAttribute, { name, items }) => {
        selectedAttribute.push({ [name]: items[0].value });
        return selectedAttribute;
      }, []);

    this.setState({
      selectedAttribute: selectedAttribute,
    });
  };

  handleClick = (id) => {
    if (this.myButtonRef) {
      this.props.router.navigate(`/scandiweb/pdp/${id}`);
      window.location.reload()
    }
  };

  render() {
    const { id, inStock, gallery, brand, prices, name, attributes, addToCart } =
      this.props;

    return (
      <div className="col-lg-4">
        <div
          onClick={(e) => this.handleClick(id)}
          className={inStock ? "flex col" : "flex col outOfStock"}
        >
          <div className="img">
            <img src={gallery[0]} alt="" />
            {inStock === false && (
              <span className="font-24 weight-400">OUT OF STOCK</span>
            )}
          </div>
          <span className="name">{brand}</span>
          <span className="price weight-500">
            {prices?.map(
              ({ currency, amount }) =>
                this.props.currency === currency.symbol &&
                this.props.currency + amount
            )}
          </span>
        </div>
        {inStock && (
          <span
            ref={this.myButtonRef}
            className="icon-cart"
            onClick={() =>
              addToCart(
                id,
                gallery,
                brand,
                prices,
                name,
                attributes,
                this.state.selectedAttribute
              )
            }
          >
            <CartIcon />
          </span>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Product));
