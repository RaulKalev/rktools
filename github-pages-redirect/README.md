# github.io redirect stubs

These files exist to protect the search ranking currently held by
`https://raulkalev.github.io/rktools/`, which sits at roughly position 2 for
the query "Raul Kalev".

## Why they are needed

GitHub Pages issues an automatic 301 from `<user>.github.io/<repo>/` to a
custom domain — but **only when GitHub Pages is the thing serving that custom
domain**. Because the site is moving to DigitalOcean App Platform instead,
that free 301 is not available, and the old URL would simply 404 once Pages is
turned off. A 404 throws away the existing ranking.

These stubs are the substitute: an instant `meta http-equiv="refresh"` plus a
`rel="canonical"`. Google treats an instant meta refresh as a permanent
redirect and consolidates signals into the canonical target. It is slightly
weaker and slower than a server-issued 301, but it preserves the great
majority of the equity.

## How to deploy them

They must be served from GitHub Pages *while* `main` deploys to DigitalOcean,
so they live on their own branch:

```bash
git subtree split --prefix=github-pages-redirect -b gh-pages-redirect
git push -u origin gh-pages-redirect
```

Then in the repository's **Settings → Pages**, set the source to the
`gh-pages-redirect` branch, root folder. Leave the custom domain field
**empty** — setting one would make Pages try to serve `tools.raulkalev.ee`
itself and defeat the purpose.

Verify afterwards:

```bash
curl -sI https://raulkalev.github.io/rktools/ | head -1        # expect 200
curl -s  https://raulkalev.github.io/rktools/ | grep canonical # expect the new URL
```

## How long to keep them

Indefinitely. There is no cost to leaving them up, and removing them later
would strand every old inbound link. Retire them only if the repository itself
is deleted.

## If the site ever moves to the apex

Update the four destination URLs here in the same commit that moves the site,
so the chain stays one hop: `github.io` → `raulkalev.ee`. Do not let it become
`github.io` → `tools.raulkalev.ee` → `raulkalev.ee`; multi-hop chains lose more
signal and crawl slower.
