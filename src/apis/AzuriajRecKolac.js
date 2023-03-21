import { useState, useEffect  } from "react";
import UkloniSirovinuReceptura from "./UkloniSirovinuReceptura";
import UrediRecepturu from "./UrediRecepturu";
import { useNavigate } from 'react-router-dom';
import DodajSirovinuURecepturu from "./DodajSirovinuURecepturu";
const AzuriajRecKolac=({props,token,role})=>{
    const[stranica, setStranica]=useState(0)
    const[data, setData]=useState([])
    const [filteredData,setFilteredData] = useState(data); //ovo je pocetno stanje kolaca i dobija vrednost iz search
    const[idSirovine, setIdSirovine]=useState(0)
    const[imeSirovine, setImeSirovine]= useState('')
    const[kolicina, setKolicina]=useState(0)
    const[errorMessages,setErrorMessages]=useState('');
    const navigate = useNavigate();
    const imeKolaca=props.imeKolaca;
    const idKolaca=props.idKolaca;
    const URL=`http://localhost:5000/dajRecepturuReact/${props.idKolaca}`;
    useEffect(()=>{
        fetch(URL,{
            method: "GET",
            headers: {
                rola_1:role.rola_1,
                rola_2 :role.rola_2,
                rola_3:role.rola_3,
                idKorisnika:role.user,
                Authorization: 'Bearer ' + token //saljemo sifru tokena da bi se otkljucao end point
              }
        })
        .then((res) =>{
            if(res.status===200){return res.json()}
            if(res.status===10){return  setErrorMessages('Nemate pristup ovom delu aplikacijeeeee ')}
            if(res.status===401){return  setErrorMessages('Vasa sessija je istekla, konektujte se ponovo ERROR: 401 ')}
            if(res.status===422){return  setErrorMessages('Neregularna konakcija, molimo Vas da se ispravno konektujete konektujete  ERROR: 422 ')}
        })
        .then((response) => { 
            setData(response);  
            setFilteredData(response)
           
        }).catch((error)=>{
            console.log('ERROR: ',error)
        })
    },[role.rola_1,role.rola_2,role.rola_3,role.user,token,URL]);
   
   
        
    
    const Azuriranje =()=>{
        const obrisi = (id,ime,kolicina)=>{
            
            setKolicina(kolicina)
            setIdSirovine(id)
            setImeSirovine(ime)
            setStranica(2)
        }
        const uredi=(id,ime,kolicina)=>{
            
            setIdSirovine(id)
            setKolicina(kolicina)
            setImeSirovine(ime)
            
            setStranica(1)
        }
    return(
        <div>
            {errorMessages ==='' ? 
        <div >        
                <div>
        	    <ul className="nav nav-tabs actions-nav">
        		<li className="active"  >
                    <button onClick={()=>navigate(-1)} className="btn btn-default">List</button>
                </li>
                <li>
                    <button className="btn btn-default"  onClick={()=>setStranica(3)}>Dodaj sirovinu</button>
                </li>
                <li>
                
                <input className="form-control"  id="myInput" type="text" placeholder="Search.."></input>
                </li>
                 </ul> 
                 <br />
             <div className="row">
                <div className="col-sm-12 text-center">
                    <h2>{props.imeKolaca}</h2>
                    
                    </div>
                </div>  
                <br />  
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Edit</th>
                    <th>Obrisi</th>
                   
                    <th>Ime Sirovine</th>
                    <th>Kolicina</th>
                    
                    
                </tr>
                </thead>
                {filteredData.map((item, i) => (
                <tbody key={i}>
                  <tr>
                    <td> 
                        <span onClick={()=>uredi(item[1],item[0],item[2])}  className="fa fa-pencil glyphicon glyphicon-pencil"></span>
                    </td>
                    <td>
                        <span onClick={()=>obrisi(item[1],item[0],item[2])}  className="fa fa-trash glyphicon glyphicon-trash"></span>
                    </td>
                    <td style={{display:'none'}}>{item[2]}</td>
                    <td>{item[0]}</td>
                    <td>{item[2]}</td>
                  </tr>
                </tbody>  
            ))}
            </table>
            
            </div>
            <div className="col-sm-4" > 
                <button type="button" className="btn btn-primary" onClick={()=>navigate(-1)}>Back</button>
            </div><br /><br />
            </div>
         :
         <div className="alert alert-success alert-dismissible">
                <p  className="close" data-dismiss="alert" aria-label="close">&times;</p>
                    <strong>{errorMessages}</strong>
         </div>   }
            </div>
    )}
    return(
        <div>
            {stranica  === 0 ? Azuriranje() :null}
            {stranica ===1 ?<UrediRecepturu role={role} token={token} props={{imeKolaca,imeSirovine,kolicina,idKolaca,idSirovine}} /> : null}
            {stranica === 2 ? <UkloniSirovinuReceptura role={role} token={token} props={{imeKolaca, imeSirovine,kolicina, idKolaca,idSirovine}} /> :null} 
            {stranica === 3 ? <DodajSirovinuURecepturu role={role} token={token} props={{idKolaca,imeKolaca}} /> : null}
        </div>
    )
}
export default AzuriajRecKolac;