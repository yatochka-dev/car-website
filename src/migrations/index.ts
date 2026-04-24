import * as migration_20260312_232927 from './20260312_232927';
import * as migration_20260319_153330 from './20260319_153330';
import * as migration_20260418_191512 from './20260418_191512';
import * as migration_20260418_202848_fleet_homepage_visibility from './20260418_202848_fleet_homepage_visibility';
import * as migration_20260424_145833_contact_email_notifications from './20260424_145833_contact_email_notifications';

export const migrations = [
  {
    up: migration_20260312_232927.up,
    down: migration_20260312_232927.down,
    name: '20260312_232927',
  },
  {
    up: migration_20260319_153330.up,
    down: migration_20260319_153330.down,
    name: '20260319_153330',
  },
  {
    up: migration_20260418_191512.up,
    down: migration_20260418_191512.down,
    name: '20260418_191512',
  },
  {
    up: migration_20260418_202848_fleet_homepage_visibility.up,
    down: migration_20260418_202848_fleet_homepage_visibility.down,
    name: '20260418_202848_fleet_homepage_visibility',
  },
  {
    up: migration_20260424_145833_contact_email_notifications.up,
    down: migration_20260424_145833_contact_email_notifications.down,
    name: '20260424_145833_contact_email_notifications'
  },
];
