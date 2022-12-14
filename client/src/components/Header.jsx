import React, { PureComponent } from "react";
import { connect } from "react-redux";
import '../sass/style.scss';
import { client } from "..";
import withRouter from "../pages/withRouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencySwitcher from "./CurrencySwitcher";
import CategoryOveray from "./CategoryOverlay";
import { Link } from "react-router-dom";
import { QUERY_ALL_CATEGORIES } from "../FetchData/Categories";

const mapStateToProps = (state) => ({
    totalQuantity: state.reducer.totalQuantity,
    currency: state.reducer.currency,
})
class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            categories: [],
            isCurrencyToggled: false,
            isCartToggled: false,
    }
        this.myCartRef = React.createRef();
        this.myCurrencyRef = React.createRef();
        this.closeDropDown = this.closeDropDown.bind(this);
    };

    componentDidMount() {
        this.categoryNames();
        document.body.addEventListener('click', this.closeDropDown);
    }

    componentWillUnount() {
        document.body.removeEventListener('click', this.closeDropDown)        
    }

    closeDropDown = (e) => {
        if ((this.state.isCartToggled && this.state.isCurrencyToggled)) {
            if (this.myCartRef && !this.myCartRef.current.contains(e.target) && this.myCurrencyRef && !this.myCurrencyRef.current.contains(e.target)) {
                this.setState({isCartToggled: false});
                this.setState({isCurrencyToggled: false});
            }
        } else if (!this.state.isCartToggled && this.state.isCurrencyToggled) {
            if (this.myCurrencyRef && !this.myCurrencyRef.current.contains(e.target)) {
                this.setState({isCurrencyToggled: false});
            }
        } else if (this.state.isCartToggled && !this.state.isCurrencyToggled) {
            if (this.myCartRef && !this.myCartRef.current.contains(e.target) && this.myCurrencyRef && this.myCurrencyRef.current.contains(e.target)) {
                this.setState({isCartToggled: false});
                this.setState({isCartToggled: true});
            } 
            else if (this.myCartRef && !this.myCartRef.current.contains(e.target)) {
                this.setState({isCartToggled: false});
            }
        }

        if (this.state.isCartToggled || (this.state.isCartToggled && this.myCurrencyRef.current.contains(e.target))) {
            document.body.style.background = 'rgba(57, 55, 72, 0.22)';
        } else {
            document.body.style.background = '#fff'
            // document.body.getElementsByClassName("header").style.background = '#fff'
        }
    }

    async categoryNames() {
        const result = await client.query({query: QUERY_ALL_CATEGORIES});
        this.setState({categories: [...result.data.categories],});
    }

    toggleCurrencyIcon = () => {
        this.setState({isCurrencyToggled: !this.state.isCurrencyToggled})
    }

    toggleCartIcon = () => {
        this.setState({isCartToggled: !this.state.isCartToggled})
    }

    render() {
        const { categories, isCartToggled, isCurrencyToggled } = this.state;
        const {totalQuantity, currency} = this.props

        return (
            <div className="header flex-btw-align">
                <div className="categories flex font-16">
                    {categories?.map(({name}, index) => {
                        return (
                            <Link to={`/Scandiweb/category/${name}`} key={index}>{name}</Link>
                        )
                    })}
                </div>
                <div className="icons flex">
                    <span className="flex flex-end" ref={this.myCurrencyRef} onClick={this.toggleCurrencyIcon}>
                        <span className="font-21">{currency}</span>
                        <FontAwesomeIcon icon='chevron-down' className="down font-12" style={isCurrencyToggled ? {display: 'none'} : {display: 'block'}}/>
                        <FontAwesomeIcon icon='chevron-up' className="up font-12" style={isCurrencyToggled ? {display: 'block'} : {display: 'none'}}/>
                        {isCurrencyToggled && <CurrencySwitcher currency={currency}/>}
                    </span>
                    <span className="icon" ref={this.myCartRef}>
                        <div onClick={this.toggleCartIcon}><FontAwesomeIcon icon='cart-shopping' className="font-18"/><span className="flex-center quantity">{totalQuantity ? totalQuantity : 0}</span></div>
                        {isCartToggled && <CategoryOveray toggle={this.toggleCartIcon}/>}
                    </span>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(Header));