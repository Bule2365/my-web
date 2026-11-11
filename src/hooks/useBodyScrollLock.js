import { useEffect } from 'react';

let lockCount = 0;
let previousOverflow = '';

/**
 * Mengunci scroll body dengan aman ketika beberapa dialog (drawer/lightbox)
 * mungkin terbuka di waktu yang sama. Nilai overflow sebelumnya dipulihkan
 * setelah pengunci terakhir dilepas.
 */
export default function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [locked]);
}
