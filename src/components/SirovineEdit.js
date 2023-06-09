import React ,{useState,  useEffect}from "react";
import AzurirajSirovinu from "./AzurirajSirovinu";
import ObrisiSirovinu from "../apis/ObrisiSirovinu";
const SirovineEdit = ({props,role})=>{
    const[errorMesagges,setErrorMesagges]=useState('');
    const [data, getData] = useState([])
    const [filteredData,setFilteredData] = useState(data); //koristi se za search
    const[stranica, setStranica]=useState(0)//koristimo zakretanje po stranicama
    const[idSirovine,setIdSirovine]=useState(0)
    const[imeSirovine, setImeSirovine]=useState('')
    const[cenaSirovine, setCenaSirovine]=useState(0)
    const[idDobavljaca, setIdDobavljaca]=useState(0)
    const[imeDobavljaca, setImeDobavljaca]=useState("")
    
    const URL = 'http://localhost:5000/izlistaj/sirovine/react';
    useEffect(() => {
        fetch(URL,{
            method: "GET",
            headers: {
                rola_1:role.rola_1 ,
                rola_2 :role.rola_2,
                rola_3:role.rola_3,
                Authorization: 'Bearer ' + props.token, //saljemo sifru tokena da bi se otkljucao end point
                idKorisnika: props.user

               
            }
        })
            .then((res) =>{
            if(res.status===200){ return res.json()}
           if(res.status===401){return  setErrorMesagges('Vasa sessija je istekla, konektujte se ponovo ERROR: 401 ')}
           if(res.status===10){return  setErrorMesagges('Nemate pristup ovom delu aplikacije')}
           if(res.status===422){return  setErrorMesagges('Neregularna konakcija, molimo Vas da se ispravno konektujete konektujete  ERROR: 422 ')}
            })  
            .then((response) => { 
               getData(response);
                setFilteredData(response);
            })
            .catch(error=>{
                console.log('ovo je greska ',error)
                setErrorMesagges('Neuspela konekcija sa bazom, proverite internet konekciju')
            })
    }, [role.rola_1,role.rola_2,role.rola_3,props.token,props.user])
    const uredi = (idSirovine,nazivSirovine,imeDobavljac,cena,idDobavljaca)=>{  
        setIdSirovine(idSirovine);
        setImeSirovine(nazivSirovine);
        setImeDobavljaca(imeDobavljac);
        setCenaSirovine(cena);
        setIdDobavljaca(idDobavljaca);
        setStranica(1)
    }
    const obrisi=(idSirovine,nazivSirovine,imeDobavljac,cena,idDobavljaca)=>{
        
        setIdSirovine(idSirovine);
        setImeSirovine(nazivSirovine);
        setImeDobavljaca(imeDobavljac);
        setCenaSirovine(cena);
        setIdDobavljaca(idDobavljaca);
        setStranica(2)//prelazimo na obrisi sirovinu
    }
    const handleSearch = (event) =>{
        let value = event.target.value.toLowerCase();
        let result = [];
        result = data.filter((data) => {
           
            return data[1].search(value) !== -1;
        });
        setFilteredData(result);
                }
    const edit = ()=>{
       
        return(
            <div>
        	    <ul className="nav nav-tabs actions-nav">
        		<li className="active"  >
                    <button className="btn btn-default">List</button>
                </li>
                <li>
                <input className="form-control" onChange={(event) =>handleSearch(event)} id="myInput" type="text" placeholder="Search.."></input>
                </li>
                 </ul> 
                 
            <table className="table table-hover"  >
                <thead>
                <tr>
                    <th>Edit</th>
                    <th>Obrisi</th>
                    <th>Ime Sirovine</th>
                    <th>Cena</th>
                    <th>Proizvodjac</th>
                </tr>
                </thead>
                <tbody id="myTable">
                {filteredData.map((item, i) => (
                    <tr key={i}>
                        <td>
                            <span onClick={()=>uredi(item[0],item[1],item[3],item[2],item[4])} className="fa fa-pencil glyphicon glyphicon-pencil"></span>
                        </td>
                        <td>
                            <span onClick={()=>obrisi(item[0],item[1],item[3],item[2],item[4])} className="fa fa-trash glyphicon glyphicon-trash"></span>
                        </td>
                        <td style={{display:'none'}}>{item[0]}</td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td >{item[3]}</td>
                        <td style={{display:'none'}}>{item[4]}</td> 
                        
                    </tr>
                ))}
            </tbody>
            </table>
            <br /><br />
            </div>
        )
    }
    return(
        <div>
            {errorMesagges === '' ?
            <div>
                {stranica ===0 ? edit()  : null}
                {stranica ===1 ?
                    <>{role.rola_1 === true || props.user=== 1 ?
                        <AzurirajSirovinu role={role} props={props}  azuriraj={{idSirovine,imeSirovine,cenaSirovine,idDobavljaca,imeDobavljaca}}  />
                        :
                        <div className="alert alert-success alert-dismissible">
                            <p  className="close" data-dismiss="alert" onClick={()=>setStranica(0)} aria-label="close">&times;</p>
                            <strong>Nije vam dozvoljeno da azurirate sirovine</strong>
                        </div>
                        }
                    </>
                 : null}
                 {stranica ===2 ?
                    <>{role.rola_1 === true || props.user=== 1 ?
                        <ObrisiSirovinu role={role} props={props} azuriraj={{idSirovine,imeSirovine,cenaSirovine }} />
                        :
                        <div className="alert alert-success alert-dismissible">
                            <p  className="close" data-dismiss="alert" onClick={()=>setStranica(0)} aria-label="close">&times;</p>
                            <strong>Nije vam dozvoljeno da brisete sirovine</strong>
                        </div>
                        }
                    </>
                 : null}  
            </div> : 
                <div  className="alert alert-success alert-dismissible">
                    <p  className="close" data-dismiss="alert" aria-label="close">&times;</p>
                    <strong>{errorMesagges}</strong>
            </div>
             }
        </div>
        
        
    );
};
export default SirovineEdit;