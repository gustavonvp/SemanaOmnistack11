import React, {useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from  'react-icons/fi'

import logoimg from '../../assets/logo.svg';

import './styles.css'

import api from '../../services/api';


export default function Profile(){
    const history = useHistory();
   
    const [incidents,setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
   
   
    
    useEffect(()=>{
        api.get('profile',{
            headers:{
            Authorization:ongId,
            },
        }).then(res =>{
            setIncidents(res.data); /*modulo axios traz data na api com string, e header de any*/
        })
    },[ongId]);

    async function hadleDeleteIncident(chave){
        try{
            await api.delete(`incidents/${chave}`,{
                headers:{
                    Authorization:ongId,
                }
            }); 
            
            setIncidents(incidents.filter(incident => incident.chave !== chave));

        }catch{
            alert('Erro ao deletar caso, tente novamente');
        }
    }
    
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }


    return (
        <div className="profile-container">
            
                <header>
                    <img src={logoimg} alt="Be The Hero"/>
                    
                    <span>Bem vindo, {ongName}</span>
                    
                    <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                    
                    <button onClick={handleLogout} type="button">
                        <FiPower size={18} color="#E02041"/>

                    </button>

                </header>
            
            <h1>Casos cadastrados</h1>

              <ul>

                {incidents.map(incident=>( 
                <li key={incident.chave}> {/* primeiro item de um map ou forEach (iteraçao) deve ter propiedade key para identificar o item para deletar ou fazer algo similar */}
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>

                    <strong>Valor</strong>
                    {/* Intl tem classes para formatar numeros e string, format pega valor real e joga para string */}
                    
                    <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</p>
                     
                    {/*ao declarar parentes e arrow, cria-se uma nova função, e não o retorno de uma função. */}    
                    <button onClick={()=> hadleDeleteIncident(incident.chave)} type="button">
                    <FiTrash2 size={20} color="#a8a8b3"/>    
                    </button>    
                </li>  ))}
              
              </ul> 
        
        </div> 
    )
}