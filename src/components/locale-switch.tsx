import { Check, Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLocale } from '@/context/locale-context'

const locales = [
  {
    value: 'pt_br' as const,
    label: 'Português (BR)',
    flag: '🇧🇷',
  },
  {
    value: 'en' as const,
    label: 'English',
    flag: '🇺🇸',
  },
]

export function LocaleSwitch() {
  const { locale, setLocale, t } = useLocale()

  const currentLocale = locales.find((l) => l.value === locale)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('common.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {locales.map((localeOption) => (
          <DropdownMenuItem
            key={localeOption.value}
            onClick={() => setLocale(localeOption.value)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{localeOption.flag}</span>
              <span>{localeOption.label}</span>
            </div>
            {locale === localeOption.value && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 