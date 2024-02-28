export async function json(req, res) {
  const buffer = []
  // Aqui ele percorre o dado e adiciona a constante buffer de forma assincrona.
  for await (const chunk of req) {
    buffer.push(chunk)
  }
  try {
    // Aqui estamos tentando transformar um arquivo json em um dado que o Javascript possa entender e colocando ele dentro do req.body
    req.body = JSON.parse(Buffer.concat(buffer).toString())
    
  } catch (error) {
    req.body = null
  }

  res.setHeader('Content-type', 'application/json') // O tipo de conteúdo que está retornando 

}