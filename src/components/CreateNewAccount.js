import React,{useState} from "react";
import Pocetna from "./Pocetna";

const CreateNewAccount=()=>{
    const[stranica,setStranica]=useState(0)
    const[userName,setUserName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('')
    const[confirm,confirmPassword]=useState(false)
    const[telefon,setTelefon]=useState('')
    const[adresa,setAdresa]=useState('')
    const[messages,setMessages]=useState('')
    const[errorMesaggesConfirm,setErrorMesaggesConfirm]=useState('') 
    const[errorMesaggesEmail, setErrorMesaggesEmail]=useState('')
    const[errorMesaggesUser,setErrorMesaggesUser]=useState('')
    const[errorMesaggesPassword,setErrorMesaggesPassword]=useState('')
const kreiraj=()=>{
    
   
    const promeni = (e)=>{
        e.preventDefault();
        
            
        if(confirm !== false && confirm === password && email !=='' && userName!==''){
           
            setErrorMesaggesConfirm('') 
            setErrorMesaggesEmail('')
            setErrorMesaggesUser('')
            setErrorMesaggesPassword('')
        const opt={method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username':userName,
          'password':password,
          'email' : email,
          'adresa' : adresa,
          'telefon':telefon
        })}
            fetch('http://localhost:5000/kreirajKorisnikaReact',opt)
            .then((res) =>{
                if(res.status===200){return res.json()}
               if(res.status===10){return  setErrorMesaggesUser(`Korisnicko ime ${userName}  je zauzeto`)}
               if(res.status===20){return  setErrorMesaggesEmail(`Email ${email}  je zauzet`)}
            })
            .then((response)=>{
                
                if(response){

                    setMessages(`Na email ${email} poslali smo verifikaciju korisnickog naloga.Molimo Vas da potvrdite verifikaciju`)
                    setTimeout(function(){ 
                        setStranica(1) },5000);
                }
  
            }).catch((error)=>{console.log('ERROR: ',error)})
        }else if (confirm !==password){
            setErrorMesaggesConfirm('Niste potvrdili password')
        }else if(email ===''){
                setErrorMesaggesEmail('Morate uneti email')
        }else if(userName ===''){
             setErrorMesaggesUser('Morate uneti user name') 
        }else if(password ===''){
            setErrorMesaggesPassword('morate uneti password')
        } 
    }
    return(
        <div className="container">
            <div className="col-sm-12 text-center">
               <h3>Create New Account </h3> 
               {messages !=='' ? 
                    <div className="alert alert-success alert-dismissible">
                        <p className="close" data-dismiss="alert" aria-label="close">&times;</p>
                            {messages}
                    </div> 
                    : 
                null}
            </div>
            <form onSubmit={(e)=>promeni(e)}>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <br/>
                        <label>
                            <p>User name</p>
                        </label>
                        <input className='form-control' type="text" 
                        onChange={e => setUserName(e.target.value)} />  
                        {errorMesaggesUser !== ''? <p style={{color:'red'}}>{errorMesaggesUser}</p>  : null}
                    </div>
                        
                </div>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <br/>
                        <label>
                            <p>Email:</p>
                        </label>
                        <input className='form-control' type="text"
                            onChange={e => setEmail(e.target.value)}
                        />  
                       {errorMesaggesEmail !== ''? <p style={{color:'red'}}>{errorMesaggesEmail}</p>  : null}  
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <br/>
                        <label>
                            <p>Password:</p>
                        </label>
                        <input className='form-control' type="password"
                           onChange={e => setPassword(e.target.value)} 
                        />  
                        {errorMesaggesPassword !== ''? <p style={{color:'red'}}>{errorMesaggesPassword}</p>  : null}  
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <br/>
                        <label>
                            <p>Confirm Password:</p>
                        </label>
                        <input className='form-control' type="password"
                            onChange={e => confirmPassword(e.target.value)} 
                         /> 
                         {errorMesaggesConfirm !== ''? <p style={{color:'red'}}>{errorMesaggesConfirm}</p>  : null} 
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <br/>
                        <label>
                            <p>Telefon:</p>
                        </label>
                        <input className='form-control' type="tel"
                            onChange={e => setTelefon(e.target.value)}
                        />  
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <br/>
                        <label>
                            <p>Adresa:</p>
                        </label>
                        <input className='form-control' type="text"
                            onChange={e => setAdresa(e.target.value)}
                        />  
                    </div>
                </div>
                <br/><br />
            <div className="col-sm-12 text-center">
                <button  className="btn btn-primary">Save</button>
            </div>
            </form>
        </div>
    )
}
    return(
        <div>
            {stranica ===0 ? kreiraj() : <Pocetna />}
            </div>
    )
}
export default CreateNewAccount;