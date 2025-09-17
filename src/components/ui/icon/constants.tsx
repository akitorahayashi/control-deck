import { IconTypeMap } from './types'
import UserIconSvg from './custom-icons/UserIcon.svg'
import AgentIconSvg from './custom-icons/AgentIcon.svg'
import NextjsTagSvg from './custom-icons/NextjsTag.svg'
import ShadcnTagSvg from './custom-icons/ShadcnTag.svg'
import TailwindTagSvg from './custom-icons/TailwindTag.svg'
import ReasoningIconSvg from './custom-icons/ReasoningIcon.svg'
import ReferencesIconSvg from './custom-icons/ReferencesIcon.svg'
import ToggleSidebarSvg from './custom-icons/ToggleSidebar.svg'
import {
  RefreshCw,
  Edit,
  Save,
  X,
  ArrowDown,
  SendIcon,
  Download,
  HammerIcon,
  Check,
  ChevronDown,
  ChevronUp,
  Trash
} from 'lucide-react'

import { PlusIcon } from '@radix-ui/react-icons'

export const ICONS: IconTypeMap = {
  user: UserIconSvg,
  agent: AgentIconSvg,
  nextjs: NextjsTagSvg,
  shadcn: ShadcnTagSvg,
  tailwind: TailwindTagSvg,
  reasoning: ReasoningIconSvg,
  refresh: RefreshCw,
  edit: Edit,
  save: Save,
  x: X,
  'arrow-down': ArrowDown,
  send: SendIcon,
  download: Download,
  hammer: HammerIcon,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'plus-icon': PlusIcon,
  references: ReferencesIconSvg,
  trash: Trash,
  'toggle-sidebar': ToggleSidebarSvg
}
