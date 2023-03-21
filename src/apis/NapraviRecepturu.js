import Select from "../components/Select"
import { useState } from "react"
import DodajURecepturu from "./DodajURecepturu"

const NapraviRecepturu = ({props,role})=>{
    const[errorMesagges,setErrorMesagges]=useState('');
    const[idKolaca, setIdKolaca]=useState(0)
    const [data, getData] = useState([])
    const[naslov, setNaslov]=useState(0)
    const[kolicina, setKolicina]=useState(0)
    const[dodaj, setDodaj]=useState(0)// nakon sto se izabere kolac daje unos sirovine
  
    const[idSirovine, setIdSirovine]=useState(0)
    const [components, setComponents] = useState(["Sample Component"]);
    const URL ='http://localhost:5000/dajlistuKolacaBezReceptureReact';
    
    const dajKolac=(id)=>{
        const URL_KOLAC=`http://localhost:5000/dajImeKolacaReact/${id}`;
        setIdKolaca(Number(id));
        
           fetch(URL_KOLAC,{
                method: "GET",
                headers: {
                    rola_1:role.rola_1,
                    rola_2 :role.rola_2,
                    rola_3:role.rola_3,
                    idKorisnika: role.user,
                    Authorization: 'Bearer ' + props.token //saljemo sifru tokena da bi se otkljucao end point
                  }
            })
            .then((res) =>{
            
                if(res.status===200){ return res.json()}
                if(res.status===401){return  setErrorMesagges('Vasa sessija je istekla, konektujte se ponovo ERROR: 401 ')}
                if(res.status===422){return  setErrorMesagges('Neregularna konakcija, molimo Vas da se ispravno konektujete konektujete  ERROR: 422 ')}
                if(res.status===10){return  setErrorMesagges('Nemate pristup ovom delu aplikacije ')}                           
                })
                .then((response) =>getData(response[0]))
                .catch(error=>{
                    console.log('ovo je greska ',error)
                   
                })
            setNaslov(1)
            setDodaj(1)
            
        

    }
    const vrednost = (e)=>{
        setKolicina(e);
    }
    
    const dodajSirovinu=(e)=>{
        setIdSirovine(e)
        
        
   
    }
    const addComponent=()=>{
         
    setComponents([...components, "Sample Component"])
    const x=[];
    x.push(idKolaca,kolicina,idSirovine) 
    fetch('http://localhost:5000/napraviRecepturuReact', {
        method: 'POST',
            headers: {
                rola_1:role.rola_1 ,
                rola_2 :role.rola_2,
                rola_3:role.rola_3,
                idKorisnika: role.user,
                Authorization: 'Bearer ' + props.token,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //moramo poslati u JSON formatu
                idKolaca : idKolaca,
                kolicina: kolicina,
                idSirovine : idSirovine

            })
        }).then((res) =>{
            
            if(res.status===200){ return res.json()}
            if(res.status===401){return  setErrorMesagges('Vasa sessija je istekla, konektujte se ponovo ERROR: 401 ')}
            if(res.status===422){return  setErrorMesagges('Neregularna konakcija, molimo Vas da se ispravno konektujete konektujete  ERROR: 422 ')}
            if(res.status===10){return  setErrorMesagges('Nemate pristup ovom delu aplikacije ')}                           
            }).then((response=>{
                console.log(response)
            }))
        
    }
   
    const novaReceptura=()=>{
    return(
        <div>
             {errorMesagges ==='' ?
                <div>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4"> {naslov ===0 ? 
                        <Select 
                        setErrorMesagges={setErrorMesagges} 
                        token={props.token} 
                        promena={dajKolac} 
                         options={URL} ime='Izaberite kolac...'
                         role={role} />
                    :null}
                    {naslov !==0 ? 
                   <div className="col-sm-12 text-center"><h2>{data}</h2></div>  
                    :null}
                    </div>
                </div>
               <br /><br /><br />

            </div>:
            <div className="alert alert-success alert-dismissible">
            <p  className="close" data-dismiss="alert" aria-label="close">&times;</p>
               <strong>{errorMesagges}</strong>
           </div>

            }
        </div>
        
       
        
       
    )
}

 return(
    <div>
        {errorMesagges ==='' ?
            <div>
                {novaReceptura ()}
                {dodaj !==0 &&
                    components.map((item, i) => ( <DodajURecepturu role={role} token={props.token} props={{dodajSirovinu,vrednost}} key={i} /> ))}
                    <br />
                {dodaj !==0 &&
                    <button onClick={addComponent} text="Call Component">Dodaj</button> }    
            
            
    
            </div>:
            <div className="alert alert-success alert-dismissible">
            <p  className="close" data-dismiss="alert" aria-label="close">&times;</p>
               <strong>{errorMesagges}</strong>
           </div>
    }
    </div>
    
 )}
export default NapraviRecepturu;