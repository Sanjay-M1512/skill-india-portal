import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { CertificateRequest, useCertificates } from '@/contexts/CertificateContext';
import { Award, User, BookOpen, Building, Hash, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ReviewModalProps {
  certificate: CertificateRequest | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ certificate, isOpen, onClose }) => {
  const { updateCertificateStatus } = useCertificates();

  if (!certificate) return null;

  const handleApprove = () => {
    updateCertificateStatus(certificate.id, 'Approved');
    toast({
      title: "Certificate Approved",
      description: `Certificate for ${certificate.learnerName} has been approved.`,
    });
    onClose();
  };

  const handleReject = () => {
    updateCertificateStatus(certificate.id, 'Rejected');
    toast({
      title: "Certificate Rejected",
      description: `Certificate for ${certificate.learnerName} has been rejected.`,
      variant: "destructive",
    });
    onClose();
  };

  const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
    <div className="flex items-start gap-3 py-2">
      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground break-words">{value}</p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-heading">
                Certificate Review
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Skill India | NCVET
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-1 divide-y divide-border">
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-foreground">{certificate.title}</span>
            <StatusBadge status={certificate.status} />
          </div>
          
          <InfoRow icon={User} label="Learner Name" value={certificate.learnerName} />
          <InfoRow icon={Hash} label="Learner ID" value={certificate.learnerId} />
          <InfoRow icon={BookOpen} label="Course Name" value={certificate.courseName} />
          <InfoRow icon={Building} label="Awarding Body" value={certificate.awardingBody} />
          <InfoRow icon={Building} label="Issuing Body" value={certificate.issuingBody} />
          <InfoRow icon={Hash} label="Certificate Number" value={certificate.certificateNumber} />
          <InfoRow icon={Calendar} label="Last Updated" value={certificate.lastUpdated} />
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2 mt-4">
          <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          {certificate.status === 'Pending' && (
            <>
              <Button
                variant="destructive"
                onClick={handleReject}
                className="flex-1 sm:flex-none gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </Button>
              <Button
                onClick={handleApprove}
                className="flex-1 sm:flex-none gap-2 bg-success hover:bg-success/90"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
