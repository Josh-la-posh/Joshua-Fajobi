import { useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    let navigate = useNavigate();
    return (
      <Component {...props} params={params} router={{params, navigate}} />
    );
  }
  return ComponentWithRouter;
}

export default withRouter;
