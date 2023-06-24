import fs from 'fs-extra'
import * as glob from 'glob'
import swc from '@swc/core'
import { normalizeFilePath } from './shared.js'
import path from 'path'

const pathDictionary = {
    '@lg-client': 'client',
    '@lg-server': 'server',
    '@lg-shared': 'shared',
    '@nativeui': 'client/includes/nativeui/NativeUI',
}

const SWC_CONFIG = {
    jsc: {
        parser: {
            syntax: 'typescript',
            dynamicImport: true,
            decorators: true,
        },
        transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
        },
        target: 'es2020',
    },
    sourceMaps: false,
}

const startTime = Date.now()
const filesToCompile = glob.sync('./src/core/**/*.ts')

if (fs.existsSync('resources/core')) {
    fs.rmSync('resources/core', { force: true, recursive: true })
}

let compileCount = 0

for (let i = 0; i < filesToCompile.length; i++) {
    const filePath = normalizeFilePath(filesToCompile[i])

    const finalPath = filePath.replace('src/', 'resources/').replace('.ts', '.js')

    const compiled = swc.transformFileSync(filePath, SWC_CONFIG)

    if (compiled.code.includes(`@lg-`) || compiled.code.includes(`@nativeui`)) {
        compiled.code = resolvePaths(filePath, compiled.code)
    }

    fs.outputFileSync(finalPath, compiled.code, { encoding: 'utf-8' })

    compileCount += 1
}

function resolvePaths(file, rawCode) {
    const cleanedPath = file.replace(process.cwd().replace(/\\/g, path.sep), '')
    const pathSplit = cleanedPath.split('/')
    let depth = 0

    pathSplit.pop()

    while (pathSplit[pathSplit.length - 1] !== 'core') {
        pathSplit.pop()
        depth += 1
    }

    for (let key in pathDictionary) {
        rawCode = rawCode.replaceAll(key, `../`.repeat(depth) + pathDictionary[key])
    }

    return rawCode
}

console.log(`${compileCount} Files Built | ${Date.now() - startTime}ms`)
