# Hameln Reading Stats

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2-orange)](https://recharts.org/)

**Hameln Reading Stats** は、小説投稿サイト「ハーメルン」の読書データを連携し、あなたの読書傾向を美しいグラフや統計で可視化するWebアプリケーションです。自分だけの読書記録を分析し、新たな発見を楽しみましょう。

🔗 **公式サイト:** [https://hameln-reading-stats.com](https://hameln-reading-stats.com)

---

## 🎯 このサイトが解決すること

「自分がどれだけ読書に時間を費やしてきたか、一目で分かったら面白いのに」「読書のモチベーションを維持するのが難しい」。そんなハーメルン読者のためのツールです。ただ読むだけでなく、あなたの読書の軌跡そのものを「物語」として楽しみ、次の作品への探求心を刺激します。

## ✨ 主な機能

*   **📊 総合ダッシュボード**
    *   累計読了作品数、話数、文字数をインパクトのあるカードで表示。
    *   読書量に応じてレベルアップする **レベルシステム** を搭載。
    *   現在の連続読書日数と、これまでの最長連続記録をひと目で確認。

*   **📈 読書トレンドの可視化**
    *   **月間トレンド:** 直近12ヶ月の読書量をインタラクティブな棒グラフで表示。
    *   **アクティビティカレンダー:** GitHubのコントリビューショングラフのように、日々の読書アクティビティをヒートマップで可視化。あなたの努力が色濃く残ります。

*   **🏆 ゲーミフィケーション要素**
    *   **月間目標設定:** 毎月の読書文字数目標を設定し、進捗をリアルタイムで追跡。目標達成の喜びが、次の読書への意欲を掻き立てます。
    *   **実績システム:** 「累計100万文字読了」「30日間連続読書」など、様々な目標を達成すると美しい称号をアンロック。コレクションする楽しみも。

*   **💡 パーソナルインサイトと分析**
    *   最も読書に集中している曜日、最も読書量が多かった「ピーク月」、1日の平均読書文字数など、あなたのユニークな読書習慣を深く分析。
    *   年ごと、月ごとの読書データをドリルダウンで詳細に確認。各期間の読書量をインラインバーグラフで直感的に比較できます。

*   **🤝 シェア機能**
    *   あなたの年間読書成績をまとめた、美しい **レポートカード** を生成。X (Twitter) などで簡単にシェアでき、読書仲間と成果を共有できます。

## 🛠️ 使用技術

*   **フロントエンド:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
*   **スタイリング:** [Tailwind CSS](https://tailwindcss.com/)
*   **グラフ・チャート:** [Recharts](https://recharts.org/)
*   **外部API:** [Hameln Reading Data API](https://hameln-reading-api.com) (このプロジェクトのために想定されたAPI)
*   **オフライン対応:** PWA (Progressive Web App) 技術とService Workerによるキャッシュ戦略。

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

## 🔒 セキュリティとプライバシーへの配慮

ユーザーのセキュリティは最優先事項です。
*   **パスワードは保存しません:** ユーザーIDとパスワードは、APIから認証トークンを取得するためだけにメモリ上で使用され、**当サービスには一切保存されません。**
*   **安全な通信:** 認証情報は暗号化されたHTTPS通信を介してAPIサーバーに直接送信されます。
*   **データはブラウザ内に:** 取得した認証トークンと読書データは、すべてお使いのブラウザの `localStorage` に保存されます。あなたがログアウトするか、ブラウザのデータを消去するまで、外部のサーバーに送信されることはありません（広告・分析サービスを除く）。プライバシーポリシーで詳細をご確認いただけます。
