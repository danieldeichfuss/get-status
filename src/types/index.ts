export interface ActionOutput {
  allChecksCompleted: boolean
  allChecksPassed: boolean
}

export interface ActionInput {
  ref: string
  token: string
}
