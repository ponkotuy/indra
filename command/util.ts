const capitalize = (str: string) => str[0].toUpperCase() + str.substring(1)

export const cGroupDesc = (name: string) => {
  return `${capitalize(name)} command group. (see indra ${name} --help)`
}

// deno-lint-ignore no-explicit-any
export const stdout = (data: any, isJson: boolean, count?: string) => {
  if (isJson) {
    console.log(JSON.stringify(data))
  } else {
    console.log(data)
    if (count) console.log(`count: ${count}`)
  }
}
