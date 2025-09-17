import { IconTypeMap } from './types'
import UserIconSvg from './custom-icons/UserIcon.svg'
import AgentIconSvg from './custom-icons/AgentIcon.svg'
import ReasoningIconSvg from './custom-icons/ReasoningIcon.svg'
import ReferencesIconSvg from './custom-icons/ReferencesIcon.svg'
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
  Trash,
  PanelLeftClose
} from 'lucide-react'

import { PlusIcon } from '@radix-ui/react-icons'

export const ICONS: IconTypeMap = {
  user: UserIconSvg,
  agent: AgentIconSvg,
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
  'toggle-sidebar': PanelLeftClose
}
