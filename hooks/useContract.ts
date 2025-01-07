import { useCallback, useEffect, useState } from 'react';
import { ContractData, contractDB } from '@/lib/db';

export function useContract(chainId: number, address: string) {
  const [contract, setContract] = useState<ContractData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadContract = useCallback(async () => {
    setLoading(true);
    try {
      const data = await contractDB.getContract(chainId, address);
      setContract(data);
    } catch (error) {
      console.error('Failed to load contract:', error);
      setContract(null);
    } finally {
      setLoading(false);
    }
  }, [chainId, address]);

  useEffect(() => {
    loadContract();
  }, [loadContract]);

  return {
    contract,
    loading,
    refresh: loadContract
  };
} 