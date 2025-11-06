const { Pinecone } = require( '@pinecone-database/pinecone')

const pc = new Pinecone({ apiKey: process.env.PINECONE_KEY });

const gptPractice=pc.Index('gpt-practice')
async function vectorStore({vector,messageId,metadata}){
   await gptPractice.upsert([{
    id:messageId,
    values:vector,
    metadata
   }])
}

async function queryVector({vector,limit,metadata}){
  const data=await gptPractice.query({
    vector,
    topK:limit,
    filter:metadata ? metadata : undefined,
    includeMetadata:true
  })
  return data.matches
}

module.exports={vectorStore,queryVector}