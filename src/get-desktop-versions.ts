import YAML from 'yaml'

const VARIANTS = {
  windows: 'latest',
  macos: 'arm64-mac',
} as const

export default async function getDesktopVersions (): Promise<Record<keyof typeof VARIANTS, string>> {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(VARIANTS).map(([variant, channel]) => {
        return fetch(`https://desktop-release.notion-static.com/${channel}.yml?noCache`)
          .then(res => res.text())
          .then(doc => [variant, YAML.parse(doc).version])
      })
    )
  )
}
