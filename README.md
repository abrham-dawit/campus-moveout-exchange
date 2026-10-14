# MoveOut Market — campus marketplace for students moving out

My idea: every term, students moving out of dorms and apartments throw away desks, lamps, mini-fridges, bikes, and textbooks that the next student would happily pay a few dollars for. This is a marketplace just for that — students selling to students, priced low to high, with one big rule: **members have to be verified students**, so the board stays real people instead of spam and random strangers.

## What this version does

- **Post a listing** — title, category, price, condition, your name, a contact, and a short description. Listings show up on the board immediately.
- **Browse, search, filter, sort** — full-text search, category filter, a "verified sellers only" toggle, and sorting with **price low to high** as the default, because that's how students actually shop during move-out week.
- **Contact the seller** — each card has a button that reveals the seller's contact, with a reminder to meet somewhere public on campus.
- **Verified student badge** — listings from verified members carry a ✓ badge.
- **Persistence** — your listings are saved in your browser (localStorage), so they survive a refresh.
- Four **sample listings** come pre-loaded so the board isn't empty the first time you open it. They're clearly labeled "Sample listing."

Open `index.html` in a browser. No build step, no accounts, no servers.

## What's honest about this demo

- **The verification is a concept here, not a real check.** In this demo the "verified student" status is a checkbox on the posting form. The real version needs an actual identity step — school email confirmation or an ID check at sign-up — run by a backend. The point of this build is to show how the badge shapes the whole experience.
- **Listings live only in your browser.** Nobody else can see what you post in this version. A real launch needs a shared backend, photos, and in-app messaging so contact info isn't just posted publicly.
- No payments are handled — like Craigslist or a dorm bulletin board, the swap happens in person.

## Where it goes next

1. Real sign-up with school-email verification.
2. Photo uploads and an in-app chat so emails/phones stay private.
3. A "move-out week" mode that pushes end-of-term listings and free-stuff alerts.
4. Sold/expired states so the board cleans itself after move-out weekend.
