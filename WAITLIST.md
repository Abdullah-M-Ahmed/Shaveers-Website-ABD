# Shaveers launch waitlist

Vercel routes the homepage to `public/launch.html` and temporarily redirects old
product and checkout URLs to the homepage. The storefront source and build entry
are still in the repository. To restore the storefront, remove the launch redirects
and homepage rewrite from `vercel.json` or roll back to the storefront deployment.

The form sends the number and current explicit consent to `POST /api/waitlist`.
The function saves one private JSON record per normalized phone number. Each record
contains the latest consent time, legal version, source, and contact channel.
The phone number is never part of the blob name. Keep the server-only
`WAITLIST_RECORD_KEY` stable so repeat signups map to the same record. The Vercel
project also needs the connected private store's `BLOB_READ_WRITE_TOKEN`.

Authorized team members can view records in Vercel Storage under
`shaveers-launch-waitlist` → `registrations/`. To export, run
`node scripts/export-waitlist.mjs > registrations.csv` locally with the store's
token set in your environment. The CSV prefixes numbers with an apostrophe to
preserve the leading plus and prevent spreadsheet formula interpretation.
Treat the CSV as private customer data. To handle a verified removal request,
locate the record by phone number in the export or dashboard, then delete the
matching private blob. The phone numbers are collected without ownership
verification, and launch messages are sent separately.
