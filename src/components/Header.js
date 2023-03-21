import React from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";
import { useNavigate } from 'react-router-dom';//za preusmeravanje
const Header = ({props,role})=>{
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
   
    const logout=()=>{
        props.setToken(secureLocalStorage.removeItem('token'))
        props.setKorisnik(secureLocalStorage.removeItem('korisnik'))
        props.setUser(secureLocalStorage.removeItem('user'))
        props.setRola_1(secureLocalStorage.removeItem('rola_1'))
        props.setRola_2(secureLocalStorage.removeItem('rola_2'))
        props.setRola_3(secureLocalStorage.removeItem('rola_3'))

        const opt={method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },};
        fetch(`http://localhost:5000/logoutR`,opt)
        .then((resp)=>{ return resp.json()})
        .then((response)=>{return(
            navigate('/login'),//preusmerava napocetnu stranu
            console.log(response.msg))})
        .catch((error)=>{console.log(error)})
    }
    return (
        <div>
            {! props.token ?
                <nav className="navbar navbar-default">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                        
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li className={splitLocation[1] === "" ? "active" : ""} >
                                <Link to='/'>
                                    Home
                                </Link>
                            </li>
                            

                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                             <li  className={splitLocation[1] === "createAccount" ? "active" : ""}>
                                <Link to="/createAccount">Create Account</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li> 
                            
                        </ul>
                        
                    </div>
                </nav> :
                <nav className="navbar navbar-default">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                        
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li className={splitLocation[1] === "" ? "active" : ""} >
                                <Link to='/'>
                                    Home
                                </Link>
                            </li>
                            {role.rola_1===1 || role.rola_2  ===1 ?
                          <>  <li className={splitLocation[1] === "sirovine" ? "active" : ""}>
                                <Link to='/sirovine'>
                                    Sirovine
                                </Link>
                            </li>
                            <li className={splitLocation[1] === "kolaci" ? "active" : ""}>
                                <Link to='/kolaci'>
                                    Kolaci
                                </Link>
                            </li>
                           

                            </> : null}
                        {props.user===1 ?
                            <li className={splitLocation[1] === "administrator" ? "active" : ""}>
                                <Link to='/administrator'>
                                    Administrator
                                </Link>
                            </li>
                       :null }    

                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                               <h4>User : {props.korisnik}</h4> 
                            </li>
                            <li>
                                
                                <button className="btn btn-default" onClick={()=>logout()}>Logout</button>  
                            </li>   
                        </ul>
                    </div>
                </nav>
            }
            <h4>User : {props.korisnik}</h4>
        </div>     
        )
    
};
export default Header;