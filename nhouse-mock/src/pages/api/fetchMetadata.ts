import { NextRequest, NextResponse } from "next/server"

const handler = async (req: NextRequest, res: NextResponse) => {
  const provider = new Web3(new Web3.providers.HttpProvider(RPC))
  const Contract = new provider.eth.Contract(contract.abi, contractAddress, { from: PUBLIC_KEY })
  await Contract.methods.getTokenUriFromAddress(req.body.address).call((err, tokenUris) => {
    if (err) {
      console.log("An error occured", err)
      res.status(500).send("An error occured")
      return
    }
    tokenUris = tokenUris.map((uri) => JSON.parse(uri))
    console.log(tokenUris)
    res.status(200).send(tokenUris)
  })
}
