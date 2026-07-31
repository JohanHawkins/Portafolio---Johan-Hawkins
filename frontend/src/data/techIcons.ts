import type { IconType } from 'react-icons'
import {
  SiAngular,
  SiCss,
  SiDotnet,
  SiHtml5,
  SiJavascript,
  SiOpenjdk,
  SiPhp,
  SiPython,
  SiReact,
} from 'react-icons/si'

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
}
