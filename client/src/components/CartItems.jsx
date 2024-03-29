import { PureComponent } from "react";
import { connect } from "react-redux";
import { ReactComponent as Arrow } from "../icons/arrow.svg";
import {
  addToCart,
  removeFromCart,
  nextImg,
  prevImg,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => ({
  cart: state.reducer.cart,
  currency: state.reducer.currency,
  totalQuantity: state.reducer.totalQuantity,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (
    id,
    gallery,
    brand,
    prices,
    name,
    attributes,
    selectedAttribute,
    index
  ) => {
    dispatch(
      addToCart(
        id,
        gallery,
        brand,
        prices,
        name,
        attributes,
        selectedAttribute,
        index
      )
    );
  },
  removeFromCart: (index) => {
    dispatch(removeFromCart(index));
  },
  nextImg: (index, imageIndex) => {
    dispatch(nextImg(index, imageIndex));
  },
  prevImg: (product) => {
    dispatch(prevImg(product));
  },
});

class CartItems extends PureComponent {
  componentDidMount() {
    addToCart();
    removeFromCart();
  }

  render() {
    const {
      addToCart,
      removeFromCart,
      cart,
      nextImg,
      prevImg,
      currency,
      totalQuantity,
    } = this.props;

    let totalAmount = cart.reduce((total, product) => {
      product.prices?.forEach(({ currency, amount }) => {
        if (currency.symbol === this.props.currency) {
          total = total + amount * product.qty;
        }
      });
      return total;
    }, 0);

    return (
      <div>
        {cart.map(
          (
            {
              id,
              gallery,
              brand,
              prices,
              name,
              attributes,
              selectedAttribute,
              qty,
              imageIndex,
            },
            index
          ) => {
            return (
              <section key={index}>
                <div className="cartSection flex-btw-align">
                  <div className="leftContent flex col">
                    <span className="nameBold font-30 weight-700">{brand}</span>
                    <span className="nameLight font-30 weight-400">{name}</span>
                    <span className="price font-24 weight-700">
                      {prices?.map(
                        ({ currency, amount }) =>
                          this.props.currency === currency.symbol &&
                          this.props.currency + amount
                      )}
                    </span>

                    {attributes?.map(({ name, type, items }, index) => {
                      return (
                        <div key={index} className="size flex col">
                          <span className="font-18 weight-700">{name}:</span>
                          <div
                            className={
                              type === "swatch"
                                ? "color flex"
                                : "sizes flex font-16 weight-400"
                            }
                          >
                            {items.map(({ value }, index) => {
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
                                        : {
                                            backgroundColor: "#000",
                                            color: "#fff",
                                          }
                                      : type === "swatch"
                                      ? { backgroundColor: `${value}` }
                                      : {
                                          backgroundColor: "#fff",
                                          color: "#000",
                                        }
                                  }
                                >
                                  {type !== "swatch" && value}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rightContent flex">
                    <div className="button flex-btw-align col">
                      <button
                        className="add font-15 flex-center"
                        onClick={() =>
                          addToCart(
                            id,
                            gallery,
                            brand,
                            prices,
                            name,
                            attributes,
                            selectedAttribute,
                            index
                          )
                        }
                      >
                        <span className="font-24">+</span>
                      </button>
                      <span className="font-24 weight-500">{qty}</span>
                      <button
                        className="minus font-15 flex-center"
                        onClick={() => removeFromCart(index)}
                      >
                        <span className="font-24">-</span>
                      </button>
                    </div>
                    <div className="content">
                      <img
                        src={imageIndex ? gallery[imageIndex] : gallery[0]}
                        alt=""
                      />
                      {gallery.length > 1 && (
                        <span className="icon flex">
                          <button
                            onClick={() => prevImg(index, imageIndex)}
                            className="arrow flex-center font-15"
                          >
                            <Arrow className="arrow_left" />
                          </button>
                          <button
                            onClick={() => nextImg(index, imageIndex)}
                            className="arrow flex-center font-15"
                          >
                            <Arrow className="arrow_right" />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <hr />
              </section>
            );
          }
        )}
        <section>
          <table>
            <tbody>
              <tr className="font-24 weight-400">
                <td>Tax 21%:</td>
                <td>
                  <span className="weight-700">
                    {currency}
                    {(0.21 * totalAmount).toFixed(2)}
                  </span>
                </td>
              </tr>
              <tr className="font-24 weight-400">
                <td>Quantity:</td>
                <td>
                  <span className="weight-700">{totalQuantity}</span>
                </td>
              </tr>
              <tr className="font-24 weight-400">
                <td className="weight-500">Total:</td>
                <td>
                  <span className="weight-700">
                    {currency}
                    {Number(totalAmount).toFixed(2)}
                  </span>
                </td>
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
