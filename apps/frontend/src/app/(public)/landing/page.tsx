'use client';

import { useState } from 'react';
import { Header } from '@/components/marketing/Header';
import { HeroSection } from '@/components/marketing/HeroSection';
import { WhySection } from '@/components/marketing/WhySection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';
import { AISection } from '@/components/marketing/AISection';
import { TargetAudienceSection } from '@/components/marketing/TargetAudienceSection';
import { CTASection } from '@/components/marketing/CTASection';
import { Footer } from '@/components/marketing/Footer';
import { LeadFormModal } from '@/components/marketing/LeadFormModal';

export default function LandingPage() {
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onOpenLeadModal={() => setLeadOpen(true)} />
      <main className="space-y-8">
        <HeroSection onOpenLeadModal={() => setLeadOpen(true)} />
        <WhySection />
        <FeaturesSection />
        <AISection />
        <TargetAudienceSection onOpenLeadModal={() => setLeadOpen(true)} />
        <CTASection onOpenLeadModal={() => setLeadOpen(true)} />
      </main>
      <Footer />
      <LeadFormModal isOpen={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  );
}

