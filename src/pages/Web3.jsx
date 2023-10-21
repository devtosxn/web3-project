import React, { useState, useEffect } from "react";
import { Button, Center, Text, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // If you're using React Router.

const Web3Page = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [deposits, setDeposits] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      window.location.href = "https://metamask.io/";
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  // Check if Metamask is installed
  const isMetamaskInstalled = async () => {
    if (window.ethereum) {
      // Metamask is installed
      return true;
    } else {
      // Metamask is not installed
      return false;
    }
  };

  // Function to connect Metamask wallet
  const connectMetamask = async () => {
    if (await isMetamaskInstalled()) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnected(true);
      } catch (error) {
        console.error("Error connecting Metamask:", error);
      }
    } else {
      // Redirect to the page where they can install Metamask
      window.location.href = "https://metamask.io/";
    }
  };

  useEffect(() => {
    // Fetch deposit data from a contract via websockets and update 'deposits'.
    // For now, we are using dummy data.
    const dummyDeposits = [
      {
        fromAddress: "0xAddress1",
        timestamp: "Timestamp1",
        amount: "0.005ETH",
      },
      {
        fromAddress: "0xAddress2",
        timestamp: "Timestamp2",
        amount: "0.007ETH",
      },
    ];
    setDeposits(dummyDeposits);

    // Fetch address and balance (assuming it's in ether)
    if (window.ethereum) {
      const accounts = window.ethereum.selectedAddress;
      setAddress(accounts);
      window.ethereum
        .request({ method: "eth_getBalance", params: [accounts, "latest"] })
        .then((balance) => {
          setBalance(parseFloat(balance) / 1e18); // Convert wei to ether.
        });
    }
  }, []);

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  return (
    <div>
      <Link to="/">Go Home</Link>
      <Center>
        <Button onClick={connectWallet}>
          {walletAddress && walletAddress.length > 0
            ? `Connected: ${walletAddress.substring(
                0,
                6
              )}...${walletAddress.substring(38)}`
            : "Connect Wallet"}
        </Button>
      </Center>
      {connected ? (
        <Center>
          <Flex flexDirection="column">
            <Text>Address: {address}</Text>
            <Text>Balance: {balance} ETH</Text>
          </Flex>
        </Center>
      ) : null}
      <Center>
        <Flex flexWrap="wrap" maxW="650px" gap={2}>
          {deposits.map((deposit, index) => (
            <Flex
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              m={2}
              gap={3}
              width="100%"
              boxShadow="md"
            >
              <Text fontWeight="bold">From Address:</Text>
              <Text>{deposit.fromAddress}</Text>
              <Text fontWeight="bold">Timestamp:</Text>
              <Text>{deposit.timestamp}</Text>
              <Text fontWeight="bold">Amount:</Text>
              <Text>{deposit.amount}</Text>
            </Flex>
          ))}
        </Flex>
      </Center>
    </div>
  );
};

export default Web3Page;
