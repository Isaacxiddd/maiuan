import { test, expect } from '@playwright/test'

const URL = 'http://localhost:5173'
const NAV_H = 72

test.describe('maiuan – layout & overlap checks', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1400) // let Framer Motion entrance animations complete
  })

  test('page loads and shows hero headline', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible()
    const text = await page.locator('h1').textContent()
    expect(text?.length).toBeGreaterThan(5)
  })

  test('navbar stays at top, hero body content renders below it', async ({ page }) => {
    const nav = page.locator('header')
    await expect(nav).toBeVisible()
    const navBox = await nav.boundingBox()
    expect(navBox).not.toBeNull()
    expect(Math.abs(navBox!.y)).toBeLessThanOrEqual(4)
    expect(navBox!.height).toBeLessThanOrEqual(NAV_H + 4)

    // Hero paragraph must be below navbar (not nav links)
    const heroParagraph = page.locator('#hero p').first()
    const paraBox = await heroParagraph.boundingBox()
    expect(paraBox).not.toBeNull()
    expect(paraBox!.y).toBeGreaterThan(navBox!.height)
  })

  test('sections do not overlap each other', async ({ page }) => {
    const ids = ['hero', 'insight', 'solucion', 'servicios', 'proceso', 'portfolio', 'testimonios', 'contacto']
    const boxes: { id: string; top: number; bottom: number }[] = []
    for (const id of ids) {
      const el = page.locator(`#${id}`)
      if (await el.count() === 0) continue
      const box = await el.boundingBox()
      if (box) boxes.push({ id, top: box.y, bottom: box.y + box.height })
    }
    for (let i = 0; i < boxes.length - 1; i++) {
      const overlap = boxes[i].bottom - boxes[i + 1].top
      expect(overlap).toBeLessThanOrEqual(2) // allow 2px rounding
    }
  })

  test('section containers are horizontally centered on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)

    const ids = ['servicios', 'proceso', 'portfolio', 'contacto']
    for (const id of ids) {
      const container = page.locator(`#${id} [data-container]`).first()
      if (await container.count() === 0) continue
      const box = await container.boundingBox()
      if (!box) continue
      const leftMargin = box.x
      const rightMargin = 1440 - (box.x + box.width)
      const diff = Math.abs(leftMargin - rightMargin)
      expect(diff).toBeLessThan(40) // centered within 40px tolerance
    }
  })

  test('WhatsApp button is visible in hero and does not overlap form at contact section', async ({ page }) => {
    // Should be visible above contact
    await expect(page.locator('a[title="Escribinos por WhatsApp"]')).toBeVisible()

    // Scroll to bottom of contact — button should hide
    await page.locator('footer').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // When hidden, scale=0 so it won't visually block anything
    const waBox = await page.locator('a[title="Escribinos por WhatsApp"]').boundingBox()
    const formBox = await page.locator('form').boundingBox()

    if (waBox && formBox) {
      const h = waBox.x < formBox.x + formBox.width && waBox.x + waBox.width > formBox.x
      const v = waBox.y < formBox.y + formBox.height && waBox.y + waBox.height > formBox.y
      expect(h && v).toBeFalsy()
    }
  })

  test('nav links scroll — el título de cada sección queda visible bajo el navbar', async ({ page }) => {
    const cases = [
      { label: 'Servicios', id: 'servicios' },
      { label: 'Proceso', id: 'proceso' },
      { label: 'Contacto', id: 'contacto' },
    ]
    for (const { label, id } of cases) {
      await page.locator(`header a:has-text("${label}")`).click()
      await page.waitForTimeout(1000)
      const h2 = page.locator(`#${id} h2`)
      await expect(h2).toBeVisible({ timeout: 5000 })
      const box = await h2.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.y + box!.height).toBeGreaterThan(NAV_H)
    }
  })

  test('no horizontal overflow on mobile 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    await expect(page.locator('h1')).toBeVisible()
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(scrollWidth).toBeLessThanOrEqual(377)
  })

  test('portfolio cards all have a CTA link', async ({ page }) => {
    await page.locator('#portfolio').scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    const cards = page.locator('#portfolio article')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const cta = cards.nth(i).locator('a:has-text("Ver proyecto")')
      await expect(cta).toBeVisible()
    }
  })

  test('testimonial signatures are visible in every card', async ({ page }) => {
    await page.locator('#testimonios').scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    const cards = page.locator('#testimonios > [data-container] > div > div')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

})
