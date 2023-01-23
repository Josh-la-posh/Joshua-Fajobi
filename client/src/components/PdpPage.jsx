import { PureComponent } from "react";
import { connect } from "react-redux";
import { addToCart, selectAttribute } from "../redux/ActionCreators";

const mapStateToProps = (state) => ({
  cart: state.reducer.cart,
  selectedAttribute: state.reducer.selectedAttribute,
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
  selectAttribute: (value, name) => {
    dispatch(selectAttribute(value, name));
  },
});

class PdpContent extends PureComponent {
  state = { displayedImg: "" };

  componentDidMount() {
    addToCart();
    selectAttribute();
  }

  currentImg = (e) => {
    this.setState({ displayedImg: e.target.currentSrc });
  };

  render() {
    const { product, addToCart, selectAttribute, selectedAttribute } =
      this.props;
    return (
      <div className="pdp flex">
        {/* LEFT CONTENT */}

        <div className="product flex">
          <div className="colorChange flex col">
            {product.gallery?.map((image) => {
              return (
                <img
                  key={image}
                  onClick={(e) => this.currentImg(e)}
                  src={image}
                  alt=""
                />
              );
            })}
          </div>
          <div className="image">
            <img
              src={
                this.state.displayedImg === ""
                  ? product.gallery
                  : this.state.displayedImg
              }
              alt=""
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}

        <div className="description flex col">
          <span className="nameBold font-30 weight-600">{product.name}</span>
          <span className="nameLight font-30 weight-400">{product.brand}</span>

          {/* FOR SIZES */}

          {product.attributes?.map(({ name, type, items }, index) => {
            return (
              <div key={index} className="size flex col font-18 weight-700">
                <span>{name}:</span>
                <div
                  className={
                    type === "swatch"
                      ? "color flex swatch"
                      : "sizes flex font-16 text"
                  }
                >
                  {items?.map(({ value }, index) => {
                    return (
                      <span
                        key={index}
                        className="flex-center"
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
                              : { backgroundColor: "#000", color: "#fff" }
                            : type === "swatch"
                            ? { backgroundColor: `${value}` }
                            : { backgroundColor: "#fff", color: "#000" }
                        }
                        onClick={() => {
                          selectAttribute(value, name);
                        }}
                      >
                        {type !== "swatch" && value}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="size flex col font-18 weight-700">
            <span>PRICES:</span>
            {product.prices?.map(
              ({ currency, amount }) =>
                this.props.currency === currency.symbol &&
                this.props.currency + amount
            )}
          </div>

          
            <button
              className="font-16 weight-600"
              onClick={() =>
                {product.inStock && (addToCart(
                  product.id,
                  product.gallery,
                  product.brand,
                  product.prices,
                  product.name,
                  product.attributes,
                  selectedAttribute
                ))}
              }
            >
              ADD TO CART
            </button>
          <p className="font-16 weight-400">
            {product.description?.replace(/<[^>]+>/g, "")}
          </p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PdpContent);
