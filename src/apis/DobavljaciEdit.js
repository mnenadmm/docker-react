import { useState,useEffect } from "react"
//import ObrisiDobavljaca from "../ObrisiDobavljaca"
import AzurirajDobavljaca from "./AzurirajDobavljaca"
import DodajDobavljaca from "./DodajDobavljaca"

const DobavljaciEdit = ({props,role})=>{
    const[errorMesagges,setErrorMesagges]=useState('');
    const[list, setList]=useState(0)
    const[data,setData]=useState([])
    const[idDobavljaca, setIdDobavljaca]=useState(0)
    const[imeDobavljaca, setImeDobavljaca]=useState('')
    const[telefon, setTelefon]=useState('')
    const[email, setEmail]=useState('') 
    
    const URL_Dobavljac = 'http://localhost:5000/dajDobavljaceReact';
    useEffect(() => {
        fetch(URL_Dobavljac,{
            method: "GET",
            headers: {
                rola_1:role.rola_1,
                rola_2 :role.rola_2,
                rola_3:role.rola_3,
                Authorization: 'Bearer ' + props.token, //saljemo sifru tokena da bi se otkljucao end point
                IdKorisnika: role.user
              }
        })
            .then((res) =>{
                if(res.status===200){ return res.json()}
                if(res.status===401){return  setErrorMesagges('Vasa sessija je istekla, konektujte se ponovo ERROR: 401 ')}
                if(res.status===10){return  setErrorMesagges('Nemate pristup ovom delu aplikacije')}
                if(res.status===422){return  setErrorMesagges('Neregularna konakcija, molimo Vas da se ispravno konektujete konektujete  ERROR: 422 ')}
            })   
            .then((response) => { 
                setData(response); 
            })
            .catch(error=>{
                console.log('ovo je greska ',error)
                setErrorMesagges('Neuspela konekcija sa bazom, proverite internet konekciju')
            })
    }, [role.rola_1,role.rola_2,role.rola_3,props.token,role.user]);
    
        
            
    
    const prikaziDobavljaca=()=>{
      return(
        <div className="container">
        
            <div className="row">
                <div className="col-sm-12">
                    <ul className="nav nav-tabs actions-nav">
                        <li className="active">
                            <button className="btn btn-default"  onClick={()=>setList(0)}>Lista</button>
                        </li>
                        <li>
                            <button className="btn btn-default" onClick={()=>setList(3)} >Azuriraj</button>
                        </li>
                        <li>
                            <button className="btn btn-default" style={{'color':'red'}} onClick={()=>setList(4)}>Obrisi </button>
                        </li>
                    </ul>
                </div>
            </div>
            <br />
            <div >
                <button onClick={()=>setList(0)} 
                        type='button' 
                        className='btn btn-primary'>
                            Back
                </button>
            </div>
            <br /><br />
            <div className="row">
                <div className="col-sm-12 text-center">
                    <h1>{imeDobavljaca}</h1>
                </div>
            </div>
            <br /><br />
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <label>Id</label>
                        <input className="form-control" defaultValue={idDobavljaca} disabled />
                    </div>
                </div>
                <br /><br />
                <div className="row">
                <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <label>Telefon</label>
                        <input className="form-control" defaultValue={telefon} disabled />
                    </div>
                </div>
                <br /><br />
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <label>Email</label>
                        <input className="form-control" defaultValue={email} disabled />
                    </div>
                </div>
                </div>
      )  
    }
    const dajDobavljaca=(event)=>{
        setIdDobavljaca(event[0])
        setImeDobavljaca(event[1])
        setTelefon(event[2])
        setEmail(event[3])
        setList(2)
    }
    const dobavljaci=()=>{
    return(
        <div>
            <div className="row">
                <div className="col-sm-12">
                    <ul className="nav nav-tabs actions-nav">
                        <li className="active">
                            <button className="btn btn-default">Lista</button>
                        </li>
                        <li>
                            <button className="btn btn-default" onClick={()=>setList(1)}>Kreiraj</button>
                        </li>
                    </ul>
                </div>
            </div>
            <br /><br />
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    {data.map((item, i) =>(
                        <p key={i}>
                            <button type="button" 
                                onClick={()=>dajDobavljaca(item)}
                                className="btn btn-default btn-lg  btn-block">
                                    {item[1]}
                            </button>
                            <br />
                        </p>
                    ))}
                </div>
            </div> 
            <br />
        </div>
    )
    }
    return(
        <div>
            {errorMesagges === '' ? 
                <div>
                {list===0 ? dobavljaci() : null}
                {list ===2 ? prikaziDobavljaca() : null}
                {list ===1 ? <DodajDobavljaca role={role} token={props.token}   /> : null} 
            
               {list ===3 ?
                    <>{role.rola_1 === true || role.user=== 1 ?
                        <AzurirajDobavljaca role={role} token={props.token} props={{idDobavljaca,imeDobavljaca,telefon,email}} />
                        :
                        <div className="alert alert-success alert-dismissible">
                            <p  className="close" data-dismiss="alert" onClick={()=>setList(2)} aria-label="close">&times;</p>
                            <strong>Nije vam dozvoljeno da azurirate dobavljace</strong>
                        </div>
                    }
                    </>     
                : null
                }
                {list ===4 ?
                    <>{role.rola_1 === 1 || props.user=== 1 ?
                       /* <ObrisiDobavljaca role={role} token={props.token} props={{idDobavljaca, imeDobavljaca}} />*/
                       {errorMesagges}
                        :
                        <div className="alert alert-success alert-dismissible">
                            <p  className="close" data-dismiss="alert" onClick={()=>setList(2)} aria-label="close">&times;</p>
                            <strong>Nije vam dozvoljeno da brisete dobavljace</strong>
                        </div>
                        }
                    </>
                 : null} 
            </div> 
            :
            <div className="alert alert-success alert-dismissible">
                <p  className="close" data-dismiss="alert" aria-label="close">&times;</p>
                    <strong>{errorMesagges}</strong>
           </div>
            }
        </div>
        
    )

}
export default DobavljaciEdit;