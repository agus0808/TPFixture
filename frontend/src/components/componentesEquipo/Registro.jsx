import React from "react"
import {useForm} from "react-hook-form"
import "../styles.css"

export default function Registro({onSubmit, item, onVolver}) {

    const {register, handleSubmit, formState:{errors}} = useForm({values:item})
    
    const onClickVolver = () => {
        onVolver()
    }

    return <>
    
    <div className="container_app">
        <div className="card">
            <h6 className="card-header">{(item.equipo_id)?"Actualizar equipo":"Nuevo equipo"}</h6>
            <div className="card-body">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" className="form-control" {...register("nombre", {required:"Campo obligatorio"})} />
                        {errors.nombre && <span className="error">{errors.nombre.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="ciudad">Ciudad:</label>
                        <input type="text" id="ciudad" className="form-control" {...register("ciudad", {required:"Campo obligatorio"})} />
                        {errors.ciudad && <span className="error">{errors.ciudad.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechaFundacion">Fecha Fundacion:</label>
                        <input type="date" id="fechaFundacion" className="form-control" {...register("fechaFundacion", {required:"Campo obligatorio"})} />
                        {errors.fechaFundacion && <span className="error">{errors.fechaFundacion.message}</span>}
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
    </>

}