const metamasknets = {
  1: {
    chainId: '0x01',
    chainName: 'Mainnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://mainnet.infura.io/v3/c1ba29d27c6b40779d9a00a8850d4f9e'],
    blockExplorerUrls: ['https://etherscan.io']
  },
  3: {
    chainId: '0x03',
    chainName: 'Ropsten Test Network',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://ropsten.infura.io/v3/'],
    blockExplorerUrls: ['https://ropsten.etherscan.io']
  },
  4: {
    chainId: '0x04',
    chainName: 'Rinkeby Test Network',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://rinkeby.infura.io/v3/'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
  },
  56: {
    chainId: '0x38',
    chainName: 'Bianance Smart Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],

  },
  97: {
    chainId: '0x61',
    chainName: 'BSC Test Network',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],

  },
  137: {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
    
  },
  80001: {
    chainId: '0x5001',
    chainName: 'Mumbai Test Network',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    
  },
  250: {
    chainId: '0xfa',
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18
    },
    rpcUrls: ['https://rpcapi.fantom.network'],
    blockExplorerUrls: ['https://ftmscan.com/'],
  },
  4002: {
    chainId: '0xfa2',
    chainName: 'Fantom Testnet',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18
    },
    rpcUrls: ['https://rpc.testnet.fantom.network'],
    blockExplorerUrls: ['https://testnet.ftmscan.com/'],
  },
  43114: {
    chainId: '0xa86a',
    chainName: 'Avalanche Mainnet',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io']
  }
}

export default metamasknets