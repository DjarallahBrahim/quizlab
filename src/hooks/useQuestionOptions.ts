import { useState, useCallback } from 'react';

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 7;

export function useQuestionOptions() {
  const [options, setOptions] = useState<string[]>(['', '']);
  
  const addOption = useCallback(() => {
    if (options.length < MAX_OPTIONS) {
      setOptions(prev => [...prev, '']);
    }
  }, [options.length]);

  const removeOption = useCallback((index: number) => {
    if (options.length > MIN_OPTIONS) {
      setOptions(prev => prev.filter((_, i) => i !== index));
    }
  }, [options.length]);

  const updateOption = useCallback((index: number, value: string) => {
    setOptions(prev => prev.map((opt, i) => i === index ? value : opt));
  }, []);

  const resetOptions = useCallback(() => {
    setOptions(['', '']);
  }, []);

  return {
    options,
    canAddMore: options.length < MAX_OPTIONS,
    canRemove: options.length > MIN_OPTIONS,
    addOption,
    removeOption,
    updateOption,
    resetOptions
  };
}