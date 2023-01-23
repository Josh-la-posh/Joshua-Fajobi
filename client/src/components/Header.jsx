import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "../sass/style.scss";
import { ReactComponent as CartIcon } from "../icons/cart.svg";
import { ReactComponent as Logo } from "../icons/logo.svg";
import { ReactComponent as Arrow } from "../icons/arrow.svg";
import { client } from "..";
import withRouter from "../pages/withRouter";
import CurrencySwitcher from "./CurrencySwitcher";
import CategoryOveray from "./CategoryOverlay";
import { Link } from "react-router-dom";
import { QUERY_ALL_CATEGORIES } from "../FetchData/Categories";

const mapStateToProps = (state) => ({
  totalQuantity: state.reducer.totalQuantity,
  currency: state.reducer.currency,
});
class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isCurrencyToggled: false,
      isCartToggled: false,
    };
    this.myCartRef = React.createRef();
    this.myCurrencyRef = React.createRef();
    this.closeDropDown = this.closeDropDown.bind(this);
  }

  componentDidMount() {
    this.categoryNames();
    document.body.addEventListener("click", this.closeDropDown);
  }

  componentWillUnount() {
    document.body.removeEventListener("click", this.closeDropDown);
  }

  handleClick = (e, name, index) => {
    var li = document.getElementsByName("a");
    console.log(li);
    return index;
  };

  closeDropDown = (e) => {
    if (this.state.isCartToggled && this.state.isCurrencyToggled) {
      if (
        this.myCartRef &&
        !this.myCartRef.current.contains(e.target) &&
        this.myCurrencyRef &&
        !this.myCurrencyRef.current.contains(e.target)
      ) {
        this.setState({ isCartToggled: false });
        this.setState({ isCurrencyToggled: false });
      } else if (
        this.myCartRef &&
        this.myCartRef.current.contains(e.target) &&
        this.myCurrencyRef &&
        !this.myCurrencyRef.current.contains(e.target)
      ) {
        this.setState({ isCartToggled: true });
        this.setState({ isCurrencyToggled: false });
      }
    } else if (!this.state.isCartToggled && this.state.isCurrencyToggled) {
      if (
        this.myCurrencyRef &&
        !this.myCurrencyRef.current.contains(e.target)
      ) {
        this.setState({ isCurrencyToggled: false });
      }
    } else if (this.state.isCartToggled && !this.state.isCurrencyToggled) {
      if (
        this.myCartRef &&
        !this.myCartRef.current.contains(e.target) &&
        this.myCurrencyRef &&
        this.myCurrencyRef.current.contains(e.target)
      ) {
        this.setState({ isCurrencyToggled: false });
        this.setState({ isCartToggled: true });
      } else if (this.myCartRef && !this.myCartRef.current.contains(e.target)) {
        this.setState({ isCartToggled: false });
      }
    }
  };

  async categoryNames() {
    const result = await client.query({ query: QUERY_ALL_CATEGORIES });
    this.setState({ categories: [...result.data.categories] });
  }

  toggleCurrencyIcon = () => {
    this.setState({ isCurrencyToggled: !this.state.isCurrencyToggled });
  };

  toggleCartIcon = () => {
    this.setState({ isCartToggled: !this.state.isCartToggled });
  };

  render() {
    const { categories, isCartToggled, isCurrencyToggled } = this.state;
    const { totalQuantity, currency } = this.props;

    return (
      <div className="header flex-btw-align">
        <ul className="categories flex font-16">
          {categories?.map(({ name }, index) => {
            return (
              <li key={index}>
                <Link to={`/scandiweb/category/${name}`}>{name}</Link>
              </li>
            );
          })}
        </ul>
        <Link to="/scandiweb/">
          <Logo />
        </Link>
        <div className="icons flex">
          <span
            className="flex-center"
            ref={this.myCurrencyRef}
            onClick={this.toggleCurrencyIcon}
          >
            <span className="font-21">{currency}</span>
            <Arrow
              className="arrow"
              style={
                isCurrencyToggled
                  ? { transform: "rotate(180deg" }
                  : { transform: "" }
              }
            />
            <span>
              {isCurrencyToggled && <CurrencySwitcher currency={currency} />}
            </span>
          </span>
          <span className="icon" ref={this.myCartRef}>
            <div onClick={this.toggleCartIcon}>
              <CartIcon className="font-18" />
              <span className="flex-center quantity">
                {totalQuantity ? totalQuantity : 0}
              </span>
            </div>
            {isCartToggled && <CategoryOveray toggle={this.toggleCartIcon} />}
          </span>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(Header));
