
export default function handler(req, res) {
  const toDial = req.query.to || '+61406897248'; // Fallback number

  const twiml = `
    <Response>
      <Say voice="alice">Please hold while we connect your call.</Say>
      <Dial>${toDial}</Dial>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml);
}
