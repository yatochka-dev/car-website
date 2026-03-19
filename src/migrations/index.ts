import * as migration_20260312_232927 from './20260312_232927';
import * as migration_20260319_153330 from './20260319_153330';

export const migrations = [
  {
    up: migration_20260312_232927.up,
    down: migration_20260312_232927.down,
    name: '20260312_232927',
  },
  {
    up: migration_20260319_153330.up,
    down: migration_20260319_153330.down,
    name: '20260319_153330'
  },
];
