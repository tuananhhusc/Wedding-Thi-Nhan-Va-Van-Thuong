import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Dancing_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--next-font-serif",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--next-font-sans",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const scriptFont = Dancing_Script({
  variable: "--next-font-script",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.weddingnhanthuong.id.vn";
const OG_IMAGE = "/opengraph-image";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Giuse Nguyễn Văn Thường & Terexa Phạm Thị Nhàn — Thiệp Mời Hôn Phối",
    template: "%s | Thiệp Mời Hôn Phối",
  },
  description:
    "Kính mời quý khách đến hiệp thông Thánh Lễ Hôn Phối tại Giáo xứ Trại Lê (29/04/2026) và chung vui lễ cưới của Giuse Nguyễn Văn Thường & Terexa Phạm Thị Nhàn tại Hà Tĩnh.",
  keywords: [
    "đám cưới",
    "thiệp mời",
    "hôn phối",
    "công giáo",
    "thánh lễ",
    "Nguyễn Văn Thường",
    "Phạm Thị Nhàn",
    "wedding invitation",
  ],
  authors: [{ name: "Giuse Nguyễn Văn Thường & Terexa Phạm Thị Nhàn" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Giuse Nguyễn Văn Thường & Terexa Phạm Thị Nhàn — Thiệp Mời Hôn Phối",
    description:
      "Thánh Lễ Hôn Phối 29.04.2026 tại Giáo xứ Trại Lê. Lễ cưới của Giuse Nguyễn Văn Thường & Terexa Phạm Thị Nhàn tại Hà Tĩnh.",
    type: "website",
    url: SITE_URL,
    locale: "vi_VN",
    siteName: "Đám Cưới Giuse Nguyễn Văn Thường & Terexa Phạm Thị Nhàn",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Thiệp mời hôn phối Giuse Nguyễn Văn Thường và Terexa Phạm Thị Nhàn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giuse Nguyễn Văn Thường & Terexa Phạm Thị Nhàn — Thiệp Mời Hôn Phối",
    description:
      "Thánh Lễ Hôn Phối 29.04.2026 tại Giáo xứ Trại Lê. Lễ cưới của Giuse Nguyễn Văn Thường & Terexa Phạm Thị Nhàn tại Hà Tĩnh.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

/* JSON-LD Structured Data for Wedding Event */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Thánh Lễ Hôn Phối — Giuse Nguyễn Văn Thường & Terexa Phạm Thị Nhàn",
  description:
    "Thánh Lễ Hôn Phối tại Giáo xứ Trại Lê và các lễ cưới của Giuse Nguyễn Văn Thường và Terexa Phạm Thị Nhàn (Hà Tĩnh)",
  startDate: "2026-04-29T19:30:00+07:00",
  endDate: "2026-05-02T11:00:00+07:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Nhà thờ Giáo xứ Trại Lê",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Trại Lê",
      addressRegion: "Hà Tĩnh",
      addressCountry: "VN",
    },
  },
  organizer: {
    "@type": "Person",
    name: "Gia đình Giuse Nguyễn Văn Thường & Terexa Phạm Thị Nhàn",
  },
};

import AudioPlayer from "@/components/AudioPlayer";
import FloatingPetals from "@/components/FloatingPetals";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${cormorant.variable} ${montserrat.variable} ${scriptFont.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-serif antialiased selection:bg-gold-pale selection:text-navy relative">
        {children}
      </body>
    </html>
  );
}
