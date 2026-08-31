export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  description: string
  stack: string[]
  links: ProjectLink[]
}
