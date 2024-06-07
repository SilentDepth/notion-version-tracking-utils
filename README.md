# Notion Version Tracking Utils

## Usage

I use [Bun](https://bun.sh) as the package manager and the test runner for this project. However, the core module is runtime-agnostic. You can run it in whatever environment you want as long as it supports Fetch API (`fetch`).

```ts
import getAppVersion from './src/get-app-version'
import { diffVersions } from './src/utils/diff-versions'

const { full: latestVersion } = await getAppVersion()
// E.g. 2.12.23.0.15.259
const prevVersion = await readYourData()
// E.g. 2.12.23.0.16.0

const [same, aDiff, bDiff] = diffVersions(prevVersion, latestVersion)
console.log(`New version: ${same}[${bDiff}]`)
// New version: 2.12.23.0.[16.0]
```
