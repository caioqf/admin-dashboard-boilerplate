import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useLeads } from '../context/leads-context'
import { LeadForm } from './lead-form'
import { LeadViewDialog } from './lead-view-dialog'

export function LeadsDialogs() {
  const { open, setOpen, currentLead, deleteLead } = useLeads()

  const handleDelete = async () => {
    if (currentLead) {
      await deleteLead(currentLead.id)
      setOpen(null)
    }
  }

  return (
    <>
      <Dialog open={open === 'create'} onOpenChange={(isOpen) => !isOpen && setOpen(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Novo Lead</DialogTitle>
            <DialogDescription>
              Preencha as informações do lead abaixo.
            </DialogDescription>
          </DialogHeader>
          <LeadForm onSuccess={() => setOpen(null)} />
        </DialogContent>
      </Dialog>

      <Dialog open={open === 'update'} onOpenChange={(isOpen) => !isOpen && setOpen(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Lead</DialogTitle>
            <DialogDescription>
              Atualize as informações do lead.
            </DialogDescription>
          </DialogHeader>
          {currentLead && <LeadForm lead={currentLead} onSuccess={() => setOpen(null)} />}
        </DialogContent>
      </Dialog>

      <AlertDialog open={open === 'delete'} onOpenChange={(isOpen) => !isOpen && setOpen(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o lead <strong>{currentLead?.nome}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <LeadViewDialog />
    </>
  )
}

