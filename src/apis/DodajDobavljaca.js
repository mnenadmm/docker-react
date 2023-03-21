import { useState } from "react";
import DobavljaciEdit from "./DobavljaciEdit";

const DodajDobavljaca=({token,role})=>{
    const[list, setList]=useState(1)
    const[mesages, setMesages]=useState([])
    const[poruka, setPoruka]=useState(0)
    const[imeDobavljaca, setImeDobavljaca]=useState('')
    const[emailDobavljaca, setEmailDobavljaca]=useState('')
    const[telefonDobavljaca, setTelefonDobavljaca]=useState(0)
    const snimi=()=>{
        fetch('http://localhost:5000/dodajDobavljacaReact', {
            method: 'POST',
				headers: {
                    rola_1:role.rola_1,
                    rola_2 :role.rola_2,
                    rola_3:role.rola_3,
                    Authorization: 'Bearer ' + token,
                    IdKorisnika: role.user,
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ //moramo poslati u JSON formatu
					imeDobavljaca : imeDobavljaca,
                    emailDobavljaca : emailDobavljaca,
                    telefonDobavljaca : telefonDobavljaca
				})
			}).then((res) =>{
            if(res.status===200){ return setMesages(`Dodali ste dobavljaca : ${imeDobavljaca}.`)}
            if(res.status===401){return  setMesages('Vasa sessija je istekla, konektujte se ponovo ERROR: 401 ')}
            if(res.status===422){return  setMesages('Doslo je do greske sa konekcijom')}
            if(res.status===10){return  setMesages('Nemate pristup ovom delu aplikacije')}
        });
        setTimeout(function(){
            setList(0)
        },5000)
        
        setPoruka(1)
        
        
    }
    const sacuvajDobavljaca=()=>{
    
        return(
            <div>
                <div className="row">
                {poruka !== 0 ? 
                    <div className="alert alert-success alert-dismissible">
                        <p  className="close" data-dismiss="alert" aria-label="close">&times;</p>
                         {mesages}
                </div> : null
            }
                    <div className="col-sm-12 text-center">
                        <h2>Dodaj dobavljaca</h2>
                    </div>
                </div>
            <br /><br />
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4">
                    <label>Unesiteime dobavljaca</label>
                    <input onChange={(e)=>setImeDobavljaca(e.target.value)} id='imeDobavljaca' className="form-control" />
                </div>
            </div>
            <br /><br />
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4">
                    <label>Email:</label>
                    <input onChange={(e)=>setEmailDobavljaca(e.target.value)}  type="email" className="form-control" />
                </div>
            </div>
            <br /><br />
            <div className="row">
                <div className="col-sm-4" ></div>
                <div className="col-sm-4">
                    <label>Telefon:</label>
                    <input onChange={(e)=>setTelefonDobavljaca(e.target.value)} type="tel" className="form-control" />
                </div>
            </div>
            <div className="col-sm-4">
            <br /><br />
            <button type="button" className="btn btn-info" onClick={()=>setList(0)}>Back</button>
            </div>
            
            
            { imeDobavljaca !=='' && emailDobavljaca !=='' && telefonDobavljaca !==0 ?
            <div className="row">
                <div className="col-sm-12 text-center">
                    <button  onClick={()=>{snimi()}} type="button" className="btn btn-primary">Sacuvaj</button>
                </div>
            </div> : null }
            </div>     
        )
    }
    return(
        <div>
            {list===1? sacuvajDobavljaca() : null}
            {list ===0 ? <DobavljaciEdit role={role} props={{token}} /> : null}
            
        </div>
    )
    
}
export default DodajDobavljaca;