import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CertificateRequest {
  id: string;
  title: string;
  learnerName: string;
  learnerId: string;
  courseName: string;
  awardingBody: string;
  issuingBody: string;
  certificateNumber: string;
  lastUpdated: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface CertificateContextType {
  certificates: CertificateRequest[];
  isLoading: boolean;
  updateCertificateStatus: (id: string, status: 'Approved' | 'Rejected') => void;
  getPendingCount: () => number;
  getCertificatesByIssuingBody: () => Record<string, CertificateRequest[]>;
}

const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

export const useCertificates = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificates must be used within a CertificateProvider');
  }
  return context;
};

interface CertificateProviderProps {
  children: ReactNode;
}

export const CertificateProvider: React.FC<CertificateProviderProps> = ({ children }) => {
  const [certificates, setCertificates] = useState<CertificateRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setCertificates(data.certificateRequests);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const updateCertificateStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setCertificates(prev =>
      prev.map(cert =>
        cert.id === id
          ? { ...cert, status, lastUpdated: new Date().toLocaleString() }
          : cert
      )
    );
  };

  const getPendingCount = () => {
    return certificates.filter(cert => cert.status === 'Pending').length;
  };

  const getCertificatesByIssuingBody = () => {
    return certificates.reduce((acc, cert) => {
      if (!acc[cert.issuingBody]) {
        acc[cert.issuingBody] = [];
      }
      acc[cert.issuingBody].push(cert);
      return acc;
    }, {} as Record<string, CertificateRequest[]>);
  };

  return (
    <CertificateContext.Provider
      value={{
        certificates,
        isLoading,
        updateCertificateStatus,
        getPendingCount,
        getCertificatesByIssuingBody,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
