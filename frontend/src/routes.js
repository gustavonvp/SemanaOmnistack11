import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

//BrowserRouter por volta de tudo(rota) e o switch que permite uma rota ser executada de cada vez
//O Route permite o path da rota.
//O uso da propiedade exact determina que o caminho(path) seja igual ao escrito, ou seja se foi escrito barra, o caminho vai ser ' / '
export default function Routes() {
    return (
       
        <BrowserRouter>  
            <Switch>
                <Route path="/" exact component={Logon} /> 
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />  
                <Route path="/incidents/new" component={NewIncident} /> 
            </Switch>
       
       </BrowserRouter>

    );
}

