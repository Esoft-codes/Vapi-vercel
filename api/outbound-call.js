export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { toolCallId, args } = req.body; 
  const { toNumber, fromNumber } = args; 

  if (!toNumber || !fromNumber) {
    return res.status(400).json({ 
      results: [{ 
        toolCallId: toolCallId,
        error: 'Missing required fields: toNumber or fromNumber' 
      }]
    });
  }

  try {
    const vapiTransferResponse = {
      results: [
        {
          toolCallId: toolCallId,
          functionCall: {
            name: "transferCall",
            parameters: {
              destination: {
                type: "number",
                number: toNumber,       
                caller_id: fromNumber,  
                message: "Please hold while I connect you to the team." 
              }
            }
          }
        }
      ]
    };

    console.log('Returning Vapi transfer instruction:', JSON.stringify(vapiTransferResponse, null, 2));
    res.status(200).json(vapiTransferResponse);

  } catch (error) {
console.error('Error in Vercel custom outbound-call function:', error.message);
    res.status(500).json({ 
        results: [{ 
            toolCallId: toolCallId,
            error: Failed to prepare transfer instruction: ${error.message} 
        }]
    });
  }
}
