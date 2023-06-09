import { useState, useEffect } from "react"
import NapraviKolac from "./NapraviKolac";
import AzurirajKolac from "./AzurirajKolac";
import ObrisiKolac from "./ObrisiKolac";
const KreirajKolac= ({props,role})=>{
    const[errorMesagges,setErrorMesagges]=useState('');
    const[list, setList]=useState(0);
    const[data, setKolac]=useState([]);
    const [filteredData,setFilteredData] = useState(data); //ovo je pocetno stanje kolaca i dobija vrednost iz search
    const[imeKolaca,setImeKolaca]=useState('');
    const[idKolaca,setIdKolaca]=useState(0);
    const[objasnjenje, setObjasnjenje]=useState('')
    
    const URL ='http://localhost:5000/dajlistuKolacaReact';
    useEffect(()=>{
        fetch(URL,{
            method: "GET",
            headers: {
                rola_1:role.rola_1,
                rola_2 :role.rola_2,
                rola_3:role.rola_3,
                Authorization: 'Bearer ' + props.token, //saljemo sifru tokena da bi se otkljucao end point
                idKorisnika : role.user
            }
        })
        .then((res) =>{
        
            if(res.status===200){ return res.json()}
           if(res.status===401){return  setErrorMesagges('Vasa sessija je istekla, konektujte se ponovo ERROR: 401 ')}
           if(res.status===422){return  setErrorMesagges('Neregularna konakcija, molimo Vas da se ispravno konektujete konektujete  ERROR: 422 ')}
           if(res.status===10){return setErrorMesagges("Nemate pristup ovom delu aplikacije")}
        })
        .then((response) => { 
            setKolac(response);
            setFilteredData(response);
        })
        .catch(error=>{
            console.log('ovo je greska ',error)
            setErrorMesagges('Neuspela konekcija sa bazom, proverite internet konekciju')
        })
    },[role.rola_1,role.rola_2,role.rola_3,role.user,props.token]);
       
            
        
const obrisi = (id,ime)=>{
  const imeKolaca =ime;
   const idKolaca= id;
   setIdKolaca(idKolaca)
   setImeKolaca(imeKolaca)
   setList(3)
   
   

}
const uredi=(id,ime,postupak)=>{
    const imeKolaca= ime;
    const objasnjenje=postupak;
    const idKolaca=id;
     setIdKolaca(idKolaca)
     setImeKolaca(imeKolaca)
     setObjasnjenje(objasnjenje)
     setList(2)
     
}
 const listaKolaca =()=>{
    const handleSearch = (event) =>{
        let value = event.target.value.toLowerCase();
        let result = [];
        result = data.filter((data) => {
            
            return data[1].search(value) !== -1;
        });
        setFilteredData(result);
    }
    return(
        <div>
            <div className="col-sm-12 text-center">
                <h2>Lista kolaca</h2>
                <br />
            </div>
            
            <div>
            <ul className="nav nav-tabs actions-nav">
        		<li className="active"  >
                    <button className="btn btn-default">Lista</button>
                </li>
                <li>
                    <button className="btn btn-default" onClick={()=>setList(1)}>Kreiraj kolac</button>
                </li>
                <li><input className="form-control" onChange={(event) =>handleSearch(event)} id="myInput" type="text" placeholder="Search.."></input></li>
                
	
                 </ul>
            <table className="table table-hover">
                <tbody>
                    <tr>
                        <th className="col-sm-1">Azuriraj</th>
                        <th>Obrisi</th>
                        <th>Ime kolaca</th>
                        
                        
                    </tr>
                    {filteredData.map((item, i) => (
                        <tr key={i}>
                            <td> 
                                <span onClick={()=>uredi(item[0],item[1],item[2])} className="fa fa-pencil glyphicon glyphicon-pencil"></span>
                            </td>
                            <td>
                                <span onClick={()=>obrisi(item[0],item[1])}  className="fa fa-trash glyphicon glyphicon-trash"></span>
                            </td>
                            <td>{item[1]}</td>
                            <td style={{display:'none'}}>{item[2]}</td>
                            <td style={{display:'none'}}>{item[0]}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}
 return(
    <div>
        { errorMesagges === '' ? 
            <div>
                {list===0 ? listaKolaca() : null  }
                {list===1 ? <NapraviKolac role={role} token={props.token}  /> : null }
                {list===2 ? <AzurirajKolac role={role} token={props.token} props={{idKolaca,imeKolaca,objasnjenje}} /> : null }
                {list ===3 ? <ObrisiKolac role={role} token={props.token} props={{idKolaca, imeKolaca}} /> : null}
            </div>:
            <div className="alert alert-success alert-dismissible">
                <p  className="close" data-dismiss="alert" aria-label="close">&times;</p>
                    <strong>{errorMesagges}</strong>
           </div>
        }
    </div>
    
 )
}
export default KreirajKolac;