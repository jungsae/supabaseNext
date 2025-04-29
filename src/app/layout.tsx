// src/app/layout.tsx
import './globals.css'
import AuthButton from '@/components/AuthButton'

export const metadata = {
  title: 'Next.js + Supabase 실시간 댓글',
  description: 'Next.js 14 + Supabase 실시간 댓글 예제',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="p-4 border-b">
          <AuthButton />
        </div>
        {children}
      </body>
    </html>
  )
}
