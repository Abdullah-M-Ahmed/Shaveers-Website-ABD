import { readWaitlist, waitlistCsv } from '../server/waitlist-records.js';

process.stdout.write(waitlistCsv(await readWaitlist()));
