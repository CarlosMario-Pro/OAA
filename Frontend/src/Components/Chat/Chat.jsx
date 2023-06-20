import { Link } from 'react-router-dom';
import ChatBot from 'react-simple-chatbot';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

const theme = {
    background: '#fff',
    fontFamily: 'sans-serif',
    headerBgColor: '#0c4b76',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: '#0c4b76',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    fontSize: '30px'
  };


  




class Chat extends Component {
   
        

  render() {
  <p onClick={()=>setChatStatus(false)}>x</p>
  
    return ( 
        <ThemeProvider theme={theme}>
    <ChatBot
    
    steps={[
        {
            id: '1',
            message: ' ¡Hola! Bienvenid@ a la Organización de Ambientalistas Autoconvocado, Digite su nombre a continuación.',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            trigger: '3',
        },
        {
            id: '3',
            message: '¡Hola {previousValue}, un gusto poder ayudarte!',
            trigger: "4",
        },
        {
            id: '4',
            message: '¿En que te podemos ayudar?',
            trigger: '5',
        },

        ////// MENU PRINCIPAL //////
        {
            id: '5',
            options: [
            { value: 1, label: 'Novedades', trigger: 'novedades' },
            { value: 2, label: 'Comunidades', trigger: 'comunidades' },
            { value: 3, label: 'Denuncias', trigger: 'denuncias' },
            { value: 4, label: 'Donar', trigger: 'donar' },
            { value: 5, label: 'Otras consultas', trigger: 'otras' },
            ],
        },

        ////// OPCION NOVEDADES //////
        {
            id: 'novedades',
            options: [
                { value: 1, label:'Que hacemos?', trigger: 'trabajo'},
                { value: 2, label:'noticias', trigger: 'noticias'},
            ]
        },
        {
            id: 'trabajo',
            message: 'Somos un colectivo de vecines en conflicto contra la instalación ilegal de empresas contaminantes. Este conflicto fue el punto inicial de nuestra Organización, a partir del cual comenzamos nuestro aprendizaje en la creación de formas novedosas, coherentes y eficaces de lucha socioambiental.',
            trigger: 'otraconsulta'
        },
        
        {
            id: 'noticias',
            component: <Link to={"/novelties"}>Presione para ir al sitio</Link>,
           
            trigger: 'otraconsulta'
        },
        ////// OPCION COMUNIDADES//////
        {
            id: 'comunidades',
            options: [
                { value: 1, label:'Quienes Somos?', trigger: 'somos'},
                { value: 2, label:'Ser Voluntario', trigger: 'servoluntario'},
                
            ]
        },
        {
            id: 'somos',
            message: 'Somos un colectivo de vecines en conflicto contra la instalación ilegal de empresas contaminantes. Este conflicto fue el punto inicial de nuestra Organización, a partir del cual comenzamos nuestro aprendizaje en la creación de formas novedosas, coherentes y eficaces de lucha socioambiental.',
            trigger: 'otraconsulta'
        },
        {
            id: 'servoluntario',
            component:  <Link to={"/newsletter"}>IR AL SITIO</Link>,
            trigger: 'otraconsulta'
        },
        

        ////// OPCION DENUNCIAS//////
        {
            id: 'denuncias',
            message: 'Si vez que tu comunidad tiene problemas socioambientales a causas de las industrias, puedes hacer tu denuncia en el siguiente link "www.denunciasambientales.com"',
            trigger: 'otraconsulta',
        },
        
        ////// OPCION DONAR //////
        {
            id: 'donar',
            options: [
                { value: 1, label:'A quien se dona?', trigger: 'sedona'},
                { value: 2, label:'Quiero Donar', trigger: 'donacion'},
                
            ]
        },
        {
            id: 'sedona',
            message: 'La donacion va dirigido a la OAA ya que somos una organizacion sin fines de lucro.',
            
            trigger: 'otraconsulta',
        },
        {
            id: 'donacion',
            component: <Link   to={"/done"}>DONA AQUI</Link>,
            trigger: 'otraconsulta',
        },
        {
            id: 'otras',
            message: 'Por otras consultas comunicarse con nosotros via email:  ambientalistas.autoconvocados@gmail.com',
            trigger: 'otraconsulta',
        },


        ////// OTRA CONSULTA FINAL //////
        {
            id: 'otraconsulta',
            message: 'Deseas hacer otra consulta?',
            trigger: 'opcionfinal'
        },
        {
            id: 'opcionfinal',
            options: [
                { value: 1, label:'Si', trigger: '4'},
                { value: 2, label:'No', trigger: 'final'},
            ]
        },
        {
            id: 'final',
            message: 'Puedes volver a la ayuda en linea cuando quieras. ¡Hasta la proxima!',
            end: true,
        },

        ]}
        
    />
      </ThemeProvider>
    );
    
  }
}

export default Chat;