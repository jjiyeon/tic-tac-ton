/** @format */

import {
  Contract,
  ContractProvider,
  Sender,
  Address,
  Cell,
  contractAddress,
  beginCell,
  DictionaryValue,
  Slice,
  Dictionary,
  SendMode,
} from 'ton-core';

const DEFAULT_VALUE = '0.01';
const VALUE_FOR_SEND = '0.003';

export type Result = {
  address: Address;
  win: number;
  lose: number;
  tie: number;
};

export type Config = {
  owner: Address;
  period: number;
  results: Result[];
};

const ResultsValue: DictionaryValue<Result> = {
  serialize: (src: Result, builder: any) => {
    builder
      .storeAddress(src.address)
      .storeUint(src.win, 16)
      .storeUint(src.lose, 16)
      .storeUint(src.tie, 16);
  },
  parse: (src: Slice) => {
    return {
      address: src.loadAddress(),
      win: src.loadUint(16),
      lose: src.loadUint(16),
      tie: src.loadUint(16),
    };
  },
};

export function configToCell(config: Config): Cell {
  const results = Dictionary.empty(Dictionary.Keys.Uint(32), ResultsValue);

  for (let i = 0; i < config.results.length; i++) {
    results.set(i, config.results[i]);
  }

  return beginCell()
    .storeAddress(config.owner)
    .storeUint(config.period, 64)
    .storeDict(results)
    .endCell();
}

export function decodeConfig(cell: Cell): Config {
  let slice = cell.beginParse();

  return {
    owner: slice.loadAddress(),
    period: slice.loadUint(64),
    results: slice.loadDict(Dictionary.Keys.Uint(32), ResultsValue).values(),
  };
}

export default class Game implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createForDeploy(code: Cell, initialCounterValue: Config): Game {
    const data = configToCell(initialCounterValue);
    const workchain = 0;
    const address = contractAddress(workchain, { code, data });
    return new Game(address, { code, data });
  }

  async sendDeploy(provider: ContractProvider, via: Sender) {
    await provider.internal(via, {
      value: DEFAULT_VALUE,
      bounce: false,
    });
  }

  async getOwner(provider: ContractProvider) {
    return (await provider.get('get_owner', [])).stack.readAddress();
  }

  async getPeriod(provider: ContractProvider) {
    return (await provider.get('get_period', [])).stack.readBigNumber();
  }

  async getConfig(provider: ContractProvider) {
    const configCell = (await provider.get('get_config', [])).stack.readCell();
    return decodeConfig(configCell);
  }

  async sendUpdatePeriod(
    provider: ContractProvider,
    via: Sender,
    period: number
  ) {
    await provider.internal(via, {
      value: VALUE_FOR_SEND,
      sendMode: SendMode.PAY_GAS_SEPARATLY,
      body: beginCell()
        .storeUint(0xb8bdba35, 32)
        .storeUint(period, 64)
        .endCell(),
    });
  }

  async sendUpdateResult(
    provider: ContractProvider,
    via: Sender,
    results: Cell
  ) {
    await provider.internal(via, {
      value: VALUE_FOR_SEND,
      sendMode: SendMode.PAY_GAS_SEPARATLY,
      body: beginCell().storeUint(0xb5b1ca24, 32).storeRef(results).endCell(),
    });
  }

  async sendPrize(
    provider: ContractProvider,
    via: Sender,
    addresses: Address[]
  ) {
    const storeAddresses = beginCell()
      .storeAddress(addresses[0])
      .storeAddress(addresses[1])
      .storeAddress(addresses[2]);

    await provider.internal(via, {
      value: VALUE_FOR_SEND,
      sendMode: SendMode.PAY_GAS_SEPARATLY,
      body: beginCell()
        .storeUint(0x5efd1590, 32)
        .storeRef(storeAddresses)
        .storeUint(Date.now(), 64)
        .endCell(),
    });
  }
}
