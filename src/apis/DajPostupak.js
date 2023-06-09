import React, {useState, useEffect } from "react";
import DajKolace from "./DajKolace";
import './DajPostupak.css';
const DajPostupak = ({props,token,role})=>{
    
    const[nazad,setNazad]=useState(0);// vraca nazad
    const[errorMessages,setErrorMessages]=useState('');
    const[postupak, setPostupak]=useState(false)//da li se prikazuje postupak
    const[objasnjenje,setObjasnjenje]=useState([])//objasnjenje kolaca
    const[recept, setRecept]=useState([])//receptura
    const URL_RECEPT =`http://localhost:5000/dajRecepturuReact/${props.idKolaca}`
    const URL_POSTUPAK = `http://localhost:5000/dajPostupakZaRecepturu/${props.idKolaca}`
    
    useEffect(()=>{
        fetch(URL_RECEPT,{
            method: "GET",
            headers: {
                rola_1:role.rola_1,
                rola_2 :role.rola_2,
                rola_3:role.rola_3,
                Authorization: 'Bearer ' + token, //saljemo sifru tokena da bi se otkljucao end point
                idKorisnika:role.user
            }
        })
        .then((res) =>{
          if(res.status===200){return res.json()}
          if(res.status===401){return  setErrorMessages('Vasa sessija je istekla, konektujte se ponovo ERROR: 401 ')}
          if(res.status===10){return  setErrorMessages('Nemate pristup ovom delu aplikacije')}
          if(res.status===422){return  setErrorMessages('Neregularna konakcija, molimo Vas da se ispravno konektujete konektujete  ERROR: 422 ')}
        
        })
        .then((response) => { 
            
          setRecept(response)  
              
        }).catch((error)=>{
            console.log('ERROR: ',error)
        });
        fetch(URL_POSTUPAK,{
            method: "GET",
            headers: {
                rola_1:role.rola_1,
                rola_2 :role.rola_2,
                rola_3:role.rola_3,
                Authorization: 'Bearer ' + token, //saljemo sifru tokena da bi se otkljucao end point
                idKorisnika:role.user
              }
        })
        .then((res) =>{
         if(res.status===200){return res.json()}   
         if(res.status===401){return  setErrorMessages('Vasa sessija je istekla, konektujte se ponovo ERROR: 401 ')}
         if(res.status===10){return  setErrorMessages('Nemate pristup ovom delu aplikacije')}
         if(res.status===422){return  setErrorMessages('Neregularna konakcija, molimo Vas da se ispravno konektujete konektujete  ERROR: 422 ')}  
        })
        .then((response) => { 
            setObjasnjenje(response);
           
            
        }).catch((error)=>{
            console.log('ERROR: ',error)
        })
       
    },[role.rola_1,role.rola_2,role.rola_3,token,role.user,URL_RECEPT,URL_POSTUPAK]);
   
  
    const pokazi = ()=>{
        return(
            <div>
                {errorMessages ==='' ?
            <div className="col-sm-12">
                <h2 className="objasnjenje">{objasnjenje}</h2>
                <br /><br />
            </div>
            :
            <div className="alert alert-success alert-dismissible">
                <p  className="close" data-dismiss="alert" aria-label="close">&times;</p>
                    <strong>{errorMessages}</strong>   
            </div>
        }
            </div>
        )
    }
    const Receptura=()=>{
        const prikazi=()=>{
           
            setPostupak(a=>!a)//ovo znacisuprotno od postojeceg
        }
        return(
            <div>
                {errorMessages ==="" ?
            <div className="container">
                <ul className="nav nav-tabs actions-nav">
                <li>
                    <button className="btn btn-default" onClick={()=>setNazad(1)}>List</button>
                </li>
                <li className="active">
                    <button className="btn btn-default">Objasnjenje</button>
                </li>
                </ul>
                <div className="row">
                <br></br><br></br>
                <div className="col-sm-4"></div>
                <div className="col-sm-4 text-center">
                    <h2>{props.imeKolaca}</h2>
                </div>
            </div>
            <br />
            <br /><br />
            <table className="table table-striped  table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sirovina</th>
                    <th scope="col">Kolicina</th>
                  </tr>
                </thead>
            {recept.map((item, i) => (
                <tbody key={i}>
                  <tr>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                  </tr>
                </tbody>  
            ))}
           </table>
            <button type="button"onClick={()=>prikazi()} className="btn btn-info">Postupak</button>
                {postupak ===true? pokazi() : null}
                <br></br><br></br><br></br><br></br>
            </div>
                :
                <div className="alert alert-success alert-dismissible">
                        <p  className="close" data-dismiss="alert" aria-label="close">&times;</p>
                    <strong>{errorMessages}</strong>
                </div>
                }
            </div>
        )
    }
    return(
        <div>
            {nazad===0 ? Receptura() : <DajKolace role={role} props={{token}} />}   
        </div>
    )
}
export default DajPostupak;