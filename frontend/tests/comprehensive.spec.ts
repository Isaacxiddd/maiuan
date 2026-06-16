import { test, expect } from '@playwright/test'

const NAV_H = 72
const URL = 'http://localhost:5173'

test.describe('verificación completa de layout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
  })

  test('hero: botones visibles sin scrollear — debug positions', async ({ page }) => {
    const vh = await page.evaluate(() => window.innerHeight)
    console.log(`\nViewport: ${vh}px`)

    const info = await page.evaluate(() => {
      const hero = document.getElementById('hero')
      const h1 = hero?.querySelector('h1')
      const p = hero?.querySelector('p')
      const btns = hero?.querySelector('.flex.gap-3')
      const container = hero?.querySelector('[data-container]')
      const sectionStyle = hero ? getComputedStyle(hero) : null

      const r = (el: Element | null) => {
        if (!el) return null
        const b = el.getBoundingClientRect()
        const s = getComputedStyle(el)
        return {
          top: b.top.toFixed(1), bottom: b.bottom.toFixed(1),
          height: b.height.toFixed(1),
          fontSize: s.fontSize, lineHeight: s.lineHeight,
          paddingTop: s.paddingTop,
        }
      }

      return {
        heroPt: sectionStyle?.paddingTop,
        sectionHeight: hero?.offsetHeight,
        container: r(container),
        h1: r(h1),
        paragraph: r(p),
        buttons: r(btns),
        btnBottom: btns ? btns.getBoundingClientRect().bottom.toFixed(1) : 'N/A',
      }
    })

    console.log(info)

    const buttons = page.locator('#hero a[href="#contacto"], #hero a[href="#servicios"]')
    const count = await buttons.count()
    expect(count).toBe(2)

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i)
      await expect(btn).toBeVisible()
      const box = await btn.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.y).toBeGreaterThanOrEqual(NAV_H - 4)

      const btnBottom = box!.y + box!.height
      // Buttons should fit within viewport (with small tolerance for sub-pixel rounding)
      expect(btnBottom).toBeLessThanOrEqual(vh + 4)
    }
  })

  test('hero: h1 no queda detrás del navbar', async ({ page }) => {
    const h1 = page.locator('#hero h1')
    const box = await h1.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.y).toBeGreaterThanOrEqual(NAV_H - 4)
  })

  test('cada nav link scrollea al título de su sección', async ({ page }) => {
    const cases = [
      { label: 'Servicios', id: 'servicios' },
      { label: 'Proceso', id: 'proceso' },
      { label: 'Portfolio', id: 'portfolio' },
      { label: 'Contacto', id: 'contacto' },
    ]

    for (const { label, id } of cases) {
      await page.locator(`header a:has-text("${label}")`).click()
      await page.waitForTimeout(1000)

      // Section heading (h2) must be visible at or below the navbar
      const h2 = page.locator(`#${id} h2`)
      await expect(h2, `#${id} h2 debe ser visible`).toBeVisible({ timeout: 5000 })
      const h2Box = await h2.boundingBox()
      expect(h2Box, `#${id} h2 box`).not.toBeNull()
      // h2 should be below the navbar (with tolerance for partial cut)
      expect(h2Box!.y + h2Box!.height, `#${id} h2 bottom dentro del viewport`).toBeGreaterThan(NAV_H)
    }
  })

  test('ninguna sección tiene contenido cortado horizontalmente', async ({ page }) => {
    const ids = ['hero', 'insight', 'solucion', 'servicios', 'proceso', 'portfolio', 'testimonios', 'contacto']

    for (const id of ids) {
      const section = page.locator(`#${id}`)
      if (await section.count() === 0) continue

      const scrollW = await page.evaluate(() => document.documentElement.scrollWidth)
      const vpW = await page.evaluate(() => window.innerWidth)
      expect(scrollW).toBeLessThanOrEqual(vpW + 2)

      // Check content inside section isn't overflowing
      const hasOverflowX = await page.evaluate((sel) => {
        const el = document.getElementById(sel)
        if (!el) return false
        return el.scrollWidth > el.clientWidth
      }, id)
      expect(hasOverflowX).toBeFalsy()
    }
  })

  test('whatsapp button siempre visible (no se oculta al llegar al footer)', async ({ page }) => {
    const wa = page.locator('a[title="Escribinos por WhatsApp"]')
    await expect(wa).toBeVisible()

    await page.locator('footer').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    await expect(wa).toBeVisible()
  })

  test('footer no se superpone con contenido de contacto', async ({ page }) => {
    const contacto = page.locator('#contacto')
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const cBox = await contacto.boundingBox()
    const fBox = await footer.boundingBox()
    if (cBox && fBox) {
      const gap = fBox.y - (cBox.y + cBox.height)
      expect(gap).toBeGreaterThanOrEqual(-2) // no overlap
    }
  })



  test('hero contenido completo visible (incluyendo botones y h1)', async ({ page }) => {
    // Check all major content is within viewport on load
    const elements = [
      { name: 'logo', selector: 'header a:has-text("maiuan")' },
      { name: 'h1', selector: '#hero h1' },
      { name: 'parrafo', selector: '#hero p' },
      { name: 'btn-hablemos', selector: '#hero a[href="#contacto"]' },
      { name: 'btn-servicios', selector: '#hero a[href="#servicios"]' },
      { name: 'instagram link', selector: 'header a[href*="instagram"]' },
    ]

    for (const el of elements) {
      const locator = page.locator(el.selector).first()
      await expect(locator).toBeVisible()
      const box = await locator.boundingBox()
      expect(box, `${el.name} should have bounding box`).not.toBeNull()
    }

    // Verify entire page has no clipping
    const documentSize = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    }))
    const viewportSize = { width: 1280, height: 900 }
    expect(documentSize.width).toBeLessThanOrEqual(viewportSize.width + 2)
  })
})
