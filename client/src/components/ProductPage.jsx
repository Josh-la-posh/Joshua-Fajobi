import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ReactComponent as CartIcon } from "../icons/cart.svg";
import withRouter from "../pages/withRouter";
import { addToCart, selectAttribute } from "../redux/ActionCreators";

const mapStateToProps = (state) => ({
  currency: state.reducer.currency,
  selectedAttribute: state.reducer.selectedAttribute,
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
  selectAttribute: (value, name) => {
    dispatch(selectAttribute(value, name));
  },
});

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { selectedAttribute: [], isPopUp: false };
    this.myButtonRef = React.createRef();
    this.popUp = React.createRef();
    this.closePopUp = this.closePopUp.bind(this);
  }

  componentDidMount() {
    addToCart();
    selectAttribute();
    document.body.addEventListener("click", this.closePopUp);
  }

  componentWillUnount() {
    document.body.removeEventListener("click", this.closePopUp);
  }

  closePopUp = (e) => {
    if (!this.state.isPopUp) {
      if (this.popUp && this.popUp.current.contains(e.target)) {
        this.setState({ isPopUp: true });
      } else {
        this.setState({ isPopUp: false });
      }
    } else {
      if (this.popUp && !this.popUp.current.contains(e.target)) {
        this.setState({ isPopUp: false });
      }
    }
  };

  handleClick = (e, id) => {
    if (this.myButtonRef) {
      this.props.router.navigate(`/scandiweb/pdp/${id}`);
    }
  };

  render() {
    const {
      id,
      inStock,
      gallery,
      brand,
      prices,
      name,
      attributes,
      addToCart,
      selectedAttribute,
      selectAttribute,
    } = this.props;

    return (
      <div className="col-lg-4">
        <div
          onClick={(e) => this.handleClick(e, id)}
          className={inStock ? "flex col" : "flex col outOfStock"}
        >
          <div className="img">
            {this.state.isPopUp && <div className="img_bg"></div>}
            <img src={gallery[0]} alt="" />
            {inStock === false && (
              <span className="font-24 weight-400">OUT OF STOCK</span>
            )}
          </div>
          <span className="name">
            {brand} {name}
          </span>
          <span className="price weight-500">
            {prices?.map(
              ({ currency, amount }) =>
                this.props.currency === currency.symbol &&
                this.props.currency + amount
            )}
          </span>
        </div>
        {/* POP UP */}

        <div ref={this.popUp}>
          {this.state.isPopUp && (
            <div className="popUp flex-center">
              <div className="popUp_container flex-align col">
                <div className="popUp_container_attributes flex-align col">
                  {attributes?.map(({ name, type, items }, index) => {
                    return (
                      <div
                        key={index}
                        className="size flex col font-14 weight-600"
                      >
                        <p>{name}:</p>
                        <div
                          className={
                            type === "swatch"
                              ? "color flex swatch"
                              : "sizes flex font-12 text"
                          }
                        >
                          {items?.map(({ value }, index) => {
                            return (
                              <p
                                key={index}
                                className="flex-center size"
                                style={
                                  selectedAttribute.some(
                                    (att) =>
                                      Object.keys(att)[0] === name &&
                                      Object.values(att)[0] === value
                                  )
                                    ? type === "swatch"
                                      ? {
                                          backgroundColor: `${value}`,
                                          outline: "1px solid #5ECE7B",
                                        }
                                      : {
                                          backgroundColor: "#000",
                                          color: "#fff",
                                        }
                                    : type === "swatch"
                                    ? { backgroundColor: `${value}` }
                                    : { backgroundColor: "#fff", color: "#000" }
                                }
                                onClick={() => {
                                  selectAttribute(value, name);
                                }}
                              >
                                {type !== "swatch" && value}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {inStock && (
                  <button
                    onClick={() =>
                      addToCart(
                        id,
                        gallery,
                        brand,
                        prices,
                        name,
                        attributes,
                        selectedAttribute
                      )
                    }
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
          )}
          {!this.state.isPopUp && (
            <span className="icon-cart">
              <CartIcon />
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Product));
