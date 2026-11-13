# Native build and device validation

## What this validation proves

The existing CI export (`npx expo export --platform all`) verifies that the
JavaScript/TypeScript application can be bundled. It does **not** compile an
Android application, compile an iOS application, install either application,
or exercise native modules such as SQLite on a device.

The `Native build validation` workflow adds two independent compile checks:

- Android: generate the native project and compile an unsigned debug APK.
- iOS: generate the native project, install pods, and compile an unsigned
  simulator application with code signing disabled.

These checks do not sign, deploy, publish, release, or install an application.
They also do not replace the device tests below.

## Current readiness assessment

- Expo native project generation succeeds for Android and iOS.
- The generated iOS project targets iOS 16.4 or later.
- The generated application identifiers are provisional
  (`com.anonymous.neuropilot`). Approved production identifiers are required
  before signing or release work.
- JavaScript export passed in the existing CI, but native compilation was not
  previously tested.
- SQLite is on the runtime-critical path. Compilation cannot prove database
  initialization, persistence, likes, completion flags, or deletion behavior.
- The product documentation claims local encryption, but this validation does
  not establish encryption at rest. Treat that claim as unverified until the
  database implementation and an installed build are inspected.

### Local tooling snapshot (November 11, 2026)

The available Mac has Apple Command Line Tools but not full Xcode. It also has
no detectable Java runtime, Android SDK/ADB, or CocoaPods command. Native
compilation and device installation therefore cannot be run locally on this
machine without an explicitly approved tooling setup. The hosted CI workflow
is intended to establish compilation independently; device behavior remains a
manual acceptance gate.

## Device smoke-test record

Run this checklist on both an iPhone and an Android phone using a reviewed
development build from the commit that passed native-build CI. Use synthetic
test entries only. Do not enter personal health information, credentials, or
other sensitive data, and do not attach screenshots containing user data to a
public issue or pull request.

Record before testing:

- Commit SHA:
- Build source and date:
- Device model:
- OS version:
- Tester:
- Network state: start in airplane mode

### 1. Launch and offline database initialization

1. Remove any previous NeuroPilot development build and install the reviewed
   build.
2. Enable airplane mode and launch the app.
3. Open Home, Feed, Morning, Day, Evening, and Settings.
4. Confirm there is no crash, blank screen, database error, or network
   requirement.

Pass: every listed screen opens offline and the app remains responsive.

### 2. Morning and evening completion persistence

1. In Morning, tap **Mark as Done** once.
2. In Evening, tap **Mark as Done** once.
3. Force-close the app, relaunch it, and return to both screens.
4. Restart the device, relaunch the app, and check again.

Pass: completion is visibly retained after both relaunch and device restart.

If the UI does not display completion state, record this test as **Blocked**,
not Passed. Database writes without user-visible confirmation are insufficient
acceptance evidence.

### 3. Like persistence and duplicate prevention

1. In Feed, like one identifiable card and record its title.
2. Force-close and relaunch the app.
3. Confirm the same card still shows **Liked**.
4. Tap the liked control again and confirm there is no duplicate state,
   unexpected toggle, or crash.

Pass: the like survives relaunch and repeated interaction is safe.

### 4. Local data deletion

1. Create the completion and like test data above.
2. In Settings, choose **Delete account data** and first select **Cancel**.
3. Confirm the existing test state remains.
4. Repeat, select **Delete**, force-close, and relaunch the app.
5. Confirm the liked card and all completion state are gone while the app can
   create fresh data normally.

Pass: cancel preserves data; delete removes all locally stored user state; no
data reappears after relaunch.

### 5. Platform sanity checks

On each platform, also verify:

- Back navigation and tab navigation do not lose or duplicate state.
- Rotating/backgrounding/foregrounding does not crash the app.
- The OS permission flow does not request permissions unrelated to an action.
- No test content appears on another device or account unexpectedly.

## Release gate

Native compilation passing means the generated projects compile. Release
readiness additionally requires both device checklists to pass, approved
application identifiers and signing configuration, privacy/encryption claims
to match the implementation, and explicit human review. No unattended merge,
deployment, store submission, or release is authorized by this workflow.
