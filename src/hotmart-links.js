// Destinos oficiales de Hotmart para las gestiones de compra (verificados por el titular el
// 5 de septiembre de 2026). Fuente única: los componentes y documentos legales importan estas
// constantes en lugar de repetir las URL. No contiene IDs privados, tokens ni parámetros sensibles.
export const hotmartLinks = Object.freeze({
  // Solicitud autónoma de reembolso / arrepentimiento (garantía de 7 días de cada oferta).
  refundRequestUrl: "https://refund.hotmart.com/",
  // Consulta del estado de un reembolso ya solicitado.
  refundTrackingUrl: "https://refund.hotmart.com/tracking",
  // Cuenta del comprador: cancelación de futuras renovaciones de la Suscripción Mensual.
  subscriptionManagementUrl: "https://consumer.hotmart.com/main",
  // Instrucciones oficiales de Hotmart para cancelar una suscripción.
  subscriptionCancellationHelpUrl: "https://help.hotmart.com/es/article/115002183968/como-cancelar-mi-suscripcion",
  // Soporte operativo de Hotmart para compradores.
  hotmartBuyerSupportUrl: "https://help.hotmart.com/es/contact-us?subject=bought-and-need-help",
});
