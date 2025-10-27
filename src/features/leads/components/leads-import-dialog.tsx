import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useLeads } from '../context/leads-context'
import { IconUpload, IconFileSpreadsheet, IconJson } from '@tabler/icons-react'
import { toast } from 'sonner'
import Papa from 'papaparse'

export function LeadsImportDialog() {
  const { open, setOpen, importLeads, columns } = useLeads()
  const [isProcessing, setIsProcessing] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validTypes = ['text/csv', 'application/json', 'application/vnd.ms-excel']
      const validExtensions = ['.csv', '.json']
      const fileExtension = selectedFile.name.toLowerCase().slice(selectedFile.name.lastIndexOf('.'))

      if (validTypes.includes(selectedFile.type) || validExtensions.includes(fileExtension)) {
        setFile(selectedFile)
      } else {
        toast.error('Formato de arquivo inválido. Use CSV ou JSON.')
        e.target.value = ''
      }
    }
  }

  const parseCSV = (text: string): any[] => {
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data)
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  }

  const parseJSON = (text: string): any[] => {
    try {
      const data = JSON.parse(text)
      return Array.isArray(data) ? data : [data]
    } catch (error) {
      throw new Error('JSON inválido')
    }
  }

  const validateAndTransformLead = (data: any) => {
    const defaultStatus = columns[0]?.id || 'novo'

    return {
      nome: data.nome || data.name || '',
      email: data.email || '',
      telefone: data.telefone || data.phone || data.telefone || '',
      valorEstimado: parseFloat(data.valorEstimado || data.valor || data.value || '0'),
      fonte: data.fonte || data.source || 'outro',
      status: data.status || defaultStatus,
      localizacao: data.localizacao || data.location || data.cidade || '',
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? data.tags.split(',').map((t: string) => t.trim()) : [],
      categoria: data.categoria || data.category || undefined,
    }
  }

  const handleImport = async () => {
    if (!file) {
      toast.error('Selecione um arquivo')
      return
    }

    setIsProcessing(true)

    try {
      const text = await file.text()
      let rawData: any[]

      if (file.name.endsWith('.csv')) {
        rawData = await parseCSV(text)
      } else {
        rawData = parseJSON(text)
      }

      if (rawData.length === 0) {
        toast.error('Arquivo vazio ou formato inválido')
        return
      }

      const validLeads = rawData
        .map(validateAndTransformLead)
        .filter((lead) => lead.nome && lead.email)

      if (validLeads.length === 0) {
        toast.error('Nenhum lead válido encontrado. Verifique se os campos "nome" e "email" estão presentes.')
        return
      }

      await importLeads(validLeads)

      if (validLeads.length < rawData.length) {
        toast.warning(`${rawData.length - validLeads.length} leads foram ignorados por dados inválidos`)
      }

      setOpen(null)
      setFile(null)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao processar arquivo')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    setOpen(null)
    setFile(null)
  }

  const downloadTemplate = (format: 'csv' | 'json') => {
    const template = {
      nome: 'João Silva',
      email: 'joao@empresa.com',
      telefone: '(11) 98765-4321',
      valorEstimado: 15000,
      fonte: 'linkedin',
      localizacao: 'São Paulo, SP',
      tags: 'urgente,b2b',
      categoria: 'media_empresa',
    }

    if (format === 'csv') {
      const csv = Papa.unparse([template])
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'template-leads.csv'
      a.click()
      URL.revokeObjectURL(url)
    } else {
      const json = JSON.stringify([template], null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'template-leads.json'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <Dialog open={open === 'import'} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Importar Leads</DialogTitle>
          <DialogDescription>
            Faça upload de um arquivo CSV ou JSON com os dados dos leads.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Arquivo</Label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <IconUpload className="h-6 w-6 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {file ? file.name : 'Clique para selecionar arquivo'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    CSV ou JSON (máx. 10MB)
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Templates</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => downloadTemplate('csv')}
              >
                <IconFileSpreadsheet className="h-4 w-4 mr-2" />
                Baixar CSV
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => downloadTemplate('json')}
              >
                <IconJson className="h-4 w-4 mr-2" />
                Baixar JSON
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Baixe um template para ver o formato esperado
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h4 className="font-medium text-sm">Campos esperados:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• <strong>nome</strong> (obrigatório)</li>
              <li>• <strong>email</strong> (obrigatório)</li>
              <li>• telefone, valorEstimado, fonte, localizacao</li>
              <li>• tags (separadas por vírgula), categoria</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose} disabled={isProcessing}>
              Cancelar
            </Button>
            <Button onClick={handleImport} disabled={!file || isProcessing}>
              {isProcessing ? 'Importando...' : 'Importar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

