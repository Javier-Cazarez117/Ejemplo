import {makeStyles} from  '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginTop: 12,
    },
    buttonRight: {
        marginLeft: 'auto!important' ,
    }
});

export default function AutoCard({datos, id, onDelete}){
    const classes = useStyles();


    const [editar, setEditar] = useState(false);
    const [auto, setAuto] = useState(datos);
    
    const toogleEditar = () => {
        setEditar(!editar);
    };

    const guardarAuto = () => {
        console.log("Guardar auto");
        setEditar(false);
    };

    const onChange = (e) => {
        setAuto({
            ...auto,
            [e.target.name]: e.target.value,
        });
    };

    const llamarEliminar = () =>{
        if(onDelete){
            onDelete(id);
        }
    };
    
    useEffect(() => {
        setAuto({...datos});
    }, [datos, id]);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                {!editar && (
                    <>
                        <Typography className={classes.title}>
                            Auto
                        </Typography>
                        <Typography component="h2">
                            {auto.nombre}
                        </Typography>
                    </>
                )}
                {editar && (
                    <TextField 
                        label="Nombre"
                        name="nombre"
                        value={auto.nombre}
                        onChange={onChange}
                    />
                )}
                {!editar && (
                    <>
                        <Typography className={classes.pos}>
                            Marca
                        </Typography>
                        <Typography component="p">
                            {auto.marca}
                        </Typography>
                    </>
                )}     
                {editar && (
                    <TextField 
                        label="Marca"
                        name="marca"
                        value={auto.marca}
                        onChange={onChange}
                    />
                )}     
            </CardContent>
            <CardActions>
                {!editar && (
                    <IconButton color="primary" onClick={toogleEditar}>
                        <Icon>edit</Icon>
                    </IconButton>
                )}
                {editar && (
                    <IconButton color="primary" onClick={guardarAuto}>
                        <Icon>save</Icon>
                    </IconButton>
                )}
                <IconButton color="secondary" 
                    className={classes.buttonRight}
                    onClick={llamarEliminar}
                >
                    <Icon>delete</Icon>
                </IconButton>
            </CardActions>
        </Card>
    );
};