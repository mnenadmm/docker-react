import React, { useState } from 'react';
import  secureLocalStorage  from  "react-secure-storage";
import { useNavigate } from 'react-router-dom';
import PromeniPassword from './PromeniPassword';

const Login=({props})=>{
  const[stranica, setStranica]=useState(0)
  const[errorMesagges,setErrorMesagges]=useState('');
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
  
  const UlogujSe=()=>{
    
    const promeni=(e)=>{
        e.preventDefault();
        const opt={method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username':username,
          'password':password
        })}
        fetch('http://localhost:5000/token',opt)
        .then(resp =>{ 
            if(resp.status===200){ return resp.json()}
            if(resp.status===401){return  setErrorMesagges('Uneli ste pogresno korisnicko ime ili lozinku  ')}
           if(resp.status===422){return  setErrorMesagges('Neregularna konakcija, molimo Vas da se ispravno konektujete konektujete  ERROR: 422 ')}
           if(resp.status===500){return  setErrorMesagges('Uneli ste pogresno korisnicko ime ili lozinku  ')}
           if(resp.status===800){return  setErrorMesagges('Nalog nije verifikovan  ')}
            
        }) 
        .then(data=>{
          if(data){
            secureLocalStorage.setItem('user',data.id)//id korisnika
          secureLocalStorage.setItem('korisnik',data.korisnik)//ime korisnika
            secureLocalStorage.setItem('token',data.access_token)// ovde cuvamo token u sesiju
          secureLocalStorage.setItem('rola_1',data.rola_1)
          secureLocalStorage.setItem('rola_2',data.rola_2)
          secureLocalStorage.setItem('rola_3',data.rola_3)
            props.setKorisnik(secureLocalStorage.getItem('korisnik'))//dajemo sessiji vrednost
            props.setToken(secureLocalStorage.getItem('token'))
            props.setUser(secureLocalStorage.getItem('user'))
            props.setRola_1(secureLocalStorage.getItem('rola_1'))
            props.setRola_2(secureLocalStorage.getItem('rola_2'))
            props.setRola_3(secureLocalStorage.getItem('rola_3')) 
            navigate('/');//preusmerava napocetnu stranu
          }
          
            
            
        })
        .catch(error=>{
          console.log('ovo je greska ',error )
      })

      
      
    }
  return(
    <div className="container">
      <div className='col-sm-12 text-center'>
        <h1>Please Log In</h1>
        <br />
          <p style={{color: 'red'}}>{errorMesagges}</p>
        <br />
      </div>
      
      <form onSubmit={(e)=>promeni(e)}>
      
        <div className='row'>
          <div className='col-sm-4'></div>
          <div className='col-sm-4'>
            <label>
              <p>Username</p>
              <input className='form-control' type="text" onChange={e => setUserName(e.target.value)} />
            </label>
        
            </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'></div>
          <div className='col-sm-4'>
        <label>
          <p>Password</p>
          <input className='form-control' type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <p onClick={()=>setStranica(1)}>Forgot password??</p>
        </div>
        </div>
        <br />
        <br /><br />
        <div className='col-sm-12 text-center'>
          <button className='btn btn-primary' onClick={(e)=>promeni(e)}type="submit">Submit</button>
        </div>
      </form>
     
    </div>
  )
    }
    
    
    return(
      <div>
        
       
        {stranica===0? UlogujSe() : null}
        {stranica ===1 ? <PromeniPassword /> : null}
      
        
        
  
      </div>
    )
}

export default Login; 