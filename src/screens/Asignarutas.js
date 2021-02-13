import {makeStyles} from  '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) =>({
    paper: {
      flexGrow: 1,
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    toolBar:{
      textAlign: 'right',
      marginBottom: 18,
    }
  }));

// muestra los datos de las asignaturas
const columnas = [
    {field: 'id', headerName: 'Id', width: 70},
    {field: 'nombre', headerName: 'Asignatura', width: 200},
    {field: 'anio', headerName: 'Año', width: 100},
    {field: 'horasSemana', headerName: 'Horas semana', width: 150},
    {field: 'horasTotales', headerName: 'Hora totales', width: 150},
    {
        field: 'Profesor', 
        headerName: 'Profesor', 
        width: 150,
         //funcion que devuelve los datos del profesor
        /* valueGetter: (params) => {
            if (params.row.Profesor){
                return `${params.row.Profesor.nombre} ${params.row.Profesor.apellidos}`;
            }
            return 'Sin nombre';
        }, */

        /*forma mas simplicada
        valueGetter: ({row: {Profesor} }) => {
            return Profesor ? `${Profesor.nombre} ${Profesor.apellidos}` : 'Sin Profesor';
        },*/

        //forma mucho mas simplificada
        valueGetter: ({row: {Profesor} }) => (
            Profesor ? `${Profesor.nombre} ${Profesor.apellidos}` : 'Sin Profesor'
        ),
    }
];

function Asignaturas() {
    const classes = useStyles();
    const [asignaturas, setAsignaturas] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [filtros, setFiltros] = useState({});
    const [buscar, setBuscar] = useState('');

    const handleChange = (e) => {
        setBuscar(e.target.value);
    };

    const onBuscar = (e) => {
        if(e.key === 'Enter'){
            //ejecutar la busqueda
            axios.get(`http://localhost:5000/asignaturas?q=${buscar}`)
            .then((response) => {
                setAsignaturas(response.data);
            })
            .catch((error) => {
                console.log(error   );   
            })
        }
    };

    //guarda la seleccion del profesor
    const seleccionFiltro = (e) => {
        if (e.target.value === 'todos'){
            delete filtros[e.target.name]; //delete filtros.profesorId;
            setFiltros({...filtros});
        }else{
            setFiltros({
                ...filtros,
                [e.target.name]: e.target.value,
            })
        }
    };

    useEffect(() => {
        let parametros ='?';
        //{ profesorId: 1}
        //profedorId=1
        Object.keys(filtros).forEach((key) => {
            parametros += `${key}=${filtros[key]}` //filtros ['nombre']
        });

        //trae todo lo de asignaturas de la api
        axios.get(`http://localhost:5000/asignaturas${parametros}`)
        .then((response) => {
            setAsignaturas(response.data);
        })
        .catch((error) => {
            console.log(error   );   
        })
    }, [filtros]);

    useEffect(() => {

        //trae todo lo de profesores de la api
        axios.get('http://localhost:5000/profesores')
        .then((response) => {
            setProfesores(response.data);
        })
        .catch((error) => {
            console.log(error   );   
        })
    }, []);

    return (
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormControl>
                            <InputLabel>Profesor</InputLabel>
                            <Select
                                name="profesorId"
                                value={filtros.profesorId || 'todos'}
                                onChange={seleccionFiltro}
                            >
                                <MenuItem value="todos">Todos los profesores</MenuItem>
                                {profesores.map((profesor) =>(
                                    <MenuItem key={profesor.id} value={profesor.id}>{`${profesor.nombre} ${profesor.apellidos}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Año</InputLabel>
                            <Select
                                name="anio"
                                value={filtros.profesorId || 'todos'}
                                onChange={seleccionFiltro}
                            >
                                <MenuItem value="todos">Todos los años</MenuItem>
                                <MenuItem value="2020">2020</MenuItem>
                                <MenuItem value="2021">2021</MenuItem>   
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            label="Buscar"
                            name="buscar"
                            value={buscar || ''}
                            onChange={handleChange}
                            onKeyPress={onBuscar}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} >
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={asignaturas} columns={columnas} pageSize={10}/>
                </div>
            </Grid>
          </Grid>
        </Paper>
    );
};

export default Asignaturas;
