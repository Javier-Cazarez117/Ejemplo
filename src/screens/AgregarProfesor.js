import {makeStyles} from  '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import { Button, Icon} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import { campoRequerido, esEmail, esTelefono, esTexto } from '../utils/validaciones';

const useStyles = makeStyles((theme) =>({
    paper: {
      flexGrow: 1,
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const AgregarProfesor = () => {
    const classes = useStyles();
    const [profesor, setProfesor] = useState ({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '', 
        texto: ''
    });
    const handleChange = (e) => {
        setProfesor({
            ...profesor,
            [e.target.name]: e.target.value
        });
    };
    const [errores, setErrores] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        //limpiar mensajes de error
        setErrores({});
        const validaciones = {};
/*
        console.log("Validar formulario");
        
        const validaciones = {};

        let result = campoRequerido(profesor.nombre);
        if (result){
            validaciones.nombre = result;
        }
        
        result = campoRequerido (profesor.apellidos);
        if (result){
            validaciones.apellidos = result;
        }

        result = campoRequerido (profesor.email);
        if (result){
            validaciones.email = result;
        }   else {
            result = esEmail(profesor.email);
            if (result) {
                validaciones.email = result;
            }
        }

        result = campoRequerido (profesor.texto);
        if (result){
            validaciones.texto = result;
        }   else {
            result = esTexto(profesor.texto);
            if (result) {
                validaciones.texto = result;
            }
        }

        if (profesor.telefono !== ''){
            result = esTelefono(profesor.telefono);
            if (result){
                validaciones.telefono = result;
            }
        }

        console.log(validaciones);
        if (Object.keys(validaciones).length > 0) {
            setErrores(validaciones);
            return;
        }
        
*/
        const copiaProfesor = {...profesor};
        if(copiaProfesor.telefono ===''){
            delete copiaProfesor.telefono;  
        }

        axios.post('http://localhost:5000/profesores', copiaProfesor)
        .then((response)=> {
            if(response.data.error){
                //mostrar los errores del servidor
                response.data.errores.forEach(element => {
                    if (!validaciones[element.campo]){
                        validaciones[element.campo] = element.error;
                    }
                });
                setErrores(validaciones)
            }else{
                //limpiar el formulario
                setProfesor({
                    nombre: '',
                    apellidos: '',
                    email: '',
                    telefono: '', 
                    texto: ''
                });
            }
            //console.log(response.data);            
        })
        .catch((error)=> {
            console.log(error);
        });
    };


    

    return (
        <Paper className = {classes.paper}>
            <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={profesor.nombre}
                            onChange={handleChange}
                            required
                            error={!!errores.nombre}
                            helperText={errores.nombre || ''}
                        />         
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="Apellidos"
                            name="apellidos"
                            value={profesor.apellidos}
                            onChange={handleChange}
                            required
                            error={!!errores.apellidos}
                            helperText={errores.apellidos || ''}
                        />         
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="Email"
                            name="email"
                            value={profesor.email}
                            type="email"
                            onChange={handleChange}
                            required
                            error={!!errores.email}
                            helperText={errores.email || ''}
                        />         
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="Texto y numeros"
                            name="texto"
                            value={profesor.texto}
                            onChange={handleChange}
                            required
                            error={!!errores.texto}
                            helperText={errores.texto || ''}
                        />         
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label="Telefono"
                            name="telefono"
                            value={profesor.telefono}
                            type="tel"
                            onChange={handleChange}
                            error={!!errores.telefono}
                            helperText={errores.telefono || ''}
                        />         
                    </Grid>
                    <Grid item md={12}>
                        <Button 
                            variant="contained"
                            color="primary"
                            startIcon={<Icon>save</Icon>}
                            type="submit"
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default AgregarProfesor;