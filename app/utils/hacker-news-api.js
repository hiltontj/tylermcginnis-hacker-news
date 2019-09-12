/* Tyler McGinnis's Hacker News API Client
 * Comments made by me (Trevor Hilton).
 * The actual API is documented here:
 * https://github.com/HackerNews/API
 */

const api = `https://hacker-news.firebaseio.com/v0`
const json = '.json?print=pretty'

function removeDead (posts) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true)
}

function removeDeleted (posts) {
  return posts.filter(({ deleted }) => deleted !== true)
}

function onlyComments (posts) {
  return posts.filter(({ type }) => type === 'comment')
}

function onlyPosts (posts) {
  return posts.filter(({ type }) => type === 'story')
}
/* Fetch one of Hacker News's generic Items using its unique id
 * Items can be: job, story, comment, poll, pollopt
 */
export function fetchItem (id) {
  return fetch(`${api}/item/${id}${json}`)
    .then((res) => res.json())
}

/* Fetch a set of Comments from an array of comment IDs
 */
export function fetchComments (ids) {
  return Promise.all(ids.map(fetchItem))
    .then((comments) => removeDeleted(onlyComments(removeDead(comments))))
}

/* Get the list of posts from an array of their IDs
 * - added a limit for users that have ungodly number of posts.
 */
export function fetchPosts (ids, limit) {
  limit = limit || 50
  ids.splice(limit)
  return Promise.all(ids.map(fetchItem))
    .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}

/* Get a list of posts (i.e. stories) of either 'new' or 'top'
 * uses the GET /{type}stories API to fetch list of IDs, then maps
 * them through fetchItem to get their content. Only gathers the 
 * first 50 results.
 */
export function fetchMainPosts (type) {
  return fetch(`${api}/${type}stories${json}`)
    .then((res) => res.json())
    .then((ids) => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${type} posts.`)
      }

      return ids.slice(0, 50)
    })
    .then((ids) => Promise.all(ids.map(fetchItem)))
    .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}

/* Get a user object using its ID
 */
export function fetchUser (id) {
  return fetch(`${api}/user/${id}${json}`)
    .then((res) => res.json())
}