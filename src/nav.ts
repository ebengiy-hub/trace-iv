// Shared navigation contract. Every screen receives NavProps from App.tsx.
export type ScreenId = 1 | 2 | 3 | 4 | 5

export interface NavProps {
  /** Navigate to another screen (App animates the transition). */
  go: (screen: ScreenId) => void
  /** Currently selected artifact id (see src/data/artifacts.ts). Defaults to 'amphora'. */
  artifactId: string
  /** Select an artifact; does not navigate. */
  selectArtifact: (id: string) => void
}
