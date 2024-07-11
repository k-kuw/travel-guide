## プロジェクト名
旅のしおり作成アプリ

## 環境
TypeScript 5.1.6  
React 18.2.0  

## ディレクトリ構成(srcフォルダ配下)
<pre>
.
├── App.css
├── App.tsx
├── assets
│   ├── checkbox_unchecked.png
│   └── react.svg
├── components
│   └── ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── pagination.tsx
│       ├── separator.tsx
│       ├── table.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── use-toast.ts
├── index.css
├── lib
│   └── utils.ts
├── main.tsx
├── reactComponents
│   ├── BelongingsRegister.tsx
│   ├── DestinationRegister.tsx
│   ├── Header.tsx
│   ├── LoadingDialog.tsx
│   ├── Login.tsx
│   ├── NeedLogin.tsx
│   ├── NotFound.tsx
│   ├── RegisterConfirmation.tsx
│   ├── ScheduleRegister.tsx
│   ├── TitleRegister.tsx
│   ├── TravelGuideDetail.tsx
│   ├── TravelGuideDialog.tsx
│   ├── TravelGuideList.tsx
│   ├── TravelGuideMap.tsx
│   ├── TravelGuidePrint.tsx
│   ├── TravelGuideRegister.tsx
│   └── UserRegister.tsx
├── router
│   └── RouterConfig.tsx
├── types
│   └── travelGuide.ts
└── vite-env.d.ts
</pre>

## 環境変数(.envファイル)
- APIのパス(文字列)
VITE_API_PATH

## 環境構築コマンド
npm install

## 起動コマンド
npm run dev

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
# travel-guide-creater
