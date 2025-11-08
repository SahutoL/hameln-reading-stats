
# Hameln Reading Stats

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2-orange)](https://recharts.org/)

**Hameln Reading Stats** は、小説投稿サイト「ハーメルン」の読書データを連携し、あなたの読書傾向を美しいグラフや統計で可視化するWebアプリケーションです。自分だけの読書記録を分析し、新たな発見を楽しみましょう。

🔗 **Live Demo:** [https://hameln-reading-stats.com](https://hameln-reading-stats.com)

---

## ✨ 主な機能

*   **📊 総合ダッシュボード:** 累計読了作品数、話数、文字数を一目で確認。
*   **📈 読書トレンド可視化:** 直近12ヶ月の読書量をインタラクティブな棒グラフで表示。
*   **🎯 月間目標設定:** 今月の読書文字数目標を設定し、進捗をリアルタイムで追跡。
*   **🗓️ アクティビティカレンダー:** GitHubのコントリビューショングラフのように、日々の読書アクティビティをヒートマップで表示。
*   **🏆 実績システム:** 「累計100万文字読了」などの目標を達成すると実績をアンロック。ゲーミフィケーション要素で読書のモチベーションを高めます。
*   **💡 パーソナルインサイト:** 最も読書した曜日、ピーク月、1日の平均読書文字数など、あなたの読書習慣を深く分析。
*   **🔍 個人データ詳細:** 年ごと、月ごとの読書データをアコーディオンUIで詳細にドリルダウン。各期間の読書量をインラインバーグラフで直感的に比較できます。
*   **🔒 安全な連携:** ハーメルンのアカウント情報はAPI認証にのみ使用され、サービス上には一切保存されません。

## 🛠️ 使用技術

*   **フロントエンド:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
*   **スタイリング:** [Tailwind CSS](https://tailwindcss.com/)
*   **グラフ・チャート:** [Recharts](https://recharts.org/)
*   **外部API:** [Hameln Reading Data API](https://hameln-reading-api.com) (このプロジェクトのために想定されたAPI)

## 🚀 導入とローカル開発

このプロジェクトをローカル環境でセットアップし、実行する手順は以下の通りです。

### 前提条件

*   [Node.js](https://nodejs.org/) (v18.x 以上を推奨)
*   [npm](https://www.npmjs.com/) または [yarn](https://yarnpkg.com/)

### インストールと実行

1.  **リポジトリをクローン:**
    ```bash
    git clone https://github.com/your-username/hameln-reading-stats.git
    cd hameln-reading-stats
    ```

2.  **依存パッケージをインストール:**
    このプロジェクトは現在`package.json`を含んでいません。開発を始めるには、まずプロジェクトを初期化し、必要なライブラリをインストールしてください。
    ```bash
    # npmプロジェクトを初期化
    npm init -y

    # 必要なライブラリをインストール
    npm install react react-dom recharts
    npm install -D @types/react @types/react-dom tailwindcss typescript
    ```
    ※ 開発サーバー (例: Vite) などのツールも必要に応じて追加してください。

3.  **開発サーバーを起動:**
    Viteを使用する場合:
    ```bash
    npm run dev
    ```

4.  **ブラウザで確認:**
    `http://localhost:5173` (またはターミナルに表示されたアドレス) にアクセスしてください。

**注意:** このアプリケーションは、`https://hameln-reading-api.com` でホストされている外部APIに依存しています。APIが稼働していない場合、アプリケーションは正常に機能しません。

## 🔒 セキュリティについて

ユーザーのセキュリティは最優先事項です。
*   ユーザーIDとパスワードは、APIから認証トークンを取得するためだけにメモリ上で使用され、**当サービスには一切保存されません。**
*   認証情報は暗号化されたHTTPS通信を介してAPIサーバーに直接送信されます。
*   取得した認証トークンはブラウザの `localStorage` に保存され、ユーザーがログアウトするまでログイン状態を維持します。
*   読書データはパフォーマンス向上のために `localStorage` にキャッシュされますが、機密性の高い個人情報は含まれていません。

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) のもとで公開されています。