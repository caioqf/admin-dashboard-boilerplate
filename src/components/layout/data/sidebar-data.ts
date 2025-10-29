import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { ClerkLogo } from '@/assets/clerk-logo'
import { type SidebarData } from '../types'

export const getSidebarData = (t: (key: string) => string): SidebarData => ({
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: t('teams.shadcn_admin'),
      logo: Command,
      plan: t('teams.vite_shadcnui'),
    },
    {
      name: t('teams.acme_inc'),
      logo: GalleryVerticalEnd,
      plan: t('teams.enterprise'),
    },
    {
      name: t('teams.acme_corp'),
      logo: AudioWaveform,
      plan: t('teams.startup'),
    },
  ],
  navGroups: [
    {
      title: t('nav.general'),
      items: [
        {
          title: t('nav.dashboard'),
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: t('nav.tasks'),
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: t('nav.chats'),
          url: '/chats',
          badge: '3',
          icon: IconMessages,
        },
        {
          title: t('nav.users'),
          url: '/users',
          icon: IconUsers,
        }
      ],
    },
    {
      title: t('nav.other'),
      items: [
        {
          title: t('nav.settings'),
          icon: IconSettings,
          items: [
            {
              title: t('nav.profile'),
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: t('nav.account'),
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: t('nav.appearance'),
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: t('nav.notifications'),
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: t('nav.display'),
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: t('nav.help_center'),
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
})
