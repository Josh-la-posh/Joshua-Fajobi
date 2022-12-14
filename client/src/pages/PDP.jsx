import { PureComponent } from "react";
import { client } from "..";
import withRouter from "./withRouter";
import PdpContent from "../components/PdpContent";
import { GET_PRODUCT } from "../FetchData/Product";

class PDP extends PureComponent {
    state = {product : {},}
    componentDidMount() {
        this.fetchProduct();
    }
    async fetchProduct() {
        const result = await client.query({
            query: GET_PRODUCT,
            variables: {
                pdpId: this.props.router.params.id
            }
        });
        this.setState({product: result.data.product})
    }
    render() {
        return (
            <PdpContent product={this.state.product}/>
        );
    }
}

export default withRouter(PDP);