import { openDB } from 'idb';

export interface ContractData {
  address: string;
  abi: any[];
  chainId: number;
  name?: string;
  timestamp: number;
}

export interface ContractStore {
  [chainId: number]: {
    [address: string]: ContractData;
  };
}

class ContractDB {
  private dbName = 'abi-vision';
  private version = 1;

  async init() {
    return openDB(this.dbName, this.version, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('contracts')) {
          db.createObjectStore('contracts', {
            keyPath: ['chainId', 'address']
          });
        }
      },
    });
  }

  async addContract(contract: Omit<ContractData, 'timestamp'>) {
    const db = await this.init();
    return db.put('contracts', {
      ...contract,
      timestamp: Date.now(),
    });
  }

  async getContract(chainId: number, address: string) {
    const db = await this.init();
    return db.get('contracts', [chainId, address]);
  }

  async getContractsByChain(chainId: number) {
    const db = await this.init();
    const all = await db.getAll('contracts');
    return all.filter(contract => contract.chainId === chainId);
  }

  async getAllContracts(): Promise<ContractStore> {
    const db = await this.init();
    const all = await db.getAll('contracts');
    return all.reduce((acc, contract) => {
      if (!acc[contract.chainId]) {
        acc[contract.chainId] = {};
      }
      acc[contract.chainId][contract.address] = contract;
      return acc;
    }, {} as ContractStore);
  }

  async deleteContract(chainId: number, address: string) {
    const db = await this.init();
    return db.delete('contracts', [chainId, address]);
  }
}

export const contractDB = new ContractDB(); 