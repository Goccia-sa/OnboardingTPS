// POST /api/invia → flusso 1 (invio finale della registrazione: PDF, allegati, dati).
// Body = payload completo del form. Vedi eseguiInvio() nel form.
const { app } = require('@azure/functions');
const { inoltra } = require('../proxy');

app.http('invia', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: (request, context) => inoltra(request, context, 'WEBHOOK_URL')
});
