import React from "react";

export function PublishPage() {
    return (
        <>
            <div className="container navbar-spacing">
                <div className="row">
                    <div className="col-md-6 bg-success-subtle rounded border border-warning">
                        <div className="d-flex justify-content-center mt-5 text-success-emphasis">
                            <h3>Nueva publicación</h3>
                        </div>
                        <div className="border p-5 text-center">
                            <div className="form-group">
                                <label htmlFor="titulo" className="fw-semibold text-success-emphasis">Título</label>
                                <input type="text" className="form-control mb-3 border border-success" id="titulo" placeholder="Ingresa el título" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="seccion" className="fw-semibold text-success-emphasis">Sección</label>
                                <select className="form-control mb-3 border border-success" id="seccion">
                                    <option value="noticias" className="fw-semibold">Noticias</option>
                                    <option value="salud" className="fw-semibold">Salud</option>
                                    <option value="eventos" className="fw-semibold">Eventos</option>
                                    <option value="servicios" className="fw-semibold">Servicios</option>
                                </select>
                            </div>
                            <textarea className="form-control mb-3 border border-success" placeholder="Descripción de la publicación" rows="4"></textarea>
                        </div>
                        <div className="d-flex justify-content-center m-2">
                            <button className="btn btn-warning btn-outline-dark">Publicar</button>
                        </div>
                    </div>

                    <div className="col-md-6 d-flex flex-column justify-content-start align-items-center">
                        <div className="card text-bg-warning mb-3" style={{ width: "18rem" }}>
                            <div className="card-header">Hora</div>
                            <div className="card-body">
                                <p className="card-text">Espacio para colocar la API de la hora.</p>
                            </div>
                        </div>

                        <div className="card text-bg-warning mb-3" style={{ width: "18rem" }}>
                            <div className="card-header">Calendario</div>
                            <div className="card-body">
                                <p className="card-text">Espacio para colocar la API del calendario.</p>
                            </div>
                        </div>

                        <div className="card text-bg-warning mb-3" style={{ width: "18rem" }}>
                            <div className="card-header">Recordatorios</div>
                            <div className="card-body">
                                <p className="card-text">Espacio para colocar los recordatorios</p>
                                <p className="card-text">Espacio para colocar los recordatorios</p>
                                <p className="card-text">Espacio para colocar los recordatorios</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
