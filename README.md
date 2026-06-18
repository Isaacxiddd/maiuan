# maiuan

Landing page para [maiuan.ar](https://maiuan.ar) — estudio de diseño web orientado a negocios argentinos. Construida para convertir visitas en consultas.

Diseñada con foco en conversión: cada sección empuja al usuario al formulario de contacto o WhatsApp. Incluye animaciones sutiles con Framer Motion, flip card 3D en el hero, y un formulario funcional via Web3Forms.

## Stack

| Capa | Tecnología |
|---|---|
| **Frontend** | React 19 + TypeScript + Vite + Tailwind CSS v4 |
| **Animaciones** | Framer Motion + Anime.js |
| **Formulario** | React Hook Form + Zod |
| **Tests** | Playwright (E2E) |
| **Audit** | Lighthouse CI |
| **Deploy** | Vercel |
| **Backend** | NestJS (métricas) |

## Estructura

```
maiuan/
├── frontend/                    # App React — lo que va a producción
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.tsx         # Video + flip card 3D
│   │   │   ├── Insight.tsx      # Señales de alerta
│   │   │   ├── Solution.tsx     # Propuesta de valor
│   │   │   ├── Services.tsx     # Pricing (3 planes)
│   │   │   ├── Process.tsx      # Paso a paso
│   │   │   ├── Portfolio.tsx    # Proyectos reales
│   │   │   ├── Testimonials.tsx # Testimonios de clientes
│   │   │   ├── Contact.tsx      # Formulario + WhatsApp + mail
│   │   │   ├── Navbar.tsx       # Navegación sticky
│   │   │   ├── Footer.tsx       # Footer
│   │   │   ├── WhatsAppButton.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── BgTexture.tsx
│   │   │   └── MaiuanLogo.tsx
│   │   └── App.tsx              # Code splitting con React.lazy
│   ├── lighthouse-audit.mjs     # Audit de performance local
│   ├── tests/                   # Tests E2E con Playwright
│   └── vercel.json
└── backend/                     # NestJS — endpoint /lighthouse
```

## Desarrollo

```bash
cd frontend
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Testing

```bash
pnpm test          # Playwright E2E
pnpm test:ui       # Playwright UI mode
```

## Lighthouse

```bash
pnpm lighthouse
```

Genera reporte HTML en `reports/`. Requiere Chrome instalado.

## Variables de entorno

Copiar `.env.example` → `.env`:

```env
VITE_WEB3FORMS_KEY=      # web3forms.com
VITE_CONTACT_EMAIL=      # destino del formulario
VITE_WHATSAPP_NUMBER=    # sin + (ej: 5491123952146)
```

## Deploy

```bash
vercel --prod
```

## Scores actuales

| Métrica | Score |
|---|---|
| Performance | 95 |
| Accesibilidad | 94 |
| Buenas prácticas | 100 |
| SEO | 92 |
