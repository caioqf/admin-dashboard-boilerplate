import { IconMailPlus, IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useUsers } from '../context/users-context'
import { useLocale } from '@/context/locale-context'

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  const { t } = useLocale()
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>{t('users.invite_user')}</span> <IconMailPlus size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>{t('users.add_user')}</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
