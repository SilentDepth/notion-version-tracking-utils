import * as cheerio from 'cheerio'

const INDEX_URL = 'https://www.notion.so/login'

export default async function getAppVersion (): Promise<{
  full: string
  app: string
  notion: string
}> {
  const html = await fetch(INDEX_URL).then(res => res.text())
  console.log(`${INDEX_URL} fetched`)

  const $ = cheerio.load(html)

  let experimental = true
  let scriptPath = $('script[src^="/_assets/app-"]').attr('src')
  if (!scriptPath) {
    experimental = true
    scriptPath = $('script[src^=/_assets/experimental/app-]').attr('src')
  }
  if (!scriptPath) {
    throw new Error('Cannot find the path to app.js')
  }
  const scriptUrl = new URL(scriptPath, INDEX_URL).href
  const scriptContent = await fetch(scriptUrl).then(res => res.text())
  console.log(`${scriptUrl} fetched`)

  const appVersion: string | undefined = scriptContent.match(/version:"([\d.]+)"/)?.[1]
  if (!appVersion) {
    throw new Error('Cannot find the app version')
  }
  console.log(`App version: ${appVersion}`)

  const [, modId, modName] = scriptContent.match(/(\d+):"(HelpButtonContent)"/) ?? []
  if (!modId) {
    throw new Error('Cannot find the module ID of HelpButtonContent')
  }
  const [, modHash] = scriptContent.match(new RegExp(`${modId}:"([0-9a-f]+)"`)) ?? []
  if (!modHash) {
    throw new Error('Cannot find the module hash of HelpButtonContent')
  }
  const modScriptUrl = new URL(`/_assets/${experimental ? 'experimental/' : ''}${modName}-${modHash}.js`, INDEX_URL).href
  const modScriptContent = await fetch(modScriptUrl).then(res => res.text())
  console.log(`${modScriptUrl} fetched`)

  const notionVersion = modScriptContent.match(/Notion (\d+\.\d+)\./)?.[1]
  if (!notionVersion) {
    throw new Error('Cannot find the notion version')
  }
  console.log(`Notion version: ${notionVersion}`)

  return {
    full: `${notionVersion}.${appVersion}`,
    app: appVersion,
    notion: notionVersion,
  }
}
