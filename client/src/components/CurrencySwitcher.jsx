import { PureComponent } from "react";
import { connect } from 'react-redux'
import { client } from "..";
import { QUERY_CURRENCIES } from "../FetchData/Currencies";
import { selectCurrency } from "../redux/ActionCreators";

const mapDispatchToProps = (dispatch) => ({
    switchCurrency: (symbol) => {dispatch(selectCurrency(symbol))}
})

class CurrencySwitcher extends PureComponent {
    state = { 
        currencies: []
    };

    componentDidMount() {
        this.currencies();
        selectCurrency();
    }

    async currencies() {
        const result = await client.query({
            query: QUERY_CURRENCIES        
        });
        this.setState({
            currencies: [...result.data.currencies],
        });
    }

    render () {
        const {currencies} = this.state
        const {switchCurrency} = this.props;
        return (
            <div className="currency flex col weight-500 font-18">
                {
                    currencies?.map(({label, symbol}, index) =>{
                        return (
                            <span key={index} className={(this.props.currency === symbol) ? 'flex-center active' : 'flex-center'} onClick={() => {switchCurrency(symbol)}}>{symbol} {label}</span>                        
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(CurrencySwitcher);