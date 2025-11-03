# BitBabble

BitBabble is a fake, dev-themed blog site to demonstrate my abilities in front-end web development. *Note: the post and user data is provided by DummyJSON and does not actually discuss tech concepts as BitBabble's theme would suggest.*

## Features

- **Post browsing:** View posts as a list of cards. When the card is clicked, it will take you to a fullscreen detail page. More posts can be viewed by clicking the "Show More" button at the bottom of the list. Posts from followed users will appear in a separate list for convenience.
- **User profiles:** When the user's name or photo is clicked on a post card or detail page, you will be taken to a fullscreen profile page for the user where you can view their photo larger, see their username, follow or unfollow them, view their information, and browse a list of their posts.
- **Liking and disliking:** Clicking either the like or dislike button on a post's card or detail page will persistently illuminate the button and update the like or dislike count.
- **Searching:** The search page allows you to search for posts by title and users by name or username. The post results and user results are kept separate, with the user results being displayed as cards that link to the user's profile page and include a convenient follow/unfollow button.
- **Dynamic account info:** The account page displays "your" account's information along with a list of any posts you make. It also includes a form you can use to update your account's information, including name, username, age, occupation, and education.
- **Posting:** You can make a unique post that will appear in the list of all posts on the home page and on your acccount page. The post consists of required title and body text along with an optional list of up to ten custom tags.

## Site Layout

- **Home page**
  - Hero section
  - List of followed posts (if any)
  - List of all posts
- **Search page**
  - Search field
  - List of post results (after searching)
  - List of user results (after searching)
- **Account page**
  - Account info
  - Account info form (to change account info)
  - List of your posts (if any)
- **New post page**
  - New post form (title, body, tags)

## Future Ideas

- **View counts:** A count alongside the like and dislike buttons that increments when a user views a post's detail page.
- **Working footer links:** Currently, the links in the footer do not lead anywhere, as BitBabble is not a real service and many of those pages are beyond the scope of this project.
- **Search by tag:** Currently, a post's tags merely serves as a quick descriptor of the post's content, but it would be nice to search posts by their tags on the search page.
- **Following list:** A list on the account page showing all followed users for easy browsing or unfollowing.
- **Post deletion:** A way to delete posts you've made.