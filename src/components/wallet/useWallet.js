//import { showErrorNotification } from 'src/components/notifications/Notification'
import { useEffect, useState } from 'react'
import { useMetaMask } from 'metamask-react'
import Web3 from 'web3'

export const useWallet = () => {
  const { status, connect, account } = useMetaMask()
  const [network, setNetwork] = useState()
  const [walletConnected, setWalletConnected] = useState()
  const [accounts, setAccounts] = useState()
  const getWalletData = async () => {
    if (status === 'connected') {
      setAccounts(account)
      setWalletConnected(true)
    }
  }
  useEffect(() => {
    getWalletData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const trimWalletAddress = walletAddress => {
    return `${walletAddress?.slice(0, 6)}.....${walletAddress?.slice(
      walletAddress?.length - 6,
      walletAddress?.length - 1
    )}`
  }
  const connectWallet = () => {
    if (status === 'unavailable') {
    //   showErrorNotification({
    //     message: 'Metamask Not Found',
    //     description: 'Please install Metamask'
    //   })
    }
    if (status === 'notConnected') {
      console.log(window.eth)
      connect()
      setWalletConnected(true)
    }
    if (status === 'connected') {
      setAccounts(account)
      setWalletConnected(true)
    }
  }
  const disconnectWallet = () => {
    localStorage.removeItem('v-wallet')
  }
  useEffect(() => {
    if (walletConnected && accounts) {
      const web3 = new Web3(Web3.givenProvider);
      web3.eth.net.getNetworkType().then(res => setNetwork(res))
    }
  }, [walletConnected, accounts])

 
  return {
    accounts,
    walletConnected,
    network,
    connectWallet,
    disconnectWallet,
    trimWalletAddress
  }
}