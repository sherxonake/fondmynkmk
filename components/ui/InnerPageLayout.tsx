'use client'

import Link from 'next/link'
import { ChevronRight, Home, ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Breadcrumb {
  label: string
  href?: string
}

interface RelatedLink {
  label: string
  href: string
  description: string
}

interface InnerPageLayoutProps {
  title: string
  subtitle?: string
  breadcrumbs: Breadcrumb[]
  children: React.ReactNode
  relatedLinks?: RelatedLink[]
}

export function InnerPageLayout({ 
  title, 
  subtitle, 
  breadcrumbs, 
  children, 
  relatedLinks 
}: InnerPageLayoutProps) {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // SVG паттерн для фона
  const svgPattern = `data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='white' opacity='0.15'/%3E%3C/svg%3E`

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative bg-[#0d1f3c] text-white py-20 lg:py-28 overflow-hidden"
        style={{
          backgroundImage: `url('${svgPattern}')`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
            aria-label="Xizmat yo'li"
          >
            <ol className="flex items-center gap-2 text-sm flex-wrap">
              <li className="flex items-center gap-2">
                <Home className="h-4 w-4 text-white/70" />
                <Link 
                  href="/" 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  Bosh sahifa
                </Link>
              </li>
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-white/50" />
                  {item.href ? (
                    <Link 
                      href={item.href}
                      className="text-white/70 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[#c9a84c] font-medium">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>

          {/* Title and Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="font-bold text-4xl lg:text-6xl mb-4" style={{ letterSpacing: "-0.02em" }}>
              {title}
            </h1>
            <div className="w-16 h-1 bg-[#c9a84c] rounded-full mb-4"></div>
            {subtitle && (
              <p className="text-xl text-white/70 max-w-3xl">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {children}
        </div>
      </section>

      {/* Related Links Section */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section className="bg-[#f8fafc] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-[#0d1f3c] mb-8" style={{ letterSpacing: "-0.02em" }}>
                Shuningdek qarang
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-[#0d1f3c] group-hover:text-[#c9a84c] transition-colors duration-200">
                          {link.label}
                        </h3>
                        <ChevronRight className="h-5 w-5 text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                      </div>
                      <p className="text-[#0d1f3c]/70 text-sm leading-relaxed">
                        {link.description}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-[#0d1f3c] text-white rounded-full shadow-lg hover:bg-[#1a2f4a] transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
            aria-label="Yuqoriga qaytish"
          >
            <ArrowUp className="h-5 w-5 text-[#c9a84c]" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
