import {makeStyles} from  '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";

import AutoCard from '../components/AutoCard';
import { useState } from 'react';

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

function App() {
  const classes = useStyles();

  const [cars, setCars] = useState (
    [
      {nombre: "Sentra", marca: "Nissan"},
      {nombre: "Civic", marca: "Honda"},
      {nombre: "Mustang GT", marca: "Ford"},
      {nombre: "Accord", marca: "Honda"},
      {nombre: "Stratus", marca: "Chrysler"},
      {nombre: "Jetta", marca: "WV"},
    ]
  );

  const agregarAuto = () =>{
    console.log("Agregar auto");
    setCars([
      ...cars, //toma todo lo que tenga este estado
      {nombre: "", marca: ""}
    ]);
  };

  const eliminarAuto = (id) =>{
    cars.splice(id,1); //elimina un elemento del arreglo, empezando por el index = id
    setCars([...cars]);
  };

  const renderCars = () => {
    return cars.map(( car, index) =>(
      <Grid key= {index} item sx={12} sm={3}>
        <AutoCard  datos={car} id={index} onDelete={eliminarAuto}/>
      </Grid>
    ));
  };

  return (
    <Paper className={classes.paper}>
      <Grid item xs={12} className={classes.toolBar}>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<Icon>add</Icon>}
          onClick={agregarAuto}
          >
            Agregar
        </Button>
      </Grid>
      <Grid container spacing={3}>
        {renderCars()}
      </Grid>
    </Paper>
  );
}

export default App;
