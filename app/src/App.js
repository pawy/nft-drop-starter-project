import React, { useEffect, useState } from "react";
import CandyMachine from './CandyMachine';
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";


// Constants
const TWITTER_HANDLE = "SoltoolsX";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  /*
   * Declare your function
   */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");

          /*
           * The solana object gives us a function that will allow us to connect
           * directly with the user's wallet!
           */
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );

          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("You need a Phantom Wallet to mint a SOLtools.xyz NFT 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (

    <div className="App">
      <div id="nav">
            <a href="https://soltools.xyz/">SOLtools</a>
            <a href="https://soltools.xyz/listing-sniper">Listing sniper</a>
            <a href="https://soltools.xyz/rarity-sniper">Rarity Sniper</a>

            <a href="https://twitter.com/SoltoolsX"><img class="twitter" src="https://soltools.xyz/twitter-logo.svg" alt="Twitter @SoltoolsX" /></a>
            <a href="https://discord.gg/GC8naA6tBK"><img class="discord" src="https://soltools.xyz/discord-logo.svg" alt="Discord SOLtools.xyz" /></a><br />
            <a class="button" href="https://mint.soltools.xyz">$ BUY</a>
        </div>
      <div className="container">
        <div className="header-container">
          <p className="header">SOLtools.xyz</p>
          <p className="sub-text">An access-pass NFT gives you lifetime access to the premium features of soltools.xyz</p>
          {/* Add the condition to show this only if we don't have a wallet address */}
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <center>
          <br />
          <br />
          {/* <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          ><img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} /></a> */}
          </center>
        <div className="footer-container">
          
        </div>
      </div>
    </div>
  );
};

export default App;
