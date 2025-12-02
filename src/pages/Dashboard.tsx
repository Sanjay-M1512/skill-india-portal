import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCertificates, CertificateRequest } from '@/contexts/CertificateContext';
import Header from '@/components/Header';
import CertificateCard from '@/components/CertificateCard';
import ReviewModal from '@/components/ReviewModal';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardCheck, Building2, Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { getCertificatesByIssuingBody, getPendingCount, isLoading: certLoading } = useCertificates();
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const certificatesByBody = getCertificatesByIssuingBody();
  const pendingCount = getPendingCount();

  const handleCardClick = (certificate: CertificateRequest) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Certificate Requests
          </h2>
          <p className="text-muted-foreground mt-1">
            Review and approve pending certificate requests from Assessment Agencies
          </p>
        </div>

        {/* Stats Card */}
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <p className="text-3xl font-heading font-bold text-foreground">
                  {pendingCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificate Lists by Issuing Body */}
        {certLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(certificatesByBody).map(([issuingBody, certificates]) => (
              <section key={issuingBody}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{issuingBody}</h3>
                    <p className="text-xs text-muted-foreground">
                      {certificates.length} certificate{certificates.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certificates.map((certificate) => (
                    <CertificateCard
                      key={certificate.id}
                      certificate={certificate}
                      onClick={() => handleCardClick(certificate)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <ReviewModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Dashboard;
