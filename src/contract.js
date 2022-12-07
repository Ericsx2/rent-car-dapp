import web3 from './web3';

const address = '0xfa2C38790eFd13E8Ff16af2137130C22d5E19E48';

const abi = [
  {
    inputs: [],
    name: 'finishRent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_days',
        type: 'uint256',
      },
    ],
    name: 'renoveRent',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_days',
        type: 'uint256',
      },
    ],
    name: 'rentCar',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_model',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_brand',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_pricePerDay',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_year',
        type: 'uint256',
      },
    ],
    name: 'setCar',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'available',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'car',
    outputs: [
      {
        internalType: 'string',
        name: 'model',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'brand',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'year',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'endDate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCarInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'model',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'brand',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'year',
            type: 'uint256',
          },
        ],
        internalType: 'struct Car',
        name: '_car',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPricePerDay',
    outputs: [
      {
        internalType: 'uint256',
        name: '_pricePerDay',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_days',
        type: 'uint256',
      },
    ],
    name: 'getRentPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pricePerDay',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renter',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'showCar',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'model',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'brand',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'year',
            type: 'uint256',
          },
        ],
        internalType: 'struct Car',
        name: '_car',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startDate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'timeRemaining',
    outputs: [
      {
        internalType: 'uint256',
        name: '_time',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export default new web3.eth.Contract(abi, address);
