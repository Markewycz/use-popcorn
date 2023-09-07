import { useEffect } from 'react';

type Action = () => void;

export function useKey(key: string, action: Action) {
  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener('keydown', callback);

      return function () {
        document.removeEventListener('keydown', callback);
      };
    },
    [key, action]
  );
}
