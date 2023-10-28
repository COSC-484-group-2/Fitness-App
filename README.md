# Fitness App

Setup:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). (do not use `localhost`)

## Resources

- Styles: [Tailwind CSS](https://tailwindcss.com/) | [Cheat sheet](https://nerdcave.com/tailwind-cheat-sheet)
- Components: [shadcn/ui](https://ui.shadcn.com/docs/components/accordion)
- Next.js
    - [Navigating between pages](https://nextjs.org/learn/dashboard-app/navigating-between-pages)

## HTML to React

### HTML

- `fitness-app/mypage.html`

```html
// localhost:3000/mypage.html

<html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <main>
            <h1>Example</h1>
            <p class="myclass">Example</p>
        </main>
    </body>
</html>
```

### React

- `fitness-app/src/app/mypage/page.js`

```html
// http://127.0.0.1:3000/mypage

"use client"

export default function () {
    return (
        <main>
            <h1>Example</h1>
            <p className="myclass">Example</p>
        </main>
    );
}
```