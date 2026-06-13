// POST /api/genera-token → flusso 3 (verifica password staff + generazione token/invio link).
// Doppio uso: {password, soloVerifica:true} → {ok}; {nome,cognome,email,canale,password} → {token}.
// 401 se password errata. Vedi verificaPasswordServer() e generaToken() nel form.
const { app } = require('@azure/functions');
const { inoltra } = require('../proxy');

app.http('genera-token', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: (request, context) => inoltra(request, context, 'WEBHOOK_GENERA_TOKEN')
});
