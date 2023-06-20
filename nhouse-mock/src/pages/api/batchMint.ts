import Web3 from "web3"
import contract from "@/contracts/NhouseNFT.json"
import { NextApiRequest, NextApiResponse } from "next"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://evm.astar.network"
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY || "0x872449c44937f6Ac266cbBCDCb189B25AcEBb9E9"
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY || ""
const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x6Cc552e296dBfedE18DE507d19c067EaC4037c7b"

const handleMint = async (web3: any, metadata: string) => {
  const nftContract = new web3.eth.Contract((contract as any).abi, CONTRACT_ADDRESS)
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest")
  const data = await nftContract.methods.mintNFT(PUBLIC_KEY, metadata).encodeABI()
  const tx = {
    gas: 500000,
    to: CONTRACT_ADDRESS,
    nonce: nonce,
    data: data,
    from: PUBLIC_KEY,
  }
  const resp = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY, async (err: any, signedTx: any) => {
    if (err) {
      console.log(err)

      return
    }
    console.log("SIGNING", signedTx)
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction as string, (err: any, resp: any) => {
      if (err) {
        console.log(err)
        return
      }
      console.log("RESERVING", resp)
    })
  })
  return { status: 200, hash: resp.transactionHash }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dates } = req.body
  const web3 = new Web3(API_URL)

  // await dates.map(async (date: string) => {
  //   setTimeout(async () => {
  //     const metadata = JSON.stringify({
  //       name: "Nhouse NFT",
  //       description: "An NFT from Nhouse",
  //       image: "https://art.pixilart.com/82d984fcd46cafb.gif",
  //       propertyName: "Nhouse Blue",
  //       reservedDate: date,
  //     })

  //     const resp = await handleMint(web3, metadata)
  //     console.log(resp)
  //   }, 500)
  // })
  const delay = (ms: any) => new Promise((res) => setTimeout(res, ms))

  async function processDates(dates: any) {
    for (let date of dates) {
      const metadata = JSON.stringify({
        name: "Nhouse NFT",
        description: "An NFT from Nhouse",
        image: "https://art.pixilart.com/82d984fcd46cafb.gif",
        propertyName: "Nhouse Blue",
        reservedDate: date,
      })

      const resp = await handleMint(web3, metadata)
      console.log(resp)

      await delay(500)
    }
    return true
  }

  const resp = await processDates(dates)

  if (resp) res.status(200).json({ status: "ok" })
}
