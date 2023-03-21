import React, {useState, useEffect } from "react";
import DajPostupak from "./DajPostupak";

const DajKolace = ({props,role})=>{
    const[errorMesagges,setErrorMesagges]=useState('');
    const[data, setKolac]=useState([]);
    const [filteredData,setFilteredData] = useState(data); //ovo je pocetno stanje kolaca i dobija vrednost iz search
    const[stranica,setStranica]=useState(0);
    const[idKolaca, setIdKolaca]=useState(0);
    const[imeKolaca,setImeKolaca]=useState('');
    
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
    },[role.rola_1,role.rola_2,role.rola_3,props.token,role.user]);
      
            
        
    const postupak=(id,imeKolaca)=>{
        setImeKolaca(imeKolaca)
        setIdKolaca(id)
        setStranica(1)
        
      }
      const handleSearch = (event) =>{
        let value = event.target.value.toLowerCase();
        let result = [];
        result = data.filter((data) => {
            
            return data[1].search(value) !== -1;
        });
        setFilteredData(result);
                }
    const kolaci =()=>{
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                    <input className="form-control" onChange={(event) =>handleSearch(event)} id="myInput" type="text" placeholder="Search.."></input>
                    </div>
                </div>

                <table className="table table-hover">
                <tbody>
                    <tr>
                        <th>Id kolaca</th>
                        <th>Ime kolaca</th>
                        
                        
                    </tr>
                    {filteredData.map((item, i) => (
                        <tr key={i}>
                            <td>{item[0]}</td>
                            <td onClick={()=>{postupak(item[0],item[1])}}>{item[1]}</td>
                            
                        </tr>
                    ))}
                </tbody>
                </table>
                <br />
            </div>
        );
    }
    return(
        <div>
            {errorMesagges === '' ?
                <div>
                {stranica===0? kolaci() : null }
                
                {stranica===1 ? <DajPostupak role={role} token={props.token} props={{idKolaca,imeKolaca}} /> : null}
            </div>:
            <div className="alert alert-success alert-dismissible">
            <p className="close" data-dismiss="alert" aria-label="close">&times;</p>
               <strong>{errorMesagges}</strong>
           </div>
        }
        </div>
        
    )
};
export default DajKolace ;