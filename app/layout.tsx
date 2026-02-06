
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduStream Premium - Learning Reimagined',
  description: 'A premium education platform built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <footer className="bg-white border-t border-slate-100 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
            © 2024 EduStream Premium. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
