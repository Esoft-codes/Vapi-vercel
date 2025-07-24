export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const { to } = req.query;

  if (!to) {
    res.status(400).send('Missing "to" number');
    return;
  }

  const xml = '<?xml version="1.0" encoding="UTF-8"?><Response><Dial timeout="20">' + to + '</Dial></Response>';

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(xml);
}
