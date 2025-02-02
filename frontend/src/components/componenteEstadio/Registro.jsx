import React from "react"
import {useForm} from "react-hook-form"
import "../styles.css"

export default function Registro({onSubmit, item, onVolver}) {

    const {register, handleSubmit, formState:{errors}} = useForm({values:item})
    
    const onClickVolver = () => {
        onVolver()
    }

    const validateDate = (date) => {
        const fechaActual = new Date().setHours(0, 0, 0, 0)
        const fechaEstadio = new Date(date).setHours(0, 0, 0, 0)
        return fechaEstadio < fechaActual || "La fecha no puede ser mayor a la actual"
    }

    return(     
        <div className="container_app">
            <div className="card">
                <h6 className="card-header">{(item.estadio_id)?"Actualizar estadio":"Nuevo estadio"}</h6>
                <div className="card-body">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" className="form-control" {...register("nombre", {required:"Campo obligatorio"})} />
                            {errors.nombre && <span className="error">{errors.nombre.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="capacidad">Capacidad:</label>
                            <input type="number" id="capacidad" className="form-control" 
                                   {...register("capacidad", {required:"Campo obligatorio", min: {value: 1, message: "Capacidad debe ser mayor a 0"}})} />
                            {errors.capacidad && <span className="error">{errors.capacidad.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="fechaConstruccion">Fecha de construccion:</label>
                            <input type="date" id="fechaConstruccion" className="form-control" 
                                   {...register("fechaConstruccion", {required:"Campo obligatorio", validate: validateDate})} />
                            {errors.fechaConstruccion && <span className="error">{errors.fechaConstruccion.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="equipo_id">ID equipo:</label>
                            <input type="number" id="equipo_id" className="form-control" 
                                   {...register("equipo_id", {required:"Campo obligatorio", min: {value: 1, message: "ID equipo debe ser mayor a 0"}})} />
                            {errors.estadio_id && <span className="error">{errors.estadio_id.message}</span>}
                        </div>

                        <div>
                            <button className="btn btn-primary mx-1 my-1" type="submit">Guardar</button>
                            <button className="btn btn-secondary mx-1 my-1" onClick={onClickVolver}>Volver</button>
                            <button className="btn btn-secondary mx-1 my-1" type="reset">Limpiar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}