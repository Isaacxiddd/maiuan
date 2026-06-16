# maiuan

Landing page para estudio de diseño web orientado a negocios argentinos. Construida para convertir visitas en consultas.

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4
- **Animaciones:** Framer Motion + Anime.js
- **Formulario:** React Hook Form + Zod v4
- **Deploy:** Vercel
- **Backend (CI/métricas):** NestJS

## Estructura

```
maiuan/
├── frontend/          # App React — lo que va a producción
│   ├── src/
│   │   ├── components/
│   │   │   ├── Services.tsx      # Pricing: Inicial / Crecimiento / Sistema
│   │   │   ├── Portfolio.tsx     # Proyectos reales (Guayafood, etc.)
│   │   │   ├── Contact.tsx       # Formulario vía Web3Forms
│   │   │   ├── WhatsAppButton.tsx
│   │   │   └── ...
│   │   └── App.tsx               # Code splitting con React.lazy
│   ├── lighthouse-audit.mjs      # Audit de performance local
│   └── vercel.json
└── backend/           # NestJS — endpoint /lighthouse para métricas
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

```env
VITE_WEB3FORMS_KEY=      # clave de web3forms.com para el formulario
VITE_CONTACT_EMAIL=      # email donde llegan los mensajes
VITE_WHATSAPP_NUMBER=    # número sin + (ej: 5491123952146)
```

Si no se definen, el build usa los valores por defecto hardcodeados.

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Build y preview

```bash
pnpm build
pnpm preview
```

## Lighthouse

```bash
pnpm lighthouse
```

Genera un reporte HTML en `reports/` y muestra scores en terminal. Requiere Chrome instalado en la ruta por defecto de Windows.

## Deploy

```bash
vercel --prod --scope <team>
```

Scores actuales en producción: Performance 95 · Accesibilidad 94 · Buenas prácticas 100 · SEO 92
