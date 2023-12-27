/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"gKxwluGauYq15L6q","label":"Social","bookmarks":[{"id":"tABlwVPaF9vy0C93","label":"Whatsapp","url":"https://web.whatsapp.com/"},{"id":"zY38NjOvyuV77CfH","label":"Instagram","url":"https://www.instagram.com/"},{"id":"veVqbWUCH6W3qHYl","label":"Facebook","url":"https://www.facebook.com/"},{"id":"NWYaZiUsskoQKIil","label":"Twitter","url":"https://twitter.com/home"}]},{"id":"P3eUIETXlrqlTDQn","label":"I.A","bookmarks":[{"id":"iFEndDIwL5nmUREo","label":"Poe","url":"https://poe.com/"},{"id":"qfc74cSpNkYZnYbI","label":"Chat Gpt","url":"https://chat.openai.com/"},{"id":"YrYaNRpbLS3CHx65","label":" Imagenes","url":"https://www.bing.com/images/create"},{"id":"fzbW2BWc4dGVHDAa","label":"Character Ai","url":"https://beta.character.ai/"}]},{"id":"j8FsKL2d4OboXMnG","label":"Games","bookmarks":[{"id":"NEGFMBGYfRT6C29w","label":"Steam","url":"https://store.steampowered.com/"},{"id":"TMgSifVV3Q1AzKH9","label":"Ps4","url":"https://www.playstation.com/es-bo/ps4/"}]},{"id":"uVwTDggve1okXcKx","label":"Others","bookmarks":[{"id":"GdEOjzn5oCJdn1Rs","label":"Youtube","url":"https://www.youtube.com/"},{"id":"lduwdDs638i9KIHD","label":"Pinterest","url":"https://ar.pinterest.com/"},{"id":"nsikzQZfLhLdXGM4","label":"GitHub","url":"https://github.com/jom40222"},{"id":"JM98JZV4gpKzuYHO","label":"Reddit","url":"https://www.reddit.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
