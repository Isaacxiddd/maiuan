# maiuan — Frontend

Landing page para estudio de diseño web. Construida con React 19 + TypeScript + Vite + Tailwind CSS v4.

## Stack

- **React 19** + TypeScript
- **Vite** (build dev)
- **Tailwind CSS v4**
- **Framer Motion** + Anime.js (animaciones)
- **React Hook Form** + Zod (formulario)
- **Web3Forms** (backend del formulario)
- **Playwright** (tests E2E)
- **Lighthouse** (audit de performance)

## Scripts

```bash
pnpm dev           # desarrollo
pnpm build         # build producción
pnpm preview       # preview del build
pnpm lint          # ESLint
pnpm lighthouse    # audit local (requiere Chrome)
pnpm test          # tests E2E con Playwright
```

## Componentes

| Componente | Descripción |
|---|---|
| `Hero` | Hero con video + flip card 3D |
| `Insight` | Señales de alerta (prueba social) |
| `Solution` | Explicación del servicio |
| `Services` | Pricing: Inicial / Crecimiento / Sistema |
| `Process` | Paso a paso del servicio |
| `Portfolio` | Proyectos realizados |
| `Testimonials` | Testimonios de clientes |
| `Contact` | Formulario + WhatsApp + mail |
| `Navbar` | Navegación sticky |
| `Footer` | Footer con links |
| `WhatsAppButton` | Botón flotante de WhatsApp |

## Variables de entorno

```env
VITE_WEB3FORMS_KEY=       # clave de web3forms.com
VITE_CONTACT_EMAIL=       # email de contacto
VITE_WHATSAPP_NUMBER=     # número sin + (ej: 5491123952146)
```
