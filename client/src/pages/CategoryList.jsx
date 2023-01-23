import { PureComponent } from "react";
import "../sass/style.scss";
import Product from "../components/ProductPage";
import { client } from "..";
import withRouter from "./withRouter";
import { QUERY_ALL_PRODUCTS } from "../FetchData/Products";

class Category extends PureComponent {
  state = { products: [] };

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate() {
    this.fetchProducts();
  }

  async fetchProducts() {
    const result = await client.query({
      query: QUERY_ALL_PRODUCTS,
      variables: {
        category: this.props.router.params.category || "all",
      },
    });
    this.setState({ products: result.data.category.products });
  }

  categoryName() {
    const categoryName = this.props.router.params.category || "all";
    return categoryName[0].toUpperCase() + categoryName.substring(1);
  }

  render() {
    const { products } = this.state;
    return (
      <div className="category">
        <div className="content">
          <span className="title font-42 weight-400">
            {this.categoryName()}
          </span>
          <div className="container">
            <div className="row font-18">
              {products?.map(
                (
                  { id, inStock, gallery, brand, name, prices, attributes },
                  index
                ) => {
                  return (
                    <div key={index}>
                      <Product
                        id={id}
                        inStock={inStock}
                        gallery={gallery}
                        brand={brand}
                        name={name}
                        prices={prices}
                        attributes={attributes}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Category);
