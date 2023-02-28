export const parseSort = (sort: string) =>
  sort
    .split(',')
    .map((el) =>
      el.startsWith('-')
        ? {column: el.slice(1, el.length), order: 'desc', nulls: 'last'}
        : {column: el, order: 'asc', nulls: 'last'},
    );
