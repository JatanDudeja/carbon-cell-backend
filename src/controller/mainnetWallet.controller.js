import { Web3 } from "web3";

function isValidWalletAddress(walletAddress) {
  return /^(0x)?[0-9a-fA-F]{40}$/.test(walletAddress); // Check if wallet address starts with '0x' followed by 40 hexadecimal characters
}

function isValidWalletUrl(walletUrl) {
  return /^https?:\/\//.test(walletUrl); // Check if it starts with 'https://' or 'http://'
}

const getWalletBalance = async (req, res) => {
  try {
    const { walletInfuraLink, walletAddress } = req.body;

    const WALLET_URI = walletInfuraLink || process.env.WALLET_URI;
    const WALLET_ADDRESS = walletAddress || process.env.WALLET_ADDRESS;

    if (
      !isValidWalletUrl(WALLET_URI) ||
      !isValidWalletAddress(WALLET_ADDRESS)
    ) {
      return res.status(400).json({ statusCode: 400, message: "Invalid wallet URL or address" });
    }
    
    const web3 = new Web3(Web3.givenProvider || WALLET_URI);


    const balanceWei = await web3.eth.getBalance(WALLET_ADDRESS);

    const balanceEther = web3.utils.fromWei(balanceWei, "ether");

    res.status(200).json({
      statusCode: 200,
      message: "Successfully fetched your wallet balance.",
      data: {
        balanceInWei: `${balanceWei} Wei`,
        balanceInETH: `${balanceEther} ETH`,
      },
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: "Something went wrong!" });
  }
};

export { getWalletBalance };
