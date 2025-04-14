"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-white font-bold text-xl">K</span>
            </motion.div>
            <span className="text-blue-900 font-bold text-xl">KnowledgeAI</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            {session ? (
              <>
                <Link href="/summarize">
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white">Dashboard</Button>
                </Link>
                <Link href="/settings">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">Get Started</Button>
              </Link>
            )}
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-blue-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="md:hidden bg-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="#features" onClick={() => setIsOpen(false)}>
              Features
            </MobileNavLink>
            <MobileNavLink href="#how-it-works" onClick={() => setIsOpen(false)}>
              How It Works
            </MobileNavLink>
            {session ? (
              <>
                <Link href="/summarize">
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white w-full">Dashboard</Button>
                </Link>
                <Link href="/settings">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white w-full">Get Started</Button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-blue-900 hover:text-blue-700 transition-colors">
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-blue-900 hover:text-blue-700 transition-colors"
    >
      {children}
    </Link>
  )
}

