// POST /api/valida-token → flusso 2 (validazione del token del link personale).
// Body {token} → risposta {valido, motivo}. Vedi controllaAccesso() nel form.
const { app } = require('@azure/functions');
const { inoltra } = require('../proxy');

app.http('valida-token', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: (request, context) => inoltra(request, context, 'WEBHOOK_VALIDA_TOKEN')
});
