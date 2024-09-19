export const filterJson = <T>(xs: T[], regex: RegExp) => xs.filter((x) => regex.test(JSON.stringify(x)))
