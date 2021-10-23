interface Status {
  allChecksCompleted: boolean
  allChecksPassed: boolean
}

export function getStatus(): Status {
  return {
    allChecksCompleted: true,
    allChecksPassed: true
  }
}
