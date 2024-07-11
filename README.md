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
