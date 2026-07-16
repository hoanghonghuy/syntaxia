import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  buildHtmlCssPreviewSrcdoc,
  createHtmlCssSandboxUiState,
} from '../app/utils/htmlCssSandbox.ts'

describe('htmlCssSandbox', () => {
  it('createHtmlCssSandboxUiState uses starters', () => {
    const s = createHtmlCssSandboxUiState('<p>x</p>', '.x{color:red}')
    assert.equal(s.html, '<p>x</p>')
    assert.equal(s.css, '.x{color:red}')
    assert.equal(s.hintIndex, 0)
  })

  it('buildHtmlCssPreviewSrcdoc embeds html and css without scripts', () => {
    const doc = buildHtmlCssPreviewSrcdoc('<h1>Hi</h1>', 'h1 { color: teal; }')
    assert.match(doc, /<!DOCTYPE html>/)
    assert.match(doc, /<h1>Hi<\/h1>/)
    assert.match(doc, /h1 \{ color: teal; \}/)
    assert.doesNotMatch(doc, /<script/i)
  })
})
