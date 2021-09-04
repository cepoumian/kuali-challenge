import { useState, useCallback } from 'react';

export default function usePage(perPage) {
  const [page, setPage] = useState(1);

  const getPage = useCallback(
    function (next) {
      switch (next) {
        case 0:
          setPage(1);
          break;
        case perPage:
          setPage(2);
          break;
        case perPage * 2:
          setPage(3);
          break;
        case perPage * 3:
          setPage(4);
          break;
        case perPage * 4:
          setPage(5);
          break;
        default:
          setPage(1);
      }
    },
    [perPage]
  );

  return { getPage, page };
}
