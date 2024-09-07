import React from 'react';
import footerImage from '../assets/Logo.png';

const Footer = () => {
    return (
        <footer
            className="py-3"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
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

                <div className="modal fade" id="faqModal" tabIndex="-1" aria-labelledby="faqModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="faqModalLabel">Preguntas Frecuentes</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <ul className="list-unstyled">
                                    <li><strong>¿Para qué sirve Comunidapp?</strong></li>
                                    <li>Comunidapp es una aplicación diseñada para mantener a la comunidad informada sobre servicios, noticias e información relevante. Además, permite a personas y pymes publicar sus servicios o negocios, y facilita el contacto directo con ellos.</li>
                                    <li><strong>¿Si publico algo, se mostrará mi número de celular?</strong></li>
                                    <li>Sí, al publicar algo en Comunidapp, tu número de celular se mostrará para que los usuarios puedan ponerse en contacto directo contigo. Esto está especificado en los términos y condiciones que aceptaste al registrarte en la aplicación. Sin embargo, tu número no se ve directamente; en su lugar, aparece un ícono que envía a los usuarios directamente a tu WhatsApp.</li>
                                    <li><strong>¿Qué hago si olvido mi contraseña?</strong></li>
                                    <li>Si olvidas tu contraseña, puedes utilizar la opción de recuperación de contraseña en la pantalla de inicio de sesión. Te enviaremos un enlace para restablecer tu contraseña a tu correo electrónico registrado.</li>
                                    <li><strong>¿Cómo puedo contactarme con Comunidapp?</strong></li>
                                    <li>Al final de la página, encontrarás una sección llamada "Comunícate con Comunidapp". Puedes enviarnos un correo electrónico desde allí y nuestro equipo se pondrá en contacto contigo lo antes posible para resolver cualquier duda o inquietud que puedas tener.</li>
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="privacyModal" tabIndex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="privacyModalLabel">Políticas de Privacidad</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h5>Política de Privacidad</h5>

                                <h6>1. Recopilación de Datos</h6>
                                <p>En Comunidapp, recopilamos tu nombre, correo electrónico, número de teléfono y otros datos opcionales para ofrecerte una experiencia personalizada.</p>

                                <h6>2. Uso de la Información</h6>
                                <p>Utilizamos tu información para:</p>
                                <ul>
                                    <li>Gestionar tu cuenta.</li>
                                    <li>Mejorar nuestros servicios.</li>
                                    <li>Comunicarnos contigo.</li>
                                    <li>Garantizar la seguridad de la plataforma.</li>
                                </ul>

                                <h6>3. Compartición de Datos</h6>
                                <p>Tu información puede ser compartida con otros usuarios de la plataforma para facilitar la interacción. No compartimos tus datos con terceros externos, salvo por motivos legales.</p>

                                <h6>4. Seguridad</h6>
                                <p>Implementamos medidas de seguridad para proteger tu información, pero ninguna transmisión de datos es completamente segura.</p>

                                <h6>5. Tus Derechos</h6>
                                <p>Puedes acceder, corregir o eliminar tu información personal en cualquier momento. Contáctanos si deseas ejercer estos derechos.</p>

                                <h6>6. Retención de Datos</h6>
                                <p>Mantendremos tus datos mientras uses nuestro servicio o según lo exijan las leyes aplicables.</p>

                                <h6>7. Cambios a la Política</h6>
                                <p>Nos reservamos el derecho a modificar esta política. Te notificaremos sobre cambios importantes publicando la nueva versión en la plataforma.</p>

                                <h6>8. Contacto</h6>
                                <p>Si tienes preguntas sobre esta política, escríbenos a <a href="mailto:comunidapp.4geek@gmail.com">comunidapp.4geek@gmail.com</a>.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-3">
                    <a href="mailto:comunidapp.4geek@gmail.com" className="text-primary">
                        Comunicate con Comunidapp
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
