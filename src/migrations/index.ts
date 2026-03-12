import * as migration_20260312_230157 from './20260312_230157';
import * as migration_20260312_232715 from './20260312_232715';

export const migrations = [
  {
    up: migration_20260312_230157.up,
    down: migration_20260312_230157.down,
    name: '20260312_230157',
  },
  {
    up: migration_20260312_232715.up,
    down: migration_20260312_232715.down,
    name: '20260312_232715'
  },
];
