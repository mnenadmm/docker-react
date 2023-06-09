import React ,{useState,  useEffect}from "react";
import Select from "./Select";
function IzlistajSirovine({props,role}) {
    const[data, getData] = useState([])
    const[errorMesagges,setErrorMesagges]=useState('');
    
    
    
    const URL_Dobavljac = 'http://localhost:5000/dajImeDobavljacaIdReact';
    useEffect(() => {
        
            const URL = 'http://localhost:5000/izlistaj/sirovine/react';
            fetch(URL,{
                method: "GET",
                headers: {
                    rola_1:role.rola_1 ,
                    rola_2 :role.rola_2,
                    rola_3:role.rola_3,
                    Authorization: 'Bearer ' + props.token, //saljemo sifru tokena da bi se otkljucao end point
                    IdKorisnika:  props.user //saljemo id korisnika
                }
            })
                .then((res) =>{
                
                        if(res.status===200){ return res.json()}
                    if(res.status===401){return  setErrorMesagges('Vasa sessija je istekla, konektujte se ponovo ERROR: 401 ')}
                    if(res.status===422){return  setErrorMesagges('Neregularna konakcija, molimo Vas da se ispravno konektujete konektujete  ERROR: 422 ')}
                    if(res.status===10){return  setErrorMesagges('Nemate pristup ovom delu aplikacije')}
            
                })   
                .then((response) => {   
                    getData(response);
                    
                })
                .catch(error=>{
                    console.log('ovo je greska ',error)
                    setErrorMesagges('Neuspela konekcija sa bazom, proverite internet konekciju')
                })
        
    },[role.rola_1,role.rola_2,role.rola_3,props.token,props.user])//moramo dodati da seucitaju varijable u useEffect da ne bi izbacivalo uozorenje
    
    // prikazuje sirovine po dobavljacima
    const promena =(id)=>{
        // mora biti intiger, da ne bi gresku u endpointu prijavljivao
        //odnosno salje upit samo ako je id string
        if(id >0 ){
        const URL_Sirovina = `http://localhost:5000/sirovinePoDobavljacuReact/${id}`;
        fetch(URL_Sirovina,{
            method: "GET",
            headers: {
                rola_1:role.rola_1 ,
                rola_2 :role.rola_2,
                rola_3:role.rola_3,
                Authorization: 'Bearer ' + props.token, //saljemo sifru tokena da bi se otkljucao end point
                IdKorisnika:  props.user //saljemo id korisnika
              }
        })
        .then((res) =>{
            
            if(res.status===200){ return res.json()}
           if(res.status===401){return  setErrorMesagges('Vasa sessija je istekla, konektujte se ponovo ERROR: 401 ')}
           if(res.status===422){return  setErrorMesagges('Neregularna konakcija, molimo Vas da se ispravno konektujete konektujete  ERROR: 422 ')}
 
        })
            .then((response) => { 
                getData(response);
             
            })
            .catch(error=>{
                console.log('ovo je greska ',error)
                setErrorMesagges('Neuspela konekcija sa bazom, proverite internet konekciju')
            })
        }else{
            getData([])
        }
    }
    const lista=()=>{
        
    return(
        <div className="col-sm-12">
            
             
            <br></br>
           
            <table className="table table-hover">
            <tbody>
                <tr>
                    
                    <th>Ime</th>
                    <th>Cena</th>
                    <th>Proizvodjac</th>

                </tr>
                {data.map((item, i) => (
                    <tr key={i}>
                        
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>  
                        <td>{item[3]}</td>
                        
                    </tr>
                ))}
            </tbody>
            </table><br />
        </div>
    );
    };

return(
    <div>
        <div>
            {errorMesagges === "" ? 
            <Select 
                    role={role}
                    promena={promena} 
                    options={URL_Dobavljac}
                    token={props.token}
                    setErrorMesagges={setErrorMesagges}
                    ime='Izlistaj po Dobavljacu...' 
            /> : <div className="alert alert-success alert-dismissible">
                 <p  className="close" data-dismiss="alert" aria-label="close">&times;</p>
                    <strong>{errorMesagges}</strong>
                </div>}
            </div>
        {data !==[] && errorMesagges === "" ? lista() : null}
    </div>
)
}
export default IzlistajSirovine;