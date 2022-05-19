import type { Item } from '~/types'

export function getDirectors(item: Item) {
  const people = item.credits?.crew

  if (people) {
    return people
      .filter(person => person.job === 'Director')
      .map(person => `<a href="/person/${person.id}">${person.name}</a>`)
      .join(', ')
  }
}
