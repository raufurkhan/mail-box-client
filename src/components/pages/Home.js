import { Fragment } from "react";
import { useSelector} from "react-redux";
// import { Container } from "react-bootstrap";
import Login from '../pages/Login';

const Home = () => {
    const token=useSelector(state=>state.auth.token);

    return ( 
        <Fragment>
          
            {!token&&<Login/>}
        </Fragment>
     );
}

export default Home;