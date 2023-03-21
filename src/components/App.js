import React, { useState} from "react";
import { CartProvider } from "react-use-cart";
import Sirovine from "./Sirovine";
import Pocetna from "./Pocetna";
import Kolaci from "./Kolaci";
import IzlistajSirovine from './IzlistajSirovine';
import DodajSirovinu from "./DodajSirovinu";
import SirovineEdit from "./SirovineEdit";
import NaruciSirovine from "../apis/NaruciSirovine";
import Kalkulacije from "./Kalkulacije";
import Header from "./Header";
import {
    BrowserRouter,
    Routes,
    Route  
  } from "react-router-dom";
import DajKolace from "../apis/DajKolace";
import KreirajKolac from "../apis/KreirajKolac";
import DobavljaciEdit from "../apis/DobavljaciEdit";
import NapraviRecepturu from "../apis/NapraviRecepturu";
import AzurirajRecepturu from "../apis/AzurirajRecepturu";

import Login from "./Login";
import Administrator from "./Administrator";
import CreateNewAccount from "./CreateNewAccount";
import  secureLocalStorage  from  "react-secure-storage";//zakljucava sessioje u browsveru
import ChangePassword from "./ChnagePassword";
import VerifikujNalog from "./VerifikujNalog";
//import Kalendar from "../Kalendar";









const App = () =>{
  const [token,setToken]=useState(secureLocalStorage.getItem('token'))

  const [user,setUser]=useState(secureLocalStorage.getItem('user'))
  const[korisnik,setKorisnik]=useState(secureLocalStorage.getItem('korisnik'))
  const[rola_1,setRola_1]=useState(secureLocalStorage.getItem('rola_1'));
  
  const[rola_2,setRola_2]=useState(secureLocalStorage.getItem('rola_2'));
  const[rola_3,setRola_3]=useState(secureLocalStorage.getItem('rola_3'));



  // bila je linija koda 29
  // <Route path="/kalendar" element={<Kalendar  role={{rola_1,rola_2,rola_3,user}} props={{token}}/>}></Route>
    return(
      <div  className="container">
        
        <CartProvider>
          <BrowserRouter >
            <Header role={{rola_1,rola_2,rola_3}}    props={{token,user,setToken,korisnik,setKorisnik,setUser,setRola_1,setRola_2,setRola_3}} />

       {/*Ako niko nije ulogovan*/}
       {!token ? 
        <Routes>
            <Route path="/" element={<Pocetna />}/>
            <Route path="/createAccount" element={<CreateNewAccount />}></Route>
            <Route path="/login" element={<Login props={{setToken,setUser,setKorisnik,setRola_1,setRola_2,setRola_3}} />}></Route>
            <Route path="/ChangePassword" element={<ChangePassword />}></Route>
            <Route path="/verifikujNalog" element={<VerifikujNalog />}></Route>
            
        </Routes>  :

        <Routes> 
          
          
          <Route path="/" element={<Pocetna/>}/>
          {/*Moze da vidi  administrator,rola 1 i rola2*/} 
        {rola_1 ===1 || rola_2  ===1 || user===1 ? <>
          <Route path="/sirovine" element={<Sirovine />} />
          <Route path="/kolaci" element={<Kolaci role={{rola_1,rola_2,rola_3,user}} />} />
          </>:
           null}
          
          <Route path="/izlistajSirovine" element={<IzlistajSirovine role={{rola_1,rola_2,rola_3}}  props={{token,user}} />}></Route>
          <Route path="/dodajSirovinu" element={<DodajSirovinu role={{rola_1,rola_2,rola_3}} props={{token,user}} />}></Route>
          <Route path="/sirovineEdit" element={<SirovineEdit role={{rola_1,rola_2,rola_3}} props={{token,user}} />}></Route>
        
          <Route path="/naruciSirovine" element={<NaruciSirovine role={{rola_1,rola_2,rola_3,user}} props={{token}} />}></Route>
          <Route path="/dajKolace" element={<DajKolace role={{rola_1,rola_2,rola_3,user}} props={{token}}/>}></Route>
          <Route path="/kreirajKolac" element={<KreirajKolac role={{rola_1,rola_2,rola_3,user}} props={{token}} />}></Route>
          <Route path="/dobavljaciEdit"  element={<DobavljaciEdit role={{rola_1,rola_2,rola_3,user}} props={{token}} />}></Route>
          <Route path="/napraviRecepturu" element={<NapraviRecepturu role={{rola_1,rola_2,rola_3,user}} props={{token}} />}></Route>
          
          <Route path="/azurirajRecepturu" element={<AzurirajRecepturu role={{rola_1,rola_2,rola_3,user}} props={{token}} />}></Route>
          
          {/*Moze da vidi samo administrator i rola 1*/}
          {user===1 || rola_1=== 1 ?
            <>
              <Route path="/kalkulacije" element={<Kalkulacije role={{rola_1,rola_2,rola_3,user}} props={{token}} />}></Route>
              
            </>
          :null}
          {/*Moze da vidi samo administrator */}
          {user===1 ? 
            <>
            <Route path="/administrator" element={<Administrator props={{token,user}} role={{rola_1,rola_2,rola_3,user}} /> }></Route>
            
            </>
          :null }
          
          
          
        </Routes> }
        
    </BrowserRouter>
    
    
   
    </CartProvider>
    
    
    </div>
    )
};

export default App;