import { PureComponent } from "react";
import CartItems from "../components/CartItems";

class Cart extends PureComponent {
  render() {
    return (
      <div className="cart flex col">
        <span className="font-32 weight-700">CART</span>
        <hr />
        <CartItems data={this.props.data} />
      </div>
    );
  }
}

export default Cart;
