import { useState, useEffect } from 'react';
import { stallAPI } from '@/lib/api';

export interface Stall {
  _id: string;
  owner_id: string;
  stall_name: string;
  stall_location: string;
  discount?: number;
  offer?: string;
  rating: number;
  reviewCount: number;
  image: string;
  isOpen: boolean;
  items: string[];
  createdAt: string;
  updatedAt: string;
}

export function useStalls(search?: string, sortBy?: string) {
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStalls = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response: any = await stallAPI.getAllStalls(search, sortBy);
        setStalls(response.data || []);
      } catch (err: any) {
        setError(err.message);
        setStalls([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(fetchStalls, 300);
    return () => clearTimeout(timer);
  }, [search, sortBy]);

  return { stalls, isLoading, error };
}

export function useStallById(stallId: string | null) {
  const [stall, setStall] = useState<Stall | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stallId) {
      setIsLoading(false);
      return;
    }

    const fetchStall = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response: any = await stallAPI.getStallById(stallId);
        setStall(response.data);
      } catch (err: any) {
        setError(err.message);
        setStall(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStall();
  }, [stallId]);

  return { stall, isLoading, error };
}

export function useMyStall() {
  const [stall, setStall] = useState<Stall | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyStall = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response: any = await stallAPI.getMyStall();
        setStall(response.data);
      } catch (err: any) {
        setError(err.message);
        setStall(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyStall();
  }, []);

  const refresh = async () => {
    try {
      const response: any = await stallAPI.getMyStall();
      setStall(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { stall, isLoading, error, refresh };
}

