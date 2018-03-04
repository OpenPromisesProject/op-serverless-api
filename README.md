# Get Started

```
npm i -g firebase-tools
firebase login

cd functions/

https://firebase.google.com/docs/functions/local-emulator

export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"
npm start

> politicians.get()
```

# Data schema

## Promises

* id default `String`
* contributor_id `String`
* politician_id `String`
* source_date `Date`
* source_name `String`
* source_url `String`
* category `String`
* cover_image `String`
* title `String`
* quote `String`
* notes `String`
* status `String`
* live `Boolean`
* created_at `Timestamp`
* updated_at `Timestamp`

## Politician

* id default `String`
* contributor_id `String`
* profile_image `String`
* name `String`
* primary_position `String`
* brief `String`
* description `String`
* status `String`
* live `Boolean`
* created_at `Timestamp`
* updated_at `Timestamp`

## Contributor

* id default `String`
* profile_image `String`
* name `String`
* email `String`
* contact `String`
* status `String`
* live `Boolean`
* created_at `Timestamp`
* updated_at `Timestamp`