import type { IconType } from 'react-icons'
import {
  SiAngular,
  SiCss,
  SiDotnet,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiOpenjdk,
  SiPandas,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from 'react-icons/si'
import { FaFileExcel } from 'react-icons/fa'
import { FiMonitor } from 'react-icons/fi'

export interface TechIconInfo {
  name: string
  Icon: IconType
  color: string
}

export const techIcons: Record<string, TechIconInfo> = {
  javascript: { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e' },
  react: { name: 'React', Icon: SiReact, color: '#61dafb' },
  angular: { name: 'Angular', Icon: SiAngular, color: '#dd0031' },
  html5: { name: 'HTML', Icon: SiHtml5, color: '#e34f26' },
  css3: { name: 'CSS', Icon: SiCss, color: '#1572b6' },
  dotnet: { name: '.NET', Icon: SiDotnet, color: '#512bd4' },
  php: { name: 'PHP', Icon: SiPhp, color: '#777bb4' },
  java: { name: 'Java', Icon: SiOpenjdk, color: '#ed8b00' },
  python: { name: 'Python', Icon: SiPython, color: '#3776ab' },
  typescript: { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  nodejs: { name: 'Node.js', Icon: SiNodedotjs, color: '#5fa04e' },
  express: { name: 'Express', Icon: SiExpress, color: '#ffffff' },
  postgresql: { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169e1' },
  tkinter: { name: 'Tkinter', Icon: FiMonitor, color: '#2dd4bf' },
  pandas: { name: 'pandas', Icon: SiPandas, color: '#a78bfa' },
  openpyxl: { name: 'openpyxl', Icon: FaFileExcel, color: '#217346' },
}
