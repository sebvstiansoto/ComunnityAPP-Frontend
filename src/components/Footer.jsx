import React from 'react';
import footerImage from '../assets/Logo.png'; // Ajusta la ruta según sea necesario

const Footer = () => {
    return (
        <footer className="py-3 bg-light">
            <div className="container">
                <div className="d-flex justify-content-center mb-3">
                    <img src={footerImage} alt="Footer Logo" className="img-fluid" style={{ maxWidth: '200px' }} />
                </div>
                <div className="text-center mb-3">
                    <a
                        href="#"
                        className="text-primary me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#faqModal"
                    >
                        Preguntas Frecuentes
                    </a>
                    <a
                        href="#"
                        className="text-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#privacyModal"
                    >
                        Políticas de Privacidad
                    </a>
                </div>

                {/* Modal Preguntas Frecuentes */}
                <div className="modal fade" id="faqModal" tabIndex="-1" aria-labelledby="faqModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="faqModalLabel">Preguntas Frecuentes</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <ul className="list-unstyled">
                                    <li><strong>¿Pregunta Frecuente 1?</strong></li>
                                    <li>Respuesta a la primera pregunta frecuente.</li>
                                    <li><strong>¿Pregunta Frecuente 2?</strong></li>
                                    <li>Respuesta a la segunda pregunta frecuente.</li>
                                    {/* Agrega más preguntas y respuestas aquí */}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Políticas de Privacidad */}
                <div className="modal fade" id="privacyModal" tabIndex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="privacyModalLabel">Políticas de Privacidad</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Aquí va el texto de las políticas de privacidad. Puedes incluir toda la información legal necesaria.</p>
                                {/* Agrega más contenido sobre políticas de privacidad aquí */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enlace de contacto */}
                <div className="text-center mt-3">
                    <a href="mailto:comunidapp@gmail.com" className="text-primary">
                        Comunicate con Comunidapp
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
