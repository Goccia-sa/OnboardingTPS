// Inoltro condiviso verso un flusso Power Automate.
// Il body del client viene rigirato così com'è; status e JSON di risposta
// vengono ripropagati identici, così il form non cambia comportamento.
// L'URL+firma del flusso vive solo nell'application setting (envVar): mai nel client.

const MAX_BODY_BYTES = 30 * 1024 * 1024; // 30 MB, coerente col limite del form

async function inoltra(request, context, envVar) {
  const upstream = process.env[envVar];
  if (!upstream) {
    context.error(`Application setting mancante: ${envVar}`);
    return json(500, { errore: 'Configurazione del server incompleta.' });
  }

  // Legge il body grezzo e blocca i payload abnormi
  const body = await request.text();
  if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
    return json(413, { errore: 'Payload troppo grande.' });
  }

  let res;
  try {
    res = await fetch(upstream, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
  } catch (e) {
    context.error(`Errore di rete verso ${envVar}: ${e.message}`);
    return json(502, { errore: 'Servizio temporaneamente non disponibile.' });
  }

  // Ripropaga status e corpo identici (il form si aspetta gli stessi JSON)
  const text = await res.text();
  return {
    status: res.status,
    body: text,
    headers: { 'Content-Type': 'application/json' }
  };
}

function json(status, obj) {
  return { status, jsonBody: obj };
}

module.exports = { inoltra };
