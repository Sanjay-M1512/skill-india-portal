import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import { CertificateRequest } from '@/contexts/CertificateContext';
import { Award, Calendar, Hash, User } from 'lucide-react';

interface CertificateCardProps {
  certificate: CertificateRequest;
  onClick: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onClick }) => {
  return (
    <Card 
      className="bg-card hover:shadow-lg transition-all duration-200 cursor-pointer border border-border hover:border-primary/30 animate-fade-in"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Award className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-sm line-clamp-1">
              {certificate.title}
            </h3>
          </div>
          <StatusBadge status={certificate.status} />
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{certificate.learnerName}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Hash className="w-3.5 h-3.5" />
            <span>Cert #{certificate.certificateNumber}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs">{certificate.lastUpdated}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground line-clamp-1">
            {certificate.courseName}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;
